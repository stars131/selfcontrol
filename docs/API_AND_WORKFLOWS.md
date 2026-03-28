# SelfControl API 与工作流说明

## 1. 文档定位

本文档说明当前 `apps/api` 中已经落地的 V1 API 边界、权限规则和核心业务工作流。

代码仍然是最终事实来源，文档用于帮助开发、联调、部署和后续扩展。任何新增路由、权限变化、数据流变化，都应同步更新本文档与相关测试。

## 2. 总体约定

### 2.1 基础前缀

- API 根前缀：`/api/v1`
- 健康检查：`GET /health`

### 2.2 鉴权

- 除公开分享接口外，所有业务接口都要求 `Authorization: Bearer <token>`
- 当前登录方式为账号密码注册登录
- 令牌由 `POST /api/v1/auth/login` 返回

### 2.3 响应形态

当前大部分接口采用统一包裹格式：

```json
{
  "success": true,
  "data": {}
}
```

错误响应主要由 FastAPI `HTTPException` 驱动，常见形态如下：

```json
{
  "detail": "Record not found"
}
```

### 2.4 权限模型

当前工作区角色边界如下：

- `owner`：完整管理权限，包括成员管理、分享链接、导出导入、保留清理等高风险操作
- `editor`：可写业务数据，但不能执行 owner 级敏感操作
- `viewer`：只读访问

后端通过依赖函数强制校验：

- `require_workspace_member`
- `require_workspace_write_access`
- `require_workspace_role`

### 2.5 媒体处理模式

媒体处理支持两种运行模式：

- `MEDIA_PROCESSING_MODE=sync`：由 API 进程同步处理
- `MEDIA_PROCESSING_MODE=async`：由 Celery worker 异步处理

无论模式如何，上传接口和重试接口对调用方保持一致。

## 3. API 模块总览

### 3.1 认证

- `POST /api/v1/auth/register`
  - 注册用户
  - 当前按 `username` 或 `email` 去重
- `POST /api/v1/auth/login`
  - 使用 `account + password` 登录
  - `account` 支持用户名或邮箱
- `GET /api/v1/auth/me`
  - 获取当前用户信息

### 3.2 工作区

- `GET /api/v1/workspaces`
  - 获取当前用户可访问的工作区列表
- `POST /api/v1/workspaces`
  - 创建工作区
- `POST /api/v1/workspaces/import`
  - 同步导入工作区 ZIP
- `POST /api/v1/workspaces/import-jobs`
  - 创建异步导入任务
- `GET /api/v1/workspaces/{workspace_id}`
  - 获取工作区详情和当前用户角色
- `GET /api/v1/workspaces/{workspace_id}/export`
  - owner 导出工作区 ZIP
- `POST /api/v1/workspaces/{workspace_id}/export-jobs`
  - owner 创建异步导出任务
- `GET /api/v1/workspaces/jobs/transfer`
  - 获取当前用户最近的导入导出任务
- `GET /api/v1/workspaces/jobs/transfer/{job_id}`
  - 查看单个传输任务状态
- `GET /api/v1/workspaces/jobs/transfer/{job_id}/download`
  - 下载异步导出任务产物
- `GET /api/v1/workspaces/{workspace_id}/members`
  - owner/editor 查看成员列表
- `PATCH /api/v1/workspaces/{workspace_id}/members/{member_id}`
  - owner 修改成员角色
- `DELETE /api/v1/workspaces/{workspace_id}/members/{member_id}`
  - owner 移除成员

### 3.3 记录

- `GET /api/v1/workspaces/{workspace_id}/records`
  - 记录列表
  - 支持过滤参数：
    - `q`
    - `type_code`
    - `is_avoid`
    - `location_query`
    - `review_status`
    - `has_coordinates`
- `POST /api/v1/workspaces/{workspace_id}/records`
  - 创建记录
- `GET /api/v1/workspaces/{workspace_id}/records/{record_id}`
  - 获取单条记录
- `PATCH /api/v1/workspaces/{workspace_id}/records/{record_id}`
  - 更新记录
- `DELETE /api/v1/workspaces/{workspace_id}/records/{record_id}`
  - 删除记录，并联动清理本地或远端媒体对象

记录核心字段包括：

- `type_code`
- `title`
- `content`
- `rating`
- `is_avoid`
- `occurred_at`
- `source_type`
- `status`
- `extra_data`

其中 `extra_data` 当前已承载：

- `location`
- `location_review`
- `location_history`
- 其它未来扩展元数据

### 3.4 媒体

- `GET /api/v1/workspaces/{workspace_id}/records/{record_id}/media`
  - 获取某条记录的媒体列表
- `POST /api/v1/workspaces/{workspace_id}/records/{record_id}/media`
  - 上传图片、音频、视频或其他附件
- `GET /api/v1/workspaces/{workspace_id}/media/{media_id}/status`
  - 查询媒体处理状态
- `GET /api/v1/workspaces/{workspace_id}/media/{media_id}/content`
  - 安全预览或下载媒体内容
- `POST /api/v1/workspaces/{workspace_id}/media/{media_id}/retry`
  - 重试媒体处理
- `DELETE /api/v1/workspaces/{workspace_id}/media/{media_id}`
  - 删除媒体并重建关联知识索引

运维与诊断接口：

- `GET /api/v1/workspaces/{workspace_id}/media/storage-summary`
- `GET /api/v1/workspaces/{workspace_id}/media/processing-overview`
- `GET /api/v1/workspaces/{workspace_id}/media/dead-letter`
- `POST /api/v1/workspaces/{workspace_id}/media/dead-letter/retry`
- `GET /api/v1/workspaces/{workspace_id}/media/retention-report`
- `POST /api/v1/workspaces/{workspace_id}/media/retention-cleanup`
- `POST /api/v1/workspaces/{workspace_id}/media/retention-archive`

媒体上传后的统一目标：

- 保存结构化元数据
- 尝试提取可搜索文本
- 将提取结果写回 `extracted_text`
- 触发知识索引重建
- 为故障排查保留处理状态和错误信息

### 3.5 会话助手

- `GET /api/v1/workspaces/{workspace_id}/conversations`
  - 获取当前用户在该工作区的会话列表
- `POST /api/v1/workspaces/{workspace_id}/conversations`
  - 创建会话
- `GET /api/v1/workspaces/{workspace_id}/conversations/{conversation_id}/messages`
  - 获取消息历史
- `POST /api/v1/workspaces/{workspace_id}/conversations/{conversation_id}/messages`
  - 发送消息
  - 当前会调用聊天处理逻辑，并可能生成结构化记录结果

当前聊天助手 V1 已覆盖的重点方向：

- 自然语言创建记录
- 自然语言检索记录
- 返回结构化记录卡片所需数据
- 在记录创建后联动知识索引和审计日志

### 3.6 知识库与搜索

- `GET /api/v1/workspaces/{workspace_id}/knowledge/stats`
  - 查看知识索引状态
- `POST /api/v1/workspaces/{workspace_id}/knowledge/reindex`
  - 重建单条记录或整个工作区的知识索引
- `POST /api/v1/workspaces/{workspace_id}/knowledge/search`
  - 搜索知识片段并返回命中的记录
- `POST /api/v1/workspaces/{workspace_id}/search`
  - 面向记录的混合搜索接口
- `GET /api/v1/workspaces/{workspace_id}/timeline`
  - 按天聚合记录的时间线接口

当前检索链路包含：

- 结构化筛选
- 标题/正文关键词匹配
- 基于向量的语义召回
- 片段命中回溯到记录

### 3.7 提醒与通知

- `GET /api/v1/workspaces/{workspace_id}/reminders`
  - 查询提醒列表
- `POST /api/v1/workspaces/{workspace_id}/records/{record_id}/reminders`
  - 为记录创建提醒
- `PATCH /api/v1/workspaces/{workspace_id}/reminders/{reminder_id}`
  - 更新提醒
- `DELETE /api/v1/workspaces/{workspace_id}/reminders/{reminder_id}`
  - 删除提醒
- `POST /api/v1/workspaces/{workspace_id}/notifications/sync`
  - 触发到期提醒扫描并生成站内通知
- `GET /api/v1/workspaces/{workspace_id}/notifications`
  - 获取通知列表
- `PATCH /api/v1/workspaces/{workspace_id}/notifications/{notification_id}`
  - 更新已读状态

提醒 V1 当前落地为站内提醒，不依赖短信、邮件或系统推送。

### 3.8 Provider 配置

- `GET /api/v1/workspaces/{workspace_id}/provider-configs`
  - 获取当前工作区所有功能的 provider 配置视图
- `PUT /api/v1/workspaces/{workspace_id}/provider-configs/{feature_code}`
  - 更新某项能力的 provider 配置
- `GET /api/v1/workspaces/{workspace_id}/provider-configs/media-storage-health`
  - 查看媒体存储 provider 的健康状态

当前支持独立配置的能力包括：

- `chat_generation`
- `embeddings`
- `image_ocr`
- `audio_asr`
- `video_transcription`
- `maps_geocoding`
- `media_storage`

安全边界：

- 数据库存储的是 `api_key_env_name`，不是明文密钥
- 自定义 provider 的 URL、Secret 环境变量名和媒体存储选项都会做校验

### 3.9 分享与共享

- `GET /api/v1/workspaces/{workspace_id}/share-links`
  - owner 查看分享链接
- `POST /api/v1/workspaces/{workspace_id}/share-links`
  - owner 创建分享链接
- `PATCH /api/v1/workspaces/{workspace_id}/share-links/{share_link_id}`
  - owner 更新链接启用状态、过期时间、使用次数上限等
- `GET /api/v1/shares/{token}`
  - 公开预览分享链接
- `POST /api/v1/shares/{token}/accept`
  - 接受分享并加入工作区

当前实现特点：

- 仅保存 `token_hash`
- 返回一次性展示用 `access_token`
- 支持 `viewer` / `editor` 两种加入权限
- 支持过期与次数限制

### 3.10 搜索预设与审计

- `GET /api/v1/workspaces/{workspace_id}/search-presets`
- `POST /api/v1/workspaces/{workspace_id}/search-presets`
- `PATCH /api/v1/workspaces/{workspace_id}/search-presets/{preset_id}`
- `DELETE /api/v1/workspaces/{workspace_id}/search-presets/{preset_id}`
- `GET /api/v1/workspaces/{workspace_id}/audit-logs`

搜索预设用于沉淀高频过滤条件，审计日志用于保留关键操作轨迹。

## 4. 关键业务工作流

### 4.1 账号登录与进入工作区

1. 用户注册账号
2. 用户登录获取 Bearer token
3. 客户端调用 `/api/v1/workspaces` 获取可访问工作区
4. 进入工作区后再拉取记录、会话、提醒、通知和配置

### 4.2 文本快速录入

这是当前“一个输入框即可增加内容”的最小后端落点：

1. 前端将文本提交给聊天会话消息接口
2. 聊天处理逻辑解析意图
3. 若识别为创建记录，生成结构化记录并落库
4. 系统写入聊天消息、记录、审计日志
5. 记录写入后自动重建知识索引
6. 右侧结构化卡片可直接展示新记录

### 4.3 多媒体录入到可搜索知识

1. 先创建记录，拿到 `record_id`
2. 上传图片、语音、视频等媒体
3. 媒体根据配置进入本地或远端存储
4. 触发 OCR / ASR / 视频转写链路
5. 提取文本写入 `media_assets.extracted_text`
6. 调用知识重建，把记录正文和媒体文本切片入库
7. 后续可通过搜索、时间线和聊天助手进行检索

### 4.4 地点识别、校正与地图复盘

1. 前端将自动识别或手动选择的位置写入 `record.extra_data.location`
2. 后端标准化 `place_name`、`address`、`latitude`、`longitude`、`source`
3. 后端自动维护 `location_review`
4. 每次关键变更写入 `location_history`
5. 记录列表和时间线支持位置筛选与地图钻取

### 4.5 提醒 V1

1. 用户对某条记录创建提醒
2. 提醒进入 `pending` 状态
3. 客户端或调度逻辑调用 `/notifications/sync`
4. 后端扫描到期提醒并生成站内通知
5. 通知支持已读/未读状态更新

当前 V1 不做跨设备系统级推送，只保证站内提醒闭环。

### 4.6 分享、导出与导入

分享流程：

1. owner 创建分享链接
2. 系统返回分享路径和访问 token
3. 接收方预览分享信息
4. 登录后接受分享并创建工作区成员关系

迁移流程：

1. owner 导出工作区 ZIP，或创建异步导出任务
2. 导出包包含工作区、成员、记录、媒体元数据和可用本地文件
3. 另一环境导入 ZIP，恢复为新的私有工作区
4. 导入后自动重建相关知识索引

### 4.7 Provider 切换与 RAG

1. 在设置页为每个 feature 单独配置 provider
2. embeddings 配置决定知识切片使用哪种向量能力
3. 媒体提取链路根据 image/audio/video feature 各自路由
4. map/geocoding 与 media_storage 也可独立替换
5. 配置更新后可手动执行知识重建，确保历史数据与当前 provider 对齐

## 5. 当前实现边界

### 5.1 已实现但需要持续演进的部分

- 大部分列表接口仍是 V1 直接返回，暂未统一分页
- 聊天助手能力已能创建与检索记录，但仍属于规则驱动和工具编排优先
- 提醒当前为站内提醒，不是完整消息中心
- 地图 provider 设计已预留国际化替换，当前国内优先高德

### 5.2 企业级维护要求

后续任何 API 变更都必须同时满足：

- 有后端测试或现有测试覆盖不被破坏
- `scripts/verify-all.ps1` 或 `scripts/verify-all.sh` 可通过
- 如涉及权限、导出导入、媒体、provider、分享，必须同步更新文档
- 不允许把敏感密钥直接落库

## 6. 推荐联调顺序

对于新环境或新前端页面，建议按以下顺序联调：

1. `auth`
2. `workspaces`
3. `records`
4. `media`
5. `knowledge/search/timeline`
6. `conversations`
7. `reminders/notifications`
8. `provider-configs`
9. `share-links`
10. `export/import`

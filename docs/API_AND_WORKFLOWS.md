# SelfControl API 与工作流设计

## 1. API 设计原则

- 风格以 REST 为主。
- 聊天与流式回答可以补充 SSE 或 WebSocket。
- 所有接口默认 JSON。
- 上传媒体采用独立上传接口。
- 所有需要鉴权的接口都校验用户和 `workspace` 权限。
- 所有列表接口支持分页。

## 2. 统一约定

### 2.1 路径前缀

- API 前缀：`/api/v1`

### 2.2 鉴权

- 首版：`Authorization: Bearer <token>`
- 后续可扩展 refresh token 或 session

### 2.3 通用响应

成功响应建议：

```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

失败响应建议：

```json
{
  "success": false,
  "error": {
    "code": "record_not_found",
    "message": "Record not found"
  }
}
```

### 2.4 分页参数

- `page`
- `page_size`
- `sort`
- `order`

## 3. 认证模块

### 3.1 注册

- `POST /api/v1/auth/register`

请求体：

```json
{
  "username": "demo",
  "email": "demo@example.com",
  "password": "password123",
  "display_name": "Demo"
}
```

### 3.2 登录

- `POST /api/v1/auth/login`

请求体：

```json
{
  "account": "demo",
  "password": "password123"
}
```

响应体：

```json
{
  "success": true,
  "data": {
    "access_token": "jwt-token",
    "token_type": "bearer",
    "user": {
      "id": "uuid",
      "username": "demo"
    }
  }
}
```

### 3.3 当前用户

- `GET /api/v1/auth/me`

## 4. 工作空间模块

### 4.1 空间列表

- `GET /api/v1/workspaces`

### 4.2 创建空间

- `POST /api/v1/workspaces`

### 4.3 获取空间详情

- `GET /api/v1/workspaces/{workspace_id}`

### 4.4 更新空间

- `PATCH /api/v1/workspaces/{workspace_id}`

### 4.5 邀请成员

- `POST /api/v1/workspaces/{workspace_id}/members`

### 4.6 成员列表

- `GET /api/v1/workspaces/{workspace_id}/members`

### 4.7 修改成员角色

- `PATCH /api/v1/workspaces/{workspace_id}/members/{member_id}`

### 4.8 移除成员

- `DELETE /api/v1/workspaces/{workspace_id}/members/{member_id}`

## 5. 记录模块

### 5.1 记录列表

- `GET /api/v1/workspaces/{workspace_id}/records`

支持查询参数：

- `q`
- `type`
- `category_id`
- `tag`
- `is_avoid`
- `rating_min`
- `rating_max`
- `date_from`
- `date_to`
- `place_id`
- `has_media`

### 5.2 新建记录

- `POST /api/v1/workspaces/{workspace_id}/records`

请求体示例：

```json
{
  "type_code": "food",
  "category_id": "uuid",
  "title": "万象城烤鱼",
  "content": "昨天吃到一家不错的烤鱼店",
  "rating": 5,
  "is_avoid": false,
  "occurred_at": "2026-03-20T12:30:00+08:00",
  "tag_ids": ["uuid-1", "uuid-2"],
  "place": {
    "place_name": "某烤鱼店",
    "raw_address": "杭州万象城",
    "latitude": 30.2741,
    "longitude": 120.1551,
    "coordinate_system": "GCJ-02"
  },
  "extra_data": {
    "dish_name": "招牌烤鱼"
  }
}
```

### 5.3 记录详情

- `GET /api/v1/workspaces/{workspace_id}/records/{record_id}`

### 5.4 更新记录

- `PATCH /api/v1/workspaces/{workspace_id}/records/{record_id}`

### 5.5 删除记录

- `DELETE /api/v1/workspaces/{workspace_id}/records/{record_id}`

说明：

- 首版建议软删除。

### 5.6 记录时间线

- `GET /api/v1/workspaces/{workspace_id}/records/timeline`

### 5.7 记录地图视图

- `GET /api/v1/workspaces/{workspace_id}/records/map`

## 6. 标签与分类模块

### 6.1 分类列表

- `GET /api/v1/workspaces/{workspace_id}/categories`

### 6.2 创建分类

- `POST /api/v1/workspaces/{workspace_id}/categories`

### 6.3 标签列表

- `GET /api/v1/workspaces/{workspace_id}/tags`

### 6.4 创建标签

- `POST /api/v1/workspaces/{workspace_id}/tags`

## 7. 媒体上传与处理模块

### 7.1 获取上传凭证

- `POST /api/v1/workspaces/{workspace_id}/media/upload-url`

说明：

- 如果首版直接后端接收文件，也可先不拆预签名。
- 但接口结构建议先保留。

### 7.2 上传媒体并绑定记录

- `POST /api/v1/workspaces/{workspace_id}/records/{record_id}/media`

表单字段：

- `file`
- `media_type`

### 7.3 获取媒体详情

- `GET /api/v1/workspaces/{workspace_id}/media/{media_id}`

### 7.4 获取媒体处理状态

- `GET /api/v1/workspaces/{workspace_id}/media/{media_id}/status`

### 7.5 删除媒体

- `DELETE /api/v1/workspaces/{workspace_id}/media/{media_id}`

### 7.6 手动重试处理

- `POST /api/v1/workspaces/{workspace_id}/media/{media_id}/retry`

## 8. 地点与地图模块

### 8.1 地点列表

- `GET /api/v1/workspaces/{workspace_id}/places`

### 8.2 地点详情

- `GET /api/v1/workspaces/{workspace_id}/places/{place_id}`

### 8.3 手动修正记录地点

- `PATCH /api/v1/workspaces/{workspace_id}/records/{record_id}/place`

请求体示例：

```json
{
  "place_name": "杭州万象城",
  "raw_address": "上城区富春路701号",
  "latitude": 30.2492,
  "longitude": 120.2193,
  "coordinate_system": "GCJ-02",
  "source": "manual"
}
```

### 8.4 地址地理编码

- `POST /api/v1/workspaces/{workspace_id}/maps/geocode`

### 8.5 坐标逆地理编码

- `POST /api/v1/workspaces/{workspace_id}/maps/reverse-geocode`

## 9. 检索模块

### 9.1 混合检索

- `POST /api/v1/workspaces/{workspace_id}/search`

请求体示例：

```json
{
  "query": "去年在杭州吃过哪些不错的日料",
  "filters": {
    "type_codes": ["food"],
    "date_from": "2025-01-01T00:00:00+08:00",
    "date_to": "2025-12-31T23:59:59+08:00",
    "city": "杭州"
  },
  "options": {
    "use_vector": true,
    "use_rerank": true,
    "limit": 10
  }
}
```

响应建议包含：

- 匹配记录
- 引用片段
- 总结
- 地图点位

### 9.2 相似记录

- `GET /api/v1/workspaces/{workspace_id}/records/{record_id}/similar`

## 10. 聊天与 Agent 模块

### 10.1 会话列表

- `GET /api/v1/workspaces/{workspace_id}/conversations`

### 10.2 创建会话

- `POST /api/v1/workspaces/{workspace_id}/conversations`

### 10.3 获取消息列表

- `GET /api/v1/workspaces/{workspace_id}/conversations/{conversation_id}/messages`

### 10.4 发送消息

- `POST /api/v1/workspaces/{workspace_id}/conversations/{conversation_id}/messages`

请求体示例：

```json
{
  "content": "帮我记一下，昨天在杭州万象城吃的烤鱼很好吃，下次还可以去",
  "attachments": []
}
```

返回建议：

- assistant 回复文本
- 拟执行动作
- 结构化草稿
- 是否需要用户确认

### 10.5 确认 Agent 草稿

- `POST /api/v1/workspaces/{workspace_id}/conversations/{conversation_id}/confirm`

请求体示例：

```json
{
  "action_id": "uuid",
  "approved": true,
  "patched_payload": {
    "rating": 5
  }
}
```

### 10.6 流式聊天

- `GET /api/v1/workspaces/{workspace_id}/conversations/{conversation_id}/stream`

建议：

- 首版使用 SSE，比 WebSocket 更简单。

## 11. 提醒模块

### 11.1 提醒列表

- `GET /api/v1/workspaces/{workspace_id}/reminders`

### 11.2 创建提醒

- `POST /api/v1/workspaces/{workspace_id}/reminders`

请求体示例：

```json
{
  "record_id": "uuid",
  "reminder_type": "location",
  "title": "路过时提醒避雷",
  "rule": {
    "place_id": "uuid",
    "radius_meters": 300
  }
}
```

### 11.3 更新提醒

- `PATCH /api/v1/workspaces/{workspace_id}/reminders/{reminder_id}`

### 11.4 删除提醒

- `DELETE /api/v1/workspaces/{workspace_id}/reminders/{reminder_id}`

### 11.5 通知列表

- `GET /api/v1/workspaces/{workspace_id}/notifications`

### 11.6 标记已读

- `POST /api/v1/workspaces/{workspace_id}/notifications/{notification_id}/read`

## 12. 分享模块

### 12.1 创建分享

- `POST /api/v1/workspaces/{workspace_id}/shares`

请求体示例：

```json
{
  "share_type": "link",
  "target_scope": "saved_query",
  "target_id": "uuid",
  "access_level": "viewer",
  "expires_at": "2026-04-01T00:00:00+08:00"
}
```

### 12.2 分享列表

- `GET /api/v1/workspaces/{workspace_id}/shares`

### 12.3 停用分享

- `PATCH /api/v1/workspaces/{workspace_id}/shares/{share_id}`

### 12.4 访问分享资源

- `GET /api/v1/share/{token}`

说明：

- 公开访问时仍需做分享权限校验和到期校验。

## 13. Provider 配置模块

### 13.1 配置列表

- `GET /api/v1/workspaces/{workspace_id}/providers`

### 13.2 创建配置

- `POST /api/v1/workspaces/{workspace_id}/providers`

### 13.3 更新配置

- `PATCH /api/v1/workspaces/{workspace_id}/providers/{provider_id}`

### 13.4 测试配置

- `POST /api/v1/workspaces/{workspace_id}/providers/{provider_id}/test`

## 14. 典型工作流

### 14.1 聊天新增记录

1. 用户在聊天区输入一句自然语言或上传附件。
2. 后端识别意图，若涉及附件则先落存文件并创建处理任务。
3. Agent 结合文本和媒体解析结果生成结构化草稿。
4. 前端右侧展示记录草稿卡片。
5. 用户确认后，调用确认接口写入正式记录。
6. 后台为记录生成全文检索内容和向量索引。

### 14.2 图片或视频上传记录

1. 用户上传图片或视频。
2. 后端创建 `media_asset`。
3. Worker 执行 OCR、ASR、摘要、元数据解析。
4. 结果写入 `transcripts` 和 `embedding_chunks`。
5. 前端轮询或订阅处理状态。
6. 处理完成后，右侧卡片显示解析结果并支持补充编辑。

### 14.3 查询并回答

1. 用户输入查询语句。
2. 后端提取过滤条件。
3. 执行结构化查询和向量召回。
4. 可选执行 rerank。
5. 组装引用内容，生成回答。
6. 右侧展示列表、地图和引用卡片。

### 14.4 创建位置提醒

1. 用户说“下次到这个商场提醒我别买这个零食”。
2. Agent 找到相关记录和地点。
3. 生成 `location` 类型提醒草稿。
4. 用户确认后写入提醒。
5. 用户打开系统并授权位置时，客户端上报当前坐标。
6. 后端判断是否命中提醒半径，若命中则生成通知。

## 15. 鉴权与权限控制建议

后端需要至少提供这几层校验：

- 用户是否已登录
- 用户是否属于当前 `workspace`
- 用户角色是否允许当前操作
- 是否有目标记录、媒体、分享资源的访问权

推荐的角色权限边界：

- `owner`：所有权限
- `admin`：成员管理、内容管理、分享管理、provider 管理
- `editor`：记录和媒体增删改查、提醒管理、聊天写入
- `viewer`：只读查询、查看分享内容

## 16. 错误码建议

建议至少统一这些错误码：

- `unauthorized`
- `forbidden`
- `workspace_not_found`
- `record_not_found`
- `media_not_found`
- `place_not_found`
- `provider_not_found`
- `invalid_request`
- `validation_failed`
- `processing_failed`
- `share_expired`
- `share_disabled`

## 17. 首版优先实现接口

如果要尽快起步，建议先做以下接口：

1. `POST /auth/register`
2. `POST /auth/login`
3. `GET /auth/me`
4. `GET /workspaces`
5. `POST /workspaces`
6. `GET /workspaces/{workspace_id}/records`
7. `POST /workspaces/{workspace_id}/records`
8. `GET /workspaces/{workspace_id}/records/{record_id}`
9. `PATCH /workspaces/{workspace_id}/records/{record_id}`
10. `POST /workspaces/{workspace_id}/records/{record_id}/media`
11. `GET /workspaces/{workspace_id}/media/{media_id}/status`
12. `POST /workspaces/{workspace_id}/search`
13. `POST /workspaces/{workspace_id}/conversations`
14. `POST /workspaces/{workspace_id}/conversations/{conversation_id}/messages`
15. `POST /workspaces/{workspace_id}/conversations/{conversation_id}/confirm`
16. `POST /workspaces/{workspace_id}/reminders`
17. `GET /workspaces/{workspace_id}/notifications`

## 18. 前端页面路由建议

建议首版页面：

- `/login`
- `/register`
- `/app`
- `/app/workspaces/:workspaceId`
- `/app/workspaces/:workspaceId/records/:recordId`
- `/app/workspaces/:workspaceId/map`
- `/app/workspaces/:workspaceId/timeline`
- `/app/workspaces/:workspaceId/reminders`
- `/app/workspaces/:workspaceId/settings/providers`
- `/share/:token`

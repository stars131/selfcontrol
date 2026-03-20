# SelfControl 数据库与关系设计

## 1. 设计原则

- 所有核心业务数据必须带 `workspace_id`，保证未来多人隔离。
- `records` 作为通用记录实体，具体类型通过 `record_types` 和 `extra_data` 扩展。
- 多媒体、地点、标签、向量、提醒都围绕 `records` 关联。
- 写操作尽量保留审计信息，删除优先软删除。
- 模型供应商、地图供应商、分享策略都做可扩展抽象。

## 2. 关系概览

```text
users
  -> workspace_members
  -> records.creator_id
  -> conversations.user_id
  -> reminders.owner_id
  -> notifications.user_id
  -> shares.created_by

workspaces
  -> workspace_members
  -> records
  -> categories
  -> tags
  -> places
  -> conversations
  -> reminders
  -> shares
  -> provider_configs

record_types
  -> records

records
  -> record_tags
  -> media_assets
  -> record_places
  -> embedding_chunks
  -> reminders
  -> agent_action_logs

media_assets
  -> transcripts
  -> embedding_chunks

places
  -> record_places

conversations
  -> messages
  -> agent_action_logs
```

## 3. 核心实体

### 3.1 users

用途：

- 系统用户。
- 当前单用户，后续支持多人。

建议字段：

```sql
create table users (
  id uuid primary key,
  email varchar(255) unique,
  username varchar(64) unique not null,
  password_hash varchar(255) not null,
  phone varchar(32),
  display_name varchar(128),
  avatar_url varchar(512),
  status varchar(32) not null default 'active',
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

索引建议：

- `unique(email)`
- `unique(username)`

### 3.2 workspaces

用途：

- 单人或多人协作空间。
- 所有业务数据隔离边界。

建议字段：

```sql
create table workspaces (
  id uuid primary key,
  name varchar(128) not null,
  slug varchar(128) unique not null,
  owner_id uuid not null references users(id),
  visibility varchar(32) not null default 'private',
  default_locale varchar(32) not null default 'zh-CN',
  default_timezone varchar(64) not null default 'Asia/Shanghai',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### 3.3 workspace_members

用途：

- 用户与空间关系。

建议字段：

```sql
create table workspace_members (
  id uuid primary key,
  workspace_id uuid not null references workspaces(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role varchar(32) not null,
  invited_by uuid references users(id),
  joined_at timestamptz,
  created_at timestamptz not null default now(),
  unique (workspace_id, user_id)
);
```

角色建议：

- `owner`
- `admin`
- `editor`
- `viewer`

### 3.4 record_types

用途：

- 定义记录类型。
- 避免业务层把类型写死。

建议字段：

```sql
create table record_types (
  id uuid primary key,
  code varchar(64) unique not null,
  name varchar(128) not null,
  description text,
  schema_json jsonb not null default '{}'::jsonb,
  is_system boolean not null default true,
  created_at timestamptz not null default now()
);
```

### 3.5 categories

用途：

- 空间级分类。

建议字段：

```sql
create table categories (
  id uuid primary key,
  workspace_id uuid not null references workspaces(id) on delete cascade,
  parent_id uuid references categories(id),
  name varchar(128) not null,
  color varchar(32),
  created_at timestamptz not null default now(),
  unique (workspace_id, parent_id, name)
);
```

说明：

- 第一版可以只做一级分类。
- 表结构保留父子扩展。

### 3.6 tags

用途：

- 空间级标签。

建议字段：

```sql
create table tags (
  id uuid primary key,
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name varchar(64) not null,
  color varchar(32),
  created_at timestamptz not null default now(),
  unique (workspace_id, name)
);
```

### 3.7 records

用途：

- 所有记录核心表。

建议字段：

```sql
create table records (
  id uuid primary key,
  workspace_id uuid not null references workspaces(id) on delete cascade,
  creator_id uuid not null references users(id),
  updater_id uuid references users(id),
  type_id uuid not null references record_types(id),
  category_id uuid references categories(id),
  title varchar(255),
  content text,
  rating smallint,
  is_avoid boolean not null default false,
  occurred_at timestamptz,
  source_type varchar(32) not null default 'manual',
  status varchar(32) not null default 'active',
  extra_data jsonb not null default '{}'::jsonb,
  search_document tsvector,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

字段说明：

- `source_type` 示例：`manual`、`chat`、`voice`、`image`、`video`、`import`
- `status` 示例：`draft`、`active`、`archived`
- `extra_data` 用于扩展记录类型专属字段

索引建议：

```sql
create index idx_records_workspace_created_at on records(workspace_id, created_at desc);
create index idx_records_workspace_occurred_at on records(workspace_id, occurred_at desc);
create index idx_records_workspace_type on records(workspace_id, type_id);
create index idx_records_workspace_category on records(workspace_id, category_id);
create index idx_records_workspace_avoid on records(workspace_id, is_avoid);
create index idx_records_search_document on records using gin(search_document);
create index idx_records_extra_data on records using gin(extra_data);
```

### 3.8 record_tags

用途：

- 记录与标签多对多。

建议字段：

```sql
create table record_tags (
  record_id uuid not null references records(id) on delete cascade,
  tag_id uuid not null references tags(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (record_id, tag_id)
);
```

### 3.9 media_assets

用途：

- 保存附件元数据。

建议字段：

```sql
create table media_assets (
  id uuid primary key,
  workspace_id uuid not null references workspaces(id) on delete cascade,
  record_id uuid not null references records(id) on delete cascade,
  uploaded_by uuid not null references users(id),
  media_type varchar(32) not null,
  storage_provider varchar(64) not null,
  bucket_name varchar(128),
  storage_key varchar(512) not null,
  original_filename varchar(255),
  mime_type varchar(128),
  size_bytes bigint not null,
  checksum_sha256 varchar(128),
  duration_ms integer,
  width integer,
  height integer,
  metadata_json jsonb not null default '{}'::jsonb,
  processing_status varchar(32) not null default 'pending',
  processing_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

状态建议：

- `pending`
- `processing`
- `completed`
- `failed`

### 3.10 transcripts

用途：

- 保存媒体转写、OCR 和摘要结果。

建议字段：

```sql
create table transcripts (
  id uuid primary key,
  workspace_id uuid not null references workspaces(id) on delete cascade,
  media_asset_id uuid not null references media_assets(id) on delete cascade,
  transcript_type varchar(32) not null,
  language varchar(32),
  provider_name varchar(64),
  model_name varchar(128),
  content text not null,
  segments_json jsonb not null default '[]'::jsonb,
  metadata_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
```

类型建议：

- `asr`
- `ocr`
- `image_caption`
- `video_summary`
- `audio_summary`

### 3.11 places

用途：

- 标准化地点实体。

建议字段：

```sql
create table places (
  id uuid primary key,
  workspace_id uuid not null references workspaces(id) on delete cascade,
  place_name varchar(255),
  raw_address text,
  formatted_address text,
  country varchar(128),
  province varchar(128),
  city varchar(128),
  district varchar(128),
  latitude numeric(10, 7) not null,
  longitude numeric(10, 7) not null,
  coordinate_system varchar(32) not null,
  source varchar(32) not null,
  confidence numeric(5, 2),
  geohash varchar(32),
  metadata_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

字段说明：

- `coordinate_system` 示例：`GCJ-02`、`WGS84`
- `source` 示例：`exif`、`geocoder`、`text_inference`、`manual`

索引建议：

```sql
create index idx_places_workspace_name on places(workspace_id, place_name);
create index idx_places_workspace_city on places(workspace_id, city);
create index idx_places_workspace_geo on places(workspace_id, latitude, longitude);
```

### 3.12 record_places

用途：

- 记录与地点的关联。
- 保留多个地点候选和最终确认结果。

建议字段：

```sql
create table record_places (
  id uuid primary key,
  workspace_id uuid not null references workspaces(id) on delete cascade,
  record_id uuid not null references records(id) on delete cascade,
  place_id uuid not null references places(id) on delete cascade,
  relation_type varchar(32) not null default 'primary',
  is_confirmed boolean not null default false,
  confidence numeric(5, 2),
  created_at timestamptz not null default now()
);
```

### 3.13 embedding_chunks

用途：

- RAG 向量分块。

建议字段：

```sql
create extension if not exists vector;

create table embedding_chunks (
  id uuid primary key,
  workspace_id uuid not null references workspaces(id) on delete cascade,
  record_id uuid references records(id) on delete cascade,
  media_asset_id uuid references media_assets(id) on delete cascade,
  transcript_id uuid references transcripts(id) on delete cascade,
  chunk_type varchar(32) not null,
  chunk_text text not null,
  chunk_index integer not null default 0,
  embedding vector(1536),
  metadata_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
```

索引建议：

```sql
create index idx_embedding_chunks_workspace_record on embedding_chunks(workspace_id, record_id);
create index idx_embedding_chunks_metadata on embedding_chunks using gin(metadata_json);
```

说明：

- `vector(1536)` 只是初始示例，最终维度需要跟具体 embedding 模型保持一致。

### 3.14 conversations

用途：

- 聊天会话。

建议字段：

```sql
create table conversations (
  id uuid primary key,
  workspace_id uuid not null references workspaces(id) on delete cascade,
  user_id uuid not null references users(id),
  title varchar(255),
  last_message_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### 3.15 messages

用途：

- 聊天消息内容。

建议字段：

```sql
create table messages (
  id uuid primary key,
  conversation_id uuid not null references conversations(id) on delete cascade,
  role varchar(32) not null,
  content text not null,
  tool_calls_json jsonb not null default '[]'::jsonb,
  metadata_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
```

### 3.16 agent_action_logs

用途：

- 记录 Agent 做过的关键动作。

建议字段：

```sql
create table agent_action_logs (
  id uuid primary key,
  workspace_id uuid not null references workspaces(id) on delete cascade,
  conversation_id uuid references conversations(id) on delete set null,
  record_id uuid references records(id) on delete set null,
  actor_user_id uuid references users(id),
  action_type varchar(64) not null,
  request_payload jsonb not null default '{}'::jsonb,
  result_payload jsonb not null default '{}'::jsonb,
  status varchar(32) not null,
  created_at timestamptz not null default now()
);
```

### 3.17 reminders

用途：

- 提醒规则。

建议字段：

```sql
create table reminders (
  id uuid primary key,
  workspace_id uuid not null references workspaces(id) on delete cascade,
  record_id uuid references records(id) on delete cascade,
  owner_id uuid not null references users(id),
  reminder_type varchar(32) not null,
  title varchar(255),
  rule_json jsonb not null default '{}'::jsonb,
  next_trigger_at timestamptz,
  last_triggered_at timestamptz,
  is_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

提醒类型建议：

- `time_once`
- `time_recurring`
- `condition`
- `location`

### 3.18 notifications

用途：

- 触发后的通知记录。

建议字段：

```sql
create table notifications (
  id uuid primary key,
  workspace_id uuid not null references workspaces(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  reminder_id uuid references reminders(id) on delete set null,
  type varchar(32) not null,
  title varchar(255) not null,
  content text,
  payload_json jsonb not null default '{}'::jsonb,
  is_read boolean not null default false,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
```

### 3.19 shares

用途：

- 分享空间、库或筛选结果。

建议字段：

```sql
create table shares (
  id uuid primary key,
  workspace_id uuid not null references workspaces(id) on delete cascade,
  created_by uuid not null references users(id),
  share_type varchar(32) not null,
  target_scope varchar(32) not null,
  target_id uuid,
  access_level varchar(32) not null,
  token varchar(128) unique,
  expires_at timestamptz,
  is_enabled boolean not null default true,
  config_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
```

示例：

- `share_type`: `link`、`invite_code`、`user_grant`
- `target_scope`: `workspace`、`record`、`saved_query`
- `access_level`: `viewer`、`editor`

### 3.20 provider_configs

用途：

- 保存模型、地图、OCR 等供应商配置。

建议字段：

```sql
create table provider_configs (
  id uuid primary key,
  workspace_id uuid references workspaces(id) on delete cascade,
  provider_domain varchar(32) not null,
  capability varchar(32) not null,
  provider_name varchar(64) not null,
  is_enabled boolean not null default true,
  priority integer not null default 100,
  base_url varchar(512),
  model_name varchar(255),
  encrypted_secret text,
  config_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

示例：

- `provider_domain`: `llm`、`embedding`、`map`、`ocr`、`asr`
- `capability`: `chat`、`rerank`、`geocode`、`reverse_geocode`

## 4. 数据约束建议

- 任何用户可见数据必须可追踪到 `workspace_id`。
- `records.deleted_at` 非空时，默认查询不返回。
- `record_places` 同一记录应只允许一个 `relation_type = 'primary' and is_confirmed = true`。
- `media_assets.processing_status` 为 `failed` 时必须记录错误信息。
- `shares` 到期后应自动失效。

## 5. 审计与软删除

建议至少对以下动作保留审计：

- 用户登录
- 记录创建、更新、删除
- 媒体上传与删除
- Agent 写入动作
- 提醒创建与触发
- 分享创建、停用
- 模型配置更新

软删除建议优先用于：

- `records`
- `media_assets`
- `shares`

## 6. 首批种子数据建议

初始化时建议写入：

- 默认 `record_types`
- 默认分类：美食、零食、饮料、避雷、普通备忘
- 默认 provider 能力枚举
- 默认用户角色枚举

## 7. 迁移顺序建议

建议按以下顺序创建表：

1. `users`
2. `workspaces`
3. `workspace_members`
4. `record_types`
5. `categories`
6. `tags`
7. `records`
8. `record_tags`
9. `media_assets`
10. `transcripts`
11. `places`
12. `record_places`
13. `embedding_chunks`
14. `conversations`
15. `messages`
16. `agent_action_logs`
17. `reminders`
18. `notifications`
19. `shares`
20. `provider_configs`

## 8. 第一版可简化项

如果首版想加快落地，可暂时简化：

- `categories` 只做一级分类
- `shares` 先只支持指定用户和邀请码
- `provider_configs` 先不做空间级覆盖，先做全局配置
- `notifications` 先只做站内通知
- `search_document` 可先由应用层维护，后续再改触发器

export type User = {
  id: string;
  username: string;
  email?: string | null;
  display_name?: string | null;
};

export type Workspace = {
  id: string;
  name: string;
  slug: string;
  owner_id: string;
  visibility: string;
  created_at: string;
};

export type RecordItem = {
  id: string;
  workspace_id: string;
  creator_id: string;
  type_code: string;
  title?: string | null;
  content?: string | null;
  rating?: number | null;
  is_avoid: boolean;
  occurred_at?: string | null;
  source_type: string;
  status: string;
  extra_data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type MediaAsset = {
  id: string;
  workspace_id: string;
  record_id: string;
  uploaded_by: string;
  media_type: string;
  storage_key: string;
  original_filename: string;
  mime_type: string;
  size_bytes: number;
  metadata_json: Record<string, unknown>;
  created_at: string;
};

export type ReminderItem = {
  id: string;
  workspace_id: string;
  record_id: string;
  created_by: string;
  channel_code: string;
  title?: string | null;
  message?: string | null;
  remind_at: string;
  status: string;
  is_enabled: boolean;
  delivered_at?: string | null;
  cancelled_at?: string | null;
  metadata_json: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type NotificationItem = {
  id: string;
  workspace_id: string;
  user_id: string;
  reminder_id?: string | null;
  record_id?: string | null;
  title: string;
  message?: string | null;
  event_type: string;
  status: string;
  is_read: boolean;
  read_at?: string | null;
  metadata_json: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type Conversation = {
  id: string;
  workspace_id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
};

export type ChatMessage = {
  id: string;
  conversation_id: string;
  role: string;
  content: string;
  metadata_json: Record<string, unknown>;
  created_at: string;
};

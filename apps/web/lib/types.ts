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
  role: "owner" | "editor" | "viewer";
  created_at: string;
};

export type WorkspaceMemberItem = {
  id: string;
  workspace_id: string;
  user_id: string;
  role: "owner" | "editor" | "viewer";
  username: string;
  email?: string | null;
  display_name?: string | null;
  created_at: string;
};

export type WorkspaceImportResult = {
  workspace: Workspace;
  imported_record_count: number;
  imported_media_count: number;
  skipped_media_count: number;
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

export type LocationInfo = {
  place_name: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  source: string;
};

export type LocationReview = {
  status: string;
  note?: string | null;
  updated_at?: string | null;
  updated_by?: string | null;
  confirmed_at?: string | null;
};

export type LocationHistoryEntry = {
  changed_at: string;
  changed_by: string;
  action_code: string;
  review_status: string | null;
  review_note: string | null;
  place_name: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  source: string | null;
};

export type LocationFilterState = {
  placeQuery: string;
  reviewStatus: "all" | "pending" | "confirmed" | "needs_review";
  mappedOnly: "all" | "mapped" | "unmapped";
};

export type RecordFilterState = LocationFilterState & {
  query: string;
  typeCode: string;
  avoidOnly: "all" | "avoid" | "normal";
};

export type SearchPresetItem = {
  id: string;
  workspace_id: string;
  created_by: string;
  name: string;
  filters: RecordFilterState;
  created_at: string;
  updated_at: string;
};

export type TimelineDay = {
  date: string;
  count: number;
  avoid_count: number;
  top_places: string[];
  items: RecordItem[];
};

export type MediaAsset = {
  id: string;
  workspace_id: string;
  record_id: string;
  uploaded_by: string;
  media_type: string;
  storage_provider: string;
  storage_key: string;
  original_filename: string;
  mime_type: string;
  size_bytes: number;
  metadata_json: Record<string, unknown>;
  processing_status: string;
  processing_error?: string | null;
  extracted_text?: string | null;
  processed_at?: string | null;
  created_at: string;
  updated_at: string;
};

export type MediaStorageSummary = {
  workspace_id: string;
  total_count: number;
  total_size_bytes: number;
  total_size_label: string;
  missing_file_count: number;
  by_media_type: Record<string, number>;
  by_processing_status: Record<string, number>;
  largest_item_name?: string | null;
  largest_item_size_bytes?: number | null;
  largest_item_size_label?: string | null;
};

export type MediaRetentionItem = {
  media_id: string;
  record_id: string;
  original_filename: string;
  media_type: string;
  processing_status: string;
  size_bytes: number;
  size_label: string;
  created_at: string;
  age_days: number;
  file_missing: boolean;
};

export type MediaRetentionReport = {
  workspace_id: string;
  older_than_days: number;
  total_count: number;
  total_size_bytes: number;
  total_size_label: string;
  oldest_media_age_days?: number | null;
  old_item_count: number;
  old_item_size_bytes: number;
  old_item_size_label: string;
  missing_file_count: number;
  orphan_file_count: number;
  orphan_file_size_bytes: number;
  orphan_file_size_label: string;
  largest_items: MediaRetentionItem[];
  retention_candidates: MediaRetentionItem[];
};

export type MediaRetentionCleanupResult = {
  workspace_id: string;
  older_than_days: number;
  dry_run: boolean;
  candidate_media_count: number;
  candidate_media_size_bytes: number;
  candidate_media_size_label: string;
  orphan_file_count: number;
  orphan_file_size_bytes: number;
  orphan_file_size_label: string;
  affected_record_ids: string[];
  skipped_media_ids: string[];
  skipped_reason_by_media_id: Record<string, string>;
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

export type KnowledgeStats = {
  chunk_count: number;
  record_count: number;
  media_count: number;
  latest_indexed_at?: string | null;
  embedding_provider: string;
  embedding_model: string;
  embedding_dimensions: number;
};

export type ProviderFeatureConfig = {
  feature_code: string;
  feature_label: string;
  feature_description: string;
  providers: string[];
  provider_code: string;
  model_name?: string | null;
  is_enabled: boolean;
  api_base_url?: string | null;
  api_key_env_name?: string | null;
  options_json: Record<string, unknown>;
  is_default: boolean;
  updated_at?: string | null;
  requires_secret: boolean;
  secret_env_name?: string | null;
  secret_status: "configured" | "missing" | "not_required";
  config_warnings: string[];
};

export type AuditLogItem = {
  id: string;
  workspace_id: string;
  actor_user_id: string;
  action_code: string;
  resource_type: string;
  resource_id?: string | null;
  status: string;
  message?: string | null;
  metadata_json: Record<string, unknown>;
  created_at?: string | null;
};

export type ShareLinkItem = {
  id: string;
  workspace_id: string;
  created_by: string;
  name: string;
  token_hint: string;
  permission_code: string;
  is_enabled: boolean;
  expires_at?: string | null;
  max_uses?: number | null;
  use_count: number;
  last_used_at?: string | null;
  created_at: string;
  updated_at: string;
};

export type SharePreview = {
  name: string;
  workspace_id: string;
  workspace_name: string;
  workspace_slug: string;
  permission_code: string;
  is_enabled: boolean;
  expires_at?: string | null;
  max_uses?: number | null;
  use_count: number;
};

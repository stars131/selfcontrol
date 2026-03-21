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
  imported_reference_media_count: number;
  skipped_media_count: number;
};

export type WorkspaceTransferJob = {
  id: string;
  workspace_id?: string | null;
  created_by: string;
  job_type: "export" | "import";
  status: "pending" | "running" | "completed" | "failed";
  payload_json: Record<string, unknown>;
  result_json: Record<string, unknown>;
  artifact_filename?: string | null;
  error_message?: string | null;
  created_at: string;
  updated_at: string;
  completed_at?: string | null;
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

export type MediaProcessingIssue = {
  media_id: string;
  record_id: string;
  original_filename: string;
  media_type: string;
  storage_provider: string;
  processing_status: string;
  processing_error?: string | null;
  extraction_mode?: string | null;
  processing_source?: string | null;
  processing_last_attempt_at?: string | null;
  processing_last_failure_at?: string | null;
  remote_fetch_status?: string | null;
  processing_retry_state?: string | null;
  processing_retry_count?: number | null;
  processing_retry_max_attempts?: number | null;
  processing_retry_next_attempt_at?: string | null;
  updated_at: string;
};

export type MediaProcessingOverview = {
  workspace_id: string;
  total_count: number;
  local_item_count: number;
  remote_item_count: number;
  completed_count: number;
  pending_count: number;
  processing_count: number;
  deferred_count: number;
  failed_count: number;
  by_processing_status: Record<string, number>;
  by_storage_provider: Record<string, number>;
  recent_issues: MediaProcessingIssue[];
};

export type MediaDeadLetterOverview = {
  workspace_id: string;
  total_count: number;
  by_retry_state: Record<string, number>;
  items: MediaProcessingIssue[];
};

export type MediaDeadLetterBulkRetryResult = {
  workspace_id: string;
  target_count: number;
  retried_count: number;
  queued_count: number;
  processing_count: number;
  skipped_media_ids: string[];
  skipped_reason_by_media_id: Record<string, string>;
  retried_media_ids: string[];
};

export type MediaRetentionItem = {
  media_id: string;
  record_id: string;
  original_filename: string;
  media_type: string;
  storage_provider: string;
  storage_tier: string;
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
  archived_item_count: number;
  archived_item_size_bytes: number;
  archived_item_size_label: string;
  remote_item_count: number;
  remote_item_size_bytes: number;
  remote_item_size_label: string;
  missing_file_count: number;
  orphan_file_count: number;
  orphan_file_size_bytes: number;
  orphan_file_size_label: string;
  largest_items: MediaRetentionItem[];
  retention_candidates: MediaRetentionItem[];
};

export type MediaRetentionArchiveResult = {
  workspace_id: string;
  older_than_days: number;
  dry_run: boolean;
  candidate_media_count: number;
  candidate_media_size_bytes: number;
  candidate_media_size_label: string;
  affected_record_ids: string[];
  skipped_media_ids: string[];
  skipped_reason_by_media_id: Record<string, string>;
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

export type MediaStorageProviderHealth = {
  feature_code: string;
  provider_code: string;
  is_enabled: boolean;
  status: string;
  reachable?: boolean | null;
  checked_at: string;
  api_base_url?: string | null;
  message: string;
  contract_version: string;
  secret_status: "configured" | "missing" | "not_required";
  service_status?: string | null;
  service_name?: string | null;
  service_version?: string | null;
  response_time_ms?: number | null;
  capabilities: {
    upload: boolean;
    download: boolean;
    delete: boolean;
  };
  warnings: string[];
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

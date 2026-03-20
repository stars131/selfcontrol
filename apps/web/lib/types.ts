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

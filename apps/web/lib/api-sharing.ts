import type { ShareLinkItem, SharePreview, Workspace } from "./types";
import { request } from "./api-core";

export async function listShareLinks(token: string, workspaceId: string) {
  return request<{ items: ShareLinkItem[] }>(
    `/workspaces/${workspaceId}/share-links`,
    { method: "GET" },
    token,
  );
}

export async function createShareLink(
  token: string,
  workspaceId: string,
  input: {
    name?: string;
    permission_code: string;
    expires_at?: string | null;
    max_uses?: number | null;
  },
) {
  return request<{ share_link: ShareLinkItem; access_token: string; share_path: string }>(
    `/workspaces/${workspaceId}/share-links`,
    {
      method: "POST",
      body: JSON.stringify(input),
    },
    token,
  );
}

export async function updateShareLink(
  token: string,
  workspaceId: string,
  shareLinkId: string,
  input: Partial<{
    name: string | null;
    is_enabled: boolean;
    expires_at: string | null;
    max_uses: number | null;
  }>,
) {
  return request<{ share_link: ShareLinkItem }>(
    `/workspaces/${workspaceId}/share-links/${shareLinkId}`,
    {
      method: "PATCH",
      body: JSON.stringify(input),
    },
    token,
  );
}

export async function previewShareToken(tokenValue: string) {
  return request<{ preview: SharePreview }>(`/shares/${tokenValue}`, { method: "GET" });
}

export async function acceptShareToken(token: string, tokenValue: string) {
  return request<{ workspace: Workspace }>(
    `/shares/${tokenValue}/accept`,
    {
      method: "POST",
    },
    token,
  );
}

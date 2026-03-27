import type { MediaStorageProviderHealth, ProviderFeatureConfig } from "./types";
import { request } from "./api-core";

export async function listProviderConfigs(token: string, workspaceId: string) {
  return request<{ items: ProviderFeatureConfig[] }>(
    `/workspaces/${workspaceId}/provider-configs`,
    { method: "GET" },
    token,
  );
}

export async function updateProviderConfig(
  token: string,
  workspaceId: string,
  featureCode: string,
  input: {
    provider_code: string;
    model_name?: string | null;
    is_enabled: boolean;
    api_base_url?: string | null;
    api_key_env_name?: string | null;
    options_json?: Record<string, unknown>;
  },
) {
  return request<{ config: ProviderFeatureConfig }>(
    `/workspaces/${workspaceId}/provider-configs/${featureCode}`,
    {
      method: "PUT",
      body: JSON.stringify(input),
    },
    token,
  );
}

export async function getMediaStorageProviderHealth(token: string, workspaceId: string) {
  return request<{ health: MediaStorageProviderHealth }>(
    `/workspaces/${workspaceId}/provider-configs/media-storage-health`,
    { method: "GET" },
    token,
  );
}

"use client";

import type { ProviderFeatureConfig } from "../lib/types";
import type { ProviderDraft } from "./provider-settings-controller.types";

export function buildProviderDraft(item: ProviderFeatureConfig): ProviderDraft {
  return {
    provider_code: item.provider_code,
    model_name: item.model_name ?? "",
    is_enabled: item.is_enabled,
    api_base_url: item.api_base_url ?? "",
    api_key_env_name: item.api_key_env_name ?? "",
    options_json: item.options_json ?? {},
  };
}

export function buildProviderDraftMap(providerConfigs: ProviderFeatureConfig[]) {
  const nextDrafts: Record<string, ProviderDraft> = {};
  for (const item of providerConfigs) {
    nextDrafts[item.feature_code] = buildProviderDraft(item);
  }
  return nextDrafts;
}

export function buildProviderDraftPatch(
  current: Record<string, ProviderDraft>,
  featureCode: string,
  patch: Partial<ProviderDraft>,
) {
  return {
    ...current,
    [featureCode]: {
      provider_code: current[featureCode]?.provider_code ?? "",
      model_name: current[featureCode]?.model_name ?? "",
      is_enabled: current[featureCode]?.is_enabled ?? false,
      api_base_url: current[featureCode]?.api_base_url ?? "",
      api_key_env_name: current[featureCode]?.api_key_env_name ?? "",
      options_json: current[featureCode]?.options_json ?? {},
      ...patch,
    },
  };
}

export function isProviderDraftDirty(
  providerDrafts: Record<string, ProviderDraft>,
  item: ProviderFeatureConfig,
) {
  const draftItem = providerDrafts[item.feature_code];
  if (!draftItem) {
    return false;
  }
  return JSON.stringify(buildProviderDraft(item)) !== JSON.stringify(draftItem);
}

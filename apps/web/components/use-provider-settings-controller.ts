"use client";

import { useEffect, useState } from "react";

import type { ProviderFeatureConfig } from "../lib/types";

export type ProviderDraft = {
  provider_code: string;
  model_name: string;
  is_enabled: boolean;
  api_base_url: string;
  api_key_env_name: string;
  options_json: Record<string, unknown>;
};

function buildProviderDraft(item: ProviderFeatureConfig): ProviderDraft {
  return {
    provider_code: item.provider_code,
    model_name: item.model_name ?? "",
    is_enabled: item.is_enabled,
    api_base_url: item.api_base_url ?? "",
    api_key_env_name: item.api_key_env_name ?? "",
    options_json: item.options_json ?? {},
  };
}

function getActionErrorMessage(caught: unknown, fallbackMessage: string) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

type UseProviderSettingsControllerProps = {
  providerConfigs: ProviderFeatureConfig[];
  onSaveProviderConfig: (
    featureCode: string,
    input: {
      provider_code: string;
      model_name?: string | null;
      is_enabled: boolean;
      api_base_url?: string | null;
      api_key_env_name?: string | null;
      options_json?: Record<string, unknown>;
    },
  ) => Promise<void>;
};

export function useProviderSettingsController({
  providerConfigs,
  onSaveProviderConfig,
}: UseProviderSettingsControllerProps) {
  const [providerSavingCode, setProviderSavingCode] = useState("");
  const [providerDrafts, setProviderDrafts] = useState<Record<string, ProviderDraft>>({});
  const [error, setError] = useState("");

  useEffect(() => {
    const nextDrafts: Record<string, ProviderDraft> = {};
    for (const item of providerConfigs) {
      nextDrafts[item.feature_code] = buildProviderDraft(item);
    }
    setProviderDrafts(nextDrafts);
  }, [providerConfigs]);

  const handleProviderDraftChange = (featureCode: string, patch: Partial<ProviderDraft>) => {
    setProviderDrafts((current) => ({
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
    }));
  };

  const handleSaveProviderConfig = async (featureCode: string) => {
    const item = providerDrafts[featureCode];
    if (!item) {
      return;
    }

    setProviderSavingCode(featureCode);
    setError("");
    try {
      await onSaveProviderConfig(featureCode, {
        provider_code: item.provider_code,
        model_name: item.model_name || null,
        is_enabled: item.is_enabled,
        api_base_url: item.api_base_url || null,
        api_key_env_name: item.api_key_env_name || null,
        options_json: item.options_json,
      });
    } catch (caught) {
      setError(getActionErrorMessage(caught, "Save failed"));
    } finally {
      setProviderSavingCode("");
    }
  };

  const handleResetProviderConfig = (item: ProviderFeatureConfig) => {
    setProviderDrafts((current) => ({
      ...current,
      [item.feature_code]: buildProviderDraft(item),
    }));
  };

  const isProviderDraftDirty = (item: ProviderFeatureConfig) => {
    const draftItem = providerDrafts[item.feature_code];
    if (!draftItem) {
      return false;
    }
    return JSON.stringify(buildProviderDraft(item)) !== JSON.stringify(draftItem);
  };

  return {
    providerSavingCode,
    providerDrafts,
    error,
    handleProviderDraftChange,
    handleSaveProviderConfig,
    handleResetProviderConfig,
    isProviderDraftDirty,
  };
}

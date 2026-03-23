"use client";

import type { Dispatch, SetStateAction } from "react";

import type { ProviderFeatureConfig } from "../lib/types";

type StateSetter<T> = Dispatch<SetStateAction<T>>;

export type ProviderDraft = {
  provider_code: string;
  model_name: string;
  is_enabled: boolean;
  api_base_url: string;
  api_key_env_name: string;
  options_json: Record<string, unknown>;
};

export type UseProviderSettingsControllerProps = {
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

export type UseProviderSettingsControllerState = {
  providerSavingCode: string;
  setProviderSavingCode: StateSetter<string>;
  providerDrafts: Record<string, ProviderDraft>;
  setProviderDrafts: StateSetter<Record<string, ProviderDraft>>;
  error: string;
  setError: StateSetter<string>;
};

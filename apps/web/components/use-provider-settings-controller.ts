"use client";

import { useState } from "react";

import { createProviderSettingsControllerActions } from "./provider-settings-controller-actions";
import type {
  ProviderDraft,
  UseProviderSettingsControllerProps,
} from "./provider-settings-controller.types";
import { useProviderSettingsDraftSync } from "./use-provider-settings-draft-sync";

export function useProviderSettingsController({
  providerConfigs,
  onSaveProviderConfig,
}: UseProviderSettingsControllerProps) {
  const [providerSavingCode, setProviderSavingCode] = useState("");
  const [providerDrafts, setProviderDrafts] = useState<Record<string, ProviderDraft>>({});
  const [error, setError] = useState("");

  useProviderSettingsDraftSync({ providerConfigs, setProviderDrafts });
  const actions = createProviderSettingsControllerActions({
    onSaveProviderConfig,
    providerDrafts,
    setError,
    setProviderDrafts,
    setProviderSavingCode,
  });

  return {
    providerSavingCode,
    providerDrafts,
    error,
    ...actions,
  };
}

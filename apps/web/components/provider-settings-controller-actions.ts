"use client";

import type { ProviderFeatureConfig } from "../lib/types";
import {
  buildProviderDraft,
  buildProviderDraftPatch,
  isProviderDraftDirty as readProviderDraftDirty,
} from "./provider-settings-draft-helpers";
import type { CreateProviderSettingsControllerActionsInput } from "./provider-settings-controller-actions.types";
import type {
  ProviderDraft,
} from "./provider-settings-controller.types";

function getProviderSettingsActionErrorMessage(caught: unknown, fallbackMessage: string) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

export function createProviderSettingsControllerActions({
  onSaveProviderConfig,
  providerDrafts,
  setError,
  setProviderDrafts,
  setProviderSavingCode,
}: CreateProviderSettingsControllerActionsInput) {
  function handleProviderDraftChange(featureCode: string, patch: Partial<ProviderDraft>) {
    setProviderDrafts((current) => buildProviderDraftPatch(current, featureCode, patch));
  }

  async function handleSaveProviderConfig(featureCode: string) {
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
      setError(getProviderSettingsActionErrorMessage(caught, "Save failed"));
    } finally {
      setProviderSavingCode("");
    }
  }

  function handleResetProviderConfig(item: ProviderFeatureConfig) {
    setProviderDrafts((current) => ({
      ...current,
      [item.feature_code]: buildProviderDraft(item),
    }));
  }

  function isProviderDraftDirty(item: ProviderFeatureConfig) {
    return readProviderDraftDirty(providerDrafts, item);
  }

  return {
    handleProviderDraftChange,
    handleSaveProviderConfig,
    handleResetProviderConfig,
    isProviderDraftDirty,
  };
}

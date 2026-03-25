"use client";

import type { ProviderFeatureConfig } from "../lib/types";
import type { ProviderFeatureCardProps } from "./provider-feature-card.types";
import type { ProviderSettingsCopy } from "./provider-settings-copy";
import type { BuildProviderFeatureCardPropsInput } from "./provider-settings-panel-helpers.types";

export function readProviderSettingsAnchorHighlightClass(
  targetId: string,
  highlightedAnchor?: string | null,
): string {
  return highlightedAnchor === targetId ? " anchor-highlight" : "";
}

export function buildProviderSettingsSecretStatusFormatter(copy: ProviderSettingsCopy) {
  return (status: ProviderFeatureConfig["secret_status"]) => {
    if (status === "configured") {
      return copy.configured;
    }
    if (status === "missing") {
      return copy.missing;
    }
    return copy.notRequired;
  };
}

export function buildProviderFeatureCardProps({
  copy,
  draftItem,
  formatSecretStatus,
  highlightedAnchor,
  isDirty,
  item,
  locale,
  mediaStorageHealth,
  onProviderDraftChange,
  onRefreshMediaStorageHealth,
  onReset,
  onSave,
  providerSavingCode,
  refreshingMediaStorageHealth,
}: BuildProviderFeatureCardPropsInput): ProviderFeatureCardProps {
  return {
    copy,
    draftItem,
    formatSecretStatus,
    highlightedAnchor,
    isDirty,
    item,
    locale,
    mediaStorageHealth,
    onProviderDraftChange,
    onRefreshMediaStorageHealth,
    onReset,
    onSave,
    providerSavingCode,
    refreshingMediaStorageHealth,
  };
}

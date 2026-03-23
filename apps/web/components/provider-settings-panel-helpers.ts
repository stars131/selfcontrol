"use client";

import type { LocaleCode } from "../lib/locale";
import type { MediaStorageProviderHealth, ProviderFeatureConfig } from "../lib/types";
import type { ProviderFeatureCardProps } from "./provider-feature-card.types";
import type { ProviderSettingsCopy } from "./provider-settings-copy";
import type { ProviderDraft } from "./provider-settings-controller.types";

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
}: {
  copy: ProviderSettingsCopy;
  draftItem: ProviderDraft;
  formatSecretStatus: ProviderFeatureCardProps["formatSecretStatus"];
  highlightedAnchor?: string | null;
  isDirty: boolean;
  item: ProviderFeatureConfig;
  locale: LocaleCode;
  mediaStorageHealth?: MediaStorageProviderHealth | null;
  onProviderDraftChange: ProviderFeatureCardProps["onProviderDraftChange"];
  onRefreshMediaStorageHealth?: (() => Promise<void>) | null;
  onReset: ProviderFeatureCardProps["onReset"];
  onSave: ProviderFeatureCardProps["onSave"];
  providerSavingCode: string;
  refreshingMediaStorageHealth?: boolean;
}): ProviderFeatureCardProps {
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

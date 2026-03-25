"use client";

import { ProviderFeatureCard } from "./provider-feature-card";
import { buildProviderFeatureCardProps } from "./provider-settings-panel-helpers";
import type { ProviderSettingsFeatureListItemProps } from "./provider-settings-feature-list-item.types";

export function ProviderSettingsFeatureListItem({
  copy,
  formatSecretStatus,
  handleProviderDraftChange,
  handleResetProviderConfig,
  handleSaveProviderConfig,
  highlightedAnchor,
  isProviderDraftDirty,
  item,
  locale,
  mediaStorageHealth,
  onRefreshMediaStorageHealth,
  providerDrafts,
  providerSavingCode,
  refreshingMediaStorageHealth,
}: ProviderSettingsFeatureListItemProps) {
  const draftItem = providerDrafts[item.feature_code];
  if (!draftItem) {
    return null;
  }

  return (
    <ProviderFeatureCard
      {...buildProviderFeatureCardProps({
        copy,
        draftItem,
        formatSecretStatus,
        highlightedAnchor,
        isDirty: isProviderDraftDirty(item),
        item,
        locale,
        mediaStorageHealth,
        onProviderDraftChange: handleProviderDraftChange,
        onRefreshMediaStorageHealth,
        onReset: handleResetProviderConfig,
        onSave: handleSaveProviderConfig,
        providerSavingCode,
        refreshingMediaStorageHealth,
      })}
    />
  );
}

"use client";

import { ProviderFeatureCard } from "./provider-feature-card";
import {
  buildProviderFeatureCardProps,
  buildProviderSettingsSecretStatusFormatter,
} from "./provider-settings-panel-helpers";
import type { ProviderSettingsFeatureListProps } from "./provider-settings-feature-list.types";

export function ProviderSettingsFeatureList({
  copy,
  handleProviderDraftChange,
  handleResetProviderConfig,
  handleSaveProviderConfig,
  highlightedAnchor,
  isProviderDraftDirty,
  locale,
  mediaStorageHealth,
  onRefreshMediaStorageHealth,
  providerConfigs,
  providerDrafts,
  providerSavingCode,
  refreshingMediaStorageHealth,
}: ProviderSettingsFeatureListProps) {
  const formatSecretStatus = buildProviderSettingsSecretStatusFormatter(copy);

  return (
    <div className="record-list compact-list" style={{ marginTop: 12 }}>
      {providerConfigs.map((item) => {
        const draftItem = providerDrafts[item.feature_code];
        if (!draftItem) {
          return null;
        }
        const isDirty = isProviderDraftDirty(item);

        return (
          <ProviderFeatureCard
            {...buildProviderFeatureCardProps({
              copy,
              draftItem,
              formatSecretStatus,
              highlightedAnchor,
              isDirty,
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
            key={item.feature_code}
          />
        );
      })}
    </div>
  );
}

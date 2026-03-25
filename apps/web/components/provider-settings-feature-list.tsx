"use client";

import { ProviderSettingsFeatureListItem } from "./provider-settings-feature-list-item";
import { buildProviderSettingsSecretStatusFormatter } from "./provider-settings-panel-helpers";
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
      {providerConfigs.map((item) => (
        <ProviderSettingsFeatureListItem
          copy={copy}
          formatSecretStatus={formatSecretStatus}
          handleProviderDraftChange={handleProviderDraftChange}
          handleResetProviderConfig={handleResetProviderConfig}
          handleSaveProviderConfig={handleSaveProviderConfig}
          highlightedAnchor={highlightedAnchor}
          isProviderDraftDirty={isProviderDraftDirty}
          item={item}
          key={item.feature_code}
          locale={locale}
          mediaStorageHealth={mediaStorageHealth}
          onRefreshMediaStorageHealth={onRefreshMediaStorageHealth}
          providerDrafts={providerDrafts}
          providerSavingCode={providerSavingCode}
          refreshingMediaStorageHealth={refreshingMediaStorageHealth}
        />
      ))}
    </div>
  );
}

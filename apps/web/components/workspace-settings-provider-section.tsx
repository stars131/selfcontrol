"use client";

import { ProviderSettingsPanel } from "./provider-settings-panel";
import type { WorkspaceSettingsProviderSectionProps } from "./workspace-settings-provider-section.types";

export function WorkspaceSettingsProviderSection({
  highlightedAnchor,
  locale,
  managedRole,
  mediaStorageHealth,
  onRefreshMediaStorageHealth,
  onSaveProviderConfig,
  providerConfigs,
  refreshingMediaStorageHealth,
  providerTitle,
  viewerNotice,
}: WorkspaceSettingsProviderSectionProps) {
  if (!managedRole) {
    return (
      <section className="record-card">
        <div className="eyebrow">{providerTitle}</div>
        <div className="notice" style={{ marginTop: 12 }}>
          {viewerNotice}
        </div>
      </section>
    );
  }

  return (
    <ProviderSettingsPanel
      locale={locale}
      highlightedAnchor={highlightedAnchor}
      mediaStorageHealth={mediaStorageHealth}
      onRefreshMediaStorageHealth={onRefreshMediaStorageHealth}
      onSaveProviderConfig={onSaveProviderConfig}
      providerConfigs={providerConfigs}
      refreshingMediaStorageHealth={refreshingMediaStorageHealth}
    />
  );
}

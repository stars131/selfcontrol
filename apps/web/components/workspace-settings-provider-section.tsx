"use client";

import { ProviderSettingsPanel } from "./provider-settings-panel";
import { WorkspaceSettingsProviderViewerNotice } from "./workspace-settings-provider-viewer-notice";
import type { WorkspaceSettingsProviderSectionProps } from "./workspace-settings-provider-section.types";

export function WorkspaceSettingsProviderSection({ highlightedAnchor, locale, managedRole, mediaStorageHealth, onRefreshMediaStorageHealth, onSaveProviderConfig, providerConfigs, refreshingMediaStorageHealth, providerTitle, viewerNotice }: WorkspaceSettingsProviderSectionProps) {
  if (!managedRole) {
    return <WorkspaceSettingsProviderViewerNotice providerTitle={providerTitle} viewerNotice={viewerNotice} />;
  }

  return (
    <ProviderSettingsPanel locale={locale} highlightedAnchor={highlightedAnchor} mediaStorageHealth={mediaStorageHealth} onRefreshMediaStorageHealth={onRefreshMediaStorageHealth} onSaveProviderConfig={onSaveProviderConfig} providerConfigs={providerConfigs} refreshingMediaStorageHealth={refreshingMediaStorageHealth} />
  );
}

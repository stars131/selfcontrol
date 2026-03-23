"use client";

import type { LocaleCode } from "../lib/locale";
import type { MediaStorageProviderHealth, ProviderFeatureConfig } from "../lib/types";
import { ProviderSettingsPanel } from "./provider-settings-panel";

type WorkspaceSettingsProviderSectionProps = {
  highlightedAnchor: string | null;
  locale: LocaleCode;
  managedRole: "owner" | "editor" | null;
  mediaStorageHealth: MediaStorageProviderHealth | null;
  onRefreshMediaStorageHealth: (() => Promise<void>) | null;
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
  providerConfigs: ProviderFeatureConfig[];
  refreshingMediaStorageHealth: boolean;
  providerTitle: string;
  viewerNotice: string;
};

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

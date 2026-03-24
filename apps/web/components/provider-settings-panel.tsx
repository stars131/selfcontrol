"use client";

import { getProviderSettingsCopy } from "./provider-settings-copy";
import { ProviderSettingsFeatureList } from "./provider-settings-feature-list";
import {
  readProviderSettingsAnchorHighlightClass,
} from "./provider-settings-panel-helpers";
import type { ProviderSettingsPanelProps } from "./provider-settings-panel.types";
import { ProviderSettingsJumpNav } from "./provider-settings-jump-nav";
import { useProviderSettingsController } from "./use-provider-settings-controller";

export function ProviderSettingsPanel({
  locale,
  providerConfigs,
  mediaStorageHealth = null,
  refreshingMediaStorageHealth = false,
  highlightedAnchor = null,
  onRefreshMediaStorageHealth,
  onSaveProviderConfig,
}: ProviderSettingsPanelProps) {
  const copy = getProviderSettingsCopy(locale);
  const {
    providerSavingCode,
    providerDrafts,
    error,
    handleProviderDraftChange,
    handleSaveProviderConfig,
    handleResetProviderConfig,
    isProviderDraftDirty,
  } = useProviderSettingsController({
    providerConfigs,
    onSaveProviderConfig,
  });

  return (
    <section
      className={`record-card${readProviderSettingsAnchorHighlightClass("provider-settings", highlightedAnchor)}`}
      id="provider-settings"
    >
      <div className="eyebrow">{copy.title}</div>
      <div className="muted" style={{ marginTop: 8 }}>
        {copy.subtitle}
      </div>
      {error ? <div className="notice error" style={{ marginTop: 12 }}>{error}</div> : null}
      <ProviderSettingsJumpNav
        healthSectionLabel={copy.healthSection}
        jumpToLabel={copy.jumpTo}
        providerConfigs={providerConfigs}
      />
      <ProviderSettingsFeatureList
        copy={copy}
        handleProviderDraftChange={handleProviderDraftChange}
        handleResetProviderConfig={handleResetProviderConfig}
        handleSaveProviderConfig={handleSaveProviderConfig}
        highlightedAnchor={highlightedAnchor}
        isProviderDraftDirty={isProviderDraftDirty}
        locale={locale}
        mediaStorageHealth={mediaStorageHealth}
        onRefreshMediaStorageHealth={onRefreshMediaStorageHealth}
        providerConfigs={providerConfigs}
        providerDrafts={providerDrafts}
        providerSavingCode={providerSavingCode}
        refreshingMediaStorageHealth={refreshingMediaStorageHealth}
      />
    </section>
  );
}

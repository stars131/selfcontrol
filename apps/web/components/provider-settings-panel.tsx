"use client";

import type { LocaleCode } from "../lib/locale";
import type { MediaStorageProviderHealth, ProviderFeatureConfig } from "../lib/types";
import { getProviderSettingsCopy } from "./provider-settings-copy";
import { ProviderFeatureCard } from "./provider-feature-card";
import { ProviderSettingsJumpNav } from "./provider-settings-jump-nav";
import { useProviderSettingsController } from "./use-provider-settings-controller";

function readAnchorHighlightClass(targetId: string, highlightedAnchor?: string | null): string {
  return highlightedAnchor === targetId ? " anchor-highlight" : "";
}

export function ProviderSettingsPanel({
  locale,
  providerConfigs,
  mediaStorageHealth = null,
  refreshingMediaStorageHealth = false,
  highlightedAnchor = null,
  onRefreshMediaStorageHealth,
  onSaveProviderConfig,
}: {
  locale: LocaleCode;
  providerConfigs: ProviderFeatureConfig[];
  mediaStorageHealth?: MediaStorageProviderHealth | null;
  refreshingMediaStorageHealth?: boolean;
  highlightedAnchor?: string | null;
  onRefreshMediaStorageHealth?: (() => Promise<void>) | null;
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
}) {
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

  const formatSecretStatus = (status: ProviderFeatureConfig["secret_status"]) => {
    if (status === "configured") {
      return copy.configured;
    }
    if (status === "missing") {
      return copy.missing;
    }
    return copy.notRequired;
  };

  return (
    <section
      className={`record-card${readAnchorHighlightClass("provider-settings", highlightedAnchor)}`}
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
      <div className="record-list compact-list" style={{ marginTop: 12 }}>
        {providerConfigs.map((item) => {
          const draftItem = providerDrafts[item.feature_code];
          if (!draftItem) {
            return null;
          }
          const isDirty = isProviderDraftDirty(item);

          return (
            <ProviderFeatureCard
              copy={copy}
              draftItem={draftItem}
              formatSecretStatus={formatSecretStatus}
              highlightedAnchor={highlightedAnchor}
              isDirty={isDirty}
              key={item.feature_code}
              item={item}
              locale={locale}
              mediaStorageHealth={mediaStorageHealth}
              onProviderDraftChange={handleProviderDraftChange}
              onRefreshMediaStorageHealth={onRefreshMediaStorageHealth}
              onReset={handleResetProviderConfig}
              onSave={handleSaveProviderConfig}
              providerSavingCode={providerSavingCode}
              refreshingMediaStorageHealth={refreshingMediaStorageHealth}
            />
          );
        })}
      </div>
    </section>
  );
}

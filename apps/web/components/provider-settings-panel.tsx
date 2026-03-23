"use client";

import type { LocaleCode } from "../lib/locale";
import type { MediaStorageProviderHealth, ProviderFeatureConfig } from "../lib/types";
import { getProviderSettingsCopy } from "./provider-settings-copy";
import { ProviderFeatureCard } from "./provider-feature-card";
import {
  buildProviderFeatureCardProps,
  buildProviderSettingsSecretStatusFormatter,
  readProviderSettingsAnchorHighlightClass,
} from "./provider-settings-panel-helpers";
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
  const formatSecretStatus = buildProviderSettingsSecretStatusFormatter(copy);
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
    </section>
  );
}

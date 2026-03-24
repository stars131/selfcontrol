"use client";

import { ProviderFeatureCard } from "./provider-feature-card";
import {
  buildProviderFeatureCardProps,
  buildProviderSettingsSecretStatusFormatter,
} from "./provider-settings-panel-helpers";
import type { ProviderSettingsCopy } from "./provider-settings-copy";
import type { ProviderSettingsPanelProps } from "./provider-settings-panel.types";
import type { ProviderFeatureCardProps } from "./provider-feature-card.types";
import type { ProviderDraft } from "./provider-settings-controller.types";

type ProviderSettingsFeatureListProps = Pick<
  ProviderSettingsPanelProps,
  "highlightedAnchor" | "locale" | "mediaStorageHealth" | "onRefreshMediaStorageHealth" | "providerConfigs" | "refreshingMediaStorageHealth"
> & {
  copy: ProviderSettingsCopy;
  handleProviderDraftChange: ProviderFeatureCardProps["onProviderDraftChange"];
  handleResetProviderConfig: ProviderFeatureCardProps["onReset"];
  handleSaveProviderConfig: ProviderFeatureCardProps["onSave"];
  isProviderDraftDirty: (item: ProviderSettingsPanelProps["providerConfigs"][number]) => boolean;
  providerDrafts: Record<string, ProviderDraft>;
  providerSavingCode: string;
};

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

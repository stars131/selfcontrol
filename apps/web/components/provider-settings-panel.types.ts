"use client";

import type { LocaleCode } from "../lib/locale";
import type { MediaStorageProviderHealth, ProviderFeatureConfig } from "../lib/types";
import type { UseProviderSettingsControllerProps } from "./provider-settings-controller.types";

export type ProviderSettingsPanelProps = {
  locale: LocaleCode;
  providerConfigs: ProviderFeatureConfig[];
  mediaStorageHealth?: MediaStorageProviderHealth | null;
  refreshingMediaStorageHealth?: boolean;
  highlightedAnchor?: string | null;
  onRefreshMediaStorageHealth?: (() => Promise<void>) | null;
  onSaveProviderConfig: UseProviderSettingsControllerProps["onSaveProviderConfig"];
};

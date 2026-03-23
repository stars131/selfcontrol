"use client";

import type { LocaleCode } from "../lib/locale";
import type { MediaStorageProviderHealth, ProviderFeatureConfig } from "../lib/types";
import type { ProviderSettingsCopy } from "./provider-settings-copy";
import type { ProviderDraft } from "./provider-settings-controller.types";

export type ProviderFeatureCardProps = {
  copy: ProviderSettingsCopy;
  draftItem: ProviderDraft;
  formatSecretStatus: (status: ProviderFeatureConfig["secret_status"]) => string;
  highlightedAnchor?: string | null;
  isDirty: boolean;
  item: ProviderFeatureConfig;
  locale: LocaleCode;
  mediaStorageHealth?: MediaStorageProviderHealth | null;
  onProviderDraftChange: (featureCode: string, patch: Partial<ProviderDraft>) => void;
  onRefreshMediaStorageHealth?: (() => Promise<void>) | null;
  onReset: (item: ProviderFeatureConfig) => void;
  onSave: (featureCode: string) => Promise<void>;
  providerSavingCode: string;
  refreshingMediaStorageHealth?: boolean;
};

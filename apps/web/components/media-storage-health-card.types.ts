"use client";

import type { LocaleCode } from "../lib/locale";
import type { MediaStorageProviderHealth, ProviderFeatureConfig } from "../lib/types";

export type MediaStorageHealthCopy = {
  provider: string;
  storageHealth: string;
  refreshHealth: string;
  refreshing: string;
  secret: string;
  reachable: string;
  unreachable: string;
  available: string;
  unavailable: string;
  upload: string;
  download: string;
  delete: string;
  checkedAt: string;
  endpointRoot: string;
};

export type MediaStorageHealthCardProps = {
  copy: MediaStorageHealthCopy;
  locale: LocaleCode;
  mediaStorageHealth: MediaStorageProviderHealth;
  refreshingMediaStorageHealth: boolean;
  highlightedAnchor?: string | null;
  onRefreshMediaStorageHealth?: (() => Promise<void>) | null;
  formatSecretStatus: (status: ProviderFeatureConfig["secret_status"]) => string;
  readAnchorHighlightClass: (targetId: string, highlightedAnchor?: string | null) => string;
};

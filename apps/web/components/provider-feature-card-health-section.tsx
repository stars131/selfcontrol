"use client";

import { MediaStorageHealthCard } from "./media-storage-health-card";
import { readProviderFeatureCardAnchorHighlightClass } from "./provider-feature-card-helpers";
import type { ProviderFeatureCardHealthSectionProps } from "./provider-feature-card-health-section.types";

export function ProviderFeatureCardHealthSection({
  copy,
  formatSecretStatus,
  highlightedAnchor,
  item,
  locale,
  mediaStorageHealth,
  onRefreshMediaStorageHealth,
  refreshingMediaStorageHealth = false,
}: ProviderFeatureCardHealthSectionProps) {
  if (item.feature_code !== "media_storage" || !mediaStorageHealth) {
    return null;
  }

  return (
    <MediaStorageHealthCard
      copy={copy}
      formatSecretStatus={formatSecretStatus}
      highlightedAnchor={highlightedAnchor}
      locale={locale}
      mediaStorageHealth={mediaStorageHealth}
      onRefreshMediaStorageHealth={onRefreshMediaStorageHealth}
      readAnchorHighlightClass={readProviderFeatureCardAnchorHighlightClass}
      refreshingMediaStorageHealth={refreshingMediaStorageHealth}
    />
  );
}

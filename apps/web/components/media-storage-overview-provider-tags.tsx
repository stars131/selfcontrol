"use client";

import { useStoredLocale } from "../lib/locale";
import { getStorageProviderLabel } from "../lib/storage-provider-display";
import type { MediaStorageOverviewProviderTagsProps } from "./media-storage-overview-provider-tags.types";

export function MediaStorageOverviewProviderTags({
  mediaProcessingOverview,
}: MediaStorageOverviewProviderTagsProps) {
  const { locale } = useStoredLocale();
  if (!mediaProcessingOverview) {
    return null;
  }

  return (
    <div className="tag-row" style={{ marginBottom: 16 }}>
      {Object.entries(mediaProcessingOverview.by_storage_provider).map(([providerCode, count]) => (
        <span className="tag" key={providerCode}>
          {getStorageProviderLabel(locale, providerCode)}: {count}
        </span>
      ))}
    </div>
  );
}

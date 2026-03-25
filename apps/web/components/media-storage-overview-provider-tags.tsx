"use client";

import type { MediaStorageOverviewProviderTagsProps } from "./media-storage-overview-provider-tags.types";

export function MediaStorageOverviewProviderTags({
  mediaProcessingOverview,
}: MediaStorageOverviewProviderTagsProps) {
  if (!mediaProcessingOverview) {
    return null;
  }

  return (
    <div className="tag-row" style={{ marginBottom: 16 }}>
      {Object.entries(mediaProcessingOverview.by_storage_provider).map(([providerCode, count]) => (
        <span className="tag" key={providerCode}>
          {providerCode}: {count}
        </span>
      ))}
    </div>
  );
}

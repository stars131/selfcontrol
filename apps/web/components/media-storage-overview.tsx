"use client";

import { MediaStorageOverviewProviderTags } from "./media-storage-overview-provider-tags";
import { MediaStorageOverviewSummary } from "./media-storage-overview-summary";
import type { MediaStorageOverviewProps } from "./media-storage-overview.types";

export function MediaStorageOverview({
  mediaStorageSummary,
  mediaProcessingOverview,
  ...props
}: MediaStorageOverviewProps) {
  return (
    <>
      <MediaStorageOverviewSummary
        mediaProcessingOverview={mediaProcessingOverview}
        mediaStorageSummary={mediaStorageSummary}
        {...props}
      />
      <MediaStorageOverviewProviderTags mediaProcessingOverview={mediaProcessingOverview} />
    </>
  );
}

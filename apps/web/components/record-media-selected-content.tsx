"use client";

import { MediaAssetSection } from "./media-asset-section";
import { MediaStorageOverview } from "./media-storage-overview";
import { RecordMediaProcessingPanels } from "./record-media-processing-panels";
import {
  buildMediaAssetSectionProps,
  buildMediaStorageOverviewProps,
  buildRecordMediaProcessingPanelsProps,
} from "./record-media-selected-content-props";
import type { RecordMediaSelectedContentProps } from "./record-media-selected-content.types";

export function RecordMediaSelectedContent(props: RecordMediaSelectedContentProps) {
  return (
    <>
      <MediaStorageOverview {...buildMediaStorageOverviewProps(props)} />
      <RecordMediaProcessingPanels {...buildRecordMediaProcessingPanelsProps(props)} />
      <MediaAssetSection {...buildMediaAssetSectionProps(props)} />
    </>
  );
}

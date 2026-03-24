import type { MediaAsset, MediaDeadLetterOverview, RecordItem } from "../lib/types";
import { getSelectedRecordLocationHistory, getSelectedRecordLocationReview } from "./record-panel-controller-location-view-data";
import { getActionableDeadLetterIds, getSelectedRecordMediaSizeLabel } from "./record-panel-controller-view-data-helpers";
export function buildRecordPanelSelectedRecordViewData({
  mediaAssets,
  mediaDeadLetterOverview,
  selectedRecord,
}: {
  mediaAssets: MediaAsset[];
  mediaDeadLetterOverview: MediaDeadLetterOverview | null;
  selectedRecord: RecordItem | null;
}) {
  return {
    selectedLocationReview: getSelectedRecordLocationReview(selectedRecord),
    selectedLocationHistory: getSelectedRecordLocationHistory(selectedRecord),
    selectedRecordMediaSizeLabel: getSelectedRecordMediaSizeLabel(mediaAssets),
    actionableDeadLetterIds: getActionableDeadLetterIds(mediaDeadLetterOverview),
  };
}

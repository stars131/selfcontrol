import type { BuildRecordPanelSelectedRecordViewDataInput } from "./record-panel-controller-selected-record-view-data.types";
import { getSelectedRecordLocationHistory, getSelectedRecordLocationReview } from "./record-panel-controller-location-view-data";
import { getActionableDeadLetterIds, getSelectedRecordMediaSizeLabel } from "./record-panel-controller-view-data-helpers";
export function buildRecordPanelSelectedRecordViewData({
  mediaAssets,
  mediaDeadLetterOverview,
  selectedRecord,
}: BuildRecordPanelSelectedRecordViewDataInput) {
  return {
    selectedLocationReview: getSelectedRecordLocationReview(selectedRecord),
    selectedLocationHistory: getSelectedRecordLocationHistory(selectedRecord),
    selectedRecordMediaSizeLabel: getSelectedRecordMediaSizeLabel(mediaAssets),
    actionableDeadLetterIds: getActionableDeadLetterIds(mediaDeadLetterOverview),
  };
}

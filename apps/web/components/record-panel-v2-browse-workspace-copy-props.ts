import type { RecordBrowseWorkspaceCopyProps } from "./record-panel-v2-browse-workspace-output-props.types";
import type { RecordBrowseWorkspaceCopyPropsInput } from "./record-panel-v2-browse-workspace-props-input.types";
export function buildRecordBrowseWorkspaceCopyProps({ detailCopy, panelCopy }: RecordBrowseWorkspaceCopyPropsInput): RecordBrowseWorkspaceCopyProps {
  return {
    applyPresetLabel: panelCopy.applyPreset,
    avoidRecordLabel: detailCopy.avoidLabel,
    avoidStatsLabel: panelCopy.avoid,
    deletePresetLabel: panelCopy.deletePreset,
    flatListViewLabel: detailCopy.flatListView,
    foodLabel: panelCopy.food,
    mapPrefixLabel: detailCopy.mapPrefix,
    noContentLabel: detailCopy.noContent,
    noRecordsLabel: detailCopy.noRecords,
    noSavedFiltersLabel: panelCopy.noSavedFilters,
    ratingPrefixLabel: detailCopy.ratingPrefix,
    savedPresetLabel: panelCopy.savedPreset,
    timelineDayLabel: detailCopy.timelineDayLabel,
    timelineViewLabel: detailCopy.timelineView,
    unknownPlaceLabel: detailCopy.unknownPlace,
    untitledRecordLabel: detailCopy.untitledRecord,
    visibleRecordsLabel: panelCopy.visibleRecords,
  };
}

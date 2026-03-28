import type { RecordBrowseWorkspaceCopyProps } from "./record-panel-v2-browse-workspace-output-props.types";
import type { RecordBrowseWorkspaceCopyPropsInput } from "./record-panel-v2-browse-workspace-props-input.types";
export function buildRecordBrowseWorkspaceCopyProps(input: RecordBrowseWorkspaceCopyPropsInput): RecordBrowseWorkspaceCopyProps {
  return {
    applyPresetLabel: input.panelCopy.applyPreset,
    avoidRecordLabel: input.detailCopy.avoidLabel,
    avoidStatsLabel: input.panelCopy.avoid,
    deletePresetLabel: input.panelCopy.deletePreset,
    flatListViewLabel: input.detailCopy.flatListView,
    foodLabel: input.panelCopy.food,
    mapPrefixLabel: input.detailCopy.mapPrefix,
    noContentLabel: input.detailCopy.noContent,
    noRecordsLabel: input.detailCopy.noRecords,
    noSavedFiltersLabel: input.panelCopy.noSavedFilters,
    ratingPrefixLabel: input.detailCopy.ratingPrefix,
    savedPresetLabel: input.panelCopy.savedPreset,
    timelineDayLabel: input.detailCopy.timelineDayLabel,
    timelineViewLabel: input.detailCopy.timelineView,
    unknownPlaceLabel: input.detailCopy.unknownPlace,
    untitledRecordLabel: input.detailCopy.untitledRecord,
    visibleRecordsLabel: input.panelCopy.visibleRecords,
  };
}

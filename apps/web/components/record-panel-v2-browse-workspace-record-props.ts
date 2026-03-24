import type { RecordBrowseWorkspaceRecordProps } from "./record-panel-v2-browse-workspace-output-props.types";
import type { BuildRecordBrowseWorkspacePropsInput } from "./record-panel-v2-workspace-props.types";

export function buildRecordBrowseWorkspaceRecordProps(input: BuildRecordBrowseWorkspacePropsInput): RecordBrowseWorkspaceRecordProps {
  return {
    avoidCount: input.avoidCount,
    canWriteWorkspace: input.canWriteWorkspace,
    filteringRecords: input.filteringRecords,
    foodCount: input.foodCount,
    formatAvoidCountLabel: input.formatAvoidCountLabel,
    formatRecordTimestampLabel: input.formatRecordTimestampLabel,
    formatReviewStatusLabel: input.formatReviewStatusLabel,
    formatTimelineCountLabel: input.formatTimelineCountLabel,
    formatTimelineDateLabel: input.formatTimelineDateLabel,
    onSelectRecord: input.onSelectRecord,
    panelCopy: input.panelCopy,
    records: input.records,
    selectedRecordId: input.selectedRecordId,
    setViewMode: input.setViewMode,
    timelineDays: input.timelineDays,
    viewMode: input.viewMode,
    visibleRecordCount: input.records.length,
  };
}

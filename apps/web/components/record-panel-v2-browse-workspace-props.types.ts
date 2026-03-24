import type { RecordPanelV2Props } from "./record-panel-v2.types";
import type { RecordBrowseWorkspaceProps, RecordBrowseWorkspaceTypeSupport, RecordPanelDetailCopy } from "./record-panel-v2-workspace-props-core.types";
export type BuildRecordBrowseWorkspacePropsInput = Pick<RecordPanelV2Props, "canWriteWorkspace" | "records" | "timelineDays" | "selectedRecordId" | "recordFilter" | "searchPresets" | "onApplyLocationFilter" | "onApplyRecordFilter" | "onResetFilter" | "onSelectRecord"> &
  RecordBrowseWorkspaceTypeSupport & {
    avoidCount: number;
    detailCopy: RecordPanelDetailCopy;
    filteringRecords: boolean;
    foodCount: number;
    formatAvoidCountLabel: (count: number) => string;
    formatRecordTimestampLabel: (record: RecordBrowseWorkspaceProps["records"][number]) => string;
    formatReviewStatusLabel: (value?: string | null) => string;
    formatTimelineCountLabel: (count: number) => string;
    formatTimelineDateLabel: (value: string) => string;
    handleApplyFilter: () => Promise<void>;
    handleDeletePreset: (presetId: string) => Promise<void>;
    handleSavePreset: () => Promise<void>;
    presetName: string;
    savingSearchPreset: boolean;
    summarizeRecordFilterLabel: (filter: RecordBrowseWorkspaceTypeSupport["filterDraft"]) => string;
    viewMode: "timeline" | "list";
  };

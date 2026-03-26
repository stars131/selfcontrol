import type { RecordPanelController } from "./record-panel-v2-shell-props.types";
import type { RecordBrowseWorkspaceProps, RecordBrowseWorkspaceTypeSupport, RecordPanelDetailCopy } from "./record-panel-v2-workspace-props-core.types";

export type BuildRecordBrowseWorkspaceControllerInputArgs = { controller: RecordPanelController };
export type BuildRecordBrowseWorkspaceControllerInput =
  RecordBrowseWorkspaceTypeSupport & {
    avoidCount: number;
    detailCopy: RecordPanelDetailCopy; filteringRecords: boolean; foodCount: number;
    formatAvoidCountLabel: (count: number) => string; formatRecordSourceLabel: (value?: string | null) => string;
    formatRecordStatusLabel: (value?: string | null) => string;
    formatRecordTimestampLabel: (record: RecordBrowseWorkspaceProps["records"][number]) => string;
    formatRecordTypeLabel: (value?: string | null) => string; formatReviewStatusLabel: (value?: string | null) => string;
    formatTimelineCountLabel: (count: number) => string; formatTimelineDateLabel: (value: string) => string;
    handleApplyFilter: () => Promise<void>; handleDeletePreset: (presetId: string) => Promise<void>; handleSavePreset: () => Promise<void>;
    presetName: string; savingSearchPreset: boolean;
    summarizeRecordFilterLabel: (filter: RecordBrowseWorkspaceTypeSupport["filterDraft"]) => string;
    viewMode: "timeline" | "list";
  };

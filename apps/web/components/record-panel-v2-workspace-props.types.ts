import type { ComponentProps, Dispatch, SetStateAction } from "react";

import type { RecordFormState } from "../lib/record-panel-forms";
import type { PanelCopy } from "../lib/record-panel-ui";
import type { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { RecordFilterState } from "../lib/types";
import { RecordBrowseWorkspace } from "./record-browse-workspace";
import { RecordEditorWorkspace } from "./record-editor-workspace";
import type { RecordPanelV2Props } from "./record-panel-v2.types";

export type RecordBrowseWorkspaceProps = ComponentProps<typeof RecordBrowseWorkspace>;
export type RecordEditorWorkspaceProps = ComponentProps<typeof RecordEditorWorkspace>;
export type RecordPanelDetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

export type BuildRecordBrowseWorkspacePropsInput = Pick<
  RecordPanelV2Props,
  | "canWriteWorkspace"
  | "records"
  | "timelineDays"
  | "selectedRecordId"
  | "recordFilter"
  | "searchPresets"
  | "onApplyLocationFilter"
  | "onApplyRecordFilter"
  | "onResetFilter"
  | "onSelectRecord"
> & {
  avoidCount: number;
  detailCopy: RecordPanelDetailCopy;
  filterDraft: RecordFilterState;
  filteringRecords: boolean;
  foodCount: number;
  form: RecordFormState;
  formatAvoidCountLabel: (count: number) => string;
  formatRecordTimestampLabel: (record: RecordBrowseWorkspaceProps["records"][number]) => string;
  formatReviewStatusLabel: (value?: string | null) => string;
  formatTimelineCountLabel: (count: number) => string;
  formatTimelineDateLabel: (value: string) => string;
  handleApplyFilter: () => Promise<void>;
  handleDeletePreset: (presetId: string) => Promise<void>;
  handleSavePreset: () => Promise<void>;
  panelCopy: PanelCopy;
  presetName: string;
  savingSearchPreset: boolean;
  setFilterDraft: Dispatch<SetStateAction<RecordFilterState>>;
  setForm: Dispatch<SetStateAction<RecordFormState>>;
  setPresetName: Dispatch<SetStateAction<string>>;
  setViewMode: Dispatch<SetStateAction<"timeline" | "list">>;
  summarizeRecordFilterLabel: (filter: RecordFilterState) => string;
  viewMode: "timeline" | "list";
};

export type BuildRecordEditorWorkspacePropsInput = Pick<
  RecordPanelV2Props,
  | "authToken"
  | "canWriteWorkspace"
  | "workspaceId"
  | "mediaAssets"
  | "mediaDeadLetterOverview"
  | "mediaProcessingOverview"
  | "mediaStorageSummary"
  | "reminders"
  | "onDeleteReminder"
  | "onUpdateReminder"
> & {
  bulkRetryingDeadLetter: boolean;
  deleting: boolean;
  deletingMediaId: string | null;
  detailCopy: RecordPanelDetailCopy;
  downloadingMediaId: string | null;
  error: string;
  form: RecordEditorWorkspaceProps["form"];
  formatFileCountLabel: RecordEditorWorkspaceProps["formatFileCountLabel"];
  formatHistoryTimestampLabel: RecordEditorWorkspaceProps["formatHistoryTimestampLabel"];
  formatReminderEnabledLabel: RecordEditorWorkspaceProps["formatReminderEnabledLabel"];
  formatReminderStatusLabel: RecordEditorWorkspaceProps["formatReminderStatusLabel"];
  formatReminderTimestampLabel: RecordEditorWorkspaceProps["formatReminderTimestampLabel"];
  formatReviewStatusLabel: RecordEditorWorkspaceProps["formatReviewStatusLabel"];
  handleBulkRetryDeadLetter: (mode: "all" | "selected") => Promise<void>;
  handleClearDeadLetterSelection: () => void;
  handleCreateReminderSubmit: () => Promise<void>;
  handleDelete: () => void;
  handleDeleteMediaAsset: (mediaId: string) => Promise<void>;
  handleDownloadMedia: (asset: RecordEditorWorkspaceProps["mediaAssets"][number]) => Promise<void>;
  handleRefreshMedia: (mediaId: string) => Promise<void>;
  handleRetryMediaProcessing: (mediaId: string) => Promise<void>;
  handleSelectAllDeadLetter: () => void;
  handleSubmit: RecordEditorWorkspaceProps["onSubmit"];
  handleToggleDeadLetterSelection: (mediaId: string, checked: boolean) => void;
  handleUpload: RecordEditorWorkspaceProps["onUpload"];
  locale: RecordEditorWorkspaceProps["locale"];
  locationReviewForm: RecordEditorWorkspaceProps["locationReviewForm"];
  mediaIssueCopy: RecordEditorWorkspaceProps["mediaIssueCopy"];
  panelCopy: RecordEditorWorkspaceProps["panelCopy"];
  refreshingMediaId: string | null;
  reminderForm: RecordEditorWorkspaceProps["reminderForm"];
  retryingMediaId: string | null;
  saving: boolean;
  savingReminder: boolean;
  selectedDeadLetterIds: string[];
  selectedLocationHistory: RecordEditorWorkspaceProps["selectedLocationHistory"];
  selectedLocationReview: RecordEditorWorkspaceProps["selectedLocationReview"];
  selectedRecord: RecordEditorWorkspaceProps["selectedRecord"];
  selectedRecordMediaSizeLabel: string;
  setForm: RecordEditorWorkspaceProps["setForm"];
  setLocationReviewForm: RecordEditorWorkspaceProps["setLocationReviewForm"];
  setReminderForm: RecordEditorWorkspaceProps["setReminderForm"];
  summarizeHistoryActionLabel: RecordEditorWorkspaceProps["summarizeHistoryActionLabel"];
  uploading: boolean;
};

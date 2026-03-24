import type { BuildRecordEditorWorkspacePropsInput, RecordEditorWorkspaceProps } from "./record-panel-v2-workspace-props.types";

export type BuildRecordEditorWorkspaceBaseFormPropsInput = Pick<BuildRecordEditorWorkspacePropsInput, "form" | "locationReviewForm" | "reminderForm" | "selectedLocationHistory" | "selectedLocationReview" | "selectedRecord" | "setForm" | "setLocationReviewForm" | "setReminderForm">;
export type RecordEditorWorkspaceBaseFormProps = Pick<RecordEditorWorkspaceProps, "form" | "locationReviewForm" | "reminderForm" | "selectedLocationHistory" | "selectedLocationReview" | "selectedRecord" | "setForm" | "setLocationReviewForm" | "setReminderForm">;

import type { BuildRecordEditorWorkspaceBaseFormPropsInput, RecordEditorWorkspaceBaseFormProps } from "./record-panel-v2-editor-workspace-base-form-props.types";

export function buildRecordEditorWorkspaceBaseFormProps({ form, locationReviewForm, reminderForm, selectedLocationHistory, selectedLocationReview, selectedRecord, setForm, setLocationReviewForm, setReminderForm }: BuildRecordEditorWorkspaceBaseFormPropsInput): RecordEditorWorkspaceBaseFormProps {
  return { form, locationReviewForm, reminderForm, selectedLocationHistory, selectedLocationReview, selectedRecord, setForm, setLocationReviewForm, setReminderForm };
}

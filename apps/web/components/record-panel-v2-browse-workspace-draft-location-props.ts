import type { RecordBrowseWorkspaceDraftLocationPropsInput } from "./record-panel-v2-browse-workspace-props-input.types";

export function buildRecordBrowseWorkspaceDraftLocationProps({
  canWriteWorkspace,
  form,
  setForm,
}: RecordBrowseWorkspaceDraftLocationPropsInput) {
  return {
    draftLocation: canWriteWorkspace ? form.location ?? null : null,
    onDraftLocationChange: canWriteWorkspace
      ? (nextLocation: NonNullable<typeof form.location>) =>
          setForm((prev) => ({
            ...prev,
            location: nextLocation,
          }))
      : undefined,
  };
}

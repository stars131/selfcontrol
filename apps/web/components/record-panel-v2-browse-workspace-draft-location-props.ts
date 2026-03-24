import type { RecordBrowseWorkspaceDraftLocationProps } from "./record-panel-v2-browse-workspace-output-props.types";
import type { RecordBrowseWorkspaceDraftLocationPropsInput } from "./record-panel-v2-browse-workspace-props-input.types";

export function buildRecordBrowseWorkspaceDraftLocationProps({
  canWriteWorkspace,
  form,
  setForm,
}: RecordBrowseWorkspaceDraftLocationPropsInput): RecordBrowseWorkspaceDraftLocationProps {
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

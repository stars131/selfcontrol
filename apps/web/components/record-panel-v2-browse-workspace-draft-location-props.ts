import type { RecordBrowseWorkspaceDraftLocationProps } from "./record-panel-v2-browse-workspace-output-props.types";
import type { RecordBrowseWorkspaceDraftLocationPropsInput } from "./record-panel-v2-browse-workspace-props-input.types";

export function buildRecordBrowseWorkspaceDraftLocationProps(
  input: RecordBrowseWorkspaceDraftLocationPropsInput,
): RecordBrowseWorkspaceDraftLocationProps {
  return {
    draftLocation: input.canWriteWorkspace ? input.form.location ?? null : null,
    onDraftLocationChange: input.canWriteWorkspace
      ? (nextLocation: NonNullable<typeof input.form.location>) =>
          input.setForm((prev) => ({
            ...prev,
            location: nextLocation,
          }))
      : undefined,
  };
}

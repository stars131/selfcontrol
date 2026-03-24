import type { BuildRecordBrowseWorkspacePropsInput } from "./record-panel-v2-workspace-props.types";

export function buildRecordBrowseWorkspaceDraftLocationProps({
  canWriteWorkspace,
  form,
  setForm,
}: Pick<BuildRecordBrowseWorkspacePropsInput, "canWriteWorkspace" | "form" | "setForm">) {
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

import type { BuildRecordBrowseWorkspacePropsInput } from "./record-panel-v2-workspace-props.types";

export function buildRecordBrowseWorkspaceCopyProps({
  detailCopy,
  panelCopy,
}: Pick<BuildRecordBrowseWorkspacePropsInput, "detailCopy" | "panelCopy">) {
  return {
    applyPresetLabel: panelCopy.applyPreset,
    avoidRecordLabel: detailCopy.avoidLabel,
    avoidStatsLabel: panelCopy.avoid,
    deletePresetLabel: panelCopy.deletePreset,
    flatListViewLabel: detailCopy.flatListView,
    foodLabel: panelCopy.food,
    mapPrefixLabel: detailCopy.mapPrefix,
    noContentLabel: detailCopy.noContent,
    noRecordsLabel: detailCopy.noRecords,
    noSavedFiltersLabel: panelCopy.noSavedFilters,
    ratingPrefixLabel: detailCopy.ratingPrefix,
    savedPresetLabel: panelCopy.savedPreset,
    timelineDayLabel: detailCopy.timelineDayLabel,
    timelineViewLabel: detailCopy.timelineView,
    unknownPlaceLabel: detailCopy.unknownPlace,
    untitledRecordLabel: detailCopy.untitledRecord,
    visibleRecordsLabel: panelCopy.visibleRecords,
  };
}

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

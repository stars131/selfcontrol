"use client";
import { MapPanel } from "./map-panel";
import { RecordResultsView } from "./record-results-view";
import { RecordSearchPanel } from "./record-search-panel";
import type { RecordBrowseWorkspaceProps } from "./record-browse-workspace.types";
import type { MapPanelProps } from "./map-panel.types";
import type { RecordResultsViewProps } from "./record-results-view.types";
import type { RecordSearchPanelProps } from "./record-search-panel.types";

export function buildRecordSearchPanelProps(
  input: RecordBrowseWorkspaceProps,
): RecordSearchPanelProps {
  return {
    panelCopy: input.panelCopy,
    canWriteWorkspace: input.canWriteWorkspace,
    filteringRecords: input.filteringRecords,
    savingSearchPreset: input.savingSearchPreset,
    filterDraft: input.filterDraft,
    presetName: input.presetName,
    currentFilterSummary: input.currentFilterSummary,
    onQueryChange: (value) =>
      input.setFilterDraft((current) => ({
        ...current,
        query: value,
      })),
    onTypeCodeChange: (value) =>
      input.setFilterDraft((current) => ({
        ...current,
        typeCode: value,
      })),
    onAvoidOnlyChange: (value) =>
      input.setFilterDraft((current) => ({
        ...current,
        avoidOnly: value,
      })),
    onPresetNameChange: input.setPresetName,
    onApplyFilter: input.onApplyFilter,
    onResetFilter: input.onResetFilter,
    onSavePreset: input.onSavePreset,
  };
}

export function buildMapPanelProps(input: RecordBrowseWorkspaceProps): MapPanelProps {
  return {
    records: input.records,
    selectedRecordId: input.selectedRecordId,
    onSelectRecord: input.onSelectRecord,
    filteringRecords: input.filteringRecords,
    locationFilter: input.recordFilter,
    onApplyLocationFilter: input.onApplyLocationFilter,
    draftLocation: input.draftLocation,
    onDraftLocationChange: input.onDraftLocationChange,
  };
}

export function buildRecordResultsViewProps(
  input: RecordBrowseWorkspaceProps,
): RecordResultsViewProps {
  return {
    avoidLabel: input.avoidRecordLabel,
    flatListViewLabel: input.flatListViewLabel,
    formatAvoidCountLabel: input.formatAvoidCountLabel,
    formatRecordSourceLabel: input.formatRecordSourceLabel,
    formatRecordStatusLabel: input.formatRecordStatusLabel,
    formatRecordTimestampLabel: input.formatRecordTimestampLabel,
    formatRecordTypeLabel: input.formatRecordTypeLabel,
    formatReviewStatusLabel: input.formatReviewStatusLabel,
    formatTimelineCountLabel: input.formatTimelineCountLabel,
    formatTimelineDateLabel: input.formatTimelineDateLabel,
    mapPrefixLabel: input.mapPrefixLabel,
    noContentLabel: input.noContentLabel,
    noRecordsLabel: input.noRecordsLabel,
    onSelectRecord: input.onSelectRecord,
    onViewModeChange: input.setViewMode,
    ratingPrefixLabel: input.ratingPrefixLabel,
    records: input.records,
    selectedRecordId: input.selectedRecordId,
    timelineDayLabel: input.timelineDayLabel,
    timelineDays: input.timelineDays,
    timelineViewLabel: input.timelineViewLabel,
    unknownPlaceLabel: input.unknownPlaceLabel,
    untitledRecordLabel: input.untitledRecordLabel,
    viewMode: input.viewMode,
  };
}

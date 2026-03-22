"use client";

import type { Dispatch, SetStateAction } from "react";

import { MapPanel, type LocationDraft } from "./map-panel";
import { RecordPanelStats } from "./record-panel-stats";
import { RecordResultsView } from "./record-results-view";
import { RecordSearchPanel } from "./record-search-panel";
import { SearchPresetList } from "./search-preset-list";
import type { PanelCopy } from "../lib/record-panel-ui";
import type { RecordFilterState, RecordItem, SearchPresetItem, TimelineDay } from "../lib/types";

type RecordBrowseWorkspaceProps = {
  canWriteWorkspace: boolean;
  filteringRecords: boolean;
  savingSearchPreset: boolean;
  records: RecordItem[];
  timelineDays: TimelineDay[];
  selectedRecordId: string | null;
  recordFilter: RecordFilterState;
  filterDraft: RecordFilterState;
  setFilterDraft: Dispatch<SetStateAction<RecordFilterState>>;
  presetName: string;
  setPresetName: Dispatch<SetStateAction<string>>;
  searchPresets: SearchPresetItem[];
  viewMode: "timeline" | "list";
  setViewMode: Dispatch<SetStateAction<"timeline" | "list">>;
  draftLocation: LocationDraft | null;
  onDraftLocationChange?: (nextLocation: LocationDraft) => void;
  panelCopy: PanelCopy;
  applyPresetLabel: string;
  deletePresetLabel: string;
  noSavedFiltersLabel: string;
  savedPresetLabel: string;
  currentFilterSummary: string;
  avoidCount: number;
  foodCount: number;
  visibleRecordCount: number;
  visibleRecordsLabel: string;
  foodLabel: string;
  avoidStatsLabel: string;
  avoidRecordLabel: string;
  flatListViewLabel: string;
  mapPrefixLabel: string;
  noContentLabel: string;
  noRecordsLabel: string;
  ratingPrefixLabel: string;
  timelineDayLabel: string;
  timelineViewLabel: string;
  unknownPlaceLabel: string;
  untitledRecordLabel: string;
  formatAvoidCountLabel: (count: number) => string;
  formatRecordTimestampLabel: (record: RecordItem) => string;
  formatReviewStatusLabel: (value?: string | null) => string;
  formatTimelineCountLabel: (count: number) => string;
  formatTimelineDateLabel: (value: string) => string;
  summarizeRecordFilterLabel: (filter: RecordFilterState) => string;
  onApplyFilter: () => Promise<void>;
  onApplyLocationFilter: (
    nextFilter: Pick<RecordFilterState, "placeQuery" | "reviewStatus" | "mappedOnly">,
  ) => Promise<void>;
  onApplyPreset: (nextFilter: RecordFilterState) => Promise<void>;
  onDeletePreset: (presetId: string) => Promise<void>;
  onResetFilter: () => Promise<void>;
  onSavePreset: () => Promise<void>;
  onSelectRecord: (recordId: string | null) => void;
};

export function RecordBrowseWorkspace({
  canWriteWorkspace,
  filteringRecords,
  savingSearchPreset,
  records,
  timelineDays,
  selectedRecordId,
  recordFilter,
  filterDraft,
  setFilterDraft,
  presetName,
  setPresetName,
  searchPresets,
  viewMode,
  setViewMode,
  draftLocation,
  onDraftLocationChange,
  panelCopy,
  applyPresetLabel,
  deletePresetLabel,
  noSavedFiltersLabel,
  savedPresetLabel,
  currentFilterSummary,
  avoidCount,
  foodCount,
  visibleRecordCount,
  visibleRecordsLabel,
  foodLabel,
  avoidStatsLabel,
  avoidRecordLabel,
  flatListViewLabel,
  mapPrefixLabel,
  noContentLabel,
  noRecordsLabel,
  ratingPrefixLabel,
  timelineDayLabel,
  timelineViewLabel,
  unknownPlaceLabel,
  untitledRecordLabel,
  formatAvoidCountLabel,
  formatRecordTimestampLabel,
  formatReviewStatusLabel,
  formatTimelineCountLabel,
  formatTimelineDateLabel,
  summarizeRecordFilterLabel,
  onApplyFilter,
  onApplyLocationFilter,
  onApplyPreset,
  onDeletePreset,
  onResetFilter,
  onSavePreset,
  onSelectRecord,
}: RecordBrowseWorkspaceProps) {
  return (
    <>
      <RecordPanelStats
        avoidCount={avoidCount}
        avoidLabel={avoidStatsLabel}
        foodCount={foodCount}
        foodLabel={foodLabel}
        visibleRecordCount={visibleRecordCount}
        visibleRecordsLabel={visibleRecordsLabel}
      />

      <RecordSearchPanel
        canWriteWorkspace={canWriteWorkspace}
        currentFilterSummary={currentFilterSummary}
        filterDraft={filterDraft}
        filteringRecords={filteringRecords}
        onApplyFilter={onApplyFilter}
        onAvoidOnlyChange={(value) =>
          setFilterDraft((current) => ({
            ...current,
            avoidOnly: value,
          }))
        }
        onPresetNameChange={setPresetName}
        onQueryChange={(value) =>
          setFilterDraft((current) => ({
            ...current,
            query: value,
          }))
        }
        onResetFilter={onResetFilter}
        onSavePreset={onSavePreset}
        onTypeCodeChange={(value) =>
          setFilterDraft((current) => ({
            ...current,
            typeCode: value,
          }))
        }
        panelCopy={panelCopy}
        presetName={presetName}
        savingSearchPreset={savingSearchPreset}
      />
      <SearchPresetList
        applyPresetLabel={applyPresetLabel}
        canWriteWorkspace={canWriteWorkspace}
        deletePresetLabel={deletePresetLabel}
        emptyLabel={noSavedFiltersLabel}
        filteringRecords={filteringRecords}
        onApplyPreset={onApplyPreset}
        onDeletePreset={onDeletePreset}
        presets={searchPresets}
        savedPresetLabel={savedPresetLabel}
        summarizeRecordFilterLabel={summarizeRecordFilterLabel}
      />

      <MapPanel
        records={records}
        selectedRecordId={selectedRecordId}
        onSelectRecord={onSelectRecord}
        filteringRecords={filteringRecords}
        locationFilter={recordFilter}
        onApplyLocationFilter={onApplyLocationFilter}
        draftLocation={draftLocation}
        onDraftLocationChange={onDraftLocationChange}
      />

      <RecordResultsView
        avoidLabel={avoidRecordLabel}
        flatListViewLabel={flatListViewLabel}
        formatAvoidCountLabel={formatAvoidCountLabel}
        formatRecordTimestampLabel={formatRecordTimestampLabel}
        formatReviewStatusLabel={formatReviewStatusLabel}
        formatTimelineCountLabel={formatTimelineCountLabel}
        formatTimelineDateLabel={formatTimelineDateLabel}
        mapPrefixLabel={mapPrefixLabel}
        noContentLabel={noContentLabel}
        noRecordsLabel={noRecordsLabel}
        onSelectRecord={(recordId) => onSelectRecord(recordId)}
        onViewModeChange={setViewMode}
        ratingPrefixLabel={ratingPrefixLabel}
        records={records}
        selectedRecordId={selectedRecordId}
        timelineDayLabel={timelineDayLabel}
        timelineDays={timelineDays}
        timelineViewLabel={timelineViewLabel}
        unknownPlaceLabel={unknownPlaceLabel}
        untitledRecordLabel={untitledRecordLabel}
        viewMode={viewMode}
      />
    </>
  );
}

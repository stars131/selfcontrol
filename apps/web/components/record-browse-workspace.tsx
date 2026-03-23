"use client";

import { MapPanel, type LocationDraft } from "./map-panel";
import { RecordPanelStats } from "./record-panel-stats";
import { RecordResultsView } from "./record-results-view";
import { RecordSearchPanel } from "./record-search-panel";
import { SearchPresetList } from "./search-preset-list";
import {
  buildMapPanelProps,
  buildRecordResultsViewProps,
  buildRecordSearchPanelProps,
} from "./record-browse-workspace-props";
import type { RecordBrowseWorkspaceProps } from "./record-browse-workspace.types";

export function RecordBrowseWorkspace(props: RecordBrowseWorkspaceProps) {
  const searchPanelProps = buildRecordSearchPanelProps(props);
  const mapPanelProps = buildMapPanelProps(props);
  const resultsViewProps = buildRecordResultsViewProps(props);

  return (
    <>
      <RecordPanelStats
        avoidCount={props.avoidCount}
        avoidLabel={props.avoidStatsLabel}
        foodCount={props.foodCount}
        foodLabel={props.foodLabel}
        visibleRecordCount={props.visibleRecordCount}
        visibleRecordsLabel={props.visibleRecordsLabel}
      />

      <RecordSearchPanel {...searchPanelProps} />
      <SearchPresetList
        applyPresetLabel={props.applyPresetLabel}
        canWriteWorkspace={props.canWriteWorkspace}
        deletePresetLabel={props.deletePresetLabel}
        emptyLabel={props.noSavedFiltersLabel}
        filteringRecords={props.filteringRecords}
        onApplyPreset={props.onApplyPreset}
        onDeletePreset={props.onDeletePreset}
        presets={props.searchPresets}
        savedPresetLabel={props.savedPresetLabel}
        summarizeRecordFilterLabel={props.summarizeRecordFilterLabel}
      />

      <MapPanel {...mapPanelProps} />

      <RecordResultsView {...resultsViewProps} />
    </>
  );
}

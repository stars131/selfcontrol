import { getLocationSourceLabel } from "../lib/location-source-display";
import type {
  MapPanelContentViewInput,
  MapPanelContentViewProps,
} from "./map-panel-content-view.types";

export function buildMapPanelContentViewProps(
  input: MapPanelContentViewInput,
): MapPanelContentViewProps {
  return {
    drilldownCardProps: {
      filterDraft: input.controller.filterDraft,
      filteringRecords: input.controller.filteringRecords,
      onApplyFilter: input.controller.handleApplyFilter,
      onClearFilter: input.controller.handleClearFilter,
      onFilterDraftChange: input.controller.setFilterDraft,
      onUseMappedOnly: input.controller.handleUseMappedOnly,
    },
    headerProps: {
      confirmedCount: input.controller.confirmedCount,
      confirmedCountLabel: input.panelCopy.confirmedCountLabel,
      editableDescription: input.panelCopy.mapEditableDescription,
      isEditable: input.controller.isEditable,
      mappedCount: input.controller.mappedRecords.length,
      mappedCountLabel: input.panelCopy.mappedCountLabel,
      needsReviewCount: input.controller.needsReviewCount,
      needsReviewCountLabel: input.panelCopy.needsReviewCountLabel,
      readonlyDescription: input.panelCopy.mapReadonlyDescription,
      title: input.panelCopy.mapTitle,
    },
    mappedRecordsListProps: {
      confirmedLabel: input.panelCopy.confirmed,
      mappedRecords: input.controller.mappedRecords,
      needsReviewLabel: input.panelCopy.needsReview,
      onSelectRecord: input.onSelectRecord,
      pendingLabel: input.panelCopy.pending,
      selectedRecordId: input.selectedRecordId,
    },
    searchFormProps: {
      onSearchQueryChange: input.controller.setSearchQuery,
      onSubmit: input.controller.handleSearch,
      searchActionLabel: input.panelCopy.searchPlace,
      searchLabel: input.panelCopy.locationSearch,
      searchPlaceholder: input.panelCopy.locationSearchPlaceholder,
      searchQuery: input.controller.searchQuery,
      searching: input.controller.searching,
      searchingLabel: input.panelCopy.searchingPlace,
    },
    showSearchForm: input.controller.isEditable,
    statusNoticesProps: {
      currentPointLabel: input.panelCopy.currentPoint,
      draftCoordinates: input.controller.draftCoordinates,
      draftLocation: input.draftLocation,
      draftLocationSourceLabel: getLocationSourceLabel(input.draftLocation?.source, input.panelCopy),
      isEditable: input.controller.isEditable,
      loadError: input.controller.loadError,
      mappedRecordCount: input.controller.mappedRecords.length,
      noLocationSelectedLabel: input.panelCopy.noLocationSelected,
      noMappedRecordsLabel: input.panelCopy.noMappedRecords,
      searchError: input.controller.searchError,
    },
  };
}

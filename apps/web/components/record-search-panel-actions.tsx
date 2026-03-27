"use client";

import type { RecordSearchPanelActionsProps } from "./record-search-panel-actions.types";

export function RecordSearchPanelActions({
  filteringRecords,
  onApplyFilter,
  onResetFilter,
  panelCopy,
}: RecordSearchPanelActionsProps) {
  return (
    <div className="action-row">
      <button className="button secondary" disabled={filteringRecords} type="button" onClick={() => void onApplyFilter()}>
        {filteringRecords ? panelCopy.filtering : panelCopy.applyAdvancedFilter}
      </button>
      <button className="button secondary" disabled={filteringRecords} type="button" onClick={() => void onResetFilter()}>
        {panelCopy.resetList}
      </button>
    </div>
  );
}

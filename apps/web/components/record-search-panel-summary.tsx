"use client";

import type { RecordSearchPanelSummaryProps } from "./record-search-panel-summary.types";

export function RecordSearchPanelSummary({
  currentFilterSummary,
}: RecordSearchPanelSummaryProps) {
  return <div className="muted">{currentFilterSummary}</div>;
}

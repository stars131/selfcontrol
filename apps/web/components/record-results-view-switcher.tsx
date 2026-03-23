"use client";

type RecordResultsViewSwitcherProps = {
  flatListViewLabel: string;
  onViewModeChange: (mode: "timeline" | "list") => void;
  timelineViewLabel: string;
  viewMode: "timeline" | "list";
};

export function RecordResultsViewSwitcher({
  flatListViewLabel,
  onViewModeChange,
  timelineViewLabel,
  viewMode,
}: RecordResultsViewSwitcherProps) {
  return (
    <div style={{ marginTop: 20 }} className="action-row">
      <button
        className={viewMode === "timeline" ? "button" : "button secondary"}
        type="button"
        onClick={() => onViewModeChange("timeline")}
      >
        {timelineViewLabel}
      </button>
      <button
        className={viewMode === "list" ? "button" : "button secondary"}
        type="button"
        onClick={() => onViewModeChange("list")}
      >
        {flatListViewLabel}
      </button>
    </div>
  );
}

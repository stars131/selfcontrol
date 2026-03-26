"use client";

import type { MapPanelHeaderProps } from "./map-panel-header.types";

export function MapPanelHeader({
  confirmedCount,
  confirmedCountLabel,
  editableDescription,
  isEditable,
  mappedCount,
  mappedCountLabel,
  needsReviewCount,
  needsReviewCountLabel,
  readonlyDescription,
  title,
}: MapPanelHeaderProps) {
  return (
    <>
      <div className="eyebrow">{title}</div>
      <div className="muted" style={{ marginTop: 8 }}>
        {isEditable ? editableDescription : readonlyDescription}
      </div>
      <div className="tag-row">
        <span className="tag">{mappedCount} {mappedCountLabel}</span>
        <span className="tag">{confirmedCount} {confirmedCountLabel}</span>
        <span className="tag">{needsReviewCount} {needsReviewCountLabel}</span>
      </div>
    </>
  );
}

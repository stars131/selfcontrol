"use client";

import { LocationReviewHistoryList } from "./location-review-history-list";
import { LocationReviewStatusSummary } from "./location-review-status-summary";
import type { LocationReviewPanelProps } from "./location-review-panel.types";

export function LocationReviewPanel({
  panelCopy,
  canWriteWorkspace,
  hasSelectedRecord,
  reviewForm,
  selectedLocationReview,
  selectedLocationHistory,
  formatReviewStatusLabel,
  formatHistoryTimestampLabel,
  summarizeHistoryActionLabel,
  onStatusChange,
  onNoteChange,
  onMarkConfirmed,
  onMarkNeedsReview,
  onResetReview,
}: LocationReviewPanelProps) {
  return (
    <div className="record-card form-stack">
      <div className="eyebrow">{panelCopy.locationReview}</div>
      <div className="muted">{panelCopy.locationReviewDescription}</div>
      <div className="inline-fields">
        <label className="field">
          <span className="field-label">{panelCopy.reviewStatus}</span>
          <select
            className="input"
            disabled={!canWriteWorkspace}
            value={reviewForm.status}
            onChange={(event) => onStatusChange(event.target.value)}
          >
            <option value="pending">{panelCopy.pending}</option>
            <option value="confirmed">{panelCopy.confirmed}</option>
            <option value="needs_review">{panelCopy.needsReview}</option>
          </select>
        </label>
        <label className="field" style={{ gridColumn: "span 2" }}>
          <span className="field-label">{panelCopy.reviewNote}</span>
          <input
            className="input"
            disabled={!canWriteWorkspace}
            value={reviewForm.note}
            onChange={(event) => onNoteChange(event.target.value)}
            placeholder={panelCopy.reviewNotePlaceholder}
          />
        </label>
      </div>
      <div className="action-row">
        <button className="button secondary" type="button" disabled={!canWriteWorkspace} onClick={onMarkConfirmed}>
          {panelCopy.markConfirmed}
        </button>
        <button className="button secondary" type="button" disabled={!canWriteWorkspace} onClick={onMarkNeedsReview}>
          {panelCopy.markNeedsReview}
        </button>
        <button className="button secondary" type="button" disabled={!canWriteWorkspace} onClick={onResetReview}>
          {panelCopy.resetReview}
        </button>
      </div>
      {hasSelectedRecord ? (
        <LocationReviewStatusSummary
          formatHistoryTimestampLabel={formatHistoryTimestampLabel}
          formatReviewStatusLabel={formatReviewStatusLabel}
          panelCopy={panelCopy}
          selectedLocationReview={selectedLocationReview}
        />
      ) : null}
      {hasSelectedRecord ? (
        <LocationReviewHistoryList
          formatHistoryTimestampLabel={formatHistoryTimestampLabel}
          formatReviewStatusLabel={formatReviewStatusLabel}
          panelCopy={panelCopy}
          selectedLocationHistory={selectedLocationHistory}
          summarizeHistoryActionLabel={summarizeHistoryActionLabel}
        />
      ) : null}
    </div>
  );
}

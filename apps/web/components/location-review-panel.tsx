"use client";

import type { PanelCopy } from "../lib/record-panel-ui";
import type { LocationHistoryEntry, LocationReview } from "../lib/types";

type LocationReviewPanelProps = {
  panelCopy: PanelCopy;
  canWriteWorkspace: boolean;
  hasSelectedRecord: boolean;
  reviewForm: {
    status: string;
    note: string;
  };
  selectedLocationReview: LocationReview | null;
  selectedLocationHistory: LocationHistoryEntry[];
  formatReviewStatusLabel: (value?: string | null) => string;
  formatHistoryTimestampLabel: (value?: string | null) => string;
  summarizeHistoryActionLabel: (entry: LocationHistoryEntry) => string;
  onStatusChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onMarkConfirmed: () => void;
  onMarkNeedsReview: () => void;
  onResetReview: () => void;
};

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
      {hasSelectedRecord && selectedLocationReview ? (
        <div className="detail-grid">
          <div className="subtle-card">
            <div className="eyebrow">{panelCopy.storedStatus}</div>
            <div style={{ marginTop: 8, fontWeight: 600 }}>
              {formatReviewStatusLabel(selectedLocationReview.status)}
            </div>
          </div>
          <div className="subtle-card">
            <div className="eyebrow">{panelCopy.lastUpdated}</div>
            <div style={{ marginTop: 8, fontWeight: 600 }}>
              {formatHistoryTimestampLabel(selectedLocationReview.updated_at)}
            </div>
          </div>
          <div className="subtle-card">
            <div className="eyebrow">{panelCopy.confirmedAt}</div>
            <div style={{ marginTop: 8, fontWeight: 600 }}>
              {selectedLocationReview.confirmed_at
                ? formatHistoryTimestampLabel(selectedLocationReview.confirmed_at)
                : panelCopy.notConfirmed}
            </div>
          </div>
        </div>
      ) : null}
      {hasSelectedRecord ? (
        <div className="history-list">
          {selectedLocationHistory.length ? (
            selectedLocationHistory.slice(0, 6).map((entry) => (
              <article className="history-item" key={`${entry.changed_at}-${entry.action_code}`}>
                <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div className="eyebrow">{summarizeHistoryActionLabel(entry)}</div>
                    <div style={{ marginTop: 8, fontWeight: 600 }}>
                      {entry.place_name || entry.address || panelCopy.unnamedLocation}
                    </div>
                  </div>
                  <div className="muted">{formatHistoryTimestampLabel(entry.changed_at)}</div>
                </div>
                <div className="muted" style={{ marginTop: 8 }}>
                  {entry.address || panelCopy.noAddress}
                </div>
                {(entry.latitude ?? null) !== null && (entry.longitude ?? null) !== null ? (
                  <div className="muted" style={{ marginTop: 8 }}>
                    {entry.latitude}, {entry.longitude}
                  </div>
                ) : null}
                <div className="tag-row">
                  {entry.source ? <span className="tag">{entry.source}</span> : null}
                  {entry.review_status ? <span className="tag">{formatReviewStatusLabel(entry.review_status)}</span> : null}
                </div>
                {entry.review_note ? (
                  <div className="muted" style={{ marginTop: 8 }}>
                    {entry.review_note}
                  </div>
                ) : null}
              </article>
            ))
          ) : (
            <div className="notice">{panelCopy.noLocationHistory}</div>
          )}
        </div>
      ) : null}
    </div>
  );
}

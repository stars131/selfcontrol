"use client";

import Link from "next/link";

import {
  getMediaIssueAction,
  getMediaIssueLabel,
  getProcessingStatusLabel,
  getRetryStateLabel,
} from "../lib/media-issue-display";
import { buildMediaIssueSettingsHref, canRetryMediaIssue } from "../lib/record-panel-media";
import type { LocaleCode } from "../lib/locale";
import type { MediaIssueCopy } from "../lib/record-panel-ui";
import type { MediaDeadLetterOverview } from "../lib/types";

type DeadLetterRecoveryPanelProps = {
  locale: LocaleCode;
  canWriteWorkspace: boolean;
  workspaceId: string;
  mediaIssueCopy: MediaIssueCopy;
  mediaDeadLetterOverview: MediaDeadLetterOverview | null;
  selectedDeadLetterIds: string[];
  bulkRetryingDeadLetter: boolean;
  retryingMediaId: string | null;
  formatHistoryTimestampLabel: (value?: string | null) => string;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onBulkRetrySelected: () => Promise<void>;
  onBulkRetryAll: () => Promise<void>;
  onToggleSelection: (mediaId: string, checked: boolean) => void;
  onRetryMediaProcessing: (mediaId: string) => Promise<void>;
};

export function DeadLetterRecoveryPanel({
  locale,
  canWriteWorkspace,
  workspaceId,
  mediaIssueCopy,
  mediaDeadLetterOverview,
  selectedDeadLetterIds,
  bulkRetryingDeadLetter,
  retryingMediaId,
  formatHistoryTimestampLabel,
  onSelectAll,
  onClearSelection,
  onBulkRetrySelected,
  onBulkRetryAll,
  onToggleSelection,
  onRetryMediaProcessing,
}: DeadLetterRecoveryPanelProps) {
  return (
    <div className="record-card form-stack" style={{ marginBottom: 16 }}>
      <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div className="eyebrow">{mediaIssueCopy.deadLetterTitle}</div>
          <div className="muted" style={{ marginTop: 8 }}>
            {mediaIssueCopy.deadLetterDescription}
          </div>
        </div>
        <div className="tag-row">
          <span className="tag">
            {mediaDeadLetterOverview?.total_count ?? 0} {mediaIssueCopy.itemSuffix}
          </span>
          {mediaDeadLetterOverview
            ? Object.entries(mediaDeadLetterOverview.by_retry_state).map(([retryState, count]) => (
                <span className="tag" key={retryState}>
                  {getRetryStateLabel(locale, retryState)}: {count}
                </span>
              ))
            : null}
          {mediaDeadLetterOverview
            ? Object.entries(mediaDeadLetterOverview.by_issue_category).map(([issueCategory, count]) => (
                <span className="tag" key={issueCategory}>
                  {getMediaIssueLabel(locale, { issue_category: issueCategory, issue_label: null })}: {count}
                </span>
              ))
            : null}
        </div>
      </div>
      {mediaDeadLetterOverview?.items.length ? (
        <>
          <div className="action-row">
            <button
              className="button secondary"
              disabled={bulkRetryingDeadLetter}
              type="button"
              onClick={onSelectAll}
            >
              {mediaIssueCopy.selectVisible}
            </button>
            <button
              className="button secondary"
              disabled={bulkRetryingDeadLetter || !selectedDeadLetterIds.length}
              type="button"
              onClick={onClearSelection}
            >
              {mediaIssueCopy.clearSelection}
            </button>
            <button
              className="button secondary"
              disabled={bulkRetryingDeadLetter || !selectedDeadLetterIds.length}
              type="button"
              onClick={() => void onBulkRetrySelected()}
            >
              {bulkRetryingDeadLetter
                ? mediaIssueCopy.retrying
                : `${mediaIssueCopy.retrySelectedPrefix} (${selectedDeadLetterIds.length})`}
            </button>
            <button
              className="button secondary"
              disabled={bulkRetryingDeadLetter}
              type="button"
              onClick={() => void onBulkRetryAll()}
            >
              {bulkRetryingDeadLetter ? mediaIssueCopy.retrying : mediaIssueCopy.retryAll}
            </button>
          </div>
          <div className="record-list compact-list">
            {mediaDeadLetterOverview.items.map((item) => (
              <article className="record-card" key={item.media_id}>
                <label className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <input
                      checked={selectedDeadLetterIds.includes(item.media_id)}
                      disabled={bulkRetryingDeadLetter || !canRetryMediaIssue(item)}
                      type="checkbox"
                      onChange={(event) => onToggleSelection(item.media_id, event.target.checked)}
                    />
                    <div>
                      <div className="eyebrow">{item.media_type}</div>
                      <div>{item.original_filename}</div>
                    </div>
                  </div>
                  <div className="tag-row">
                    <span className="tag">{getProcessingStatusLabel(locale, item.processing_status)}</span>
                    <span className="tag">{item.storage_provider}</span>
                    {item.processing_retry_state ? (
                      <span className="tag">
                        {mediaIssueCopy.retryStatePrefix} {getRetryStateLabel(locale, item.processing_retry_state)}
                      </span>
                    ) : null}
                    {getMediaIssueLabel(locale, item) ? <span className="tag">{getMediaIssueLabel(locale, item)}</span> : null}
                  </div>
                </label>
                <div className="muted" style={{ marginTop: 8 }}>
                  {mediaIssueCopy.lastAttempt}: {formatHistoryTimestampLabel(item.processing_last_attempt_at)}
                </div>
                {item.processing_last_failure_at ? (
                  <div className="muted" style={{ marginTop: 6 }}>
                    {mediaIssueCopy.lastFailure}: {formatHistoryTimestampLabel(item.processing_last_failure_at)}
                  </div>
                ) : null}
                {typeof item.processing_retry_count === "number" ? (
                  <div className="muted" style={{ marginTop: 6 }}>
                    {mediaIssueCopy.retryBudgetUsed}: {item.processing_retry_count}
                    {typeof item.processing_retry_max_attempts === "number"
                      ? ` / ${item.processing_retry_max_attempts}`
                      : ""}
                  </div>
                ) : null}
                {getMediaIssueAction(locale, item).label ? (
                  <div className="notice" style={{ marginTop: 10 }}>
                    {getMediaIssueAction(locale, item).label}
                    {getMediaIssueAction(locale, item).detail ? `: ${getMediaIssueAction(locale, item).detail}` : ""}
                  </div>
                ) : null}
                {canWriteWorkspace || buildMediaIssueSettingsHref(workspaceId, item) ? (
                  <div className="action-row" style={{ marginTop: 10 }}>
                    {canWriteWorkspace && canRetryMediaIssue(item) ? (
                      <button
                        className="button secondary"
                        disabled={retryingMediaId === item.media_id}
                        type="button"
                        onClick={() => void onRetryMediaProcessing(item.media_id)}
                      >
                        {retryingMediaId === item.media_id ? mediaIssueCopy.retrying : mediaIssueCopy.retryNow}
                      </button>
                    ) : null}
                    {buildMediaIssueSettingsHref(workspaceId, item) ? (
                      <Link className="button secondary" href={buildMediaIssueSettingsHref(workspaceId, item) ?? "#"}>
                        {mediaIssueCopy.openSettings}
                      </Link>
                    ) : null}
                  </div>
                ) : null}
                {item.processing_error ? (
                  <div className="notice error" style={{ marginTop: 10 }}>
                    {item.processing_error}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </>
      ) : (
        <div className="notice">{mediaIssueCopy.noDeadLetter}</div>
      )}
    </div>
  );
}

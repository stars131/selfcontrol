"use client";

import Link from "next/link";

import {
  getMediaIssueAction,
  getMediaIssueLabel,
  getProcessingStatusLabel,
  getRetryStateLabel,
} from "../lib/media-issue-display";
import { buildMediaIssueSettingsHref, canRetryMediaIssue } from "../lib/record-panel-media";
import type { DeadLetterRecoveryItemCardProps } from "./dead-letter-recovery-panel.types";

export function DeadLetterRecoveryItemCard({
  item,
  locale,
  canWriteWorkspace,
  workspaceId,
  mediaIssueCopy,
  selectedDeadLetterIds,
  bulkRetryingDeadLetter,
  retryingMediaId,
  formatHistoryTimestampLabel,
  onToggleSelection,
  onRetryMediaProcessing,
}: DeadLetterRecoveryItemCardProps) {
  const action = getMediaIssueAction(locale, item);
  const issueLabel = getMediaIssueLabel(locale, item);
  const settingsHref = buildMediaIssueSettingsHref(workspaceId, item);

  return (
    <article className="record-card">
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
          {issueLabel ? <span className="tag">{issueLabel}</span> : null}
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
      {action.label ? (
        <div className="notice" style={{ marginTop: 10 }}>
          {action.label}
          {action.detail ? `: ${action.detail}` : ""}
        </div>
      ) : null}
      {canWriteWorkspace || settingsHref ? (
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
          {settingsHref ? (
            <Link className="button secondary" href={settingsHref}>
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
  );
}

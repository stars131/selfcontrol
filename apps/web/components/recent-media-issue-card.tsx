"use client";

import Link from "next/link";

import {
  getMediaIssueAction,
  getMediaIssueLabel,
  getProcessingStatusLabel,
  getRetryStateLabel,
} from "../lib/media-issue-display";
import { buildMediaIssueSettingsHref, canRetryMediaIssue } from "../lib/record-panel-media";
import type { RecentMediaIssueCardProps } from "./recent-media-issues-panel.types";

export function RecentMediaIssueCard({
  issue,
  locale,
  canWriteWorkspace,
  workspaceId,
  mediaIssueCopy,
  retryingMediaId,
  formatHistoryTimestampLabel,
  onRetryMediaProcessing,
}: RecentMediaIssueCardProps) {
  const action = getMediaIssueAction(locale, issue);
  const issueLabel = getMediaIssueLabel(locale, issue);
  const settingsHref = buildMediaIssueSettingsHref(workspaceId, issue);
  const retrying = retryingMediaId === issue.media_id;

  return (
    <article className="record-card">
      <div className="eyebrow">{issue.media_type}</div>
      <div>{issue.original_filename}</div>
      <div className="tag-row">
        <span className="tag">{getProcessingStatusLabel(locale, issue.processing_status)}</span>
        <span className="tag">{issue.storage_provider}</span>
        {issue.processing_source ? <span className="tag">{issue.processing_source}</span> : null}
        {issue.remote_fetch_status ? (
          <span className="tag">
            {mediaIssueCopy.fetchPrefix} {issue.remote_fetch_status}
          </span>
        ) : null}
        {issue.extraction_mode ? <span className="tag">{issue.extraction_mode}</span> : null}
        {issue.processing_retry_state ? (
          <span className="tag">
            {mediaIssueCopy.retryStatePrefix} {getRetryStateLabel(locale, issue.processing_retry_state)}
          </span>
        ) : null}
        {issueLabel ? <span className="tag">{issueLabel}</span> : null}
        {typeof issue.processing_retry_count === "number" ? (
          <span className="tag">
            {mediaIssueCopy.retries} {issue.processing_retry_count}
            {typeof issue.processing_retry_max_attempts === "number"
              ? `/${issue.processing_retry_max_attempts}`
              : ""}
          </span>
        ) : null}
      </div>
      <div className="muted" style={{ marginTop: 8 }}>
        {mediaIssueCopy.lastAttempt}: {formatHistoryTimestampLabel(issue.processing_last_attempt_at)}
      </div>
      {issue.processing_last_failure_at ? (
        <div className="muted" style={{ marginTop: 6 }}>
          {mediaIssueCopy.lastFailure}: {formatHistoryTimestampLabel(issue.processing_last_failure_at)}
        </div>
      ) : null}
      {issue.processing_retry_next_attempt_at ? (
        <div className="muted" style={{ marginTop: 6 }}>
          {mediaIssueCopy.nextRetry}: {formatHistoryTimestampLabel(issue.processing_retry_next_attempt_at)}
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
          {canWriteWorkspace && canRetryMediaIssue(issue) ? (
            <button
              className="button secondary"
              disabled={retrying}
              type="button"
              onClick={() => void onRetryMediaProcessing(issue.media_id)}
            >
              {retrying ? mediaIssueCopy.retrying : mediaIssueCopy.retryNow}
            </button>
          ) : null}
          {settingsHref ? (
            <Link className="button secondary" href={settingsHref}>
              {mediaIssueCopy.openSettings}
            </Link>
          ) : null}
        </div>
      ) : null}
      {issue.processing_error ? (
        <div className="notice error" style={{ marginTop: 10 }}>
          {issue.processing_error}
        </div>
      ) : null}
    </article>
  );
}

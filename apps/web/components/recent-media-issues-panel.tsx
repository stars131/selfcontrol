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
import type { MediaProcessingOverview } from "../lib/types";

type RecentMediaIssuesPanelProps = {
  locale: LocaleCode;
  canWriteWorkspace: boolean;
  workspaceId: string;
  mediaIssueCopy: MediaIssueCopy;
  mediaProcessingOverview: MediaProcessingOverview;
  retryingMediaId: string | null;
  formatHistoryTimestampLabel: (value?: string | null) => string;
  onRetryMediaProcessing: (mediaId: string) => Promise<void>;
};

export function RecentMediaIssuesPanel({
  locale,
  canWriteWorkspace,
  workspaceId,
  mediaIssueCopy,
  mediaProcessingOverview,
  retryingMediaId,
  formatHistoryTimestampLabel,
  onRetryMediaProcessing,
}: RecentMediaIssuesPanelProps) {
  return (
    <div className="record-card form-stack" style={{ marginBottom: 16 }}>
      <div className="eyebrow">{mediaIssueCopy.recentIssuesTitle}</div>
      <div className="muted">{mediaIssueCopy.recentIssuesDescription}</div>
      {mediaProcessingOverview.recent_issues.length ? (
        <div className="record-list compact-list" style={{ marginTop: 16 }}>
          {mediaProcessingOverview.recent_issues.map((issue) => (
            <article className="record-card" key={issue.media_id}>
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
                {getMediaIssueLabel(locale, issue) ? <span className="tag">{getMediaIssueLabel(locale, issue)}</span> : null}
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
              {getMediaIssueAction(locale, issue).label ? (
                <div className="notice" style={{ marginTop: 10 }}>
                  {getMediaIssueAction(locale, issue).label}
                  {getMediaIssueAction(locale, issue).detail ? `: ${getMediaIssueAction(locale, issue).detail}` : ""}
                </div>
              ) : null}
              {canWriteWorkspace || buildMediaIssueSettingsHref(workspaceId, issue) ? (
                <div className="action-row" style={{ marginTop: 10 }}>
                  {canWriteWorkspace && canRetryMediaIssue(issue) ? (
                    <button
                      className="button secondary"
                      disabled={retryingMediaId === issue.media_id}
                      type="button"
                      onClick={() => void onRetryMediaProcessing(issue.media_id)}
                    >
                      {retryingMediaId === issue.media_id ? mediaIssueCopy.retrying : mediaIssueCopy.retryNow}
                    </button>
                  ) : null}
                  {buildMediaIssueSettingsHref(workspaceId, issue) ? (
                    <Link className="button secondary" href={buildMediaIssueSettingsHref(workspaceId, issue) ?? "#"}>
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
          ))}
        </div>
      ) : (
        <div className="notice" style={{ marginTop: 16 }}>
          {mediaIssueCopy.noRecentIssues}
        </div>
      )}
    </div>
  );
}

"use client";

import {
  getMediaIssueAction,
} from "../lib/media-issue-display";
import { buildMediaIssueSettingsHref } from "../lib/record-panel-media";
import { RecentMediaIssueCardActions } from "./recent-media-issue-card-actions";
import { RecentMediaIssueCardIntro } from "./recent-media-issue-card-intro";
import { RecentMediaIssueCardTags } from "./recent-media-issue-card-tags";
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
  const settingsHref = buildMediaIssueSettingsHref(workspaceId, issue);

  return (
    <article className="record-card">
      <RecentMediaIssueCardIntro issue={issue} />
      <RecentMediaIssueCardTags issue={issue} locale={locale} mediaIssueCopy={mediaIssueCopy} />
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
      <RecentMediaIssueCardActions
        canWriteWorkspace={canWriteWorkspace}
        issue={issue}
        mediaIssueCopy={mediaIssueCopy}
        onRetryMediaProcessing={onRetryMediaProcessing}
        retryingMediaId={retryingMediaId}
        settingsHref={settingsHref}
      />
      {issue.processing_error ? (
        <div className="notice error" style={{ marginTop: 10 }}>
          {issue.processing_error}
        </div>
      ) : null}
    </article>
  );
}

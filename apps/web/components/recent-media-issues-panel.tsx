"use client";

import { RecentMediaIssueCard } from "./recent-media-issue-card";
import type { RecentMediaIssuesPanelProps } from "./recent-media-issues-panel.types";

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
            <RecentMediaIssueCard
              canWriteWorkspace={canWriteWorkspace}
              formatHistoryTimestampLabel={formatHistoryTimestampLabel}
              issue={issue}
              key={issue.media_id}
              locale={locale}
              mediaIssueCopy={mediaIssueCopy}
              onRetryMediaProcessing={onRetryMediaProcessing}
              retryingMediaId={retryingMediaId}
              workspaceId={workspaceId}
            />
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

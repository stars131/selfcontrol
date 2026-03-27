"use client";

import { RecentMediaIssueCard } from "./recent-media-issue-card";
import type { RecentMediaIssuesPanelListProps } from "./recent-media-issues-panel-list.types";

export function RecentMediaIssuesPanelList({
  canWriteWorkspace,
  formatHistoryTimestampLabel,
  locale,
  mediaIssueCopy,
  mediaProcessingOverview,
  onRetryMediaProcessing,
  retryingMediaId,
  workspaceId,
}: RecentMediaIssuesPanelListProps) {
  return (
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
  );
}

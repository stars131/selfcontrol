"use client";

import { RecentMediaIssueCard } from "./recent-media-issue-card";
import { RecentMediaIssuesPanelEmpty } from "./recent-media-issues-panel-empty";
import { RecentMediaIssuesPanelIntro } from "./recent-media-issues-panel-intro";
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
      <RecentMediaIssuesPanelIntro mediaIssueCopy={mediaIssueCopy} />
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
        <RecentMediaIssuesPanelEmpty mediaIssueCopy={mediaIssueCopy} />
      )}
    </div>
  );
}

"use client";

import { RecentMediaIssuesPanelEmpty } from "./recent-media-issues-panel-empty";
import { RecentMediaIssuesPanelIntro } from "./recent-media-issues-panel-intro";
import { RecentMediaIssuesPanelList } from "./recent-media-issues-panel-list";
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
        <RecentMediaIssuesPanelList
          canWriteWorkspace={canWriteWorkspace}
          formatHistoryTimestampLabel={formatHistoryTimestampLabel}
          locale={locale}
          mediaIssueCopy={mediaIssueCopy}
          mediaProcessingOverview={mediaProcessingOverview}
          onRetryMediaProcessing={onRetryMediaProcessing}
          retryingMediaId={retryingMediaId}
          workspaceId={workspaceId}
        />
      ) : (
        <RecentMediaIssuesPanelEmpty mediaIssueCopy={mediaIssueCopy} />
      )}
    </div>
  );
}

"use client";

import { RecentMediaIssueCardActions } from "./recent-media-issue-card-actions";
import { buildRecentMediaIssueCardActionsProps, buildRecentMediaIssueCardMetadataProps } from "./recent-media-issue-card-child-props";
import { RecentMediaIssueCardError } from "./recent-media-issue-card-error";
import { RecentMediaIssueCardIntro } from "./recent-media-issue-card-intro";
import { RecentMediaIssueCardMetadata } from "./recent-media-issue-card-metadata";
import { RecentMediaIssueCardTags } from "./recent-media-issue-card-tags";
import type { RecentMediaIssueCardProps } from "./recent-media-issues-panel.types";

export function RecentMediaIssueCard({ issue, locale, canWriteWorkspace, workspaceId, mediaIssueCopy, retryingMediaId, formatHistoryTimestampLabel, onRetryMediaProcessing }: RecentMediaIssueCardProps) {
  return (
    <article className="record-card">
      <RecentMediaIssueCardIntro issue={issue} />
      <RecentMediaIssueCardTags issue={issue} locale={locale} mediaIssueCopy={mediaIssueCopy} />
      <RecentMediaIssueCardMetadata {...buildRecentMediaIssueCardMetadataProps({ formatHistoryTimestampLabel, issue, locale, mediaIssueCopy, canWriteWorkspace, workspaceId, retryingMediaId, onRetryMediaProcessing })} />
      <RecentMediaIssueCardActions {...buildRecentMediaIssueCardActionsProps({ canWriteWorkspace, issue, locale, mediaIssueCopy, onRetryMediaProcessing, retryingMediaId, workspaceId, formatHistoryTimestampLabel })} />
      <RecentMediaIssueCardError issue={issue} />
    </article>
  );
}

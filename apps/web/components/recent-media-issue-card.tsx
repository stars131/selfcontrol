"use client";

import { RecentMediaIssueCardActions } from "./recent-media-issue-card-actions";
import { buildRecentMediaIssueCardActionsProps } from "./recent-media-issue-card-actions-props";
import { RecentMediaIssueCardError } from "./recent-media-issue-card-error";
import { RecentMediaIssueCardIntro } from "./recent-media-issue-card-intro";
import { RecentMediaIssueCardMetadata } from "./recent-media-issue-card-metadata";
import { buildRecentMediaIssueCardMetadataProps } from "./recent-media-issue-card-metadata-props";
import { RecentMediaIssueCardTags } from "./recent-media-issue-card-tags";
import type { RecentMediaIssueCardProps } from "./recent-media-issues-panel.types";

export function RecentMediaIssueCard({ issue, locale, canWriteWorkspace, workspaceId, mediaIssueCopy, retryingMediaId, formatHistoryTimestampLabel, onRetryMediaProcessing }: RecentMediaIssueCardProps) {
  return (
    <article className="record-card">
      <RecentMediaIssueCardIntro issue={issue} />
      <RecentMediaIssueCardTags issue={issue} locale={locale} mediaIssueCopy={mediaIssueCopy} />
      <RecentMediaIssueCardMetadata {...buildRecentMediaIssueCardMetadataProps({ formatHistoryTimestampLabel, issue, locale, mediaIssueCopy })} />
      <RecentMediaIssueCardActions {...buildRecentMediaIssueCardActionsProps({ canWriteWorkspace, issue, mediaIssueCopy, onRetryMediaProcessing, retryingMediaId, workspaceId })} />
      <RecentMediaIssueCardError issue={issue} />
    </article>
  );
}

"use client";

import {
  getMediaIssueAction,
} from "../lib/media-issue-display";
import { buildMediaIssueSettingsHref } from "../lib/record-panel-media";
import { RecentMediaIssueCardActions } from "./recent-media-issue-card-actions";
import { RecentMediaIssueCardError } from "./recent-media-issue-card-error";
import { RecentMediaIssueCardIntro } from "./recent-media-issue-card-intro";
import { RecentMediaIssueCardMetadata } from "./recent-media-issue-card-metadata";
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
      <RecentMediaIssueCardMetadata action={action} formatHistoryTimestampLabel={formatHistoryTimestampLabel} issue={issue} mediaIssueCopy={mediaIssueCopy} />
      <RecentMediaIssueCardActions
        canWriteWorkspace={canWriteWorkspace}
        issue={issue}
        mediaIssueCopy={mediaIssueCopy}
        onRetryMediaProcessing={onRetryMediaProcessing}
        retryingMediaId={retryingMediaId}
        settingsHref={settingsHref}
      />
      <RecentMediaIssueCardError issue={issue} />
    </article>
  );
}

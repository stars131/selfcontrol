"use client";

import { RecentMediaIssueCardActions } from "./recent-media-issue-card-actions";
import { buildRecentMediaIssueCardActionsProps } from "./recent-media-issue-card-actions-props";
import { buildRecentMediaIssueCardErrorProps } from "./recent-media-issue-card-error-props";
import { RecentMediaIssueCardError } from "./recent-media-issue-card-error";
import { buildRecentMediaIssueCardIntroProps } from "./recent-media-issue-card-intro-props";
import { RecentMediaIssueCardIntro } from "./recent-media-issue-card-intro";
import { RecentMediaIssueCardMetadata } from "./recent-media-issue-card-metadata";
import { buildRecentMediaIssueCardMetadataProps } from "./recent-media-issue-card-metadata-props";
import { buildRecentMediaIssueCardTagsProps } from "./recent-media-issue-card-tags-props";
import { RecentMediaIssueCardTags } from "./recent-media-issue-card-tags";
import type { RecentMediaIssueCardProps } from "./recent-media-issues-panel.types";

export function RecentMediaIssueCard(props: RecentMediaIssueCardProps) {
  return (
    <article className="record-card">
      <RecentMediaIssueCardIntro {...buildRecentMediaIssueCardIntroProps({ issue: props.issue })} />
      <RecentMediaIssueCardTags {...buildRecentMediaIssueCardTagsProps(props)} />
      <RecentMediaIssueCardMetadata {...buildRecentMediaIssueCardMetadataProps(props)} />
      <RecentMediaIssueCardActions {...buildRecentMediaIssueCardActionsProps(props)} />
      <RecentMediaIssueCardError {...buildRecentMediaIssueCardErrorProps({ issue: props.issue })} />
    </article>
  );
}

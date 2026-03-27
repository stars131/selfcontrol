"use client";

import { getMediaIssueAction } from "../lib/media-issue-display";
import { buildMediaIssueSettingsHref } from "../lib/record-panel-media";
import type { RecentMediaIssueCardActionsProps } from "./recent-media-issue-card-actions.types";
import type { RecentMediaIssueCardMetadataProps } from "./recent-media-issue-card-metadata.types";
import type { BuildRecentMediaIssueCardChildPropsInput } from "./recent-media-issue-card-child-props.types";

export function buildRecentMediaIssueCardMetadataProps({ formatHistoryTimestampLabel, issue, locale, mediaIssueCopy }: BuildRecentMediaIssueCardChildPropsInput): RecentMediaIssueCardMetadataProps {
  return { action: getMediaIssueAction(locale, issue), formatHistoryTimestampLabel, issue, mediaIssueCopy };
}

export function buildRecentMediaIssueCardActionsProps({ canWriteWorkspace, issue, mediaIssueCopy, onRetryMediaProcessing, retryingMediaId, workspaceId }: BuildRecentMediaIssueCardChildPropsInput): RecentMediaIssueCardActionsProps {
  return {
    canWriteWorkspace,
    issue,
    mediaIssueCopy,
    onRetryMediaProcessing,
    retryingMediaId,
    settingsHref: buildMediaIssueSettingsHref(workspaceId, issue),
  };
}

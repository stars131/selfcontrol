"use client";

import { buildRecentMediaIssueCardActionButtonsProps } from "./recent-media-issue-card-action-buttons-props";
import { RecentMediaIssueCardActionButtons } from "./recent-media-issue-card-action-buttons";
import type { RecentMediaIssueCardActionsProps } from "./recent-media-issue-card-actions.types";

export function RecentMediaIssueCardActions(props: RecentMediaIssueCardActionsProps) {
  if (!props.canWriteWorkspace && !props.settingsHref) {
    return null;
  }

  return <RecentMediaIssueCardActionButtons {...buildRecentMediaIssueCardActionButtonsProps(props)} />;
}

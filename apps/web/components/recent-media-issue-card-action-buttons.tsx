"use client";

import { buildRecentMediaIssueCardRetryButtonProps } from "./recent-media-issue-card-retry-button-props";
import { RecentMediaIssueCardRetryButton } from "./recent-media-issue-card-retry-button";
import { buildRecentMediaIssueCardSettingsLinkProps } from "./recent-media-issue-card-settings-link-props";
import { RecentMediaIssueCardSettingsLink } from "./recent-media-issue-card-settings-link";
import type { RecentMediaIssueCardActionButtonsProps } from "./recent-media-issue-card-action-buttons.types";

export function RecentMediaIssueCardActionButtons(props: RecentMediaIssueCardActionButtonsProps) {
  return (
    <div className="action-row" style={{ marginTop: 10 }}>
      <RecentMediaIssueCardRetryButton {...buildRecentMediaIssueCardRetryButtonProps(props)} />
      <RecentMediaIssueCardSettingsLink {...buildRecentMediaIssueCardSettingsLinkProps(props)} />
    </div>
  );
}

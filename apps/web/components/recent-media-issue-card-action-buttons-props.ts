"use client";
import type { RecentMediaIssueCardActionButtonsProps } from "./recent-media-issue-card-action-buttons.types";
import type { BuildRecentMediaIssueCardActionButtonsPropsInput } from "./recent-media-issue-card-action-buttons-props.types";
export function buildRecentMediaIssueCardActionButtonsProps({ canWriteWorkspace, issue, mediaIssueCopy, onRetryMediaProcessing, retryingMediaId, settingsHref }: BuildRecentMediaIssueCardActionButtonsPropsInput): RecentMediaIssueCardActionButtonsProps { return { canWriteWorkspace, issue, mediaIssueCopy, onRetryMediaProcessing, retryingMediaId, settingsHref }; }

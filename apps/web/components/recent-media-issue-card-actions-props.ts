"use client";
import { buildMediaIssueSettingsHref } from "../lib/record-panel-media";
import type { RecentMediaIssueCardActionsProps } from "./recent-media-issue-card-actions.types";
import type { BuildRecentMediaIssueCardActionsPropsInput } from "./recent-media-issue-card-actions-props.types";
export function buildRecentMediaIssueCardActionsProps(input: BuildRecentMediaIssueCardActionsPropsInput): RecentMediaIssueCardActionsProps { return { canWriteWorkspace: input.canWriteWorkspace, issue: input.issue, mediaIssueCopy: input.mediaIssueCopy, onRetryMediaProcessing: input.onRetryMediaProcessing, retryingMediaId: input.retryingMediaId, settingsHref: buildMediaIssueSettingsHref(input.workspaceId, input.issue) }; }

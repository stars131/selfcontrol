"use client";
import { getMediaIssueAction } from "../lib/media-issue-display";
import type { RecentMediaIssueCardMetadataProps } from "./recent-media-issue-card-metadata.types";
import type { BuildRecentMediaIssueCardMetadataPropsInput } from "./recent-media-issue-card-metadata-props.types";
export function buildRecentMediaIssueCardMetadataProps(input: BuildRecentMediaIssueCardMetadataPropsInput): RecentMediaIssueCardMetadataProps { return { action: getMediaIssueAction(input.locale, input.issue), formatHistoryTimestampLabel: input.formatHistoryTimestampLabel, issue: input.issue, mediaIssueCopy: input.mediaIssueCopy }; }

"use client";
import { getMediaIssueAction } from "../lib/media-issue-display";
import type { RecentMediaIssueCardMetadataProps } from "./recent-media-issue-card-metadata.types";
import type { BuildRecentMediaIssueCardMetadataPropsInput } from "./recent-media-issue-card-metadata-props.types";
export function buildRecentMediaIssueCardMetadataProps({ formatHistoryTimestampLabel, issue, locale, mediaIssueCopy }: BuildRecentMediaIssueCardMetadataPropsInput): RecentMediaIssueCardMetadataProps { return { action: getMediaIssueAction(locale, issue), formatHistoryTimestampLabel, issue, mediaIssueCopy }; }

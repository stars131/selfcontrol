"use client";
import type { RecentMediaIssueCardMetadataDetailsProps } from "./recent-media-issue-card-metadata-details.types";
import type { BuildRecentMediaIssueCardMetadataDetailsPropsInput } from "./recent-media-issue-card-metadata-details-props.types";
export function buildRecentMediaIssueCardMetadataDetailsProps({ formatHistoryTimestampLabel, issue, mediaIssueCopy }: BuildRecentMediaIssueCardMetadataDetailsPropsInput): RecentMediaIssueCardMetadataDetailsProps { return { formatHistoryTimestampLabel, issue, mediaIssueCopy }; }

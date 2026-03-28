"use client";
import { RecentMediaIssueCardActionNotice } from "./recent-media-issue-card-action-notice";
import { buildRecentMediaIssueCardActionNoticeProps } from "./recent-media-issue-card-action-notice-props";
import { buildRecentMediaIssueCardMetadataDetailsProps } from "./recent-media-issue-card-metadata-details-props";
import { RecentMediaIssueCardMetadataDetails } from "./recent-media-issue-card-metadata-details";
import type { RecentMediaIssueCardMetadataProps } from "./recent-media-issue-card-metadata.types";
export function RecentMediaIssueCardMetadata(props: RecentMediaIssueCardMetadataProps) {
  return <><RecentMediaIssueCardMetadataDetails {...buildRecentMediaIssueCardMetadataDetailsProps(props)} /><RecentMediaIssueCardActionNotice {...buildRecentMediaIssueCardActionNoticeProps({ action: props.action })} /></>;
}

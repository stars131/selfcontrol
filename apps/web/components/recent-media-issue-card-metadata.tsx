"use client";
import { RecentMediaIssueCardActionNotice } from "./recent-media-issue-card-action-notice";
import { RecentMediaIssueCardMetadataDetails } from "./recent-media-issue-card-metadata-details";
import type { RecentMediaIssueCardMetadataProps } from "./recent-media-issue-card-metadata.types";
export function RecentMediaIssueCardMetadata({ action, formatHistoryTimestampLabel, issue, mediaIssueCopy }: RecentMediaIssueCardMetadataProps) {
  return <><RecentMediaIssueCardMetadataDetails formatHistoryTimestampLabel={formatHistoryTimestampLabel} issue={issue} mediaIssueCopy={mediaIssueCopy} /><RecentMediaIssueCardActionNotice action={action} /></>;
}

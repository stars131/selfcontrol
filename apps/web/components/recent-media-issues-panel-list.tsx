"use client";
import { buildRecentMediaIssueCardProps } from "./recent-media-issues-list-item-props";
import { RecentMediaIssueCard } from "./recent-media-issue-card";
import type { RecentMediaIssuesPanelListProps } from "./recent-media-issues-panel-list.types";
export function RecentMediaIssuesPanelList(props: RecentMediaIssuesPanelListProps) {
  return <div className="record-list compact-list" style={{ marginTop: 16 }}>{props.mediaProcessingOverview.recent_issues.map((issue) => <RecentMediaIssueCard key={issue.media_id} {...buildRecentMediaIssueCardProps({ issue, props })} />)}</div>;
}

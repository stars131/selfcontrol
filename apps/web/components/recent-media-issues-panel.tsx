"use client";
import { RecentMediaIssuesPanelEmpty } from "./recent-media-issues-panel-empty";
import { RecentMediaIssuesPanelIntro } from "./recent-media-issues-panel-intro";
import { RecentMediaIssuesPanelList } from "./recent-media-issues-panel-list";
import { buildRecentMediaIssuesPanelListProps } from "./recent-media-issues-panel-list-props";
import type { RecentMediaIssuesPanelProps } from "./recent-media-issues-panel.types";
export function RecentMediaIssuesPanel(props: RecentMediaIssuesPanelProps) {
  return <div className="record-card form-stack" style={{ marginBottom: 16 }}><RecentMediaIssuesPanelIntro mediaIssueCopy={props.mediaIssueCopy} />{props.mediaProcessingOverview.recent_issues.length ? <RecentMediaIssuesPanelList {...buildRecentMediaIssuesPanelListProps(props)} /> : <RecentMediaIssuesPanelEmpty mediaIssueCopy={props.mediaIssueCopy} />}</div>;
}

"use client";

import type { RecentMediaIssuesPanelEmptyProps } from "./recent-media-issues-panel-empty.types";

export function RecentMediaIssuesPanelEmpty({ mediaIssueCopy }: RecentMediaIssuesPanelEmptyProps) {
  return (
    <div className="notice" style={{ marginTop: 16 }}>
      {mediaIssueCopy.noRecentIssues}
    </div>
  );
}

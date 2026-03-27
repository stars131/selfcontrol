"use client";

import type { RecentMediaIssuesPanelIntroProps } from "./recent-media-issues-panel-intro.types";

export function RecentMediaIssuesPanelIntro({ mediaIssueCopy }: RecentMediaIssuesPanelIntroProps) {
  return (
    <>
      <div className="eyebrow">{mediaIssueCopy.recentIssuesTitle}</div>
      <div className="muted">{mediaIssueCopy.recentIssuesDescription}</div>
    </>
  );
}

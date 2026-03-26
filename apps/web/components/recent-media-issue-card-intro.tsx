"use client";

import type { RecentMediaIssueCardIntroProps } from "./recent-media-issue-card-intro.types";

export function RecentMediaIssueCardIntro({ issue }: RecentMediaIssueCardIntroProps) {
  return <><div className="eyebrow">{issue.media_type}</div><div>{issue.original_filename}</div></>;
}

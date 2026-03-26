"use client";

import type { RecentMediaIssueCardErrorProps } from "./recent-media-issue-card-error.types";

export function RecentMediaIssueCardError({ issue }: RecentMediaIssueCardErrorProps) {
  return issue.processing_error ? <div className="notice error" style={{ marginTop: 10 }}>{issue.processing_error}</div> : null;
}

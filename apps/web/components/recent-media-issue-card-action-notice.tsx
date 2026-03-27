"use client";

import type { RecentMediaIssueCardActionNoticeProps } from "./recent-media-issue-card-action-notice.types";

export function RecentMediaIssueCardActionNotice({ action }: RecentMediaIssueCardActionNoticeProps) {
  return action.label ? (
    <div className="notice" style={{ marginTop: 10 }}>
      {action.label}
      {action.detail ? `: ${action.detail}` : ""}
    </div>
  ) : null;
}

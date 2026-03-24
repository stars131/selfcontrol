"use client";

import { getMediaIssueLabel, getRetryStateLabel } from "../lib/media-issue-display";
import type { DeadLetterRecoveryPanelProps } from "./dead-letter-recovery-panel.types";

type DeadLetterRecoverySummaryStatsProps = Pick<
  DeadLetterRecoveryPanelProps,
  "locale" | "mediaDeadLetterOverview" | "mediaIssueCopy"
>;

export function DeadLetterRecoverySummaryStats({
  locale,
  mediaDeadLetterOverview,
  mediaIssueCopy,
}: DeadLetterRecoverySummaryStatsProps) {
  return (
    <div className="tag-row">
      <span className="tag">
        {mediaDeadLetterOverview?.total_count ?? 0} {mediaIssueCopy.itemSuffix}
      </span>
      {mediaDeadLetterOverview
        ? Object.entries(mediaDeadLetterOverview.by_retry_state).map(([retryState, count]) => (
            <span className="tag" key={retryState}>
              {getRetryStateLabel(locale, retryState)}: {count}
            </span>
          ))
        : null}
      {mediaDeadLetterOverview
        ? Object.entries(mediaDeadLetterOverview.by_issue_category).map(([issueCategory, count]) => (
            <span className="tag" key={issueCategory}>
              {getMediaIssueLabel(locale, { issue_category: issueCategory, issue_label: null })}: {count}
            </span>
          ))
        : null}
    </div>
  );
}

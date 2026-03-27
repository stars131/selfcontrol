"use client";

import { getMediaIssueLabel } from "../lib/media-issue-display";
import { DeadLetterRecoverySummaryRetryStateTags } from "./dead-letter-recovery-summary-retry-state-tags";
import type { DeadLetterRecoverySummaryStatsProps } from "./dead-letter-recovery-summary-stats.types";

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
      <DeadLetterRecoverySummaryRetryStateTags
        locale={locale}
        mediaDeadLetterOverview={mediaDeadLetterOverview}
      />
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

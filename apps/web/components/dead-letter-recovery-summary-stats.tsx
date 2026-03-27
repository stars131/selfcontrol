"use client";

import { DeadLetterRecoverySummaryIssueCategoryTags } from "./dead-letter-recovery-summary-issue-category-tags";
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
      <DeadLetterRecoverySummaryIssueCategoryTags
        locale={locale}
        mediaDeadLetterOverview={mediaDeadLetterOverview}
      />
    </div>
  );
}

"use client";

import { DeadLetterRecoverySummaryIssueCategoryTags } from "./dead-letter-recovery-summary-issue-category-tags";
import { DeadLetterRecoverySummaryRetryStateTags } from "./dead-letter-recovery-summary-retry-state-tags";
import { DeadLetterRecoverySummaryTotalCountTag } from "./dead-letter-recovery-summary-total-count-tag";
import type { DeadLetterRecoverySummaryStatsProps } from "./dead-letter-recovery-summary-stats.types";

export function DeadLetterRecoverySummaryStats({
  locale,
  mediaDeadLetterOverview,
  mediaIssueCopy,
}: DeadLetterRecoverySummaryStatsProps) {
  return (
    <div className="tag-row">
      <DeadLetterRecoverySummaryTotalCountTag
        mediaDeadLetterOverview={mediaDeadLetterOverview}
        mediaIssueCopy={mediaIssueCopy}
      />
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

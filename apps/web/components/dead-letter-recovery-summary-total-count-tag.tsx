"use client";

import type { DeadLetterRecoverySummaryTotalCountTagProps } from "./dead-letter-recovery-summary-total-count-tag.types";

export function DeadLetterRecoverySummaryTotalCountTag({
  mediaDeadLetterOverview,
  mediaIssueCopy,
}: DeadLetterRecoverySummaryTotalCountTagProps) {
  return (
    <span className="tag">
      {mediaDeadLetterOverview?.total_count ?? 0} {mediaIssueCopy.itemSuffix}
    </span>
  );
}

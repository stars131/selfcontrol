"use client";

import { getRetryStateLabel } from "../lib/media-issue-display";
import type { DeadLetterRecoverySummaryRetryStateTagsProps } from "./dead-letter-recovery-summary-retry-state-tags.types";

export function DeadLetterRecoverySummaryRetryStateTags({
  locale,
  mediaDeadLetterOverview,
}: DeadLetterRecoverySummaryRetryStateTagsProps) {
  return mediaDeadLetterOverview
    ? Object.entries(mediaDeadLetterOverview.by_retry_state).map(([retryState, count]) => (
        <span className="tag" key={retryState}>
          {getRetryStateLabel(locale, retryState)}: {count}
        </span>
      ))
    : null;
}

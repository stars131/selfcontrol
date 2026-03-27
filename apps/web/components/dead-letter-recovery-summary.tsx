"use client";
import { DeadLetterRecoverySummaryActions } from "./dead-letter-recovery-summary-actions";
import { DeadLetterRecoverySummaryHeader } from "./dead-letter-recovery-summary-header";
import type { DeadLetterRecoverySummaryProps } from "./dead-letter-recovery-summary.types";

export function DeadLetterRecoverySummary({
  bulkRetryingDeadLetter,
  locale,
  mediaDeadLetterOverview,
  mediaIssueCopy,
  onBulkRetryAll,
  onBulkRetrySelected,
  onClearSelection,
  onSelectAll,
  selectedDeadLetterIds,
}: DeadLetterRecoverySummaryProps) {
  return (
    <>
      <DeadLetterRecoverySummaryHeader
        locale={locale}
        mediaDeadLetterOverview={mediaDeadLetterOverview}
        mediaIssueCopy={mediaIssueCopy}
      />
      <DeadLetterRecoverySummaryActions bulkRetryingDeadLetter={bulkRetryingDeadLetter} mediaDeadLetterOverview={mediaDeadLetterOverview} mediaIssueCopy={mediaIssueCopy} onBulkRetryAll={onBulkRetryAll} onBulkRetrySelected={onBulkRetrySelected} onClearSelection={onClearSelection} onSelectAll={onSelectAll} selectedDeadLetterIds={selectedDeadLetterIds} />
    </>
  );
}

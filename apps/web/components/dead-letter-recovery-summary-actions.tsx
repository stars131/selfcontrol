"use client";
import { DeadLetterRecoverySummaryActionButtons } from "./dead-letter-recovery-summary-action-buttons";
import type { DeadLetterRecoverySummaryActionsProps } from "./dead-letter-recovery-summary-actions.types";

export function DeadLetterRecoverySummaryActions({
  bulkRetryingDeadLetter,
  mediaDeadLetterOverview,
  mediaIssueCopy,
  onBulkRetryAll,
  onBulkRetrySelected,
  onClearSelection,
  onSelectAll,
  selectedDeadLetterIds,
}: DeadLetterRecoverySummaryActionsProps) {
  if (!mediaDeadLetterOverview?.items.length) {
    return null;
  }
  return <DeadLetterRecoverySummaryActionButtons bulkRetryingDeadLetter={bulkRetryingDeadLetter} mediaIssueCopy={mediaIssueCopy} onBulkRetryAll={onBulkRetryAll} onBulkRetrySelected={onBulkRetrySelected} onClearSelection={onClearSelection} onSelectAll={onSelectAll} selectedDeadLetterIds={selectedDeadLetterIds} />;
}

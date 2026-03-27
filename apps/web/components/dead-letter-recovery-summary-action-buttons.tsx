"use client";

import type { DeadLetterRecoverySummaryActionButtonsProps } from "./dead-letter-recovery-summary-action-buttons.types";

export function DeadLetterRecoverySummaryActionButtons({
  bulkRetryingDeadLetter,
  mediaIssueCopy,
  onBulkRetryAll,
  onBulkRetrySelected,
  onClearSelection,
  onSelectAll,
  selectedDeadLetterIds,
}: DeadLetterRecoverySummaryActionButtonsProps) {
  return (
    <div className="action-row">
      <button className="button secondary" disabled={bulkRetryingDeadLetter} type="button" onClick={onSelectAll}>
        {mediaIssueCopy.selectVisible}
      </button>
      <button className="button secondary" disabled={bulkRetryingDeadLetter || !selectedDeadLetterIds.length} type="button" onClick={onClearSelection}>
        {mediaIssueCopy.clearSelection}
      </button>
      <button className="button secondary" disabled={bulkRetryingDeadLetter || !selectedDeadLetterIds.length} type="button" onClick={() => void onBulkRetrySelected()}>
        {bulkRetryingDeadLetter ? mediaIssueCopy.retrying : `${mediaIssueCopy.retrySelectedPrefix} (${selectedDeadLetterIds.length})`}
      </button>
      <button className="button secondary" disabled={bulkRetryingDeadLetter} type="button" onClick={() => void onBulkRetryAll()}>
        {bulkRetryingDeadLetter ? mediaIssueCopy.retrying : mediaIssueCopy.retryAll}
      </button>
    </div>
  );
}

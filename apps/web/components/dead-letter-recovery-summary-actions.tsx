"use client";
import type { DeadLetterRecoveryPanelProps } from "./dead-letter-recovery-panel.types";
type DeadLetterRecoverySummaryActionsProps = Pick<DeadLetterRecoveryPanelProps, "bulkRetryingDeadLetter" | "mediaDeadLetterOverview" | "mediaIssueCopy" | "onBulkRetryAll" | "onBulkRetrySelected" | "onClearSelection" | "onSelectAll" | "selectedDeadLetterIds">;

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

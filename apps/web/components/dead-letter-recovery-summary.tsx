"use client";
import { DeadLetterRecoverySummaryActions } from "./dead-letter-recovery-summary-actions";
import { DeadLetterRecoverySummaryStats } from "./dead-letter-recovery-summary-stats";
import type { DeadLetterRecoveryPanelProps } from "./dead-letter-recovery-panel.types";
type DeadLetterRecoverySummaryProps = Pick<DeadLetterRecoveryPanelProps, "bulkRetryingDeadLetter" | "locale" | "mediaDeadLetterOverview" | "mediaIssueCopy" | "onBulkRetryAll" | "onBulkRetrySelected" | "onClearSelection" | "onSelectAll" | "selectedDeadLetterIds">;

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
      <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div className="eyebrow">{mediaIssueCopy.deadLetterTitle}</div>
          <div className="muted" style={{ marginTop: 8 }}>{mediaIssueCopy.deadLetterDescription}</div>
        </div>
        <DeadLetterRecoverySummaryStats locale={locale} mediaDeadLetterOverview={mediaDeadLetterOverview} mediaIssueCopy={mediaIssueCopy} />
      </div>
      <DeadLetterRecoverySummaryActions bulkRetryingDeadLetter={bulkRetryingDeadLetter} mediaDeadLetterOverview={mediaDeadLetterOverview} mediaIssueCopy={mediaIssueCopy} onBulkRetryAll={onBulkRetryAll} onBulkRetrySelected={onBulkRetrySelected} onClearSelection={onClearSelection} onSelectAll={onSelectAll} selectedDeadLetterIds={selectedDeadLetterIds} />
    </>
  );
}

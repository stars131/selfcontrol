"use client";

import { DeadLetterRecoveryPanelContent } from "./dead-letter-recovery-panel-content";
import { DeadLetterRecoverySummary } from "./dead-letter-recovery-summary";
import type { DeadLetterRecoveryPanelProps } from "./dead-letter-recovery-panel.types";

export function DeadLetterRecoveryPanel({
  locale,
  canWriteWorkspace,
  workspaceId,
  mediaIssueCopy,
  mediaDeadLetterOverview,
  selectedDeadLetterIds,
  bulkRetryingDeadLetter,
  retryingMediaId,
  formatHistoryTimestampLabel,
  onSelectAll,
  onClearSelection,
  onBulkRetrySelected,
  onBulkRetryAll,
  onToggleSelection,
  onRetryMediaProcessing,
}: DeadLetterRecoveryPanelProps) {
  return (
    <div className="record-card form-stack" style={{ marginBottom: 16 }}>
      <DeadLetterRecoverySummary
        bulkRetryingDeadLetter={bulkRetryingDeadLetter}
        locale={locale}
        mediaDeadLetterOverview={mediaDeadLetterOverview}
        mediaIssueCopy={mediaIssueCopy}
        onBulkRetryAll={onBulkRetryAll}
        onBulkRetrySelected={onBulkRetrySelected}
        onClearSelection={onClearSelection}
        onSelectAll={onSelectAll}
        selectedDeadLetterIds={selectedDeadLetterIds}
      />
      <DeadLetterRecoveryPanelContent
        bulkRetryingDeadLetter={bulkRetryingDeadLetter}
        canWriteWorkspace={canWriteWorkspace}
        formatHistoryTimestampLabel={formatHistoryTimestampLabel}
        locale={locale}
        mediaDeadLetterOverview={mediaDeadLetterOverview}
        mediaIssueCopy={mediaIssueCopy}
        onRetryMediaProcessing={onRetryMediaProcessing}
        onToggleSelection={onToggleSelection}
        retryingMediaId={retryingMediaId}
        selectedDeadLetterIds={selectedDeadLetterIds}
        workspaceId={workspaceId}
      />
    </div>
  );
}

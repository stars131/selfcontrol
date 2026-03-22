"use client";

import { DeadLetterRecoveryItemCard } from "./dead-letter-recovery-item-card";
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
      {mediaDeadLetterOverview?.items.length ? (
        <>
          <div className="record-list compact-list">
            {mediaDeadLetterOverview.items.map((item) => (
              <DeadLetterRecoveryItemCard
                bulkRetryingDeadLetter={bulkRetryingDeadLetter}
                canWriteWorkspace={canWriteWorkspace}
                formatHistoryTimestampLabel={formatHistoryTimestampLabel}
                item={item}
                key={item.media_id}
                locale={locale}
                mediaIssueCopy={mediaIssueCopy}
                onRetryMediaProcessing={onRetryMediaProcessing}
                onToggleSelection={onToggleSelection}
                retryingMediaId={retryingMediaId}
                selectedDeadLetterIds={selectedDeadLetterIds}
                workspaceId={workspaceId}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="notice">{mediaIssueCopy.noDeadLetter}</div>
      )}
    </div>
  );
}

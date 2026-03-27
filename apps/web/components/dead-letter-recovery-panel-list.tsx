"use client";

import { DeadLetterRecoveryItemCard } from "./dead-letter-recovery-item-card";
import type { DeadLetterRecoveryPanelListProps } from "./dead-letter-recovery-panel-list.types";

export function DeadLetterRecoveryPanelList({
  bulkRetryingDeadLetter,
  canWriteWorkspace,
  formatHistoryTimestampLabel,
  locale,
  mediaDeadLetterOverview,
  mediaIssueCopy,
  onRetryMediaProcessing,
  onToggleSelection,
  retryingMediaId,
  selectedDeadLetterIds,
  workspaceId,
}: DeadLetterRecoveryPanelListProps) {
  return (
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
  );
}

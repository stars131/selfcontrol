"use client";

import { DeadLetterRecoveryItemCard } from "./dead-letter-recovery-item-card";
import { DeadLetterRecoveryPanelEmpty } from "./dead-letter-recovery-panel-empty";
import type { DeadLetterRecoveryPanelContentProps } from "./dead-letter-recovery-panel-content.types";

export function DeadLetterRecoveryPanelContent({
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
}: DeadLetterRecoveryPanelContentProps) {
  if (!mediaDeadLetterOverview?.items.length) {
    return <DeadLetterRecoveryPanelEmpty mediaIssueCopy={mediaIssueCopy} />;
  }

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

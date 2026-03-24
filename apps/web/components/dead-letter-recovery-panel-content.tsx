"use client";

import { DeadLetterRecoveryItemCard } from "./dead-letter-recovery-item-card";
import type { DeadLetterRecoveryPanelProps } from "./dead-letter-recovery-panel.types";

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
}: Pick<
  DeadLetterRecoveryPanelProps,
  | "bulkRetryingDeadLetter"
  | "canWriteWorkspace"
  | "formatHistoryTimestampLabel"
  | "locale"
  | "mediaDeadLetterOverview"
  | "mediaIssueCopy"
  | "onRetryMediaProcessing"
  | "onToggleSelection"
  | "retryingMediaId"
  | "selectedDeadLetterIds"
  | "workspaceId"
>) {
  if (!mediaDeadLetterOverview?.items.length) {
    return <div className="notice">{mediaIssueCopy.noDeadLetter}</div>;
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

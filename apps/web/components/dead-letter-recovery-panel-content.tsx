"use client";

import { DeadLetterRecoveryPanelEmpty } from "./dead-letter-recovery-panel-empty";
import { DeadLetterRecoveryPanelList } from "./dead-letter-recovery-panel-list";
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
    <DeadLetterRecoveryPanelList
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
  );
}

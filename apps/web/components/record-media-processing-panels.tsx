"use client";

import { DeadLetterRecoveryPanel } from "./dead-letter-recovery-panel";
import { RecentMediaIssuesPanel } from "./recent-media-issues-panel";
import type { RecordMediaProcessingPanelsProps } from "./record-media-processing-panels.types";

export function RecordMediaProcessingPanels({
  bulkRetryingDeadLetter,
  canWriteWorkspace,
  formatHistoryTimestampLabel,
  locale,
  mediaDeadLetterOverview,
  mediaIssueCopy,
  mediaProcessingOverview,
  onBulkRetryAllDeadLetter,
  onBulkRetrySelectedDeadLetter,
  onClearDeadLetterSelection,
  onRetryMediaProcessing,
  onSelectAllDeadLetter,
  onToggleDeadLetterSelection,
  retryingMediaId,
  selectedDeadLetterIds,
  workspaceId,
}: RecordMediaProcessingPanelsProps) {
  if (!mediaProcessingOverview) {
    return null;
  }

  return (
    <>
      <RecentMediaIssuesPanel
        canWriteWorkspace={canWriteWorkspace}
        formatHistoryTimestampLabel={formatHistoryTimestampLabel}
        locale={locale}
        mediaIssueCopy={mediaIssueCopy}
        mediaProcessingOverview={mediaProcessingOverview}
        onRetryMediaProcessing={onRetryMediaProcessing}
        retryingMediaId={retryingMediaId}
        workspaceId={workspaceId}
      />
      <DeadLetterRecoveryPanel
        bulkRetryingDeadLetter={bulkRetryingDeadLetter}
        canWriteWorkspace={canWriteWorkspace}
        formatHistoryTimestampLabel={formatHistoryTimestampLabel}
        locale={locale}
        mediaDeadLetterOverview={mediaDeadLetterOverview}
        mediaIssueCopy={mediaIssueCopy}
        onBulkRetryAll={onBulkRetryAllDeadLetter}
        onBulkRetrySelected={onBulkRetrySelectedDeadLetter}
        onClearSelection={onClearDeadLetterSelection}
        onRetryMediaProcessing={onRetryMediaProcessing}
        onSelectAll={onSelectAllDeadLetter}
        onToggleSelection={onToggleDeadLetterSelection}
        retryingMediaId={retryingMediaId}
        selectedDeadLetterIds={selectedDeadLetterIds}
        workspaceId={workspaceId}
      />
    </>
  );
}

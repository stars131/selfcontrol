"use client";

import { buildMediaIssueSettingsHref } from "../lib/record-panel-media";
import { DeadLetterRecoveryItemCardActions } from "./dead-letter-recovery-item-card-actions";
import { DeadLetterRecoveryItemCardHeader } from "./dead-letter-recovery-item-card-header";
import { DeadLetterRecoveryItemCardStatus } from "./dead-letter-recovery-item-card-status";
import type { DeadLetterRecoveryItemCardProps } from "./dead-letter-recovery-panel.types";

export function DeadLetterRecoveryItemCard({
  item,
  locale,
  canWriteWorkspace,
  workspaceId,
  mediaIssueCopy,
  selectedDeadLetterIds,
  bulkRetryingDeadLetter,
  retryingMediaId,
  formatHistoryTimestampLabel,
  onToggleSelection,
  onRetryMediaProcessing,
}: DeadLetterRecoveryItemCardProps) {
  const settingsHref = buildMediaIssueSettingsHref(workspaceId, item);

  return (
    <article className="record-card">
      <DeadLetterRecoveryItemCardHeader
        bulkRetryingDeadLetter={bulkRetryingDeadLetter}
        canWriteWorkspace={canWriteWorkspace}
        item={item}
        locale={locale}
        mediaIssueCopy={mediaIssueCopy}
        onToggleSelection={onToggleSelection}
        selectedDeadLetterIds={selectedDeadLetterIds}
      />
      <DeadLetterRecoveryItemCardStatus
        formatHistoryTimestampLabel={formatHistoryTimestampLabel}
        item={item}
        locale={locale}
        mediaIssueCopy={mediaIssueCopy}
      />
      <DeadLetterRecoveryItemCardActions
        canWriteWorkspace={canWriteWorkspace}
        item={item}
        mediaIssueCopy={mediaIssueCopy}
        onRetryMediaProcessing={onRetryMediaProcessing}
        retryingMediaId={retryingMediaId}
        settingsHref={settingsHref}
      />
      {item.processing_error ? (
        <div className="notice error" style={{ marginTop: 10 }}>
          {item.processing_error}
        </div>
      ) : null}
    </article>
  );
}

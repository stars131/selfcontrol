"use client";

import { DeadLetterRecoveryItemCardRetryBudgetUsed } from "./dead-letter-recovery-item-card-retry-budget-used"; import type { DeadLetterRecoveryItemCardMetadataProps } from "./dead-letter-recovery-item-card-metadata.types";

export function DeadLetterRecoveryItemCardMetadata({ formatHistoryTimestampLabel, item, mediaIssueCopy }: DeadLetterRecoveryItemCardMetadataProps) {
  return <>{<div className="muted" style={{ marginTop: 8 }}>{mediaIssueCopy.lastAttempt}: {formatHistoryTimestampLabel(item.processing_last_attempt_at)}</div>}{item.processing_last_failure_at ? <div className="muted" style={{ marginTop: 6 }}>{mediaIssueCopy.lastFailure}: {formatHistoryTimestampLabel(item.processing_last_failure_at)}</div> : null}<DeadLetterRecoveryItemCardRetryBudgetUsed item={item} mediaIssueCopy={mediaIssueCopy} /></>;
}

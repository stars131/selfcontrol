"use client";

import { DeadLetterRecoveryItemCardLastFailure } from "./dead-letter-recovery-item-card-last-failure"; import { DeadLetterRecoveryItemCardRetryBudgetUsed } from "./dead-letter-recovery-item-card-retry-budget-used"; import type { DeadLetterRecoveryItemCardMetadataProps } from "./dead-letter-recovery-item-card-metadata.types";

export function DeadLetterRecoveryItemCardMetadata({ formatHistoryTimestampLabel, item, mediaIssueCopy }: DeadLetterRecoveryItemCardMetadataProps) {
  return <>{<div className="muted" style={{ marginTop: 8 }}>{mediaIssueCopy.lastAttempt}: {formatHistoryTimestampLabel(item.processing_last_attempt_at)}</div>}<DeadLetterRecoveryItemCardLastFailure formatHistoryTimestampLabel={formatHistoryTimestampLabel} item={item} mediaIssueCopy={mediaIssueCopy} /><DeadLetterRecoveryItemCardRetryBudgetUsed item={item} mediaIssueCopy={mediaIssueCopy} /></>;
}

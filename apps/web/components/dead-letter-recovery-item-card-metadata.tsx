"use client";

import type { DeadLetterRecoveryItemCardMetadataProps } from "./dead-letter-recovery-item-card-metadata.types";

export function DeadLetterRecoveryItemCardMetadata({ formatHistoryTimestampLabel, item, mediaIssueCopy }: DeadLetterRecoveryItemCardMetadataProps) {
  return <>{<div className="muted" style={{ marginTop: 8 }}>{mediaIssueCopy.lastAttempt}: {formatHistoryTimestampLabel(item.processing_last_attempt_at)}</div>}{item.processing_last_failure_at ? <div className="muted" style={{ marginTop: 6 }}>{mediaIssueCopy.lastFailure}: {formatHistoryTimestampLabel(item.processing_last_failure_at)}</div> : null}{typeof item.processing_retry_count === "number" ? <div className="muted" style={{ marginTop: 6 }}>{mediaIssueCopy.retryBudgetUsed}: {item.processing_retry_count}{typeof item.processing_retry_max_attempts === "number" ? ` / ${item.processing_retry_max_attempts}` : ""}</div> : null}</>;
}

"use client";
import type { DeadLetterRecoveryItemCardLastFailureProps } from "./dead-letter-recovery-item-card-last-failure.types";
export function DeadLetterRecoveryItemCardLastFailure({ formatHistoryTimestampLabel, item, mediaIssueCopy }: DeadLetterRecoveryItemCardLastFailureProps) { return item.processing_last_failure_at ? <div className="muted" style={{ marginTop: 6 }}>{mediaIssueCopy.lastFailure}: {formatHistoryTimestampLabel(item.processing_last_failure_at)}</div> : null; }

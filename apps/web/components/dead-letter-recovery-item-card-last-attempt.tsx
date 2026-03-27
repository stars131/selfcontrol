"use client";
import type { DeadLetterRecoveryItemCardLastAttemptProps } from "./dead-letter-recovery-item-card-last-attempt.types";
export function DeadLetterRecoveryItemCardLastAttempt({ formatHistoryTimestampLabel, item, mediaIssueCopy }: DeadLetterRecoveryItemCardLastAttemptProps) { return <div className="muted" style={{ marginTop: 8 }}>{mediaIssueCopy.lastAttempt}: {formatHistoryTimestampLabel(item.processing_last_attempt_at)}</div>; }

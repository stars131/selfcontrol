"use client";
import type { DeadLetterRecoveryItemCardLastAttemptProps } from "./dead-letter-recovery-item-card-last-attempt.types";
import type { BuildDeadLetterRecoveryItemCardLastAttemptPropsInput } from "./dead-letter-recovery-item-card-last-attempt-props.types";
export function buildDeadLetterRecoveryItemCardLastAttemptProps({ formatHistoryTimestampLabel, item, mediaIssueCopy }: BuildDeadLetterRecoveryItemCardLastAttemptPropsInput): DeadLetterRecoveryItemCardLastAttemptProps { return { formatHistoryTimestampLabel, item, mediaIssueCopy }; }

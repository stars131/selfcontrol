"use client";
import type { DeadLetterRecoveryItemCardLastFailureProps } from "./dead-letter-recovery-item-card-last-failure.types";
import type { BuildDeadLetterRecoveryItemCardLastFailurePropsInput } from "./dead-letter-recovery-item-card-last-failure-props.types";
export function buildDeadLetterRecoveryItemCardLastFailureProps({ formatHistoryTimestampLabel, item, mediaIssueCopy }: BuildDeadLetterRecoveryItemCardLastFailurePropsInput): DeadLetterRecoveryItemCardLastFailureProps { return { formatHistoryTimestampLabel, item, mediaIssueCopy }; }

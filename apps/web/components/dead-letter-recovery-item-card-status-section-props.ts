"use client";
import type { DeadLetterRecoveryItemCardStatusProps } from "./dead-letter-recovery-item-card-status.types";
import type { BuildDeadLetterRecoveryItemCardStatusSectionPropsInput } from "./dead-letter-recovery-item-card-status-section-props.types";
export function buildDeadLetterRecoveryItemCardStatusSectionProps({ formatHistoryTimestampLabel, item, locale, mediaIssueCopy }: BuildDeadLetterRecoveryItemCardStatusSectionPropsInput): DeadLetterRecoveryItemCardStatusProps { return { formatHistoryTimestampLabel, item, locale, mediaIssueCopy }; }

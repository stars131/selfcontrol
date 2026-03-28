"use client";
import type { DeadLetterRecoveryItemCardHeaderProps } from "./dead-letter-recovery-item-card-header.types";
import type { BuildDeadLetterRecoveryItemCardHeaderPropsInput } from "./dead-letter-recovery-item-card-header-props.types";
export function buildDeadLetterRecoveryItemCardHeaderProps({ bulkRetryingDeadLetter, item, locale, mediaIssueCopy, onToggleSelection, selectedDeadLetterIds }: BuildDeadLetterRecoveryItemCardHeaderPropsInput): DeadLetterRecoveryItemCardHeaderProps { return { bulkRetryingDeadLetter, item, locale, mediaIssueCopy, onToggleSelection, selectedDeadLetterIds }; }

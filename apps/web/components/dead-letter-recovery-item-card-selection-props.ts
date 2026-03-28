"use client";
import type { DeadLetterRecoveryItemCardSelectionProps } from "./dead-letter-recovery-item-card-selection.types";
import type { BuildDeadLetterRecoveryItemCardSelectionPropsInput } from "./dead-letter-recovery-item-card-selection-props.types";
export function buildDeadLetterRecoveryItemCardSelectionProps({ bulkRetryingDeadLetter, item, onToggleSelection, selectedDeadLetterIds }: BuildDeadLetterRecoveryItemCardSelectionPropsInput): DeadLetterRecoveryItemCardSelectionProps { return { bulkRetryingDeadLetter, item, onToggleSelection, selectedDeadLetterIds }; }

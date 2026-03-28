"use client";

import { buildDeadLetterRecoveryItemCardActionButtonsProps } from "./dead-letter-recovery-item-card-action-buttons-props";
import { DeadLetterRecoveryItemCardActionButtons } from "./dead-letter-recovery-item-card-action-buttons";
import type { DeadLetterRecoveryItemCardActionsProps } from "./dead-letter-recovery-item-card-actions.types";

export function DeadLetterRecoveryItemCardActions(props: DeadLetterRecoveryItemCardActionsProps) {
  if (!props.canWriteWorkspace && !props.settingsHref) {
    return null;
  }

  return <DeadLetterRecoveryItemCardActionButtons {...buildDeadLetterRecoveryItemCardActionButtonsProps(props)} />;
}

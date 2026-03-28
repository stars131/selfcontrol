"use client";
import type { DeadLetterRecoveryItemCardActionButtonsProps } from "./dead-letter-recovery-item-card-action-buttons.types";
import type { BuildDeadLetterRecoveryItemCardActionButtonsPropsInput } from "./dead-letter-recovery-item-card-action-buttons-props.types";
export function buildDeadLetterRecoveryItemCardActionButtonsProps({ item, canWriteWorkspace, mediaIssueCopy, onRetryMediaProcessing, retryingMediaId, settingsHref }: BuildDeadLetterRecoveryItemCardActionButtonsPropsInput): DeadLetterRecoveryItemCardActionButtonsProps { return { item, canWriteWorkspace, mediaIssueCopy, onRetryMediaProcessing, retryingMediaId, settingsHref }; }

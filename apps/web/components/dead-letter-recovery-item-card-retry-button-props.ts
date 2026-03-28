"use client";
import type { DeadLetterRecoveryItemCardRetryButtonProps } from "./dead-letter-recovery-item-card-retry-button.types";
import type { BuildDeadLetterRecoveryItemCardRetryButtonPropsInput } from "./dead-letter-recovery-item-card-retry-button-props.types";
export function buildDeadLetterRecoveryItemCardRetryButtonProps({ item, canWriteWorkspace, mediaIssueCopy, onRetryMediaProcessing, retryingMediaId }: BuildDeadLetterRecoveryItemCardRetryButtonPropsInput): DeadLetterRecoveryItemCardRetryButtonProps { return { item, canWriteWorkspace, mediaIssueCopy, onRetryMediaProcessing, retryingMediaId }; }

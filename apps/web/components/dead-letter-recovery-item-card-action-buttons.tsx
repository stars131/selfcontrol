"use client";

import { buildDeadLetterRecoveryItemCardRetryButtonProps } from "./dead-letter-recovery-item-card-retry-button-props";
import { DeadLetterRecoveryItemCardRetryButton } from "./dead-letter-recovery-item-card-retry-button";
import { buildDeadLetterRecoveryItemCardSettingsLinkProps } from "./dead-letter-recovery-item-card-settings-link-props";
import { DeadLetterRecoveryItemCardSettingsLink } from "./dead-letter-recovery-item-card-settings-link";
import type { DeadLetterRecoveryItemCardActionButtonsProps } from "./dead-letter-recovery-item-card-action-buttons.types";

export function DeadLetterRecoveryItemCardActionButtons({
  item,
  canWriteWorkspace,
  mediaIssueCopy,
  onRetryMediaProcessing,
  retryingMediaId,
  settingsHref,
}: DeadLetterRecoveryItemCardActionButtonsProps) {
  return (
    <div className="action-row" style={{ marginTop: 10 }}>
      <DeadLetterRecoveryItemCardRetryButton {...buildDeadLetterRecoveryItemCardRetryButtonProps({ item, canWriteWorkspace, mediaIssueCopy, onRetryMediaProcessing, retryingMediaId, settingsHref })} />
      <DeadLetterRecoveryItemCardSettingsLink {...buildDeadLetterRecoveryItemCardSettingsLinkProps({ item, canWriteWorkspace, mediaIssueCopy, onRetryMediaProcessing, retryingMediaId, settingsHref })} />
    </div>
  );
}

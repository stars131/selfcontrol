"use client";

import { DeadLetterRecoveryItemCardActionNotice } from "./dead-letter-recovery-item-card-action-notice";
import { DeadLetterRecoveryItemCardMetadata } from "./dead-letter-recovery-item-card-metadata";
import { buildDeadLetterRecoveryItemCardActionNoticeProps } from "./dead-letter-recovery-item-card-action-notice-props";
import { buildDeadLetterRecoveryItemCardMetadataProps } from "./dead-letter-recovery-item-card-status-props";
import type { DeadLetterRecoveryItemCardStatusProps } from "./dead-letter-recovery-item-card-status.types";

export function DeadLetterRecoveryItemCardStatus(props: DeadLetterRecoveryItemCardStatusProps) {
  return <><DeadLetterRecoveryItemCardMetadata {...buildDeadLetterRecoveryItemCardMetadataProps(props)} /><DeadLetterRecoveryItemCardActionNotice {...buildDeadLetterRecoveryItemCardActionNoticeProps(props)} /></>;
}

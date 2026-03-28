"use client";
import type { DeadLetterRecoveryItemCardMetadataProps } from "./dead-letter-recovery-item-card-metadata.types";
import type { DeadLetterRecoveryItemCardStatusProps } from "./dead-letter-recovery-item-card-status.types";
export function buildDeadLetterRecoveryItemCardMetadataProps({ formatHistoryTimestampLabel, item, mediaIssueCopy }: DeadLetterRecoveryItemCardStatusProps): DeadLetterRecoveryItemCardMetadataProps {
  return { formatHistoryTimestampLabel, item, mediaIssueCopy };
}

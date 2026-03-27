"use client";
import { getMediaIssueAction } from "../lib/media-issue-display";
import type { DeadLetterRecoveryItemCardActionNoticeProps } from "./dead-letter-recovery-item-card-action-notice.types";
import type { DeadLetterRecoveryItemCardMetadataProps } from "./dead-letter-recovery-item-card-metadata.types";
import type { DeadLetterRecoveryItemCardStatusProps } from "./dead-letter-recovery-item-card-status.types";
export function buildDeadLetterRecoveryItemCardMetadataProps({ formatHistoryTimestampLabel, item, mediaIssueCopy }: DeadLetterRecoveryItemCardStatusProps): DeadLetterRecoveryItemCardMetadataProps {
  return { formatHistoryTimestampLabel, item, mediaIssueCopy };
}

export function buildDeadLetterRecoveryItemCardActionNoticeProps({ item, locale }: DeadLetterRecoveryItemCardStatusProps): DeadLetterRecoveryItemCardActionNoticeProps {
  return { action: getMediaIssueAction(locale, item) };
}

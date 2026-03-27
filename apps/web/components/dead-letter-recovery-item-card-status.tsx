"use client";

import { getMediaIssueAction } from "../lib/media-issue-display";
import { DeadLetterRecoveryItemCardActionNotice } from "./dead-letter-recovery-item-card-action-notice";
import { DeadLetterRecoveryItemCardMetadata } from "./dead-letter-recovery-item-card-metadata";
import type { DeadLetterRecoveryItemCardStatusProps } from "./dead-letter-recovery-item-card-status.types";

export function DeadLetterRecoveryItemCardStatus({ formatHistoryTimestampLabel, item, locale, mediaIssueCopy }: DeadLetterRecoveryItemCardStatusProps) {
  const action = getMediaIssueAction(locale, item);

  return <><DeadLetterRecoveryItemCardMetadata formatHistoryTimestampLabel={formatHistoryTimestampLabel} item={item} mediaIssueCopy={mediaIssueCopy} /><DeadLetterRecoveryItemCardActionNotice action={action} /></>;
}

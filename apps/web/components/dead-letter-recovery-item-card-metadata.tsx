"use client";

import { DeadLetterRecoveryItemCardLastAttempt } from "./dead-letter-recovery-item-card-last-attempt"; import { buildDeadLetterRecoveryItemCardLastAttemptProps } from "./dead-letter-recovery-item-card-last-attempt-props"; import { DeadLetterRecoveryItemCardLastFailure } from "./dead-letter-recovery-item-card-last-failure"; import { buildDeadLetterRecoveryItemCardLastFailureProps } from "./dead-letter-recovery-item-card-last-failure-props"; import { DeadLetterRecoveryItemCardRetryBudgetUsed } from "./dead-letter-recovery-item-card-retry-budget-used"; import type { DeadLetterRecoveryItemCardMetadataProps } from "./dead-letter-recovery-item-card-metadata.types";

export function DeadLetterRecoveryItemCardMetadata({ formatHistoryTimestampLabel, item, mediaIssueCopy }: DeadLetterRecoveryItemCardMetadataProps) {
  return <><DeadLetterRecoveryItemCardLastAttempt {...buildDeadLetterRecoveryItemCardLastAttemptProps({ formatHistoryTimestampLabel, item, mediaIssueCopy })} /><DeadLetterRecoveryItemCardLastFailure {...buildDeadLetterRecoveryItemCardLastFailureProps({ formatHistoryTimestampLabel, item, mediaIssueCopy })} /><DeadLetterRecoveryItemCardRetryBudgetUsed item={item} mediaIssueCopy={mediaIssueCopy} /></>;
}

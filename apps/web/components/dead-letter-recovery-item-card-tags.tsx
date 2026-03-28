"use client";

import { buildDeadLetterRecoveryItemCardProcessingStatusTagProps } from "./dead-letter-recovery-item-card-processing-status-tag-props";
import { buildDeadLetterRecoveryItemCardIssueLabelTagProps } from "./dead-letter-recovery-item-card-issue-label-tag-props";
import { DeadLetterRecoveryItemCardProcessingStatusTag } from "./dead-letter-recovery-item-card-processing-status-tag";
import { DeadLetterRecoveryItemCardIssueLabelTag } from "./dead-letter-recovery-item-card-issue-label-tag";
import { buildDeadLetterRecoveryItemCardRetryStateTagProps } from "./dead-letter-recovery-item-card-retry-state-tag-props";
import { DeadLetterRecoveryItemCardRetryStateTag } from "./dead-letter-recovery-item-card-retry-state-tag";
import { buildDeadLetterRecoveryItemCardStorageProviderTagProps } from "./dead-letter-recovery-item-card-storage-provider-tag-props";
import { DeadLetterRecoveryItemCardStorageProviderTag } from "./dead-letter-recovery-item-card-storage-provider-tag";
import type { DeadLetterRecoveryItemCardTagsProps } from "./dead-letter-recovery-item-card-tags.types";

export function DeadLetterRecoveryItemCardTags(props: DeadLetterRecoveryItemCardTagsProps) {
  return (
    <div className="tag-row">
      <DeadLetterRecoveryItemCardProcessingStatusTag {...buildDeadLetterRecoveryItemCardProcessingStatusTagProps(props)} />
      <DeadLetterRecoveryItemCardStorageProviderTag {...buildDeadLetterRecoveryItemCardStorageProviderTagProps(props)} />
      <DeadLetterRecoveryItemCardRetryStateTag {...buildDeadLetterRecoveryItemCardRetryStateTagProps(props)} />
      <DeadLetterRecoveryItemCardIssueLabelTag {...buildDeadLetterRecoveryItemCardIssueLabelTagProps(props)} />
    </div>
  );
}

"use client";

import { buildDeadLetterRecoveryItemCardProcessingStatusTagProps } from "./dead-letter-recovery-item-card-processing-status-tag-props";
import { DeadLetterRecoveryItemCardProcessingStatusTag } from "./dead-letter-recovery-item-card-processing-status-tag";
import { DeadLetterRecoveryItemCardIssueLabelTag } from "./dead-letter-recovery-item-card-issue-label-tag";
import { buildDeadLetterRecoveryItemCardRetryStateTagProps } from "./dead-letter-recovery-item-card-retry-state-tag-props";
import { DeadLetterRecoveryItemCardRetryStateTag } from "./dead-letter-recovery-item-card-retry-state-tag";
import { buildDeadLetterRecoveryItemCardStorageProviderTagProps } from "./dead-letter-recovery-item-card-storage-provider-tag-props";
import { DeadLetterRecoveryItemCardStorageProviderTag } from "./dead-letter-recovery-item-card-storage-provider-tag";
import type { DeadLetterRecoveryItemCardTagsProps } from "./dead-letter-recovery-item-card-tags.types";

export function DeadLetterRecoveryItemCardTags({
  item,
  locale,
  mediaIssueCopy,
}: DeadLetterRecoveryItemCardTagsProps) {
  return (
    <div className="tag-row">
      <DeadLetterRecoveryItemCardProcessingStatusTag {...buildDeadLetterRecoveryItemCardProcessingStatusTagProps({ item, locale })} />
      <DeadLetterRecoveryItemCardStorageProviderTag {...buildDeadLetterRecoveryItemCardStorageProviderTagProps({ item, locale })} />
      <DeadLetterRecoveryItemCardRetryStateTag {...buildDeadLetterRecoveryItemCardRetryStateTagProps({ item, locale, mediaIssueCopy })} />
      <DeadLetterRecoveryItemCardIssueLabelTag item={item} locale={locale} />
    </div>
  );
}

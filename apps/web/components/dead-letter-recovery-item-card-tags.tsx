"use client";

import { getStorageProviderLabel } from "../lib/storage-provider-display";
import { DeadLetterRecoveryItemCardProcessingStatusTag } from "./dead-letter-recovery-item-card-processing-status-tag";
import { DeadLetterRecoveryItemCardIssueLabelTag } from "./dead-letter-recovery-item-card-issue-label-tag";
import { DeadLetterRecoveryItemCardRetryStateTag } from "./dead-letter-recovery-item-card-retry-state-tag";
import type { DeadLetterRecoveryItemCardTagsProps } from "./dead-letter-recovery-item-card-tags.types";

export function DeadLetterRecoveryItemCardTags({
  item,
  locale,
  mediaIssueCopy,
}: DeadLetterRecoveryItemCardTagsProps) {
  return (
    <div className="tag-row">
      <DeadLetterRecoveryItemCardProcessingStatusTag item={item} locale={locale} />
      <span className="tag">{getStorageProviderLabel(locale, item.storage_provider)}</span>
      <DeadLetterRecoveryItemCardRetryStateTag item={item} locale={locale} mediaIssueCopy={mediaIssueCopy} />
      <DeadLetterRecoveryItemCardIssueLabelTag item={item} locale={locale} />
    </div>
  );
}

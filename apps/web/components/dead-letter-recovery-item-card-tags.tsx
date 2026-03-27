"use client";

import { getProcessingStatusLabel } from "../lib/media-issue-display";
import { getStorageProviderLabel } from "../lib/storage-provider-display";
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
      <span className="tag">{getProcessingStatusLabel(locale, item.processing_status)}</span>
      <span className="tag">{getStorageProviderLabel(locale, item.storage_provider)}</span>
      <DeadLetterRecoveryItemCardRetryStateTag item={item} locale={locale} mediaIssueCopy={mediaIssueCopy} />
      <DeadLetterRecoveryItemCardIssueLabelTag item={item} locale={locale} />
    </div>
  );
}

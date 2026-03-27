"use client";

import { getMediaIssueLabel, getProcessingStatusLabel } from "../lib/media-issue-display";
import { getStorageProviderLabel } from "../lib/storage-provider-display";
import { DeadLetterRecoveryItemCardRetryStateTag } from "./dead-letter-recovery-item-card-retry-state-tag";
import type { DeadLetterRecoveryItemCardTagsProps } from "./dead-letter-recovery-item-card-tags.types";

export function DeadLetterRecoveryItemCardTags({
  item,
  locale,
  mediaIssueCopy,
}: DeadLetterRecoveryItemCardTagsProps) {
  const issueLabel = getMediaIssueLabel(locale, item);

  return (
    <div className="tag-row">
      <span className="tag">{getProcessingStatusLabel(locale, item.processing_status)}</span>
      <span className="tag">{getStorageProviderLabel(locale, item.storage_provider)}</span>
      <DeadLetterRecoveryItemCardRetryStateTag item={item} locale={locale} mediaIssueCopy={mediaIssueCopy} />
      {issueLabel ? <span className="tag">{issueLabel}</span> : null}
    </div>
  );
}

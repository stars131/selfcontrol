"use client";

import { getMediaIssueLabel, getProcessingStatusLabel, getRetryStateLabel } from "../lib/media-issue-display";
import type { DeadLetterRecoveryItemCardProps } from "./dead-letter-recovery-panel.types";

export function DeadLetterRecoveryItemCardTags({
  item,
  locale,
  mediaIssueCopy,
}: Pick<DeadLetterRecoveryItemCardProps, "item" | "locale" | "mediaIssueCopy">) {
  const issueLabel = getMediaIssueLabel(locale, item);

  return (
    <div className="tag-row">
      <span className="tag">{getProcessingStatusLabel(locale, item.processing_status)}</span>
      <span className="tag">{item.storage_provider}</span>
      {item.processing_retry_state ? (
        <span className="tag">
          {mediaIssueCopy.retryStatePrefix} {getRetryStateLabel(locale, item.processing_retry_state)}
        </span>
      ) : null}
      {issueLabel ? <span className="tag">{issueLabel}</span> : null}
    </div>
  );
}

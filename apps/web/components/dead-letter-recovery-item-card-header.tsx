"use client";

import { getMediaTypeLabel } from "../lib/media-type-display";
import { canRetryMediaIssue } from "../lib/record-panel-media";
import { DeadLetterRecoveryItemCardTags } from "./dead-letter-recovery-item-card-tags";
import type { DeadLetterRecoveryItemCardHeaderProps } from "./dead-letter-recovery-item-card-header.types";

export function DeadLetterRecoveryItemCardHeader({
  bulkRetryingDeadLetter,
  canWriteWorkspace,
  item,
  locale,
  mediaIssueCopy,
  onToggleSelection,
  selectedDeadLetterIds,
}: DeadLetterRecoveryItemCardHeaderProps) {
  return (
    <label className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <input
          checked={selectedDeadLetterIds.includes(item.media_id)}
          disabled={bulkRetryingDeadLetter || !canRetryMediaIssue(item)}
          type="checkbox"
          onChange={(event) => onToggleSelection(item.media_id, event.target.checked)}
        />
        <div>
          <div className="eyebrow">{getMediaTypeLabel(locale, item.media_type)}</div>
          <div>{item.original_filename}</div>
        </div>
      </div>
      <DeadLetterRecoveryItemCardTags item={item} locale={locale} mediaIssueCopy={mediaIssueCopy} />
    </label>
  );
}

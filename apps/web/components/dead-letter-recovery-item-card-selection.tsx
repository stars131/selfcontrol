"use client";

import { canRetryMediaIssue } from "../lib/record-panel-media";
import type { DeadLetterRecoveryItemCardSelectionProps } from "./dead-letter-recovery-item-card-selection.types";

export function DeadLetterRecoveryItemCardSelection({ bulkRetryingDeadLetter, item, onToggleSelection, selectedDeadLetterIds }: DeadLetterRecoveryItemCardSelectionProps) {
  return (
    <input
      checked={selectedDeadLetterIds.includes(item.media_id)}
      disabled={bulkRetryingDeadLetter || !canRetryMediaIssue(item)}
      type="checkbox"
      onChange={(event) => onToggleSelection(item.media_id, event.target.checked)}
    />
  );
}

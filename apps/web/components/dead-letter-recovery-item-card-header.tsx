"use client";

import { buildDeadLetterRecoveryItemCardIdentityProps } from "./dead-letter-recovery-item-card-identity-props";
import { DeadLetterRecoveryItemCardIdentity } from "./dead-letter-recovery-item-card-identity";
import { buildDeadLetterRecoveryItemCardSelectionProps } from "./dead-letter-recovery-item-card-selection-props";
import { DeadLetterRecoveryItemCardSelection } from "./dead-letter-recovery-item-card-selection";
import { DeadLetterRecoveryItemCardTags } from "./dead-letter-recovery-item-card-tags";
import type { DeadLetterRecoveryItemCardHeaderProps } from "./dead-letter-recovery-item-card-header.types";

export function DeadLetterRecoveryItemCardHeader({
  bulkRetryingDeadLetter,
  item,
  locale,
  mediaIssueCopy,
  onToggleSelection,
  selectedDeadLetterIds,
}: DeadLetterRecoveryItemCardHeaderProps) {
  return (
    <label className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <DeadLetterRecoveryItemCardSelection {...buildDeadLetterRecoveryItemCardSelectionProps({ bulkRetryingDeadLetter, item, onToggleSelection, selectedDeadLetterIds })} />
        <DeadLetterRecoveryItemCardIdentity {...buildDeadLetterRecoveryItemCardIdentityProps({ item, locale })} />
      </div>
      <DeadLetterRecoveryItemCardTags item={item} locale={locale} mediaIssueCopy={mediaIssueCopy} />
    </label>
  );
}

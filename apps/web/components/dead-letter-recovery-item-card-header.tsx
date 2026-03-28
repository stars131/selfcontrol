"use client";

import { buildDeadLetterRecoveryItemCardIdentityProps } from "./dead-letter-recovery-item-card-identity-props";
import { DeadLetterRecoveryItemCardIdentity } from "./dead-letter-recovery-item-card-identity";
import { buildDeadLetterRecoveryItemCardSelectionProps } from "./dead-letter-recovery-item-card-selection-props";
import { DeadLetterRecoveryItemCardSelection } from "./dead-letter-recovery-item-card-selection";
import { buildDeadLetterRecoveryItemCardTagsProps } from "./dead-letter-recovery-item-card-tags-props";
import { DeadLetterRecoveryItemCardTags } from "./dead-letter-recovery-item-card-tags";
import type { DeadLetterRecoveryItemCardHeaderProps } from "./dead-letter-recovery-item-card-header.types";

export function DeadLetterRecoveryItemCardHeader(props: DeadLetterRecoveryItemCardHeaderProps) {
  return (
    <label className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <DeadLetterRecoveryItemCardSelection {...buildDeadLetterRecoveryItemCardSelectionProps(props)} />
        <DeadLetterRecoveryItemCardIdentity {...buildDeadLetterRecoveryItemCardIdentityProps(props)} />
      </div>
      <DeadLetterRecoveryItemCardTags {...buildDeadLetterRecoveryItemCardTagsProps(props)} />
    </label>
  );
}

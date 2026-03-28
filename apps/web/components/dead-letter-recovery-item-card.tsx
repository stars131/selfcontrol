"use client";

import { DeadLetterRecoveryItemCardActions } from "./dead-letter-recovery-item-card-actions";
import { buildDeadLetterRecoveryItemCardActionsProps, buildDeadLetterRecoveryItemCardHeaderProps } from "./dead-letter-recovery-item-card-child-props";
import { DeadLetterRecoveryItemCardError } from "./dead-letter-recovery-item-card-error";
import { DeadLetterRecoveryItemCardHeader } from "./dead-letter-recovery-item-card-header";
import { buildDeadLetterRecoveryItemCardStatusSectionProps } from "./dead-letter-recovery-item-card-status-section-props";
import { DeadLetterRecoveryItemCardStatus } from "./dead-letter-recovery-item-card-status";
import type { DeadLetterRecoveryItemCardProps } from "./dead-letter-recovery-panel.types";

export function DeadLetterRecoveryItemCard(props: DeadLetterRecoveryItemCardProps) {
  return (
    <article className="record-card">
      <DeadLetterRecoveryItemCardHeader {...buildDeadLetterRecoveryItemCardHeaderProps(props)} />
      <DeadLetterRecoveryItemCardStatus {...buildDeadLetterRecoveryItemCardStatusSectionProps(props)} />
      <DeadLetterRecoveryItemCardActions {...buildDeadLetterRecoveryItemCardActionsProps(props)} />
      <DeadLetterRecoveryItemCardError item={props.item} />
    </article>
  );
}

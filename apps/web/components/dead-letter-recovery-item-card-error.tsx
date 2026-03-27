"use client";

import type { DeadLetterRecoveryItemCardErrorProps } from "./dead-letter-recovery-item-card-error.types";

export function DeadLetterRecoveryItemCardError({ item }: DeadLetterRecoveryItemCardErrorProps) {
  if (!item.processing_error) {
    return null;
  }

  return (
    <div className="notice error" style={{ marginTop: 10 }}>
      {item.processing_error}
    </div>
  );
}

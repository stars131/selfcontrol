"use client";

import type { DeadLetterRecoveryItemCardActionNoticeProps } from "./dead-letter-recovery-item-card-action-notice.types";

export function DeadLetterRecoveryItemCardActionNotice({
  action,
}: DeadLetterRecoveryItemCardActionNoticeProps) {
  return action.label ? (
    <div className="notice" style={{ marginTop: 10 }}>
      {action.label}
      {action.detail ? `: ${action.detail}` : ""}
    </div>
  ) : null;
}

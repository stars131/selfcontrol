"use client";

import { getMediaIssueAction } from "../lib/media-issue-display";
import type { DeadLetterRecoveryItemCardStatusProps } from "./dead-letter-recovery-item-card-status.types";

export function DeadLetterRecoveryItemCardStatus({
  formatHistoryTimestampLabel,
  item,
  locale,
  mediaIssueCopy,
}: DeadLetterRecoveryItemCardStatusProps) {
  const action = getMediaIssueAction(locale, item);

  return (
    <>
      <div className="muted" style={{ marginTop: 8 }}>
        {mediaIssueCopy.lastAttempt}: {formatHistoryTimestampLabel(item.processing_last_attempt_at)}
      </div>
      {item.processing_last_failure_at ? (
        <div className="muted" style={{ marginTop: 6 }}>
          {mediaIssueCopy.lastFailure}: {formatHistoryTimestampLabel(item.processing_last_failure_at)}
        </div>
      ) : null}
      {typeof item.processing_retry_count === "number" ? (
        <div className="muted" style={{ marginTop: 6 }}>
          {mediaIssueCopy.retryBudgetUsed}: {item.processing_retry_count}
          {typeof item.processing_retry_max_attempts === "number"
            ? ` / ${item.processing_retry_max_attempts}`
            : ""}
        </div>
      ) : null}
      {action.label ? (
        <div className="notice" style={{ marginTop: 10 }}>
          {action.label}
          {action.detail ? `: ${action.detail}` : ""}
        </div>
      ) : null}
    </>
  );
}

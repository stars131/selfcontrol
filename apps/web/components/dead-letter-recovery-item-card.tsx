"use client";

import {
  getMediaIssueAction,
} from "../lib/media-issue-display";
import { buildMediaIssueSettingsHref, canRetryMediaIssue } from "../lib/record-panel-media";
import { DeadLetterRecoveryItemCardActions } from "./dead-letter-recovery-item-card-actions";
import { DeadLetterRecoveryItemCardTags } from "./dead-letter-recovery-item-card-tags";
import type { DeadLetterRecoveryItemCardProps } from "./dead-letter-recovery-panel.types";

export function DeadLetterRecoveryItemCard({
  item,
  locale,
  canWriteWorkspace,
  workspaceId,
  mediaIssueCopy,
  selectedDeadLetterIds,
  bulkRetryingDeadLetter,
  retryingMediaId,
  formatHistoryTimestampLabel,
  onToggleSelection,
  onRetryMediaProcessing,
}: DeadLetterRecoveryItemCardProps) {
  const action = getMediaIssueAction(locale, item);
  const settingsHref = buildMediaIssueSettingsHref(workspaceId, item);

  return (
    <article className="record-card">
      <label className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <input
            checked={selectedDeadLetterIds.includes(item.media_id)}
            disabled={bulkRetryingDeadLetter || !canRetryMediaIssue(item)}
            type="checkbox"
            onChange={(event) => onToggleSelection(item.media_id, event.target.checked)}
          />
          <div>
            <div className="eyebrow">{item.media_type}</div>
            <div>{item.original_filename}</div>
          </div>
        </div>
        <DeadLetterRecoveryItemCardTags item={item} locale={locale} mediaIssueCopy={mediaIssueCopy} />
      </label>
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
      <DeadLetterRecoveryItemCardActions
        canWriteWorkspace={canWriteWorkspace}
        item={item}
        mediaIssueCopy={mediaIssueCopy}
        onRetryMediaProcessing={onRetryMediaProcessing}
        retryingMediaId={retryingMediaId}
        settingsHref={settingsHref}
      />
      {item.processing_error ? (
        <div className="notice error" style={{ marginTop: 10 }}>
          {item.processing_error}
        </div>
      ) : null}
    </article>
  );
}

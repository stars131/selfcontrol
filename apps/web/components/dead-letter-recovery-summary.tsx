"use client";

import { getMediaIssueLabel, getRetryStateLabel } from "../lib/media-issue-display";
import type { DeadLetterRecoveryPanelProps } from "./dead-letter-recovery-panel.types";

type DeadLetterRecoverySummaryProps = Pick<
  DeadLetterRecoveryPanelProps,
  | "bulkRetryingDeadLetter"
  | "locale"
  | "mediaDeadLetterOverview"
  | "mediaIssueCopy"
  | "onBulkRetryAll"
  | "onBulkRetrySelected"
  | "onClearSelection"
  | "onSelectAll"
  | "selectedDeadLetterIds"
>;

export function DeadLetterRecoverySummary({
  bulkRetryingDeadLetter,
  locale,
  mediaDeadLetterOverview,
  mediaIssueCopy,
  onBulkRetryAll,
  onBulkRetrySelected,
  onClearSelection,
  onSelectAll,
  selectedDeadLetterIds,
}: DeadLetterRecoverySummaryProps) {
  return (
    <>
      <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div className="eyebrow">{mediaIssueCopy.deadLetterTitle}</div>
          <div className="muted" style={{ marginTop: 8 }}>
            {mediaIssueCopy.deadLetterDescription}
          </div>
        </div>
        <div className="tag-row">
          <span className="tag">
            {mediaDeadLetterOverview?.total_count ?? 0} {mediaIssueCopy.itemSuffix}
          </span>
          {mediaDeadLetterOverview
            ? Object.entries(mediaDeadLetterOverview.by_retry_state).map(([retryState, count]) => (
                <span className="tag" key={retryState}>
                  {getRetryStateLabel(locale, retryState)}: {count}
                </span>
              ))
            : null}
          {mediaDeadLetterOverview
            ? Object.entries(mediaDeadLetterOverview.by_issue_category).map(([issueCategory, count]) => (
                <span className="tag" key={issueCategory}>
                  {getMediaIssueLabel(locale, { issue_category: issueCategory, issue_label: null })}: {count}
                </span>
              ))
            : null}
        </div>
      </div>
      {mediaDeadLetterOverview?.items.length ? (
        <div className="action-row">
          <button
            className="button secondary"
            disabled={bulkRetryingDeadLetter}
            type="button"
            onClick={onSelectAll}
          >
            {mediaIssueCopy.selectVisible}
          </button>
          <button
            className="button secondary"
            disabled={bulkRetryingDeadLetter || !selectedDeadLetterIds.length}
            type="button"
            onClick={onClearSelection}
          >
            {mediaIssueCopy.clearSelection}
          </button>
          <button
            className="button secondary"
            disabled={bulkRetryingDeadLetter || !selectedDeadLetterIds.length}
            type="button"
            onClick={() => void onBulkRetrySelected()}
          >
            {bulkRetryingDeadLetter
              ? mediaIssueCopy.retrying
              : `${mediaIssueCopy.retrySelectedPrefix} (${selectedDeadLetterIds.length})`}
          </button>
          <button
            className="button secondary"
            disabled={bulkRetryingDeadLetter}
            type="button"
            onClick={() => void onBulkRetryAll()}
          >
            {bulkRetryingDeadLetter ? mediaIssueCopy.retrying : mediaIssueCopy.retryAll}
          </button>
        </div>
      ) : null}
    </>
  );
}

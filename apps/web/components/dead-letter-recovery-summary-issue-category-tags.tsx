"use client";

import { getMediaIssueLabel } from "../lib/media-issue-display";
import type { DeadLetterRecoverySummaryIssueCategoryTagsProps } from "./dead-letter-recovery-summary-issue-category-tags.types";

export function DeadLetterRecoverySummaryIssueCategoryTags({
  locale,
  mediaDeadLetterOverview,
}: DeadLetterRecoverySummaryIssueCategoryTagsProps) {
  return mediaDeadLetterOverview
    ? Object.entries(mediaDeadLetterOverview.by_issue_category).map(([issueCategory, count]) => (
        <span className="tag" key={issueCategory}>
          {getMediaIssueLabel(locale, { issue_category: issueCategory, issue_label: null })}: {count}
        </span>
      ))
    : null;
}

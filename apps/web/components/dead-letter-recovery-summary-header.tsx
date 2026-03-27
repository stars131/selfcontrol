"use client";

import { DeadLetterRecoverySummaryStats } from "./dead-letter-recovery-summary-stats";
import type { DeadLetterRecoverySummaryHeaderProps } from "./dead-letter-recovery-summary-header.types";

export function DeadLetterRecoverySummaryHeader({
  locale,
  mediaDeadLetterOverview,
  mediaIssueCopy,
}: DeadLetterRecoverySummaryHeaderProps) {
  return (
    <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <div className="eyebrow">{mediaIssueCopy.deadLetterTitle}</div>
        <div className="muted" style={{ marginTop: 8 }}>{mediaIssueCopy.deadLetterDescription}</div>
      </div>
      <DeadLetterRecoverySummaryStats
        locale={locale}
        mediaDeadLetterOverview={mediaDeadLetterOverview}
        mediaIssueCopy={mediaIssueCopy}
      />
    </div>
  );
}

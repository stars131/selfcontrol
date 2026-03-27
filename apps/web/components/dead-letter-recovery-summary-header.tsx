"use client";

import { DeadLetterRecoverySummaryIntro } from "./dead-letter-recovery-summary-intro";
import { DeadLetterRecoverySummaryStats } from "./dead-letter-recovery-summary-stats";
import type { DeadLetterRecoverySummaryHeaderProps } from "./dead-letter-recovery-summary-header.types";

export function DeadLetterRecoverySummaryHeader({
  locale,
  mediaDeadLetterOverview,
  mediaIssueCopy,
}: DeadLetterRecoverySummaryHeaderProps) {
  return (
    <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
      <DeadLetterRecoverySummaryIntro mediaIssueCopy={mediaIssueCopy} />
      <DeadLetterRecoverySummaryStats
        locale={locale}
        mediaDeadLetterOverview={mediaDeadLetterOverview}
        mediaIssueCopy={mediaIssueCopy}
      />
    </div>
  );
}

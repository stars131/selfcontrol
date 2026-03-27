"use client";

import type { DeadLetterRecoverySummaryIntroProps } from "./dead-letter-recovery-summary-intro.types";

export function DeadLetterRecoverySummaryIntro({ mediaIssueCopy }: DeadLetterRecoverySummaryIntroProps) {
  return (
    <div>
      <div className="eyebrow">{mediaIssueCopy.deadLetterTitle}</div>
      <div className="muted" style={{ marginTop: 8 }}>{mediaIssueCopy.deadLetterDescription}</div>
    </div>
  );
}

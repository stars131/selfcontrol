"use client";

import type { DeadLetterRecoveryPanelEmptyProps } from "./dead-letter-recovery-panel-empty.types";

export function DeadLetterRecoveryPanelEmpty({ mediaIssueCopy }: DeadLetterRecoveryPanelEmptyProps) {
  return <div className="notice">{mediaIssueCopy.noDeadLetter}</div>;
}

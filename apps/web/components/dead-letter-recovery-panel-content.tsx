"use client";
import { DeadLetterRecoveryPanelEmpty } from "./dead-letter-recovery-panel-empty";
import { buildDeadLetterRecoveryPanelListProps } from "./dead-letter-recovery-panel-list-props";
import { DeadLetterRecoveryPanelList } from "./dead-letter-recovery-panel-list";
import type { DeadLetterRecoveryPanelContentProps } from "./dead-letter-recovery-panel-content.types";
export function DeadLetterRecoveryPanelContent({ mediaDeadLetterOverview, ...props }: DeadLetterRecoveryPanelContentProps) {
  return !mediaDeadLetterOverview?.items.length ? <DeadLetterRecoveryPanelEmpty mediaIssueCopy={props.mediaIssueCopy} /> : <DeadLetterRecoveryPanelList {...buildDeadLetterRecoveryPanelListProps({ mediaDeadLetterOverview, ...props })} />;
}

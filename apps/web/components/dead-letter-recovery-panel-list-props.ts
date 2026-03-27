"use client";
import type { DeadLetterRecoveryPanelListProps } from "./dead-letter-recovery-panel-list.types";
import type { BuildDeadLetterRecoveryPanelListPropsInput } from "./dead-letter-recovery-panel-list-props.types";
export function buildDeadLetterRecoveryPanelListProps({ mediaDeadLetterOverview, ...props }: BuildDeadLetterRecoveryPanelListPropsInput): DeadLetterRecoveryPanelListProps {
  return { ...props, mediaDeadLetterOverview };
}

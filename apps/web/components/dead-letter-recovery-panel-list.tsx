"use client";

import { buildDeadLetterRecoveryItemCardProps } from "./dead-letter-recovery-list-item-props";
import { DeadLetterRecoveryItemCard } from "./dead-letter-recovery-item-card";
import type { DeadLetterRecoveryPanelListProps } from "./dead-letter-recovery-panel-list.types";

export function DeadLetterRecoveryPanelList(props: DeadLetterRecoveryPanelListProps) {
  return <div className="record-list compact-list">{props.mediaDeadLetterOverview.items.map((item) => <DeadLetterRecoveryItemCard key={item.media_id} {...buildDeadLetterRecoveryItemCardProps({ item, props })} />)}</div>;
}

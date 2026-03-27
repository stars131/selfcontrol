"use client";

import { buildMediaIssueSettingsHref } from "../lib/record-panel-media";
import type { DeadLetterRecoveryItemCardActionsProps } from "./dead-letter-recovery-item-card-actions.types";
import type { DeadLetterRecoveryItemCardHeaderProps } from "./dead-letter-recovery-item-card-header.types";
import type { DeadLetterRecoveryItemCardStatusProps } from "./dead-letter-recovery-item-card-status.types";
import type { BuildDeadLetterRecoveryItemCardChildPropsInput } from "./dead-letter-recovery-item-card-child-props.types";

export function buildDeadLetterRecoveryItemCardHeaderProps({ bulkRetryingDeadLetter, item, locale, mediaIssueCopy, onToggleSelection, selectedDeadLetterIds }: BuildDeadLetterRecoveryItemCardChildPropsInput): DeadLetterRecoveryItemCardHeaderProps {
  return { bulkRetryingDeadLetter, item, locale, mediaIssueCopy, onToggleSelection, selectedDeadLetterIds };
}

export function buildDeadLetterRecoveryItemCardStatusProps({ formatHistoryTimestampLabel, item, locale, mediaIssueCopy }: BuildDeadLetterRecoveryItemCardChildPropsInput): DeadLetterRecoveryItemCardStatusProps {
  return { formatHistoryTimestampLabel, item, locale, mediaIssueCopy };
}

export function buildDeadLetterRecoveryItemCardActionsProps({ canWriteWorkspace, item, mediaIssueCopy, onRetryMediaProcessing, retryingMediaId, workspaceId }: BuildDeadLetterRecoveryItemCardChildPropsInput): DeadLetterRecoveryItemCardActionsProps {
  return {
    canWriteWorkspace,
    item,
    mediaIssueCopy,
    onRetryMediaProcessing,
    retryingMediaId,
    settingsHref: buildMediaIssueSettingsHref(workspaceId, item),
  };
}

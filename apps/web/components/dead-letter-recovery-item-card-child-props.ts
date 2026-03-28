"use client";

import { buildMediaIssueSettingsHref } from "../lib/record-panel-media";
import type { DeadLetterRecoveryItemCardActionsProps } from "./dead-letter-recovery-item-card-actions.types";
import type { BuildDeadLetterRecoveryItemCardChildPropsInput } from "./dead-letter-recovery-item-card-child-props.types";

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

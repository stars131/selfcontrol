"use client";
import { buildMediaIssueSettingsHref } from "../lib/record-panel-media";
import type { DeadLetterRecoveryItemCardActionsProps } from "./dead-letter-recovery-item-card-actions.types";
import type { BuildDeadLetterRecoveryItemCardActionsPropsInput } from "./dead-letter-recovery-item-card-actions-props.types";
export function buildDeadLetterRecoveryItemCardActionsProps({ canWriteWorkspace, item, mediaIssueCopy, onRetryMediaProcessing, retryingMediaId, workspaceId }: BuildDeadLetterRecoveryItemCardActionsPropsInput): DeadLetterRecoveryItemCardActionsProps { return { canWriteWorkspace, item, mediaIssueCopy, onRetryMediaProcessing, retryingMediaId, settingsHref: buildMediaIssueSettingsHref(workspaceId, item) }; }

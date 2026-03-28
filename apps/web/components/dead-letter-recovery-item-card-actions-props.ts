"use client";
import { buildMediaIssueSettingsHref } from "../lib/record-panel-media";
import type { DeadLetterRecoveryItemCardActionsProps } from "./dead-letter-recovery-item-card-actions.types";
import type { BuildDeadLetterRecoveryItemCardActionsPropsInput } from "./dead-letter-recovery-item-card-actions-props.types";
export function buildDeadLetterRecoveryItemCardActionsProps(input: BuildDeadLetterRecoveryItemCardActionsPropsInput): DeadLetterRecoveryItemCardActionsProps { return { canWriteWorkspace: input.canWriteWorkspace, item: input.item, mediaIssueCopy: input.mediaIssueCopy, onRetryMediaProcessing: input.onRetryMediaProcessing, retryingMediaId: input.retryingMediaId, settingsHref: buildMediaIssueSettingsHref(input.workspaceId, input.item) }; }

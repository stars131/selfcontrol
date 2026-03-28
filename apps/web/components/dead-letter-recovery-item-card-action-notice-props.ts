"use client";
import { getMediaIssueAction } from "../lib/media-issue-display";
import type { DeadLetterRecoveryItemCardActionNoticeProps } from "./dead-letter-recovery-item-card-action-notice.types";
import type { BuildDeadLetterRecoveryItemCardActionNoticePropsInput } from "./dead-letter-recovery-item-card-action-notice-props.types";
export function buildDeadLetterRecoveryItemCardActionNoticeProps(props: BuildDeadLetterRecoveryItemCardActionNoticePropsInput): DeadLetterRecoveryItemCardActionNoticeProps { return { action: getMediaIssueAction(props.locale, props.item) }; }

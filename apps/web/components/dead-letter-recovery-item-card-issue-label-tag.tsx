"use client";
import { getMediaIssueLabel } from "../lib/media-issue-display";
import type { DeadLetterRecoveryItemCardIssueLabelTagProps } from "./dead-letter-recovery-item-card-issue-label-tag.types";
export function DeadLetterRecoveryItemCardIssueLabelTag({ item, locale }: DeadLetterRecoveryItemCardIssueLabelTagProps) { const issueLabel = getMediaIssueLabel(locale, item); return issueLabel ? <span className="tag">{issueLabel}</span> : null; }

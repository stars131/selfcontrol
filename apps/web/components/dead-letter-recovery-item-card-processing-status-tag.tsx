"use client";
import { getProcessingStatusLabel } from "../lib/media-issue-display";
import type { DeadLetterRecoveryItemCardProcessingStatusTagProps } from "./dead-letter-recovery-item-card-processing-status-tag.types";
export function DeadLetterRecoveryItemCardProcessingStatusTag({ item, locale }: DeadLetterRecoveryItemCardProcessingStatusTagProps) { return <span className="tag">{getProcessingStatusLabel(locale, item.processing_status)}</span>; }

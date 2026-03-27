"use client";
import { getRetryStateLabel } from "../lib/media-issue-display";
import type { DeadLetterRecoveryItemCardRetryStateTagProps } from "./dead-letter-recovery-item-card-retry-state-tag.types";
export function DeadLetterRecoveryItemCardRetryStateTag({ item, locale, mediaIssueCopy }: DeadLetterRecoveryItemCardRetryStateTagProps) { return item.processing_retry_state ? <span className="tag">{mediaIssueCopy.retryStatePrefix} {getRetryStateLabel(locale, item.processing_retry_state)}</span> : null; }

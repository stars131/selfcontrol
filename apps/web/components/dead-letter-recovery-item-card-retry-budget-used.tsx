"use client";
import type { DeadLetterRecoveryItemCardRetryBudgetUsedProps } from "./dead-letter-recovery-item-card-retry-budget-used.types";
export function DeadLetterRecoveryItemCardRetryBudgetUsed({ item, mediaIssueCopy }: DeadLetterRecoveryItemCardRetryBudgetUsedProps) { return typeof item.processing_retry_count === "number" ? <div className="muted" style={{ marginTop: 6 }}>{mediaIssueCopy.retryBudgetUsed}: {item.processing_retry_count}{typeof item.processing_retry_max_attempts === "number" ? ` / ${item.processing_retry_max_attempts}` : ""}</div> : null; }

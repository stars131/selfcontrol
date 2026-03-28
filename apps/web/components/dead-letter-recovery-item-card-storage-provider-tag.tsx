"use client";
import { getStorageProviderLabel } from "../lib/storage-provider-display";
import type { DeadLetterRecoveryItemCardStorageProviderTagProps } from "./dead-letter-recovery-item-card-storage-provider-tag.types";
export function DeadLetterRecoveryItemCardStorageProviderTag({ item, locale }: DeadLetterRecoveryItemCardStorageProviderTagProps) { return <span className="tag">{getStorageProviderLabel(locale, item.storage_provider)}</span>; }

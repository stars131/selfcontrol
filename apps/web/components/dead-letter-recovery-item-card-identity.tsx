"use client";

import { getMediaTypeLabel } from "../lib/media-type-display";
import type { DeadLetterRecoveryItemCardIdentityProps } from "./dead-letter-recovery-item-card-identity.types";

export function DeadLetterRecoveryItemCardIdentity({ item, locale }: DeadLetterRecoveryItemCardIdentityProps) {
  return (
    <div>
      <div className="eyebrow">{getMediaTypeLabel(locale, item.media_type)}</div>
      <div>{item.original_filename}</div>
    </div>
  );
}

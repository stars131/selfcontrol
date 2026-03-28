"use client";

import Link from "next/link";

import type { DeadLetterRecoveryItemCardSettingsLinkProps } from "./dead-letter-recovery-item-card-settings-link.types";

export function DeadLetterRecoveryItemCardSettingsLink({ mediaIssueCopy, settingsHref }: DeadLetterRecoveryItemCardSettingsLinkProps) {
  return settingsHref ? (
    <Link className="button secondary" href={settingsHref}>
      {mediaIssueCopy.openSettings}
    </Link>
  ) : null;
}

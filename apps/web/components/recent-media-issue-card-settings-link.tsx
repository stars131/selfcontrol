"use client";

import Link from "next/link";

import type { RecentMediaIssueCardSettingsLinkProps } from "./recent-media-issue-card-settings-link.types";

export function RecentMediaIssueCardSettingsLink({ mediaIssueCopy, settingsHref }: RecentMediaIssueCardSettingsLinkProps) {
  return settingsHref ? (
    <Link className="button secondary" href={settingsHref}>
      {mediaIssueCopy.openSettings}
    </Link>
  ) : null;
}

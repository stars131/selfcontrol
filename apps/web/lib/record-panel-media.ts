import type { MediaProcessingIssue } from "./types";

export function readMetadataText(metadata: Record<string, unknown>, key: string): string | null {
  const value = metadata[key];
  return typeof value === "string" && value.trim() ? value : null;
}

export function readMetadataNumber(metadata: Record<string, unknown>, key: string): number | null {
  const value = metadata[key];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

export function canRetryMediaIssue(issue: MediaProcessingIssue): boolean {
  return issue.can_bulk_retry === true;
}

function resolveMediaIssueSettingsAnchor(issue: MediaProcessingIssue): string | null {
  const actionCode = issue.recommended_action_code ?? "";
  const featureCode = issue.recommended_settings_feature_code ?? "";
  if (!featureCode) {
    return null;
  }

  if (
    actionCode === "check_remote_storage_health" ||
    (actionCode === "retry_after_remote_check" && featureCode === "media_storage")
  ) {
    return "provider-media_storage-health";
  }

  return `provider-${featureCode}`;
}

export function buildMediaIssueSettingsHref(
  workspaceId: string,
  issue: MediaProcessingIssue,
): string | null {
  const anchor = resolveMediaIssueSettingsAnchor(issue);
  if (!anchor) {
    return null;
  }

  return `/app/workspaces/${workspaceId}/settings#${anchor}`;
}

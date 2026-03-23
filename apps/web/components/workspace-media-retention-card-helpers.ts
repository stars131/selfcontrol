import type { LocaleCode } from "../lib/locale";

import { getWorkspaceMediaRetentionCopy } from "./workspace-media-retention-copy";
import type { WorkspaceMediaRetentionCopy } from "./workspace-media-retention-copy";
import type { MediaRetentionActionResult } from "./workspace-media-retention-controller.types";

export function buildWorkspaceMediaRetentionCopyBundle(locale: LocaleCode): {
  copy: WorkspaceMediaRetentionCopy;
  remoteMediaLabel: string;
  remoteReferenceLabel: string;
} {
  const copy = getWorkspaceMediaRetentionCopy(locale);

  return {
    copy,
    remoteMediaLabel: copy.remoteMedia ?? "Remote media",
    remoteReferenceLabel: copy.remoteReference ?? "Remote reference",
  };
}

export function buildWorkspaceMediaRetentionControllerInput({
  actionFailedMessage,
  allHealthyLabel,
  loadFailedMessage,
  missingFilesLabel,
  orphanFilesLabel,
  remoteMediaLabel,
  token,
  workspaceId,
}: {
  actionFailedMessage: string;
  allHealthyLabel: string;
  loadFailedMessage: string;
  missingFilesLabel: string;
  orphanFilesLabel: string;
  remoteMediaLabel: string;
  token: string;
  workspaceId: string;
}) {
  return {
    token,
    workspaceId,
    remoteMediaLabel,
    missingFilesLabel,
    orphanFilesLabel,
    allHealthyLabel,
    loadFailedMessage,
    actionFailedMessage,
  };
}

export function buildWorkspaceMediaRetentionActionMessage({
  actionResult,
  archiveCompleted,
  cleanupCompleted,
}: {
  actionResult: MediaRetentionActionResult | null;
  archiveCompleted: string;
  cleanupCompleted: string;
}) {
  if (actionResult?.kind === "archive") {
    return `${archiveCompleted}: ${actionResult.result.candidate_media_count} / ${actionResult.result.candidate_media_size_label}`;
  }

  if (actionResult?.kind === "cleanup") {
    return `${cleanupCompleted}: ${actionResult.result.candidate_media_count} / ${actionResult.result.candidate_media_size_label}, ${actionResult.result.orphan_file_count} / ${actionResult.result.orphan_file_size_label}`;
  }

  return "";
}

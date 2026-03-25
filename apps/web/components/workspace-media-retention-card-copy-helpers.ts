import type { LocaleCode } from "../lib/locale";

import { getWorkspaceMediaRetentionCopy } from "./workspace-media-retention-copy";
import type { WorkspaceMediaRetentionCopy } from "./workspace-media-retention-copy";
import type { BuildWorkspaceMediaRetentionControllerInputArgs } from "./workspace-media-retention-card-copy-helpers.types";

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
}: BuildWorkspaceMediaRetentionControllerInputArgs) {
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

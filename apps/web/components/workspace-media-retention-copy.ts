import type { LocaleCode } from "../lib/locale";

import { WORKSPACE_MEDIA_RETENTION_COPY } from "./workspace-media-retention-copy.payload";
import type { WorkspaceMediaRetentionCopy } from "./workspace-media-retention-copy.types";

export type { WorkspaceMediaRetentionCopy } from "./workspace-media-retention-copy.types";

export function getWorkspaceMediaRetentionCopy(
  locale: LocaleCode,
): WorkspaceMediaRetentionCopy {
  return WORKSPACE_MEDIA_RETENTION_COPY[locale];
}

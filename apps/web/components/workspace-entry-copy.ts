import type { LocaleCode } from "../lib/locale";

import {
  WORKSPACE_ENTRY_COPY,
  WORKSPACE_ENTRY_DISPLAY_COPY,
} from "./workspace-entry-copy.payload";
import type { WorkspaceEntryCopy } from "./workspace-entry-copy.types";

export type { WorkspaceEntryCopy } from "./workspace-entry-copy.types";

export function getWorkspaceEntryCopy(locale: LocaleCode): WorkspaceEntryCopy {
  return { ...WORKSPACE_ENTRY_COPY[locale], ...WORKSPACE_ENTRY_DISPLAY_COPY[locale] };
}

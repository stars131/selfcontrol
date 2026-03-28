"use client";

import { useRouter } from "next/navigation";
import { useStoredLocale } from "../lib/locale";
import {
  buildWorkspaceEntryClientViewProps,
} from "./workspace-entry-client-helpers";
import type { WorkspaceEntryClientProps } from "./workspace-entry-client.types";
import { getWorkspaceEntryCopy } from "./workspace-entry-copy";
import { useWorkspaceEntryController } from "./use-workspace-entry-controller";
import { WorkspaceEntryLoadingShell } from "./workspace-entry-loading-shell";
import { WorkspaceEntryMainPanel } from "./workspace-entry-main-panel";

export function WorkspaceEntryClient(_: WorkspaceEntryClientProps) {
  const router = useRouter();
  const { locale, setLocale } = useStoredLocale();
  const copy = getWorkspaceEntryCopy(locale);
  const controller = useWorkspaceEntryController(router);
  const view = buildWorkspaceEntryClientViewProps({
    copy,
    locale,
    onLocaleChange: setLocale,
    controller,
  });

  if (view.showLoadingShell) {
    return <WorkspaceEntryLoadingShell {...view.loadingShellProps} />;
  }

  return <WorkspaceEntryMainPanel {...view.mainPanelProps} />;
}

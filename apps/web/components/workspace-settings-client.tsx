"use client";

import { useRouter } from "next/navigation";
import { useStoredLocale } from "../lib/locale";
import type { WorkspaceSettingsClientProps } from "./workspace-settings-client.types";
import { useWorkspaceSettingsController } from "./use-workspace-settings-controller";
import { getWorkspaceSettingsCopy } from "./workspace-settings-copy";
import { buildWorkspaceSettingsClientViewProps } from "./workspace-settings-client-view";
import { WorkspaceSettingsHeader } from "./workspace-settings-header";
import { WorkspaceSettingsLoadingShell } from "./workspace-settings-loading-shell";
import { WorkspaceSettingsMainContent } from "./workspace-settings-main-content";

export function WorkspaceSettingsClient({ workspaceId }: WorkspaceSettingsClientProps) {
  const router = useRouter();
  const { locale, setLocale } = useStoredLocale();
  const copy = getWorkspaceSettingsCopy(locale);
  const controller = useWorkspaceSettingsController(router, workspaceId);
  const view = buildWorkspaceSettingsClientViewProps({
    copy,
    controller,
    locale,
    onLocaleChange: setLocale,
    workspaceId,
  });

  if (view.showLoadingShell) {
    return <WorkspaceSettingsLoadingShell {...view.loadingShellProps} />;
  }

  return (
    <main className="page-shell">
      <section className="panel" style={{ maxWidth: 1080, margin: "0 auto" }}>
        <WorkspaceSettingsHeader {...view.headerProps} />
        <WorkspaceSettingsMainContent {...view.mainContentProps} />
      </section>
    </main>
  );
}

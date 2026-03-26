"use client";

import { useRouter } from "next/navigation";
import { useStoredLocale } from "../lib/locale";
import {
  buildWorkspaceSettingsManagedSectionsProps,
  buildWorkspaceSettingsProviderSectionProps,
  readWorkspaceSettingsManagedRole,
} from "./workspace-settings-client-helpers";
import type { WorkspaceSettingsClientProps } from "./workspace-settings-client.types";
import { useWorkspaceSettingsController } from "./use-workspace-settings-controller";
import { getWorkspaceSettingsCopy } from "./workspace-settings-copy";
import { WorkspaceSettingsHeader } from "./workspace-settings-header";
import { WorkspaceSettingsLoadingShell } from "./workspace-settings-loading-shell";
import { WorkspaceSettingsMainContent } from "./workspace-settings-main-content";

export function WorkspaceSettingsClient({ workspaceId }: WorkspaceSettingsClientProps) {
  const router = useRouter();
  const { locale, setLocale } = useStoredLocale();
  const copy = getWorkspaceSettingsCopy(locale);
  const {
    token,
    user,
    workspace,
    providerConfigs,
    mediaStorageHealth,
    knowledgeStats,
    members,
    savingMemberId,
    removingMemberId,
    refreshingMediaStorageHealth,
    highlightedAnchor,
    loading,
    error,
    refreshMediaStorageHealthState,
    handleSaveProviderConfig,
    handleUpdateMemberRole,
    handleRemoveMember,
  } = useWorkspaceSettingsController(router, workspaceId);
  const managedRole = readWorkspaceSettingsManagedRole(workspace);

  if (loading) {
    return <WorkspaceSettingsLoadingShell loadingLabel={copy.loading} />;
  }

  return (
    <main className="page-shell">
      <section className="panel" style={{ maxWidth: 1080, margin: "0 auto" }}>
        <WorkspaceSettingsHeader copy={copy} locale={locale} onLocaleChange={setLocale} username={user?.username} workspace={workspace} workspaceId={workspaceId} />
        <WorkspaceSettingsMainContent
          copy={copy}
          error={error}
          knowledgeStats={knowledgeStats}
          managedSectionsProps={buildWorkspaceSettingsManagedSectionsProps({
            copy,
            locale,
            managedRole,
            members,
            onRemoveMember: handleRemoveMember,
            onUpdateMemberRole: handleUpdateMemberRole,
            removingMemberId,
            savingMemberId,
            token,
            userId: user?.id,
            workspaceId,
            workspaceSlug: workspace?.slug,
          })}
          providerSectionProps={buildWorkspaceSettingsProviderSectionProps({
            copy,
            highlightedAnchor,
            locale,
            managedRole,
            mediaStorageHealth,
            onSaveProviderConfig: handleSaveProviderConfig,
            providerConfigs,
            refreshingMediaStorageHealth,
            refreshMediaStorageHealthState,
            token,
          })}
        />
      </section>
    </main>
  );
}

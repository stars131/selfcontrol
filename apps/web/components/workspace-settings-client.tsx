"use client";

import { useRouter } from "next/navigation";
import { useStoredLocale } from "../lib/locale";
import { useWorkspaceSettingsController } from "./use-workspace-settings-controller";
import { getWorkspaceSettingsCopy } from "./workspace-settings-copy";
import { WorkspaceSettingsHeader } from "./workspace-settings-header";
import { WorkspaceSettingsManagedSections } from "./workspace-settings-managed-sections";
import { WorkspaceSettingsOverviewCard } from "./workspace-settings-overview-card";
import { WorkspaceSettingsProviderSection } from "./workspace-settings-provider-section";

export function WorkspaceSettingsClient({ workspaceId }: { workspaceId: string }) {
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
  const managedRole = workspace && workspace.role !== "viewer" ? workspace.role : null;

  if (loading) {
    return (
      <main className="page-shell">
        <section className="panel auth-panel">
          <div className="panel-body">
            <div className="notice">{copy.loading}</div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="panel" style={{ maxWidth: 1080, margin: "0 auto" }}>
        <WorkspaceSettingsHeader
          copy={copy}
          locale={locale}
          onLocaleChange={setLocale}
          username={user?.username}
          workspace={workspace}
          workspaceId={workspaceId}
        />
        <div className="panel-body">
          {error ? (
            <div className="notice error" style={{ marginBottom: 16 }}>
              {error}
            </div>
          ) : null}
          <div className="two-column-grid">
            <WorkspaceSettingsOverviewCard copy={copy} knowledgeStats={knowledgeStats} />
            <WorkspaceSettingsProviderSection
              highlightedAnchor={highlightedAnchor}
              locale={locale}
              managedRole={managedRole}
              mediaStorageHealth={mediaStorageHealth}
              onRefreshMediaStorageHealth={
                token ? async () => refreshMediaStorageHealthState(token) : null
              }
              onSaveProviderConfig={handleSaveProviderConfig}
              providerConfigs={providerConfigs}
              refreshingMediaStorageHealth={refreshingMediaStorageHealth}
              providerTitle={copy.providerTitle}
              viewerNotice={copy.viewerNotice}
            />
          </div>
          <WorkspaceSettingsManagedSections
            copy={copy}
            locale={locale}
            managedRole={managedRole}
            members={members}
            onRemoveMember={handleRemoveMember}
            onUpdateMemberRole={handleUpdateMemberRole}
            removingMemberId={removingMemberId}
            savingMemberId={savingMemberId}
            token={token}
            userId={user?.id}
            workspaceId={workspaceId}
            workspaceSlug={workspace?.slug}
          />
        </div>
      </section>
    </main>
  );
}

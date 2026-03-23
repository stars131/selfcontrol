"use client";

import { useRouter } from "next/navigation";
import { useStoredLocale } from "../lib/locale";
import { ProviderSettingsPanel } from "./provider-settings-panel";
import { useWorkspaceSettingsController } from "./use-workspace-settings-controller";
import { WorkspaceMembersSection } from "./workspace-members-section";
import { getWorkspaceSettingsCopy } from "./workspace-settings-copy";
import { WorkspaceExportCard } from "./workspace-export-card";
import { WorkspaceExportJobsCard } from "./workspace-export-jobs-card";
import { WorkspaceSettingsHeader } from "./workspace-settings-header";
import { WorkspaceSettingsOverviewCard } from "./workspace-settings-overview-card";
import { WorkspaceMediaRetentionCard } from "./workspace-media-retention-card";

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
            {managedRole ? (
              <ProviderSettingsPanel
                locale={locale}
                highlightedAnchor={highlightedAnchor}
                mediaStorageHealth={mediaStorageHealth}
                onRefreshMediaStorageHealth={
                  token ? async () => refreshMediaStorageHealthState(token) : null
                }
                onSaveProviderConfig={handleSaveProviderConfig}
                providerConfigs={providerConfigs}
                refreshingMediaStorageHealth={refreshingMediaStorageHealth}
              />
            ) : (
              <section className="record-card">
                <div className="eyebrow">{copy.providerTitle}</div>
                <div className="notice" style={{ marginTop: 12 }}>
                  {copy.viewerNotice}
                </div>
              </section>
            )}
          </div>
          {managedRole ? (
            token ? (
              <WorkspaceMediaRetentionCard
                locale={locale}
                role={managedRole}
                token={token}
                workspaceId={workspaceId}
              />
            ) : null
          ) : null}
          {managedRole ? (
            token ? (
              <WorkspaceExportCard
                locale={locale}
                role={managedRole}
                token={token}
                workspaceId={workspaceId}
                workspaceSlug={workspace?.slug}
              />
            ) : null
          ) : null}
          {managedRole ? (
            token ? (
              <WorkspaceExportJobsCard
                locale={locale}
                role={managedRole}
                token={token}
                workspaceId={workspaceId}
              />
            ) : null
          ) : null}
          {managedRole ? (
            <WorkspaceMembersSection
              copy={copy}
              locale={locale}
              members={members}
              onRemoveMember={handleRemoveMember}
              onUpdateMemberRole={handleUpdateMemberRole}
              removingMemberId={removingMemberId}
              savingMemberId={savingMemberId}
              userId={user?.id}
              workspaceRole={managedRole}
            />
          ) : null}
        </div>
      </section>
    </main>
  );
}

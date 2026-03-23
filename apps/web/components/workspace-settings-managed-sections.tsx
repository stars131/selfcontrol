"use client";

import { WorkspaceExportCard } from "./workspace-export-card";
import { WorkspaceExportJobsCard } from "./workspace-export-jobs-card";
import { WorkspaceMediaRetentionCard } from "./workspace-media-retention-card";
import { WorkspaceMembersSection } from "./workspace-members-section";
import type { WorkspaceSettingsManagedSectionsProps } from "./workspace-settings-managed-sections.types";

export function WorkspaceSettingsManagedSections({
  copy,
  locale,
  managedRole,
  members,
  onRemoveMember,
  onUpdateMemberRole,
  removingMemberId,
  savingMemberId,
  token,
  userId,
  workspaceId,
  workspaceSlug,
}: WorkspaceSettingsManagedSectionsProps) {
  return (
    <>
      {managedRole && token ? (
        <>
          <WorkspaceMediaRetentionCard
            locale={locale}
            role={managedRole}
            token={token}
            workspaceId={workspaceId}
          />
          <WorkspaceExportCard
            locale={locale}
            role={managedRole}
            token={token}
            workspaceId={workspaceId}
            workspaceSlug={workspaceSlug}
          />
          <WorkspaceExportJobsCard
            locale={locale}
            role={managedRole}
            token={token}
            workspaceId={workspaceId}
          />
        </>
      ) : null}
      {managedRole ? (
        <WorkspaceMembersSection
          copy={copy}
          locale={locale}
          members={members}
          onRemoveMember={onRemoveMember}
          onUpdateMemberRole={onUpdateMemberRole}
          removingMemberId={removingMemberId}
          savingMemberId={savingMemberId}
          userId={userId}
          workspaceRole={managedRole}
        />
      ) : null}
    </>
  );
}

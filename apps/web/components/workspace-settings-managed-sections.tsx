"use client";

import { WorkspaceMembersSection } from "./workspace-members-section";
import { WorkspaceSettingsManagedTools } from "./workspace-settings-managed-tools";
import type { WorkspaceSettingsManagedSectionsProps } from "./workspace-settings-managed-sections.types";

export function WorkspaceSettingsManagedSections({ copy, locale, managedRole, members, onRemoveMember, onUpdateMemberRole, removingMemberId, savingMemberId, token, userId, workspaceId, workspaceSlug }: WorkspaceSettingsManagedSectionsProps) {
  return (
    <>
      {managedRole && token ? (
        <WorkspaceSettingsManagedTools locale={locale} managedRole={managedRole} token={token} workspaceId={workspaceId} workspaceSlug={workspaceSlug} />
      ) : null}
      {managedRole ? (
        <WorkspaceMembersSection copy={copy} locale={locale} members={members} onRemoveMember={onRemoveMember} onUpdateMemberRole={onUpdateMemberRole} removingMemberId={removingMemberId} savingMemberId={savingMemberId} userId={userId} workspaceRole={managedRole} />
      ) : null}
    </>
  );
}

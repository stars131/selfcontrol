"use client";
import { WorkspaceMembersSectionIntro } from "./workspace-members-section-intro";
import { WorkspaceMembersSectionList } from "./workspace-members-section-list";
import type { WorkspaceMembersSectionProps } from "./workspace-members-section.types";

export function WorkspaceMembersSection({ copy, locale, members, onRemoveMember, onUpdateMemberRole, removingMemberId, savingMemberId, userId, workspaceRole }: WorkspaceMembersSectionProps) {
  return (
    <section className="record-card" style={{ marginTop: 24 }}>
      <WorkspaceMembersSectionIntro copy={copy} workspaceRole={workspaceRole} />
      <WorkspaceMembersSectionList copy={copy} locale={locale} members={members} onRemoveMember={onRemoveMember} onUpdateMemberRole={onUpdateMemberRole} removingMemberId={removingMemberId} savingMemberId={savingMemberId} userId={userId} workspaceRole={workspaceRole} />
    </section>
  );
}

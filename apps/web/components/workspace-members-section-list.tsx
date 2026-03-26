"use client";
import { WorkspaceMembersSectionItem } from "./workspace-members-section-item";
import type { WorkspaceMembersSectionListProps } from "./workspace-members-section-list.types";

export function WorkspaceMembersSectionList({
  copy,
  locale,
  members,
  onRemoveMember,
  onUpdateMemberRole,
  removingMemberId,
  savingMemberId,
  userId,
  workspaceRole,
}: WorkspaceMembersSectionListProps) {
  return (
    <div className="record-list compact-list" style={{ marginTop: 16 }}>
      {members.length ? members.map((member) => (
        <WorkspaceMembersSectionItem copy={copy} key={member.id} locale={locale} member={member} onRemoveMember={onRemoveMember} onUpdateMemberRole={onUpdateMemberRole} removingMemberId={removingMemberId} savingMemberId={savingMemberId} userId={userId} workspaceRole={workspaceRole} />
      )) : <div className="notice">{copy.membersEmpty}</div>}
    </div>
  );
}

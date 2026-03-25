"use client";

import { WorkspaceMembersSectionItem } from "./workspace-members-section-item";
import type { WorkspaceMembersSectionProps } from "./workspace-members-section.types";

export function WorkspaceMembersSection({
  copy,
  locale,
  members,
  onRemoveMember,
  onUpdateMemberRole,
  removingMemberId,
  savingMemberId,
  userId,
  workspaceRole,
}: WorkspaceMembersSectionProps) {
  return (
    <section className="record-card" style={{ marginTop: 24 }}>
      <div className="eyebrow">{copy.membersTitle}</div>
      <div className="muted" style={{ marginTop: 8, lineHeight: 1.7 }}>
        {workspaceRole === "owner" ? copy.membersDescription : copy.membersReadOnly}
      </div>
      <div className="record-list compact-list" style={{ marginTop: 16 }}>
        {members.length ? (
          members.map((member) => (
            <WorkspaceMembersSectionItem
              copy={copy}
              key={member.id}
              locale={locale}
              member={member}
              onRemoveMember={onRemoveMember}
              onUpdateMemberRole={onUpdateMemberRole}
              removingMemberId={removingMemberId}
              savingMemberId={savingMemberId}
              userId={userId}
              workspaceRole={workspaceRole}
            />
          ))
        ) : (
          <div className="notice">{copy.membersEmpty}</div>
        )}
      </div>
    </section>
  );
}

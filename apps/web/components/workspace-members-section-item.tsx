"use client";

import { WorkspaceMembersSectionItemControls } from "./workspace-members-section-item-controls";
import { WorkspaceMembersSectionItemSummary } from "./workspace-members-section-item-summary";
import type { WorkspaceMembersSectionItemProps } from "./workspace-members-section-item.types";

export function WorkspaceMembersSectionItem({ copy, locale, member, onRemoveMember, onUpdateMemberRole, removingMemberId, savingMemberId, userId, workspaceRole }: WorkspaceMembersSectionItemProps) {
  const isProtected = member.role === "owner" || member.user_id === userId;

  return (
    <article className="message">
      <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
        <WorkspaceMembersSectionItemSummary copy={copy} locale={locale} member={member} />
        <WorkspaceMembersSectionItemControls copy={copy} isProtected={isProtected} member={member} onRemoveMember={onRemoveMember} onUpdateMemberRole={onUpdateMemberRole} removingMemberId={removingMemberId} savingMemberId={savingMemberId} workspaceRole={workspaceRole} />
      </div>
    </article>
  );
}

"use client";
import type { WorkspaceMembersSectionIntroProps } from "./workspace-members-section-intro.types";

export function WorkspaceMembersSectionIntro({ copy, workspaceRole }: WorkspaceMembersSectionIntroProps) {
  return (
    <>
      <div className="eyebrow">{copy.membersTitle}</div>
      <div className="muted" style={{ marginTop: 8, lineHeight: 1.7 }}>
        {workspaceRole === "owner" ? copy.membersDescription : copy.membersReadOnly}
      </div>
    </>
  );
}

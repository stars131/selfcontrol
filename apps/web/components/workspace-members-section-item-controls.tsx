"use client";
import type { WorkspaceMembersSectionItemControlsProps } from "./workspace-members-section-item-controls.types";

export function WorkspaceMembersSectionItemControls({ copy, isProtected, member, onRemoveMember, onUpdateMemberRole, removingMemberId, savingMemberId, workspaceRole }: WorkspaceMembersSectionItemControlsProps) {
  return (
    <div style={{ minWidth: 220 }}>
      <div className="eyebrow">{copy.roleLabel}</div>
      {workspaceRole === "owner" && !isProtected ? (
        <div className="form-stack" style={{ marginTop: 8 }}>
          <select
            className="input"
            disabled={savingMemberId === member.id}
            value={member.role}
            onChange={(event) => void onUpdateMemberRole(member.id, event.target.value as "viewer" | "editor")}
          >
            <option value="editor">editor</option>
            <option value="viewer">viewer</option>
          </select>
          <button
            className="button secondary"
            disabled={removingMemberId === member.id}
            type="button"
            onClick={() => void onRemoveMember(member.id)}
          >
            {removingMemberId === member.id ? copy.removingLabel : copy.removeLabel}
          </button>
        </div>
      ) : (
        <div className="form-stack" style={{ marginTop: 8 }}>
          <div style={{ fontWeight: 600 }}>{member.role}</div>
          {isProtected ? <div className="muted">{copy.ownerProtected}</div> : null}
        </div>
      )}
    </div>
  );
}

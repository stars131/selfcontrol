"use client";

import type { LocaleCode } from "../lib/locale";
import type { WorkspaceMemberItem } from "../lib/types";
import type { WorkspaceSettingsCopy } from "./workspace-settings-copy";

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
}: {
  copy: WorkspaceSettingsCopy;
  locale: LocaleCode;
  members: WorkspaceMemberItem[];
  onRemoveMember: (memberId: string) => Promise<void>;
  onUpdateMemberRole: (memberId: string, role: "viewer" | "editor") => Promise<void>;
  removingMemberId: string;
  savingMemberId: string;
  userId?: string;
  workspaceRole: "owner" | "editor";
}) {
  return (
    <section className="record-card" style={{ marginTop: 24 }}>
      <div className="eyebrow">{copy.membersTitle}</div>
      <div className="muted" style={{ marginTop: 8, lineHeight: 1.7 }}>
        {workspaceRole === "owner" ? copy.membersDescription : copy.membersReadOnly}
      </div>
      <div className="record-list compact-list" style={{ marginTop: 16 }}>
        {members.length ? (
          members.map((member) => {
            const isProtected = member.role === "owner" || member.user_id === userId;
            return (
              <article className="message" key={member.id}>
                <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div className="eyebrow">{member.username}</div>
                    <div style={{ marginTop: 8, fontWeight: 600 }}>
                      {member.display_name || member.email || member.user_id}
                    </div>
                    <div className="muted" style={{ marginTop: 8 }}>
                      {copy.joinedLabel} {new Date(member.created_at).toLocaleString(locale)}
                    </div>
                  </div>
                  <div style={{ minWidth: 220 }}>
                    <div className="eyebrow">{copy.roleLabel}</div>
                    {workspaceRole === "owner" && !isProtected ? (
                      <div className="form-stack" style={{ marginTop: 8 }}>
                        <select
                          className="input"
                          disabled={savingMemberId === member.id}
                          value={member.role}
                          onChange={(event) =>
                            void onUpdateMemberRole(member.id, event.target.value as "viewer" | "editor")
                          }
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
                </div>
              </article>
            );
          })
        ) : (
          <div className="notice">{copy.membersEmpty}</div>
        )}
      </div>
    </section>
  );
}

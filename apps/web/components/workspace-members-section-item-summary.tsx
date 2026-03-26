"use client";
import type { WorkspaceMembersSectionItemSummaryProps } from "./workspace-members-section-item-summary.types";

export function WorkspaceMembersSectionItemSummary({ copy, locale, member }: WorkspaceMembersSectionItemSummaryProps) {
  return (
    <div>
      <div className="eyebrow">{member.username}</div>
      <div style={{ marginTop: 8, fontWeight: 600 }}>{member.display_name || member.email || member.user_id}</div>
      <div className="muted" style={{ marginTop: 8 }}>
        {copy.joinedLabel} {new Date(member.created_at).toLocaleString(locale)}
      </div>
    </div>
  );
}

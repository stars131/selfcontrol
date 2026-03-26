"use client";
import { MediaRetentionItemCard } from "./media-retention-item-card";
import type { WorkspaceMediaRetentionCandidatesListProps } from "./workspace-media-retention-candidates-list.types";

export function WorkspaceMediaRetentionCandidatesList({ actionLoading, copy, locale, onToggleSelected, report, role, selectedMediaIds }: WorkspaceMediaRetentionCandidatesListProps) {
  return (
    <section className="subtle-card">
      <div className="eyebrow">{copy.candidatesTitle}</div>
      <div className="record-list compact-list" style={{ marginTop: 12 }}>
        {report?.retention_candidates.length ? report.retention_candidates.map((item) => (
          <MediaRetentionItemCard actionLoading={actionLoading} copy={copy} item={item} key={item.media_id} locale={locale} onToggleSelected={onToggleSelected} selectable={role === "owner"} selected={selectedMediaIds.includes(item.media_id)} />
        )) : <div className="notice">{copy.noCandidates}</div>}
      </div>
    </section>
  );
}

"use client";

import { MediaRetentionItemCard } from "./media-retention-item-card";
import type { WorkspaceMediaRetentionListsProps } from "./workspace-media-retention-lists.types";

export function WorkspaceMediaRetentionLists({
  actionLoading,
  copy,
  locale,
  onToggleSelected,
  report,
  role,
  selectedMediaIds,
}: WorkspaceMediaRetentionListsProps) {
  return (
    <div className="two-column-grid" style={{ marginTop: 16 }}>
      <section className="subtle-card">
        <div className="eyebrow">{copy.largestTitle}</div>
        <div className="record-list compact-list" style={{ marginTop: 12 }}>
          {report?.largest_items.length
            ? report.largest_items.map((item) => (
              <MediaRetentionItemCard copy={copy} item={item} key={item.media_id} locale={locale} />
            ))
            : <div className="notice">{copy.noLargestItems}</div>}
        </div>
      </section>
      <section className="subtle-card">
        <div className="eyebrow">{copy.candidatesTitle}</div>
        <div className="record-list compact-list" style={{ marginTop: 12 }}>
          {report?.retention_candidates.length ? (
            report.retention_candidates.map((item) => (
              <MediaRetentionItemCard
                actionLoading={actionLoading}
                copy={copy}
                item={item}
                key={item.media_id}
                locale={locale}
                onToggleSelected={onToggleSelected}
                selectable={role === "owner"}
                selected={selectedMediaIds.includes(item.media_id)}
              />
            ))
          ) : (
            <div className="notice">{copy.noCandidates}</div>
          )}
        </div>
      </section>
    </div>
  );
}

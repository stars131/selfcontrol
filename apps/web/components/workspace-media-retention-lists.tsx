"use client";

import type { LocaleCode } from "../lib/locale";
import type { MediaRetentionReport } from "../lib/types";
import { MediaRetentionItemCard } from "./media-retention-item-card";

type WorkspaceMediaRetentionListsCopy = {
  largestTitle: string;
  noLargestItems: string;
  candidatesTitle: string;
  noCandidates: string;
  selectLabel: string;
  createdAt: string;
  ageDays: string;
  days: string;
  missing: string;
  archived: string;
  primary: string;
  remoteReference?: string;
};

export function WorkspaceMediaRetentionLists({
  actionLoading,
  copy,
  locale,
  onToggleSelected,
  report,
  role,
  selectedMediaIds,
}: {
  actionLoading: boolean;
  copy: WorkspaceMediaRetentionListsCopy;
  locale: LocaleCode;
  onToggleSelected: (mediaId: string) => void;
  report: MediaRetentionReport | null;
  role: "owner" | "editor";
  selectedMediaIds: string[];
}) {
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

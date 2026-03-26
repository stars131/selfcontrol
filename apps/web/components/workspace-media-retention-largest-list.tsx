"use client";
import { MediaRetentionItemCard } from "./media-retention-item-card";
import type { WorkspaceMediaRetentionLargestListProps } from "./workspace-media-retention-largest-list.types";

export function WorkspaceMediaRetentionLargestList({ copy, locale, report }: WorkspaceMediaRetentionLargestListProps) {
  return (
    <section className="subtle-card">
      <div className="eyebrow">{copy.largestTitle}</div>
      <div className="record-list compact-list" style={{ marginTop: 12 }}>{report?.largest_items.length ? report.largest_items.map((item) => <MediaRetentionItemCard copy={copy} item={item} key={item.media_id} locale={locale} />) : <div className="notice">{copy.noLargestItems}</div>}</div>
    </section>
  );
}

"use client";
import type { WorkspaceMediaRetentionSummaryGridProps } from "./workspace-media-retention-summary-grid.types";

export function WorkspaceMediaRetentionSummaryGrid({ copy, remoteMediaLabel, report, storageRiskLabel }: WorkspaceMediaRetentionSummaryGridProps) {
  return (
    <div className="detail-grid" style={{ marginTop: 16 }}>
      <div className="subtle-card"><div className="eyebrow">{copy.totalTracked}</div><div style={{ marginTop: 8, fontWeight: 600 }}>{report ? `${report.total_count} / ${report.total_size_label}` : "-"}</div>{report?.oldest_media_age_days != null ? <div className="muted" style={{ marginTop: 8 }}>{copy.oldestMedia} {report.oldest_media_age_days} {copy.days}</div> : null}</div>
      <div className="subtle-card"><div className="eyebrow">{copy.agedMedia}</div><div style={{ marginTop: 8, fontWeight: 600 }}>{report ? `${report.old_item_count} / ${report.old_item_size_label}` : "-"}</div></div>
      <div className="subtle-card"><div className="eyebrow">{copy.archivedMedia}</div><div style={{ marginTop: 8, fontWeight: 600 }}>{report ? `${report.archived_item_count} / ${report.archived_item_size_label}` : "-"}</div></div>
      <div className="subtle-card"><div className="eyebrow">{remoteMediaLabel}</div><div style={{ marginTop: 8, fontWeight: 600 }}>{report ? `${report.remote_item_count} / ${report.remote_item_size_label}` : "-"}</div></div>
      <div className="subtle-card"><div className="eyebrow">{copy.storageRisk}</div><div style={{ marginTop: 8, fontWeight: 600 }}>{storageRiskLabel}</div></div>
    </div>
  );
}

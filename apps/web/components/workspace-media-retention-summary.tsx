"use client";

import type { MediaRetentionReport } from "../lib/types";

type WorkspaceMediaRetentionSummaryCopy = {
  agedMedia: string;
  archivedMedia: string;
  cleanupNote: string;
  oldestMedia: string;
  orphanFiles: string;
  storageRisk: string;
  totalTracked: string;
  days: string;
};

export function WorkspaceMediaRetentionSummary({
  copy,
  remoteMediaLabel,
  report,
  storageRiskLabel,
}: {
  copy: WorkspaceMediaRetentionSummaryCopy;
  remoteMediaLabel: string;
  report: MediaRetentionReport | null;
  storageRiskLabel: string;
}) {
  return (
    <>
      <div className="detail-grid" style={{ marginTop: 16 }}>
        <div className="subtle-card">
          <div className="eyebrow">{copy.totalTracked}</div>
          <div style={{ marginTop: 8, fontWeight: 600 }}>
            {report ? `${report.total_count} / ${report.total_size_label}` : "-"}
          </div>
          {report?.oldest_media_age_days != null ? (
            <div className="muted" style={{ marginTop: 8 }}>
              {copy.oldestMedia} {report.oldest_media_age_days} {copy.days}
            </div>
          ) : null}
        </div>
        <div className="subtle-card">
          <div className="eyebrow">{copy.agedMedia}</div>
          <div style={{ marginTop: 8, fontWeight: 600 }}>
            {report ? `${report.old_item_count} / ${report.old_item_size_label}` : "-"}
          </div>
        </div>
        <div className="subtle-card">
          <div className="eyebrow">{copy.archivedMedia}</div>
          <div style={{ marginTop: 8, fontWeight: 600 }}>
            {report ? `${report.archived_item_count} / ${report.archived_item_size_label}` : "-"}
          </div>
        </div>
        <div className="subtle-card">
          <div className="eyebrow">{remoteMediaLabel}</div>
          <div style={{ marginTop: 8, fontWeight: 600 }}>
            {report ? `${report.remote_item_count} / ${report.remote_item_size_label}` : "-"}
          </div>
        </div>
        <div className="subtle-card">
          <div className="eyebrow">{copy.storageRisk}</div>
          <div style={{ marginTop: 8, fontWeight: 600 }}>{storageRiskLabel}</div>
        </div>
      </div>

      <div className="muted" style={{ marginTop: 16 }}>
        {report
          ? `${copy.orphanFiles}: ${report.orphan_file_count} / ${report.orphan_file_size_label}. ${copy.cleanupNote}`
          : copy.cleanupNote}
      </div>
    </>
  );
}

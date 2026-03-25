"use client";

import type { WorkspaceExportJobsHeaderProps } from "./workspace-export-jobs-header.types";

export function WorkspaceExportJobsHeader({
  actionLoading,
  copy,
  loading,
  onCreateJob,
  onLoadJobs,
  role,
}: WorkspaceExportJobsHeaderProps) {
  return (
    <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
      <div>
        <div className="eyebrow">{copy.eyebrow}</div>
        <div style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 8 }}>{copy.title}</div>
        <div className="muted" style={{ marginTop: 8, lineHeight: 1.7 }}>{copy.description}</div>
      </div>
      <div className="action-row">
        <button className="button secondary" disabled={loading || actionLoading} type="button" onClick={onLoadJobs}>
          {loading ? copy.loading : copy.refresh}
        </button>
        {role === "owner" ? (
          <button className="button secondary" disabled={actionLoading} type="button" onClick={onCreateJob}>
            {actionLoading ? copy.loading : copy.queue}
          </button>
        ) : null}
      </div>
    </div>
  );
}

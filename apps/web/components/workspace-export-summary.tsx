"use client";

import type { WorkspaceExportSummaryProps } from "./workspace-export-summary.types";

export function WorkspaceExportSummary({ copy }: WorkspaceExportSummaryProps) {
  return (
    <>
      <div className="eyebrow">{copy.eyebrow}</div>
      <div style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 8 }}>{copy.title}</div>
      <div className="muted" style={{ marginTop: 8, lineHeight: 1.7 }}>{copy.description}</div>
      <div className="muted" style={{ marginTop: 8 }}>{copy.note}</div>
    </>
  );
}

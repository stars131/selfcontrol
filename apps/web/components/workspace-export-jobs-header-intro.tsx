"use client";

import type { WorkspaceExportJobsHeaderIntroProps } from "./workspace-export-jobs-header-intro.types";

export function WorkspaceExportJobsHeaderIntro({ copy }: WorkspaceExportJobsHeaderIntroProps) {
  return <div><div className="eyebrow">{copy.eyebrow}</div><div style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 8 }}>{copy.title}</div><div className="muted" style={{ marginTop: 8, lineHeight: 1.7 }}>{copy.description}</div></div>;
}

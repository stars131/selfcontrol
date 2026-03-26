"use client";

import type { WorkspaceMediaRetentionSummaryNoteProps } from "./workspace-media-retention-summary-note.types";

export function WorkspaceMediaRetentionSummaryNote({ copy, report }: WorkspaceMediaRetentionSummaryNoteProps) {
  return <div className="muted" style={{ marginTop: 16 }}>{report ? `${copy.orphanFiles}: ${report.orphan_file_count} / ${report.orphan_file_size_label}. ${copy.cleanupNote}` : copy.cleanupNote}</div>;
}

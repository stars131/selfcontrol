"use client";

import { getWorkspaceExportCopy } from "./workspace-export-copy";
import { WorkspaceExportControls } from "./workspace-export-controls";
import type { WorkspaceExportCardProps } from "./workspace-export-card.types";
import { useWorkspaceExportController } from "./use-workspace-export-controller";

export function WorkspaceExportCard({
  token,
  workspaceId,
  workspaceSlug,
  locale,
  role,
}: WorkspaceExportCardProps) {
  const copy = getWorkspaceExportCopy(locale);
  const { loading, error, success, handleDownload } = useWorkspaceExportController({
    token,
    workspaceId,
    workspaceSlug,
    successMessage: copy.success,
    failedMessage: copy.failed,
  });

  return (
    <section className="record-card" style={{ marginTop: 24 }}>
      <div className="eyebrow">{copy.eyebrow}</div>
      <div style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 8 }}>{copy.title}</div>
      <div className="muted" style={{ marginTop: 8, lineHeight: 1.7 }}>
        {copy.description}
      </div>
      <div className="muted" style={{ marginTop: 8 }}>
        {copy.note}
      </div>
      <WorkspaceExportControls
        buttonLabel={loading ? copy.loading : copy.button}
        error={error}
        loading={loading}
        ownerOnlyLabel={copy.ownerOnly}
        role={role}
        success={success}
        onDownload={() => void handleDownload()}
      />
    </section>
  );
}

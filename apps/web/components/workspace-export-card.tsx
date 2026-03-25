"use client";

import { getWorkspaceExportCopy } from "./workspace-export-copy";
import { WorkspaceExportControls } from "./workspace-export-controls";
import { WorkspaceExportSummary } from "./workspace-export-summary";
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
      <WorkspaceExportSummary copy={copy} />
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

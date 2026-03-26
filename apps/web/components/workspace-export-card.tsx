"use client";

import { getWorkspaceExportCopy } from "./workspace-export-copy";
import type { WorkspaceExportCardProps } from "./workspace-export-card.types";
import { WorkspaceExportContent } from "./workspace-export-content";
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
      <WorkspaceExportContent contentProps={{ copy }} controlsProps={{ buttonLabel: loading ? copy.loading : copy.button, error, loading, ownerOnlyLabel: copy.ownerOnly, role, success, onDownload: () => void handleDownload() }} />
    </section>
  );
}

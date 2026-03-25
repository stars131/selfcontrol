"use client";

import { WorkspaceExportCard } from "./workspace-export-card";
import { WorkspaceExportJobsCard } from "./workspace-export-jobs-card";
import { WorkspaceMediaRetentionCard } from "./workspace-media-retention-card";
import type { WorkspaceSettingsManagedToolsProps } from "./workspace-settings-managed-tools.types";

export function WorkspaceSettingsManagedTools({
  locale,
  managedRole,
  token,
  workspaceId,
  workspaceSlug,
}: WorkspaceSettingsManagedToolsProps) {
  return (
    <>
      <WorkspaceMediaRetentionCard locale={locale} role={managedRole} token={token} workspaceId={workspaceId} />
      <WorkspaceExportCard locale={locale} role={managedRole} token={token} workspaceId={workspaceId} workspaceSlug={workspaceSlug} />
      <WorkspaceExportJobsCard locale={locale} role={managedRole} token={token} workspaceId={workspaceId} />
    </>
  );
}

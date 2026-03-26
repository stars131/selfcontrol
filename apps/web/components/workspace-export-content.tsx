"use client";
import { WorkspaceExportControls } from "./workspace-export-controls";
import { WorkspaceExportSummary } from "./workspace-export-summary";
import type { WorkspaceExportContentProps } from "./workspace-export-content.types";

export function WorkspaceExportContent({ contentProps, controlsProps }: WorkspaceExportContentProps) {
  return <><WorkspaceExportSummary {...contentProps} /><WorkspaceExportControls {...controlsProps} /></>;
}

"use client";
import { WorkspaceMediaRetentionHeaderControls } from "./workspace-media-retention-header-controls";
import { WorkspaceMediaRetentionHeaderIntro } from "./workspace-media-retention-header-intro";
import type { WorkspaceMediaRetentionHeaderProps } from "./workspace-media-retention-header.types";

export function WorkspaceMediaRetentionHeader({ copy, loading, olderThanDays, onOlderThanDaysChange, onRefresh }: WorkspaceMediaRetentionHeaderProps) {
  return (
    <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
      <WorkspaceMediaRetentionHeaderIntro copy={copy} />
      <WorkspaceMediaRetentionHeaderControls copy={copy} loading={loading} olderThanDays={olderThanDays} onOlderThanDaysChange={onOlderThanDaysChange} onRefresh={onRefresh} />
    </div>
  );
}

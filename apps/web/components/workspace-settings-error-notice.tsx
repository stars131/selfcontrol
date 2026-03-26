"use client";
import type { WorkspaceSettingsErrorNoticeProps } from "./workspace-settings-error-notice.types";

export function WorkspaceSettingsErrorNotice({ error }: WorkspaceSettingsErrorNoticeProps) {
  if (!error) {
    return null;
  }
  return <div className="notice error" style={{ marginBottom: 16 }}>{error}</div>;
}

"use client";
import type { WorkspaceEntryErrorNoticeProps } from "./workspace-entry-error-notice.types";

export function WorkspaceEntryErrorNotice({ error }: WorkspaceEntryErrorNoticeProps) {
  if (!error) {
    return null;
  }
  return <div className="notice error">{error}</div>;
}

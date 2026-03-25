"use client";

import type { WorkspaceMediaRetentionEditorNoticeProps } from "./workspace-media-retention-editor-notice.types";

export function WorkspaceMediaRetentionEditorNotice({
  editorReadOnly,
}: WorkspaceMediaRetentionEditorNoticeProps) {
  return <div className="notice" style={{ marginTop: 12 }}>{editorReadOnly}</div>;
}

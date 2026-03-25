"use client";

import type { WorkspaceMediaRetentionNoticesProps } from "./workspace-media-retention-notices.types";

export function WorkspaceMediaRetentionNotices({
  actionError,
  actionMessage,
  error,
}: WorkspaceMediaRetentionNoticesProps) {
  return (
    <>
      {error ? <div className="notice error" style={{ marginTop: 16 }}>{error}</div> : null}
      {actionError ? <div className="notice error" style={{ marginTop: 16 }}>{actionError}</div> : null}
      {actionMessage ? <div className="notice" style={{ marginTop: 16 }}>{actionMessage}</div> : null}
    </>
  );
}

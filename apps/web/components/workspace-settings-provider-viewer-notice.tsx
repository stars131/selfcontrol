"use client";

import type { WorkspaceSettingsProviderViewerNoticeProps } from "./workspace-settings-provider-viewer-notice.types";

export function WorkspaceSettingsProviderViewerNotice({
  providerTitle,
  viewerNotice,
}: WorkspaceSettingsProviderViewerNoticeProps) {
  return (
    <section className="record-card">
      <div className="eyebrow">{providerTitle}</div>
      <div className="notice" style={{ marginTop: 12 }}>{viewerNotice}</div>
    </section>
  );
}

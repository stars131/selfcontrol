"use client";

import type { WorkspaceSettingsLoadingShellProps } from "./workspace-settings-loading-shell.types";

export function WorkspaceSettingsLoadingShell({ loadingLabel }: WorkspaceSettingsLoadingShellProps) {
  return (
    <main className="page-shell">
      <section className="panel auth-panel">
        <div className="panel-body">
          <div className="notice">{loadingLabel}</div>
        </div>
      </section>
    </main>
  );
}

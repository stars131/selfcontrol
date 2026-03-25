"use client";

import type { WorkspaceEntryLoadingShellProps } from "./workspace-entry-loading-shell.types";
export function WorkspaceEntryLoadingShell({ loadingLabel }: WorkspaceEntryLoadingShellProps) {
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

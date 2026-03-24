"use client";

export function WorkspaceEntryLoadingShell({ loadingLabel }: { loadingLabel: string }) {
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

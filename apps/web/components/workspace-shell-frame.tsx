import type { WorkspaceShellFrameProps } from "./workspace-shell-frame.types";

export function WorkspaceShellFrame({
  children,
  error,
  loading,
}: WorkspaceShellFrameProps) {
  if (loading) {
    return (
      <main className="page-shell">
        <section className="panel auth-panel">
          <div className="panel-body">
            <div className="notice">Loading workspace...</div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      {error ? <div className="notice error">{error}</div> : null}
      {children}
    </main>
  );
}

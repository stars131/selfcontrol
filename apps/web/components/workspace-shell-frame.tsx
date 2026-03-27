"use client";

import { useStoredLocale } from "../lib/locale";
import { getWorkspaceShellActionCopy } from "./workspace-shell-action-copy";
import type { WorkspaceShellFrameProps } from "./workspace-shell-frame.types";

export function WorkspaceShellFrame({
  children,
  error,
  loading,
}: WorkspaceShellFrameProps) {
  const { locale } = useStoredLocale();
  const copy = getWorkspaceShellActionCopy(locale);

  if (loading) {
    return (
      <main className="page-shell">
        <section className="panel auth-panel">
          <div className="panel-body">
            <div className="notice">{copy.loadingWorkspace}</div>
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

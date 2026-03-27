"use client";

import { clearStoredSession } from "../lib/auth";
import type { WorkspaceShellInitialLoadProps } from "./workspace-shell-effects.types";
import { getStoredWorkspaceShellActionCopy } from "./workspace-shell-action-copy";
import { buildWorkspaceShellInitialDataInput } from "./workspace-shell-initial-load-data-input";
import { loadWorkspaceShellInitialData } from "./workspace-shell-initial-load-helpers";

export async function runWorkspaceShellInitialLoad(
  activeToken: string,
  props: WorkspaceShellInitialLoadProps,
) {
  const copy = getStoredWorkspaceShellActionCopy();
  try {
    props.setToken(activeToken);
    await loadWorkspaceShellInitialData(buildWorkspaceShellInitialDataInput(activeToken, props));
  } catch (caught) {
    clearStoredSession();
    props.setError(caught instanceof Error ? caught.message : copy.loadWorkspaceDataFailed);
    props.router.replace("/login");
  } finally {
    props.setLoading(false);
  }
}

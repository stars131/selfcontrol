"use client";

import { getStoredToken } from "../lib/auth";
import type { RouterLike } from "./workspace-shell-effects.types";

export function readWorkspaceShellInitialToken(router: RouterLike): string | null {
  const activeToken = getStoredToken();
  if (!activeToken) {
    router.replace("/login");
    return null;
  }

  return activeToken;
}

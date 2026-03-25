"use client";

import { useMemo } from "react";

import {
  extractWorkspaceShareToken,
  slugifyWorkspaceName,
} from "./workspace-entry-controller-helpers";
import type { UseWorkspaceEntryControllerDerivedDataInput } from "./use-workspace-entry-controller-derived-data.types";

export function useWorkspaceEntryControllerDerivedData({
  name,
  shareTokenInput,
}: UseWorkspaceEntryControllerDerivedDataInput) {
  const suggestedSlug = useMemo(() => slugifyWorkspaceName(name), [name]);
  const normalizedShareToken = useMemo(
    () => extractWorkspaceShareToken(shareTokenInput),
    [shareTokenInput],
  );

  return {
    suggestedSlug,
    normalizedShareToken,
  };
}

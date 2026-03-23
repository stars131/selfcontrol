"use client";

import { useMemo } from "react";

import {
  extractWorkspaceShareToken,
  slugifyWorkspaceName,
} from "./workspace-entry-controller-helpers";

export function useWorkspaceEntryControllerDerivedData({
  name,
  shareTokenInput,
}: {
  name: string;
  shareTokenInput: string;
}) {
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

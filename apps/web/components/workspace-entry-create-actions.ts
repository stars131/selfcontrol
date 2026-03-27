"use client";

import type { FormEvent } from "react";

import { createWorkspace } from "../lib/api";
import { getStoredLocale } from "../lib/locale";
import { getWorkspaceEntryCopy } from "./workspace-entry-copy";
import { getWorkspaceEntryActionErrorMessage } from "./workspace-entry-controller-helpers";
import type { CreateWorkspaceEntryCreateActionsInput } from "./workspace-entry-create-actions.types";

export function createWorkspaceEntryCreateActions({
  router,
  state,
}: CreateWorkspaceEntryCreateActionsInput) {
  const { name, setCreating, setError, setName, setWorkspaces, token } = state;
  const copy = getWorkspaceEntryCopy(getStoredLocale());

  const handleCreate = async (
    event: FormEvent<HTMLFormElement>,
    suggestedSlug: string,
  ) => {
    event.preventDefault();
    if (!token || !name.trim()) {
      return;
    }

    setCreating(true);
    setError("");
    try {
      const result = await createWorkspace(token, {
        name: name.trim(),
        slug: suggestedSlug || `workspace-${Date.now()}`,
      });
      setWorkspaces((current) => [result.workspace, ...current]);
      setName("");
      router.push(`/app/workspaces/${result.workspace.id}`);
    } catch (caught) {
      setError(getWorkspaceEntryActionErrorMessage(caught, copy.createWorkspaceFailed));
    } finally {
      setCreating(false);
    }
  };

  return {
    handleCreate,
  };
}

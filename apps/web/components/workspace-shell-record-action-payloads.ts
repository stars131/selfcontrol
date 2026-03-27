"use client";

import type { WorkspaceShellSaveRecordInput } from "./workspace-shell-actions.types";

export function buildWorkspaceShellRecordUpdatePayload(
  input: WorkspaceShellSaveRecordInput,
) {
  return {
    title: input.title,
    content: input.content,
    rating: input.rating ?? null,
    occurred_at: input.occurred_at,
    is_avoid: input.is_avoid,
    extra_data: input.extra_data,
  };
}

export function buildWorkspaceShellRecordCreatePayload(
  input: WorkspaceShellSaveRecordInput,
) {
  return {
    title: input.title,
    content: input.content,
    type_code: input.type_code,
    rating: input.rating ?? undefined,
    occurred_at: input.occurred_at,
    is_avoid: input.is_avoid,
    source_type: "manual",
    extra_data: input.extra_data,
  };
}

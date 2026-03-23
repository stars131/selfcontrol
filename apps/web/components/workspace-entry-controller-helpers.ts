"use client";

export function slugifyWorkspaceName(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function extractWorkspaceShareToken(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }
  if (trimmed.includes("/share/")) {
    return trimmed.split("/share/").pop()?.split(/[?#]/)[0] ?? "";
  }
  return trimmed.replace(/^\/+/, "").replace(/^share\//, "");
}

export function getWorkspaceEntryActionErrorMessage(caught: unknown, fallbackMessage: string) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

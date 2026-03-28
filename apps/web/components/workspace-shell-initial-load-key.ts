"use client";
export function buildWorkspaceShellInitialLoadKey(activeToken: string, workspaceId: string) {
  return `${workspaceId}:${activeToken}`;
}
export function shouldRunWorkspaceShellInitialLoad(
  previousLoadKey: string | null,
  nextLoadKey: string,
) {
  return previousLoadKey !== nextLoadKey;
}

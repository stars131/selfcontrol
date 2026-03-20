import { WorkspaceShellClient } from "../../../../components/workspace-shell-client";

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;

  return <WorkspaceShellClient workspaceId={workspaceId} />;
}

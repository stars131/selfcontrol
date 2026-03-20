import { ChatPanel } from "../../../../components/chat-panel";
import { RecordPanel } from "../../../../components/record-panel";

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;

  return (
    <main className="page-shell">
      <div className="workspace-shell">
        <ChatPanel />
        <RecordPanel workspaceId={workspaceId} />
      </div>
    </main>
  );
}


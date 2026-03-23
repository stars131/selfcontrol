"use client";

import { ChatPanel } from "./chat-panel";
import { RecordPanelV2 } from "./record-panel-v2";
import { buildChatPanelProps, buildRecordPanelProps } from "./workspace-shell-panels-props";
import type { WorkspaceShellPanelsProps } from "./workspace-shell-panels.types";

export function WorkspaceShellPanels(props: WorkspaceShellPanelsProps) {
  const chatPanelProps = buildChatPanelProps(props);
  const recordPanelProps = buildRecordPanelProps(props);

  return (
    <div className="workspace-shell">
      <ChatPanel {...chatPanelProps} />
      <RecordPanelV2 {...recordPanelProps} />
    </div>
  );
}

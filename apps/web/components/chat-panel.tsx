"use client";

import { ChatPanelContent } from "./chat-panel-content";
import { buildChatPanelContentProps } from "./chat-panel-content-props";
import { ChatPanelHeader } from "./chat-panel-header";
import type { ChatPanelProps } from "./chat-panel.types";
import { useChatPanelActions } from "./use-chat-panel-actions";

export function ChatPanel(props: ChatPanelProps) {
  const actions = useChatPanelActions({
    latestSharePath: props.latestSharePath,
    notifications: props.notifications,
    onCreateShareLink: props.onCreateShareLink,
    onDisableShareLink: props.onDisableShareLink,
    onRefreshAuditLogs: props.onRefreshAuditLogs,
    onReindexKnowledge: props.onReindexKnowledge,
    onSyncNotifications: props.onSyncNotifications,
    onSendMessage: props.onSendMessage,
  });

  return (
    <section className="panel">
      <ChatPanelHeader
        canManageWorkspace={props.canManageWorkspace}
        workspaceId={props.workspaceId}
        workspaceRole={props.workspaceRole}
      />
      <ChatPanelContent {...buildChatPanelContentProps({ actions, props })} />
    </section>
  );
}

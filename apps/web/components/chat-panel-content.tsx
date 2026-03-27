"use client";

import { ChatPanelConversationContent } from "./chat-panel-conversation-content";
import { ChatPanelManagementContent } from "./chat-panel-management-content";
import { buildChatPanelConversationContentProps, buildChatPanelManagementContentProps } from "./chat-panel-section-props";
import type { ChatPanelContentProps } from "./chat-panel-content.types";

export function ChatPanelContent(props: ChatPanelContentProps) {
  return (
    <div className="panel-body">
      <ChatPanelConversationContent {...buildChatPanelConversationContentProps(props)} />
      <ChatPanelManagementContent {...buildChatPanelManagementContentProps(props)} />
    </div>
  );
}

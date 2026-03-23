"use client";

import { ChatConversationBar } from "./chat-conversation-bar";
import { ChatMessageThread } from "./chat-message-thread";
import { ChatPanelComposer } from "./chat-panel-composer";
import type { ChatPanelConversationContentProps } from "./chat-panel-content.types";

export function ChatPanelConversationContent({
  activeConversationId,
  canWriteWorkspace,
  conversations,
  draft,
  error,
  handleSend,
  handleSyncNotifications,
  loading,
  messages,
  onCreateConversation,
  onSelectConversation,
  setDraft,
  syncing,
}: ChatPanelConversationContentProps) {
  return (
    <>
      <ChatConversationBar
        activeConversationId={activeConversationId}
        canWriteWorkspace={canWriteWorkspace}
        conversations={conversations}
        onCreateConversation={onCreateConversation}
        onSelectConversation={onSelectConversation}
        onSyncNotifications={handleSyncNotifications}
        syncing={syncing}
      />
      <ChatMessageThread messages={messages} />
      <ChatPanelComposer
        canWriteWorkspace={canWriteWorkspace}
        draft={draft}
        error={error}
        loading={loading}
        onSend={handleSend}
        setDraft={setDraft}
      />
    </>
  );
}

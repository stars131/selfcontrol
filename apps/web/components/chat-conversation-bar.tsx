"use client";

import type { Conversation } from "../lib/types";

export function ChatConversationBar({
  activeConversationId,
  canWriteWorkspace,
  conversations,
  onCreateConversation,
  onSelectConversation,
  onSyncNotifications,
  syncing,
}: {
  activeConversationId: string | null;
  canWriteWorkspace: boolean;
  conversations: Conversation[];
  onCreateConversation: () => Promise<void>;
  onSelectConversation: (conversationId: string) => void;
  onSyncNotifications: () => Promise<void>;
  syncing: boolean;
}) {
  return (
    <div className="conversation-bar">
      <div className="action-row">
        <button
          className="button secondary"
          disabled={!canWriteWorkspace}
          type="button"
          onClick={() => void onCreateConversation()}
        >
          New conversation
        </button>
        <button
          className="button secondary"
          disabled={syncing}
          type="button"
          onClick={() => void onSyncNotifications()}
        >
          {syncing ? "Syncing..." : "Sync reminders"}
        </button>
      </div>
      <div className="conversation-list">
        {conversations.map((conversation) => (
          <button
            className={`conversation-pill ${conversation.id === activeConversationId ? "active" : ""}`}
            key={conversation.id}
            type="button"
            onClick={() => onSelectConversation(conversation.id)}
          >
            {conversation.title}
          </button>
        ))}
      </div>
    </div>
  );
}

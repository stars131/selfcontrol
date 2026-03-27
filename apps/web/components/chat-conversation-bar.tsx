"use client";

import { useStoredLocale } from "../lib/locale";
import { getChatPanelDisplayCopy } from "./chat-panel-display-copy";
import type { ChatConversationBarProps } from "./chat-conversation-bar.types";

export function ChatConversationBar({
  activeConversationId,
  canWriteWorkspace,
  conversations,
  onCreateConversation,
  onSelectConversation,
  onSyncNotifications,
  syncing,
}: ChatConversationBarProps) {
  const { locale } = useStoredLocale();
  const copy = getChatPanelDisplayCopy(locale);

  return (
    <div className="conversation-bar">
      <div className="action-row">
        <button
          className="button secondary"
          disabled={!canWriteWorkspace}
          type="button"
          onClick={() => void onCreateConversation()}
        >
          {copy.newConversationLabel}
        </button>
        <button
          className="button secondary"
          disabled={syncing}
          type="button"
          onClick={() => void onSyncNotifications()}
        >
          {syncing ? copy.syncingLabel : copy.syncRemindersLabel}
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

"use client";

import { useState } from "react";

import type { ChatMessage, Conversation } from "../lib/types";

export function useWorkspaceShellStateConversationValues() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  return {
    conversations,
    setConversations,
    activeConversationId,
    setActiveConversationId,
    messages,
    setMessages,
  };
}

import type { ChatMessage, Conversation, RecordItem } from "./types";
import { request } from "./api-core";

type SendMessageResult = {
  user_message: ChatMessage;
  assistant_message: ChatMessage;
  records: RecordItem[];
};

export async function listConversations(token: string, workspaceId: string) {
  return request<{ items: Conversation[] }>(
    `/workspaces/${workspaceId}/conversations`,
    { method: "GET" },
    token,
  );
}

export async function createConversation(token: string, workspaceId: string, title: string) {
  return request<{ conversation: Conversation }>(
    `/workspaces/${workspaceId}/conversations`,
    {
      method: "POST",
      body: JSON.stringify({ title }),
    },
    token,
  );
}

export async function listMessages(token: string, workspaceId: string, conversationId: string) {
  return request<{ items: ChatMessage[] }>(
    `/workspaces/${workspaceId}/conversations/${conversationId}/messages`,
    { method: "GET" },
    token,
  );
}

export async function sendMessage(
  token: string,
  workspaceId: string,
  conversationId: string,
  content: string,
) {
  return request<SendMessageResult>(
    `/workspaces/${workspaceId}/conversations/${conversationId}/messages`,
    {
      method: "POST",
      body: JSON.stringify({ content }),
    },
    token,
  );
}

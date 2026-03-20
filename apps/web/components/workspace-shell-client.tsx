"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  createConversation,
  createRecord,
  deleteRecord,
  listConversations,
  listMedia,
  listMessages,
  listRecords,
  sendMessage,
  updateRecord,
  uploadMedia,
} from "../lib/api";
import { clearStoredSession, getStoredToken } from "../lib/auth";
import type { ChatMessage, Conversation, MediaAsset, RecordItem } from "../lib/types";
import { ChatPanel } from "./chat-panel";
import { RecordPanel } from "./record-panel";

export function WorkspaceShellClient({ workspaceId }: { workspaceId: string }) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [visibleRecords, setVisibleRecords] = useState<RecordItem[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshRecords = async (activeToken: string) => {
    const result = await listRecords(activeToken, workspaceId);
    setRecords(result.items);
    setVisibleRecords(result.items);
    setSelectedRecordId((current) => current ?? result.items[0]?.id ?? null);
  };

  const refreshMedia = async (activeToken: string, recordId: string | null) => {
    if (!recordId) {
      setMediaAssets([]);
      return;
    }
    const result = await listMedia(activeToken, workspaceId, recordId);
    setMediaAssets(result.items);
  };

  const loadConversationMessages = async (activeToken: string, conversationId: string) => {
    const result = await listMessages(activeToken, workspaceId, conversationId);
    setMessages(result.items);
  };

  useEffect(() => {
    const activeToken = getStoredToken();
    if (!activeToken) {
      router.replace("/login");
      return;
    }

    const load = async () => {
      try {
        setToken(activeToken);
        await refreshRecords(activeToken);

        const conversationResult = await listConversations(activeToken, workspaceId);
        let items = conversationResult.items;
        if (!items.length) {
          const created = await createConversation(activeToken, workspaceId, "Workspace chat");
          items = [created.conversation];
        }

        setConversations(items);
        setActiveConversationId(items[0].id);
        await loadConversationMessages(activeToken, items[0].id);
      } catch (caught) {
        clearStoredSession();
        setError(caught instanceof Error ? caught.message : "Failed to load workspace data");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [router, workspaceId]);

  useEffect(() => {
    if (!token) {
      return;
    }
    void refreshMedia(token, selectedRecordId);
  }, [token, selectedRecordId, workspaceId]);

  const handleSendMessage = async (message: string) => {
    if (!token || !activeConversationId) {
      throw new Error("No active conversation");
    }

    const result = await sendMessage(token, workspaceId, activeConversationId, message);
    setMessages((prev) => [...prev, result.user_message, result.assistant_message]);

    const mode = String(result.assistant_message.metadata_json.mode ?? "");
    if (mode === "create") {
      await refreshRecords(token);
      if (result.records[0]) {
        setSelectedRecordId(result.records[0].id);
      }
      return;
    }

    setVisibleRecords(result.records);
    if (result.records[0]) {
      setSelectedRecordId(result.records[0].id);
    }
  };

  const handleCreateConversation = async () => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    const result = await createConversation(token, workspaceId, `Chat ${conversations.length + 1}`);
    setConversations((prev) => [result.conversation, ...prev]);
    setActiveConversationId(result.conversation.id);
    setMessages([]);
  };

  const handleSelectConversation = (conversationId: string) => {
    if (!token) {
      return;
    }
    setActiveConversationId(conversationId);
    void loadConversationMessages(token, conversationId);
  };

  const handleSaveRecord = async (input: {
    recordId?: string;
    title?: string;
    content: string;
    type_code: string;
    rating?: number | null;
    is_avoid: boolean;
  }) => {
    if (!token) {
      throw new Error("Not authenticated");
    }

    if (input.recordId) {
      await updateRecord(token, workspaceId, input.recordId, {
        title: input.title,
        content: input.content,
        rating: input.rating ?? null,
        is_avoid: input.is_avoid,
      });
      await refreshRecords(token);
      setSelectedRecordId(input.recordId);
      return;
    }

    const result = await createRecord(token, workspaceId, {
      title: input.title,
      content: input.content,
      type_code: input.type_code,
      rating: input.rating ?? undefined,
      is_avoid: input.is_avoid,
      source_type: "manual",
    });
    await refreshRecords(token);
    setSelectedRecordId(result.record.id);
  };

  const handleDeleteRecord = async (recordId: string) => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    await deleteRecord(token, workspaceId, recordId);
    const nextRecords = records.filter((record) => record.id !== recordId);
    setSelectedRecordId(nextRecords[0]?.id ?? null);
    await refreshRecords(token);
  };

  const handleUploadMedia = async (recordId: string, file: File) => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    await uploadMedia(token, workspaceId, recordId, file);
    await refreshMedia(token, recordId);
  };

  const handleResetFilter = async () => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    await refreshRecords(token);
  };

  if (loading) {
    return (
      <main className="page-shell">
        <section className="panel auth-panel">
          <div className="panel-body">
            <div className="notice">Loading workspace...</div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      {error ? <div className="notice error">{error}</div> : null}
      <div className="workspace-shell">
        <ChatPanel
          activeConversationId={activeConversationId}
          conversations={conversations}
          messages={messages}
          onCreateConversation={handleCreateConversation}
          onSelectConversation={handleSelectConversation}
          onSendMessage={handleSendMessage}
          workspaceId={workspaceId}
        />
        <RecordPanel
          mediaAssets={mediaAssets}
          onDeleteRecord={handleDeleteRecord}
          onResetFilter={handleResetFilter}
          onSaveRecord={handleSaveRecord}
          onSelectRecord={setSelectedRecordId}
          onUploadMedia={handleUploadMedia}
          records={visibleRecords}
          selectedRecordId={selectedRecordId}
          workspaceId={workspaceId}
        />
      </div>
    </main>
  );
}

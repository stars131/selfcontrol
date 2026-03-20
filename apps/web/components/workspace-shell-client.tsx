"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { createRecord, listRecords, searchRecords } from "../lib/api";
import { clearStoredSession, getStoredToken } from "../lib/auth";
import type { RecordItem } from "../lib/types";
import { ChatPanel } from "./chat-panel";
import { RecordPanel } from "./record-panel";

function inferRecordType(text: string) {
  if (/snack|chips|cookie|零食|薯片|饼干/i.test(text)) {
    return "snack";
  }
  if (/eat|food|dinner|lunch|饭|吃|店|烤鱼|火锅|日料/i.test(text)) {
    return "food";
  }
  return "memo";
}

function inferAvoid(text: string) {
  return /避雷|难吃|不好吃|别买|踩雷/i.test(text);
}

function buildTitle(text: string) {
  const normalized = text.replace(/\s+/g, " ").trim();
  return normalized.length > 28 ? `${normalized.slice(0, 28)}...` : normalized;
}

export function WorkspaceShellClient({ workspaceId }: { workspaceId: string }) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshRecords = async (activeToken: string) => {
    const result = await listRecords(activeToken, workspaceId);
    setRecords(result.items);
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
      } catch (caught) {
        clearStoredSession();
        setError(caught instanceof Error ? caught.message : "Failed to load records");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [router, workspaceId]);

  const handleChatAction = async (message: string) => {
    if (!token) {
      throw new Error("Not authenticated");
    }

    if (/记|记录|save|add/i.test(message)) {
      const result = await createRecord(token, workspaceId, {
        type_code: inferRecordType(message),
        title: buildTitle(message),
        content: message,
        is_avoid: inferAvoid(message),
        source_type: "chat",
      });
      await refreshRecords(token);
      return {
        mode: "create" as const,
        assistantMessage: `Saved one record: ${result.record.title || "Untitled"}.`,
      };
    }

    const result = await searchRecords(token, workspaceId, message);
    setRecords(result.items);
    return {
      mode: "search" as const,
      assistantMessage: result.summary,
    };
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
        <ChatPanel workspaceId={workspaceId} onAction={handleChatAction} />
        <RecordPanel workspaceId={workspaceId} records={records} />
      </div>
    </main>
  );
}

import fs from "node:fs";
import path from "node:path";

const chatPanelPath = path.resolve(process.cwd(), "components/chat-panel.tsx");
const source = fs.readFileSync(chatPanelPath, "utf8");
const lineCount = source.split(/\r?\n/).length;
const chatConversationBarPath = path.resolve(process.cwd(), "components/chat-conversation-bar.tsx");
const chatConversationBarSource = fs.readFileSync(chatConversationBarPath, "utf8");
const chatMessageThreadPath = path.resolve(process.cwd(), "components/chat-message-thread.tsx");
const chatMessageThreadSource = fs.readFileSync(chatMessageThreadPath, "utf8");

if (!source.includes('import { useChatPanelActions } from "./use-chat-panel-actions";')) {
  throw new Error("chat-panel.tsx must import useChatPanelActions");
}

if (!source.includes("useChatPanelActions({")) {
  throw new Error("chat-panel.tsx must delegate local async action orchestration to useChatPanelActions");
}

if (!source.includes('import { ChatKnowledgeCard } from "./chat-knowledge-card";')) {
  throw new Error("chat-panel.tsx must import ChatKnowledgeCard");
}

if (!source.includes('import { ChatConversationBar } from "./chat-conversation-bar";')) {
  throw new Error("chat-panel.tsx must import ChatConversationBar");
}

if (!source.includes("<ChatKnowledgeCard")) {
  throw new Error("chat-panel.tsx must delegate knowledge card rendering to ChatKnowledgeCard");
}

if (!source.includes("<ChatConversationBar")) {
  throw new Error("chat-panel.tsx must delegate conversation-bar rendering to ChatConversationBar");
}

if (!chatConversationBarSource.includes("className={`conversation-pill ${conversation.id === activeConversationId ? \"active\" : \"\"}`}")) {
  throw new Error("chat-conversation-bar.tsx must keep conversation pill rendering");
}

if (!source.includes('import { ChatAuditLogsCard } from "./chat-audit-logs-card";')) {
  throw new Error("chat-panel.tsx must import ChatAuditLogsCard");
}

if (!source.includes("<ChatAuditLogsCard")) {
  throw new Error("chat-panel.tsx must delegate audit-log rendering to ChatAuditLogsCard");
}

if (!source.includes('import { ChatNotificationsCard } from "./chat-notifications-card";')) {
  throw new Error("chat-panel.tsx must import ChatNotificationsCard");
}

if (!source.includes("<ChatNotificationsCard")) {
  throw new Error("chat-panel.tsx must delegate notification rendering to ChatNotificationsCard");
}

if (!source.includes('import { ChatMessageThread } from "./chat-message-thread";')) {
  throw new Error("chat-panel.tsx must import ChatMessageThread");
}

if (!source.includes("<ChatMessageThread")) {
  throw new Error("chat-panel.tsx must delegate message-thread rendering to ChatMessageThread");
}

if (!chatMessageThreadSource.includes('import { ChatMessageSources } from "./chat-message-sources";')) {
  throw new Error("chat-message-thread.tsx must import ChatMessageSources");
}

if (!chatMessageThreadSource.includes("<ChatMessageSources")) {
  throw new Error("chat-message-thread.tsx must delegate assistant source rendering to ChatMessageSources");
}

if (!source.includes('import { ChatShareLinksCard } from "./chat-share-links-card";')) {
  throw new Error("chat-panel.tsx must import ChatShareLinksCard");
}

if (!source.includes("<ChatShareLinksCard")) {
  throw new Error("chat-panel.tsx must delegate share-link rendering to ChatShareLinksCard");
}

for (const forbiddenToken of [
  "function buildShareUrl",
  "useState(",
  "useMemo(",
  "const handleSend =",
  "const handleSyncNotifications =",
  "const handleReindexKnowledge =",
  "const handleRefreshAuditLogs =",
  "const handleCreateShareLink =",
  "const handleDisableShareLink =",
  "knowledgeStats.chunk_count",
  "auditLogs.map((item)",
  "shareLinks.map((item)",
  "notifications.slice(0, 6).map((notification)",
  "metadata_json.sources.slice(0, 3).map((source, index)",
  'className={`message ${message.role === "assistant" ? "assistant" : ""}`}',
  "className={`conversation-pill ${conversation.id === activeConversationId ? \"active\" : \"\"}`}",
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`chat-panel.tsx must keep action state and handler logic delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 220;
if (lineCount > maxAllowedLines) {
  throw new Error(`chat-panel.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

console.log("chat-panel structure verification passed");

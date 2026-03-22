import fs from "node:fs";
import path from "node:path";

const chatPanelPath = path.resolve(process.cwd(), "components/chat-panel.tsx");
const source = fs.readFileSync(chatPanelPath, "utf8");
const lineCount = source.split(/\r?\n/).length;

if (!source.includes('import { useChatPanelActions } from "./use-chat-panel-actions";')) {
  throw new Error("chat-panel.tsx must import useChatPanelActions");
}

if (!source.includes("useChatPanelActions({")) {
  throw new Error("chat-panel.tsx must delegate local async action orchestration to useChatPanelActions");
}

if (!source.includes('import { ChatKnowledgeCard } from "./chat-knowledge-card";')) {
  throw new Error("chat-panel.tsx must import ChatKnowledgeCard");
}

if (!source.includes("<ChatKnowledgeCard")) {
  throw new Error("chat-panel.tsx must delegate knowledge card rendering to ChatKnowledgeCard");
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
  "shareLinks.map((item)",
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`chat-panel.tsx must keep action state and handler logic delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 350;
if (lineCount > maxAllowedLines) {
  throw new Error(`chat-panel.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

console.log("chat-panel structure verification passed");

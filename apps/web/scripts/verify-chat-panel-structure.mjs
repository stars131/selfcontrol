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
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`chat-panel.tsx must keep action state and handler logic delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 450;
if (lineCount > maxAllowedLines) {
  throw new Error(`chat-panel.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

console.log("chat-panel structure verification passed");

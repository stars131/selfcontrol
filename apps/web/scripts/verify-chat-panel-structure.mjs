import fs from "node:fs";
import path from "node:path";

const chatPanelPath = path.resolve(process.cwd(), "components/chat-panel.tsx");
const source = fs.readFileSync(chatPanelPath, "utf8");
const lineCount = source.split(/\r?\n/).length;
const chatConversationBarPath = path.resolve(process.cwd(), "components/chat-conversation-bar.tsx");
const chatConversationBarSource = fs.readFileSync(chatConversationBarPath, "utf8");
const chatMessageThreadPath = path.resolve(process.cwd(), "components/chat-message-thread.tsx");
const chatMessageThreadSource = fs.readFileSync(chatMessageThreadPath, "utf8");
const chatPanelHeaderPath = path.resolve(process.cwd(), "components/chat-panel-header.tsx");
const chatPanelHeaderSource = fs.readFileSync(chatPanelHeaderPath, "utf8");
const chatPanelComposerPath = path.resolve(process.cwd(), "components/chat-panel-composer.tsx");
const chatPanelComposerSource = fs.readFileSync(chatPanelComposerPath, "utf8");
const chatPanelManagementSectionPath = path.resolve(
  process.cwd(),
  "components/chat-panel-management-section.tsx",
);
const chatPanelManagementSectionSource = fs.readFileSync(chatPanelManagementSectionPath, "utf8");
const chatPanelActionsPath = path.resolve(process.cwd(), "components/use-chat-panel-actions.ts");
const chatPanelActionsSource = fs.readFileSync(chatPanelActionsPath, "utf8");

if (!source.includes('import { useChatPanelActions } from "./use-chat-panel-actions";')) {
  throw new Error("chat-panel.tsx must import useChatPanelActions");
}

if (!source.includes("useChatPanelActions({")) {
  throw new Error("chat-panel.tsx must delegate local async action orchestration to useChatPanelActions");
}

if (!source.includes('import { ChatPanelManagementSection } from "./chat-panel-management-section";')) {
  if (!source.includes('import { ChatPanelContent } from "./chat-panel-content";')) {
    throw new Error("chat-panel.tsx must import ChatPanelContent");
  }
}

if (!source.includes("<ChatPanelContent")) {
  throw new Error("chat-panel.tsx must delegate body rendering to ChatPanelContent");
}

if (!chatPanelManagementSectionSource.includes('import { useStoredLocale } from "../lib/locale";')) {
  throw new Error("chat-panel-management-section.tsx must own locale lookup for provider settings");
}

for (const requiredImport of [
  'import { ChatKnowledgeCard } from "./chat-knowledge-card";',
  'import { ChatShareLinksCard } from "./chat-share-links-card";',
  'import { ProviderSettingsPanel } from "./provider-settings-panel";',
]) {
  if (!chatPanelManagementSectionSource.includes(requiredImport)) {
    throw new Error(`chat-panel-management-section.tsx must import delegated management cards: ${requiredImport}`);
  }
}

for (const requiredUsage of [
  "<ChatKnowledgeCard",
  "<ChatShareLinksCard",
  "<ProviderSettingsPanel",
]) {
  if (!chatPanelManagementSectionSource.includes(requiredUsage)) {
    throw new Error(`chat-panel-management-section.tsx must compose delegated management cards: ${requiredUsage}`);
  }
}

if (!source.includes('import { ChatPanelHeader } from "./chat-panel-header";')) {
  throw new Error("chat-panel.tsx must import ChatPanelHeader");
}

if (!source.includes('import type { ChatPanelProps } from "./chat-panel.types";')) {
  throw new Error("chat-panel.tsx must import ChatPanelProps");
}

if (!source.includes("<ChatPanelHeader")) {
  throw new Error("chat-panel.tsx must delegate header rendering to ChatPanelHeader");
}

if (!chatPanelHeaderSource.includes('href={`/app/workspaces/${workspaceId}/settings`}')) {
  throw new Error("chat-panel-header.tsx must keep the workspace settings entry");
}

if (!chatConversationBarSource.includes("className={`conversation-pill ${conversation.id === activeConversationId ? \"active\" : \"\"}`}")) {
  throw new Error("chat-conversation-bar.tsx must keep conversation pill rendering");
}

if (!chatPanelComposerSource.includes("Examples: save this snack note")) {
  throw new Error("chat-panel-composer.tsx must keep the write-mode placeholder");
}

if (!chatPanelComposerSource.includes("Viewer mode: chat creation is disabled for this shared workspace.")) {
  throw new Error("chat-panel-composer.tsx must keep the viewer-mode placeholder");
}

if (!chatMessageThreadSource.includes('import { ChatMessageSources } from "./chat-message-sources";')) {
  throw new Error("chat-message-thread.tsx must import ChatMessageSources");
}

if (!chatMessageThreadSource.includes("<ChatMessageSources")) {
  throw new Error("chat-message-thread.tsx must delegate assistant source rendering to ChatMessageSources");
}

for (const requiredActionsImport of [
  'from "./chat-panel-operator-handlers";',
  'from "./chat-panel-share-handlers";',
  'from "./use-chat-panel-action-derived-data";',
  'from "./use-chat-panel-action-state";',
]) {
  if (!chatPanelActionsSource.includes(requiredActionsImport)) {
    throw new Error(`use-chat-panel-actions.ts must import delegated action helpers: ${requiredActionsImport}`);
  }
}

for (const requiredActionsUsage of [
  "useChatPanelActionState()",
  "useChatPanelActionDerivedData({",
  "createChatPanelOperatorHandlers({",
  "createChatPanelShareHandlers({",
]) {
  if (!chatPanelActionsSource.includes(requiredActionsUsage)) {
    throw new Error(`use-chat-panel-actions.ts must delegate action helper logic: ${requiredActionsUsage}`);
  }
}

for (const forbiddenToken of [
  "function buildShareUrl",
  "const handleSend =",
  "const handleSyncNotifications =",
  "const handleReindexKnowledge =",
  "const handleRefreshAuditLogs =",
  "const handleCreateShareLink =",
  "const handleDisableShareLink =",
  "<ChatConversationBar",
  "<ChatAuditLogsCard",
  "<ChatNotificationsCard",
  "<ChatMessageThread",
  "<ChatPanelComposer",
  "knowledgeStats.chunk_count",
  "auditLogs.map((item)",
  "shareLinks.map((item)",
  "notifications.slice(0, 6).map((notification)",
  "metadata_json.sources.slice(0, 3).map((source, index)",
  'className={`message ${message.role === "assistant" ? "assistant" : ""}`}',
  "className={`conversation-pill ${conversation.id === activeConversationId ? \"active\" : \"\"}`}",
  'href={`/app/workspaces/${workspaceId}/settings`}',
  'import { useStoredLocale } from "../lib/locale";',
  'import { ChatKnowledgeCard } from "./chat-knowledge-card";',
  'import { ChatShareLinksCard } from "./chat-share-links-card";',
  'import { ProviderSettingsPanel } from "./provider-settings-panel";',
  "<ChatKnowledgeCard",
  "<ChatShareLinksCard",
  "<ProviderSettingsPanel",
  'placeholder={',
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`chat-panel.tsx must keep action state and handler logic delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 140;
if (lineCount > maxAllowedLines) {
  throw new Error(`chat-panel.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

const maxActionsLines = 120;
const actionsLineCount = chatPanelActionsSource.split(/\r?\n/).length;
if (actionsLineCount > maxActionsLines) {
  throw new Error(`use-chat-panel-actions.ts exceeded ${maxActionsLines} lines: ${actionsLineCount}`);
}

for (const forbiddenActionsToken of [
  'from "./chat-panel-action-helpers";',
  "useState(",
  "useMemo(",
  "countUnreadNotifications(",
  "buildChatShareUrl(",
]) {
  if (chatPanelActionsSource.includes(forbiddenActionsToken)) {
    throw new Error(`use-chat-panel-actions.ts must keep state and derived data delegated: ${forbiddenActionsToken}`);
  }
}

console.log("chat-panel structure verification passed");

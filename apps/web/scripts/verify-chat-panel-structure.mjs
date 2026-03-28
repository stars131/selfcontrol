import fs from "node:fs";
import path from "node:path";

const chatPanelPath = path.resolve(process.cwd(), "components/chat-panel.tsx");
const source = fs.readFileSync(chatPanelPath, "utf8");
const lineCount = source.split(/\r?\n/).length;
const chatPanelContentPropsPath = path.resolve(
  process.cwd(),
  "components/chat-panel-content-props.ts",
);
const chatPanelContentPropsSource = fs.readFileSync(chatPanelContentPropsPath, "utf8");
const chatPanelContentActionPropsPath = path.resolve(
  process.cwd(),
  "components/chat-panel-content-action-props.ts",
);
const chatPanelContentActionPropsSource = fs.readFileSync(
  chatPanelContentActionPropsPath,
  "utf8",
);
const chatPanelContentDataPropsPath = path.resolve(
  process.cwd(),
  "components/chat-panel-content-data-props.ts",
);
const chatPanelContentDataPropsSource = fs.readFileSync(
  chatPanelContentDataPropsPath,
  "utf8",
);
const chatPanelContentPropsTypesPath = path.resolve(
  process.cwd(),
  "components/chat-panel-content-props.types.ts",
);
const chatPanelContentPropsTypesSource = fs.readFileSync(
  chatPanelContentPropsTypesPath,
  "utf8",
);
const chatPanelContentPropsLineCount = chatPanelContentPropsSource.split(/\r?\n/).length;
const chatPanelContentActionPropsLineCount =
  chatPanelContentActionPropsSource.split(/\r?\n/).length;
const chatPanelContentDataPropsLineCount =
  chatPanelContentDataPropsSource.split(/\r?\n/).length;
const chatPanelContentPropsTypesLineCount =
  chatPanelContentPropsTypesSource.split(/\r?\n/).length;
const chatPanelContentPath = path.resolve(process.cwd(), "components/chat-panel-content.tsx");
const chatPanelContentSource = fs.readFileSync(chatPanelContentPath, "utf8");
const chatPanelContentLineCount = chatPanelContentSource.split(/\r?\n/).length;
const chatPanelSectionPropsPath = path.resolve(
  process.cwd(),
  "components/chat-panel-section-props.ts",
);
const chatPanelSectionPropsSource = fs.readFileSync(chatPanelSectionPropsPath, "utf8");
const chatPanelSectionPropsLineCount = chatPanelSectionPropsSource.split(/\r?\n/).length;
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
const chatPanelConversationContentPath = path.resolve(
  process.cwd(),
  "components/chat-panel-conversation-content.tsx",
);
const chatPanelConversationContentSource = fs.readFileSync(
  chatPanelConversationContentPath,
  "utf8",
);
const chatPanelManagementContentPath = path.resolve(
  process.cwd(),
  "components/chat-panel-management-content.tsx",
);
const chatPanelManagementContentSource = fs.readFileSync(
  chatPanelManagementContentPath,
  "utf8",
);
const chatPanelManagementContentPropsPath = path.resolve(
  process.cwd(),
  "components/chat-panel-management-content-props.ts",
);
const chatPanelManagementContentPropsSource = fs.readFileSync(
  chatPanelManagementContentPropsPath,
  "utf8",
);
const chatPanelManagementContentPropsLineCount =
  chatPanelManagementContentPropsSource.split(/\r?\n/).length;
const chatPanelContentTypesPath = path.resolve(
  process.cwd(),
  "components/chat-panel-content.types.ts",
);
const chatPanelContentTypesSource = fs.readFileSync(chatPanelContentTypesPath, "utf8");
const chatPanelActionsPath = path.resolve(process.cwd(), "components/use-chat-panel-actions.ts");
const chatPanelActionsSource = fs.readFileSync(chatPanelActionsPath, "utf8");
const chatPanelOperatorHandlersPath = path.resolve(
  process.cwd(),
  "components/chat-panel-operator-handlers.ts",
);
const chatPanelOperatorHandlersSource = fs.readFileSync(
  chatPanelOperatorHandlersPath,
  "utf8",
);
const chatPanelSendHandlerPath = path.resolve(
  process.cwd(),
  "components/chat-panel-send-handler.ts",
);
const chatPanelSendHandlerSource = fs.readFileSync(chatPanelSendHandlerPath, "utf8");
const chatPanelAdminHandlersPath = path.resolve(
  process.cwd(),
  "components/chat-panel-admin-handlers.ts",
);
const chatPanelAdminHandlersSource = fs.readFileSync(
  chatPanelAdminHandlersPath,
  "utf8",
);
const chatPanelShareHandlersPath = path.resolve(
  process.cwd(),
  "components/chat-panel-share-handlers.ts",
);
const chatPanelShareHandlersSource = fs.readFileSync(chatPanelShareHandlersPath, "utf8");
const chatPanelShareCreateHandlerPath = path.resolve(
  process.cwd(),
  "components/chat-panel-share-create-handler.ts",
);
const chatPanelShareCreateHandlerSource = fs.readFileSync(
  chatPanelShareCreateHandlerPath,
  "utf8",
);
const chatPanelShareDisableHandlerPath = path.resolve(
  process.cwd(),
  "components/chat-panel-share-disable-handler.ts",
);
const chatPanelShareDisableHandlerSource = fs.readFileSync(
  chatPanelShareDisableHandlerPath,
  "utf8",
);
const chatPanelActionHandlerInputsPath = path.resolve(
  process.cwd(),
  "components/chat-panel-action-handler-inputs.ts",
);
const chatPanelOperatorHandlerInputPath = path.resolve(
  process.cwd(),
  "components/chat-panel-operator-handler-input.ts",
);
const chatPanelShareHandlerInputPath = path.resolve(
  process.cwd(),
  "components/chat-panel-share-handler-input.ts",
);
const chatPanelActionsResultBuilderPath = path.resolve(
  process.cwd(),
  "components/chat-panel-actions-result-builder.ts",
);
const chatPanelActionHandlerInputsTypesPath = path.resolve(
  process.cwd(),
  "components/chat-panel-action-handler-inputs.types.ts",
);
const chatPanelActionHandlerInputsSource = fs.readFileSync(
  chatPanelActionHandlerInputsPath,
  "utf8",
);
const chatPanelOperatorHandlerInputSource = fs.readFileSync(
  chatPanelOperatorHandlerInputPath,
  "utf8",
);
const chatPanelShareHandlerInputSource = fs.readFileSync(
  chatPanelShareHandlerInputPath,
  "utf8",
);
const chatPanelActionsResultBuilderSource = fs.readFileSync(
  chatPanelActionsResultBuilderPath,
  "utf8",
);
const chatPanelActionHandlerInputsTypesSource = fs.readFileSync(
  chatPanelActionHandlerInputsTypesPath,
  "utf8",
);
const chatPanelActionHandlerInputsLineCount =
  chatPanelActionHandlerInputsSource.split(/\r?\n/).length;
const chatPanelOperatorHandlerInputLineCount =
  chatPanelOperatorHandlerInputSource.split(/\r?\n/).length;
const chatPanelShareHandlerInputLineCount =
  chatPanelShareHandlerInputSource.split(/\r?\n/).length;
const chatPanelActionsResultBuilderLineCount =
  chatPanelActionsResultBuilderSource.split(/\r?\n/).length;
const chatPanelActionHandlerInputsTypesLineCount =
  chatPanelActionHandlerInputsTypesSource.split(/\r?\n/).length;
const chatPanelOperatorHandlersLineCount =
  chatPanelOperatorHandlersSource.split(/\r?\n/).length;
const chatPanelSendHandlerLineCount = chatPanelSendHandlerSource.split(/\r?\n/).length;
const chatPanelAdminHandlersLineCount = chatPanelAdminHandlersSource.split(/\r?\n/).length;
const chatPanelShareHandlersLineCount = chatPanelShareHandlersSource.split(/\r?\n/).length;
const chatPanelShareCreateHandlerLineCount =
  chatPanelShareCreateHandlerSource.split(/\r?\n/).length;
const chatPanelShareDisableHandlerLineCount =
  chatPanelShareDisableHandlerSource.split(/\r?\n/).length;

if (!source.includes('import { useChatPanelActions } from "./use-chat-panel-actions";')) {
  throw new Error("chat-panel.tsx must import useChatPanelActions");
}

if (!source.includes('import { buildChatPanelContentProps } from "./chat-panel-content-props";')) {
  throw new Error("chat-panel.tsx must import buildChatPanelContentProps");
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

if (!source.includes("buildChatPanelContentProps({ ...props, actions })")) {
  throw new Error("chat-panel.tsx must delegate content prop shaping to buildChatPanelContentProps");
}

for (const requiredContentImport of [
  'import { ChatPanelConversationContent } from "./chat-panel-conversation-content";',
  'import { ChatPanelManagementContent } from "./chat-panel-management-content";',
  'import { buildChatPanelConversationContentProps, buildChatPanelManagementContentProps } from "./chat-panel-section-props";',
  'import type { ChatPanelContentProps } from "./chat-panel-content.types";',
]) {
  if (!chatPanelContentSource.includes(requiredContentImport)) {
    throw new Error(
      `chat-panel-content.tsx must import delegated chat content boundaries: ${requiredContentImport}`,
    );
  }
}

for (const requiredContentUsage of [
  "<ChatPanelConversationContent {...buildChatPanelConversationContentProps(props)} />",
  "<ChatPanelManagementContent {...buildChatPanelManagementContentProps(props)} />",
]) {
  if (!chatPanelContentSource.includes(requiredContentUsage)) {
    throw new Error(
      `chat-panel-content.tsx must compose delegated chat content sections: ${requiredContentUsage}`,
    );
  }
}

for (const forbiddenContentToken of [
  'import { ChatAuditLogsCard } from "./chat-audit-logs-card";',
  'import { ChatPanelComposer } from "./chat-panel-composer";',
  'import { ChatConversationBar } from "./chat-conversation-bar";',
  'import { ChatPanelManagementSection } from "./chat-panel-management-section";',
  'import { ChatMessageThread } from "./chat-message-thread";',
  'import { ChatNotificationsCard } from "./chat-notifications-card";',
  "<ChatConversationBar",
  "<ChatPanelManagementSection",
  "<ChatAuditLogsCard",
  "<ChatNotificationsCard",
  "<ChatMessageThread",
  "<ChatPanelComposer",
  "activeConversationId={activeConversationId}",
  "auditLogs={auditLogs}",
  "canManageSharing={canManageSharing}",
  "canWriteWorkspace={canWriteWorkspace}",
  "draft={draft}",
]) {
  if (chatPanelContentSource.includes(forbiddenContentToken)) {
    throw new Error(
      `chat-panel-content.tsx must keep subsection rendering delegated: ${forbiddenContentToken}`,
    );
  }
}

const maxContentLines = 20;
if (chatPanelContentLineCount > maxContentLines) {
  throw new Error(`chat-panel-content.tsx exceeded ${maxContentLines} lines: ${chatPanelContentLineCount}`);
}

for (const requiredSectionPropsUsage of [
  'import type {',
  'from "./chat-panel-content.types";',
  "export function buildChatPanelConversationContentProps({",
  "}: ChatPanelContentProps): ChatPanelConversationContentProps {",
  "export function buildChatPanelManagementContentProps({",
  "}: ChatPanelContentProps): ChatPanelManagementContentProps {",
  "activeConversationId,",
  "handleSend,",
  "setDraft,",
  "auditLogs,",
  "handleCreateShareLink,",
  "sharePermission,",
  "unreadCount,",
]) {
  if (!chatPanelSectionPropsSource.includes(requiredSectionPropsUsage)) {
    throw new Error(
      `chat-panel-section-props.ts must own section prop assembly: ${requiredSectionPropsUsage}`,
    );
  }
}

for (const forbiddenSectionPropsToken of [
  'from "./chat-panel-conversation-content";',
  'from "./chat-panel-management-content";',
  "<ChatPanelConversationContent",
  "<ChatPanelManagementContent",
]) {
  if (chatPanelSectionPropsSource.includes(forbiddenSectionPropsToken)) {
    throw new Error(
      `chat-panel-section-props.ts must keep rendering delegated: ${forbiddenSectionPropsToken}`,
    );
  }
}

const maxSectionPropsLines = 95;
if (chatPanelSectionPropsLineCount > maxSectionPropsLines) {
  throw new Error(
    `chat-panel-section-props.ts exceeded ${maxSectionPropsLines} lines: ${chatPanelSectionPropsLineCount}`,
  );
}

for (const requiredContentTypeUsage of [
  'import type { ChatPanelActions } from "./chat-panel-actions-result.types";',
  "ChatPanelActions;",
  "export type ChatPanelContentProps = Pick<",
  "export type ChatPanelManagementContentProps = Pick<",
  "export type ChatPanelConversationContentProps = Pick<",
]) {
  if (!chatPanelContentTypesSource.includes(requiredContentTypeUsage)) {
    throw new Error(
      `chat-panel-content.types.ts must own shared chat content prop contracts: ${requiredContentTypeUsage}`,
    );
  }
}

for (const forbiddenContentTypeToken of [
  "ReturnType<",
  'from "./use-chat-panel-actions"',
]) {
  if (chatPanelContentTypesSource.includes(forbiddenContentTypeToken)) {
    throw new Error(
      `chat-panel-content.types.ts must keep chat action inference delegated: ${forbiddenContentTypeToken}`,
    );
  }
}

for (const requiredConversationContentImport of [
  'import { ChatConversationBar } from "./chat-conversation-bar";',
  'import { ChatMessageThread } from "./chat-message-thread";',
  'import { ChatPanelComposer } from "./chat-panel-composer";',
  'import type { ChatPanelConversationContentProps } from "./chat-panel-content.types";',
]) {
  if (!chatPanelConversationContentSource.includes(requiredConversationContentImport)) {
    throw new Error(
      `chat-panel-conversation-content.tsx must import delegated thread boundaries: ${requiredConversationContentImport}`,
    );
  }
}

for (const requiredConversationContentUsage of [
  "<ChatConversationBar",
  "<ChatMessageThread",
  "<ChatPanelComposer",
]) {
  if (!chatPanelConversationContentSource.includes(requiredConversationContentUsage)) {
    throw new Error(
      `chat-panel-conversation-content.tsx must compose delegated thread surfaces: ${requiredConversationContentUsage}`,
    );
  }
}

for (const requiredManagementContentImport of [
  'import { ChatAuditLogsCard } from "./chat-audit-logs-card";',
  'import { ChatNotificationsCard } from "./chat-notifications-card";',
  'import { ChatPanelManagementSection } from "./chat-panel-management-section";',
  'from "./chat-panel-management-content-props";',
  'import type { ChatPanelManagementContentProps } from "./chat-panel-content.types";',
]) {
  if (!chatPanelManagementContentSource.includes(requiredManagementContentImport)) {
    throw new Error(
      `chat-panel-management-content.tsx must import delegated management boundaries: ${requiredManagementContentImport}`,
    );
  }
}

for (const requiredManagementContentUsage of [
  "<ChatPanelManagementSection {...buildChatPanelManagementSectionProps(props)} />",
  "<ChatAuditLogsCard {...buildChatAuditLogsCardProps(props)} />",
  "<ChatNotificationsCard {...buildChatNotificationsCardProps(props)} />",
]) {
  if (!chatPanelManagementContentSource.includes(requiredManagementContentUsage)) {
    throw new Error(
      `chat-panel-management-content.tsx must compose delegated management surfaces: ${requiredManagementContentUsage}`,
    );
  }
}

for (const forbiddenManagementContentToken of [
  "canManageSharing={canManageSharing}",
  "onRefreshAuditLogs={handleRefreshAuditLogs}",
  "onMarkNotificationRead={onMarkNotificationRead}",
  "sharePermission={sharePermission}",
]) {
  if (chatPanelManagementContentSource.includes(forbiddenManagementContentToken)) {
    throw new Error(
      `chat-panel-management-content.tsx must keep card prop mapping delegated: ${forbiddenManagementContentToken}`,
    );
  }
}

for (const requiredManagementContentPropsUsage of [
  'import type { ChatAuditLogsCardProps } from "./chat-audit-logs-card.types";',
  'import type { ChatNotificationsCardProps } from "./chat-notifications-card.types";',
  'import type { ChatPanelManagementContentProps } from "./chat-panel-content.types";',
  'import type { ChatPanelManagementSectionProps } from "./chat-panel-management-section.types";',
  "export function buildChatPanelManagementSectionProps(",
  "export function buildChatAuditLogsCardProps(",
  "export function buildChatNotificationsCardProps(",
  "onCreateShareLink: handleCreateShareLink,",
  "onDisableShareLink: handleDisableShareLink,",
  "onReindexKnowledge: handleReindexKnowledge,",
  "onRefreshAuditLogs: handleRefreshAuditLogs,",
  "onMarkNotificationRead,",
]) {
  if (!chatPanelManagementContentPropsSource.includes(requiredManagementContentPropsUsage)) {
    throw new Error(
      `chat-panel-management-content-props.ts must own management card prop assembly: ${requiredManagementContentPropsUsage}`,
    );
  }
}

for (const forbiddenManagementContentPropsToken of [
  'from "./chat-panel-management-content";',
  "<ChatPanelManagementSection",
  "<ChatAuditLogsCard",
  "<ChatNotificationsCard",
]) {
  if (chatPanelManagementContentPropsSource.includes(forbiddenManagementContentPropsToken)) {
    throw new Error(
      `chat-panel-management-content-props.ts must keep rendering delegated: ${forbiddenManagementContentPropsToken}`,
    );
  }
}

const maxManagementContentPropsLines = 75;
if (chatPanelManagementContentPropsLineCount > maxManagementContentPropsLines) {
  throw new Error(
    `chat-panel-management-content-props.ts exceeded ${maxManagementContentPropsLines} lines: ${chatPanelManagementContentPropsLineCount}`,
  );
}

for (const requiredImport of [
  'import { ChatKnowledgeCard } from "./chat-knowledge-card";',
  'import { ChatShareLinksCard } from "./chat-share-links-card";',
]) {
  if (!chatPanelManagementSectionSource.includes(requiredImport)) {
    throw new Error(`chat-panel-management-section.tsx must import delegated management cards: ${requiredImport}`);
  }
}

for (const requiredUsage of [
  "<ChatKnowledgeCard",
  "<ChatShareLinksCard",
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

for (const requiredHeaderCopyUsage of [
  'import { useStoredLocale } from "../lib/locale";',
  'import { getWorkspaceRoleLabel } from "../lib/workspace-role-display";',
  'import { getChatPanelDisplayCopy } from "./chat-panel-display-copy";',
  "const { locale } = useStoredLocale();",
  "const copy = getChatPanelDisplayCopy(locale);",
  "getWorkspaceRoleLabel(locale, workspaceRole)",
]) {
  if (!chatPanelHeaderSource.includes(requiredHeaderCopyUsage)) {
    throw new Error(`chat-panel-header.tsx must delegate localized display copy: ${requiredHeaderCopyUsage}`);
  }
}

for (const forbiddenHeaderCopyToken of ['"Agent"', '"Chat Assistant"', '"Settings"']) {
  if (chatPanelHeaderSource.includes(forbiddenHeaderCopyToken)) {
    throw new Error(`chat-panel-header.tsx must not hardcode localized labels: ${forbiddenHeaderCopyToken}`);
  }
}

if (!chatConversationBarSource.includes("className={`conversation-pill ${conversation.id === activeConversationId ? \"active\" : \"\"}`}")) {
  throw new Error("chat-conversation-bar.tsx must keep conversation pill rendering");
}

for (const requiredConversationBarCopyUsage of [
  'import { useStoredLocale } from "../lib/locale";',
  'import { getChatPanelDisplayCopy } from "./chat-panel-display-copy";',
  "const { locale } = useStoredLocale();",
  "const copy = getChatPanelDisplayCopy(locale);",
  "copy.newConversationLabel",
  "copy.syncingLabel",
  "copy.syncRemindersLabel",
]) {
  if (!chatConversationBarSource.includes(requiredConversationBarCopyUsage)) {
    throw new Error(
      `chat-conversation-bar.tsx must delegate localized conversation actions: ${requiredConversationBarCopyUsage}`,
    );
  }
}

for (const forbiddenConversationBarCopyToken of ['"New conversation"', '"Syncing..."', '"Sync reminders"']) {
  if (chatConversationBarSource.includes(forbiddenConversationBarCopyToken)) {
    throw new Error(
      `chat-conversation-bar.tsx must not hardcode localized action labels: ${forbiddenConversationBarCopyToken}`,
    );
  }
}

for (const requiredComposerCopyUsage of [
  'import { useStoredLocale } from "../lib/locale";',
  'import { getChatPanelDisplayCopy } from "./chat-panel-display-copy";',
  "const { locale } = useStoredLocale();",
  "const copy = getChatPanelDisplayCopy(locale);",
  "copy.composerPlaceholder",
  "copy.composerViewerPlaceholder",
  "copy.workingLabel",
  "copy.sendLabel",
]) {
  if (!chatPanelComposerSource.includes(requiredComposerCopyUsage)) {
    throw new Error(`chat-panel-composer.tsx must delegate localized composer copy: ${requiredComposerCopyUsage}`);
  }
}

for (const forbiddenComposerCopyToken of [
  '"Examples: save this snack note',
  '"Viewer mode: chat creation is disabled for this shared workspace."',
  '"Working..."',
  '"Send"',
]) {
  if (chatPanelComposerSource.includes(forbiddenComposerCopyToken)) {
    throw new Error(`chat-panel-composer.tsx must not hardcode localized composer labels: ${forbiddenComposerCopyToken}`);
  }
}

if (!chatMessageThreadSource.includes('import { ChatMessageSources } from "./chat-message-sources";')) {
  throw new Error("chat-message-thread.tsx must import ChatMessageSources");
}

if (!chatMessageThreadSource.includes("<ChatMessageSources")) {
  throw new Error("chat-message-thread.tsx must delegate assistant source rendering to ChatMessageSources");
}

for (const requiredActionsImport of [
  'from "./chat-panel-actions-result-builder";',
  'from "./chat-panel-action-handler-inputs";',
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
  "buildChatPanelOperatorHandlerInput({ ...props, ...state })",
  "buildChatPanelShareHandlerInput({ ...props, ...state })",
  "createChatPanelOperatorHandlers(",
  "createChatPanelShareHandlers(",
  "buildChatPanelActionsResult({",
  "...derivedData,",
  "...state,",
  "derivedData,",
  "operatorHandlers,",
  "shareHandlers,",
  "state,",
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
  "creatingShare={",
  "disablingShareId={",
  "handleCreateShareLink={",
  "handleDisableShareLink={",
  "handleRefreshAuditLogs={",
  "handleReindexKnowledge={",
  "handleSend={",
  "handleSyncNotifications={",
  "latestShareUrl={",
  "refreshingAudit={",
  "reindexing={",
  "setDraft={",
  "setShareMaxUses={",
  "setShareName={",
  "setSharePermission={",
  "shareMaxUses={",
  "shareName={",
  "sharePermission={",
  "syncing={",
  "unreadCount={",
  "knowledgeStats.chunk_count",
  "auditLogs.map((item)",
  "shareLinks.map((item)",
  "notifications.slice(0, 6).map((notification)",
  "metadata_json.sources.slice(0, 3).map((source, index)",
  'className={`message ${message.role === "assistant" ? "assistant" : ""}`}',
  "className={`conversation-pill ${conversation.id === activeConversationId ? \"active\" : \"\"}`}",
  'href={`/app/workspaces/${workspaceId}/settings`}',
  'import { ChatKnowledgeCard } from "./chat-knowledge-card";',
  'import { ChatShareLinksCard } from "./chat-share-links-card";',
  "<ChatKnowledgeCard",
  "<ChatShareLinksCard",
  'placeholder={',
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`chat-panel.tsx must keep action state and handler logic delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 80;
if (lineCount > maxAllowedLines) {
  throw new Error(`chat-panel.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

for (const requiredContentPropsUsage of [
  'import { buildChatPanelContentActionProps } from "./chat-panel-content-action-props";',
  'import { buildChatPanelContentDataProps } from "./chat-panel-content-data-props";',
  "export function buildChatPanelContentProps(props: BuildChatPanelContentPropsInput): ChatPanelContentProps {",
  "...buildChatPanelContentDataProps(props),",
  "...buildChatPanelContentActionProps(props),",
]) {
  if (!chatPanelContentPropsSource.includes(requiredContentPropsUsage)) {
    throw new Error(
      `chat-panel-content-props.ts must own content prop assembly: ${requiredContentPropsUsage}`,
    );
  }
}

for (const forbiddenContentPropsToken of [
  "actions: ChatPanelActions;",
  "props: ChatPanelProps;",
  "type BuildChatPanelContentPropsInput = {",
  "const input = { actions, props };",
]) {
  if (chatPanelContentPropsSource.includes(forbiddenContentPropsToken)) {
    throw new Error(
      `chat-panel-content-props.ts must keep content-prop input typing delegated: ${forbiddenContentPropsToken}`,
    );
  }
}

for (const forbiddenContentPropsToken of [
  "<ChatPanelContent",
  "useChatPanelActions(",
  "useState(",
  "useMemo(",
  "creatingShare: actions.creatingShare,",
  "activeConversationId: props.activeConversationId,",
  "unreadCount: actions.unreadCount,",
]) {
  if (chatPanelContentPropsSource.includes(forbiddenContentPropsToken)) {
    throw new Error(
      `chat-panel-content-props.ts must keep rendering and action orchestration delegated: ${forbiddenContentPropsToken}`,
    );
  }
}

const maxContentPropsLines = 20;
if (chatPanelContentPropsLineCount > maxContentPropsLines) {
  throw new Error(
    `chat-panel-content-props.ts exceeded ${maxContentPropsLines} lines: ${chatPanelContentPropsLineCount}`,
  );
}

for (const requiredContentActionPropsUsage of [
  'from "./chat-panel-content-props.types";',
  "export function buildChatPanelContentActionProps(props: BuildChatPanelContentPropsInput) {",
  "creatingShare: props.actions.creatingShare,",
  "handleCreateShareLink: props.actions.handleCreateShareLink,",
  "handleSend: props.actions.handleSend,",
  "unreadCount: props.actions.unreadCount,",
]) {
  if (!chatPanelContentActionPropsSource.includes(requiredContentActionPropsUsage)) {
    throw new Error(
      `chat-panel-content-action-props.ts must own action-prop assembly: ${requiredContentActionPropsUsage}`,
    );
  }
}

for (const forbiddenContentActionPropsToken of [
  "activeConversationId: props.activeConversationId,",
  "auditLogs: props.auditLogs,",
  "messages: props.messages,",
  "shareLinks: props.shareLinks,",
]) {
  if (chatPanelContentActionPropsSource.includes(forbiddenContentActionPropsToken)) {
    throw new Error(
      `chat-panel-content-action-props.ts must keep data-prop assembly delegated: ${forbiddenContentActionPropsToken}`,
    );
  }
}

const maxContentActionPropsLines = 35;
if (chatPanelContentActionPropsLineCount > maxContentActionPropsLines) {
  throw new Error(
    `chat-panel-content-action-props.ts exceeded ${maxContentActionPropsLines} lines: ${chatPanelContentActionPropsLineCount}`,
  );
}

for (const requiredContentDataPropsUsage of [
  'from "./chat-panel-content-props.types";',
  "export function buildChatPanelContentDataProps(props: BuildChatPanelContentPropsInput) {",
  "activeConversationId: props.activeConversationId,",
  "auditLogs: props.auditLogs,",
  "messages: props.messages,",
  "shareLinks: props.shareLinks,",
]) {
  if (!chatPanelContentDataPropsSource.includes(requiredContentDataPropsUsage)) {
    throw new Error(
      `chat-panel-content-data-props.ts must own data-prop assembly: ${requiredContentDataPropsUsage}`,
    );
  }
}

for (const forbiddenContentDataPropsToken of [
  "creatingShare: actions.creatingShare,",
  "handleCreateShareLink: actions.handleCreateShareLink,",
  "handleSend: actions.handleSend,",
  "unreadCount: actions.unreadCount,",
]) {
  if (chatPanelContentDataPropsSource.includes(forbiddenContentDataPropsToken)) {
    throw new Error(
      `chat-panel-content-data-props.ts must keep action-prop assembly delegated: ${forbiddenContentDataPropsToken}`,
    );
  }
}

const maxContentDataPropsLines = 35;
if (chatPanelContentDataPropsLineCount > maxContentDataPropsLines) {
  throw new Error(
    `chat-panel-content-data-props.ts exceeded ${maxContentDataPropsLines} lines: ${chatPanelContentDataPropsLineCount}`,
  );
}

for (const requiredContentPropsTypesUsage of [
  'import type { ChatPanelActions } from "./chat-panel-actions-result.types"; import type { ChatPanelProps } from "./chat-panel.types"; export type BuildChatPanelContentPropsInput = ChatPanelProps & { actions: ChatPanelActions };',
]) {
  if (!chatPanelContentPropsTypesSource.includes(requiredContentPropsTypesUsage)) {
    throw new Error(
      `chat-panel-content-props.types.ts must own content-prop input typing: ${requiredContentPropsTypesUsage}`,
    );
  }
}

if (chatPanelContentPropsTypesLineCount > 2) {
  throw new Error(
    `chat-panel-content-props.types.ts exceeded 2 lines: ${chatPanelContentPropsTypesLineCount}`,
  );
}

const maxActionsLines = 40;
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
  "draft,",
  "sharePermission,",
  "handleSend,",
  "handleCreateShareLink,",
]) {
  if (chatPanelActionsSource.includes(forbiddenActionsToken)) {
    throw new Error(`use-chat-panel-actions.ts must keep state and derived data delegated: ${forbiddenActionsToken}`);
  }
}

for (const requiredActionHandlerInputsUsage of [
  'export { buildChatPanelOperatorHandlerInput } from "./chat-panel-operator-handler-input";',
  'export { buildChatPanelShareHandlerInput } from "./chat-panel-share-handler-input";',
]) {
  if (!chatPanelActionHandlerInputsSource.includes(requiredActionHandlerInputsUsage)) {
    throw new Error(
      `chat-panel-action-handler-inputs.ts must own action input shaping: ${requiredActionHandlerInputsUsage}`,
    );
  }
}

for (const forbiddenActionHandlerInputsTypingToken of [
  "export type UseChatPanelActionsProps = {",
  "export type BuildChatPanelOperatorHandlerInput = {",
  "export type BuildChatPanelShareHandlerInput = {",
]) {
  if (chatPanelActionHandlerInputsSource.includes(forbiddenActionHandlerInputsTypingToken)) {
    throw new Error(
      `chat-panel-action-handler-inputs.ts must keep action input typing delegated: ${forbiddenActionHandlerInputsTypingToken}`,
    );
  }
}

for (const forbiddenActionHandlerInputsToken of [
  'from "./chat-panel-action-handler-inputs.types";',
  "export function buildChatPanelOperatorHandlerInput(",
  "export function buildChatPanelShareHandlerInput(",
  "draft: state.draft,",
  "onCreateShareLink: props.onCreateShareLink,",
  "useChatPanelActionState(",
  "useChatPanelActionDerivedData(",
  "createChatPanelOperatorHandlers(",
  "createChatPanelShareHandlers(",
  "unreadCount: derivedData.unreadCount,",
  "handleDisableShareLink: shareHandlers.handleDisableShareLink,",
]) {
  if (chatPanelActionHandlerInputsSource.includes(forbiddenActionHandlerInputsToken)) {
    throw new Error(
      `chat-panel-action-handler-inputs.ts must keep action-result assembly delegated: ${forbiddenActionHandlerInputsToken}`,
    );
  }
}

const maxActionHandlerInputsLines = 5;
if (chatPanelActionHandlerInputsLineCount > maxActionHandlerInputsLines) {
  throw new Error(
    `chat-panel-action-handler-inputs.ts exceeded ${maxActionHandlerInputsLines} lines: ${chatPanelActionHandlerInputsLineCount}`,
  );
}

for (const requiredOperatorHandlerInputUsage of [
  'from "./chat-panel-action-handler-inputs.types";',
  "export function buildChatPanelOperatorHandlerInput(",
  "}: BuildChatPanelOperatorHandlerInput) {",
  "draft,",
  "onSendMessage,",
  "setSyncing,",
]) {
  if (!chatPanelOperatorHandlerInputSource.includes(requiredOperatorHandlerInputUsage)) {
    throw new Error(
      `chat-panel-operator-handler-input.ts must own operator input shaping: ${requiredOperatorHandlerInputUsage}`,
    );
  }
}

for (const forbiddenOperatorHandlerInputToken of [
  "onCreateShareLink,",
  "onDisableShareLink,",
  "setCreatingShare,",
  "setShareName,",
]) {
  if (chatPanelOperatorHandlerInputSource.includes(forbiddenOperatorHandlerInputToken)) {
    throw new Error(
      `chat-panel-operator-handler-input.ts must keep share input shaping delegated: ${forbiddenOperatorHandlerInputToken}`,
    );
  }
}

const maxOperatorHandlerInputLines = 25;
if (chatPanelOperatorHandlerInputLineCount > maxOperatorHandlerInputLines) {
  throw new Error(
    `chat-panel-operator-handler-input.ts exceeded ${maxOperatorHandlerInputLines} lines: ${chatPanelOperatorHandlerInputLineCount}`,
  );
}

for (const requiredShareHandlerInputUsage of [
  'from "./chat-panel-action-handler-inputs.types";',
  "export function buildChatPanelShareHandlerInput(",
  "}: BuildChatPanelShareHandlerInput) {",
  "onCreateShareLink,",
  "onDisableShareLink,",
  "sharePermission,",
]) {
  if (!chatPanelShareHandlerInputSource.includes(requiredShareHandlerInputUsage)) {
    throw new Error(
      `chat-panel-share-handler-input.ts must own share input shaping: ${requiredShareHandlerInputUsage}`,
    );
  }
}

for (const forbiddenShareHandlerInputToken of [
  "draft,",
  "onSendMessage,",
  "setLoading,",
  "setSyncing,",
]) {
  if (chatPanelShareHandlerInputSource.includes(forbiddenShareHandlerInputToken)) {
    throw new Error(
      `chat-panel-share-handler-input.ts must keep operator input shaping delegated: ${forbiddenShareHandlerInputToken}`,
    );
  }
}

const maxShareHandlerInputLines = 25;
if (chatPanelShareHandlerInputLineCount > maxShareHandlerInputLines) {
  throw new Error(
    `chat-panel-share-handler-input.ts exceeded ${maxShareHandlerInputLines} lines: ${chatPanelShareHandlerInputLineCount}`,
  );
}

for (const requiredActionsResultBuilderUsage of [
  'import type { BuildChatPanelActionsResultInput } from "./chat-panel-action-handler-inputs.types";',
  "export function buildChatPanelActionsResult(",
  "}: BuildChatPanelActionsResultInput) {",
  "draft,",
  "unreadCount,",
  "handleDisableShareLink: shareHandlers.handleDisableShareLink,",
]) {
  if (!chatPanelActionsResultBuilderSource.includes(requiredActionsResultBuilderUsage)) {
    throw new Error(
      `chat-panel-actions-result-builder.ts must own action result assembly: ${requiredActionsResultBuilderUsage}`,
    );
  }
}

for (const forbiddenActionsResultBuilderToken of [
  'from "./use-chat-panel-actions";',
  "createChatPanelOperatorHandlers(",
  "createChatPanelShareHandlers(",
  "useChatPanelActionState(",
]) {
  if (chatPanelActionsResultBuilderSource.includes(forbiddenActionsResultBuilderToken)) {
    throw new Error(
      `chat-panel-actions-result-builder.ts must keep hook and handler orchestration delegated: ${forbiddenActionsResultBuilderToken}`,
    );
  }
}

const maxActionsResultBuilderLines = 40;
if (chatPanelActionsResultBuilderLineCount > maxActionsResultBuilderLines) {
  throw new Error(
    `chat-panel-actions-result-builder.ts exceeded ${maxActionsResultBuilderLines} lines: ${chatPanelActionsResultBuilderLineCount}`,
  );
}

for (const requiredActionHandlerInputsTypesUsage of [
  'import type { NotificationItem } from "../lib/types"; import type { ChatPanelActionDerivedData } from "./chat-panel-action-derived-data-result.types"; import type { ChatPanelActionState } from "./chat-panel-action-state-result.types"; export type UseChatPanelActionsProps = { latestSharePath: string; notifications: NotificationItem[]; onCreateShareLink: (input: { name?: string; permission_code: string; max_uses?: number | null }) => Promise<void>; onDisableShareLink: (shareLinkId: string) => Promise<void>; onRefreshAuditLogs: () => Promise<void>; onReindexKnowledge: () => Promise<void>; onSyncNotifications: () => Promise<void>; onSendMessage: (message: string) => Promise<void> };',
  'export type BuildChatPanelOperatorHandlerInput = UseChatPanelActionsProps & ChatPanelActionState; export type BuildChatPanelShareHandlerInput = UseChatPanelActionsProps & ChatPanelActionState; export type BuildChatPanelActionsResultInput = ChatPanelActionDerivedData & ChatPanelActionState & { operatorHandlers: { handleRefreshAuditLogs: () => Promise<void>; handleReindexKnowledge: () => Promise<void>; handleSend: () => Promise<void>; handleSyncNotifications: () => Promise<void> }; shareHandlers: { handleCreateShareLink: () => Promise<void>; handleDisableShareLink: (shareLinkId: string) => Promise<void> } };',
]) {
  if (!chatPanelActionHandlerInputsTypesSource.includes(requiredActionHandlerInputsTypesUsage)) {
    throw new Error(
      `chat-panel-action-handler-inputs.types.ts must own action input/result typing: ${requiredActionHandlerInputsTypesUsage}`,
    );
  }
}

if (chatPanelActionHandlerInputsTypesLineCount > 3) {
  throw new Error(
    `chat-panel-action-handler-inputs.types.ts exceeded 3 lines: ${chatPanelActionHandlerInputsTypesLineCount}`,
  );
}

for (const requiredOperatorHandlersImport of [
  'from "./chat-panel-admin-handlers";',
  'from "./chat-panel-send-handler";',
  'from "./chat-panel-operator-handlers.types";',
]) {
  if (!chatPanelOperatorHandlersSource.includes(requiredOperatorHandlersImport)) {
    throw new Error(
      `chat-panel-operator-handlers.ts must import delegated operator handler groups: ${requiredOperatorHandlersImport}`,
    );
  }
}

for (const requiredOperatorHandlersUsage of [
  "createChatPanelSendHandler(input)",
  "createChatPanelAdminHandlers(input)",
  "handleSend,",
  "...adminHandlers,",
]) {
  if (!chatPanelOperatorHandlersSource.includes(requiredOperatorHandlersUsage)) {
    throw new Error(
      `chat-panel-operator-handlers.ts must delegate operator handler assembly: ${requiredOperatorHandlersUsage}`,
    );
  }
}

for (const forbiddenOperatorHandlersToken of [
  'from "./chat-panel-action-copy";',
  'from "./chat-panel-action-helpers";',
  "const value = draft.trim()",
  "setLoading(true)",
  "setSyncing(true)",
  "setReindexing(true)",
  "setRefreshingAudit(true)",
]) {
  if (chatPanelOperatorHandlersSource.includes(forbiddenOperatorHandlersToken)) {
    throw new Error(
      `chat-panel-operator-handlers.ts must keep operator internals delegated: ${forbiddenOperatorHandlersToken}`,
    );
  }
}

const maxOperatorHandlersLines = 20;
if (chatPanelOperatorHandlersLineCount > maxOperatorHandlersLines) {
  throw new Error(
    `chat-panel-operator-handlers.ts exceeded ${maxOperatorHandlersLines} lines: ${chatPanelOperatorHandlersLineCount}`,
  );
}

for (const requiredSendHandlerUsage of [
  'from "./chat-panel-action-copy";',
  'from "./chat-panel-action-helpers";',
  'from "./chat-panel-operator-handlers.types";',
  "export function createChatPanelSendHandler(",
  "return async function handleSend() {",
  "const value = draft.trim();",
  "setLoading(true);",
  'setError("");',
  'setDraft("");',
  "await onSendMessage(value);",
]) {
  if (!chatPanelSendHandlerSource.includes(requiredSendHandlerUsage)) {
    throw new Error(
      `chat-panel-send-handler.ts must own send handler flow: ${requiredSendHandlerUsage}`,
    );
  }
}

for (const forbiddenSendHandlerToken of [
  "onSyncNotifications()",
  "onReindexKnowledge()",
  "onRefreshAuditLogs()",
  "setSyncing(true)",
  "setReindexing(true)",
  "setRefreshingAudit(true)",
]) {
  if (chatPanelSendHandlerSource.includes(forbiddenSendHandlerToken)) {
    throw new Error(
      `chat-panel-send-handler.ts must keep admin handlers delegated: ${forbiddenSendHandlerToken}`,
    );
  }
}

const maxSendHandlerLines = 35;
if (chatPanelSendHandlerLineCount > maxSendHandlerLines) {
  throw new Error(
    `chat-panel-send-handler.ts exceeded ${maxSendHandlerLines} lines: ${chatPanelSendHandlerLineCount}`,
  );
}

for (const requiredAdminHandlersUsage of [
  'from "./chat-panel-action-copy";',
  'from "./chat-panel-action-helpers";',
  'from "./chat-panel-operator-handlers.types";',
  "export function createChatPanelAdminHandlers(",
  "async handleSyncNotifications() {",
  "async handleReindexKnowledge() {",
  "async handleRefreshAuditLogs() {",
  "await onSyncNotifications();",
  "await onReindexKnowledge();",
  "await onRefreshAuditLogs();",
]) {
  if (!chatPanelAdminHandlersSource.includes(requiredAdminHandlersUsage)) {
    throw new Error(
      `chat-panel-admin-handlers.ts must own admin handler flow: ${requiredAdminHandlersUsage}`,
    );
  }
}

for (const forbiddenAdminHandlersToken of [
  "draft.trim()",
  "setDraft(",
  "setLoading(true)",
  "await onSendMessage(",
]) {
  if (chatPanelAdminHandlersSource.includes(forbiddenAdminHandlersToken)) {
    throw new Error(
      `chat-panel-admin-handlers.ts must keep send handler delegated: ${forbiddenAdminHandlersToken}`,
    );
  }
}

const maxAdminHandlersLines = 50;
if (chatPanelAdminHandlersLineCount > maxAdminHandlersLines) {
  throw new Error(
    `chat-panel-admin-handlers.ts exceeded ${maxAdminHandlersLines} lines: ${chatPanelAdminHandlersLineCount}`,
  );
}

for (const requiredShareHandlersImport of [
  'from "./chat-panel-share-create-handler";',
  'from "./chat-panel-share-disable-handler";',
  'from "./chat-panel-share-handlers.types";',
]) {
  if (!chatPanelShareHandlersSource.includes(requiredShareHandlersImport)) {
    throw new Error(
      `chat-panel-share-handlers.ts must import delegated share handler groups: ${requiredShareHandlersImport}`,
    );
  }
}

for (const requiredShareHandlersUsage of [
  "createChatPanelShareCreateHandler(input)",
  "createChatPanelShareDisableHandler(input)",
  "handleCreateShareLink,",
  "handleDisableShareLink,",
]) {
  if (!chatPanelShareHandlersSource.includes(requiredShareHandlersUsage)) {
    throw new Error(
      `chat-panel-share-handlers.ts must delegate share handler assembly: ${requiredShareHandlersUsage}`,
    );
  }
}

for (const forbiddenShareHandlersToken of [
  'from "./chat-panel-action-copy";',
  'from "./chat-panel-action-helpers";',
  "buildCreateShareLinkInput(",
  "copy.shareCreationFailed",
  "copy.shareUpdateFailed",
  "setCreatingShare(true)",
  "setDisablingShareId(shareLinkId)",
]) {
  if (chatPanelShareHandlersSource.includes(forbiddenShareHandlersToken)) {
    throw new Error(
      `chat-panel-share-handlers.ts must keep share internals delegated: ${forbiddenShareHandlersToken}`,
    );
  }
}

const maxShareHandlersLines = 20;
if (chatPanelShareHandlersLineCount > maxShareHandlersLines) {
  throw new Error(
    `chat-panel-share-handlers.ts exceeded ${maxShareHandlersLines} lines: ${chatPanelShareHandlersLineCount}`,
  );
}

for (const requiredShareCreateHandlerUsage of [
  'from "./chat-panel-action-copy";',
  'from "./chat-panel-action-helpers";',
  'from "./chat-panel-share-handlers.types";',
  "export function createChatPanelShareCreateHandler(",
  "return async function handleCreateShareLink() {",
  "await onCreateShareLink(",
  "buildCreateShareLinkInput(",
  'setShareName("");',
  'setShareMaxUses("");',
  "copy.shareCreationFailed",
]) {
  if (!chatPanelShareCreateHandlerSource.includes(requiredShareCreateHandlerUsage)) {
    throw new Error(
      `chat-panel-share-create-handler.ts must own share-create flow: ${requiredShareCreateHandlerUsage}`,
    );
  }
}

for (const forbiddenShareCreateHandlerToken of [
  "onDisableShareLink(",
  "setDisablingShareId(",
  "copy.shareUpdateFailed",
]) {
  if (chatPanelShareCreateHandlerSource.includes(forbiddenShareCreateHandlerToken)) {
    throw new Error(
      `chat-panel-share-create-handler.ts must keep disable-share flow delegated: ${forbiddenShareCreateHandlerToken}`,
    );
  }
}

const maxShareCreateHandlerLines = 40;
if (chatPanelShareCreateHandlerLineCount > maxShareCreateHandlerLines) {
  throw new Error(
    `chat-panel-share-create-handler.ts exceeded ${maxShareCreateHandlerLines} lines: ${chatPanelShareCreateHandlerLineCount}`,
  );
}

for (const requiredShareDisableHandlerUsage of [
  'from "./chat-panel-action-copy";',
  'from "./chat-panel-action-helpers";',
  'from "./chat-panel-share-handlers.types";',
  "export function createChatPanelShareDisableHandler(",
  "return async function handleDisableShareLink(shareLinkId: string) {",
  "setDisablingShareId(shareLinkId);",
  "await onDisableShareLink(shareLinkId);",
  'setDisablingShareId("");',
  "copy.shareUpdateFailed",
]) {
  if (!chatPanelShareDisableHandlerSource.includes(requiredShareDisableHandlerUsage)) {
    throw new Error(
      `chat-panel-share-disable-handler.ts must own share-disable flow: ${requiredShareDisableHandlerUsage}`,
    );
  }
}

for (const forbiddenShareDisableHandlerToken of [
  "onCreateShareLink(",
  "buildCreateShareLinkInput(",
  "setShareName(",
  "setShareMaxUses(",
  "copy.shareCreationFailed",
]) {
  if (chatPanelShareDisableHandlerSource.includes(forbiddenShareDisableHandlerToken)) {
    throw new Error(
      `chat-panel-share-disable-handler.ts must keep share-create flow delegated: ${forbiddenShareDisableHandlerToken}`,
    );
  }
}

const maxShareDisableHandlerLines = 30;
if (chatPanelShareDisableHandlerLineCount > maxShareDisableHandlerLines) {
  throw new Error(
    `chat-panel-share-disable-handler.ts exceeded ${maxShareDisableHandlerLines} lines: ${chatPanelShareDisableHandlerLineCount}`,
  );
}

console.log("chat-panel structure verification passed");

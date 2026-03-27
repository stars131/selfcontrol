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
const chatPanelContentPropsTypesPath = path.resolve(
  process.cwd(),
  "components/chat-panel-content-props.types.ts",
);
const chatPanelContentPropsTypesSource = fs.readFileSync(
  chatPanelContentPropsTypesPath,
  "utf8",
);
const chatPanelContentPropsLineCount = chatPanelContentPropsSource.split(/\r?\n/).length;
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
const chatPanelActionHandlerInputsPath = path.resolve(
  process.cwd(),
  "components/chat-panel-action-handler-inputs.ts",
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
const chatPanelActionsResultBuilderLineCount =
  chatPanelActionsResultBuilderSource.split(/\r?\n/).length;
const chatPanelActionHandlerInputsTypesLineCount =
  chatPanelActionHandlerInputsTypesSource.split(/\r?\n/).length;

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

if (!source.includes("buildChatPanelContentProps({ actions, props })")) {
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
  "buildChatPanelOperatorHandlerInput({ props, state })",
  "buildChatPanelShareHandlerInput({ props, state })",
  "createChatPanelOperatorHandlers(",
  "createChatPanelShareHandlers(",
  "buildChatPanelActionsResult({",
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
  "export function buildChatPanelContentProps({",
  "}: BuildChatPanelContentPropsInput): ChatPanelContentProps {",
  "creatingShare: actions.creatingShare,",
  "activeConversationId: props.activeConversationId,",
  "unreadCount: actions.unreadCount,",
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
]) {
  if (chatPanelContentPropsSource.includes(forbiddenContentPropsToken)) {
    throw new Error(
      `chat-panel-content-props.ts must keep rendering and action orchestration delegated: ${forbiddenContentPropsToken}`,
    );
  }
}

const maxContentPropsLines = 70;
if (chatPanelContentPropsLineCount > maxContentPropsLines) {
  throw new Error(
    `chat-panel-content-props.ts exceeded ${maxContentPropsLines} lines: ${chatPanelContentPropsLineCount}`,
  );
}

for (const requiredContentPropsTypesUsage of [
  'import type { ChatPanelActions } from "./chat-panel-actions-result.types"; import type { ChatPanelProps } from "./chat-panel.types"; export type BuildChatPanelContentPropsInput = { actions: ChatPanelActions; props: ChatPanelProps };',
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
  'from "./chat-panel-action-handler-inputs.types";',
  "export function buildChatPanelOperatorHandlerInput(",
  "export function buildChatPanelShareHandlerInput(",
  "}: BuildChatPanelOperatorHandlerInput) {",
  "}: BuildChatPanelShareHandlerInput) {",
  "draft: state.draft,",
  "onCreateShareLink: props.onCreateShareLink,",
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

const maxActionHandlerInputsLines = 50;
if (chatPanelActionHandlerInputsLineCount > maxActionHandlerInputsLines) {
  throw new Error(
    `chat-panel-action-handler-inputs.ts exceeded ${maxActionHandlerInputsLines} lines: ${chatPanelActionHandlerInputsLineCount}`,
  );
}

for (const requiredActionsResultBuilderUsage of [
  'import type { BuildChatPanelActionsResultInput } from "./chat-panel-action-handler-inputs.types";',
  "export function buildChatPanelActionsResult(",
  "}: BuildChatPanelActionsResultInput) {",
  "draft: state.draft,",
  "unreadCount: derivedData.unreadCount,",
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
  'export type BuildChatPanelOperatorHandlerInput = { props: UseChatPanelActionsProps; state: ChatPanelActionState }; export type BuildChatPanelShareHandlerInput = { props: UseChatPanelActionsProps; state: ChatPanelActionState }; export type BuildChatPanelActionsResultInput = { derivedData: ChatPanelActionDerivedData; operatorHandlers: { handleRefreshAuditLogs: () => Promise<void>; handleReindexKnowledge: () => Promise<void>; handleSend: () => Promise<void>; handleSyncNotifications: () => Promise<void> }; shareHandlers: { handleCreateShareLink: () => Promise<void>; handleDisableShareLink: (shareLinkId: string) => Promise<void> }; state: ChatPanelActionState };',
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

console.log("chat-panel structure verification passed");

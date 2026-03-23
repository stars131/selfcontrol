import fs from "node:fs";
import path from "node:path";

const workspaceShellPath = path.resolve(process.cwd(), "components/workspace-shell-client.tsx");
const workspaceShellClientPropsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-client-props.ts",
);
const workspaceShellPanelsPath = path.resolve(process.cwd(), "components/workspace-shell-panels.tsx");
const workspaceShellRefreshersPath = path.resolve(process.cwd(), "components/use-workspace-shell-refreshers.ts");
const workspaceShellActionsPath = path.resolve(process.cwd(), "components/use-workspace-shell-actions.ts");
const workspaceShellEffectsPath = path.resolve(process.cwd(), "components/use-workspace-shell-effects.ts");
const workspaceShellInitialLoadPath = path.resolve(
  process.cwd(),
  "components/use-workspace-shell-initial-load.ts",
);
const workspaceShellInitialLoadHelpersPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-initial-load-helpers.ts",
);
const workspaceShellMediaFilterActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-media-filter-actions.ts",
);
const workspaceShellChatRecordActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-chat-record-actions.ts",
);
const workspaceShellAdminActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-admin-actions.ts",
);
const source = fs.readFileSync(workspaceShellPath, "utf8");
const clientPropsSource = fs.readFileSync(workspaceShellClientPropsPath, "utf8");
const panelsSource = fs.readFileSync(workspaceShellPanelsPath, "utf8");
const refreshersSource = fs.readFileSync(workspaceShellRefreshersPath, "utf8");
const actionsSource = fs.readFileSync(workspaceShellActionsPath, "utf8");
const effectsSource = fs.readFileSync(workspaceShellEffectsPath, "utf8");
const initialLoadSource = fs.readFileSync(workspaceShellInitialLoadPath, "utf8");
const initialLoadHelpersSource = fs.readFileSync(workspaceShellInitialLoadHelpersPath, "utf8");
const mediaFilterActionsSource = fs.readFileSync(workspaceShellMediaFilterActionsPath, "utf8");
const chatRecordActionsSource = fs.readFileSync(workspaceShellChatRecordActionsPath, "utf8");
const adminActionsSource = fs.readFileSync(workspaceShellAdminActionsPath, "utf8");
const lineCount = source.split(/\r?\n/).length;
const clientPropsLineCount = clientPropsSource.split(/\r?\n/).length;
const panelsLineCount = panelsSource.split(/\r?\n/).length;
const actionsLineCount = actionsSource.split(/\r?\n/).length;
const effectsLineCount = effectsSource.split(/\r?\n/).length;
const initialLoadLineCount = initialLoadSource.split(/\r?\n/).length;
const initialLoadHelpersLineCount = initialLoadHelpersSource.split(/\r?\n/).length;
const mediaFilterActionsLineCount = mediaFilterActionsSource.split(/\r?\n/).length;
const chatRecordActionsLineCount = chatRecordActionsSource.split(/\r?\n/).length;
const adminActionsLineCount = adminActionsSource.split(/\r?\n/).length;

for (const requiredRefreshersImport of [
  'from "./workspace-shell-conversation-refreshers";',
  'from "./workspace-shell-managed-refreshers";',
  'from "./workspace-shell-record-media-refreshers";',
  'from "./workspace-shell-refreshers.types";',
]) {
  if (!refreshersSource.includes(requiredRefreshersImport)) {
    throw new Error(`use-workspace-shell-refreshers.ts must import delegated refresher groups: ${requiredRefreshersImport}`);
  }
}

for (const requiredRefreshersUsage of [
  "createWorkspaceShellConversationRefreshers(props)",
  "createWorkspaceShellManagedRefreshers(props)",
  "createWorkspaceShellRecordMediaRefreshers(props)",
  "...conversationRefreshers",
  "...managedRefreshers",
  "...recordMediaRefreshers",
]) {
  if (!refreshersSource.includes(requiredRefreshersUsage)) {
    throw new Error(`use-workspace-shell-refreshers.ts must delegate refresher assembly: ${requiredRefreshersUsage}`);
  }
}

for (const forbiddenRefreshersToken of [
  "INITIAL_RECORD_FILTER",
  "loadConversationMessagesForWorkspace(",
  "refreshAuditLogItems(",
  "refreshKnowledgeStatsData(",
  "refreshMediaAssets(",
  "refreshMediaDeadLetterOverviewData(",
  "refreshMediaProcessingOverviewData(",
  "refreshMediaStorageSummaryData(",
  "refreshNotificationItems(",
  "refreshProviderConfigItems(",
  "refreshRecordCollection(",
  "refreshReminderItems(",
  "refreshSearchPresetItems(",
  "refreshShareLinkItems(",
  "syncDueNotificationsAndRefresh(",
]) {
  if (refreshersSource.includes(forbiddenRefreshersToken)) {
    throw new Error(`use-workspace-shell-refreshers.ts must keep refresher internals delegated: ${forbiddenRefreshersToken}`);
  }
}

const refreshersLineCount = refreshersSource.split(/\r?\n/).length;
const maxRefreshersLines = 30;
if (refreshersLineCount > maxRefreshersLines) {
  throw new Error(
    `use-workspace-shell-refreshers.ts exceeded ${maxRefreshersLines} lines: ${refreshersLineCount}`,
  );
}

for (const delegatedRefresherPath of [
  path.resolve(process.cwd(), "components/workspace-shell-conversation-refreshers.ts"),
  path.resolve(process.cwd(), "components/workspace-shell-managed-refreshers.ts"),
  path.resolve(process.cwd(), "components/workspace-shell-record-media-refreshers.ts"),
]) {
  const delegatedRefresherSource = fs.readFileSync(delegatedRefresherPath, "utf8");
  if (!delegatedRefresherSource.includes('from "../lib/workspace-shell-refresh";')) {
    throw new Error(
      `${path.basename(delegatedRefresherPath)} must import shared refresh helpers from ../lib/workspace-shell-refresh`,
    );
  }
}

if (!source.includes('import { createWorkspaceShellRefreshers } from "./use-workspace-shell-refreshers";')) {
  throw new Error("workspace-shell-client.tsx must import createWorkspaceShellRefreshers");
}

if (!source.includes('import { useWorkspaceShellEffects } from "./use-workspace-shell-effects";')) {
  throw new Error("workspace-shell-client.tsx must import useWorkspaceShellEffects");
}

if (!source.includes('import { useWorkspaceShellActions } from "./use-workspace-shell-actions";')) {
  throw new Error("workspace-shell-client.tsx must import useWorkspaceShellActions");
}

if (!source.includes('import { useWorkspaceShellState } from "./use-workspace-shell-state";')) {
  throw new Error("workspace-shell-client.tsx must import useWorkspaceShellState");
}

if (!source.includes('import { WorkspaceShellFrame } from "./workspace-shell-frame";')) {
  throw new Error("workspace-shell-client.tsx must import WorkspaceShellFrame");
}

if (!source.includes('import { WorkspaceShellPanels } from "./workspace-shell-panels";')) {
  throw new Error("workspace-shell-client.tsx must import WorkspaceShellPanels");
}

if (!source.includes('from "./workspace-shell-client-props";')) {
  throw new Error("workspace-shell-client.tsx must import workspace-shell-client-props");
}

for (const requiredClientPropsExport of [
  'export { buildWorkspaceShellActionsInput } from "./workspace-shell-client-actions-input";',
  'export { buildWorkspaceShellEffectsInput } from "./workspace-shell-client-effects-input";',
  'export { buildWorkspaceShellPanelsProps } from "./workspace-shell-client-panels-props";',
  'export { buildWorkspaceShellRefreshersInput } from "./workspace-shell-client-refreshers-input";',
]) {
  if (!clientPropsSource.includes(requiredClientPropsExport)) {
    throw new Error(`workspace-shell-client-props.ts must remain a stable re-export boundary: ${requiredClientPropsExport}`);
  }
}

if (!panelsSource.includes('import type { WorkspaceShellPanelsProps } from "./workspace-shell-panels.types";')) {
  throw new Error("workspace-shell-panels.tsx must import WorkspaceShellPanelsProps from workspace-shell-panels.types");
}

if (!panelsSource.includes('from "./workspace-shell-panels-props";')) {
  throw new Error("workspace-shell-panels.tsx must import workspace-shell-panels-props");
}

if (!source.includes("useWorkspaceShellEffects(")) {
  throw new Error("workspace-shell-client.tsx must delegate lifecycle synchronization to useWorkspaceShellEffects");
}

if (!source.includes("useWorkspaceShellActions(")) {
  throw new Error("workspace-shell-client.tsx must delegate action orchestration to useWorkspaceShellActions");
}

if (!source.includes("useWorkspaceShellState()")) {
  throw new Error("workspace-shell-client.tsx must delegate local state registration to useWorkspaceShellState");
}

if (!source.includes("createWorkspaceShellRefreshers({")) {
  if (!source.includes("createWorkspaceShellRefreshers(")) {
    throw new Error("workspace-shell-client.tsx must delegate refresh helper composition to createWorkspaceShellRefreshers");
  }
}

if (!source.includes("<WorkspaceShellPanels")) {
  throw new Error("workspace-shell-client.tsx must delegate panel composition to WorkspaceShellPanels");
}

if (!panelsSource.includes("<ChatPanel")) {
  throw new Error("workspace-shell-panels.tsx must keep composing ChatPanel");
}

if (!panelsSource.includes("<RecordPanelV2")) {
  throw new Error("workspace-shell-panels.tsx must keep composing RecordPanelV2");
}

if (!panelsSource.includes("buildChatPanelProps(props)")) {
  throw new Error("workspace-shell-panels.tsx must delegate chat panel prop assembly");
}

if (!panelsSource.includes("buildRecordPanelProps(props)")) {
  throw new Error("workspace-shell-panels.tsx must delegate record panel prop assembly");
}

if (!source.includes("<WorkspaceShellFrame")) {
  throw new Error("workspace-shell-client.tsx must delegate loading and error shell rendering to WorkspaceShellFrame");
}

for (const requiredHelperUsage of [
  "buildWorkspaceShellRefreshersInput({ state, workspaceId })",
  "buildWorkspaceShellEffectsInput({ router, state, workspaceId })",
  "buildWorkspaceShellActionsInput({ refreshers, state, workspaceId })",
  "buildWorkspaceShellPanelsProps({ actions, state, workspaceId })",
]) {
  if (!source.includes(requiredHelperUsage)) {
    throw new Error(`workspace-shell-client.tsx must delegate shell prop assembly: ${requiredHelperUsage}`);
  }
}

for (const forbiddenToken of [
  "useState(",
  "useEffect(",
  "const handle",
  "listRecords(",
  "listMedia(",
  "listMessages(",
  "listNotifications(",
  "listProviderConfigs(",
  "listReminders(",
  "listSearchPresets(",
  "listShareLinks(",
  "listAuditLogs(",
  "getKnowledgeStats(",
  "getMediaDeadLetterOverview(",
  "getMediaProcessingOverview(",
  "getMediaStorageSummary(",
  "syncNotifications(",
  "<ChatPanel",
  "<RecordPanelV2",
  "Loading workspace...",
  "notice error",
  "const refreshRecords = async",
  "const refreshMedia = async",
  "const refreshNotifications = async",
  "const refreshKnowledge = async",
  "token, setToken, workspace, setWorkspace",
  "refreshAuditLogs,",
  "handleSendMessage,",
  "activeConversationId={activeConversationId}",
  "authToken={token}",
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`workspace-shell-client.tsx must keep refresh logic delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 120;
if (lineCount > maxAllowedLines) {
  throw new Error(`workspace-shell-client.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

const maxPanelsLines = 130;
if (panelsLineCount > maxPanelsLines) {
  throw new Error(`workspace-shell-panels.tsx exceeded ${maxPanelsLines} lines: ${panelsLineCount}`);
}

const maxClientPropsLines = 20;
if (clientPropsLineCount > maxClientPropsLines) {
  throw new Error(
    `workspace-shell-client-props.ts exceeded ${maxClientPropsLines} lines: ${clientPropsLineCount}`,
  );
}

for (const requiredActionsImport of [
  'from "./workspace-shell-actions.types";',
  'from "./workspace-shell-chat-record-actions";',
  'from "./workspace-shell-media-filter-actions";',
  'from "./workspace-shell-admin-actions";',
]) {
  if (!actionsSource.includes(requiredActionsImport)) {
    throw new Error(`use-workspace-shell-actions.ts must import delegated action modules: ${requiredActionsImport}`);
  }
}

for (const requiredActionsUsage of [
  "createWorkspaceShellChatRecordActions(props)",
  "createWorkspaceShellMediaFilterActions(props)",
  "createWorkspaceShellAdminActions(props)",
  "...chatRecordActions",
  "...mediaFilterActions",
  "...adminActions",
]) {
  if (!actionsSource.includes(requiredActionsUsage)) {
    throw new Error(`use-workspace-shell-actions.ts must delegate action assembly: ${requiredActionsUsage}`);
  }
}

for (const forbiddenActionsToken of [
  'from "../lib/api";',
  'from "../lib/timeline";',
  "const handle",
  "sendMessage(",
  "createConversation(",
  "createRecord(",
  "updateRecord(",
  "deleteRecord(",
  "uploadMedia(",
  "deleteMedia(",
  "retryMediaProcessing(",
  "getMediaStatus(",
  "bulkRetryMediaDeadLetter(",
  "createSearchPreset(",
  "deleteSearchPreset(",
  "createReminder(",
  "updateReminder(",
  "deleteReminder(",
  "syncDueNotifications(",
  "updateNotification(",
  "reindexKnowledge(",
  "updateProviderConfig(",
  "createShareLink(",
  "updateShareLink(",
]) {
  if (actionsSource.includes(forbiddenActionsToken)) {
    throw new Error(`use-workspace-shell-actions.ts must keep action internals delegated: ${forbiddenActionsToken}`);
  }
}

const maxActionsLines = 40;
if (actionsLineCount > maxActionsLines) {
  throw new Error(`use-workspace-shell-actions.ts exceeded ${maxActionsLines} lines: ${actionsLineCount}`);
}

for (const requiredEffectsImport of [
  'from "./workspace-shell-effects.types";',
  'from "./use-workspace-shell-initial-load";',
  'from "./use-workspace-shell-selection-effects";',
  'from "./use-workspace-shell-notification-effect";',
]) {
  if (!effectsSource.includes(requiredEffectsImport)) {
    throw new Error(`use-workspace-shell-effects.ts must import delegated effect modules: ${requiredEffectsImport}`);
  }
}

for (const requiredEffectsUsage of [
  "useWorkspaceShellInitialLoad(props)",
  "useWorkspaceShellSelectionEffects(props)",
  "useWorkspaceShellNotificationEffect(props)",
]) {
  if (!effectsSource.includes(requiredEffectsUsage)) {
    throw new Error(`use-workspace-shell-effects.ts must delegate effect orchestration: ${requiredEffectsUsage}`);
  }
}

for (const forbiddenEffectsToken of [
  "useEffect(",
  'from "../lib/api";',
  'from "../lib/auth";',
  'from "../lib/workspace-shell-refresh";',
  "getStoredToken(",
  "refreshMediaAssets(",
  "refreshReminderItems(",
  "syncDueNotificationsAndRefresh(",
]) {
  if (effectsSource.includes(forbiddenEffectsToken)) {
    throw new Error(`use-workspace-shell-effects.ts must keep effect internals delegated: ${forbiddenEffectsToken}`);
  }
}

const maxEffectsLines = 25;
if (effectsLineCount > maxEffectsLines) {
  throw new Error(`use-workspace-shell-effects.ts exceeded ${maxEffectsLines} lines: ${effectsLineCount}`);
}

for (const requiredInitialLoadImport of [
  'from "./workspace-shell-effects.types";',
  'from "./workspace-shell-initial-load-helpers";',
]) {
  if (!initialLoadSource.includes(requiredInitialLoadImport)) {
    throw new Error(`use-workspace-shell-initial-load.ts must import delegated initial-load helpers: ${requiredInitialLoadImport}`);
  }
}

for (const requiredInitialLoadUsage of [
  "loadWorkspaceShellInitialData({",
]) {
  if (!initialLoadSource.includes(requiredInitialLoadUsage)) {
    throw new Error(`use-workspace-shell-initial-load.ts must delegate initial-load flow: ${requiredInitialLoadUsage}`);
  }
}

for (const forbiddenInitialLoadToken of [
  "createConversation(",
  "getWorkspace(",
  "listConversations(",
  "refreshRecordCollection(",
  "refreshNotificationItems(",
  "refreshKnowledgeStatsData(",
  "refreshMediaStorageSummaryData(",
  "refreshMediaProcessingOverviewData(",
  "refreshMediaDeadLetterOverviewData(",
  "refreshProviderConfigItems(",
  "refreshShareLinkItems(",
  "refreshSearchPresetItems(",
  "refreshAuditLogItems(",
]) {
  if (initialLoadSource.includes(forbiddenInitialLoadToken)) {
    throw new Error(`use-workspace-shell-initial-load.ts must keep detailed load steps delegated: ${forbiddenInitialLoadToken}`);
  }
}

const maxInitialLoadLines = 135;
if (initialLoadLineCount > maxInitialLoadLines) {
  throw new Error(
    `use-workspace-shell-initial-load.ts exceeded ${maxInitialLoadLines} lines: ${initialLoadLineCount}`,
  );
}

for (const requiredInitialLoadHelpersImport of [
  'from "./workspace-shell-effects.types";',
  'from "./workspace-shell-conversation-state-load";',
  'from "./workspace-shell-initial-bootstrap";',
  'from "./workspace-shell-initial-follow-up";',
  'from "./workspace-shell-managed-state-load";',
]) {
  if (!initialLoadHelpersSource.includes(requiredInitialLoadHelpersImport)) {
    throw new Error(`workspace-shell-initial-load-helpers.ts must import delegated bootstrap helpers: ${requiredInitialLoadHelpersImport}`);
  }
}

for (const requiredInitialLoadHelpersUsage of [
  "loadWorkspaceShellInitialBootstrap({",
  "loadWorkspaceShellInitialFollowUp({",
]) {
  if (!initialLoadHelpersSource.includes(requiredInitialLoadHelpersUsage)) {
    throw new Error(`workspace-shell-initial-load-helpers.ts must delegate bootstrap sequencing: ${requiredInitialLoadHelpersUsage}`);
  }
}

for (const forbiddenInitialLoadHelpersToken of [
  "createConversation(",
  "listConversations(",
  "loadConversationMessagesForWorkspace(",
  "getWorkspace(",
  "refreshRecordCollection(",
  "refreshNotificationItems(",
  "refreshKnowledgeStatsData(",
  "refreshMediaStorageSummaryData(",
  "refreshMediaProcessingOverviewData(",
  "refreshMediaDeadLetterOverviewData(",
  "refreshProviderConfigItems(",
  "refreshShareLinkItems(",
  "refreshSearchPresetItems(",
  "refreshAuditLogItems(",
]) {
  if (initialLoadHelpersSource.includes(forbiddenInitialLoadHelpersToken)) {
    throw new Error(`workspace-shell-initial-load-helpers.ts must keep bootstrap internals delegated: ${forbiddenInitialLoadHelpersToken}`);
  }
}

const maxInitialLoadHelpersLines = 135;
if (initialLoadHelpersLineCount > maxInitialLoadHelpersLines) {
  throw new Error(
    `workspace-shell-initial-load-helpers.ts exceeded ${maxInitialLoadHelpersLines} lines: ${initialLoadHelpersLineCount}`,
  );
}

for (const requiredMediaFilterImport of [
  'from "./workspace-shell-actions.types";',
  'from "./workspace-shell-media-actions";',
  'from "./workspace-shell-record-filter-actions";',
]) {
  if (!mediaFilterActionsSource.includes(requiredMediaFilterImport)) {
    throw new Error(`workspace-shell-media-filter-actions.ts must import delegated action groups: ${requiredMediaFilterImport}`);
  }
}

for (const requiredMediaFilterUsage of [
  "createWorkspaceShellMediaActions(props)",
  "createWorkspaceShellRecordFilterActions(props)",
  "...mediaActions",
  "...recordFilterActions",
]) {
  if (!mediaFilterActionsSource.includes(requiredMediaFilterUsage)) {
    throw new Error(`workspace-shell-media-filter-actions.ts must delegate action-group assembly: ${requiredMediaFilterUsage}`);
  }
}

for (const forbiddenMediaFilterToken of [
  'from "../lib/api";',
  'from "./workspace-shell-action-guards";',
  "const handleUploadMedia",
  "const handleApplyRecordFilter",
  "uploadMedia(",
  "deleteMedia(",
  "createSearchPreset(",
  "deleteSearchPreset(",
]) {
  if (mediaFilterActionsSource.includes(forbiddenMediaFilterToken)) {
    throw new Error(`workspace-shell-media-filter-actions.ts must keep media/filter internals delegated: ${forbiddenMediaFilterToken}`);
  }
}

const maxMediaFilterActionsLines = 25;
if (mediaFilterActionsLineCount > maxMediaFilterActionsLines) {
  throw new Error(
    `workspace-shell-media-filter-actions.ts exceeded ${maxMediaFilterActionsLines} lines: ${mediaFilterActionsLineCount}`,
  );
}

for (const requiredChatRecordImport of [
  'from "./workspace-shell-actions.types";',
  'from "./workspace-shell-chat-actions";',
  'from "./workspace-shell-record-actions";',
]) {
  if (!chatRecordActionsSource.includes(requiredChatRecordImport)) {
    throw new Error(`workspace-shell-chat-record-actions.ts must import delegated action groups: ${requiredChatRecordImport}`);
  }
}

for (const requiredChatRecordUsage of [
  "createWorkspaceShellChatActions(props)",
  "createWorkspaceShellRecordActions(props)",
  "...chatActions",
  "...recordActions",
]) {
  if (!chatRecordActionsSource.includes(requiredChatRecordUsage)) {
    throw new Error(`workspace-shell-chat-record-actions.ts must delegate action-group assembly: ${requiredChatRecordUsage}`);
  }
}

for (const forbiddenChatRecordToken of [
  'from "../lib/api";',
  'from "../lib/timeline";',
  'from "./workspace-shell-action-guards";',
  "const handleSendMessage",
  "const handleSaveRecord",
  "sendMessage(",
  "createConversation(",
  "createRecord(",
  "updateRecord(",
  "deleteRecord(",
]) {
  if (chatRecordActionsSource.includes(forbiddenChatRecordToken)) {
    throw new Error(`workspace-shell-chat-record-actions.ts must keep chat/record internals delegated: ${forbiddenChatRecordToken}`);
  }
}

const maxChatRecordActionsLines = 20;
if (chatRecordActionsLineCount > maxChatRecordActionsLines) {
  throw new Error(
    `workspace-shell-chat-record-actions.ts exceeded ${maxChatRecordActionsLines} lines: ${chatRecordActionsLineCount}`,
  );
}

for (const requiredAdminImport of [
  'from "./workspace-shell-actions.types";',
  'from "./workspace-shell-knowledge-provider-actions";',
  'from "./workspace-shell-reminder-notification-actions";',
  'from "./workspace-shell-share-actions";',
]) {
  if (!adminActionsSource.includes(requiredAdminImport)) {
    throw new Error(`workspace-shell-admin-actions.ts must import delegated action groups: ${requiredAdminImport}`);
  }
}

for (const requiredAdminUsage of [
  "createWorkspaceShellReminderNotificationActions(props)",
  "createWorkspaceShellKnowledgeProviderActions(props)",
  "createWorkspaceShellShareActions(props)",
  "...reminderNotificationActions",
  "...knowledgeProviderActions",
  "...shareActions",
]) {
  if (!adminActionsSource.includes(requiredAdminUsage)) {
    throw new Error(`workspace-shell-admin-actions.ts must delegate action-group assembly: ${requiredAdminUsage}`);
  }
}

for (const forbiddenAdminToken of [
  'from "../lib/api";',
  'from "./workspace-shell-action-guards";',
  "const handleCreateReminder",
  "const handleReindexKnowledge",
  "const handleCreateShareLink",
  "createReminder(",
  "updateReminder(",
  "deleteReminder(",
  "updateNotification(",
  "reindexKnowledge(",
  "updateProviderConfig(",
  "createShareLink(",
  "updateShareLink(",
]) {
  if (adminActionsSource.includes(forbiddenAdminToken)) {
    throw new Error(`workspace-shell-admin-actions.ts must keep admin internals delegated: ${forbiddenAdminToken}`);
  }
}

const maxAdminActionsLines = 20;
if (adminActionsLineCount > maxAdminActionsLines) {
  throw new Error(
    `workspace-shell-admin-actions.ts exceeded ${maxAdminActionsLines} lines: ${adminActionsLineCount}`,
  );
}

console.log("workspace-shell structure verification passed");

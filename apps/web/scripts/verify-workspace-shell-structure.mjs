import fs from "node:fs";
import path from "node:path";

const workspaceShellPath = path.resolve(process.cwd(), "components/workspace-shell-client.tsx");
const workspaceShellClientPropsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-client-props.ts",
);
const workspaceShellPanelsPath = path.resolve(process.cwd(), "components/workspace-shell-panels.tsx");
const workspaceShellRefreshersPath = path.resolve(process.cwd(), "components/use-workspace-shell-refreshers.ts");
const source = fs.readFileSync(workspaceShellPath, "utf8");
const clientPropsSource = fs.readFileSync(workspaceShellClientPropsPath, "utf8");
const panelsSource = fs.readFileSync(workspaceShellPanelsPath, "utf8");
const refreshersSource = fs.readFileSync(workspaceShellRefreshersPath, "utf8");
const lineCount = source.split(/\r?\n/).length;
const clientPropsLineCount = clientPropsSource.split(/\r?\n/).length;
const panelsLineCount = panelsSource.split(/\r?\n/).length;

if (!refreshersSource.includes('from "../lib/workspace-shell-refresh";')) {
  throw new Error("use-workspace-shell-refreshers.ts must import shared refresh helpers from ../lib/workspace-shell-refresh");
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

console.log("workspace-shell structure verification passed");

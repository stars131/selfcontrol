import fs from "node:fs";
import path from "node:path";

const workspaceShellPath = path.resolve(process.cwd(), "components/workspace-shell-client.tsx");
const workspaceShellPanelsPath = path.resolve(process.cwd(), "components/workspace-shell-panels.tsx");
const workspaceShellRefreshersPath = path.resolve(process.cwd(), "components/use-workspace-shell-refreshers.ts");
const source = fs.readFileSync(workspaceShellPath, "utf8");
const panelsSource = fs.readFileSync(workspaceShellPanelsPath, "utf8");
const refreshersSource = fs.readFileSync(workspaceShellRefreshersPath, "utf8");
const lineCount = source.split(/\r?\n/).length;
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

if (!panelsSource.includes('import type { WorkspaceShellPanelsProps } from "./workspace-shell-panels.types";')) {
  throw new Error("workspace-shell-panels.tsx must import WorkspaceShellPanelsProps from workspace-shell-panels.types");
}

if (!source.includes("useWorkspaceShellEffects({")) {
  throw new Error("workspace-shell-client.tsx must delegate lifecycle synchronization to useWorkspaceShellEffects");
}

if (!source.includes("useWorkspaceShellActions({")) {
  throw new Error("workspace-shell-client.tsx must delegate action orchestration to useWorkspaceShellActions");
}

if (!source.includes("useWorkspaceShellState()")) {
  throw new Error("workspace-shell-client.tsx must delegate local state registration to useWorkspaceShellState");
}

if (!source.includes("createWorkspaceShellRefreshers({")) {
  throw new Error("workspace-shell-client.tsx must delegate refresh helper composition to createWorkspaceShellRefreshers");
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

if (!source.includes("<WorkspaceShellFrame")) {
  throw new Error("workspace-shell-client.tsx must delegate loading and error shell rendering to WorkspaceShellFrame");
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
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`workspace-shell-client.tsx must keep refresh logic delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 220;
if (lineCount > maxAllowedLines) {
  throw new Error(`workspace-shell-client.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

const maxPanelsLines = 130;
if (panelsLineCount > maxPanelsLines) {
  throw new Error(`workspace-shell-panels.tsx exceeded ${maxPanelsLines} lines: ${panelsLineCount}`);
}

console.log("workspace-shell structure verification passed");

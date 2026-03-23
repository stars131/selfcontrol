import fs from "node:fs";
import path from "node:path";

const workspaceEntryPath = path.resolve(process.cwd(), "components/workspace-entry-client.tsx");
const workspaceEntryMainPanelPath = path.resolve(process.cwd(), "components/workspace-entry-main-panel.tsx");
const workspaceEntryControllerPath = path.resolve(
  process.cwd(),
  "components/use-workspace-entry-controller.ts",
);
const workspaceEntryActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-controller-actions.ts",
);
const source = fs.readFileSync(workspaceEntryPath, "utf8");
const mainPanelSource = fs.readFileSync(workspaceEntryMainPanelPath, "utf8");
const controllerSource = fs.readFileSync(workspaceEntryControllerPath, "utf8");
const actionsSource = fs.readFileSync(workspaceEntryActionsPath, "utf8");
const lineCount = source.split(/\r?\n/).length;
const mainPanelLineCount = mainPanelSource.split(/\r?\n/).length;
const controllerLineCount = controllerSource.split(/\r?\n/).length;
const actionsLineCount = actionsSource.split(/\r?\n/).length;

if (!source.includes('import { useWorkspaceEntryController } from "./use-workspace-entry-controller";')) {
  throw new Error("workspace-entry-client.tsx must import useWorkspaceEntryController");
}

if (!source.includes("useWorkspaceEntryController(router)")) {
  throw new Error("workspace-entry-client.tsx must delegate behavior orchestration to useWorkspaceEntryController");
}

if (!source.includes('import { WorkspaceEntryMainPanel } from "./workspace-entry-main-panel";')) {
  throw new Error("workspace-entry-client.tsx must import WorkspaceEntryMainPanel");
}

if (!source.includes('import { getWorkspaceEntryCopy } from "./workspace-entry-copy";')) {
  throw new Error("workspace-entry-client.tsx must import getWorkspaceEntryCopy");
}

if (!source.includes("<WorkspaceEntryMainPanel")) {
  throw new Error("workspace-entry-client.tsx must delegate main panel composition to WorkspaceEntryMainPanel");
}

if (!source.includes("getWorkspaceEntryCopy(locale)")) {
  throw new Error("workspace-entry-client.tsx must delegate locale copy lookup to getWorkspaceEntryCopy");
}

for (const requiredImport of [
  'import { WorkspaceEntryHeader } from "./workspace-entry-header";',
  'import type { WorkspaceEntryMainPanelProps } from "./workspace-entry-main-panel.types";',
  'import { WorkspaceEntrySectionsGrid } from "./workspace-entry-sections-grid";',
]) {
  if (!mainPanelSource.includes(requiredImport)) {
    throw new Error(`workspace-entry-main-panel.tsx must keep using extracted entry sections: ${requiredImport}`);
  }
}

for (const requiredUsage of [
  "<WorkspaceEntryHeader",
  "<WorkspaceEntrySectionsGrid",
]) {
  if (!mainPanelSource.includes(requiredUsage)) {
    throw new Error(`workspace-entry-main-panel.tsx must compose the extracted entry sections: ${requiredUsage}`);
  }
}

for (const forbiddenMainPanelToken of [
  "<WorkspaceCreateSection",
  "<WorkspaceJoinSection",
  "<WorkspaceImportSection",
  "<WorkspaceListSection",
  "<WorkspaceTransferJobsSection",
]) {
  if (mainPanelSource.includes(forbiddenMainPanelToken)) {
    throw new Error(`workspace-entry-main-panel.tsx must keep entry sections delegated: ${forbiddenMainPanelToken}`);
  }
}

for (const forbiddenToken of [
  'from "../lib/api"',
  'from "../lib/auth"',
  "useEffect(",
  "useMemo(",
  "useRef(",
  "useState(",
  "function slugify",
  "function extractShareToken",
  "const loadTransferJobs =",
  "const handleCreate =",
  "const handleImportWorkspace =",
  "const handleQueueImportJob =",
  "const handlePreviewShare =",
  "const handleAcceptShare =",
  "const handleLogout =",
  "const handleDownloadTransferJob =",
  "const COPY:",
  "const DISPLAY_COPY:",
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`workspace-entry-client.tsx must keep controller logic delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 130;
if (lineCount > maxAllowedLines) {
  throw new Error(`workspace-entry-client.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

const maxMainPanelLines = 110;
if (mainPanelLineCount > maxMainPanelLines) {
  throw new Error(`workspace-entry-main-panel.tsx exceeded ${maxMainPanelLines} lines: ${mainPanelLineCount}`);
}

for (const requiredControllerImport of [
  'from "./workspace-entry-controller-actions";',
  'from "./workspace-entry-controller-helpers";',
  'from "./workspace-entry-controller.types";',
  'from "./use-workspace-entry-load";',
]) {
  if (!controllerSource.includes(requiredControllerImport)) {
    throw new Error(`use-workspace-entry-controller.ts must import delegated helpers: ${requiredControllerImport}`);
  }
}

for (const requiredControllerUsage of [
  "createWorkspaceEntryControllerActions({ router, state })",
  "useWorkspaceEntryLoad({",
  "slugifyWorkspaceName(name)",
  "extractWorkspaceShareToken(shareTokenInput)",
  "...state",
]) {
  if (!controllerSource.includes(requiredControllerUsage)) {
    throw new Error(`use-workspace-entry-controller.ts must delegate controller orchestration: ${requiredControllerUsage}`);
  }
}

for (const forbiddenControllerToken of [
  'from "../lib/api";',
  'from "../lib/auth";',
  "useEffect(",
  "function slugify",
  "function extractShareToken",
  "const loadTransferJobs =",
  "const handleCreate =",
  "const handleImportWorkspace =",
  "const handleQueueImportJob =",
  "const handlePreviewShare =",
  "const handleAcceptShare =",
  "const handleLogout =",
  "const handleDownloadTransferJob =",
]) {
  if (controllerSource.includes(forbiddenControllerToken)) {
    throw new Error(`use-workspace-entry-controller.ts must keep load and action internals delegated: ${forbiddenControllerToken}`);
  }
}

const maxControllerLines = 130;
if (controllerLineCount > maxControllerLines) {
  throw new Error(
    `use-workspace-entry-controller.ts exceeded ${maxControllerLines} lines: ${controllerLineCount}`,
  );
}

for (const requiredActionsImport of [
  'from "./workspace-entry-job-actions";',
  'from "./workspace-entry-share-actions";',
  'from "./workspace-entry-controller.types";',
  'from "./workspace-entry-workspace-actions";',
]) {
  if (!actionsSource.includes(requiredActionsImport)) {
    throw new Error(`workspace-entry-controller-actions.ts must import delegated action groups: ${requiredActionsImport}`);
  }
}

for (const requiredActionsUsage of [
  "createWorkspaceEntryJobActions({",
  "createWorkspaceEntryWorkspaceActions({",
  "createWorkspaceEntryShareActions({ router, state })",
  "...jobActions",
  "...workspaceActions",
  "...shareActions",
]) {
  if (!actionsSource.includes(requiredActionsUsage)) {
    throw new Error(`workspace-entry-controller-actions.ts must delegate grouped actions: ${requiredActionsUsage}`);
  }
}

for (const forbiddenActionsToken of [
  'from "../lib/api";',
  'from "../lib/auth";',
  "const loadTransferJobs =",
  "const handleCreate =",
  "const handleImportWorkspace =",
  "const handleQueueImportJob =",
  "const handlePreviewShare =",
  "const handleAcceptShare =",
  "const handleLogout =",
  "const handleDownloadTransferJob =",
]) {
  if (actionsSource.includes(forbiddenActionsToken)) {
    throw new Error(`workspace-entry-controller-actions.ts must keep action internals delegated: ${forbiddenActionsToken}`);
  }
}

const maxActionsLines = 40;
if (actionsLineCount > maxActionsLines) {
  throw new Error(
    `workspace-entry-controller-actions.ts exceeded ${maxActionsLines} lines: ${actionsLineCount}`,
  );
}

console.log("workspace-entry structure verification passed");

import fs from "node:fs";
import path from "node:path";

const workspaceEntryPath = path.resolve(process.cwd(), "components/workspace-entry-client.tsx");
const workspaceEntryMainPanelPath = path.resolve(process.cwd(), "components/workspace-entry-main-panel.tsx");
const workspaceEntryControllerPath = path.resolve(
  process.cwd(),
  "components/use-workspace-entry-controller.ts",
);
const workspaceEntryControllerStatePath = path.resolve(
  process.cwd(),
  "components/use-workspace-entry-controller-state.ts",
);
const workspaceEntryControllerDerivedDataPath = path.resolve(
  process.cwd(),
  "components/use-workspace-entry-controller-derived-data.ts",
);
const workspaceEntryActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-controller-actions.ts",
);
const workspaceEntryWorkspaceActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-workspace-actions.ts",
);
const workspaceEntryCopyPath = path.resolve(process.cwd(), "components/workspace-entry-copy.ts");
const source = fs.readFileSync(workspaceEntryPath, "utf8");
const mainPanelSource = fs.readFileSync(workspaceEntryMainPanelPath, "utf8");
const controllerSource = fs.readFileSync(workspaceEntryControllerPath, "utf8");
const controllerStateSource = fs.readFileSync(workspaceEntryControllerStatePath, "utf8");
const controllerDerivedDataSource = fs.readFileSync(
  workspaceEntryControllerDerivedDataPath,
  "utf8",
);
const actionsSource = fs.readFileSync(workspaceEntryActionsPath, "utf8");
const workspaceActionsSource = fs.readFileSync(workspaceEntryWorkspaceActionsPath, "utf8");
const copySource = fs.readFileSync(workspaceEntryCopyPath, "utf8");
const lineCount = source.split(/\r?\n/).length;
const mainPanelLineCount = mainPanelSource.split(/\r?\n/).length;
const controllerLineCount = controllerSource.split(/\r?\n/).length;
const controllerStateLineCount = controllerStateSource.split(/\r?\n/).length;
const controllerDerivedDataLineCount = controllerDerivedDataSource.split(/\r?\n/).length;
const actionsLineCount = actionsSource.split(/\r?\n/).length;
const workspaceActionsLineCount = workspaceActionsSource.split(/\r?\n/).length;
const copyLineCount = copySource.split(/\r?\n/).length;

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
  'from "./workspace-entry-controller.types";',
  'from "./use-workspace-entry-load";',
  'from "./use-workspace-entry-controller-derived-data";',
  'from "./use-workspace-entry-controller-state";',
]) {
  if (!controllerSource.includes(requiredControllerImport)) {
    throw new Error(`use-workspace-entry-controller.ts must import delegated helpers: ${requiredControllerImport}`);
  }
}

for (const requiredControllerUsage of [
  "useWorkspaceEntryControllerState()",
  "useWorkspaceEntryControllerDerivedData({",
  "createWorkspaceEntryControllerActions({ router, state })",
  "useWorkspaceEntryLoad({",
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
]) {
  if (controllerSource.includes(forbiddenControllerToken)) {
    throw new Error(`use-workspace-entry-controller.ts must keep load and action internals delegated: ${forbiddenControllerToken}`);
  }
}

const maxControllerLines = 80;
if (controllerLineCount > maxControllerLines) {
  throw new Error(
    `use-workspace-entry-controller.ts exceeded ${maxControllerLines} lines: ${controllerLineCount}`,
  );
}

for (const requiredControllerStateImport of ['from "./workspace-entry-controller.types";']) {
  if (!controllerStateSource.includes(requiredControllerStateImport)) {
    throw new Error(
      `use-workspace-entry-controller-state.ts must import shared controller state types: ${requiredControllerStateImport}`,
    );
  }
}

for (const requiredControllerStateUsage of [
  "useRef<",
  "useState(",
  "fileInputRef",
  "jobsLoading",
  "setJobsLoading",
]) {
  if (!controllerStateSource.includes(requiredControllerStateUsage)) {
    throw new Error(
      `use-workspace-entry-controller-state.ts must own controller state registration: ${requiredControllerStateUsage}`,
    );
  }
}

for (const forbiddenControllerStateToken of [
  "useMemo(",
  "slugifyWorkspaceName(",
  "extractWorkspaceShareToken(",
  "createWorkspaceEntryControllerActions(",
  "useWorkspaceEntryLoad(",
]) {
  if (controllerStateSource.includes(forbiddenControllerStateToken)) {
    throw new Error(
      `use-workspace-entry-controller-state.ts must keep orchestration delegated: ${forbiddenControllerStateToken}`,
    );
  }
}

const maxControllerStateLines = 80;
if (controllerStateLineCount > maxControllerStateLines) {
  throw new Error(
    `use-workspace-entry-controller-state.ts exceeded ${maxControllerStateLines} lines: ${controllerStateLineCount}`,
  );
}

for (const requiredControllerDerivedDataImport of [
  'from "./workspace-entry-controller-helpers";',
]) {
  if (!controllerDerivedDataSource.includes(requiredControllerDerivedDataImport)) {
    throw new Error(
      `use-workspace-entry-controller-derived-data.ts must import controller helpers: ${requiredControllerDerivedDataImport}`,
    );
  }
}

for (const requiredControllerDerivedDataUsage of [
  "useMemo(",
  "slugifyWorkspaceName(name)",
  "extractWorkspaceShareToken(shareTokenInput)",
]) {
  if (!controllerDerivedDataSource.includes(requiredControllerDerivedDataUsage)) {
    throw new Error(
      `use-workspace-entry-controller-derived-data.ts must own memoized derived values: ${requiredControllerDerivedDataUsage}`,
    );
  }
}

for (const forbiddenControllerDerivedDataToken of [
  "useRef(",
  "useState(",
  "createWorkspaceEntryControllerActions(",
  "useWorkspaceEntryLoad(",
]) {
  if (controllerDerivedDataSource.includes(forbiddenControllerDerivedDataToken)) {
    throw new Error(
      `use-workspace-entry-controller-derived-data.ts must keep orchestration delegated: ${forbiddenControllerDerivedDataToken}`,
    );
  }
}

const maxControllerDerivedDataLines = 35;
if (controllerDerivedDataLineCount > maxControllerDerivedDataLines) {
  throw new Error(
    `use-workspace-entry-controller-derived-data.ts exceeded ${maxControllerDerivedDataLines} lines: ${controllerDerivedDataLineCount}`,
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

for (const requiredWorkspaceActionsImport of [
  'from "./workspace-entry-controller.types";',
  'from "./workspace-entry-create-actions";',
  'from "./workspace-entry-import-actions";',
]) {
  if (!workspaceActionsSource.includes(requiredWorkspaceActionsImport)) {
    throw new Error(`workspace-entry-workspace-actions.ts must import delegated action groups: ${requiredWorkspaceActionsImport}`);
  }
}

for (const requiredWorkspaceActionsUsage of [
  "createWorkspaceEntryCreateActions({ router, state })",
  "createWorkspaceEntryImportActions({ loadTransferJobs, router, state })",
  "...createActions",
  "...importActions",
]) {
  if (!workspaceActionsSource.includes(requiredWorkspaceActionsUsage)) {
    throw new Error(`workspace-entry-workspace-actions.ts must delegate workspace action assembly: ${requiredWorkspaceActionsUsage}`);
  }
}

for (const forbiddenWorkspaceActionsToken of [
  'from "../lib/api";',
  'from "./workspace-entry-controller-helpers";',
  "const resetImportForm",
  "const handleCreate",
  "const handleImportWorkspace",
  "const handleQueueImportJob",
  "createWorkspace(",
  "importWorkspaceArchive(",
  "createWorkspaceImportJob(",
  "listWorkspaces(",
]) {
  if (workspaceActionsSource.includes(forbiddenWorkspaceActionsToken)) {
    throw new Error(`workspace-entry-workspace-actions.ts must keep workspace internals delegated: ${forbiddenWorkspaceActionsToken}`);
  }
}

const maxWorkspaceActionsLines = 25;
if (workspaceActionsLineCount > maxWorkspaceActionsLines) {
  throw new Error(
    `workspace-entry-workspace-actions.ts exceeded ${maxWorkspaceActionsLines} lines: ${workspaceActionsLineCount}`,
  );
}

for (const requiredCopyImport of [
  'from "./workspace-entry-copy.payload";',
  'from "./workspace-entry-copy.types";',
]) {
  if (!copySource.includes(requiredCopyImport)) {
    throw new Error(`workspace-entry-copy.ts must import delegated copy modules: ${requiredCopyImport}`);
  }
}

for (const requiredCopyUsage of [
  "WORKSPACE_ENTRY_COPY[locale]",
  "WORKSPACE_ENTRY_DISPLAY_COPY[locale]",
  'export type { WorkspaceEntryCopy } from "./workspace-entry-copy.types";',
]) {
  if (!copySource.includes(requiredCopyUsage)) {
    throw new Error(`workspace-entry-copy.ts must stay as a thin copy wrapper: ${requiredCopyUsage}`);
  }
}

for (const forbiddenCopyToken of [
  "const COPY:",
  "const DISPLAY_COPY:",
  '"zh-CN": {',
  'en: {',
  'ja: {',
]) {
  if (copySource.includes(forbiddenCopyToken)) {
    throw new Error(`workspace-entry-copy.ts must keep locale payload delegated: ${forbiddenCopyToken}`);
  }
}

const maxCopyLines = 20;
if (copyLineCount > maxCopyLines) {
  throw new Error(`workspace-entry-copy.ts exceeded ${maxCopyLines} lines: ${copyLineCount}`);
}

console.log("workspace-entry structure verification passed");

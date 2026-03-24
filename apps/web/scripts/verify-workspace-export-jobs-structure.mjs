import fs from "node:fs";
import path from "node:path";

const exportJobsPath = path.resolve(process.cwd(), "components/workspace-export-jobs-card.tsx");
const exportJobsControllerPath = path.resolve(
  process.cwd(),
  "components/use-workspace-export-jobs-controller.ts",
);
const exportJobsStatePath = path.resolve(
  process.cwd(),
  "components/use-workspace-export-jobs-state.ts",
);
const exportJobsActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-actions.ts",
);
const source = fs.readFileSync(exportJobsPath, "utf8");
const controllerSource = fs.readFileSync(exportJobsControllerPath, "utf8");
const stateSource = fs.readFileSync(exportJobsStatePath, "utf8");
const actionsSource = fs.readFileSync(exportJobsActionsPath, "utf8");
const lineCount = source.split(/\r?\n/).length;
const controllerLineCount = controllerSource.split(/\r?\n/).length;
const stateLineCount = stateSource.split(/\r?\n/).length;
const actionsLineCount = actionsSource.split(/\r?\n/).length;

if (!source.includes('import { useWorkspaceExportJobsController } from "./use-workspace-export-jobs-controller";')) {
  throw new Error("workspace-export-jobs-card.tsx must import useWorkspaceExportJobsController");
}

if (!source.includes("useWorkspaceExportJobsController({")) {
  throw new Error("workspace-export-jobs-card.tsx must delegate export-job orchestration to useWorkspaceExportJobsController");
}

if (!source.includes('import { getWorkspaceExportJobsCopy } from "./workspace-export-jobs-copy";')) {
  throw new Error("workspace-export-jobs-card.tsx must import getWorkspaceExportJobsCopy");
}

if (!source.includes('import { WorkspaceExportJobsList } from "./workspace-export-jobs-list";')) {
  throw new Error("workspace-export-jobs-card.tsx must import WorkspaceExportJobsList");
}

if (!source.includes("getWorkspaceExportJobsCopy(locale)")) {
  throw new Error("workspace-export-jobs-card.tsx must delegate locale copy lookup");
}

if (!source.includes("<WorkspaceExportJobsList")) {
  throw new Error("workspace-export-jobs-card.tsx must delegate export-job list rendering");
}

for (const forbiddenToken of [
  "useState(",
  "useEffect(",
  'from "../lib/api"',
  "listWorkspaceTransferJobs(",
  "createWorkspaceExportJob(",
  "downloadWorkspaceTransferJob(",
  "const loadJobs =",
  "const handleCreateJob =",
  "const handleDownload =",
  "const COPY:",
  "jobs.map((job) =>",
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`workspace-export-jobs-card.tsx must keep controller logic delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 100;
if (lineCount > maxAllowedLines) {
  throw new Error(`workspace-export-jobs-card.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

for (const requiredControllerImport of [
  'import { useWorkspaceExportJobsState } from "./use-workspace-export-jobs-state";',
  'import { createWorkspaceExportJobsActions } from "./workspace-export-jobs-actions";',
]) {
  if (!controllerSource.includes(requiredControllerImport)) {
    throw new Error(`use-workspace-export-jobs-controller.ts must import delegated helpers: ${requiredControllerImport}`);
  }
}

for (const requiredControllerUsage of [
  "useWorkspaceExportJobsState()",
  "createWorkspaceExportJobsActions({",
  "void loadJobs()",
  "...state",
]) {
  if (!controllerSource.includes(requiredControllerUsage)) {
    throw new Error(`use-workspace-export-jobs-controller.ts must delegate controller orchestration: ${requiredControllerUsage}`);
  }
}

for (const forbiddenControllerToken of [
  "useState(",
  'from "../lib/api"',
  "listWorkspaceTransferJobs(",
  "createWorkspaceExportJob(",
  "downloadWorkspaceTransferJob(",
  "function getActionErrorMessage(",
  "const loadJobs =",
  "const handleCreateJob =",
  "const handleDownload =",
]) {
  if (controllerSource.includes(forbiddenControllerToken)) {
    throw new Error(`use-workspace-export-jobs-controller.ts must keep state and action internals delegated: ${forbiddenControllerToken}`);
  }
}

if (controllerLineCount > 50) {
  throw new Error(`use-workspace-export-jobs-controller.ts exceeded 50 lines: ${controllerLineCount}`);
}

for (const requiredStateUsage of [
  'import { useState } from "react";',
  "useState<WorkspaceTransferJob[]>([])",
  "setActionLoading",
  "setMessage",
]) {
  if (!stateSource.includes(requiredStateUsage)) {
    throw new Error(`use-workspace-export-jobs-state.ts must own controller state registration: ${requiredStateUsage}`);
  }
}

if (stateLineCount > 30) {
  throw new Error(`use-workspace-export-jobs-state.ts exceeded 30 lines: ${stateLineCount}`);
}

for (const requiredActionsUsage of [
  'from "../lib/api";',
  "function getActionErrorMessage(",
  "export function createWorkspaceExportJobsActions({",
  "listWorkspaceTransferJobs(token)",
  "createWorkspaceExportJob(token, workspaceId)",
  "downloadWorkspaceTransferJob(token, jobId)",
  "window.URL.createObjectURL(result.blob)",
]) {
  if (!actionsSource.includes(requiredActionsUsage)) {
    throw new Error(`workspace-export-jobs-actions.ts must own export-job actions: ${requiredActionsUsage}`);
  }
}

if (actionsLineCount > 100) {
  throw new Error(`workspace-export-jobs-actions.ts exceeded 100 lines: ${actionsLineCount}`);
}

console.log("workspace-export-jobs structure verification passed");

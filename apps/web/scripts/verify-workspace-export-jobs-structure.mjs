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
const exportJobsListPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-list.tsx",
);
const exportJobsListItemPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-list-item.tsx",
);
const exportJobsListItemTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-list-item.types.ts",
);
const source = fs.readFileSync(exportJobsPath, "utf8");
const controllerSource = fs.readFileSync(exportJobsControllerPath, "utf8");
const stateSource = fs.readFileSync(exportJobsStatePath, "utf8");
const actionsSource = fs.readFileSync(exportJobsActionsPath, "utf8");
const listSource = fs.readFileSync(exportJobsListPath, "utf8");
const listItemSource = fs.readFileSync(exportJobsListItemPath, "utf8");
const listItemTypesSource = fs.readFileSync(exportJobsListItemTypesPath, "utf8");
const lineCount = source.split(/\r?\n/).length;
const controllerLineCount = controllerSource.split(/\r?\n/).length;
const stateLineCount = stateSource.split(/\r?\n/).length;
const actionsLineCount = actionsSource.split(/\r?\n/).length;
const listLineCount = listSource.split(/\r?\n/).length;
const listItemLineCount = listItemSource.split(/\r?\n/).length;
const listItemTypesLineCount = listItemTypesSource.split(/\r?\n/).length;

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

for (const requiredListUsage of [
  'import { WorkspaceExportJobsListItem } from "./workspace-export-jobs-list-item";',
  'import type { WorkspaceExportJobsListProps } from "./workspace-export-jobs-list.types";',
  "<WorkspaceExportJobsListItem",
]) {
  if (!listSource.includes(requiredListUsage)) {
    throw new Error(`workspace-export-jobs-list.tsx must delegate per-job rendering: ${requiredListUsage}`);
  }
}

for (const forbiddenListToken of [
  'new Date(job.created_at).toLocaleString(locale)',
  'job.status === "completed"',
  'job.error_message ? <div className="notice error" style={{ marginTop: 12 }}>{job.error_message}</div> : null',
]) {
  if (listSource.includes(forbiddenListToken)) {
    throw new Error(`workspace-export-jobs-list.tsx must keep single-job details delegated: ${forbiddenListToken}`);
  }
}

if (listLineCount > 30) {
  throw new Error(`workspace-export-jobs-list.tsx exceeded 30 lines: ${listLineCount}`);
}

for (const requiredListItemUsage of [
  'import type { WorkspaceExportJobsListItemProps } from "./workspace-export-jobs-list-item.types";',
  "}: WorkspaceExportJobsListItemProps) {",
  'new Date(job.created_at).toLocaleString(locale)',
  'job.status === "completed"',
  'job.error_message ? <div className="notice error" style={{ marginTop: 12 }}>{job.error_message}</div> : null',
]) {
  if (!listItemSource.includes(requiredListItemUsage)) {
    throw new Error(`workspace-export-jobs-list-item.tsx must own single-job rendering: ${requiredListItemUsage}`);
  }
}

if (listItemLineCount > 35) {
  throw new Error(`workspace-export-jobs-list-item.tsx exceeded 35 lines: ${listItemLineCount}`);
}

for (const requiredListItemTypesUsage of [
  'import type { WorkspaceExportJobsListProps } from "./workspace-export-jobs-list.types"; export type WorkspaceExportJobsListItemProps = Pick<WorkspaceExportJobsListProps, "actionLoading" | "downloadLabel" | "locale" | "onDownload"> & { job: WorkspaceExportJobsListProps["jobs"][number] };',
]) {
  if (!listItemTypesSource.includes(requiredListItemTypesUsage)) {
    throw new Error(`workspace-export-jobs-list-item.types.ts must own list-item prop typing: ${requiredListItemTypesUsage}`);
  }
}

if (listItemTypesLineCount > 2) {
  throw new Error(`workspace-export-jobs-list-item.types.ts exceeded 2 lines: ${listItemTypesLineCount}`);
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

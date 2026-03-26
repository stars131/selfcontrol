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
const exportJobsEmptyStatePath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-empty-state.tsx",
);
const exportJobsEmptyStateTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-empty-state.types.ts",
);
const exportJobsHeaderPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-header.tsx",
);
const exportJobsHeaderActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-header-actions.tsx",
);
const exportJobsHeaderActionsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-header-actions.types.ts",
);
const exportJobsHeaderTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-header.types.ts",
);
const exportJobsNoticesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-notices.tsx",
);
const exportJobsNoticesTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-notices.types.ts",
);
const exportJobsListItemPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-list-item.tsx",
);
const exportJobsListItemSummaryPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-list-item-summary.tsx",
);
const exportJobsListItemSummaryTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-list-item-summary.types.ts",
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
const emptyStateSource = fs.readFileSync(exportJobsEmptyStatePath, "utf8");
const emptyStateTypesSource = fs.readFileSync(exportJobsEmptyStateTypesPath, "utf8");
const headerSource = fs.readFileSync(exportJobsHeaderPath, "utf8");
const headerActionsSource = fs.readFileSync(exportJobsHeaderActionsPath, "utf8");
const headerActionsTypesSource = fs.readFileSync(exportJobsHeaderActionsTypesPath, "utf8");
const headerTypesSource = fs.readFileSync(exportJobsHeaderTypesPath, "utf8");
const noticesSource = fs.readFileSync(exportJobsNoticesPath, "utf8");
const noticesTypesSource = fs.readFileSync(exportJobsNoticesTypesPath, "utf8");
const listItemSource = fs.readFileSync(exportJobsListItemPath, "utf8");
const listItemSummarySource = fs.readFileSync(exportJobsListItemSummaryPath, "utf8");
const listItemSummaryTypesSource = fs.readFileSync(exportJobsListItemSummaryTypesPath, "utf8");
const listItemTypesSource = fs.readFileSync(exportJobsListItemTypesPath, "utf8");
const lineCount = source.split(/\r?\n/).length;
const controllerLineCount = controllerSource.split(/\r?\n/).length;
const stateLineCount = stateSource.split(/\r?\n/).length;
const actionsLineCount = actionsSource.split(/\r?\n/).length;
const listLineCount = listSource.split(/\r?\n/).length;
const emptyStateLineCount = emptyStateSource.split(/\r?\n/).length;
const emptyStateTypesLineCount = emptyStateTypesSource.split(/\r?\n/).length;
const headerLineCount = headerSource.split(/\r?\n/).length;
const headerActionsLineCount = headerActionsSource.split(/\r?\n/).length;
const headerActionsTypesLineCount = headerActionsTypesSource.split(/\r?\n/).length;
const headerTypesLineCount = headerTypesSource.split(/\r?\n/).length;
const noticesLineCount = noticesSource.split(/\r?\n/).length;
const noticesTypesLineCount = noticesTypesSource.split(/\r?\n/).length;
const listItemLineCount = listItemSource.split(/\r?\n/).length;
const listItemSummaryLineCount = listItemSummarySource.split(/\r?\n/).length;
const listItemSummaryTypesLineCount = listItemSummaryTypesSource.split(/\r?\n/).length;
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

if (!source.includes('import { WorkspaceExportJobsHeader } from "./workspace-export-jobs-header";')) {
  throw new Error("workspace-export-jobs-card.tsx must import WorkspaceExportJobsHeader");
}

if (!source.includes('import { WorkspaceExportJobsNotices } from "./workspace-export-jobs-notices";')) {
  throw new Error("workspace-export-jobs-card.tsx must import WorkspaceExportJobsNotices");
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

if (!source.includes("<WorkspaceExportJobsHeader")) {
  throw new Error("workspace-export-jobs-card.tsx must delegate export-job header rendering");
}

if (!source.includes("<WorkspaceExportJobsNotices")) {
  throw new Error("workspace-export-jobs-card.tsx must delegate export-job notices rendering");
}

for (const requiredListUsage of [
  'import { WorkspaceExportJobsEmptyState } from "./workspace-export-jobs-empty-state";',
  'import { WorkspaceExportJobsListItem } from "./workspace-export-jobs-list-item";',
  'import type { WorkspaceExportJobsListProps } from "./workspace-export-jobs-list.types";',
  "<WorkspaceExportJobsListItem",
  "<WorkspaceExportJobsEmptyState",
]) {
  if (!listSource.includes(requiredListUsage)) {
    throw new Error(`workspace-export-jobs-list.tsx must delegate per-job rendering: ${requiredListUsage}`);
  }
}

for (const forbiddenListToken of [
  'new Date(job.created_at).toLocaleString(locale)',
  'job.status === "completed"',
  'job.error_message ? <div className="notice error" style={{ marginTop: 12 }}>{job.error_message}</div> : null',
  '<div className="notice">{emptyLabel}</div>',
]) {
  if (listSource.includes(forbiddenListToken)) {
    throw new Error(`workspace-export-jobs-list.tsx must keep single-job details delegated: ${forbiddenListToken}`);
  }
}

if (listLineCount > 30) {
  throw new Error(`workspace-export-jobs-list.tsx exceeded 30 lines: ${listLineCount}`);
}

for (const requiredEmptyStateUsage of [
  'import type { WorkspaceExportJobsEmptyStateProps } from "./workspace-export-jobs-empty-state.types";',
  "}: WorkspaceExportJobsEmptyStateProps) {",
  '<div className="notice">{emptyLabel}</div>',
]) {
  if (!emptyStateSource.includes(requiredEmptyStateUsage)) {
    throw new Error(`workspace-export-jobs-empty-state.tsx must own empty-state rendering: ${requiredEmptyStateUsage}`);
  }
}

if (emptyStateSource.includes("type WorkspaceExportJobsEmptyStateProps = Pick<")) {
  throw new Error("workspace-export-jobs-empty-state.tsx must keep empty-state prop typing delegated");
}

if (emptyStateLineCount > 8) {
  throw new Error(`workspace-export-jobs-empty-state.tsx exceeded 8 lines: ${emptyStateLineCount}`);
}

for (const requiredEmptyStateTypesUsage of [
  'import type { WorkspaceExportJobsListProps } from "./workspace-export-jobs-list.types"; export type WorkspaceExportJobsEmptyStateProps = Pick<WorkspaceExportJobsListProps, "emptyLabel">;',
]) {
  if (!emptyStateTypesSource.includes(requiredEmptyStateTypesUsage)) {
    throw new Error(`workspace-export-jobs-empty-state.types.ts must own empty-state prop typing: ${requiredEmptyStateTypesUsage}`);
  }
}

if (emptyStateTypesLineCount > 2) {
  throw new Error(`workspace-export-jobs-empty-state.types.ts exceeded 2 lines: ${emptyStateTypesLineCount}`);
}

for (const requiredHeaderUsage of [
  'import { WorkspaceExportJobsHeaderActions } from "./workspace-export-jobs-header-actions";',
  'import type { WorkspaceExportJobsHeaderProps } from "./workspace-export-jobs-header.types";',
  "}: WorkspaceExportJobsHeaderProps) {",
  '<div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>',
  "<WorkspaceExportJobsHeaderActions",
]) {
  if (!headerSource.includes(requiredHeaderUsage)) {
    throw new Error(`workspace-export-jobs-header.tsx must own export-job heading and toolbar rendering: ${requiredHeaderUsage}`);
  }
}

for (const forbiddenHeaderToken of [
  "type WorkspaceExportJobsHeaderProps = {",
  '<div className="action-row">',
  "onClick={onLoadJobs}",
  "onClick={onCreateJob}",
  'role === "owner" ? (',
]) {
  if (headerSource.includes(forbiddenHeaderToken)) {
    throw new Error(`workspace-export-jobs-header.tsx must keep header internals delegated: ${forbiddenHeaderToken}`);
  }
}

if (headerLineCount > 20) {
  throw new Error(`workspace-export-jobs-header.tsx exceeded 20 lines: ${headerLineCount}`);
}

for (const requiredHeaderActionsUsage of [
  'import type { WorkspaceExportJobsHeaderActionsProps } from "./workspace-export-jobs-header-actions.types";',
  "}: WorkspaceExportJobsHeaderActionsProps) {",
  '<div className="action-row">',
  "onClick={onLoadJobs}",
  "onClick={onCreateJob}",
  'role === "owner" ? (',
]) {
  if (!headerActionsSource.includes(requiredHeaderActionsUsage)) {
    throw new Error(`workspace-export-jobs-header-actions.tsx must own toolbar rendering: ${requiredHeaderActionsUsage}`);
  }
}

if (headerActionsSource.includes("type WorkspaceExportJobsHeaderActionsProps = Pick<")) {
  throw new Error("workspace-export-jobs-header-actions.tsx must keep header-actions prop typing delegated");
}

if (headerActionsLineCount > 22) {
  throw new Error(`workspace-export-jobs-header-actions.tsx exceeded 22 lines: ${headerActionsLineCount}`);
}

for (const requiredHeaderActionsTypesUsage of [
  'import type { WorkspaceExportJobsHeaderProps } from "./workspace-export-jobs-header.types"; export type WorkspaceExportJobsHeaderActionsProps = Pick<WorkspaceExportJobsHeaderProps, "actionLoading" | "copy" | "loading" | "onCreateJob" | "onLoadJobs" | "role">;',
]) {
  if (!headerActionsTypesSource.includes(requiredHeaderActionsTypesUsage)) {
    throw new Error(`workspace-export-jobs-header-actions.types.ts must own header-actions prop typing: ${requiredHeaderActionsTypesUsage}`);
  }
}

if (headerActionsTypesLineCount > 2) {
  throw new Error(`workspace-export-jobs-header-actions.types.ts exceeded 2 lines: ${headerActionsTypesLineCount}`);
}

for (const requiredHeaderTypesUsage of [
  'import { getWorkspaceExportJobsCopy } from "./workspace-export-jobs-copy"; export type WorkspaceExportJobsHeaderProps = { actionLoading: boolean; copy: ReturnType<typeof getWorkspaceExportJobsCopy>; loading: boolean; onCreateJob: () => void; onLoadJobs: () => void; role: "owner" | "editor" };',
]) {
  if (!headerTypesSource.includes(requiredHeaderTypesUsage)) {
    throw new Error(`workspace-export-jobs-header.types.ts must own header prop typing: ${requiredHeaderTypesUsage}`);
  }
}

if (headerTypesLineCount > 2) {
  throw new Error(`workspace-export-jobs-header.types.ts exceeded 2 lines: ${headerTypesLineCount}`);
}

for (const requiredNoticesUsage of [
  'import type { WorkspaceExportJobsNoticesProps } from "./workspace-export-jobs-notices.types";',
  "}: WorkspaceExportJobsNoticesProps) {",
  'role !== "owner" ? <div className="notice" style={{ marginTop: 16 }}>{ownerOnlyLabel}</div> : null',
  'error ? <div className="notice error" style={{ marginTop: 16 }}>{error}</div> : null',
  'message ? <div className="notice" style={{ marginTop: 16 }}>{message}</div> : null',
]) {
  if (!noticesSource.includes(requiredNoticesUsage)) {
    throw new Error(`workspace-export-jobs-notices.tsx must own card notices rendering: ${requiredNoticesUsage}`);
  }
}

if (noticesSource.includes("type WorkspaceExportJobsNoticesProps = Pick<")) {
  throw new Error("workspace-export-jobs-notices.tsx must keep notices prop typing delegated");
}

if (noticesLineCount > 18) {
  throw new Error(`workspace-export-jobs-notices.tsx exceeded 18 lines: ${noticesLineCount}`);
}

for (const requiredNoticesTypesUsage of [
  'import type { WorkspaceExportJobsCardProps } from "./workspace-export-jobs-card.types"; export type WorkspaceExportJobsNoticesProps = Pick<WorkspaceExportJobsCardProps, "role"> & { error: string; message: string; ownerOnlyLabel: string };',
]) {
  if (!noticesTypesSource.includes(requiredNoticesTypesUsage)) {
    throw new Error(`workspace-export-jobs-notices.types.ts must own notices prop typing: ${requiredNoticesTypesUsage}`);
  }
}

if (noticesTypesLineCount > 2) {
  throw new Error(`workspace-export-jobs-notices.types.ts exceeded 2 lines: ${noticesTypesLineCount}`);
}

for (const requiredListItemUsage of [
  'import { WorkspaceExportJobsListItemSummary } from "./workspace-export-jobs-list-item-summary";',
  'import type { WorkspaceExportJobsListItemProps } from "./workspace-export-jobs-list-item.types";',
  "}: WorkspaceExportJobsListItemProps) {",
  "<WorkspaceExportJobsListItemSummary",
  'job.status === "completed"',
  'job.error_message ? <div className="notice error" style={{ marginTop: 12 }}>{job.error_message}</div> : null',
]) {
  if (!listItemSource.includes(requiredListItemUsage)) {
    throw new Error(`workspace-export-jobs-list-item.tsx must own single-job rendering: ${requiredListItemUsage}`);
  }
}

for (const forbiddenListItemToken of [
  'new Date(job.created_at).toLocaleString(locale)',
  '<div className="eyebrow">{job.job_type} / {job.status}</div>',
  '<div style={{ marginTop: 8, fontWeight: 600 }}>{job.id}</div>',
]) {
  if (listItemSource.includes(forbiddenListItemToken)) {
    throw new Error(`workspace-export-jobs-list-item.tsx must keep summary details delegated: ${forbiddenListItemToken}`);
  }
}

if (listItemLineCount > 22) {
  throw new Error(`workspace-export-jobs-list-item.tsx exceeded 22 lines: ${listItemLineCount}`);
}

for (const requiredListItemSummaryUsage of [
  'import type { WorkspaceExportJobsListItemSummaryProps } from "./workspace-export-jobs-list-item-summary.types";',
  "}: WorkspaceExportJobsListItemSummaryProps) {",
  '<div className="eyebrow">{job.job_type} / {job.status}</div>',
  '<div style={{ marginTop: 8, fontWeight: 600 }}>{job.id}</div>',
  'new Date(job.created_at).toLocaleString(locale)',
]) {
  if (!listItemSummarySource.includes(requiredListItemSummaryUsage)) {
    throw new Error(`workspace-export-jobs-list-item-summary.tsx must own summary rendering: ${requiredListItemSummaryUsage}`);
  }
}

if (listItemSummarySource.includes("type WorkspaceExportJobsListItemSummaryProps = Pick<")) {
  throw new Error("workspace-export-jobs-list-item-summary.tsx must keep summary prop typing delegated");
}

if (listItemSummaryLineCount > 14) {
  throw new Error(`workspace-export-jobs-list-item-summary.tsx exceeded 14 lines: ${listItemSummaryLineCount}`);
}

for (const requiredListItemSummaryTypesUsage of [
  'import type { WorkspaceExportJobsListItemProps } from "./workspace-export-jobs-list-item.types"; export type WorkspaceExportJobsListItemSummaryProps = Pick<WorkspaceExportJobsListItemProps, "job" | "locale">;',
]) {
  if (!listItemSummaryTypesSource.includes(requiredListItemSummaryTypesUsage)) {
    throw new Error(`workspace-export-jobs-list-item-summary.types.ts must own summary prop typing: ${requiredListItemSummaryTypesUsage}`);
  }
}

if (listItemSummaryTypesLineCount > 2) {
  throw new Error(`workspace-export-jobs-list-item-summary.types.ts exceeded 2 lines: ${listItemSummaryTypesLineCount}`);
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
  '<div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>',
  "onClick={() => void loadJobs()}",
  "onClick={() => void handleCreateJob()}",
  'role !== "owner" ? <div className="notice" style={{ marginTop: 16 }}>{copy.ownerOnly}</div> : null',
  'error ? <div className="notice error" style={{ marginTop: 16 }}>{error}</div> : null',
  'message ? <div className="notice" style={{ marginTop: 16 }}>{message}</div> : null',
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`workspace-export-jobs-card.tsx must keep controller logic delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 80;
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

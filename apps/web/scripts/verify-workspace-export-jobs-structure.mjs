import fs from "node:fs";
import path from "node:path";

const exportJobsPath = path.resolve(process.cwd(), "components/workspace-export-jobs-card.tsx");
const exportJobsContentPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-content.tsx",
);
const exportJobsContentTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-content.types.ts",
);
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
const exportJobsHeaderIntroPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-header-intro.tsx",
);
const exportJobsHeaderIntroTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-header-intro.types.ts",
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
const exportJobsListItemActionPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-list-item-action.tsx",
);
const exportJobsListItemActionTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-list-item-action.types.ts",
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
const contentSource = fs.readFileSync(exportJobsContentPath, "utf8");
const contentTypesSource = fs.readFileSync(exportJobsContentTypesPath, "utf8");
const controllerSource = fs.readFileSync(exportJobsControllerPath, "utf8");
const stateSource = fs.readFileSync(exportJobsStatePath, "utf8");
const actionsSource = fs.readFileSync(exportJobsActionsPath, "utf8");
const listSource = fs.readFileSync(exportJobsListPath, "utf8");
const emptyStateSource = fs.readFileSync(exportJobsEmptyStatePath, "utf8");
const emptyStateTypesSource = fs.readFileSync(exportJobsEmptyStateTypesPath, "utf8");
const headerSource = fs.readFileSync(exportJobsHeaderPath, "utf8");
const headerIntroSource = fs.readFileSync(exportJobsHeaderIntroPath, "utf8");
const headerIntroTypesSource = fs.readFileSync(exportJobsHeaderIntroTypesPath, "utf8");
const headerActionsSource = fs.readFileSync(exportJobsHeaderActionsPath, "utf8");
const headerActionsTypesSource = fs.readFileSync(exportJobsHeaderActionsTypesPath, "utf8");
const headerTypesSource = fs.readFileSync(exportJobsHeaderTypesPath, "utf8");
const noticesSource = fs.readFileSync(exportJobsNoticesPath, "utf8");
const noticesTypesSource = fs.readFileSync(exportJobsNoticesTypesPath, "utf8");
const listItemSource = fs.readFileSync(exportJobsListItemPath, "utf8");
const listItemActionSource = fs.readFileSync(exportJobsListItemActionPath, "utf8");
const listItemActionTypesSource = fs.readFileSync(exportJobsListItemActionTypesPath, "utf8");
const listItemSummarySource = fs.readFileSync(exportJobsListItemSummaryPath, "utf8");
const listItemSummaryTypesSource = fs.readFileSync(exportJobsListItemSummaryTypesPath, "utf8");
const listItemTypesSource = fs.readFileSync(exportJobsListItemTypesPath, "utf8");
const lineCount = source.split(/\r?\n/).length;
const contentLineCount = contentSource.split(/\r?\n/).length;
const contentTypesLineCount = contentTypesSource.split(/\r?\n/).length;
const controllerLineCount = controllerSource.split(/\r?\n/).length;
const stateLineCount = stateSource.split(/\r?\n/).length;
const actionsLineCount = actionsSource.split(/\r?\n/).length;
const listLineCount = listSource.split(/\r?\n/).length;
const emptyStateLineCount = emptyStateSource.split(/\r?\n/).length;
const emptyStateTypesLineCount = emptyStateTypesSource.split(/\r?\n/).length;
const headerLineCount = headerSource.split(/\r?\n/).length;
const headerIntroLineCount = headerIntroSource.split(/\r?\n/).length;
const headerIntroTypesLineCount = headerIntroTypesSource.split(/\r?\n/).length;
const headerActionsLineCount = headerActionsSource.split(/\r?\n/).length;
const headerActionsTypesLineCount = headerActionsTypesSource.split(/\r?\n/).length;
const headerTypesLineCount = headerTypesSource.split(/\r?\n/).length;
const noticesLineCount = noticesSource.split(/\r?\n/).length;
const noticesTypesLineCount = noticesTypesSource.split(/\r?\n/).length;
const listItemLineCount = listItemSource.split(/\r?\n/).length;
const listItemActionLineCount = listItemActionSource.split(/\r?\n/).length;
const listItemActionTypesLineCount = listItemActionTypesSource.split(/\r?\n/).length;
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

if (!source.includes('import { WorkspaceExportJobsContent } from "./workspace-export-jobs-content";')) {
  throw new Error("workspace-export-jobs-card.tsx must import WorkspaceExportJobsContent");
}

if (!source.includes("getWorkspaceExportJobsCopy(locale)")) {
  throw new Error("workspace-export-jobs-card.tsx must delegate locale copy lookup");
}

if (!source.includes("<WorkspaceExportJobsContent")) {
  throw new Error("workspace-export-jobs-card.tsx must delegate export-job content rendering");
}

for (const requiredContentUsage of [
  'import { WorkspaceExportJobsHeader } from "./workspace-export-jobs-header";',
  'import { WorkspaceExportJobsList } from "./workspace-export-jobs-list";',
  'import { WorkspaceExportJobsNotices } from "./workspace-export-jobs-notices";',
  'import type { WorkspaceExportJobsContentProps } from "./workspace-export-jobs-content.types";',
  "}: WorkspaceExportJobsContentProps) {",
  "<WorkspaceExportJobsHeader",
  "<WorkspaceExportJobsNotices",
  "<WorkspaceExportJobsList",
]) {
  if (!contentSource.includes(requiredContentUsage)) {
    throw new Error(`workspace-export-jobs-content.tsx must own export-job content composition: ${requiredContentUsage}`);
  }
}

if (contentSource.includes("type WorkspaceExportJobsContentProps =")) {
  throw new Error("workspace-export-jobs-content.tsx must keep export-job content prop typing delegated");
}

if (contentLineCount > 10) {
  throw new Error(`workspace-export-jobs-content.tsx exceeded 10 lines: ${contentLineCount}`);
}

for (const requiredContentTypesUsage of [
  'import type { WorkspaceExportJobsHeaderProps } from "./workspace-export-jobs-header.types"; import type { WorkspaceExportJobsListProps } from "./workspace-export-jobs-list.types"; import type { WorkspaceExportJobsNoticesProps } from "./workspace-export-jobs-notices.types"; export type WorkspaceExportJobsContentProps = { headerProps: WorkspaceExportJobsHeaderProps; listProps: WorkspaceExportJobsListProps; noticesProps: WorkspaceExportJobsNoticesProps };',
]) {
  if (!contentTypesSource.includes(requiredContentTypesUsage)) {
    throw new Error(`workspace-export-jobs-content.types.ts must own export-job content prop typing: ${requiredContentTypesUsage}`);
  }
}

if (contentTypesLineCount > 2) {
  throw new Error(`workspace-export-jobs-content.types.ts exceeded 2 lines: ${contentTypesLineCount}`);
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
  'import { WorkspaceExportJobsHeaderIntro } from "./workspace-export-jobs-header-intro";',
  'import type { WorkspaceExportJobsHeaderProps } from "./workspace-export-jobs-header.types";',
  "}: WorkspaceExportJobsHeaderProps) {",
  '<div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>',
  "<WorkspaceExportJobsHeaderIntro",
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
  '<div className="eyebrow">{copy.eyebrow}</div>',
  "{copy.title}",
  "{copy.description}",
]) {
  if (headerSource.includes(forbiddenHeaderToken)) {
    throw new Error(`workspace-export-jobs-header.tsx must keep header internals delegated: ${forbiddenHeaderToken}`);
  }
}

if (headerLineCount > 20) {
  throw new Error(`workspace-export-jobs-header.tsx exceeded 20 lines: ${headerLineCount}`);
}

for (const requiredHeaderIntroUsage of [
  'import type { WorkspaceExportJobsHeaderIntroProps } from "./workspace-export-jobs-header-intro.types";',
  "}: WorkspaceExportJobsHeaderIntroProps) {",
  '<div className="eyebrow">{copy.eyebrow}</div>',
  "{copy.title}",
  "{copy.description}",
]) {
  if (!headerIntroSource.includes(requiredHeaderIntroUsage)) {
    throw new Error(`workspace-export-jobs-header-intro.tsx must own header intro rendering: ${requiredHeaderIntroUsage}`);
  }
}

if (headerIntroSource.includes("type WorkspaceExportJobsHeaderIntroProps = Pick<")) {
  throw new Error("workspace-export-jobs-header-intro.tsx must keep header-intro prop typing delegated");
}

if (headerIntroLineCount > 8) {
  throw new Error(`workspace-export-jobs-header-intro.tsx exceeded 8 lines: ${headerIntroLineCount}`);
}

for (const requiredHeaderIntroTypesUsage of [
  'import type { WorkspaceExportJobsHeaderProps } from "./workspace-export-jobs-header.types"; export type WorkspaceExportJobsHeaderIntroProps = Pick<WorkspaceExportJobsHeaderProps, "copy">;',
]) {
  if (!headerIntroTypesSource.includes(requiredHeaderIntroTypesUsage)) {
    throw new Error(`workspace-export-jobs-header-intro.types.ts must own header-intro prop typing: ${requiredHeaderIntroTypesUsage}`);
  }
}

if (headerIntroTypesLineCount > 2) {
  throw new Error(`workspace-export-jobs-header-intro.types.ts exceeded 2 lines: ${headerIntroTypesLineCount}`);
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
  'import { WorkspaceExportJobsListItemAction } from "./workspace-export-jobs-list-item-action";',
  'import { WorkspaceExportJobsListItemSummary } from "./workspace-export-jobs-list-item-summary";',
  'import type { WorkspaceExportJobsListItemProps } from "./workspace-export-jobs-list-item.types";',
  "}: WorkspaceExportJobsListItemProps) {",
  "<WorkspaceExportJobsListItemAction",
  "<WorkspaceExportJobsListItemSummary",
  'job.error_message ? <div className="notice error" style={{ marginTop: 12 }}>{job.error_message}</div> : null',
]) {
  if (!listItemSource.includes(requiredListItemUsage)) {
    throw new Error(`workspace-export-jobs-list-item.tsx must own single-job rendering: ${requiredListItemUsage}`);
  }
}

for (const forbiddenListItemToken of [
  'job.status === "completed"',
  'onClick={() => void onDownload(job.id)}',
  '<button className="button secondary" disabled={actionLoading} type="button" onClick={() => void onDownload(job.id)}>',
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

for (const requiredListItemActionUsage of [
  'import type { WorkspaceExportJobsListItemActionProps } from "./workspace-export-jobs-list-item-action.types";',
  "}: WorkspaceExportJobsListItemActionProps) {",
  'job.status === "completed"',
  'onClick={() => void onDownload(job.id)}',
  "{downloadLabel}",
]) {
  if (!listItemActionSource.includes(requiredListItemActionUsage)) {
    throw new Error(`workspace-export-jobs-list-item-action.tsx must own item-action rendering: ${requiredListItemActionUsage}`);
  }
}

if (listItemActionSource.includes("type WorkspaceExportJobsListItemActionProps = Pick<")) {
  throw new Error("workspace-export-jobs-list-item-action.tsx must keep item-action prop typing delegated");
}

if (listItemActionLineCount > 8) {
  throw new Error(`workspace-export-jobs-list-item-action.tsx exceeded 8 lines: ${listItemActionLineCount}`);
}

for (const requiredListItemActionTypesUsage of [
  'import type { WorkspaceExportJobsListItemProps } from "./workspace-export-jobs-list-item.types"; export type WorkspaceExportJobsListItemActionProps = Pick<WorkspaceExportJobsListItemProps, "actionLoading" | "downloadLabel" | "job" | "onDownload">;',
]) {
  if (!listItemActionTypesSource.includes(requiredListItemActionTypesUsage)) {
    throw new Error(`workspace-export-jobs-list-item-action.types.ts must own item-action prop typing: ${requiredListItemActionTypesUsage}`);
  }
}

if (listItemActionTypesLineCount > 2) {
  throw new Error(`workspace-export-jobs-list-item-action.types.ts exceeded 2 lines: ${listItemActionTypesLineCount}`);
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

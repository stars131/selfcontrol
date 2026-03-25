import fs from "node:fs";
import path from "node:path";

const retentionCardPath = path.resolve(process.cwd(), "components/workspace-media-retention-card.tsx");
const retentionControllerPath = path.resolve(
  process.cwd(),
  "components/use-workspace-media-retention-controller.ts",
);
const retentionControllerTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-controller.types.ts",
);
const retentionControllerHelpersPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-controller-helpers.ts",
);
const retentionControllerActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-controller-actions.ts",
);
const retentionControllerActionsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-controller-actions.types.ts",
);
const retentionSelectionActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-selection-actions.ts",
);
const retentionSelectionActionsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-selection-actions.types.ts",
);
const retentionExecutionActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-execution-actions.ts",
);
const retentionExecutionActionsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-execution-actions.types.ts",
);
const retentionReportHookPath = path.resolve(
  process.cwd(),
  "components/use-workspace-media-retention-report.ts",
);
const retentionReportHookTypesPath = path.resolve(
  process.cwd(),
  "components/use-workspace-media-retention-report.types.ts",
);
const retentionCopyPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-copy.ts",
);
const retentionActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-actions.tsx",
);
const retentionActionsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-actions.types.ts",
);
const retentionOwnerActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-owner-actions.tsx",
);
const retentionOwnerActionsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-owner-actions.types.ts",
);
const retentionEditorNoticePath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-editor-notice.tsx",
);
const retentionEditorNoticeTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-editor-notice.types.ts",
);
const retentionNoticesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-notices.tsx",
);
const retentionCardCopyHelpersPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-card-copy-helpers.ts",
);
const retentionCardActionHelpersPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-card-action-helpers.ts",
);
const source = fs.readFileSync(retentionCardPath, "utf8");
const controllerSource = fs.readFileSync(retentionControllerPath, "utf8");
const retentionControllerTypesSource = fs.readFileSync(retentionControllerTypesPath, "utf8");
const retentionControllerHelpersSource = fs.readFileSync(retentionControllerHelpersPath, "utf8");
const retentionControllerActionsSource = fs.readFileSync(retentionControllerActionsPath, "utf8");
const retentionControllerActionsTypesSource = fs.readFileSync(
  retentionControllerActionsTypesPath,
  "utf8",
);
const retentionSelectionActionsSource = fs.readFileSync(retentionSelectionActionsPath, "utf8");
const retentionSelectionActionsTypesSource = fs.readFileSync(
  retentionSelectionActionsTypesPath,
  "utf8",
);
const retentionExecutionActionsSource = fs.readFileSync(retentionExecutionActionsPath, "utf8");
const retentionExecutionActionsTypesSource = fs.readFileSync(
  retentionExecutionActionsTypesPath,
  "utf8",
);
const retentionReportHookSource = fs.readFileSync(retentionReportHookPath, "utf8");
const retentionReportHookTypesSource = fs.readFileSync(retentionReportHookTypesPath, "utf8");
const copySource = fs.readFileSync(retentionCopyPath, "utf8");
const retentionActionsSource = fs.readFileSync(retentionActionsPath, "utf8");
const retentionActionsTypesSource = fs.readFileSync(retentionActionsTypesPath, "utf8");
const retentionOwnerActionsSource = fs.readFileSync(retentionOwnerActionsPath, "utf8");
const retentionOwnerActionsTypesSource = fs.readFileSync(retentionOwnerActionsTypesPath, "utf8");
const retentionEditorNoticeSource = fs.readFileSync(retentionEditorNoticePath, "utf8");
const retentionEditorNoticeTypesSource = fs.readFileSync(retentionEditorNoticeTypesPath, "utf8");
const retentionNoticesSource = fs.readFileSync(retentionNoticesPath, "utf8");
const retentionCardCopyHelpersSource = fs.readFileSync(retentionCardCopyHelpersPath, "utf8");
const retentionCardActionHelpersSource = fs.readFileSync(retentionCardActionHelpersPath, "utf8");
const lineCount = source.split(/\r?\n/).length;
const controllerLineCount = controllerSource.split(/\r?\n/).length;
const retentionControllerTypesLineCount =
  retentionControllerTypesSource.split(/\r?\n/).length;
const retentionControllerHelpersLineCount =
  retentionControllerHelpersSource.split(/\r?\n/).length;
const retentionControllerActionsLineCount =
  retentionControllerActionsSource.split(/\r?\n/).length;
const retentionControllerActionsTypesLineCount =
  retentionControllerActionsTypesSource.split(/\r?\n/).length;
const retentionSelectionActionsLineCount =
  retentionSelectionActionsSource.split(/\r?\n/).length;
const retentionSelectionActionsTypesLineCount =
  retentionSelectionActionsTypesSource.split(/\r?\n/).length;
const retentionExecutionActionsLineCount =
  retentionExecutionActionsSource.split(/\r?\n/).length;
const retentionExecutionActionsTypesLineCount =
  retentionExecutionActionsTypesSource.split(/\r?\n/).length;
const retentionReportHookLineCount = retentionReportHookSource.split(/\r?\n/).length;
const retentionReportHookTypesLineCount =
  retentionReportHookTypesSource.split(/\r?\n/).length;
const copyLineCount = copySource.split(/\r?\n/).length;
const retentionActionsLineCount = retentionActionsSource.split(/\r?\n/).length;
const retentionActionsTypesLineCount = retentionActionsTypesSource.split(/\r?\n/).length;
const retentionOwnerActionsLineCount = retentionOwnerActionsSource.split(/\r?\n/).length;
const retentionOwnerActionsTypesLineCount =
  retentionOwnerActionsTypesSource.split(/\r?\n/).length;
const retentionEditorNoticeLineCount = retentionEditorNoticeSource.split(/\r?\n/).length;
const retentionEditorNoticeTypesLineCount =
  retentionEditorNoticeTypesSource.split(/\r?\n/).length;
const retentionNoticesLineCount = retentionNoticesSource.split(/\r?\n/).length;
const retentionCardCopyHelpersLineCount =
  retentionCardCopyHelpersSource.split(/\r?\n/).length;
const retentionCardActionHelpersLineCount =
  retentionCardActionHelpersSource.split(/\r?\n/).length;
const retentionListsPath = path.resolve(process.cwd(), "components/workspace-media-retention-lists.tsx");
const retentionListsSource = fs.readFileSync(retentionListsPath, "utf8");

for (const requiredRetentionReportHookImport of [
  'from "../lib/api";',
  'from "./workspace-media-retention-controller-helpers";',
  'import type { UseWorkspaceMediaRetentionReportInput } from "./use-workspace-media-retention-report.types";',
]) {
  if (!retentionReportHookSource.includes(requiredRetentionReportHookImport)) {
    throw new Error(
      `use-workspace-media-retention-report.ts must import delegated report-loading dependencies: ${requiredRetentionReportHookImport}`,
    );
  }
}

for (const requiredRetentionReportHookUsage of [
  "export function useWorkspaceMediaRetentionReport({",
  "}: UseWorkspaceMediaRetentionReportInput) {",
  "const loadReport = useCallback(",
  "void loadReport(olderThanDays);",
]) {
  if (!retentionReportHookSource.includes(requiredRetentionReportHookUsage)) {
    throw new Error(
      `use-workspace-media-retention-report.ts must own report loading through the extracted input type: ${requiredRetentionReportHookUsage}`,
    );
  }
}

for (const forbiddenRetentionReportHookToken of [
  'from "./workspace-media-retention-controller.types";',
  "type UseWorkspaceMediaRetentionReportInput = Pick<",
]) {
  if (retentionReportHookSource.includes(forbiddenRetentionReportHookToken)) {
    throw new Error(
      `use-workspace-media-retention-report.ts must keep report input typing delegated: ${forbiddenRetentionReportHookToken}`,
    );
  }
}

const maxRetentionReportHookLines = 55;
if (retentionReportHookLineCount > maxRetentionReportHookLines) {
  throw new Error(
    `use-workspace-media-retention-report.ts exceeded ${maxRetentionReportHookLines} lines: ${retentionReportHookLineCount}`,
  );
}

for (const requiredRetentionReportHookTypesUsage of [
  'import type { UseWorkspaceMediaRetentionControllerProps, WorkspaceMediaRetentionControllerState } from "./workspace-media-retention-controller.types"; export type UseWorkspaceMediaRetentionReportInput = Pick<UseWorkspaceMediaRetentionControllerProps, "loadFailedMessage" | "token" | "workspaceId"> & Pick<WorkspaceMediaRetentionControllerState, "olderThanDays" | "setError" | "setLoading" | "setReport" | "setSelectedMediaIds">;',
]) {
  if (!retentionReportHookTypesSource.includes(requiredRetentionReportHookTypesUsage)) {
    throw new Error(
      `use-workspace-media-retention-report.types.ts must own report input typing: ${requiredRetentionReportHookTypesUsage}`,
    );
  }
}

const maxRetentionReportHookTypesLines = 2;
if (retentionReportHookTypesLineCount > maxRetentionReportHookTypesLines) {
  throw new Error(
    `use-workspace-media-retention-report.types.ts exceeded ${maxRetentionReportHookTypesLines} lines: ${retentionReportHookTypesLineCount}`,
  );
}

if (!source.includes('useWorkspaceMediaRetentionController')) {
  throw new Error("workspace-media-retention-card.tsx must use useWorkspaceMediaRetentionController");
}

if (!source.includes('from "./workspace-media-retention-card-helpers";')) {
  throw new Error("workspace-media-retention-card.tsx must import workspace-media-retention-card-helpers");
}

if (!source.includes("useWorkspaceMediaRetentionController(buildWorkspaceMediaRetentionControllerInput({")) {
  throw new Error("workspace-media-retention-card.tsx must delegate retention orchestration to useWorkspaceMediaRetentionController");
}

if (!source.includes('import { MediaRetentionItemCard } from "./media-retention-item-card";')) {
  throw new Error("workspace-media-retention-card.tsx must import MediaRetentionItemCard");
}

if (!source.includes('import { WorkspaceMediaRetentionActions } from "./workspace-media-retention-actions";')) {
  throw new Error("workspace-media-retention-card.tsx must import WorkspaceMediaRetentionActions");
}

if (!source.includes('import { WorkspaceMediaRetentionNotices } from "./workspace-media-retention-notices";')) {
  throw new Error("workspace-media-retention-card.tsx must import WorkspaceMediaRetentionNotices");
}

if (!source.includes('import { WorkspaceMediaRetentionSummary } from "./workspace-media-retention-summary";')) {
  throw new Error("workspace-media-retention-card.tsx must import WorkspaceMediaRetentionSummary");
}

if (!source.includes('import { WorkspaceMediaRetentionLists } from "./workspace-media-retention-lists";')) {
  throw new Error("workspace-media-retention-card.tsx must import WorkspaceMediaRetentionLists");
}

if (!source.includes('import { WorkspaceMediaRetentionHeader } from "./workspace-media-retention-header";')) {
  throw new Error("workspace-media-retention-card.tsx must import WorkspaceMediaRetentionHeader");
}

if (!retentionListsSource.includes('import { MediaRetentionItemCard } from "./media-retention-item-card";')) {
  throw new Error("workspace-media-retention-lists.tsx must import MediaRetentionItemCard");
}

if (!retentionListsSource.includes("<MediaRetentionItemCard")) {
  throw new Error("workspace-media-retention-lists.tsx must delegate media item rendering to MediaRetentionItemCard");
}

if (!source.includes("<WorkspaceMediaRetentionActions")) {
  throw new Error("workspace-media-retention-card.tsx must delegate owner action rendering to WorkspaceMediaRetentionActions");
}

if (!source.includes("<WorkspaceMediaRetentionNotices")) {
  throw new Error("workspace-media-retention-card.tsx must delegate notice rendering to WorkspaceMediaRetentionNotices");
}

if (!source.includes("<WorkspaceMediaRetentionSummary")) {
  throw new Error("workspace-media-retention-card.tsx must delegate summary rendering to WorkspaceMediaRetentionSummary");
}

if (!source.includes("<WorkspaceMediaRetentionLists")) {
  throw new Error("workspace-media-retention-card.tsx must delegate file-list rendering to WorkspaceMediaRetentionLists");
}

if (!source.includes("<WorkspaceMediaRetentionHeader")) {
  throw new Error("workspace-media-retention-card.tsx must delegate header rendering to WorkspaceMediaRetentionHeader");
}

for (const requiredHelperUsage of [
  "buildWorkspaceMediaRetentionCopyBundle(locale)",
  "buildWorkspaceMediaRetentionControllerInput({",
  "buildWorkspaceMediaRetentionActionMessage({",
  "buildWorkspaceMediaRetentionActionsProps({",
]) {
  if (!source.includes(requiredHelperUsage)) {
    throw new Error(`workspace-media-retention-card.tsx must delegate helper logic: ${requiredHelperUsage}`);
  }
}

for (const forbiddenToken of [
  "useState(",
  "useEffect(",
  'from "../lib/api"',
  "getMediaRetentionReport(",
  "archiveMediaRetention(",
  "cleanupMediaRetention(",
  "const loadReport =",
  "const toggleSelectedMedia =",
  "const handleArchive =",
  "const handleCleanup =",
  "function renderItem(",
  'copy.totalTracked',
  "report.total_count",
  "report.largest_items.map((item)",
  "report.retention_candidates.map((item)",
  'copy.eyebrow',
  "setOlderThanDays(Number(event.target.value))",
  "handleCleanup({",
  "copy.archiveConfirmSelected",
  "copy.cleanupConfirmOrphans",
  "copy.cleanupConfirmSelected",
  "copy.ownerActions",
  "const COPY:",
  'copy.remoteMedia ?? "Remote media"',
  "actionResult?.kind === \"archive\"",
  "getWorkspaceMediaRetentionCopy(locale)",
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`workspace-media-retention-card.tsx must keep controller logic delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 120;
if (lineCount > maxAllowedLines) {
  throw new Error(`workspace-media-retention-card.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

for (const requiredControllerImport of [
  'from "./workspace-media-retention-controller.types";',
  'from "./workspace-media-retention-controller-actions";',
  'from "./use-workspace-media-retention-derived-data";',
  'from "./use-workspace-media-retention-report";',
  'from "./use-workspace-media-retention-state";',
]) {
  if (!controllerSource.includes(requiredControllerImport)) {
    throw new Error(`use-workspace-media-retention-controller.ts must import delegated helpers: ${requiredControllerImport}`);
  }
}

for (const requiredControllerUsage of [
  "useWorkspaceMediaRetentionState()",
  "useWorkspaceMediaRetentionReport({",
  "useWorkspaceMediaRetentionDerivedData({",
  "createWorkspaceMediaRetentionControllerActions({",
  "...state",
  "...actions",
]) {
  if (!controllerSource.includes(requiredControllerUsage)) {
    throw new Error(`use-workspace-media-retention-controller.ts must delegate controller orchestration: ${requiredControllerUsage}`);
  }
}

for (const forbiddenControllerToken of [
  'from "../lib/api";',
  "useEffect(",
  "useMemo(",
  "useState(",
  "getMediaRetentionReport(",
  "archiveMediaRetention(",
  "cleanupMediaRetention(",
  "function getActionErrorMessage",
  "const loadReport =",
  "const toggleSelectedMedia =",
  "const handleArchive =",
  "const handleCleanup =",
  "buildWorkspaceMediaRetentionRiskLabel(",
]) {
  if (controllerSource.includes(forbiddenControllerToken)) {
    throw new Error(`use-workspace-media-retention-controller.ts must keep report and action internals delegated: ${forbiddenControllerToken}`);
  }
}

const maxControllerLines = 80;
if (controllerLineCount > maxControllerLines) {
  throw new Error(
    `use-workspace-media-retention-controller.ts exceeded ${maxControllerLines} lines: ${controllerLineCount}`,
  );
}

for (const requiredControllerTypesUsage of [
  "export type WorkspaceMediaRetentionRiskLabelInput = Pick<",
  '"allHealthyLabel" | "missingFilesLabel" | "orphanFilesLabel" | "remoteMediaLabel"',
  "report: MediaRetentionReport | null;",
]) {
  if (!retentionControllerTypesSource.includes(requiredControllerTypesUsage)) {
    throw new Error(
      `workspace-media-retention-controller.types.ts must own risk label typing: ${requiredControllerTypesUsage}`,
    );
  }
}

for (const requiredControllerHelpersImport of [
  'from "./workspace-media-retention-controller.types";',
]) {
  if (!retentionControllerHelpersSource.includes(requiredControllerHelpersImport)) {
    throw new Error(
      `workspace-media-retention-controller-helpers.ts must import shared risk label contracts: ${requiredControllerHelpersImport}`,
    );
  }
}

for (const requiredControllerHelpersUsage of [
  "export function buildWorkspaceMediaRetentionRiskLabel({",
  "}: WorkspaceMediaRetentionRiskLabelInput)",
  'return "-";',
]) {
  if (!retentionControllerHelpersSource.includes(requiredControllerHelpersUsage)) {
    throw new Error(
      `workspace-media-retention-controller-helpers.ts must own risk label construction through shared contracts: ${requiredControllerHelpersUsage}`,
    );
  }
}

for (const forbiddenControllerHelpersToken of [
  'from "../lib/types";',
  "report: MediaRetentionReport | null;",
]) {
  if (retentionControllerHelpersSource.includes(forbiddenControllerHelpersToken)) {
    throw new Error(
      `workspace-media-retention-controller-helpers.ts must keep risk label typing delegated: ${forbiddenControllerHelpersToken}`,
    );
  }
}

const maxRetentionControllerHelpersLines = 30;
if (retentionControllerHelpersLineCount > maxRetentionControllerHelpersLines) {
  throw new Error(
    `workspace-media-retention-controller-helpers.ts exceeded ${maxRetentionControllerHelpersLines} lines: ${retentionControllerHelpersLineCount}`,
  );
}

for (const requiredControllerActionsImport of [
  'from "./workspace-media-retention-execution-actions";',
  'from "./workspace-media-retention-selection-actions";',
  'from "./workspace-media-retention-controller-actions.types";',
]) {
  if (!retentionControllerActionsSource.includes(requiredControllerActionsImport)) {
    throw new Error(
      `workspace-media-retention-controller-actions.ts must import delegated action groups: ${requiredControllerActionsImport}`,
    );
  }
}

for (const requiredControllerActionsUsage of [
  "export function createWorkspaceMediaRetentionControllerActions({",
  "}: CreateWorkspaceMediaRetentionControllerActionsInput) {",
  "createWorkspaceMediaRetentionSelectionActions({",
  "createWorkspaceMediaRetentionExecutionActions({",
  "...selectionActions",
  "...executionActions",
]) {
  if (!retentionControllerActionsSource.includes(requiredControllerActionsUsage)) {
    throw new Error(
      `workspace-media-retention-controller-actions.ts must delegate action assembly: ${requiredControllerActionsUsage}`,
    );
  }
}

for (const forbiddenControllerActionsToken of [
  'from "../lib/api";',
  'from "./workspace-media-retention-controller-helpers";',
  'from "./workspace-media-retention-controller.types";',
  "type CreateWorkspaceMediaRetentionControllerActionsInput = Pick<",
  "function toggleSelectedMedia",
  "function selectAllCandidates",
  "function clearSelection",
  "async function handleArchive",
  "async function handleCleanup",
]) {
  if (retentionControllerActionsSource.includes(forbiddenControllerActionsToken)) {
    throw new Error(
      `workspace-media-retention-controller-actions.ts must keep selection/execution internals delegated: ${forbiddenControllerActionsToken}`,
    );
  }
}

const maxRetentionControllerActionsLines = 65;
if (retentionControllerActionsLineCount > maxRetentionControllerActionsLines) {
  throw new Error(
    `workspace-media-retention-controller-actions.ts exceeded ${maxRetentionControllerActionsLines} lines: ${retentionControllerActionsLineCount}`,
  );
}

for (const requiredControllerActionsTypesUsage of [
  'import type { UseWorkspaceMediaRetentionControllerProps, WorkspaceMediaRetentionControllerState } from "./workspace-media-retention-controller.types"; export type CreateWorkspaceMediaRetentionControllerActionsInput = Pick<UseWorkspaceMediaRetentionControllerProps, "actionFailedMessage" | "token" | "workspaceId"> & Pick<WorkspaceMediaRetentionControllerState, "olderThanDays" | "report" | "selectedMediaIds" | "setActionError" | "setActionLoading" | "setActionResult" | "setSelectedMediaIds"> & { loadReport: (threshold: number) => Promise<void> };',
]) {
  if (!retentionControllerActionsTypesSource.includes(requiredControllerActionsTypesUsage)) {
    throw new Error(
      `workspace-media-retention-controller-actions.types.ts must own controller action input typing: ${requiredControllerActionsTypesUsage}`,
    );
  }
}

const maxRetentionControllerActionsTypesLines = 2;
if (retentionControllerActionsTypesLineCount > maxRetentionControllerActionsTypesLines) {
  throw new Error(
    `workspace-media-retention-controller-actions.types.ts exceeded ${maxRetentionControllerActionsTypesLines} lines: ${retentionControllerActionsTypesLineCount}`,
  );
}

for (const requiredSelectionActionsImport of [
  'import type { CreateWorkspaceMediaRetentionSelectionActionsInput } from "./workspace-media-retention-selection-actions.types";',
]) {
  if (!retentionSelectionActionsSource.includes(requiredSelectionActionsImport)) {
    throw new Error(
      `workspace-media-retention-selection-actions.ts must import delegated selection input typing: ${requiredSelectionActionsImport}`,
    );
  }
}

for (const requiredSelectionActionsUsage of [
  "export function createWorkspaceMediaRetentionSelectionActions({",
  "}: CreateWorkspaceMediaRetentionSelectionActionsInput) {",
  "function toggleSelectedMedia(mediaId: string)",
  "function selectAllCandidates()",
  "function clearSelection()",
]) {
  if (!retentionSelectionActionsSource.includes(requiredSelectionActionsUsage)) {
    throw new Error(
      `workspace-media-retention-selection-actions.ts must own selection behavior: ${requiredSelectionActionsUsage}`,
    );
  }
}

for (const forbiddenSelectionActionsToken of [
  "type CreateWorkspaceMediaRetentionSelectionActionsInput = Pick<",
]) {
  if (retentionSelectionActionsSource.includes(forbiddenSelectionActionsToken)) {
    throw new Error(
      `workspace-media-retention-selection-actions.ts must keep selection input typing delegated: ${forbiddenSelectionActionsToken}`,
    );
  }
}

const maxRetentionSelectionActionsLines = 35;
if (retentionSelectionActionsLineCount > maxRetentionSelectionActionsLines) {
  throw new Error(
    `workspace-media-retention-selection-actions.ts exceeded ${maxRetentionSelectionActionsLines} lines: ${retentionSelectionActionsLineCount}`,
  );
}

for (const requiredSelectionActionsTypesUsage of [
  'import type { WorkspaceMediaRetentionControllerState } from "./workspace-media-retention-controller.types"; export type CreateWorkspaceMediaRetentionSelectionActionsInput = Pick<WorkspaceMediaRetentionControllerState, "report" | "setSelectedMediaIds">;',
]) {
  if (!retentionSelectionActionsTypesSource.includes(requiredSelectionActionsTypesUsage)) {
    throw new Error(
      `workspace-media-retention-selection-actions.types.ts must own selection input typing: ${requiredSelectionActionsTypesUsage}`,
    );
  }
}

const maxRetentionSelectionActionsTypesLines = 2;
if (retentionSelectionActionsTypesLineCount > maxRetentionSelectionActionsTypesLines) {
  throw new Error(
    `workspace-media-retention-selection-actions.types.ts exceeded ${maxRetentionSelectionActionsTypesLines} lines: ${retentionSelectionActionsTypesLineCount}`,
  );
}

for (const requiredExecutionActionsImport of [
  'from "../lib/api";',
  'from "./workspace-media-retention-controller-helpers";',
  'from "./workspace-media-retention-execution-actions.types";',
  'from "./workspace-media-retention-controller.types";',
]) {
  if (!retentionExecutionActionsSource.includes(requiredExecutionActionsImport)) {
    throw new Error(
      `workspace-media-retention-execution-actions.ts must import execution dependencies: ${requiredExecutionActionsImport}`,
    );
  }
}

for (const requiredExecutionActionsUsage of [
  "export function createWorkspaceMediaRetentionExecutionActions({",
  "}: CreateWorkspaceMediaRetentionExecutionActionsInput) {",
  "async function handleArchive(confirmMessage: string)",
  "async function handleCleanup({",
  "archiveMediaRetention(token, workspaceId, {",
  "cleanupMediaRetention(token, workspaceId, {",
]) {
  if (!retentionExecutionActionsSource.includes(requiredExecutionActionsUsage)) {
    throw new Error(
      `workspace-media-retention-execution-actions.ts must own archive/cleanup execution: ${requiredExecutionActionsUsage}`,
    );
  }
}

for (const forbiddenExecutionActionsToken of [
  'import type { UseWorkspaceMediaRetentionControllerProps, WorkspaceMediaRetentionControllerState } from "./workspace-media-retention-controller.types";',
  "type CreateWorkspaceMediaRetentionExecutionActionsInput = Pick<",
]) {
  if (retentionExecutionActionsSource.includes(forbiddenExecutionActionsToken)) {
    throw new Error(
      `workspace-media-retention-execution-actions.ts must keep execution input typing delegated: ${forbiddenExecutionActionsToken}`,
    );
  }
}

const maxRetentionExecutionActionsLines = 95;
if (retentionExecutionActionsLineCount > maxRetentionExecutionActionsLines) {
  throw new Error(
    `workspace-media-retention-execution-actions.ts exceeded ${maxRetentionExecutionActionsLines} lines: ${retentionExecutionActionsLineCount}`,
  );
}

for (const requiredExecutionActionsTypesUsage of [
  'import type { UseWorkspaceMediaRetentionControllerProps, WorkspaceMediaRetentionControllerState } from "./workspace-media-retention-controller.types"; export type CreateWorkspaceMediaRetentionExecutionActionsInput = Pick<UseWorkspaceMediaRetentionControllerProps, "actionFailedMessage" | "token" | "workspaceId"> & Pick<WorkspaceMediaRetentionControllerState, "olderThanDays" | "selectedMediaIds" | "setActionError" | "setActionLoading" | "setActionResult"> & { loadReport: (threshold: number) => Promise<void> };',
]) {
  if (!retentionExecutionActionsTypesSource.includes(requiredExecutionActionsTypesUsage)) {
    throw new Error(
      `workspace-media-retention-execution-actions.types.ts must own execution input typing: ${requiredExecutionActionsTypesUsage}`,
    );
  }
}

const maxRetentionExecutionActionsTypesLines = 2;
if (retentionExecutionActionsTypesLineCount > maxRetentionExecutionActionsTypesLines) {
  throw new Error(
    `workspace-media-retention-execution-actions.types.ts exceeded ${maxRetentionExecutionActionsTypesLines} lines: ${retentionExecutionActionsTypesLineCount}`,
  );
}

const retentionDerivedDataPath = path.resolve(
  process.cwd(),
  "components/use-workspace-media-retention-derived-data.ts",
);
const retentionDerivedDataSource = fs.readFileSync(retentionDerivedDataPath, "utf8");

for (const requiredRetentionDerivedDataImport of [
  'from "./workspace-media-retention-controller-helpers";',
  'from "./workspace-media-retention-controller.types";',
]) {
  if (!retentionDerivedDataSource.includes(requiredRetentionDerivedDataImport)) {
    throw new Error(
      `use-workspace-media-retention-derived-data.ts must import shared retention helpers: ${requiredRetentionDerivedDataImport}`,
    );
  }
}

if (!retentionDerivedDataSource.includes("buildWorkspaceMediaRetentionRiskLabel({")) {
  throw new Error(
    "use-workspace-media-retention-derived-data.ts must delegate risk label construction through buildWorkspaceMediaRetentionRiskLabel",
  );
}

for (const requiredRetentionDerivedDataUsage of [
  "export function useWorkspaceMediaRetentionDerivedData({",
  "}: WorkspaceMediaRetentionRiskLabelInput)",
  "const storageRiskLabel = useMemo(",
]) {
  if (!retentionDerivedDataSource.includes(requiredRetentionDerivedDataUsage)) {
    throw new Error(
      `use-workspace-media-retention-derived-data.ts must use shared risk label typing: ${requiredRetentionDerivedDataUsage}`,
    );
  }
}

for (const forbiddenRetentionDerivedDataToken of [
  "Parameters<typeof buildWorkspaceMediaRetentionRiskLabel>[0][\"report\"]",
  "report: Parameters<typeof buildWorkspaceMediaRetentionRiskLabel>[0][\"report\"];",
]) {
  if (retentionDerivedDataSource.includes(forbiddenRetentionDerivedDataToken)) {
    throw new Error(
      `use-workspace-media-retention-derived-data.ts must keep risk label typing delegated: ${forbiddenRetentionDerivedDataToken}`,
    );
  }
}

const retentionCardHelpersPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-card-helpers.ts",
);
const retentionCardHelpersSource = fs.readFileSync(retentionCardHelpersPath, "utf8");

for (const requiredHelpersUsage of [
  'export {',
  'from "./workspace-media-retention-card-copy-helpers";',
  'from "./workspace-media-retention-card-action-helpers";',
]) {
  if (!retentionCardHelpersSource.includes(requiredHelpersUsage)) {
    throw new Error(
      `workspace-media-retention-card-helpers.ts must remain a thin re-export boundary: ${requiredHelpersUsage}`,
    );
  }
}

for (const forbiddenHelpersToken of [
  'from "./workspace-media-retention-actions";',
  'from "./workspace-media-retention-copy";',
  "buildWorkspaceMediaRetentionActionsProps({",
  "buildWorkspaceMediaRetentionCopyBundle(locale)",
]) {
  if (retentionCardHelpersSource.includes(forbiddenHelpersToken)) {
    throw new Error(
      `workspace-media-retention-card-helpers.ts must keep helper internals delegated: ${forbiddenHelpersToken}`,
    );
  }
}

const maxRetentionCardHelpersLines = 10;
const retentionCardHelpersLineCount = retentionCardHelpersSource.split(/\r?\n/).length;
if (retentionCardHelpersLineCount > maxRetentionCardHelpersLines) {
  throw new Error(
    `workspace-media-retention-card-helpers.ts exceeded ${maxRetentionCardHelpersLines} lines: ${retentionCardHelpersLineCount}`,
  );
}

for (const requiredCopyHelpersImport of [
  'from "./workspace-media-retention-copy";',
]) {
  if (!retentionCardCopyHelpersSource.includes(requiredCopyHelpersImport)) {
    throw new Error(
      `workspace-media-retention-card-copy-helpers.ts must import delegated copy modules: ${requiredCopyHelpersImport}`,
    );
  }
}

for (const requiredCopyHelpersUsage of [
  "export function buildWorkspaceMediaRetentionCopyBundle(locale: LocaleCode)",
  "export function buildWorkspaceMediaRetentionControllerInput({",
  'copy.remoteMedia ?? "Remote media"',
]) {
  if (!retentionCardCopyHelpersSource.includes(requiredCopyHelpersUsage)) {
    throw new Error(
      `workspace-media-retention-card-copy-helpers.ts must own copy/controller input helpers: ${requiredCopyHelpersUsage}`,
    );
  }
}

const maxRetentionCardCopyHelpersLines = 55;
if (retentionCardCopyHelpersLineCount > maxRetentionCardCopyHelpersLines) {
  throw new Error(
    `workspace-media-retention-card-copy-helpers.ts exceeded ${maxRetentionCardCopyHelpersLines} lines: ${retentionCardCopyHelpersLineCount}`,
  );
}

for (const requiredActionHelpersImport of ['from "./workspace-media-retention-actions.types";']) {
  if (!retentionCardActionHelpersSource.includes(requiredActionHelpersImport)) {
    throw new Error(
      `workspace-media-retention-card-action-helpers.ts must import delegated action props typing: ${requiredActionHelpersImport}`,
    );
  }
}

for (const requiredActionHelpersUsage of [
  "buildWorkspaceMediaRetentionActionMessage({",
  "buildWorkspaceMediaRetentionActionsProps({",
  "onCleanupOrphans: () =>",
  "onCleanupSelected: () =>",
  "selectedCount: selectedMediaIds.length",
]) {
  if (!retentionCardActionHelpersSource.includes(requiredActionHelpersUsage)) {
    throw new Error(
      `workspace-media-retention-card-action-helpers.ts must own action message and prop assembly: ${requiredActionHelpersUsage}`,
    );
  }
}

const maxRetentionCardActionHelpersLines = 90;
if (retentionCardActionHelpersLineCount > maxRetentionCardActionHelpersLines) {
  throw new Error(
    `workspace-media-retention-card-action-helpers.ts exceeded ${maxRetentionCardActionHelpersLines} lines: ${retentionCardActionHelpersLineCount}`,
  );
}

for (const requiredActionsUsage of [
  'import { WorkspaceMediaRetentionEditorNotice } from "./workspace-media-retention-editor-notice";',
  'import { WorkspaceMediaRetentionOwnerActions } from "./workspace-media-retention-owner-actions";',
  'import type { WorkspaceMediaRetentionActionsProps } from "./workspace-media-retention-actions.types";',
  "export function WorkspaceMediaRetentionActions({",
  "}: WorkspaceMediaRetentionActionsProps) {",
  "<WorkspaceMediaRetentionOwnerActions",
  "<WorkspaceMediaRetentionEditorNotice",
]) {
  if (!retentionActionsSource.includes(requiredActionsUsage)) {
    throw new Error(
      `workspace-media-retention-actions.tsx must export shared action props and component: ${requiredActionsUsage}`,
    );
  }
}

for (const forbiddenActionsToken of [
  "export type WorkspaceMediaRetentionActionsProps = {",
  'className="action-row"',
  "{selectedSummary}: {selectedCount}",
  "onClick={() => void onArchive(archiveConfirmSelected)}",
  "onClick={() => void onCleanupSelected()}",
  "onClick={() => void onCleanupOrphans()}",
  '<div className="notice" style={{ marginTop: 12 }}>{editorReadOnly}</div>',
]) {
  if (retentionActionsSource.includes(forbiddenActionsToken)) {
    throw new Error(
      `workspace-media-retention-actions.tsx must keep action prop typing delegated: ${forbiddenActionsToken}`,
    );
  }
}

const maxRetentionActionsLines = 110;
if (retentionActionsLineCount > maxRetentionActionsLines) {
  throw new Error(
    `workspace-media-retention-actions.tsx exceeded ${maxRetentionActionsLines} lines: ${retentionActionsLineCount}`,
  );
}

for (const requiredOwnerActionsUsage of [
  'import type { WorkspaceMediaRetentionOwnerActionsProps } from "./workspace-media-retention-owner-actions.types";',
  "export function WorkspaceMediaRetentionOwnerActions({",
  "}: WorkspaceMediaRetentionOwnerActionsProps) {",
  "{selectedSummary}: {selectedCount}",
  'className="action-row"',
  "onClick={() => void onArchive(archiveConfirmSelected)}",
  "onClick={() => void onCleanupSelected()}",
  "onClick={() => void onCleanupOrphans()}",
]) {
  if (!retentionOwnerActionsSource.includes(requiredOwnerActionsUsage)) {
    throw new Error(
      `workspace-media-retention-owner-actions.tsx must own owner-only retention actions: ${requiredOwnerActionsUsage}`,
    );
  }
}

for (const forbiddenOwnerActionsToken of [
  "type WorkspaceMediaRetentionOwnerActionsProps =",
]) {
  if (retentionOwnerActionsSource.includes(forbiddenOwnerActionsToken)) {
    throw new Error(
      `workspace-media-retention-owner-actions.tsx must keep owner-action typing delegated: ${forbiddenOwnerActionsToken}`,
    );
  }
}

const maxRetentionOwnerActionsLines = 75;
if (retentionOwnerActionsLineCount > maxRetentionOwnerActionsLines) {
  throw new Error(
    `workspace-media-retention-owner-actions.tsx exceeded ${maxRetentionOwnerActionsLines} lines: ${retentionOwnerActionsLineCount}`,
  );
}

for (const requiredActionsTypesUsage of [
  'export type WorkspaceMediaRetentionActionsProps = { actionLoading: boolean; archiveConfirmSelected: string; archiveSelectedLabel: string; canDeleteOrphans: boolean; canSelectAll: boolean; clearSelectionLabel: string; deleteOrphansLabel: string; deleteSelectedLabel: string; editorReadOnly: string; onArchive: (confirmMessage: string) => Promise<void>; onCleanupOrphans: () => Promise<void>; onCleanupSelected: () => Promise<void>; onClearSelection: () => void; onSelectAllCandidates: () => void; ownerActions: string; processingLabel: string; role: "owner" | "editor"; selectedCount: number; selectedSummary: string; selectAllLabel: string };',
]) {
  if (!retentionActionsTypesSource.includes(requiredActionsTypesUsage)) {
    throw new Error(
      `workspace-media-retention-actions.types.ts must own action prop typing: ${requiredActionsTypesUsage}`,
    );
  }
}

const maxRetentionActionsTypesLines = 2;
if (retentionActionsTypesLineCount > maxRetentionActionsTypesLines) {
  throw new Error(
    `workspace-media-retention-actions.types.ts exceeded ${maxRetentionActionsTypesLines} lines: ${retentionActionsTypesLineCount}`,
  );
}

for (const requiredOwnerActionsTypesUsage of [
  'import type { WorkspaceMediaRetentionActionsProps } from "./workspace-media-retention-actions.types"; export type WorkspaceMediaRetentionOwnerActionsProps = Pick<WorkspaceMediaRetentionActionsProps, "actionLoading" | "archiveConfirmSelected" | "archiveSelectedLabel" | "canDeleteOrphans" | "canSelectAll" | "clearSelectionLabel" | "deleteOrphansLabel" | "deleteSelectedLabel" | "onArchive" | "onCleanupOrphans" | "onCleanupSelected" | "onClearSelection" | "onSelectAllCandidates" | "processingLabel" | "selectedCount" | "selectedSummary" | "selectAllLabel">;',
]) {
  if (!retentionOwnerActionsTypesSource.includes(requiredOwnerActionsTypesUsage)) {
    throw new Error(
      `workspace-media-retention-owner-actions.types.ts must own owner-action prop typing: ${requiredOwnerActionsTypesUsage}`,
    );
  }
}

const maxRetentionOwnerActionsTypesLines = 2;
if (retentionOwnerActionsTypesLineCount > maxRetentionOwnerActionsTypesLines) {
  throw new Error(
    `workspace-media-retention-owner-actions.types.ts exceeded ${maxRetentionOwnerActionsTypesLines} lines: ${retentionOwnerActionsTypesLineCount}`,
  );
}

for (const requiredEditorNoticeUsage of [
  'import type { WorkspaceMediaRetentionEditorNoticeProps } from "./workspace-media-retention-editor-notice.types";',
  "export function WorkspaceMediaRetentionEditorNotice({",
  "}: WorkspaceMediaRetentionEditorNoticeProps) {",
  "editorReadOnly",
]) {
  if (!retentionEditorNoticeSource.includes(requiredEditorNoticeUsage)) {
    throw new Error(
      `workspace-media-retention-editor-notice.tsx must own editor-only retention messaging: ${requiredEditorNoticeUsage}`,
    );
  }
}

for (const forbiddenEditorNoticeToken of [
  "type WorkspaceMediaRetentionEditorNoticeProps =",
]) {
  if (retentionEditorNoticeSource.includes(forbiddenEditorNoticeToken)) {
    throw new Error(
      `workspace-media-retention-editor-notice.tsx must keep editor-notice typing delegated: ${forbiddenEditorNoticeToken}`,
    );
  }
}

const maxRetentionEditorNoticeLines = 10;
if (retentionEditorNoticeLineCount > maxRetentionEditorNoticeLines) {
  throw new Error(
    `workspace-media-retention-editor-notice.tsx exceeded ${maxRetentionEditorNoticeLines} lines: ${retentionEditorNoticeLineCount}`,
  );
}

for (const requiredEditorNoticeTypesUsage of [
  'import type { WorkspaceMediaRetentionActionsProps } from "./workspace-media-retention-actions.types"; export type WorkspaceMediaRetentionEditorNoticeProps = Pick<WorkspaceMediaRetentionActionsProps, "editorReadOnly">;',
]) {
  if (!retentionEditorNoticeTypesSource.includes(requiredEditorNoticeTypesUsage)) {
    throw new Error(
      `workspace-media-retention-editor-notice.types.ts must own editor-notice prop typing: ${requiredEditorNoticeTypesUsage}`,
    );
  }
}

const maxRetentionEditorNoticeTypesLines = 2;
if (retentionEditorNoticeTypesLineCount > maxRetentionEditorNoticeTypesLines) {
  throw new Error(
    `workspace-media-retention-editor-notice.types.ts exceeded ${maxRetentionEditorNoticeTypesLines} lines: ${retentionEditorNoticeTypesLineCount}`,
  );
}

for (const requiredNoticesUsage of [
  "export function WorkspaceMediaRetentionNotices({",
  "actionError",
  "actionMessage",
  "error",
]) {
  if (!retentionNoticesSource.includes(requiredNoticesUsage)) {
    throw new Error(
      `workspace-media-retention-notices.tsx must own notice rendering: ${requiredNoticesUsage}`,
    );
  }
}

const maxRetentionNoticesLines = 25;
if (retentionNoticesLineCount > maxRetentionNoticesLines) {
  throw new Error(
    `workspace-media-retention-notices.tsx exceeded ${maxRetentionNoticesLines} lines: ${retentionNoticesLineCount}`,
  );
}

for (const requiredCopyImport of [
  'from "./workspace-media-retention-copy.payload";',
  'from "./workspace-media-retention-copy.types";',
]) {
  if (!copySource.includes(requiredCopyImport)) {
    throw new Error(`workspace-media-retention-copy.ts must import delegated copy modules: ${requiredCopyImport}`);
  }
}

for (const requiredCopyUsage of [
  "WORKSPACE_MEDIA_RETENTION_COPY[locale]",
  'export type { WorkspaceMediaRetentionCopy } from "./workspace-media-retention-copy.types";',
]) {
  if (!copySource.includes(requiredCopyUsage)) {
    throw new Error(`workspace-media-retention-copy.ts must remain a thin copy wrapper: ${requiredCopyUsage}`);
  }
}

for (const forbiddenCopyToken of [
  "const COPY:",
  '"zh-CN": {',
  'en: {',
  'ja: {',
]) {
  if (copySource.includes(forbiddenCopyToken)) {
    throw new Error(`workspace-media-retention-copy.ts must keep locale payload delegated: ${forbiddenCopyToken}`);
  }
}

const maxCopyLines = 15;
if (copyLineCount > maxCopyLines) {
  throw new Error(
    `workspace-media-retention-copy.ts exceeded ${maxCopyLines} lines: ${copyLineCount}`,
  );
}

console.log("workspace-media-retention structure verification passed");

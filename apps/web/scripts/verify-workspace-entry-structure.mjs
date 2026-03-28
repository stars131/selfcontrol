import fs from "node:fs";
import path from "node:path";

const workspaceEntryPath = path.resolve(process.cwd(), "components/workspace-entry-client.tsx");
const workspaceEntryClientHelpersPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-client-helpers.ts",
);
const workspaceEntryClientHelpersTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-client-helpers.types.ts",
);
const workspaceEntryClientTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-client.types.ts",
);
const workspaceEntryLoadingShellPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-loading-shell.tsx",
);
const workspaceEntryLoadingShellTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-loading-shell.types.ts",
);
const workspaceEntryMainPanelPath = path.resolve(process.cwd(), "components/workspace-entry-main-panel.tsx");
const workspaceEntryPanelBodyPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-panel-body.tsx",
);
const workspaceEntryPanelBodyTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-panel-body.types.ts",
);
const workspaceEntryErrorNoticePath = path.resolve(
  process.cwd(),
  "components/workspace-entry-error-notice.tsx",
);
const workspaceEntryErrorNoticeTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-error-notice.types.ts",
);
const workspaceEntrySectionsGridPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-sections-grid.tsx",
);
const workspaceEntrySectionsGridTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-sections-grid.types.ts",
);
const workspaceTransferJobsSectionPath = path.resolve(
  process.cwd(),
  "components/workspace-transfer-jobs-section.tsx",
);
const workspaceTransferJobsSectionTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-transfer-jobs-section.types.ts",
);
const workspaceTransferJobsListPath = path.resolve(
  process.cwd(),
  "components/workspace-transfer-jobs-list.tsx",
);
const workspaceTransferJobsListTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-transfer-jobs-list.types.ts",
);
const workspaceTransferJobCardPath = path.resolve(
  process.cwd(),
  "components/workspace-transfer-job-card.tsx",
);
const workspaceTransferJobCardTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-transfer-job-card.types.ts",
);
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
const clientHelpersSource = fs.readFileSync(workspaceEntryClientHelpersPath, "utf8");
const clientHelpersTypesSource = fs.readFileSync(workspaceEntryClientHelpersTypesPath, "utf8");
const clientTypesSource = fs.readFileSync(workspaceEntryClientTypesPath, "utf8");
const loadingShellSource = fs.readFileSync(workspaceEntryLoadingShellPath, "utf8");
const loadingShellTypesSource = fs.readFileSync(workspaceEntryLoadingShellTypesPath, "utf8");
const mainPanelSource = fs.readFileSync(workspaceEntryMainPanelPath, "utf8");
const panelBodySource = fs.readFileSync(workspaceEntryPanelBodyPath, "utf8");
const panelBodyTypesSource = fs.readFileSync(workspaceEntryPanelBodyTypesPath, "utf8");
const errorNoticeSource = fs.readFileSync(workspaceEntryErrorNoticePath, "utf8");
const errorNoticeTypesSource = fs.readFileSync(workspaceEntryErrorNoticeTypesPath, "utf8");
const sectionsGridSource = fs.readFileSync(workspaceEntrySectionsGridPath, "utf8");
const sectionsGridTypesSource = fs.readFileSync(workspaceEntrySectionsGridTypesPath, "utf8");
const transferJobsSectionSource = fs.readFileSync(workspaceTransferJobsSectionPath, "utf8");
const transferJobsSectionTypesSource = fs.readFileSync(workspaceTransferJobsSectionTypesPath, "utf8");
const transferJobsListSource = fs.readFileSync(workspaceTransferJobsListPath, "utf8");
const transferJobsListTypesSource = fs.readFileSync(workspaceTransferJobsListTypesPath, "utf8");
const transferJobCardSource = fs.readFileSync(workspaceTransferJobCardPath, "utf8");
const transferJobCardTypesSource = fs.readFileSync(workspaceTransferJobCardTypesPath, "utf8");
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
const clientHelpersLineCount = clientHelpersSource.split(/\r?\n/).length;
const clientHelpersTypesLineCount = clientHelpersTypesSource.split(/\r?\n/).length;
const clientTypesLineCount = clientTypesSource.split(/\r?\n/).length;
const loadingShellLineCount = loadingShellSource.split(/\r?\n/).length;
const loadingShellTypesLineCount = loadingShellTypesSource.split(/\r?\n/).length;
const mainPanelLineCount = mainPanelSource.split(/\r?\n/).length;
const panelBodyLineCount = panelBodySource.split(/\r?\n/).length;
const panelBodyTypesLineCount = panelBodyTypesSource.split(/\r?\n/).length;
const errorNoticeLineCount = errorNoticeSource.split(/\r?\n/).length;
const errorNoticeTypesLineCount = errorNoticeTypesSource.split(/\r?\n/).length;
const sectionsGridLineCount = sectionsGridSource.split(/\r?\n/).length;
const sectionsGridTypesLineCount = sectionsGridTypesSource.split(/\r?\n/).length;
const transferJobsSectionLineCount = transferJobsSectionSource.split(/\r?\n/).length;
const transferJobsSectionTypesLineCount = transferJobsSectionTypesSource.split(/\r?\n/).length;
const transferJobsListLineCount = transferJobsListSource.split(/\r?\n/).length;
const transferJobsListTypesLineCount = transferJobsListTypesSource.split(/\r?\n/).length;
const transferJobCardLineCount = transferJobCardSource.split(/\r?\n/).length;
const transferJobCardTypesLineCount = transferJobCardTypesSource.split(/\r?\n/).length;
const controllerLineCount = controllerSource.split(/\r?\n/).length;
const controllerStateLineCount = controllerStateSource.split(/\r?\n/).length;
const controllerDerivedDataLineCount = controllerDerivedDataSource.split(/\r?\n/).length;
const actionsLineCount = actionsSource.split(/\r?\n/).length;
const workspaceActionsLineCount = workspaceActionsSource.split(/\r?\n/).length;
const copyLineCount = copySource.split(/\r?\n/).length;

if (!source.includes('import { useWorkspaceEntryController } from "./use-workspace-entry-controller";')) {
  throw new Error("workspace-entry-client.tsx must import useWorkspaceEntryController");
}

for (const requiredClientImport of [
  'from "./workspace-entry-client-helpers";',
  'import type { WorkspaceEntryClientProps } from "./workspace-entry-client.types";',
  'import { WorkspaceEntryLoadingShell } from "./workspace-entry-loading-shell";',
]) {
  if (!source.includes(requiredClientImport)) {
    throw new Error(`workspace-entry-client.tsx must import delegated entry client helpers: ${requiredClientImport}`);
  }
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

for (const requiredClientUsage of [
  "const controller = useWorkspaceEntryController(router);",
  "const view = buildWorkspaceEntryClientViewProps({",
  "<WorkspaceEntryLoadingShell {...view.loadingShellProps} />",
  "<WorkspaceEntryMainPanel {...view.mainPanelProps} />",
  "if (view.showLoadingShell) {",
]) {
  if (!source.includes(requiredClientUsage)) {
    throw new Error(`workspace-entry-client.tsx must delegate client shell and prop mapping: ${requiredClientUsage}`);
  }
}

for (const requiredImport of [
  'import { WorkspaceEntryPanelBody } from "./workspace-entry-panel-body";',
  'import { WorkspaceEntryHeader } from "./workspace-entry-header";',
  'import type { WorkspaceEntryMainPanelProps } from "./workspace-entry-main-panel.types";',
]) {
  if (!mainPanelSource.includes(requiredImport)) {
    throw new Error(`workspace-entry-main-panel.tsx must keep using extracted entry sections: ${requiredImport}`);
  }
}

for (const requiredUsage of [
  "<WorkspaceEntryHeader",
  "<WorkspaceEntryPanelBody",
]) {
  if (!mainPanelSource.includes(requiredUsage)) {
    throw new Error(`workspace-entry-main-panel.tsx must compose the extracted entry sections: ${requiredUsage}`);
  }
}

for (const forbiddenMainPanelToken of [
  '<div className="panel-body">',
  'className="notice error"',
  "<WorkspaceEntrySectionsGrid",
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

for (const requiredPanelBodyImport of [
  'import { WorkspaceEntryErrorNotice } from "./workspace-entry-error-notice";',
  'import type { WorkspaceEntryPanelBodyProps } from "./workspace-entry-panel-body.types";',
  'import { WorkspaceEntrySectionsGrid } from "./workspace-entry-sections-grid";',
]) {
  if (!panelBodySource.includes(requiredPanelBodyImport)) {
    throw new Error(`workspace-entry-panel-body.tsx must import delegated body leaves: ${requiredPanelBodyImport}`);
  }
}

for (const requiredPanelBodyUsage of [
  "}: WorkspaceEntryPanelBodyProps) {",
  '<div className="panel-body">',
  "<WorkspaceEntryErrorNotice",
  "<WorkspaceEntrySectionsGrid",
]) {
  if (!panelBodySource.includes(requiredPanelBodyUsage)) {
    throw new Error(`workspace-entry-panel-body.tsx must compose delegated body leaves: ${requiredPanelBodyUsage}`);
  }
}

if (panelBodySource.includes("type WorkspaceEntryPanelBodyProps =")) {
  throw new Error("workspace-entry-panel-body.tsx must keep panel-body prop typing delegated");
}

if (panelBodyLineCount > 40) {
  throw new Error(`workspace-entry-panel-body.tsx exceeded 40 lines: ${panelBodyLineCount}`);
}

for (const requiredPanelBodyTypesUsage of [
  'import type { WorkspaceEntryMainPanelProps } from "./workspace-entry-main-panel.types"; export type WorkspaceEntryPanelBodyProps = Pick<WorkspaceEntryMainPanelProps, "copy" | "creating" | "error" | "fileInputRef" | "importFile" | "importName" | "importSlug" | "importing" | "jobsLoading" | "joining" | "locale" | "name" | "onAcceptShare" | "onCreate" | "onDownloadTransferJob" | "onImportFileChange" | "onImportNameChange" | "onImportSlugChange" | "onImportWorkspace" | "onNameChange" | "onPreviewShare" | "onQueueImportJob" | "onRefreshJobs" | "onShareTokenInputChange" | "previewing" | "queueingImportJob" | "sharePreview" | "shareTokenInput" | "suggestedSlug" | "token" | "transferJobs" | "workspaces">;',
]) {
  if (!panelBodyTypesSource.includes(requiredPanelBodyTypesUsage)) {
    throw new Error(`workspace-entry-panel-body.types.ts must own panel-body prop typing: ${requiredPanelBodyTypesUsage}`);
  }
}

if (panelBodyTypesLineCount > 2) {
  throw new Error(`workspace-entry-panel-body.types.ts exceeded 2 lines: ${panelBodyTypesLineCount}`);
}

for (const requiredErrorNoticeUsage of [
  'import type { WorkspaceEntryErrorNoticeProps } from "./workspace-entry-error-notice.types";',
  "}: WorkspaceEntryErrorNoticeProps) {",
  "if (!error) {",
  'className="notice error"',
]) {
  if (!errorNoticeSource.includes(requiredErrorNoticeUsage)) {
    throw new Error(`workspace-entry-error-notice.tsx must own error-notice rendering: ${requiredErrorNoticeUsage}`);
  }
}

if (errorNoticeSource.includes("type WorkspaceEntryErrorNoticeProps =")) {
  throw new Error("workspace-entry-error-notice.tsx must keep error-notice prop typing delegated");
}

if (errorNoticeLineCount > 10) {
  throw new Error(`workspace-entry-error-notice.tsx exceeded 10 lines: ${errorNoticeLineCount}`);
}

for (const requiredErrorNoticeTypesUsage of [
  'import type { WorkspaceEntryPanelBodyProps } from "./workspace-entry-panel-body.types"; export type WorkspaceEntryErrorNoticeProps = Pick<WorkspaceEntryPanelBodyProps, "error">;',
]) {
  if (!errorNoticeTypesSource.includes(requiredErrorNoticeTypesUsage)) {
    throw new Error(`workspace-entry-error-notice.types.ts must own error-notice prop typing: ${requiredErrorNoticeTypesUsage}`);
  }
}

if (errorNoticeTypesLineCount > 2) {
  throw new Error(`workspace-entry-error-notice.types.ts exceeded 2 lines: ${errorNoticeTypesLineCount}`);
}

for (const requiredSectionsGridImport of [
  'import { WorkspaceCreateSection } from "./workspace-create-section";',
  'import { WorkspaceImportSection } from "./workspace-import-section";',
  'import { WorkspaceJoinSection } from "./workspace-join-section";',
  'import { WorkspaceListSection } from "./workspace-list-section";',
  'import { WorkspaceTransferJobsSection } from "./workspace-transfer-jobs-section";',
  'import type { WorkspaceEntrySectionsGridProps } from "./workspace-entry-sections-grid.types";',
]) {
  if (!sectionsGridSource.includes(requiredSectionsGridImport)) {
    throw new Error(`workspace-entry-sections-grid.tsx must import delegated entry leaf sections: ${requiredSectionsGridImport}`);
  }
}

for (const requiredSectionsGridUsage of [
  "<WorkspaceCreateSection",
  "<WorkspaceJoinSection",
  "<WorkspaceImportSection",
  "<WorkspaceListSection",
  "<WorkspaceTransferJobsSection",
  "}: WorkspaceEntrySectionsGridProps) {",
]) {
  if (!sectionsGridSource.includes(requiredSectionsGridUsage)) {
    throw new Error(`workspace-entry-sections-grid.tsx must compose delegated grid sections: ${requiredSectionsGridUsage}`);
  }
}

for (const forbiddenSectionsGridToken of [
  'import type { WorkspaceEntryMainPanelProps } from "./workspace-entry-main-panel.types";',
  "type WorkspaceEntrySectionsGridProps = Omit<",
]) {
  if (sectionsGridSource.includes(forbiddenSectionsGridToken)) {
    throw new Error(`workspace-entry-sections-grid.tsx must keep grid prop typing delegated: ${forbiddenSectionsGridToken}`);
  }
}

const maxSectionsGridLines = 95;
if (sectionsGridLineCount > maxSectionsGridLines) {
  throw new Error(`workspace-entry-sections-grid.tsx exceeded ${maxSectionsGridLines} lines: ${sectionsGridLineCount}`);
}

for (const requiredSectionsGridTypesUsage of [
  'import type { WorkspaceEntryMainPanelProps } from "./workspace-entry-main-panel.types"; export type WorkspaceEntrySectionsGridProps = Omit<WorkspaceEntryMainPanelProps, "error" | "locale" | "onLocaleChange" | "onLogout" | "username"> & { locale: WorkspaceEntryMainPanelProps["locale"] };',
]) {
  if (!sectionsGridTypesSource.includes(requiredSectionsGridTypesUsage)) {
    throw new Error(`workspace-entry-sections-grid.types.ts must own grid prop typing: ${requiredSectionsGridTypesUsage}`);
  }
}

if (sectionsGridTypesLineCount > 2) {
  throw new Error(`workspace-entry-sections-grid.types.ts exceeded 2 lines: ${sectionsGridTypesLineCount}`);
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
  "const handleCreate =",
  "const COPY:",
  "const DISPLAY_COPY:",
  'className="panel auth-panel"',
  "buildWorkspaceEntryMainPanelProps({",
  "buildWorkspaceEntryRefreshJobs(token, loadTransferJobs)",
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`workspace-entry-client.tsx must keep controller logic delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 130;
if (lineCount > maxAllowedLines) {
  throw new Error(`workspace-entry-client.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

for (const requiredClientHelpersImport of [
  'from "./workspace-entry-loading-shell.types";',
  'from "./workspace-entry-main-panel.types";',
  'from "./workspace-entry-client-helpers.types";',
]) {
  if (!clientHelpersSource.includes(requiredClientHelpersImport)) {
    throw new Error(`workspace-entry-client-helpers.ts must import shared entry client types: ${requiredClientHelpersImport}`);
  }
}

for (const requiredClientHelpersUsage of [
  "export function buildWorkspaceEntryMainPanelProps(",
  "return props;",
  "export function buildWorkspaceEntryRefreshJobs(",
  "export function buildWorkspaceEntryLoadingShellProps(",
  "return { loadingLabel };",
  "export function buildWorkspaceEntryClientViewProps(",
  "showLoadingShell: input.controller.loading",
  "loadingShellProps: buildWorkspaceEntryLoadingShellProps(input.copy.loading)",
  "mainPanelProps: buildWorkspaceEntryMainPanelProps({",
  "const onRefreshJobs = buildWorkspaceEntryRefreshJobs(",
  "return () => (token ? loadTransferJobs(token) : Promise.resolve())",
  "): WorkspaceEntryMainPanelProps {",
]) {
  if (!clientHelpersSource.includes(requiredClientHelpersUsage)) {
    throw new Error(`workspace-entry-client-helpers.ts must own client prop mapping helpers: ${requiredClientHelpersUsage}`);
  }
}

for (const forbiddenClientHelpersToken of [
  'from "../lib/locale";',
  "export type WorkspaceEntryClientHelperInput =",
  "Pick<WorkspaceEntryMainPanelProps",
]) {
  if (clientHelpersSource.includes(forbiddenClientHelpersToken)) {
    throw new Error(`workspace-entry-client-helpers.ts must keep helper input typing delegated: ${forbiddenClientHelpersToken}`);
  }
}

if (clientHelpersLineCount > 80) {
  throw new Error(`workspace-entry-client-helpers.ts exceeded 80 lines: ${clientHelpersLineCount}`);
}

for (const requiredClientHelpersTypesUsage of [
  'export type WorkspaceEntryClientHelperInput = Pick<WorkspaceEntryMainPanelProps,',
  'export type WorkspaceEntryClientViewInput = { copy: WorkspaceEntryMainPanelProps["copy"];',
  'export type WorkspaceEntryClientViewProps = { loadingShellProps: WorkspaceEntryLoadingShellProps; mainPanelProps: WorkspaceEntryMainPanelProps; showLoadingShell: boolean };',
]) {
  if (!clientHelpersTypesSource.includes(requiredClientHelpersTypesUsage)) {
    throw new Error(`workspace-entry-client-helpers.types.ts must own helper input typing: ${requiredClientHelpersTypesUsage}`);
  }
}

if (clientHelpersTypesLineCount > 2) {
  throw new Error(
    `workspace-entry-client-helpers.types.ts exceeded 2 lines: ${clientHelpersTypesLineCount}`,
  );
}

for (const requiredClientTypesUsage of [
  "export type WorkspaceEntryClientProps = Record<string, never>;",
]) {
  if (!clientTypesSource.includes(requiredClientTypesUsage)) {
    throw new Error(`workspace-entry-client.types.ts must own shared client props: ${requiredClientTypesUsage}`);
  }
}

if (clientTypesLineCount > 3) {
  throw new Error(`workspace-entry-client.types.ts exceeded 3 lines: ${clientTypesLineCount}`);
}

for (const requiredLoadingShellUsage of [
  'import type { WorkspaceEntryLoadingShellProps } from "./workspace-entry-loading-shell.types";',
  "export function WorkspaceEntryLoadingShell({ loadingLabel }: WorkspaceEntryLoadingShellProps)",
  'className="panel auth-panel"',
  "{loadingLabel}",
]) {
  if (!loadingShellSource.includes(requiredLoadingShellUsage)) {
    throw new Error(`workspace-entry-loading-shell.tsx must own entry loading shell rendering: ${requiredLoadingShellUsage}`);
  }
}

if (loadingShellSource.includes("loadingLabel }: { loadingLabel: string }")) {
  throw new Error("workspace-entry-loading-shell.tsx must keep entry loading-shell prop typing delegated");
}

if (loadingShellLineCount > 15) {
  throw new Error(`workspace-entry-loading-shell.tsx exceeded 15 lines: ${loadingShellLineCount}`);
}

for (const requiredLoadingShellTypesUsage of [
  'export type WorkspaceEntryLoadingShellProps = { loadingLabel: string };',
]) {
  if (!loadingShellTypesSource.includes(requiredLoadingShellTypesUsage)) {
    throw new Error(
      `workspace-entry-loading-shell.types.ts must own entry loading-shell props: ${requiredLoadingShellTypesUsage}`,
    );
  }
}

if (loadingShellTypesLineCount > 3) {
  throw new Error(
    `workspace-entry-loading-shell.types.ts exceeded 3 lines: ${loadingShellTypesLineCount}`,
  );
}

for (const requiredTransferJobsSectionImport of [
  'import { WorkspaceTransferJobsList } from "./workspace-transfer-jobs-list";',
  'import type { WorkspaceTransferJobsSectionProps } from "./workspace-transfer-jobs-section.types";',
]) {
  if (!transferJobsSectionSource.includes(requiredTransferJobsSectionImport)) {
    throw new Error(`workspace-transfer-jobs-section.tsx must import delegated transfer-jobs helpers: ${requiredTransferJobsSectionImport}`);
  }
}

for (const requiredTransferJobsSectionUsage of [
  "<WorkspaceTransferJobsList",
  "jobsLoading ? `${copy.refreshJobs}...` : copy.refreshJobs",
]) {
  if (!transferJobsSectionSource.includes(requiredTransferJobsSectionUsage)) {
    throw new Error(`workspace-transfer-jobs-section.tsx must delegate transfer-jobs list rendering: ${requiredTransferJobsSectionUsage}`);
  }
}

for (const forbiddenTransferJobsSectionToken of [
  'import Link from "next/link";',
  'import type { LocaleCode } from "../lib/locale";',
  'import type { WorkspaceTransferJob } from "../lib/types";',
  "type WorkspaceTransferJobsCopy = {",
  "const importedWorkspaceId =",
  "transferJobs.map((job) => {",
  "<article className=\"message\"",
]) {
  if (transferJobsSectionSource.includes(forbiddenTransferJobsSectionToken)) {
    throw new Error(`workspace-transfer-jobs-section.tsx must keep item rendering and props delegated: ${forbiddenTransferJobsSectionToken}`);
  }
}

if (transferJobsSectionLineCount > 45) {
  throw new Error(`workspace-transfer-jobs-section.tsx exceeded 45 lines: ${transferJobsSectionLineCount}`);
}

for (const requiredTransferJobsSectionTypesUsage of [
  "export type WorkspaceTransferJobsCopy = {",
  "export type WorkspaceTransferJobsSectionProps = {",
  "transferJobs: WorkspaceTransferJob[];",
]) {
  if (!transferJobsSectionTypesSource.includes(requiredTransferJobsSectionTypesUsage)) {
    throw new Error(`workspace-transfer-jobs-section.types.ts must own transfer-jobs contracts: ${requiredTransferJobsSectionTypesUsage}`);
  }
}

if (transferJobsSectionTypesLineCount > 25) {
  throw new Error(`workspace-transfer-jobs-section.types.ts exceeded 25 lines: ${transferJobsSectionTypesLineCount}`);
}

for (const requiredTransferJobsListUsage of [
  'import { WorkspaceTransferJobCard } from "./workspace-transfer-job-card";',
  'import type { WorkspaceTransferJobsListProps } from "./workspace-transfer-jobs-list.types";',
  "transferJobs.map((job) => (",
  "<WorkspaceTransferJobCard",
  "{copy.noJobs}",
]) {
  if (!transferJobsListSource.includes(requiredTransferJobsListUsage)) {
    throw new Error(`workspace-transfer-jobs-list.tsx must own transfer-jobs list rendering: ${requiredTransferJobsListUsage}`);
  }
}

for (const forbiddenTransferJobsListToken of [
  'import type { WorkspaceTransferJobsSectionProps } from "./workspace-transfer-jobs-section.types";',
  "}: Pick<WorkspaceTransferJobsSectionProps",
]) {
  if (transferJobsListSource.includes(forbiddenTransferJobsListToken)) {
    throw new Error(`workspace-transfer-jobs-list.tsx must keep list prop typing delegated: ${forbiddenTransferJobsListToken}`);
  }
}

if (transferJobsListLineCount > 35) {
  throw new Error(`workspace-transfer-jobs-list.tsx exceeded 35 lines: ${transferJobsListLineCount}`);
}

for (const requiredTransferJobsListTypesUsage of [
  'import type { WorkspaceTransferJobsSectionProps } from "./workspace-transfer-jobs-section.types"; export type WorkspaceTransferJobsListProps = Pick<WorkspaceTransferJobsSectionProps, "copy" | "locale" | "transferJobs" | "onDownloadTransferJob">;',
]) {
  if (!transferJobsListTypesSource.includes(requiredTransferJobsListTypesUsage)) {
    throw new Error(`workspace-transfer-jobs-list.types.ts must own transfer-jobs list typing: ${requiredTransferJobsListTypesUsage}`);
  }
}

if (transferJobsListTypesLineCount > 2) {
  throw new Error(`workspace-transfer-jobs-list.types.ts exceeded 2 lines: ${transferJobsListTypesLineCount}`);
}

for (const requiredTransferJobCardUsage of [
  'import Link from "next/link";',
  'import { getWorkspaceTransferJobStatusLabel, getWorkspaceTransferJobTypeLabel } from "../lib/workspace-transfer-job-display";',
  'import type { WorkspaceTransferJobCardProps } from "./workspace-transfer-job-card.types";',
  "const importedWorkspaceId =",
  "getWorkspaceTransferJobTypeLabel(locale, job.job_type)",
  "getWorkspaceTransferJobStatusLabel(locale, job.status)",
  'href={`/app/workspaces/${importedWorkspaceId}`}',
  "onClick={() => void onDownloadTransferJob(job.id)}",
  "new Date(job.created_at).toLocaleString(locale)",
]) {
  if (!transferJobCardSource.includes(requiredTransferJobCardUsage)) {
    throw new Error(`workspace-transfer-job-card.tsx must own transfer-job item rendering: ${requiredTransferJobCardUsage}`);
  }
}

for (const forbiddenTransferJobCardToken of [
  'import type { WorkspaceTransferJobsCopy } from "./workspace-transfer-jobs-section.types";',
  "type WorkspaceTransferJobCardProps = {",
]) {
  if (transferJobCardSource.includes(forbiddenTransferJobCardToken)) {
    throw new Error(`workspace-transfer-job-card.tsx must keep card prop typing delegated: ${forbiddenTransferJobCardToken}`);
  }
}

if (transferJobCardLineCount > 55) {
  throw new Error(`workspace-transfer-job-card.tsx exceeded 55 lines: ${transferJobCardLineCount}`);
}

for (const requiredTransferJobCardTypesUsage of [
  'import type { LocaleCode } from "../lib/locale"; import type { WorkspaceTransferJob } from "../lib/types"; import type { WorkspaceTransferJobsCopy } from "./workspace-transfer-jobs-section.types"; export type WorkspaceTransferJobCardProps = { copy: WorkspaceTransferJobsCopy; job: WorkspaceTransferJob; locale: LocaleCode; onDownloadTransferJob: (jobId: string) => Promise<void> };',
]) {
  if (!transferJobCardTypesSource.includes(requiredTransferJobCardTypesUsage)) {
    throw new Error(`workspace-transfer-job-card.types.ts must own transfer-job card typing: ${requiredTransferJobCardTypesUsage}`);
  }
}

if (transferJobCardTypesLineCount > 2) {
  throw new Error(`workspace-transfer-job-card.types.ts exceeded 2 lines: ${transferJobCardTypesLineCount}`);
}

const maxMainPanelLines = 80;
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
  "createWorkspaceEntryControllerActions({ ...state, router })",
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
  'from "./workspace-entry-controller-actions.types";',
  'from "./workspace-entry-workspace-actions";',
]) {
  if (!actionsSource.includes(requiredActionsImport)) {
    throw new Error(`workspace-entry-controller-actions.ts must import delegated action groups: ${requiredActionsImport}`);
  }
}

for (const requiredActionsUsage of [
  "createWorkspaceEntryJobActions({",
  "createWorkspaceEntryWorkspaceActions({",
  "createWorkspaceEntryShareActions({ ...stateProps, router })",
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
  'from "./workspace-entry-controller.types";',
  "}: {",
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
  'from "./workspace-entry-create-actions";',
  'from "./workspace-entry-import-actions";',
  'from "./workspace-entry-workspace-actions.types";',
]) {
  if (!workspaceActionsSource.includes(requiredWorkspaceActionsImport)) {
    throw new Error(`workspace-entry-workspace-actions.ts must import delegated action groups: ${requiredWorkspaceActionsImport}`);
  }
}

for (const requiredWorkspaceActionsUsage of [
  "createWorkspaceEntryCreateActions({ ...state, router })",
  "createWorkspaceEntryImportActions({ ...state, loadTransferJobs, router })",
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
  'from "./workspace-entry-controller.types";',
  "}: {",
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

import fs from "node:fs";
import path from "node:path";

const retentionCardPath = path.resolve(process.cwd(), "components/workspace-media-retention-card.tsx");
const retentionControllerPath = path.resolve(
  process.cwd(),
  "components/use-workspace-media-retention-controller.ts",
);
const retentionCopyPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-copy.ts",
);
const retentionActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-actions.tsx",
);
const retentionNoticesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-notices.tsx",
);
const source = fs.readFileSync(retentionCardPath, "utf8");
const controllerSource = fs.readFileSync(retentionControllerPath, "utf8");
const copySource = fs.readFileSync(retentionCopyPath, "utf8");
const retentionActionsSource = fs.readFileSync(retentionActionsPath, "utf8");
const retentionNoticesSource = fs.readFileSync(retentionNoticesPath, "utf8");
const lineCount = source.split(/\r?\n/).length;
const controllerLineCount = controllerSource.split(/\r?\n/).length;
const copyLineCount = copySource.split(/\r?\n/).length;
const retentionActionsLineCount = retentionActionsSource.split(/\r?\n/).length;
const retentionNoticesLineCount = retentionNoticesSource.split(/\r?\n/).length;
const retentionListsPath = path.resolve(process.cwd(), "components/workspace-media-retention-lists.tsx");
const retentionListsSource = fs.readFileSync(retentionListsPath, "utf8");

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

const retentionDerivedDataPath = path.resolve(
  process.cwd(),
  "components/use-workspace-media-retention-derived-data.ts",
);
const retentionDerivedDataSource = fs.readFileSync(retentionDerivedDataPath, "utf8");

if (!retentionDerivedDataSource.includes('from "./workspace-media-retention-controller-helpers";')) {
  throw new Error(
    "use-workspace-media-retention-derived-data.ts must import workspace-media-retention-controller-helpers",
  );
}

if (!retentionDerivedDataSource.includes("buildWorkspaceMediaRetentionRiskLabel({")) {
  throw new Error(
    "use-workspace-media-retention-derived-data.ts must delegate risk label construction through buildWorkspaceMediaRetentionRiskLabel",
  );
}

const retentionCardHelpersPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-card-helpers.ts",
);
const retentionCardHelpersSource = fs.readFileSync(retentionCardHelpersPath, "utf8");

for (const requiredHelpersImport of ['from "./workspace-media-retention-actions";']) {
  if (!retentionCardHelpersSource.includes(requiredHelpersImport)) {
    throw new Error(
      `workspace-media-retention-card-helpers.ts must import delegated action props typing: ${requiredHelpersImport}`,
    );
  }
}

for (const requiredHelpersUsage of [
  "buildWorkspaceMediaRetentionActionsProps({",
  "onCleanupOrphans: () =>",
  "onCleanupSelected: () =>",
  "selectedCount: selectedMediaIds.length",
]) {
  if (!retentionCardHelpersSource.includes(requiredHelpersUsage)) {
    throw new Error(
      `workspace-media-retention-card-helpers.ts must own retention action prop assembly: ${requiredHelpersUsage}`,
    );
  }
}

for (const requiredActionsUsage of [
  "export type WorkspaceMediaRetentionActionsProps = {",
  "export function WorkspaceMediaRetentionActions({",
]) {
  if (!retentionActionsSource.includes(requiredActionsUsage)) {
    throw new Error(
      `workspace-media-retention-actions.tsx must export shared action props and component: ${requiredActionsUsage}`,
    );
  }
}

const maxRetentionActionsLines = 110;
if (retentionActionsLineCount > maxRetentionActionsLines) {
  throw new Error(
    `workspace-media-retention-actions.tsx exceeded ${maxRetentionActionsLines} lines: ${retentionActionsLineCount}`,
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

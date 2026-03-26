import fs from "node:fs";
import path from "node:path";

const exportCardPath = path.resolve(process.cwd(), "components/workspace-export-card.tsx");
const exportContentPath = path.resolve(process.cwd(), "components/workspace-export-content.tsx");
const exportContentTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-content.types.ts",
);
const exportSummaryPath = path.resolve(process.cwd(), "components/workspace-export-summary.tsx");
const exportSummaryTypesPath = path.resolve(process.cwd(), "components/workspace-export-summary.types.ts");
const exportControlsPath = path.resolve(process.cwd(), "components/workspace-export-controls.tsx");
const exportControlsActionPath = path.resolve(process.cwd(), "components/workspace-export-controls-action.tsx");
const exportControlsActionTypesPath = path.resolve(process.cwd(), "components/workspace-export-controls-action.types.ts");
const exportControlsStatusPath = path.resolve(process.cwd(), "components/workspace-export-controls-status.tsx");
const exportControlsStatusTypesPath = path.resolve(process.cwd(), "components/workspace-export-controls-status.types.ts");
const source = fs.readFileSync(exportCardPath, "utf8");
const contentSource = fs.readFileSync(exportContentPath, "utf8");
const contentTypesSource = fs.readFileSync(exportContentTypesPath, "utf8");
const summarySource = fs.readFileSync(exportSummaryPath, "utf8");
const summaryTypesSource = fs.readFileSync(exportSummaryTypesPath, "utf8");
const controlsSource = fs.readFileSync(exportControlsPath, "utf8");
const controlsActionSource = fs.readFileSync(exportControlsActionPath, "utf8");
const controlsActionTypesSource = fs.readFileSync(exportControlsActionTypesPath, "utf8");
const controlsStatusSource = fs.readFileSync(exportControlsStatusPath, "utf8");
const controlsStatusTypesSource = fs.readFileSync(exportControlsStatusTypesPath, "utf8");
const lineCount = source.split(/\r?\n/).length;
const contentLineCount = contentSource.split(/\r?\n/).length;
const contentTypesLineCount = contentTypesSource.split(/\r?\n/).length;
const summaryLineCount = summarySource.split(/\r?\n/).length;
const summaryTypesLineCount = summaryTypesSource.split(/\r?\n/).length;
const controlsLineCount = controlsSource.split(/\r?\n/).length;
const controlsActionLineCount = controlsActionSource.split(/\r?\n/).length;
const controlsActionTypesLineCount = controlsActionTypesSource.split(/\r?\n/).length;
const controlsStatusLineCount = controlsStatusSource.split(/\r?\n/).length;
const controlsStatusTypesLineCount = controlsStatusTypesSource.split(/\r?\n/).length;

if (!source.includes('import { useWorkspaceExportController } from "./use-workspace-export-controller";')) {
  throw new Error("workspace-export-card.tsx must import useWorkspaceExportController");
}

if (!source.includes("useWorkspaceExportController({")) {
  throw new Error("workspace-export-card.tsx must delegate export download orchestration to useWorkspaceExportController");
}

if (!source.includes('import { getWorkspaceExportCopy } from "./workspace-export-copy";')) {
  throw new Error("workspace-export-card.tsx must import getWorkspaceExportCopy");
}

if (!source.includes('import { WorkspaceExportContent } from "./workspace-export-content";')) {
  throw new Error("workspace-export-card.tsx must import WorkspaceExportContent");
}

if (!source.includes("getWorkspaceExportCopy(locale)")) {
  throw new Error("workspace-export-card.tsx must delegate locale copy lookup");
}

if (!source.includes("<WorkspaceExportContent")) {
  throw new Error("workspace-export-card.tsx must delegate export content rendering");
}

for (const requiredContentUsage of [
  'import { WorkspaceExportControls } from "./workspace-export-controls";',
  'import { WorkspaceExportSummary } from "./workspace-export-summary";',
  'import type { WorkspaceExportContentProps } from "./workspace-export-content.types";',
  "}: WorkspaceExportContentProps) {",
  "<WorkspaceExportSummary",
  "<WorkspaceExportControls",
]) {
  if (!contentSource.includes(requiredContentUsage)) {
    throw new Error(`workspace-export-content.tsx must own export-content composition: ${requiredContentUsage}`);
  }
}

if (contentSource.includes("type WorkspaceExportContentProps =")) {
  throw new Error("workspace-export-content.tsx must keep export-content prop typing delegated");
}

if (contentLineCount > 9) {
  throw new Error(`workspace-export-content.tsx exceeded 9 lines: ${contentLineCount}`);
}

for (const requiredContentTypesUsage of [
  'import type { WorkspaceExportControlsProps } from "./workspace-export-controls.types"; import type { WorkspaceExportSummaryProps } from "./workspace-export-summary.types"; export type WorkspaceExportContentProps = { contentProps: WorkspaceExportSummaryProps; controlsProps: WorkspaceExportControlsProps };',
]) {
  if (!contentTypesSource.includes(requiredContentTypesUsage)) {
    throw new Error(`workspace-export-content.types.ts must own export-content prop typing: ${requiredContentTypesUsage}`);
  }
}

if (contentTypesLineCount > 2) {
  throw new Error(`workspace-export-content.types.ts exceeded 2 lines: ${contentTypesLineCount}`);
}

for (const requiredSummaryUsage of [
  'import type { WorkspaceExportSummaryProps } from "./workspace-export-summary.types";',
  "}: WorkspaceExportSummaryProps) {",
  '<div className="eyebrow">{copy.eyebrow}</div>',
  "{copy.description}",
  "{copy.note}",
]) {
  if (!summarySource.includes(requiredSummaryUsage)) {
    throw new Error(`workspace-export-summary.tsx must own export summary rendering: ${requiredSummaryUsage}`);
  }
}

if (summarySource.includes("type WorkspaceExportSummaryProps = {")) {
  throw new Error("workspace-export-summary.tsx must keep export-summary prop typing delegated");
}

if (summaryLineCount > 18) {
  throw new Error(`workspace-export-summary.tsx exceeded 18 lines: ${summaryLineCount}`);
}

for (const requiredSummaryTypesUsage of [
  'import { getWorkspaceExportCopy } from "./workspace-export-copy"; export type WorkspaceExportSummaryProps = { copy: ReturnType<typeof getWorkspaceExportCopy> };',
]) {
  if (!summaryTypesSource.includes(requiredSummaryTypesUsage)) {
    throw new Error(`workspace-export-summary.types.ts must own export-summary prop typing: ${requiredSummaryTypesUsage}`);
  }
}

if (summaryTypesLineCount > 2) {
  throw new Error(`workspace-export-summary.types.ts exceeded 2 lines: ${summaryTypesLineCount}`);
}

for (const requiredControlsUsage of [
  'import { WorkspaceExportControlsAction } from "./workspace-export-controls-action";',
  'import { WorkspaceExportControlsStatus } from "./workspace-export-controls-status";',
  'import type { WorkspaceExportControlsProps } from "./workspace-export-controls.types";',
  "<WorkspaceExportControlsAction",
  "<WorkspaceExportControlsStatus",
]) {
  if (!controlsSource.includes(requiredControlsUsage)) {
    throw new Error(`workspace-export-controls.tsx must delegate control leaves: ${requiredControlsUsage}`);
  }
}

for (const forbiddenControlsToken of [
  'role === "owner" ? (',
  '<button className="button secondary" disabled={loading} type="button" onClick={onDownload}>',
  '<div className="notice error" style={{ marginTop: 16 }}>{error}</div>',
  '<div className="notice" style={{ marginTop: 16 }}>{success}</div>',
]) {
  if (controlsSource.includes(forbiddenControlsToken)) {
    throw new Error(`workspace-export-controls.tsx must keep control internals delegated: ${forbiddenControlsToken}`);
  }
}

if (controlsLineCount > 15) {
  throw new Error(`workspace-export-controls.tsx exceeded 15 lines: ${controlsLineCount}`);
}

for (const requiredControlsActionUsage of [
  'import type { WorkspaceExportControlsActionProps } from "./workspace-export-controls-action.types";',
  "}: WorkspaceExportControlsActionProps) {",
  'role === "owner" ? (',
  '<button className="button secondary" disabled={loading} type="button" onClick={onDownload}>',
  '{ownerOnlyLabel}',
]) {
  if (!controlsActionSource.includes(requiredControlsActionUsage)) {
    throw new Error(`workspace-export-controls-action.tsx must own owner/editor action rendering: ${requiredControlsActionUsage}`);
  }
}

if (controlsActionSource.includes("type WorkspaceExportControlsActionProps = Pick<")) {
  throw new Error("workspace-export-controls-action.tsx must keep action prop typing delegated");
}

if (controlsActionLineCount > 20) {
  throw new Error(`workspace-export-controls-action.tsx exceeded 20 lines: ${controlsActionLineCount}`);
}

for (const requiredControlsActionTypesUsage of [
  'import type { WorkspaceExportControlsProps } from "./workspace-export-controls.types"; export type WorkspaceExportControlsActionProps = Pick<WorkspaceExportControlsProps, "buttonLabel" | "loading" | "ownerOnlyLabel" | "role" | "onDownload">;',
]) {
  if (!controlsActionTypesSource.includes(requiredControlsActionTypesUsage)) {
    throw new Error(`workspace-export-controls-action.types.ts must own action prop typing: ${requiredControlsActionTypesUsage}`);
  }
}

if (controlsActionTypesLineCount > 2) {
  throw new Error(`workspace-export-controls-action.types.ts exceeded 2 lines: ${controlsActionTypesLineCount}`);
}

for (const requiredControlsStatusUsage of [
  'import type { WorkspaceExportControlsStatusProps } from "./workspace-export-controls-status.types";',
  "}: WorkspaceExportControlsStatusProps) {",
  '<div className="notice error" style={{ marginTop: 16 }}>{error}</div>',
  '<div className="notice" style={{ marginTop: 16 }}>{success}</div>',
]) {
  if (!controlsStatusSource.includes(requiredControlsStatusUsage)) {
    throw new Error(`workspace-export-controls-status.tsx must own export status rendering: ${requiredControlsStatusUsage}`);
  }
}

if (controlsStatusSource.includes("type WorkspaceExportControlsStatusProps = Pick<")) {
  throw new Error("workspace-export-controls-status.tsx must keep status prop typing delegated");
}

if (controlsStatusLineCount > 14) {
  throw new Error(`workspace-export-controls-status.tsx exceeded 14 lines: ${controlsStatusLineCount}`);
}

for (const requiredControlsStatusTypesUsage of [
  'import type { WorkspaceExportControlsProps } from "./workspace-export-controls.types"; export type WorkspaceExportControlsStatusProps = Pick<WorkspaceExportControlsProps, "error" | "success">;',
]) {
  if (!controlsStatusTypesSource.includes(requiredControlsStatusTypesUsage)) {
    throw new Error(`workspace-export-controls-status.types.ts must own status prop typing: ${requiredControlsStatusTypesUsage}`);
  }
}

if (controlsStatusTypesLineCount > 2) {
  throw new Error(`workspace-export-controls-status.types.ts exceeded 2 lines: ${controlsStatusTypesLineCount}`);
}

for (const forbiddenToken of [
  "useState(",
  'from "../lib/api"',
  "downloadWorkspaceExport(",
  "const handleDownload =",
  "const COPY:",
  'import { WorkspaceExportControls } from "./workspace-export-controls";',
  'import { WorkspaceExportSummary } from "./workspace-export-summary";',
  '{role === "owner" ? (',
  '<div className="eyebrow">{copy.eyebrow}</div>',
  "{copy.description}",
  "{copy.note}",
  "<WorkspaceExportControls",
  "<WorkspaceExportSummary",
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`workspace-export-card.tsx must keep controller logic delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 55;
if (lineCount > maxAllowedLines) {
  throw new Error(`workspace-export-card.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

console.log("workspace-export structure verification passed");

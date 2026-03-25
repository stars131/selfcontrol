import fs from "node:fs";
import path from "node:path";

const exportCardPath = path.resolve(process.cwd(), "components/workspace-export-card.tsx");
const exportSummaryPath = path.resolve(process.cwd(), "components/workspace-export-summary.tsx");
const exportSummaryTypesPath = path.resolve(process.cwd(), "components/workspace-export-summary.types.ts");
const source = fs.readFileSync(exportCardPath, "utf8");
const summarySource = fs.readFileSync(exportSummaryPath, "utf8");
const summaryTypesSource = fs.readFileSync(exportSummaryTypesPath, "utf8");
const lineCount = source.split(/\r?\n/).length;
const summaryLineCount = summarySource.split(/\r?\n/).length;
const summaryTypesLineCount = summaryTypesSource.split(/\r?\n/).length;

if (!source.includes('import { useWorkspaceExportController } from "./use-workspace-export-controller";')) {
  throw new Error("workspace-export-card.tsx must import useWorkspaceExportController");
}

if (!source.includes("useWorkspaceExportController({")) {
  throw new Error("workspace-export-card.tsx must delegate export download orchestration to useWorkspaceExportController");
}

if (!source.includes('import { getWorkspaceExportCopy } from "./workspace-export-copy";')) {
  throw new Error("workspace-export-card.tsx must import getWorkspaceExportCopy");
}

if (!source.includes('import { WorkspaceExportControls } from "./workspace-export-controls";')) {
  throw new Error("workspace-export-card.tsx must import WorkspaceExportControls");
}

if (!source.includes('import { WorkspaceExportSummary } from "./workspace-export-summary";')) {
  throw new Error("workspace-export-card.tsx must import WorkspaceExportSummary");
}

if (!source.includes("getWorkspaceExportCopy(locale)")) {
  throw new Error("workspace-export-card.tsx must delegate locale copy lookup");
}

if (!source.includes("<WorkspaceExportControls")) {
  throw new Error("workspace-export-card.tsx must delegate export control rendering");
}

if (!source.includes("<WorkspaceExportSummary")) {
  throw new Error("workspace-export-card.tsx must delegate export summary rendering");
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

for (const forbiddenToken of [
  "useState(",
  'from "../lib/api"',
  "downloadWorkspaceExport(",
  "const handleDownload =",
  "const COPY:",
  '{role === "owner" ? (',
  '<div className="eyebrow">{copy.eyebrow}</div>',
  "{copy.description}",
  "{copy.note}",
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

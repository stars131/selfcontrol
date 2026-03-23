import fs from "node:fs";
import path from "node:path";

const exportCardPath = path.resolve(process.cwd(), "components/workspace-export-card.tsx");
const source = fs.readFileSync(exportCardPath, "utf8");
const lineCount = source.split(/\r?\n/).length;

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

if (!source.includes("getWorkspaceExportCopy(locale)")) {
  throw new Error("workspace-export-card.tsx must delegate locale copy lookup");
}

if (!source.includes("<WorkspaceExportControls")) {
  throw new Error("workspace-export-card.tsx must delegate export control rendering");
}

for (const forbiddenToken of [
  "useState(",
  'from "../lib/api"',
  "downloadWorkspaceExport(",
  "const handleDownload =",
  "const COPY:",
  '{role === "owner" ? (',
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`workspace-export-card.tsx must keep controller logic delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 90;
if (lineCount > maxAllowedLines) {
  throw new Error(`workspace-export-card.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

console.log("workspace-export structure verification passed");

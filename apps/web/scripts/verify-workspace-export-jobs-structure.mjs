import fs from "node:fs";
import path from "node:path";

const exportJobsPath = path.resolve(process.cwd(), "components/workspace-export-jobs-card.tsx");
const source = fs.readFileSync(exportJobsPath, "utf8");
const lineCount = source.split(/\r?\n/).length;

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

console.log("workspace-export-jobs structure verification passed");

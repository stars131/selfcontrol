import fs from "node:fs";
import path from "node:path";

const workspaceEntryPath = path.resolve(process.cwd(), "components/workspace-entry-client.tsx");
const workspaceEntryMainPanelPath = path.resolve(process.cwd(), "components/workspace-entry-main-panel.tsx");
const source = fs.readFileSync(workspaceEntryPath, "utf8");
const mainPanelSource = fs.readFileSync(workspaceEntryMainPanelPath, "utf8");
const lineCount = source.split(/\r?\n/).length;

if (!source.includes('import { useWorkspaceEntryController } from "./use-workspace-entry-controller";')) {
  throw new Error("workspace-entry-client.tsx must import useWorkspaceEntryController");
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

for (const requiredImport of [
  'import { WorkspaceEntryHeader } from "./workspace-entry-header";',
  'import { WorkspaceCreateSection } from "./workspace-create-section";',
  'import { WorkspaceJoinSection } from "./workspace-join-section";',
  'import { WorkspaceImportSection } from "./workspace-import-section";',
  'import { WorkspaceListSection } from "./workspace-list-section";',
  'import { WorkspaceTransferJobsSection } from "./workspace-transfer-jobs-section";',
]) {
  if (!mainPanelSource.includes(requiredImport)) {
    throw new Error(`workspace-entry-main-panel.tsx must keep using extracted entry sections: ${requiredImport}`);
  }
}

for (const requiredUsage of [
  "<WorkspaceEntryHeader",
  "<WorkspaceCreateSection",
  "<WorkspaceJoinSection",
  "<WorkspaceImportSection",
  "<WorkspaceListSection",
  "<WorkspaceTransferJobsSection",
]) {
  if (!mainPanelSource.includes(requiredUsage)) {
    throw new Error(`workspace-entry-main-panel.tsx must compose the extracted entry sections: ${requiredUsage}`);
  }
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
  "const loadTransferJobs =",
  "const handleCreate =",
  "const handleImportWorkspace =",
  "const handleQueueImportJob =",
  "const handlePreviewShare =",
  "const handleAcceptShare =",
  "const handleLogout =",
  "const handleDownloadTransferJob =",
  "const COPY:",
  "const DISPLAY_COPY:",
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`workspace-entry-client.tsx must keep controller logic delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 130;
if (lineCount > maxAllowedLines) {
  throw new Error(`workspace-entry-client.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

console.log("workspace-entry structure verification passed");

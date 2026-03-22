import fs from "node:fs";
import path from "node:path";

const workspaceEntryPath = path.resolve(process.cwd(), "components/workspace-entry-client.tsx");
const source = fs.readFileSync(workspaceEntryPath, "utf8");
const lineCount = source.split(/\r?\n/).length;

if (!source.includes('import { useWorkspaceEntryController } from "./use-workspace-entry-controller";')) {
  throw new Error("workspace-entry-client.tsx must import useWorkspaceEntryController");
}

if (!source.includes("useWorkspaceEntryController(router)")) {
  throw new Error("workspace-entry-client.tsx must delegate behavior orchestration to useWorkspaceEntryController");
}

for (const requiredImport of [
  'import { WorkspaceEntryHeader } from "./workspace-entry-header";',
  'import { WorkspaceCreateSection } from "./workspace-create-section";',
  'import { WorkspaceJoinSection } from "./workspace-join-section";',
  'import { WorkspaceImportSection } from "./workspace-import-section";',
  'import { WorkspaceListSection } from "./workspace-list-section";',
  'import { WorkspaceTransferJobsSection } from "./workspace-transfer-jobs-section";',
]) {
  if (!source.includes(requiredImport)) {
    throw new Error(`workspace-entry-client.tsx must keep using extracted entry sections: ${requiredImport}`);
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
  if (!source.includes(requiredUsage)) {
    throw new Error(`workspace-entry-client.tsx must compose the extracted entry sections: ${requiredUsage}`);
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
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`workspace-entry-client.tsx must keep controller logic delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 460;
if (lineCount > maxAllowedLines) {
  throw new Error(`workspace-entry-client.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

console.log("workspace-entry structure verification passed");

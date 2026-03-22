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

for (const forbiddenToken of [
  "useState(",
  'from "../lib/api"',
  "downloadWorkspaceExport(",
  "const handleDownload =",
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`workspace-export-card.tsx must keep controller logic delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 140;
if (lineCount > maxAllowedLines) {
  throw new Error(`workspace-export-card.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

console.log("workspace-export structure verification passed");

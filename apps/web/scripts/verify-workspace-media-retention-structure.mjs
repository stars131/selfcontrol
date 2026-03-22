import fs from "node:fs";
import path from "node:path";

const retentionCardPath = path.resolve(process.cwd(), "components/workspace-media-retention-card.tsx");
const source = fs.readFileSync(retentionCardPath, "utf8");
const lineCount = source.split(/\r?\n/).length;

if (!source.includes('useWorkspaceMediaRetentionController')) {
  throw new Error("workspace-media-retention-card.tsx must use useWorkspaceMediaRetentionController");
}

if (!source.includes("useWorkspaceMediaRetentionController({")) {
  throw new Error("workspace-media-retention-card.tsx must delegate retention orchestration to useWorkspaceMediaRetentionController");
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
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`workspace-media-retention-card.tsx must keep controller logic delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 500;
if (lineCount > maxAllowedLines) {
  throw new Error(`workspace-media-retention-card.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

console.log("workspace-media-retention structure verification passed");

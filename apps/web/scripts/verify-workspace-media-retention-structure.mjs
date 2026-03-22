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

if (!source.includes('import { MediaRetentionItemCard } from "./media-retention-item-card";')) {
  throw new Error("workspace-media-retention-card.tsx must import MediaRetentionItemCard");
}

if (!source.includes("<MediaRetentionItemCard")) {
  throw new Error("workspace-media-retention-card.tsx must delegate media item rendering to MediaRetentionItemCard");
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
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`workspace-media-retention-card.tsx must keep controller logic delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 460;
if (lineCount > maxAllowedLines) {
  throw new Error(`workspace-media-retention-card.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

console.log("workspace-media-retention structure verification passed");

import fs from "node:fs";
import path from "node:path";

const recordMediaToolsPath = path.resolve(process.cwd(), "components/record-media-tools.tsx");
const source = fs.readFileSync(recordMediaToolsPath, "utf8");
const lineCount = source.split(/\r?\n/).length;

if (!source.includes('import type { RecordMediaToolsProps } from "./record-media-tools.types";')) {
  throw new Error("record-media-tools.tsx must import RecordMediaToolsProps from record-media-tools.types");
}

if (!source.includes('import { RecordMediaToolsActions } from "./record-media-tools-actions";')) {
  throw new Error("record-media-tools.tsx must import RecordMediaToolsActions");
}

if (!source.includes('import { RecordMediaSelectedContent } from "./record-media-selected-content";')) {
  throw new Error("record-media-tools.tsx must import RecordMediaSelectedContent");
}

for (const requiredUsage of [
  "<RecordMediaToolsActions",
  "<RecordMediaSelectedContent",
]) {
  if (!source.includes(requiredUsage)) {
    throw new Error(`record-media-tools.tsx must keep composing media sub-sections: ${requiredUsage}`);
  }
}

for (const forbiddenToken of [
  "type RecordMediaToolsProps = {",
  'import type { ChangeEventHandler } from "react";',
  'className="action-row"',
  'type="file"',
  "<MediaStorageOverview",
  "<RecordMediaProcessingPanels",
  "<MediaAssetSection",
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`record-media-tools.tsx must keep its props contract delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 140;
if (lineCount > maxAllowedLines) {
  throw new Error(`record-media-tools.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

console.log("record-media-tools structure verification passed");

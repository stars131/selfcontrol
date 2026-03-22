import fs from "node:fs";
import path from "node:path";

const recordPanelPath = path.resolve(process.cwd(), "components/record-panel-v2.tsx");
const source = fs.readFileSync(recordPanelPath, "utf8");
const normalizedLines = source.split(/\r?\n/);

if (!source.includes('import { useRecordPanelController } from "./use-record-panel-controller";')) {
  throw new Error("record-panel-v2.tsx must import useRecordPanelController");
}

if (!source.includes("useRecordPanelController({")) {
  throw new Error("record-panel-v2.tsx must delegate controller logic to useRecordPanelController");
}

for (const forbiddenToken of [
  "useState(",
  "useEffect(",
  "useMemo(",
  "useStoredLocale(",
  "fetchMediaBlob(",
  "const handle",
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`record-panel-v2.tsx must remain a thin shell; found forbidden token: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 320;
if (normalizedLines.length > maxAllowedLines) {
  throw new Error(`record-panel-v2.tsx exceeded ${maxAllowedLines} lines: ${normalizedLines.length}`);
}

console.log("record-panel structure verification passed");

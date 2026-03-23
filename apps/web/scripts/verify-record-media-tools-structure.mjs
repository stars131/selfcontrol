import fs from "node:fs";
import path from "node:path";

const recordMediaToolsPath = path.resolve(process.cwd(), "components/record-media-tools.tsx");
const recordMediaSelectedContentPath = path.resolve(
  process.cwd(),
  "components/record-media-selected-content.tsx",
);
const source = fs.readFileSync(recordMediaToolsPath, "utf8");
const selectedContentSource = fs.readFileSync(recordMediaSelectedContentPath, "utf8");
const lineCount = source.split(/\r?\n/).length;
const selectedContentLineCount = selectedContentSource.split(/\r?\n/).length;

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

for (const requiredImport of [
  'import { MediaAssetSection } from "./media-asset-section";',
  'import { MediaStorageOverview } from "./media-storage-overview";',
  'import { RecordMediaProcessingPanels } from "./record-media-processing-panels";',
  "buildMediaAssetSectionProps,",
  "buildMediaStorageOverviewProps,",
  "buildRecordMediaProcessingPanelsProps,",
  'import type { RecordMediaSelectedContentProps } from "./record-media-selected-content.types";',
]) {
  if (!selectedContentSource.includes(requiredImport)) {
    throw new Error(`record-media-selected-content.tsx must keep delegated media content boundaries: ${requiredImport}`);
  }
}

for (const requiredUsage of [
  "<MediaStorageOverview {...buildMediaStorageOverviewProps(props)} />",
  "<RecordMediaProcessingPanels {...buildRecordMediaProcessingPanelsProps(props)} />",
  "<MediaAssetSection {...buildMediaAssetSectionProps(props)} />",
]) {
  if (!selectedContentSource.includes(requiredUsage)) {
    throw new Error(`record-media-selected-content.tsx must compose delegated child prop builders: ${requiredUsage}`);
  }
}

for (const forbiddenToken of [
  "type RecordMediaSelectedContentProps = Pick<",
  "allTrackedFilesPresentLabel,",
  "bulkRetryingDeadLetter,",
  "largestItemName={mediaStorageSummary?.largest_item_name ?? null}",
  "mediaAssetCount={mediaAssets.length}",
]) {
  if (selectedContentSource.includes(forbiddenToken)) {
    throw new Error(`record-media-selected-content.tsx must keep prop assembly delegated: ${forbiddenToken}`);
  }
}

const maxSelectedContentLines = 60;
if (selectedContentLineCount > maxSelectedContentLines) {
  throw new Error(
    `record-media-selected-content.tsx exceeded ${maxSelectedContentLines} lines: ${selectedContentLineCount}`,
  );
}

console.log("record-media-tools structure verification passed");

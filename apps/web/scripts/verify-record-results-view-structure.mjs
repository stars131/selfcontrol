import fs from "node:fs";
import path from "node:path";

const viewPath = path.resolve(process.cwd(), "components/record-results-view.tsx");
const viewSource = fs.readFileSync(viewPath, "utf8");
const viewLineCount = viewSource.split(/\r?\n/).length;
const switcherPath = path.resolve(process.cwd(), "components/record-results-view-switcher.tsx");
const switcherSource = fs.readFileSync(switcherPath, "utf8");
const timelinePath = path.resolve(process.cwd(), "components/record-results-timeline-view.tsx");
const timelineSource = fs.readFileSync(timelinePath, "utf8");
const listPath = path.resolve(process.cwd(), "components/record-results-list-view.tsx");
const listSource = fs.readFileSync(listPath, "utf8");

if (!viewSource.includes('import { RecordResultsViewSwitcher } from "./record-results-view-switcher";')) {
  throw new Error("record-results-view.tsx must import RecordResultsViewSwitcher");
}

if (!viewSource.includes('import { RecordResultsTimelineView } from "./record-results-timeline-view";')) {
  throw new Error("record-results-view.tsx must import RecordResultsTimelineView");
}

if (!viewSource.includes('import { RecordResultsListView } from "./record-results-list-view";')) {
  throw new Error("record-results-view.tsx must import RecordResultsListView");
}

if (!viewSource.includes('import type { RecordResultsViewProps } from "./record-results-view.types";')) {
  throw new Error("record-results-view.tsx must import RecordResultsViewProps");
}

if (!viewSource.includes("<RecordResultsViewSwitcher")) {
  throw new Error("record-results-view.tsx must delegate switcher rendering");
}

if (!viewSource.includes("<RecordResultsTimelineView")) {
  throw new Error("record-results-view.tsx must delegate timeline rendering");
}

if (!viewSource.includes("<RecordResultsListView")) {
  throw new Error("record-results-view.tsx must delegate list rendering");
}

if (!switcherSource.includes('onClick={() => onViewModeChange("timeline")}')) {
  throw new Error("record-results-view-switcher.tsx must keep timeline switch action");
}

if (!timelineSource.includes("timelineDays.map((day) =>")) {
  throw new Error("record-results-timeline-view.tsx must keep timeline day mapping");
}

if (!listSource.includes("records.map((record) => renderRecordSummaryCard(record, sharedCardProps))")) {
  throw new Error("record-results-list-view.tsx must keep record list mapping");
}

for (const forbiddenToken of [
  "function renderRecordCard(",
  'className="action-row"',
  "timelineDays.map((day) =>",
  "records.map((record) =>",
]) {
  if (viewSource.includes(forbiddenToken)) {
    throw new Error(`record-results-view.tsx must keep rendering delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 85;
if (viewLineCount > maxAllowedLines) {
  throw new Error(`record-results-view.tsx exceeded ${maxAllowedLines} lines: ${viewLineCount}`);
}

console.log("record-results-view structure verification passed");

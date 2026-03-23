import fs from "node:fs";
import path from "node:path";

const panelPath = path.resolve(process.cwd(), "components/location-review-panel.tsx");
const panelSource = fs.readFileSync(panelPath, "utf8");
const panelLineCount = panelSource.split(/\r?\n/).length;
const summaryPath = path.resolve(process.cwd(), "components/location-review-status-summary.tsx");
const summarySource = fs.readFileSync(summaryPath, "utf8");
const historyPath = path.resolve(process.cwd(), "components/location-review-history-list.tsx");
const historySource = fs.readFileSync(historyPath, "utf8");

if (!panelSource.includes('import { LocationReviewStatusSummary } from "./location-review-status-summary";')) {
  throw new Error("location-review-panel.tsx must import LocationReviewStatusSummary");
}

if (!panelSource.includes('import { LocationReviewHistoryList } from "./location-review-history-list";')) {
  throw new Error("location-review-panel.tsx must import LocationReviewHistoryList");
}

if (!panelSource.includes('import type { LocationReviewPanelProps } from "./location-review-panel.types";')) {
  throw new Error("location-review-panel.tsx must import LocationReviewPanelProps");
}

if (!panelSource.includes("<LocationReviewStatusSummary")) {
  throw new Error("location-review-panel.tsx must delegate status summary rendering");
}

if (!panelSource.includes("<LocationReviewHistoryList")) {
  throw new Error("location-review-panel.tsx must delegate history list rendering");
}

if (!summarySource.includes("selectedLocationReview.confirmed_at")) {
  throw new Error("location-review-status-summary.tsx must keep confirmed-at rendering");
}

if (!historySource.includes("selectedLocationHistory.slice(0, 6).map((entry) =>")) {
  throw new Error("location-review-history-list.tsx must keep history mapping");
}

for (const forbiddenToken of [
  "selectedLocationReview.confirmed_at",
  "selectedLocationHistory.slice(0, 6).map((entry) =>",
  'className="history-list"',
  'className="detail-grid"',
]) {
  if (panelSource.includes(forbiddenToken)) {
    throw new Error(`location-review-panel.tsx must keep detail rendering delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 95;
if (panelLineCount > maxAllowedLines) {
  throw new Error(`location-review-panel.tsx exceeded ${maxAllowedLines} lines: ${panelLineCount}`);
}

console.log("location-review-panel structure verification passed");

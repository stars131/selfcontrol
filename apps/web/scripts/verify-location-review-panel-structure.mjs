import fs from "node:fs";
import path from "node:path";

function readComponent(relativePath) {
  return fs.readFileSync(path.resolve(process.cwd(), relativePath), "utf8");
}

function countLines(source) {
  return source.split(/\r?\n/).length;
}

const panelSource = readComponent("components/location-review-panel.tsx");
const detailsSource = readComponent("components/location-review-details.tsx");
const summarySource = readComponent("components/location-review-status-summary.tsx");
const historySource = readComponent("components/location-review-history-list.tsx");

for (const requiredPanelImport of [
  'import { LocationReviewActions } from "./location-review-actions";',
  'import { LocationReviewDetails } from "./location-review-details";',
  'import { LocationReviewFormFields } from "./location-review-form-fields";',
  'import { LocationReviewIntro } from "./location-review-intro";',
  'import type { LocationReviewPanelProps } from "./location-review-panel.types";',
]) {
  if (!panelSource.includes(requiredPanelImport)) {
    throw new Error(`location-review-panel.tsx must import delegated panel sections: ${requiredPanelImport}`);
  }
}

for (const requiredPanelUsage of [
  "<LocationReviewIntro",
  "<LocationReviewFormFields",
  "<LocationReviewActions",
  "<LocationReviewDetails",
]) {
  if (!panelSource.includes(requiredPanelUsage)) {
    throw new Error(`location-review-panel.tsx must compose delegated panel sections: ${requiredPanelUsage}`);
  }
}

for (const forbiddenPanelToken of [
  'import { LocationReviewStatusSummary } from "./location-review-status-summary";',
  'import { LocationReviewHistoryList } from "./location-review-history-list";',
  "selectedLocationReview.confirmed_at",
  "selectedLocationHistory.slice(0, 6).map((entry) =>",
  'className="history-list"',
  'className="detail-grid"',
]) {
  if (panelSource.includes(forbiddenPanelToken)) {
    throw new Error(`location-review-panel.tsx must keep detail rendering delegated: ${forbiddenPanelToken}`);
  }
}

if (countLines(panelSource) > 70) {
  throw new Error(`location-review-panel.tsx exceeded 70 lines: ${countLines(panelSource)}`);
}

for (const requiredDetailsImport of [
  'import { LocationReviewHistoryList } from "./location-review-history-list";',
  'import { LocationReviewStatusSummary } from "./location-review-status-summary";',
  'import type { LocationReviewDetailsProps } from "./location-review-details.types";',
]) {
  if (!detailsSource.includes(requiredDetailsImport)) {
    throw new Error(`location-review-details.tsx must import delegated detail helpers: ${requiredDetailsImport}`);
  }
}

for (const requiredDetailsUsage of [
  "if (!hasSelectedRecord) {",
  "return null;",
  "<LocationReviewStatusSummary",
  "<LocationReviewHistoryList",
]) {
  if (!detailsSource.includes(requiredDetailsUsage)) {
    throw new Error(`location-review-details.tsx must compose delegated detail sections: ${requiredDetailsUsage}`);
  }
}

for (const forbiddenDetailsToken of [
  "selectedLocationReview.confirmed_at",
  "selectedLocationHistory.slice(0, 6).map((entry) =>",
  'className="history-list"',
  'className="detail-grid"',
]) {
  if (detailsSource.includes(forbiddenDetailsToken)) {
    throw new Error(`location-review-details.tsx must keep summary/history rendering delegated: ${forbiddenDetailsToken}`);
  }
}

if (countLines(detailsSource) > 40) {
  throw new Error(`location-review-details.tsx exceeded 40 lines: ${countLines(detailsSource)}`);
}

for (const requiredSummaryUsage of [
  'import { LocationReviewStatusCard } from "./location-review-status-card";',
  "selectedLocationReview.confirmed_at",
  "<LocationReviewStatusCard",
]) {
  if (!summarySource.includes(requiredSummaryUsage)) {
    throw new Error(`location-review-status-summary.tsx must keep status-card rendering local: ${requiredSummaryUsage}`);
  }
}

if (countLines(summarySource) > 40) {
  throw new Error(
    `location-review-status-summary.tsx exceeded 40 lines: ${countLines(summarySource)}`,
  );
}

for (const requiredHistoryUsage of [
  'import { LocationReviewHistoryItem } from "./location-review-history-item";',
  "selectedLocationHistory.slice(0, 6).map((entry) =>",
  "<LocationReviewHistoryItem",
]) {
  if (!historySource.includes(requiredHistoryUsage)) {
    throw new Error(`location-review-history-list.tsx must keep history rendering local: ${requiredHistoryUsage}`);
  }
}

if (countLines(historySource) > 35) {
  throw new Error(`location-review-history-list.tsx exceeded 35 lines: ${countLines(historySource)}`);
}

console.log("location-review-panel structure verification passed");

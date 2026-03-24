import fs from "node:fs";
import path from "node:path";

const panelPath = path.resolve(process.cwd(), "components/dead-letter-recovery-panel.tsx");
const panelSource = fs.readFileSync(panelPath, "utf8");
const panelLineCount = panelSource.split(/\r?\n/).length;
const panelContentPath = path.resolve(
  process.cwd(),
  "components/dead-letter-recovery-panel-content.tsx",
);
const panelContentSource = fs.readFileSync(panelContentPath, "utf8");
const summaryPath = path.resolve(process.cwd(), "components/dead-letter-recovery-summary.tsx");
const summarySource = fs.readFileSync(summaryPath, "utf8");
const summaryStatsPath = path.resolve(process.cwd(), "components/dead-letter-recovery-summary-stats.tsx");
const summaryStatsSource = fs.readFileSync(summaryStatsPath, "utf8");
const summaryActionsPath = path.resolve(
  process.cwd(),
  "components/dead-letter-recovery-summary-actions.tsx",
);
const summaryActionsSource = fs.readFileSync(summaryActionsPath, "utf8");
const itemCardPath = path.resolve(process.cwd(), "components/dead-letter-recovery-item-card.tsx");
const itemCardSource = fs.readFileSync(itemCardPath, "utf8");
const itemCardTagsPath = path.resolve(process.cwd(), "components/dead-letter-recovery-item-card-tags.tsx");
const itemCardTagsSource = fs.readFileSync(itemCardTagsPath, "utf8");
const itemCardActionsPath = path.resolve(
  process.cwd(),
  "components/dead-letter-recovery-item-card-actions.tsx",
);
const itemCardActionsSource = fs.readFileSync(itemCardActionsPath, "utf8");

if (!panelSource.includes('import { DeadLetterRecoverySummary } from "./dead-letter-recovery-summary";')) {
  throw new Error("dead-letter-recovery-panel.tsx must import DeadLetterRecoverySummary");
}

if (!panelSource.includes('import { DeadLetterRecoveryPanelContent } from "./dead-letter-recovery-panel-content";')) {
  throw new Error("dead-letter-recovery-panel.tsx must import DeadLetterRecoveryPanelContent");
}

if (!panelSource.includes('import type { DeadLetterRecoveryPanelProps } from "./dead-letter-recovery-panel.types";')) {
  throw new Error("dead-letter-recovery-panel.tsx must import DeadLetterRecoveryPanelProps");
}

if (!panelSource.includes("<DeadLetterRecoverySummary")) {
  throw new Error("dead-letter-recovery-panel.tsx must delegate summary rendering");
}

if (!panelSource.includes("<DeadLetterRecoveryPanelContent")) {
  throw new Error("dead-letter-recovery-panel.tsx must delegate panel content rendering");
}

for (const requiredSummaryImport of [
  'import { DeadLetterRecoverySummaryActions } from "./dead-letter-recovery-summary-actions";',
  'import { DeadLetterRecoverySummaryStats } from "./dead-letter-recovery-summary-stats";',
]) {
  if (!summarySource.includes(requiredSummaryImport)) {
    throw new Error(`dead-letter-recovery-summary.tsx must import delegated summary helpers: ${requiredSummaryImport}`);
  }
}

for (const requiredSummaryUsage of ["<DeadLetterRecoverySummaryStats", "<DeadLetterRecoverySummaryActions"]) {
  if (!summarySource.includes(requiredSummaryUsage)) {
    throw new Error(`dead-letter-recovery-summary.tsx must delegate summary sections: ${requiredSummaryUsage}`);
  }
}

for (const forbiddenSummaryToken of [
  "mediaDeadLetterOverview?.total_count ?? 0",
  "Object.entries(mediaDeadLetterOverview.by_retry_state)",
  "Object.entries(mediaDeadLetterOverview.by_issue_category)",
  "mediaIssueCopy.retrySelectedPrefix",
  "mediaIssueCopy.retryAll",
]) {
  if (summarySource.includes(forbiddenSummaryToken)) {
    throw new Error(`dead-letter-recovery-summary.tsx must keep stats/actions rendering delegated: ${forbiddenSummaryToken}`);
  }
}

const summaryLineCount = summarySource.split(/\r?\n/).length;
if (summaryLineCount > 55) {
  throw new Error(`dead-letter-recovery-summary.tsx exceeded 55 lines: ${summaryLineCount}`);
}

for (const requiredSummaryStatsImport of [
  'import type { DeadLetterRecoveryPanelProps } from "./dead-letter-recovery-panel.types";',
]) {
  if (!summaryStatsSource.includes(requiredSummaryStatsImport)) {
    throw new Error(`dead-letter-recovery-summary-stats.tsx must import summary prop contracts: ${requiredSummaryStatsImport}`);
  }
}

for (const requiredSummaryStatsUsage of [
  "export function DeadLetterRecoverySummaryStats({",
  "mediaDeadLetterOverview?.total_count ?? 0",
  "Object.entries(mediaDeadLetterOverview.by_retry_state)",
  "Object.entries(mediaDeadLetterOverview.by_issue_category)",
  "getRetryStateLabel(locale, retryState)",
]) {
  if (!summaryStatsSource.includes(requiredSummaryStatsUsage)) {
    throw new Error(`dead-letter-recovery-summary-stats.tsx must own retry-state and issue summary rendering: ${requiredSummaryStatsUsage}`);
  }
}

const summaryStatsLineCount = summaryStatsSource.split(/\r?\n/).length;
if (summaryStatsLineCount > 40) {
  throw new Error(`dead-letter-recovery-summary-stats.tsx exceeded 40 lines: ${summaryStatsLineCount}`);
}

for (const requiredSummaryActionsImport of [
  'import type { DeadLetterRecoveryPanelProps } from "./dead-letter-recovery-panel.types";',
]) {
  if (!summaryActionsSource.includes(requiredSummaryActionsImport)) {
    throw new Error(`dead-letter-recovery-summary-actions.tsx must import summary action contracts: ${requiredSummaryActionsImport}`);
  }
}

for (const requiredSummaryActionsUsage of [
  "export function DeadLetterRecoverySummaryActions({",
  "mediaIssueCopy.selectVisible",
  "mediaIssueCopy.clearSelection",
  "mediaIssueCopy.retrySelectedPrefix",
  "mediaIssueCopy.retryAll",
  "selectedDeadLetterIds.length",
]) {
  if (!summaryActionsSource.includes(requiredSummaryActionsUsage)) {
    throw new Error(`dead-letter-recovery-summary-actions.tsx must own bulk-action rendering: ${requiredSummaryActionsUsage}`);
  }
}

const summaryActionsLineCount = summaryActionsSource.split(/\r?\n/).length;
if (summaryActionsLineCount > 55) {
  throw new Error(`dead-letter-recovery-summary-actions.tsx exceeded 55 lines: ${summaryActionsLineCount}`);
}

if (!itemCardSource.includes("const action = getMediaIssueAction(locale, item);")) {
  throw new Error("dead-letter-recovery-item-card.tsx must keep action lookup local");
}

if (!itemCardSource.includes("const settingsHref = buildMediaIssueSettingsHref(workspaceId, item);")) {
  throw new Error("dead-letter-recovery-item-card.tsx must keep settings link lookup local");
}

for (const requiredItemCardImport of [
  'import { DeadLetterRecoveryItemCardActions } from "./dead-letter-recovery-item-card-actions";',
  'import { DeadLetterRecoveryItemCardTags } from "./dead-letter-recovery-item-card-tags";',
]) {
  if (!itemCardSource.includes(requiredItemCardImport)) {
    throw new Error(`dead-letter-recovery-item-card.tsx must import delegated item-card helpers: ${requiredItemCardImport}`);
  }
}

for (const requiredItemCardUsage of [
  "<DeadLetterRecoveryItemCardTags",
  "<DeadLetterRecoveryItemCardActions",
]) {
  if (!itemCardSource.includes(requiredItemCardUsage)) {
    throw new Error(`dead-letter-recovery-item-card.tsx must delegate item-card sections: ${requiredItemCardUsage}`);
  }
}

for (const forbiddenItemCardToken of [
  'import Link from "next/link";',
  "getMediaIssueLabel(locale, item)",
  "getProcessingStatusLabel(locale, item.processing_status)",
  "getRetryStateLabel(locale, item.processing_retry_state)",
  "mediaIssueCopy.openSettings",
  "mediaIssueCopy.retryNow",
]) {
  if (itemCardSource.includes(forbiddenItemCardToken)) {
    throw new Error(`dead-letter-recovery-item-card.tsx must keep tag/action rendering delegated: ${forbiddenItemCardToken}`);
  }
}

const itemCardLineCount = itemCardSource.split(/\r?\n/).length;
if (itemCardLineCount > 85) {
  throw new Error(`dead-letter-recovery-item-card.tsx exceeded 85 lines: ${itemCardLineCount}`);
}

for (const requiredItemCardTagsImport of [
  'import type { DeadLetterRecoveryItemCardProps } from "./dead-letter-recovery-panel.types";',
]) {
  if (!itemCardTagsSource.includes(requiredItemCardTagsImport)) {
    throw new Error(`dead-letter-recovery-item-card-tags.tsx must import item-card props: ${requiredItemCardTagsImport}`);
  }
}

for (const requiredItemCardTagsUsage of [
  "export function DeadLetterRecoveryItemCardTags({",
  "getMediaIssueLabel(locale, item)",
  "getProcessingStatusLabel(locale, item.processing_status)",
  "getRetryStateLabel(locale, item.processing_retry_state)",
  "mediaIssueCopy.retryStatePrefix",
]) {
  if (!itemCardTagsSource.includes(requiredItemCardTagsUsage)) {
    throw new Error(`dead-letter-recovery-item-card-tags.tsx must own dead-letter tag rendering: ${requiredItemCardTagsUsage}`);
  }
}

const itemCardTagsLineCount = itemCardTagsSource.split(/\r?\n/).length;
if (itemCardTagsLineCount > 40) {
  throw new Error(`dead-letter-recovery-item-card-tags.tsx exceeded 40 lines: ${itemCardTagsLineCount}`);
}

for (const requiredItemCardActionsImport of [
  'import Link from "next/link";',
  'import { canRetryMediaIssue } from "../lib/record-panel-media";',
  'import type { DeadLetterRecoveryItemCardProps } from "./dead-letter-recovery-panel.types";',
]) {
  if (!itemCardActionsSource.includes(requiredItemCardActionsImport)) {
    throw new Error(`dead-letter-recovery-item-card-actions.tsx must import item-card action helpers: ${requiredItemCardActionsImport}`);
  }
}

for (const requiredItemCardActionsUsage of [
  "export function DeadLetterRecoveryItemCardActions({",
  "canRetryMediaIssue(item)",
  "mediaIssueCopy.retryNow",
  "mediaIssueCopy.openSettings",
  "settingsHref",
]) {
  if (!itemCardActionsSource.includes(requiredItemCardActionsUsage)) {
    throw new Error(`dead-letter-recovery-item-card-actions.tsx must own dead-letter action rendering: ${requiredItemCardActionsUsage}`);
  }
}

const itemCardActionsLineCount = itemCardActionsSource.split(/\r?\n/).length;
if (itemCardActionsLineCount > 50) {
  throw new Error(`dead-letter-recovery-item-card-actions.tsx exceeded 50 lines: ${itemCardActionsLineCount}`);
}

for (const forbiddenToken of [
  "Object.entries(mediaDeadLetterOverview.by_retry_state)",
  "Object.entries(mediaDeadLetterOverview.by_issue_category)",
  "getMediaIssueAction(locale, item)",
  "buildMediaIssueSettingsHref(workspaceId, item)",
  "className=\"record-card\" key={item.media_id}",
  "<DeadLetterRecoveryItemCard",
  "mediaDeadLetterOverview?.items.length ?",
  "mediaIssueCopy.noDeadLetter",
]) {
  if (panelSource.includes(forbiddenToken)) {
    throw new Error(`dead-letter-recovery-panel.tsx must keep detail rendering delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 95;
if (panelLineCount > maxAllowedLines) {
  throw new Error(`dead-letter-recovery-panel.tsx exceeded ${maxAllowedLines} lines: ${panelLineCount}`);
}

for (const requiredPanelContentImport of [
  'import { DeadLetterRecoveryItemCard } from "./dead-letter-recovery-item-card";',
  'import type { DeadLetterRecoveryPanelProps } from "./dead-letter-recovery-panel.types";',
]) {
  if (!panelContentSource.includes(requiredPanelContentImport)) {
    throw new Error(`dead-letter-recovery-panel-content.tsx must import panel content dependencies: ${requiredPanelContentImport}`);
  }
}

for (const requiredPanelContentUsage of [
  "export function DeadLetterRecoveryPanelContent({",
  "if (!mediaDeadLetterOverview?.items.length) {",
  "mediaIssueCopy.noDeadLetter",
  "<DeadLetterRecoveryItemCard",
  "mediaDeadLetterOverview.items.map((item) => (",
]) {
  if (!panelContentSource.includes(requiredPanelContentUsage)) {
    throw new Error(`dead-letter-recovery-panel-content.tsx must own list and empty-state rendering: ${requiredPanelContentUsage}`);
  }
}

const panelContentLineCount = panelContentSource.split(/\r?\n/).length;
if (panelContentLineCount > 60) {
  throw new Error(`dead-letter-recovery-panel-content.tsx exceeded 60 lines: ${panelContentLineCount}`);
}

console.log("dead-letter recovery structure verification passed");

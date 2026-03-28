import fs from "node:fs";
import path from "node:path";

function readComponent(relativePath) {
  return fs.readFileSync(path.resolve(process.cwd(), relativePath), "utf8");
}

function countLines(source) {
  return source.split(/\r?\n/).length;
}

const panelSource = readComponent("components/dead-letter-recovery-panel.tsx");
const panelContentSource = readComponent("components/dead-letter-recovery-panel-content.tsx");
const summarySource = readComponent("components/dead-letter-recovery-summary.tsx");
const summaryHeaderSource = readComponent("components/dead-letter-recovery-summary-header.tsx");
const summaryStatsSource = readComponent("components/dead-letter-recovery-summary-stats.tsx");
const summaryActionsSource = readComponent("components/dead-letter-recovery-summary-actions.tsx");
const itemCardSource = readComponent("components/dead-letter-recovery-item-card.tsx");

for (const requiredPanelImport of [
  'import { DeadLetterRecoveryPanelContent } from "./dead-letter-recovery-panel-content";',
  'import { DeadLetterRecoverySummary } from "./dead-letter-recovery-summary";',
  'import type { DeadLetterRecoveryPanelProps } from "./dead-letter-recovery-panel.types";',
]) {
  if (!panelSource.includes(requiredPanelImport)) {
    throw new Error(`dead-letter-recovery-panel.tsx must import delegated panel boundaries: ${requiredPanelImport}`);
  }
}

for (const requiredPanelUsage of ["<DeadLetterRecoverySummary", "<DeadLetterRecoveryPanelContent"]) {
  if (!panelSource.includes(requiredPanelUsage)) {
    throw new Error(`dead-letter-recovery-panel.tsx must compose delegated panel sections: ${requiredPanelUsage}`);
  }
}

for (const forbiddenPanelToken of [
  "<DeadLetterRecoverySummaryHeader",
  "<DeadLetterRecoverySummaryActions",
  "<DeadLetterRecoveryPanelList",
  "<DeadLetterRecoveryItemCard",
]) {
  if (panelSource.includes(forbiddenPanelToken)) {
    throw new Error(`dead-letter-recovery-panel.tsx must keep lower-level rendering delegated: ${forbiddenPanelToken}`);
  }
}

if (countLines(panelSource) > 60) {
  throw new Error(`dead-letter-recovery-panel.tsx exceeded 60 lines: ${countLines(panelSource)}`);
}

for (const requiredPanelContentImport of [
  'import { DeadLetterRecoveryPanelEmpty } from "./dead-letter-recovery-panel-empty";',
  'import { buildDeadLetterRecoveryPanelListProps } from "./dead-letter-recovery-panel-list-props";',
  'import { DeadLetterRecoveryPanelList } from "./dead-letter-recovery-panel-list";',
  'import type { DeadLetterRecoveryPanelContentProps } from "./dead-letter-recovery-panel-content.types";',
]) {
  if (!panelContentSource.includes(requiredPanelContentImport)) {
    throw new Error(
      `dead-letter-recovery-panel-content.tsx must import delegated content helpers: ${requiredPanelContentImport}`,
    );
  }
}

for (const requiredPanelContentUsage of [
  "<DeadLetterRecoveryPanelEmpty",
  "<DeadLetterRecoveryPanelList {...buildDeadLetterRecoveryPanelListProps({ ...props, mediaDeadLetterOverview })} />",
]) {
  if (!panelContentSource.includes(requiredPanelContentUsage)) {
    throw new Error(
      `dead-letter-recovery-panel-content.tsx must compose delegated empty/list sections: ${requiredPanelContentUsage}`,
    );
  }
}

for (const forbiddenPanelContentToken of [
  "<DeadLetterRecoveryItemCard",
  "mediaDeadLetterOverview?.items.map(",
  "getMediaIssueAction(",
]) {
  if (panelContentSource.includes(forbiddenPanelContentToken)) {
    throw new Error(
      `dead-letter-recovery-panel-content.tsx must keep per-item rendering delegated: ${forbiddenPanelContentToken}`,
    );
  }
}

if (countLines(panelContentSource) > 25) {
  throw new Error(
    `dead-letter-recovery-panel-content.tsx exceeded 25 lines: ${countLines(panelContentSource)}`,
  );
}

for (const requiredSummaryImport of [
  'import { DeadLetterRecoverySummaryActions } from "./dead-letter-recovery-summary-actions";',
  'import { DeadLetterRecoverySummaryHeader } from "./dead-letter-recovery-summary-header";',
  'import type { DeadLetterRecoverySummaryProps } from "./dead-letter-recovery-summary.types";',
]) {
  if (!summarySource.includes(requiredSummaryImport)) {
    throw new Error(`dead-letter-recovery-summary.tsx must import delegated summary helpers: ${requiredSummaryImport}`);
  }
}

for (const requiredSummaryUsage of ["<DeadLetterRecoverySummaryHeader", "<DeadLetterRecoverySummaryActions"]) {
  if (!summarySource.includes(requiredSummaryUsage)) {
    throw new Error(`dead-letter-recovery-summary.tsx must delegate summary sections: ${requiredSummaryUsage}`);
  }
}

for (const forbiddenSummaryToken of [
  "<DeadLetterRecoverySummaryStats",
  "<DeadLetterRecoverySummaryActionButtons",
  "mediaIssueCopy.retrySelectedPrefix",
  "Object.entries(mediaDeadLetterOverview.by_retry_state)",
]) {
  if (summarySource.includes(forbiddenSummaryToken)) {
    throw new Error(`dead-letter-recovery-summary.tsx must keep summary details delegated: ${forbiddenSummaryToken}`);
  }
}

if (countLines(summarySource) > 35) {
  throw new Error(`dead-letter-recovery-summary.tsx exceeded 35 lines: ${countLines(summarySource)}`);
}

for (const requiredSummaryHeaderImport of [
  'import { DeadLetterRecoverySummaryIntro } from "./dead-letter-recovery-summary-intro";',
  'import { DeadLetterRecoverySummaryStats } from "./dead-letter-recovery-summary-stats";',
  'import type { DeadLetterRecoverySummaryHeaderProps } from "./dead-letter-recovery-summary-header.types";',
]) {
  if (!summaryHeaderSource.includes(requiredSummaryHeaderImport)) {
    throw new Error(
      `dead-letter-recovery-summary-header.tsx must import delegated summary-header helpers: ${requiredSummaryHeaderImport}`,
    );
  }
}

for (const requiredSummaryHeaderUsage of ["<DeadLetterRecoverySummaryIntro", "<DeadLetterRecoverySummaryStats"]) {
  if (!summaryHeaderSource.includes(requiredSummaryHeaderUsage)) {
    throw new Error(
      `dead-letter-recovery-summary-header.tsx must compose delegated intro/stats sections: ${requiredSummaryHeaderUsage}`,
    );
  }
}

for (const forbiddenSummaryHeaderToken of [
  "Object.entries(mediaDeadLetterOverview.by_retry_state)",
  "Object.entries(mediaDeadLetterOverview.by_issue_category)",
  "mediaDeadLetterOverview?.total_count ?? 0",
]) {
  if (summaryHeaderSource.includes(forbiddenSummaryHeaderToken)) {
    throw new Error(
      `dead-letter-recovery-summary-header.tsx must keep summary-stat rendering delegated: ${forbiddenSummaryHeaderToken}`,
    );
  }
}

if (countLines(summaryHeaderSource) > 35) {
  throw new Error(
    `dead-letter-recovery-summary-header.tsx exceeded 35 lines: ${countLines(summaryHeaderSource)}`,
  );
}

for (const requiredSummaryStatsImport of [
  'import { DeadLetterRecoverySummaryIssueCategoryTags } from "./dead-letter-recovery-summary-issue-category-tags";',
  'import { DeadLetterRecoverySummaryRetryStateTags } from "./dead-letter-recovery-summary-retry-state-tags";',
  'import { DeadLetterRecoverySummaryTotalCountTag } from "./dead-letter-recovery-summary-total-count-tag";',
  'import type { DeadLetterRecoverySummaryStatsProps } from "./dead-letter-recovery-summary-stats.types";',
]) {
  if (!summaryStatsSource.includes(requiredSummaryStatsImport)) {
    throw new Error(`dead-letter-recovery-summary-stats.tsx must import delegated stats helpers: ${requiredSummaryStatsImport}`);
  }
}

for (const requiredSummaryStatsUsage of [
  "<DeadLetterRecoverySummaryTotalCountTag",
  "<DeadLetterRecoverySummaryRetryStateTags",
  "<DeadLetterRecoverySummaryIssueCategoryTags",
]) {
  if (!summaryStatsSource.includes(requiredSummaryStatsUsage)) {
    throw new Error(`dead-letter-recovery-summary-stats.tsx must compose delegated stat tags: ${requiredSummaryStatsUsage}`);
  }
}

for (const forbiddenSummaryStatsToken of [
  "Object.entries(mediaDeadLetterOverview.by_retry_state)",
  "Object.entries(mediaDeadLetterOverview.by_issue_category)",
  "getRetryStateLabel(",
]) {
  if (summaryStatsSource.includes(forbiddenSummaryStatsToken)) {
    throw new Error(`dead-letter-recovery-summary-stats.tsx must keep tag rendering delegated: ${forbiddenSummaryStatsToken}`);
  }
}

if (countLines(summaryStatsSource) > 35) {
  throw new Error(
    `dead-letter-recovery-summary-stats.tsx exceeded 35 lines: ${countLines(summaryStatsSource)}`,
  );
}

for (const requiredSummaryActionsImport of [
  'import { DeadLetterRecoverySummaryActionButtons } from "./dead-letter-recovery-summary-action-buttons";',
  'import type { DeadLetterRecoverySummaryActionsProps } from "./dead-letter-recovery-summary-actions.types";',
]) {
  if (!summaryActionsSource.includes(requiredSummaryActionsImport)) {
    throw new Error(
      `dead-letter-recovery-summary-actions.tsx must import delegated summary-action helpers: ${requiredSummaryActionsImport}`,
    );
  }
}

for (const requiredSummaryActionsUsage of [
  "if (!mediaDeadLetterOverview?.items.length) {",
  "return null;",
  "<DeadLetterRecoverySummaryActionButtons",
]) {
  if (!summaryActionsSource.includes(requiredSummaryActionsUsage)) {
    throw new Error(
      `dead-letter-recovery-summary-actions.tsx must compose delegated action buttons: ${requiredSummaryActionsUsage}`,
    );
  }
}

for (const forbiddenSummaryActionsToken of [
  'className="action-row"',
  "mediaIssueCopy.retrySelectedPrefix",
  "selectedDeadLetterIds.length",
  "type=\"button\"",
]) {
  if (summaryActionsSource.includes(forbiddenSummaryActionsToken)) {
    throw new Error(
      `dead-letter-recovery-summary-actions.tsx must keep button rendering delegated: ${forbiddenSummaryActionsToken}`,
    );
  }
}

if (countLines(summaryActionsSource) > 30) {
  throw new Error(
    `dead-letter-recovery-summary-actions.tsx exceeded 30 lines: ${countLines(summaryActionsSource)}`,
  );
}

for (const requiredItemCardImport of [
  'import { DeadLetterRecoveryItemCardActions } from "./dead-letter-recovery-item-card-actions";',
  'import { buildDeadLetterRecoveryItemCardActionsProps } from "./dead-letter-recovery-item-card-actions-props";',
  'import { buildDeadLetterRecoveryItemCardErrorProps } from "./dead-letter-recovery-item-card-error-props";',
  'import { DeadLetterRecoveryItemCardError } from "./dead-letter-recovery-item-card-error";',
  'import { DeadLetterRecoveryItemCardHeader } from "./dead-letter-recovery-item-card-header";',
  'import { buildDeadLetterRecoveryItemCardHeaderProps } from "./dead-letter-recovery-item-card-header-props";',
  'import { buildDeadLetterRecoveryItemCardStatusSectionProps } from "./dead-letter-recovery-item-card-status-section-props";',
  'import { DeadLetterRecoveryItemCardStatus } from "./dead-letter-recovery-item-card-status";',
  'import type { DeadLetterRecoveryItemCardProps } from "./dead-letter-recovery-panel.types";',
]) {
  if (!itemCardSource.includes(requiredItemCardImport)) {
    throw new Error(`dead-letter-recovery-item-card.tsx must import delegated item-card helpers: ${requiredItemCardImport}`);
  }
}

for (const requiredItemCardUsage of [
  "<DeadLetterRecoveryItemCardHeader",
  "<DeadLetterRecoveryItemCardStatus",
  "<DeadLetterRecoveryItemCardActions",
  "<DeadLetterRecoveryItemCardError",
  "<article className=\"record-card\">",
]) {
  if (!itemCardSource.includes(requiredItemCardUsage)) {
    throw new Error(`dead-letter-recovery-item-card.tsx must compose delegated item-card sections: ${requiredItemCardUsage}`);
  }
}

for (const forbiddenItemCardToken of [
  "const action = getMediaIssueAction(locale, item);",
  "const settingsHref = buildMediaIssueSettingsHref(workspaceId, item);",
  'className="tag-row"',
  'className="action-row"',
  "<DeadLetterRecoveryItemCardTags",
]) {
  if (itemCardSource.includes(forbiddenItemCardToken)) {
    throw new Error(`dead-letter-recovery-item-card.tsx must keep item-card details delegated: ${forbiddenItemCardToken}`);
  }
}

if (countLines(itemCardSource) > 35) {
  throw new Error(`dead-letter-recovery-item-card.tsx exceeded 35 lines: ${countLines(itemCardSource)}`);
}

console.log("dead-letter-recovery structure verification passed");

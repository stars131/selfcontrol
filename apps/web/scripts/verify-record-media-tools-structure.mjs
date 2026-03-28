import fs from "node:fs";
import path from "node:path";

const recordMediaToolsPath = path.resolve(process.cwd(), "components/record-media-tools.tsx");
const recordMediaSelectedContentPath = path.resolve(
  process.cwd(),
  "components/record-media-selected-content.tsx",
);
const recentMediaIssuesPanelPath = path.resolve(
  process.cwd(),
  "components/recent-media-issues-panel.tsx",
);
const recentMediaIssuesPanelListPath = path.resolve(
  process.cwd(),
  "components/recent-media-issues-panel-list.tsx",
);
const recentMediaIssueCardPath = path.resolve(
  process.cwd(),
  "components/recent-media-issue-card.tsx",
);
const recentMediaIssueCardTagsPath = path.resolve(
  process.cwd(),
  "components/recent-media-issue-card-tags.tsx",
);
const recentMediaIssueCardTagsTypesPath = path.resolve(
  process.cwd(),
  "components/recent-media-issue-card-tags.types.ts",
);
const recentMediaIssueCardActionsPath = path.resolve(
  process.cwd(),
  "components/recent-media-issue-card-actions.tsx",
);
const recentMediaIssueCardActionsTypesPath = path.resolve(
  process.cwd(),
  "components/recent-media-issue-card-actions.types.ts",
);
const source = fs.readFileSync(recordMediaToolsPath, "utf8");
const selectedContentSource = fs.readFileSync(recordMediaSelectedContentPath, "utf8");
const recentMediaIssuesPanelSource = fs.readFileSync(recentMediaIssuesPanelPath, "utf8");
const recentMediaIssuesPanelListSource = fs.readFileSync(recentMediaIssuesPanelListPath, "utf8");
const recentMediaIssueCardSource = fs.readFileSync(recentMediaIssueCardPath, "utf8");
const recentMediaIssueCardTagsSource = fs.readFileSync(recentMediaIssueCardTagsPath, "utf8");
const recentMediaIssueCardTagsTypesSource = fs.readFileSync(
  recentMediaIssueCardTagsTypesPath,
  "utf8",
);
const recentMediaIssueCardActionsSource = fs.readFileSync(recentMediaIssueCardActionsPath, "utf8");
const recentMediaIssueCardActionsTypesSource = fs.readFileSync(
  recentMediaIssueCardActionsTypesPath,
  "utf8",
);
const lineCount = source.split(/\r?\n/).length;
const selectedContentLineCount = selectedContentSource.split(/\r?\n/).length;
const recentMediaIssuesPanelLineCount = recentMediaIssuesPanelSource.split(/\r?\n/).length;
const recentMediaIssuesPanelListLineCount = recentMediaIssuesPanelListSource.split(/\r?\n/).length;
const recentMediaIssueCardLineCount = recentMediaIssueCardSource.split(/\r?\n/).length;
const recentMediaIssueCardTagsLineCount = recentMediaIssueCardTagsSource.split(/\r?\n/).length;
const recentMediaIssueCardTagsTypesLineCount =
  recentMediaIssueCardTagsTypesSource.split(/\r?\n/).length;
const recentMediaIssueCardActionsLineCount = recentMediaIssueCardActionsSource.split(/\r?\n/).length;
const recentMediaIssueCardActionsTypesLineCount =
  recentMediaIssueCardActionsTypesSource.split(/\r?\n/).length;

if (!source.includes('import type { RecordMediaToolsProps } from "./record-media-tools.types";')) {
  throw new Error("record-media-tools.tsx must import RecordMediaToolsProps from record-media-tools.types");
}

if (!source.includes('import { RecordMediaToolsActions } from "./record-media-tools-actions";')) {
  throw new Error("record-media-tools.tsx must import RecordMediaToolsActions");
}

if (!source.includes('import { RecordMediaSelectedContent } from "./record-media-selected-content";')) {
  throw new Error("record-media-tools.tsx must import RecordMediaSelectedContent");
}

if (!source.includes('from "./record-media-tools-props";')) {
  throw new Error("record-media-tools.tsx must import record-media-tools-props");
}

for (const requiredUsage of [
  "<RecordMediaToolsActions",
  "<RecordMediaSelectedContent",
  "buildRecordMediaToolsActionsProps(props)",
  "buildRecordMediaSelectedContentProps(props)",
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
  "saveButtonLabel={saveButtonLabel}",
  "allTrackedFilesPresentLabel={allTrackedFilesPresentLabel}",
  "authToken={authToken}",
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

for (const requiredImport of [
  'import { RecentMediaIssuesPanelEmpty } from "./recent-media-issues-panel-empty";',
  'import { RecentMediaIssuesPanelIntro } from "./recent-media-issues-panel-intro";',
  'import { RecentMediaIssuesPanelList } from "./recent-media-issues-panel-list";',
  'import { buildRecentMediaIssuesPanelListProps } from "./recent-media-issues-panel-list-props";',
  'import type { RecentMediaIssuesPanelProps } from "./recent-media-issues-panel.types";',
]) {
  if (!recentMediaIssuesPanelSource.includes(requiredImport)) {
    throw new Error(
      `recent-media-issues-panel.tsx must keep panel-level media issue boundaries delegated: ${requiredImport}`,
    );
  }
}

for (const requiredUsage of [
  "<RecentMediaIssuesPanelIntro",
  "<RecentMediaIssuesPanelList {...buildRecentMediaIssuesPanelListProps(props)} />",
  "<RecentMediaIssuesPanelEmpty",
  "mediaProcessingOverview.recent_issues.length ?",
]) {
  if (!recentMediaIssuesPanelSource.includes(requiredUsage)) {
    throw new Error(
      `recent-media-issues-panel.tsx must compose delegated panel sections: ${requiredUsage}`,
    );
  }
}

for (const forbiddenToken of [
  'import { RecentMediaIssueCard } from "./recent-media-issue-card";',
  'import Link from "next/link";',
  'from "../lib/media-issue-display";',
  'from "../lib/record-panel-media";',
  "<article className=\"record-card\"",
  "<RecentMediaIssueCard",
  "mediaProcessingOverview.recent_issues.map((issue) => (",
  "getMediaIssueAction(",
  "getMediaIssueLabel(",
  "getProcessingStatusLabel(",
  "getRetryStateLabel(",
  "buildMediaIssueSettingsHref(",
  "canRetryMediaIssue(",
]) {
  if (recentMediaIssuesPanelSource.includes(forbiddenToken)) {
    throw new Error(
      `recent-media-issues-panel.tsx must keep per-issue rendering delegated: ${forbiddenToken}`,
    );
  }
}

const maxRecentMediaIssuesPanelLines = 60;
if (recentMediaIssuesPanelLineCount > maxRecentMediaIssuesPanelLines) {
  throw new Error(
    `recent-media-issues-panel.tsx exceeded ${maxRecentMediaIssuesPanelLines} lines: ${recentMediaIssuesPanelLineCount}`,
  );
}

for (const requiredListImport of [
  'import { buildRecentMediaIssueCardProps } from "./recent-media-issues-list-item-props";',
  'import { RecentMediaIssueCard } from "./recent-media-issue-card";',
  'import type { RecentMediaIssuesPanelListProps } from "./recent-media-issues-panel-list.types";',
]) {
  if (!recentMediaIssuesPanelListSource.includes(requiredListImport)) {
    throw new Error(
      `recent-media-issues-panel-list.tsx must keep delegated issue-list boundaries: ${requiredListImport}`,
    );
  }
}

for (const requiredListUsage of [
  "<RecentMediaIssueCard",
  "mediaProcessingOverview.recent_issues.map((issue) =>",
  "buildRecentMediaIssueCardProps({ ...props, issue })",
]) {
  if (!recentMediaIssuesPanelListSource.includes(requiredListUsage)) {
    throw new Error(
      `recent-media-issues-panel-list.tsx must compose delegated issue cards: ${requiredListUsage}`,
    );
  }
}

for (const forbiddenListToken of [
  'import Link from "next/link";',
  'from "../lib/media-issue-display";',
  'from "../lib/record-panel-media";',
  "getMediaIssueAction(",
  "getMediaIssueLabel(",
  "getProcessingStatusLabel(",
  "getRetryStateLabel(",
  "buildMediaIssueSettingsHref(",
  "canRetryMediaIssue(",
]) {
  if (recentMediaIssuesPanelListSource.includes(forbiddenListToken)) {
    throw new Error(
      `recent-media-issues-panel-list.tsx must keep per-issue rendering delegated: ${forbiddenListToken}`,
    );
  }
}

const maxRecentMediaIssuesPanelListLines = 40;
if (recentMediaIssuesPanelListLineCount > maxRecentMediaIssuesPanelListLines) {
  throw new Error(
    `recent-media-issues-panel-list.tsx exceeded ${maxRecentMediaIssuesPanelListLines} lines: ${recentMediaIssuesPanelListLineCount}`,
  );
}

for (const requiredImport of [
  'import { RecentMediaIssueCardActions } from "./recent-media-issue-card-actions";',
  'import { buildRecentMediaIssueCardActionsProps } from "./recent-media-issue-card-actions-props";',
  'import { buildRecentMediaIssueCardErrorProps } from "./recent-media-issue-card-error-props";',
  'import { RecentMediaIssueCardError } from "./recent-media-issue-card-error";',
  'import { buildRecentMediaIssueCardIntroProps } from "./recent-media-issue-card-intro-props";',
  'import { RecentMediaIssueCardIntro } from "./recent-media-issue-card-intro";',
  'import { RecentMediaIssueCardMetadata } from "./recent-media-issue-card-metadata";',
  'import { buildRecentMediaIssueCardMetadataProps } from "./recent-media-issue-card-metadata-props";',
  'import { buildRecentMediaIssueCardTagsProps } from "./recent-media-issue-card-tags-props";',
  'import { RecentMediaIssueCardTags } from "./recent-media-issue-card-tags";',
  'import type { RecentMediaIssueCardProps } from "./recent-media-issues-panel.types";',
]) {
  if (!recentMediaIssueCardSource.includes(requiredImport)) {
    throw new Error(
      `recent-media-issue-card.tsx must import delegated issue helpers: ${requiredImport}`,
    );
  }
}

for (const requiredUsage of [
  "<RecentMediaIssueCardIntro",
  "<RecentMediaIssueCardTags",
  "<RecentMediaIssueCardMetadata",
  "<RecentMediaIssueCardActions",
  "<RecentMediaIssueCardError",
  "<article className=\"record-card\">",
]) {
  if (!recentMediaIssueCardSource.includes(requiredUsage)) {
    throw new Error(
      `recent-media-issue-card.tsx must own per-issue rendering: ${requiredUsage}`,
    );
  }
}

for (const forbiddenToken of [
  "mediaProcessingOverview.recent_issues.map(",
  "type RecentMediaIssuesPanelProps = {",
  'import Link from "next/link";',
  'from "../lib/media-issue-display";',
  'from "../lib/record-panel-media";',
  "getProcessingStatusLabel(",
  "getRetryStateLabel(",
  "getRemoteFetchStatusLabel(",
  "getMediaIssueLabel(",
  "buildMediaIssueSettingsHref(",
  "canRetryMediaIssue(issue)",
  'className="tag-row"',
  'className="action-row"',
]) {
  if (recentMediaIssueCardSource.includes(forbiddenToken)) {
    throw new Error(
      `recent-media-issue-card.tsx must keep list-level concerns delegated: ${forbiddenToken}`,
    );
  }
}

const maxRecentMediaIssueCardLines = 80;
if (recentMediaIssueCardLineCount > maxRecentMediaIssueCardLines) {
  throw new Error(
    `recent-media-issue-card.tsx exceeded ${maxRecentMediaIssueCardLines} lines: ${recentMediaIssueCardLineCount}`,
  );
}

for (const requiredRecentMediaIssueCardTagsImport of [
  'import { buildRecentMediaIssueCardExtractionModeTagProps } from "./recent-media-issue-card-extraction-mode-tag-props";',
  'import { RecentMediaIssueCardExtractionModeTag } from "./recent-media-issue-card-extraction-mode-tag";',
  'import { buildRecentMediaIssueCardIssueLabelTagProps } from "./recent-media-issue-card-issue-label-tag-props";',
  'import { RecentMediaIssueCardIssueLabelTag } from "./recent-media-issue-card-issue-label-tag";',
  'import { buildRecentMediaIssueCardProcessingStatusTagProps } from "./recent-media-issue-card-processing-status-tag-props";',
  'import { RecentMediaIssueCardProcessingStatusTag } from "./recent-media-issue-card-processing-status-tag";',
  'import { buildRecentMediaIssueCardProcessingSourceTagProps } from "./recent-media-issue-card-processing-source-tag-props";',
  'import { RecentMediaIssueCardProcessingSourceTag } from "./recent-media-issue-card-processing-source-tag";',
  'import { buildRecentMediaIssueCardRemoteFetchTagProps } from "./recent-media-issue-card-remote-fetch-tag-props";',
  'import { RecentMediaIssueCardRemoteFetchTag } from "./recent-media-issue-card-remote-fetch-tag";',
  'import { buildRecentMediaIssueCardRetryCountTagProps } from "./recent-media-issue-card-retry-count-tag-props";',
  'import { RecentMediaIssueCardRetryCountTag } from "./recent-media-issue-card-retry-count-tag";',
  'import { buildRecentMediaIssueCardRetryStateTagProps } from "./recent-media-issue-card-retry-state-tag-props";',
  'import { RecentMediaIssueCardRetryStateTag } from "./recent-media-issue-card-retry-state-tag";',
  'import { buildRecentMediaIssueCardStorageProviderTagProps } from "./recent-media-issue-card-storage-provider-tag-props";',
  'import { RecentMediaIssueCardStorageProviderTag } from "./recent-media-issue-card-storage-provider-tag";',
  'import type { RecentMediaIssueCardTagsProps } from "./recent-media-issue-card-tags.types";',
]) {
  if (!recentMediaIssueCardTagsSource.includes(requiredRecentMediaIssueCardTagsImport)) {
    throw new Error(
      `recent-media-issue-card-tags.tsx must import delegated issue-tag helpers: ${requiredRecentMediaIssueCardTagsImport}`,
    );
  }
}

for (const requiredRecentMediaIssueCardTagsUsage of [
  "export function RecentMediaIssueCardTags(props: RecentMediaIssueCardTagsProps) {",
  "<RecentMediaIssueCardProcessingStatusTag",
  "<RecentMediaIssueCardStorageProviderTag",
  "<RecentMediaIssueCardProcessingSourceTag",
  "<RecentMediaIssueCardRemoteFetchTag",
  "<RecentMediaIssueCardExtractionModeTag",
  "<RecentMediaIssueCardRetryStateTag",
  "<RecentMediaIssueCardIssueLabelTag",
  "<RecentMediaIssueCardRetryCountTag",
  'className="tag-row"',
]) {
  if (!recentMediaIssueCardTagsSource.includes(requiredRecentMediaIssueCardTagsUsage)) {
    throw new Error(
      `recent-media-issue-card-tags.tsx must own issue tag rendering: ${requiredRecentMediaIssueCardTagsUsage}`,
    );
  }
}

for (const forbiddenRecentMediaIssueCardTagsToken of [
  'from "../lib/media-issue-display";',
  'import type { RecentMediaIssueCardProps } from "./recent-media-issues-panel.types";',
  "type RecentMediaIssueCardTagsProps = Pick<",
  "getProcessingStatusLabel(",
  "getRemoteFetchStatusLabel(",
  "getRetryStateLabel(",
  "getMediaIssueLabel(",
]) {
  if (recentMediaIssueCardTagsSource.includes(forbiddenRecentMediaIssueCardTagsToken)) {
    throw new Error(
      `recent-media-issue-card-tags.tsx must keep issue-tag prop typing delegated: ${forbiddenRecentMediaIssueCardTagsToken}`,
    );
  }
}

if (recentMediaIssueCardTagsLineCount > 80) {
  throw new Error(
    `recent-media-issue-card-tags.tsx exceeded 80 lines: ${recentMediaIssueCardTagsLineCount}`,
  );
}

for (const requiredRecentMediaIssueCardTagsTypesUsage of [
  'import type { RecentMediaIssueCardProps } from "./recent-media-issues-panel.types"; export type RecentMediaIssueCardTagsProps = Pick<RecentMediaIssueCardProps, "issue" | "locale" | "mediaIssueCopy">;',
]) {
  if (!recentMediaIssueCardTagsTypesSource.includes(requiredRecentMediaIssueCardTagsTypesUsage)) {
    throw new Error(
      `recent-media-issue-card-tags.types.ts must own issue-tag prop typing: ${requiredRecentMediaIssueCardTagsTypesUsage}`,
    );
  }
}

if (recentMediaIssueCardTagsTypesLineCount > 2) {
  throw new Error(
    `recent-media-issue-card-tags.types.ts exceeded 2 lines: ${recentMediaIssueCardTagsTypesLineCount}`,
  );
}

for (const requiredRecentMediaIssueCardActionsImport of [
  'import { buildRecentMediaIssueCardActionButtonsProps } from "./recent-media-issue-card-action-buttons-props";',
  'import { RecentMediaIssueCardActionButtons } from "./recent-media-issue-card-action-buttons";',
  'import type { RecentMediaIssueCardActionsProps } from "./recent-media-issue-card-actions.types";',
]) {
  if (!recentMediaIssueCardActionsSource.includes(requiredRecentMediaIssueCardActionsImport)) {
    throw new Error(
      `recent-media-issue-card-actions.tsx must import delegated issue-action helpers: ${requiredRecentMediaIssueCardActionsImport}`,
    );
  }
}

for (const requiredRecentMediaIssueCardActionsUsage of [
  "export function RecentMediaIssueCardActions(props: RecentMediaIssueCardActionsProps) {",
  "if (!props.canWriteWorkspace && !props.settingsHref) {",
  "return null;",
  "<RecentMediaIssueCardActionButtons {...buildRecentMediaIssueCardActionButtonsProps(props)} />",
]) {
  if (!recentMediaIssueCardActionsSource.includes(requiredRecentMediaIssueCardActionsUsage)) {
    throw new Error(
      `recent-media-issue-card-actions.tsx must own issue action rendering: ${requiredRecentMediaIssueCardActionsUsage}`,
    );
  }
}

for (const forbiddenRecentMediaIssueCardActionsToken of [
  'import Link from "next/link";',
  'from "../lib/record-panel-media";',
  'import type { RecentMediaIssueCardProps } from "./recent-media-issues-panel.types";',
  "type RecentMediaIssueCardActionsProps = Pick<",
  "const retrying = retryingMediaId === issue.media_id;",
  "canRetryMediaIssue(issue)",
  'href={settingsHref}',
  "onClick={() => void onRetryMediaProcessing(issue.media_id)}",
]) {
  if (recentMediaIssueCardActionsSource.includes(forbiddenRecentMediaIssueCardActionsToken)) {
    throw new Error(
      `recent-media-issue-card-actions.tsx must keep issue-action prop typing delegated: ${forbiddenRecentMediaIssueCardActionsToken}`,
    );
  }
}

if (recentMediaIssueCardActionsLineCount > 30) {
  throw new Error(
    `recent-media-issue-card-actions.tsx exceeded 30 lines: ${recentMediaIssueCardActionsLineCount}`,
  );
}

for (const requiredRecentMediaIssueCardActionsTypesUsage of [
  'import type { RecentMediaIssueCardProps } from "./recent-media-issues-panel.types"; export type RecentMediaIssueCardActionsProps = Pick<RecentMediaIssueCardProps, "canWriteWorkspace" | "issue" | "mediaIssueCopy" | "onRetryMediaProcessing" | "retryingMediaId"> & { settingsHref: string | null };',
]) {
  if (!recentMediaIssueCardActionsTypesSource.includes(requiredRecentMediaIssueCardActionsTypesUsage)) {
    throw new Error(
      `recent-media-issue-card-actions.types.ts must own issue-action prop typing: ${requiredRecentMediaIssueCardActionsTypesUsage}`,
    );
  }
}

if (recentMediaIssueCardActionsTypesLineCount > 2) {
  throw new Error(
    `recent-media-issue-card-actions.types.ts exceeded 2 lines: ${recentMediaIssueCardActionsTypesLineCount}`,
  );
}

console.log("record-media-tools structure verification passed");

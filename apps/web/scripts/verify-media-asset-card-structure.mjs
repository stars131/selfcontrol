import fs from "node:fs";
import path from "node:path";

const cardPath = path.resolve(process.cwd(), "components/media-asset-card.tsx");
const cardSource = fs.readFileSync(cardPath, "utf8");
const cardLineCount = cardSource.split(/\r?\n/).length;
const previewPath = path.resolve(process.cwd(), "components/media-preview.tsx");
const previewSource = fs.readFileSync(previewPath, "utf8");
const previewLineCount = previewSource.split(/\r?\n/).length;
const previewTypesPath = path.resolve(process.cwd(), "components/media-preview.types.ts");
const previewTypesSource = fs.readFileSync(previewTypesPath, "utf8");
const previewTypesLineCount = previewTypesSource.split(/\r?\n/).length;
const previewHookPath = path.resolve(process.cwd(), "components/use-media-preview.ts");
const previewHookSource = fs.readFileSync(previewHookPath, "utf8");
const previewHookLineCount = previewHookSource.split(/\r?\n/).length;
const previewContentPath = path.resolve(process.cwd(), "components/media-preview-content.tsx");
const previewContentSource = fs.readFileSync(previewContentPath, "utf8");
const previewContentLineCount = previewContentSource.split(/\r?\n/).length;
const previewContentTypesPath = path.resolve(process.cwd(), "components/media-preview-content.types.ts");
const previewContentTypesSource = fs.readFileSync(previewContentTypesPath, "utf8");
const previewContentTypesLineCount = previewContentTypesSource.split(/\r?\n/).length;
const metadataPath = path.resolve(process.cwd(), "components/media-asset-card-metadata.tsx");
const metadataSource = fs.readFileSync(metadataPath, "utf8");
const metadataTagsPath = path.resolve(process.cwd(), "components/media-asset-card-metadata-tags.tsx");
const metadataTagsSource = fs.readFileSync(metadataTagsPath, "utf8");
const metadataTagsLineCount = metadataTagsSource.split(/\r?\n/).length;
const metadataTagsTypesPath = path.resolve(process.cwd(), "components/media-asset-card-metadata-tags.types.ts");
const metadataTagsTypesSource = fs.readFileSync(metadataTagsTypesPath, "utf8");
const metadataTagsTypesLineCount = metadataTagsTypesSource.split(/\r?\n/).length;
const remoteFetchTagPath = path.resolve(process.cwd(), "components/media-asset-card-remote-fetch-tag.tsx");
const remoteFetchTagSource = fs.readFileSync(remoteFetchTagPath, "utf8");
const remoteFetchTagLineCount = remoteFetchTagSource.split(/\r?\n/).length;
const remoteFetchTagTypesPath = path.resolve(process.cwd(), "components/media-asset-card-remote-fetch-tag.types.ts");
const remoteFetchTagTypesSource = fs.readFileSync(remoteFetchTagTypesPath, "utf8");
const remoteFetchTagTypesLineCount = remoteFetchTagTypesSource.split(/\r?\n/).length;
const retryStateTagPath = path.resolve(process.cwd(), "components/media-asset-card-retry-state-tag.tsx");
const retryStateTagSource = fs.readFileSync(retryStateTagPath, "utf8");
const retryStateTagLineCount = retryStateTagSource.split(/\r?\n/).length;
const retryStateTagTypesPath = path.resolve(process.cwd(), "components/media-asset-card-retry-state-tag.types.ts");
const retryStateTagTypesSource = fs.readFileSync(retryStateTagTypesPath, "utf8");
const retryStateTagTypesLineCount = retryStateTagTypesSource.split(/\r?\n/).length;
const actionsPath = path.resolve(process.cwd(), "components/media-asset-card-actions.tsx");
const actionsSource = fs.readFileSync(actionsPath, "utf8");

if (!cardSource.includes('import { MediaAssetCardMetadata } from "./media-asset-card-metadata";')) {
  throw new Error("media-asset-card.tsx must import MediaAssetCardMetadata");
}

if (!cardSource.includes('import { MediaAssetCardActions } from "./media-asset-card-actions";')) {
  throw new Error("media-asset-card.tsx must import MediaAssetCardActions");
}

if (!cardSource.includes('import { MediaAssetCardPreview } from "./media-asset-card-preview";')) {
  throw new Error("media-asset-card.tsx must import MediaAssetCardPreview");
}

if (!cardSource.includes('import type { MediaAssetCardProps } from "./media-asset-card.types";')) {
  throw new Error("media-asset-card.tsx must import MediaAssetCardProps");
}

if (!cardSource.includes("<MediaAssetCardMetadata")) {
  throw new Error("media-asset-card.tsx must delegate metadata rendering");
}

if (!cardSource.includes("<MediaAssetCardActions")) {
  throw new Error("media-asset-card.tsx must delegate action rendering");
}

if (!cardSource.includes("<MediaAssetCardPreview")) {
  throw new Error("media-asset-card.tsx must delegate preview rendering");
}

if (!metadataSource.includes('readMetadataText(asset.metadata_json, "processing_source")')) {
  throw new Error("media-asset-card-metadata.tsx must keep metadata extraction logic");
}

if (!metadataSource.includes('readMetadataNumber(asset.metadata_json, "processing_retry_count")')) {
  throw new Error("media-asset-card-metadata.tsx must keep retry-count extraction logic");
}

for (const requiredMetadataTagsUsage of [
  'import { MediaAssetCardRemoteFetchTag } from "./media-asset-card-remote-fetch-tag";',
  'import { MediaAssetCardRetryStateTag } from "./media-asset-card-retry-state-tag";',
  'import type { MediaAssetCardMetadataTagsProps } from "./media-asset-card-metadata-tags.types";',
  "}: MediaAssetCardMetadataTagsProps) {",
  'readMetadataText(asset.metadata_json, "remote_fetch_status")',
  "<MediaAssetCardRemoteFetchTag locale={locale} mediaIssueCopy={mediaIssueCopy} remoteFetchStatus={remoteFetchStatus} />",
  "<MediaAssetCardRetryStateTag locale={locale} mediaIssueCopy={mediaIssueCopy} retryState={retryState} />",
]) {
  if (!metadataTagsSource.includes(requiredMetadataTagsUsage)) {
    throw new Error(`media-asset-card-metadata-tags.tsx must delegate remote-fetch tag rendering: ${requiredMetadataTagsUsage}`);
  }
}

for (const forbiddenMetadataTagsToken of [
  "{mediaIssueCopy.fetchPrefix} {getRemoteFetchStatusLabel(locale, remoteFetchStatus)}",
  '{mediaIssueCopy.retryStatePrefix} {getRetryStateLabel(locale, retryState)}',
]) {
  if (metadataTagsSource.includes(forbiddenMetadataTagsToken)) {
    throw new Error(`media-asset-card-metadata-tags.tsx must keep remote-fetch tag rendering delegated: ${forbiddenMetadataTagsToken}`);
  }
}

if (metadataTagsLineCount > 15) {
  throw new Error(`media-asset-card-metadata-tags.tsx exceeded 15 lines: ${metadataTagsLineCount}`);
}

for (const requiredMetadataTagsTypesUsage of [
  'import type { MediaAssetCardMetadataProps } from "./media-asset-card-metadata.types"; export type MediaAssetCardMetadataTagsProps = Pick<MediaAssetCardMetadataProps, "asset" | "mediaIssueCopy">;',
]) {
  if (!metadataTagsTypesSource.includes(requiredMetadataTagsTypesUsage)) {
    throw new Error(`media-asset-card-metadata-tags.types.ts must own metadata tag props: ${requiredMetadataTagsTypesUsage}`);
  }
}

if (metadataTagsTypesLineCount > 2) {
  throw new Error(`media-asset-card-metadata-tags.types.ts exceeded 2 lines: ${metadataTagsTypesLineCount}`);
}

for (const requiredRemoteFetchTagUsage of [
  'import { getRemoteFetchStatusLabel } from "../lib/media-issue-display";',
  'import type { MediaAssetCardRemoteFetchTagProps } from "./media-asset-card-remote-fetch-tag.types";',
  "}: MediaAssetCardRemoteFetchTagProps) {",
  "{mediaIssueCopy.fetchPrefix} {getRemoteFetchStatusLabel(locale, remoteFetchStatus)}",
]) {
  if (!remoteFetchTagSource.includes(requiredRemoteFetchTagUsage)) {
    throw new Error(`media-asset-card-remote-fetch-tag.tsx must own remote-fetch tag rendering: ${requiredRemoteFetchTagUsage}`);
  }
}

for (const forbiddenRemoteFetchTagToken of [
  "getStorageProviderLabel(locale, asset.storage_provider)",
  "formatMediaSize(asset)",
  "getRetryStateLabel(locale, retryState)",
]) {
  if (remoteFetchTagSource.includes(forbiddenRemoteFetchTagToken)) {
    throw new Error(`media-asset-card-remote-fetch-tag.tsx must keep other tag concerns delegated: ${forbiddenRemoteFetchTagToken}`);
  }
}

if (remoteFetchTagLineCount > 6) {
  throw new Error(`media-asset-card-remote-fetch-tag.tsx exceeded 6 lines: ${remoteFetchTagLineCount}`);
}

for (const requiredRemoteFetchTagTypesUsage of [
  'import type { MediaAssetCardMetadataTagsProps } from "./media-asset-card-metadata-tags.types"; import type { LocaleCode } from "../lib/locale"; export type MediaAssetCardRemoteFetchTagProps = Pick<MediaAssetCardMetadataTagsProps, "mediaIssueCopy"> & { locale: LocaleCode; remoteFetchStatus: string | null };',
]) {
  if (!remoteFetchTagTypesSource.includes(requiredRemoteFetchTagTypesUsage)) {
    throw new Error(`media-asset-card-remote-fetch-tag.types.ts must own remote-fetch tag props: ${requiredRemoteFetchTagTypesUsage}`);
  }
}

if (remoteFetchTagTypesLineCount > 2) {
  throw new Error(`media-asset-card-remote-fetch-tag.types.ts exceeded 2 lines: ${remoteFetchTagTypesLineCount}`);
}

for (const requiredRetryStateTagUsage of [
  'import { getRetryStateLabel } from "../lib/media-issue-display";',
  'import type { MediaAssetCardRetryStateTagProps } from "./media-asset-card-retry-state-tag.types";',
  "}: MediaAssetCardRetryStateTagProps) {",
  "{mediaIssueCopy.retryStatePrefix} {getRetryStateLabel(locale, retryState)}",
]) {
  if (!retryStateTagSource.includes(requiredRetryStateTagUsage)) {
    throw new Error(`media-asset-card-retry-state-tag.tsx must own retry-state tag rendering: ${requiredRetryStateTagUsage}`);
  }
}

for (const forbiddenRetryStateTagToken of [
  "getStorageProviderLabel(locale, asset.storage_provider)",
  "formatMediaSize(asset)",
  "getRemoteFetchStatusLabel(locale, remoteFetchStatus)",
]) {
  if (retryStateTagSource.includes(forbiddenRetryStateTagToken)) {
    throw new Error(`media-asset-card-retry-state-tag.tsx must keep other tag concerns delegated: ${forbiddenRetryStateTagToken}`);
  }
}

if (retryStateTagLineCount > 6) {
  throw new Error(`media-asset-card-retry-state-tag.tsx exceeded 6 lines: ${retryStateTagLineCount}`);
}

for (const requiredRetryStateTagTypesUsage of [
  'import type { MediaAssetCardMetadataTagsProps } from "./media-asset-card-metadata-tags.types"; import type { LocaleCode } from "../lib/locale"; export type MediaAssetCardRetryStateTagProps = Pick<MediaAssetCardMetadataTagsProps, "mediaIssueCopy"> & { locale: LocaleCode; retryState: string | null };',
]) {
  if (!retryStateTagTypesSource.includes(requiredRetryStateTagTypesUsage)) {
    throw new Error(`media-asset-card-retry-state-tag.types.ts must own retry-state tag props: ${requiredRetryStateTagTypesUsage}`);
  }
}

if (retryStateTagTypesLineCount > 2) {
  throw new Error(`media-asset-card-retry-state-tag.types.ts exceeded 2 lines: ${retryStateTagTypesLineCount}`);
}

if (!actionsSource.includes('asset.processing_status !== "completed"')) {
  throw new Error("media-asset-card-actions.tsx must keep retry button gating");
}

for (const forbiddenToken of [
  "readMetadataText(asset.metadata_json",
  "readMetadataNumber(asset.metadata_json",
  "formatMediaSize(asset)",
  'className="action-row" style={{ marginTop: 12 }}',
]) {
  if (cardSource.includes(forbiddenToken)) {
    throw new Error(`media-asset-card.tsx must keep metadata and actions delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 90;
if (cardLineCount > maxAllowedLines) {
  throw new Error(`media-asset-card.tsx exceeded ${maxAllowedLines} lines: ${cardLineCount}`);
}

for (const requiredPreviewImport of [
  'import { MediaPreviewContent } from "./media-preview-content";',
  'import type { MediaPreviewProps } from "./media-preview.types";',
  'import { useMediaPreview } from "./use-media-preview";',
]) {
  if (!previewSource.includes(requiredPreviewImport)) {
    throw new Error(`media-preview.tsx must import delegated preview helpers: ${requiredPreviewImport}`);
  }
}

for (const requiredPreviewUsage of [
  "const controller = useMediaPreview(props);",
  "<MediaPreviewContent asset={props.asset} {...controller} />",
]) {
  if (!previewSource.includes(requiredPreviewUsage)) {
    throw new Error(`media-preview.tsx must delegate preview orchestration: ${requiredPreviewUsage}`);
  }
}

for (const forbiddenPreviewToken of [
  'from "../lib/api";',
  "function isPreviewable(",
  "function readNumber(",
  "useEffect(",
  "useMemo(",
  "useState(",
  "fetchMediaBlob(",
  "URL.createObjectURL(",
  'className="media-preview-shell"',
]) {
  if (previewSource.includes(forbiddenPreviewToken)) {
    throw new Error(`media-preview.tsx must keep preview internals delegated: ${forbiddenPreviewToken}`);
  }
}

if (previewLineCount > 20) {
  throw new Error(`media-preview.tsx exceeded 20 lines: ${previewLineCount}`);
}

for (const requiredPreviewTypesUsage of [
  "export type MediaPreviewProps = {",
  "asset: MediaAsset;",
  "export type MediaPreviewControllerResult = {",
  "previewable: boolean;",
]) {
  if (!previewTypesSource.includes(requiredPreviewTypesUsage)) {
    throw new Error(`media-preview.types.ts must own preview contracts: ${requiredPreviewTypesUsage}`);
  }
}

if (previewTypesLineCount > 20) {
  throw new Error(`media-preview.types.ts exceeded 20 lines: ${previewTypesLineCount}`);
}

for (const requiredPreviewHookUsage of [
  'from "../lib/api";',
  'from "../lib/locale";',
  'from "../lib/record-panel-ui";',
  'from "./media-preview.types";',
  "function isPreviewable(",
  "function readNumber(",
  "useEffect(",
  "useMemo(",
  "useState(",
  "getRecordPanelUiBundle(getStoredLocale()).panelCopy",
  "fetchMediaBlob(token, workspaceId, asset.id)",
  "URL.createObjectURL(blob)",
  "previewCopy.previewLoadFailed",
]) {
  if (!previewHookSource.includes(requiredPreviewHookUsage)) {
    throw new Error(`use-media-preview.ts must own preview loading state and fetch logic: ${requiredPreviewHookUsage}`);
  }
}

if (previewHookLineCount > 90) {
  throw new Error(`use-media-preview.ts exceeded 90 lines: ${previewHookLineCount}`);
}

for (const requiredPreviewContentUsage of [
  'import { useStoredLocale } from "../lib/locale";',
  'import { getRecordPanelUiBundle } from "../lib/record-panel-ui";',
  'import type { MediaPreviewContentProps } from "./media-preview-content.types";',
  "}: MediaPreviewContentProps) {",
  "getRecordPanelUiBundle(locale)",
  "if (!previewable) {",
  "panelCopy.previewUnavailable",
  "panelCopy.previewLoading",
  "panelCopy.previewNotReady",
  'className="media-preview-shell"',
  'className="media-preview-image"',
  'className="media-preview-player"',
  'className="media-preview-video"',
]) {
  if (!previewContentSource.includes(requiredPreviewContentUsage)) {
    throw new Error(`media-preview-content.tsx must own preview rendering states: ${requiredPreviewContentUsage}`);
  }
}

for (const forbiddenPreviewContentToken of [
  'from "./media-preview.types";',
  "type MediaPreviewContentProps =",
]) {
  if (previewContentSource.includes(forbiddenPreviewContentToken)) {
    throw new Error(`media-preview-content.tsx must keep preview content prop typing delegated: ${forbiddenPreviewContentToken}`);
  }
}

if (previewContentLineCount > 50) {
  throw new Error(`media-preview-content.tsx exceeded 50 lines: ${previewContentLineCount}`);
}

for (const requiredPreviewContentTypesUsage of [
  'import type { MediaPreviewControllerResult, MediaPreviewProps } from "./media-preview.types"; export type MediaPreviewContentProps = Pick<MediaPreviewProps, "asset"> & MediaPreviewControllerResult;',
]) {
  if (!previewContentTypesSource.includes(requiredPreviewContentTypesUsage)) {
    throw new Error(`media-preview-content.types.ts must own preview content prop typing: ${requiredPreviewContentTypesUsage}`);
  }
}

if (previewContentTypesLineCount > 2) {
  throw new Error(`media-preview-content.types.ts exceeded 2 lines: ${previewContentTypesLineCount}`);
}

console.log("media-asset-card structure verification passed");

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
const previewPropsPath = path.resolve(process.cwd(), "components/media-asset-card-preview-props.ts");
const previewPropsSource = fs.readFileSync(previewPropsPath, "utf8");
const previewPropsLineCount = previewPropsSource.split(/\r?\n/).length;
const previewPropsTypesPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-preview-props.types.ts",
);
const previewPropsTypesSource = fs.readFileSync(previewPropsTypesPath, "utf8");
const previewPropsTypesLineCount = previewPropsTypesSource.split(/\r?\n/).length;
const previewContentPath = path.resolve(process.cwd(), "components/media-preview-content.tsx");
const previewContentSource = fs.readFileSync(previewContentPath, "utf8");
const previewContentLineCount = previewContentSource.split(/\r?\n/).length;
const previewContentTypesPath = path.resolve(process.cwd(), "components/media-preview-content.types.ts");
const previewContentTypesSource = fs.readFileSync(previewContentTypesPath, "utf8");
const previewContentTypesLineCount = previewContentTypesSource.split(/\r?\n/).length;
const metadataPropsPath = path.resolve(process.cwd(), "components/media-asset-card-metadata-props.ts");
const metadataPropsSource = fs.readFileSync(metadataPropsPath, "utf8");
const metadataPropsLineCount = metadataPropsSource.split(/\r?\n/).length;
const metadataPropsTypesPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-metadata-props.types.ts",
);
const metadataPropsTypesSource = fs.readFileSync(metadataPropsTypesPath, "utf8");
const metadataPropsTypesLineCount = metadataPropsTypesSource.split(/\r?\n/).length;
const metadataPath = path.resolve(process.cwd(), "components/media-asset-card-metadata.tsx");
const metadataSource = fs.readFileSync(metadataPath, "utf8");
const metadataDetailTimingPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-metadata-detail-timing.ts",
);
const metadataDetailTimingSource = fs.readFileSync(metadataDetailTimingPath, "utf8");
const metadataDetailTimingLineCount = metadataDetailTimingSource.split(/\r?\n/).length;
const metadataDetailTimingTypesPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-metadata-detail-timing.types.ts",
);
const metadataDetailTimingTypesSource = fs.readFileSync(metadataDetailTimingTypesPath, "utf8");
const metadataDetailTimingTypesLineCount =
  metadataDetailTimingTypesSource.split(/\r?\n/).length;
const metadataDetailsPropsPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-metadata-details-props.ts",
);
const metadataDetailsPropsSource = fs.readFileSync(metadataDetailsPropsPath, "utf8");
const metadataDetailsPropsLineCount = metadataDetailsPropsSource.split(/\r?\n/).length;
const metadataDetailsPropsTypesPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-metadata-details-props.types.ts",
);
const metadataDetailsPropsTypesSource = fs.readFileSync(metadataDetailsPropsTypesPath, "utf8");
const metadataDetailsPropsTypesLineCount =
  metadataDetailsPropsTypesSource.split(/\r?\n/).length;
const metadataDetailsPath = path.resolve(process.cwd(), "components/media-asset-card-metadata-details.tsx");
const metadataDetailsSource = fs.readFileSync(metadataDetailsPath, "utf8");
const metadataDetailsLineCount = metadataDetailsSource.split(/\r?\n/).length;
const metadataDetailsTypesPath = path.resolve(process.cwd(), "components/media-asset-card-metadata-details.types.ts");
const metadataDetailsTypesSource = fs.readFileSync(metadataDetailsTypesPath, "utf8");
const metadataDetailsTypesLineCount = metadataDetailsTypesSource.split(/\r?\n/).length;
const metadataTagsPath = path.resolve(process.cwd(), "components/media-asset-card-metadata-tags.tsx");
const metadataTagsSource = fs.readFileSync(metadataTagsPath, "utf8");
const metadataTagsLineCount = metadataTagsSource.split(/\r?\n/).length;
const metadataTagsTypesPath = path.resolve(process.cwd(), "components/media-asset-card-metadata-tags.types.ts");
const metadataTagsTypesSource = fs.readFileSync(metadataTagsTypesPath, "utf8");
const metadataTagsTypesLineCount = metadataTagsTypesSource.split(/\r?\n/).length;
const metadataTagValuesPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-metadata-tag-values.ts",
);
const metadataTagValuesSource = fs.readFileSync(metadataTagValuesPath, "utf8");
const metadataTagValuesLineCount = metadataTagValuesSource.split(/\r?\n/).length;
const metadataTagValuesTypesPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-metadata-tag-values.types.ts",
);
const metadataTagValuesTypesSource = fs.readFileSync(metadataTagValuesTypesPath, "utf8");
const metadataTagValuesTypesLineCount = metadataTagValuesTypesSource.split(/\r?\n/).length;
const lastAttemptDetailPath = path.resolve(process.cwd(), "components/media-asset-card-last-attempt-detail.tsx");
const lastAttemptDetailSource = fs.readFileSync(lastAttemptDetailPath, "utf8");
const lastAttemptDetailLineCount = lastAttemptDetailSource.split(/\r?\n/).length;
const lastAttemptDetailTypesPath = path.resolve(process.cwd(), "components/media-asset-card-last-attempt-detail.types.ts");
const lastAttemptDetailTypesSource = fs.readFileSync(lastAttemptDetailTypesPath, "utf8");
const lastAttemptDetailTypesLineCount = lastAttemptDetailTypesSource.split(/\r?\n/).length;
const dimensionsDetailPath = path.resolve(process.cwd(), "components/media-asset-card-dimensions-detail.tsx");
const dimensionsDetailSource = fs.readFileSync(dimensionsDetailPath, "utf8");
const dimensionsDetailLineCount = dimensionsDetailSource.split(/\r?\n/).length;
const dimensionsDetailTypesPath = path.resolve(process.cwd(), "components/media-asset-card-dimensions-detail.types.ts");
const dimensionsDetailTypesSource = fs.readFileSync(dimensionsDetailTypesPath, "utf8");
const dimensionsDetailTypesLineCount = dimensionsDetailTypesSource.split(/\r?\n/).length;
const textCharCountDetailPath = path.resolve(process.cwd(), "components/media-asset-card-text-char-count-detail.tsx");
const textCharCountDetailSource = fs.readFileSync(textCharCountDetailPath, "utf8");
const textCharCountDetailLineCount = textCharCountDetailSource.split(/\r?\n/).length;
const textCharCountDetailTypesPath = path.resolve(process.cwd(), "components/media-asset-card-text-char-count-detail.types.ts");
const textCharCountDetailTypesSource = fs.readFileSync(textCharCountDetailTypesPath, "utf8");
const textCharCountDetailTypesLineCount = textCharCountDetailTypesSource.split(/\r?\n/).length;
const textLineCountDetailPath = path.resolve(process.cwd(), "components/media-asset-card-text-line-count-detail.tsx");
const textLineCountDetailSource = fs.readFileSync(textLineCountDetailPath, "utf8");
const textLineCountDetailLineCount = textLineCountDetailSource.split(/\r?\n/).length;
const textLineCountDetailTypesPath = path.resolve(process.cwd(), "components/media-asset-card-text-line-count-detail.types.ts");
const textLineCountDetailTypesSource = fs.readFileSync(textLineCountDetailTypesPath, "utf8");
const textLineCountDetailTypesLineCount = textLineCountDetailTypesSource.split(/\r?\n/).length;
const nextRetryDetailPath = path.resolve(process.cwd(), "components/media-asset-card-next-retry-detail.tsx");
const nextRetryDetailSource = fs.readFileSync(nextRetryDetailPath, "utf8");
const nextRetryDetailLineCount = nextRetryDetailSource.split(/\r?\n/).length;
const nextRetryDetailTypesPath = path.resolve(process.cwd(), "components/media-asset-card-next-retry-detail.types.ts");
const nextRetryDetailTypesSource = fs.readFileSync(nextRetryDetailTypesPath, "utf8");
const nextRetryDetailTypesLineCount = nextRetryDetailTypesSource.split(/\r?\n/).length;
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
const retryCountTagPath = path.resolve(process.cwd(), "components/media-asset-card-retry-count-tag.tsx");
const retryCountTagSource = fs.readFileSync(retryCountTagPath, "utf8");
const retryCountTagLineCount = retryCountTagSource.split(/\r?\n/).length;
const retryCountTagTypesPath = path.resolve(process.cwd(), "components/media-asset-card-retry-count-tag.types.ts");
const retryCountTagTypesSource = fs.readFileSync(retryCountTagTypesPath, "utf8");
const retryCountTagTypesLineCount = retryCountTagTypesSource.split(/\r?\n/).length;
const fileExtensionTagPath = path.resolve(process.cwd(), "components/media-asset-card-file-extension-tag.tsx");
const fileExtensionTagSource = fs.readFileSync(fileExtensionTagPath, "utf8");
const fileExtensionTagLineCount = fileExtensionTagSource.split(/\r?\n/).length;
const fileExtensionTagTypesPath = path.resolve(process.cwd(), "components/media-asset-card-file-extension-tag.types.ts");
const fileExtensionTagTypesSource = fs.readFileSync(fileExtensionTagTypesPath, "utf8");
const fileExtensionTagTypesLineCount = fileExtensionTagTypesSource.split(/\r?\n/).length;
const sizeTagPath = path.resolve(process.cwd(), "components/media-asset-card-size-tag.tsx");
const sizeTagSource = fs.readFileSync(sizeTagPath, "utf8");
const sizeTagLineCount = sizeTagSource.split(/\r?\n/).length;
const sizeTagTypesPath = path.resolve(process.cwd(), "components/media-asset-card-size-tag.types.ts");
const sizeTagTypesSource = fs.readFileSync(sizeTagTypesPath, "utf8");
const sizeTagTypesLineCount = sizeTagTypesSource.split(/\r?\n/).length;
const processingStatusTagPath = path.resolve(process.cwd(), "components/media-asset-card-processing-status-tag.tsx");
const processingStatusTagSource = fs.readFileSync(processingStatusTagPath, "utf8");
const processingStatusTagLineCount = processingStatusTagSource.split(/\r?\n/).length;
const processingStatusTagTypesPath = path.resolve(process.cwd(), "components/media-asset-card-processing-status-tag.types.ts");
const processingStatusTagTypesSource = fs.readFileSync(processingStatusTagTypesPath, "utf8");
const processingStatusTagTypesLineCount = processingStatusTagTypesSource.split(/\r?\n/).length;
const storageProviderTagPath = path.resolve(process.cwd(), "components/media-asset-card-storage-provider-tag.tsx");
const storageProviderTagSource = fs.readFileSync(storageProviderTagPath, "utf8");
const storageProviderTagLineCount = storageProviderTagSource.split(/\r?\n/).length;
const storageProviderTagTypesPath = path.resolve(process.cwd(), "components/media-asset-card-storage-provider-tag.types.ts");
const storageProviderTagTypesSource = fs.readFileSync(storageProviderTagTypesPath, "utf8");
const storageProviderTagTypesLineCount = storageProviderTagTypesSource.split(/\r?\n/).length;
const processingSourceTagPath = path.resolve(process.cwd(), "components/media-asset-card-processing-source-tag.tsx");
const processingSourceTagSource = fs.readFileSync(processingSourceTagPath, "utf8");
const processingSourceTagLineCount = processingSourceTagSource.split(/\r?\n/).length;
const processingSourceTagTypesPath = path.resolve(process.cwd(), "components/media-asset-card-processing-source-tag.types.ts");
const processingSourceTagTypesSource = fs.readFileSync(processingSourceTagTypesPath, "utf8");
const processingSourceTagTypesLineCount = processingSourceTagTypesSource.split(/\r?\n/).length;
const extractionModeTagPath = path.resolve(process.cwd(), "components/media-asset-card-extraction-mode-tag.tsx");
const extractionModeTagSource = fs.readFileSync(extractionModeTagPath, "utf8");
const extractionModeTagLineCount = extractionModeTagSource.split(/\r?\n/).length;
const extractionModeTagTypesPath = path.resolve(process.cwd(), "components/media-asset-card-extraction-mode-tag.types.ts");
const extractionModeTagTypesSource = fs.readFileSync(extractionModeTagTypesPath, "utf8");
const extractionModeTagTypesLineCount = extractionModeTagTypesSource.split(/\r?\n/).length;
const actionsPropsPath = path.resolve(process.cwd(), "components/media-asset-card-actions-props.ts");
const actionsPropsSource = fs.readFileSync(actionsPropsPath, "utf8");
const actionsPropsLineCount = actionsPropsSource.split(/\r?\n/).length;
const actionsPropsTypesPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-actions-props.types.ts",
);
const actionsPropsTypesSource = fs.readFileSync(actionsPropsTypesPath, "utf8");
const actionsPropsTypesLineCount = actionsPropsTypesSource.split(/\r?\n/).length;
const actionsPath = path.resolve(process.cwd(), "components/media-asset-card-actions.tsx");
const actionsSource = fs.readFileSync(actionsPath, "utf8");
const deleteButtonPath = path.resolve(process.cwd(), "components/media-asset-card-delete-button.tsx");
const deleteButtonSource = fs.readFileSync(deleteButtonPath, "utf8");
const deleteButtonLineCount = deleteButtonSource.split(/\r?\n/).length;
const deleteButtonTypesPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-delete-button.types.ts",
);
const deleteButtonTypesSource = fs.readFileSync(deleteButtonTypesPath, "utf8");
const deleteButtonTypesLineCount = deleteButtonTypesSource.split(/\r?\n/).length;
const downloadButtonPath = path.resolve(process.cwd(), "components/media-asset-card-download-button.tsx");
const downloadButtonSource = fs.readFileSync(downloadButtonPath, "utf8");
const downloadButtonLineCount = downloadButtonSource.split(/\r?\n/).length;
const downloadButtonTypesPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-download-button.types.ts",
);
const downloadButtonTypesSource = fs.readFileSync(downloadButtonTypesPath, "utf8");
const downloadButtonTypesLineCount = downloadButtonTypesSource.split(/\r?\n/).length;
const refreshButtonPath = path.resolve(process.cwd(), "components/media-asset-card-refresh-button.tsx");
const refreshButtonSource = fs.readFileSync(refreshButtonPath, "utf8");
const refreshButtonLineCount = refreshButtonSource.split(/\r?\n/).length;
const refreshButtonTypesPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-refresh-button.types.ts",
);
const refreshButtonTypesSource = fs.readFileSync(refreshButtonTypesPath, "utf8");
const refreshButtonTypesLineCount = refreshButtonTypesSource.split(/\r?\n/).length;
const retryButtonPath = path.resolve(process.cwd(), "components/media-asset-card-retry-button.tsx");
const retryButtonSource = fs.readFileSync(retryButtonPath, "utf8");
const retryButtonLineCount = retryButtonSource.split(/\r?\n/).length;
const retryButtonTypesPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-retry-button.types.ts",
);
const retryButtonTypesSource = fs.readFileSync(retryButtonTypesPath, "utf8");
const retryButtonTypesLineCount = retryButtonTypesSource.split(/\r?\n/).length;

if (!cardSource.includes('import { MediaAssetCardMetadata } from "./media-asset-card-metadata";')) {
  throw new Error("media-asset-card.tsx must import MediaAssetCardMetadata");
}

if (!cardSource.includes('import { buildMediaAssetCardMetadataProps } from "./media-asset-card-metadata-props";')) {
  throw new Error("media-asset-card.tsx must import delegated media metadata props builder");
}

if (!cardSource.includes('import { MediaAssetCardActions } from "./media-asset-card-actions";')) {
  throw new Error("media-asset-card.tsx must import MediaAssetCardActions");
}

if (!cardSource.includes('import { buildMediaAssetCardActionsProps } from "./media-asset-card-actions-props";')) {
  throw new Error("media-asset-card.tsx must import delegated media action props builder");
}

if (!cardSource.includes('import { MediaAssetCardPreview } from "./media-asset-card-preview";')) {
  throw new Error("media-asset-card.tsx must import MediaAssetCardPreview");
}

if (!cardSource.includes('import { buildMediaAssetCardPreviewProps } from "./media-asset-card-preview-props";')) {
  throw new Error("media-asset-card.tsx must import delegated media preview props builder");
}

if (!cardSource.includes('import type { MediaAssetCardProps } from "./media-asset-card.types";')) {
  throw new Error("media-asset-card.tsx must import MediaAssetCardProps");
}

if (!cardSource.includes("<MediaAssetCardMetadata")) {
  throw new Error("media-asset-card.tsx must delegate metadata rendering");
}

if (!cardSource.includes("buildMediaAssetCardMetadataProps({ asset, formatHistoryTimestampLabel, mediaIssueCopy })")) {
  throw new Error("media-asset-card.tsx must delegate media metadata prop assembly");
}

if (!cardSource.includes("<MediaAssetCardActions")) {
  throw new Error("media-asset-card.tsx must delegate action rendering");
}

if (!cardSource.includes("buildMediaAssetCardActionsProps({")) {
  throw new Error("media-asset-card.tsx must delegate media action prop assembly");
}

if (!cardSource.includes("<MediaAssetCardPreview")) {
  throw new Error("media-asset-card.tsx must delegate preview rendering");
}

if (!cardSource.includes("buildMediaAssetCardPreviewProps({ asset, authToken, workspaceId })")) {
  throw new Error("media-asset-card.tsx must delegate media preview prop assembly");
}

for (const forbiddenCardActionPropsToken of [
  "canWriteWorkspace={canWriteWorkspace}",
  "deletingMediaId={deletingMediaId}",
  "downloadingMediaId={downloadingMediaId}",
  "onDeleteMediaAsset={onDeleteMediaAsset}",
  "onDownloadMedia={onDownloadMedia}",
  "onRefreshMedia={onRefreshMedia}",
  "onRetryMediaProcessing={onRetryMediaProcessing}",
  "refreshingMediaId={refreshingMediaId}",
  "retryingMediaId={retryingMediaId}",
]) {
  if (cardSource.includes(forbiddenCardActionPropsToken)) {
    throw new Error(
      `media-asset-card.tsx must keep media action prop assembly delegated: ${forbiddenCardActionPropsToken}`,
    );
  }
}

for (const forbiddenCardPreviewPropsToken of [
  "authToken={authToken}",
  "workspaceId={workspaceId}",
]) {
  if (cardSource.includes(forbiddenCardPreviewPropsToken)) {
    throw new Error(
      `media-asset-card.tsx must keep media preview prop assembly delegated: ${forbiddenCardPreviewPropsToken}`,
    );
  }
}

for (const forbiddenCardMetadataPropsToken of [
  "formatHistoryTimestampLabel={formatHistoryTimestampLabel}",
  "mediaIssueCopy={mediaIssueCopy}",
]) {
  if (cardSource.includes(forbiddenCardMetadataPropsToken)) {
    throw new Error(
      `media-asset-card.tsx must keep media metadata prop assembly delegated: ${forbiddenCardMetadataPropsToken}`,
    );
  }
}

for (const requiredMetadataPropsUsage of [
  'import type { MediaAssetCardMetadataProps } from "./media-asset-card-metadata.types";',
  'import type { BuildMediaAssetCardMetadataPropsInput } from "./media-asset-card-metadata-props.types";',
  "}: BuildMediaAssetCardMetadataPropsInput): MediaAssetCardMetadataProps {",
  "return { asset, formatHistoryTimestampLabel, mediaIssueCopy };",
]) {
  if (!metadataPropsSource.includes(requiredMetadataPropsUsage)) {
    throw new Error(
      `media-asset-card-metadata-props.ts must own media metadata prop assembly: ${requiredMetadataPropsUsage}`,
    );
  }
}

for (const forbiddenMetadataPropsToken of [
  "<MediaAssetCardMetadata",
  "<MediaAssetCardActions",
  "<MediaAssetCardPreview",
]) {
  if (metadataPropsSource.includes(forbiddenMetadataPropsToken)) {
    throw new Error(
      `media-asset-card-metadata-props.ts must keep render concerns delegated: ${forbiddenMetadataPropsToken}`,
    );
  }
}

if (metadataPropsLineCount > 4) {
  throw new Error(`media-asset-card-metadata-props.ts exceeded 4 lines: ${metadataPropsLineCount}`);
}

for (const requiredMetadataPropsTypesUsage of [
  'import type { MediaAssetCardProps } from "./media-asset-card.types"; export type BuildMediaAssetCardMetadataPropsInput = Pick<MediaAssetCardProps, "asset" | "formatHistoryTimestampLabel" | "mediaIssueCopy">;',
]) {
  if (!metadataPropsTypesSource.includes(requiredMetadataPropsTypesUsage)) {
    throw new Error(
      `media-asset-card-metadata-props.types.ts must own media metadata prop input typing: ${requiredMetadataPropsTypesUsage}`,
    );
  }
}

if (metadataPropsTypesLineCount > 2) {
  throw new Error(
    `media-asset-card-metadata-props.types.ts exceeded 2 lines: ${metadataPropsTypesLineCount}`,
  );
}

for (const requiredPreviewPropsUsage of [
  'import type { MediaAssetCardPreviewProps } from "./media-asset-card-preview.types";',
  'import type { BuildMediaAssetCardPreviewPropsInput } from "./media-asset-card-preview-props.types";',
  "}: BuildMediaAssetCardPreviewPropsInput): MediaAssetCardPreviewProps {",
  "return { asset, authToken, workspaceId };",
]) {
  if (!previewPropsSource.includes(requiredPreviewPropsUsage)) {
    throw new Error(
      `media-asset-card-preview-props.ts must own media preview prop assembly: ${requiredPreviewPropsUsage}`,
    );
  }
}

for (const forbiddenPreviewPropsToken of [
  "<MediaAssetCardPreview",
  "<MediaAssetCardMetadata",
  "<MediaAssetCardActions",
]) {
  if (previewPropsSource.includes(forbiddenPreviewPropsToken)) {
    throw new Error(
      `media-asset-card-preview-props.ts must keep render concerns delegated: ${forbiddenPreviewPropsToken}`,
    );
  }
}

if (previewPropsLineCount > 4) {
  throw new Error(`media-asset-card-preview-props.ts exceeded 4 lines: ${previewPropsLineCount}`);
}

for (const requiredPreviewPropsTypesUsage of [
  'import type { MediaAssetCardProps } from "./media-asset-card.types"; export type BuildMediaAssetCardPreviewPropsInput = Pick<MediaAssetCardProps, "asset" | "authToken" | "workspaceId">;',
]) {
  if (!previewPropsTypesSource.includes(requiredPreviewPropsTypesUsage)) {
    throw new Error(
      `media-asset-card-preview-props.types.ts must own media preview prop input typing: ${requiredPreviewPropsTypesUsage}`,
    );
  }
}

if (previewPropsTypesLineCount > 2) {
  throw new Error(
    `media-asset-card-preview-props.types.ts exceeded 2 lines: ${previewPropsTypesLineCount}`,
  );
}

for (const requiredActionsPropsUsage of [
  'import type { MediaAssetCardActionsProps } from "./media-asset-card-actions.types";',
  'import type { BuildMediaAssetCardActionsPropsInput } from "./media-asset-card-actions-props.types";',
  "}: BuildMediaAssetCardActionsPropsInput): MediaAssetCardActionsProps {",
  "return { asset, canWriteWorkspace, deletingMediaId, downloadingMediaId, mediaIssueCopy, onDeleteMediaAsset, onDownloadMedia, onRefreshMedia, onRetryMediaProcessing, refreshingMediaId, retryingMediaId };",
]) {
  if (!actionsPropsSource.includes(requiredActionsPropsUsage)) {
    throw new Error(
      `media-asset-card-actions-props.ts must own media action prop assembly: ${requiredActionsPropsUsage}`,
    );
  }
}

for (const forbiddenActionsPropsToken of [
  "<MediaAssetCardActions",
  "<MediaAssetCardPreview",
  "<MediaAssetCardMetadata",
]) {
  if (actionsPropsSource.includes(forbiddenActionsPropsToken)) {
    throw new Error(
      `media-asset-card-actions-props.ts must keep render concerns delegated: ${forbiddenActionsPropsToken}`,
    );
  }
}

if (actionsPropsLineCount > 4) {
  throw new Error(`media-asset-card-actions-props.ts exceeded 4 lines: ${actionsPropsLineCount}`);
}

for (const requiredActionsPropsTypesUsage of [
  'import type { MediaAssetCardProps } from "./media-asset-card.types"; export type BuildMediaAssetCardActionsPropsInput = Pick<MediaAssetCardProps, "asset" | "canWriteWorkspace" | "deletingMediaId" | "downloadingMediaId" | "mediaIssueCopy" | "onDeleteMediaAsset" | "onDownloadMedia" | "onRefreshMedia" | "onRetryMediaProcessing" | "refreshingMediaId" | "retryingMediaId">;',
]) {
  if (!actionsPropsTypesSource.includes(requiredActionsPropsTypesUsage)) {
    throw new Error(
      `media-asset-card-actions-props.types.ts must own media action prop input typing: ${requiredActionsPropsTypesUsage}`,
    );
  }
}

if (actionsPropsTypesLineCount > 2) {
  throw new Error(
    `media-asset-card-actions-props.types.ts exceeded 2 lines: ${actionsPropsTypesLineCount}`,
  );
}

if (!metadataSource.includes('import { buildMediaAssetCardMetadataDetailsProps } from "./media-asset-card-metadata-details-props";')) {
  throw new Error("media-asset-card-metadata.tsx must import delegated metadata details props builder");
}

if (!metadataSource.includes("buildMediaAssetCardMetadataDetailsProps({ asset, formatHistoryTimestampLabel, mediaIssueCopy })")) {
  throw new Error("media-asset-card-metadata.tsx must delegate metadata details prop assembly");
}

for (const forbiddenMetadataToken of [
  'readMediaAssetCardMetadataDetailTiming({ asset })',
  "lastAttemptAt",
  "nextRetryAt",
]) {
  if (metadataSource.includes(forbiddenMetadataToken)) {
    throw new Error(
      `media-asset-card-metadata.tsx must keep metadata details prop assembly delegated: ${forbiddenMetadataToken}`,
    );
  }
}

for (const requiredMetadataDetailTimingUsage of [
  'import { readMetadataText } from "../lib/record-panel-media";',
  'import type { ReadMediaAssetCardMetadataDetailTimingInput } from "./media-asset-card-metadata-detail-timing.types";',
  "}: ReadMediaAssetCardMetadataDetailTimingInput) {",
  'readMetadataText(asset.metadata_json, "processing_last_attempt_at")',
  'readMetadataText(asset.metadata_json, "processing_retry_next_attempt_at")',
]) {
  if (!metadataDetailTimingSource.includes(requiredMetadataDetailTimingUsage)) {
    throw new Error(
      `media-asset-card-metadata-detail-timing.ts must own metadata detail timing extraction: ${requiredMetadataDetailTimingUsage}`,
    );
  }
}

for (const forbiddenMetadataDetailTimingToken of [
  "<MediaAssetCardMetadataDetails",
  "<MediaAssetCardMetadataTags",
]) {
  if (metadataDetailTimingSource.includes(forbiddenMetadataDetailTimingToken)) {
    throw new Error(
      `media-asset-card-metadata-detail-timing.ts must keep render concerns delegated: ${forbiddenMetadataDetailTimingToken}`,
    );
  }
}

if (metadataDetailTimingLineCount > 4) {
  throw new Error(
    `media-asset-card-metadata-detail-timing.ts exceeded 4 lines: ${metadataDetailTimingLineCount}`,
  );
}

for (const requiredMetadataDetailTimingTypesUsage of [
  'import type { MediaAssetCardMetadataProps } from "./media-asset-card-metadata.types"; export type ReadMediaAssetCardMetadataDetailTimingInput = Pick<MediaAssetCardMetadataProps, "asset">;',
]) {
  if (!metadataDetailTimingTypesSource.includes(requiredMetadataDetailTimingTypesUsage)) {
    throw new Error(
      `media-asset-card-metadata-detail-timing.types.ts must own metadata detail timing input typing: ${requiredMetadataDetailTimingTypesUsage}`,
    );
  }
}

if (metadataDetailTimingTypesLineCount > 2) {
  throw new Error(
    `media-asset-card-metadata-detail-timing.types.ts exceeded 2 lines: ${metadataDetailTimingTypesLineCount}`,
  );
}

for (const requiredMetadataDetailsPropsUsage of [
  'import { readMediaAssetCardMetadataDetailTiming } from "./media-asset-card-metadata-detail-timing";',
  'import type { MediaAssetCardMetadataDetailsProps } from "./media-asset-card-metadata-details.types";',
  'import type { BuildMediaAssetCardMetadataDetailsPropsInput } from "./media-asset-card-metadata-details-props.types";',
  "}: BuildMediaAssetCardMetadataDetailsPropsInput): MediaAssetCardMetadataDetailsProps {",
  "readMediaAssetCardMetadataDetailTiming({ asset })",
  "return { asset, formatHistoryTimestampLabel, lastAttemptAt, mediaIssueCopy, nextRetryAt };",
]) {
  if (!metadataDetailsPropsSource.includes(requiredMetadataDetailsPropsUsage)) {
    throw new Error(
      `media-asset-card-metadata-details-props.ts must own metadata details prop assembly: ${requiredMetadataDetailsPropsUsage}`,
    );
  }
}

for (const forbiddenMetadataDetailsPropsToken of [
  "<MediaAssetCardMetadataDetails",
  "<MediaAssetCardMetadataTags",
]) {
  if (metadataDetailsPropsSource.includes(forbiddenMetadataDetailsPropsToken)) {
    throw new Error(
      `media-asset-card-metadata-details-props.ts must keep render concerns delegated: ${forbiddenMetadataDetailsPropsToken}`,
    );
  }
}

if (metadataDetailsPropsLineCount > 5) {
  throw new Error(
    `media-asset-card-metadata-details-props.ts exceeded 5 lines: ${metadataDetailsPropsLineCount}`,
  );
}

for (const requiredMetadataDetailsPropsTypesUsage of [
  'import type { MediaAssetCardMetadataProps } from "./media-asset-card-metadata.types"; export type BuildMediaAssetCardMetadataDetailsPropsInput = MediaAssetCardMetadataProps;',
]) {
  if (!metadataDetailsPropsTypesSource.includes(requiredMetadataDetailsPropsTypesUsage)) {
    throw new Error(
      `media-asset-card-metadata-details-props.types.ts must own metadata details prop input typing: ${requiredMetadataDetailsPropsTypesUsage}`,
    );
  }
}

if (metadataDetailsPropsTypesLineCount > 2) {
  throw new Error(
    `media-asset-card-metadata-details-props.types.ts exceeded 2 lines: ${metadataDetailsPropsTypesLineCount}`,
  );
}

for (const requiredMetadataTagsUsage of [
  'import { MediaAssetCardFileExtensionTag } from "./media-asset-card-file-extension-tag";',
  'import { MediaAssetCardExtractionModeTag } from "./media-asset-card-extraction-mode-tag";',
  'import { readMediaAssetCardMetadataTagValues } from "./media-asset-card-metadata-tag-values";',
  'import { MediaAssetCardProcessingStatusTag } from "./media-asset-card-processing-status-tag";',
  'import { MediaAssetCardProcessingSourceTag } from "./media-asset-card-processing-source-tag";',
  'import { MediaAssetCardRemoteFetchTag } from "./media-asset-card-remote-fetch-tag";',
  'import { MediaAssetCardRetryCountTag } from "./media-asset-card-retry-count-tag";',
  'import { MediaAssetCardRetryStateTag } from "./media-asset-card-retry-state-tag";',
  'import { MediaAssetCardSizeTag } from "./media-asset-card-size-tag";',
  'import { MediaAssetCardStorageProviderTag } from "./media-asset-card-storage-provider-tag";',
  'import type { MediaAssetCardMetadataTagsProps } from "./media-asset-card-metadata-tags.types";',
  "}: MediaAssetCardMetadataTagsProps) {",
  "readMediaAssetCardMetadataTagValues({ asset })",
  "<MediaAssetCardProcessingStatusTag asset={asset} locale={locale} />",
  "<MediaAssetCardRemoteFetchTag locale={locale} mediaIssueCopy={mediaIssueCopy} remoteFetchStatus={remoteFetchStatus} />",
  "<MediaAssetCardRetryCountTag mediaIssueCopy={mediaIssueCopy} retryCount={retryCount} retryMaxAttempts={retryMaxAttempts} />",
  "<MediaAssetCardRetryStateTag locale={locale} mediaIssueCopy={mediaIssueCopy} retryState={retryState} />",
  "<MediaAssetCardFileExtensionTag asset={asset} />",
  "<MediaAssetCardExtractionModeTag extractionMode={extractionMode} />",
  "<MediaAssetCardProcessingSourceTag processingSource={processingSource} />",
  "<MediaAssetCardSizeTag asset={asset} />",
  "<MediaAssetCardStorageProviderTag asset={asset} locale={locale} />",
]) {
  if (!metadataTagsSource.includes(requiredMetadataTagsUsage)) {
    throw new Error(`media-asset-card-metadata-tags.tsx must delegate remote-fetch tag rendering: ${requiredMetadataTagsUsage}`);
  }
}

for (const forbiddenMetadataTagsToken of [
  "{mediaIssueCopy.fetchPrefix} {getRemoteFetchStatusLabel(locale, remoteFetchStatus)}",
  '{mediaIssueCopy.retryStatePrefix} {getRetryStateLabel(locale, retryState)}',
  '{mediaIssueCopy.retries} {retryCount}',
  '`/${retryMaxAttempts}`',
  "asset.metadata_json.file_extension",
  "getProcessingStatusLabel(locale, asset.processing_status)",
  "getStorageProviderLabel(locale, asset.storage_provider)",
  "formatMediaSize(asset)",
  '{processingSource ? <span className="tag">{processingSource}</span> : null}',
  '{extractionMode ? <span className="tag">{extractionMode}</span> : null}',
  'readMetadataText(asset.metadata_json, "remote_fetch_status")',
  'readMetadataNumber(asset.metadata_json, "processing_retry_count")',
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

for (const requiredMetadataTagValuesUsage of [
  'import { readMetadataNumber, readMetadataText } from "../lib/record-panel-media";',
  'import type { ReadMediaAssetCardMetadataTagValuesInput } from "./media-asset-card-metadata-tag-values.types";',
  "}: ReadMediaAssetCardMetadataTagValuesInput) {",
  'readMetadataText(asset.metadata_json, "remote_fetch_status")',
  'readMetadataNumber(asset.metadata_json, "processing_retry_count")',
]) {
  if (!metadataTagValuesSource.includes(requiredMetadataTagValuesUsage)) {
    throw new Error(
      `media-asset-card-metadata-tag-values.ts must own metadata tag value extraction: ${requiredMetadataTagValuesUsage}`,
    );
  }
}

for (const forbiddenMetadataTagValuesToken of [
  "useStoredLocale(",
  "<MediaAssetCardRemoteFetchTag",
  "<MediaAssetCardRetryCountTag",
]) {
  if (metadataTagValuesSource.includes(forbiddenMetadataTagValuesToken)) {
    throw new Error(
      `media-asset-card-metadata-tag-values.ts must keep render concerns delegated: ${forbiddenMetadataTagValuesToken}`,
    );
  }
}

if (metadataTagValuesLineCount > 4) {
  throw new Error(
    `media-asset-card-metadata-tag-values.ts exceeded 4 lines: ${metadataTagValuesLineCount}`,
  );
}

for (const requiredMetadataTagValuesTypesUsage of [
  'import type { MediaAssetCardMetadataTagsProps } from "./media-asset-card-metadata-tags.types"; export type ReadMediaAssetCardMetadataTagValuesInput = Pick<MediaAssetCardMetadataTagsProps, "asset">;',
]) {
  if (!metadataTagValuesTypesSource.includes(requiredMetadataTagValuesTypesUsage)) {
    throw new Error(
      `media-asset-card-metadata-tag-values.types.ts must own metadata tag value input typing: ${requiredMetadataTagValuesTypesUsage}`,
    );
  }
}

if (metadataTagValuesTypesLineCount > 2) {
  throw new Error(
    `media-asset-card-metadata-tag-values.types.ts exceeded 2 lines: ${metadataTagValuesTypesLineCount}`,
  );
}

for (const requiredLastAttemptDetailUsage of [
  'import type { MediaAssetCardLastAttemptDetailProps } from "./media-asset-card-last-attempt-detail.types";',
  "}: MediaAssetCardLastAttemptDetailProps) {",
  "{mediaIssueCopy.lastAttempt}",
  "{formatHistoryTimestampLabel(lastAttemptAt)}",
]) {
  if (!lastAttemptDetailSource.includes(requiredLastAttemptDetailUsage)) {
    throw new Error(`media-asset-card-last-attempt-detail.tsx must own last-attempt detail rendering: ${requiredLastAttemptDetailUsage}`);
  }
}

for (const forbiddenLastAttemptDetailToken of [
  "{mediaIssueCopy.nextRetry}",
  "{mediaIssueCopy.textChars}",
  "{mediaIssueCopy.dimensions}",
]) {
  if (lastAttemptDetailSource.includes(forbiddenLastAttemptDetailToken)) {
    throw new Error(`media-asset-card-last-attempt-detail.tsx must keep other detail concerns delegated: ${forbiddenLastAttemptDetailToken}`);
  }
}

if (lastAttemptDetailLineCount > 6) {
  throw new Error(`media-asset-card-last-attempt-detail.tsx exceeded 6 lines: ${lastAttemptDetailLineCount}`);
}

for (const requiredLastAttemptDetailTypesUsage of [
  'import type { MediaAssetCardMetadataDetailsProps } from "./media-asset-card-metadata-details.types"; export type MediaAssetCardLastAttemptDetailProps = Pick<MediaAssetCardMetadataDetailsProps, "formatHistoryTimestampLabel" | "lastAttemptAt" | "mediaIssueCopy">;',
]) {
  if (!lastAttemptDetailTypesSource.includes(requiredLastAttemptDetailTypesUsage)) {
    throw new Error(`media-asset-card-last-attempt-detail.types.ts must own last-attempt detail props: ${requiredLastAttemptDetailTypesUsage}`);
  }
}

if (lastAttemptDetailTypesLineCount > 2) {
  throw new Error(`media-asset-card-last-attempt-detail.types.ts exceeded 2 lines: ${lastAttemptDetailTypesLineCount}`);
}

for (const requiredDimensionsDetailUsage of [
  'import type { MediaAssetCardDimensionsDetailProps } from "./media-asset-card-dimensions-detail.types";',
  "}: MediaAssetCardDimensionsDetailProps) {",
  "{mediaIssueCopy.dimensions}",
  "{asset.metadata_json.width} x {asset.metadata_json.height}",
]) {
  if (!dimensionsDetailSource.includes(requiredDimensionsDetailUsage)) {
    throw new Error(`media-asset-card-dimensions-detail.tsx must own dimensions detail rendering: ${requiredDimensionsDetailUsage}`);
  }
}

for (const forbiddenDimensionsDetailToken of [
  "{mediaIssueCopy.textChars}",
  "{mediaIssueCopy.textLines}",
  "{mediaIssueCopy.nextRetry}",
]) {
  if (dimensionsDetailSource.includes(forbiddenDimensionsDetailToken)) {
    throw new Error(`media-asset-card-dimensions-detail.tsx must keep other detail concerns delegated: ${forbiddenDimensionsDetailToken}`);
  }
}

if (dimensionsDetailLineCount > 6) {
  throw new Error(`media-asset-card-dimensions-detail.tsx exceeded 6 lines: ${dimensionsDetailLineCount}`);
}

for (const requiredDimensionsDetailTypesUsage of [
  'import type { MediaAssetCardMetadataDetailsProps } from "./media-asset-card-metadata-details.types"; export type MediaAssetCardDimensionsDetailProps = Pick<MediaAssetCardMetadataDetailsProps, "asset" | "mediaIssueCopy">;',
]) {
  if (!dimensionsDetailTypesSource.includes(requiredDimensionsDetailTypesUsage)) {
    throw new Error(`media-asset-card-dimensions-detail.types.ts must own dimensions detail props: ${requiredDimensionsDetailTypesUsage}`);
  }
}

if (dimensionsDetailTypesLineCount > 2) {
  throw new Error(`media-asset-card-dimensions-detail.types.ts exceeded 2 lines: ${dimensionsDetailTypesLineCount}`);
}

for (const requiredTextCharCountDetailUsage of [
  'import type { MediaAssetCardTextCharCountDetailProps } from "./media-asset-card-text-char-count-detail.types";',
  "}: MediaAssetCardTextCharCountDetailProps) {",
  "{mediaIssueCopy.textChars}",
  "{asset.metadata_json.text_char_count}",
]) {
  if (!textCharCountDetailSource.includes(requiredTextCharCountDetailUsage)) {
    throw new Error(`media-asset-card-text-char-count-detail.tsx must own text-char-count detail rendering: ${requiredTextCharCountDetailUsage}`);
  }
}

for (const forbiddenTextCharCountDetailToken of [
  "{mediaIssueCopy.textLines}",
  "{mediaIssueCopy.dimensions}",
  "{mediaIssueCopy.nextRetry}",
]) {
  if (textCharCountDetailSource.includes(forbiddenTextCharCountDetailToken)) {
    throw new Error(`media-asset-card-text-char-count-detail.tsx must keep other detail concerns delegated: ${forbiddenTextCharCountDetailToken}`);
  }
}

if (textCharCountDetailLineCount > 6) {
  throw new Error(`media-asset-card-text-char-count-detail.tsx exceeded 6 lines: ${textCharCountDetailLineCount}`);
}

for (const requiredTextCharCountDetailTypesUsage of [
  'import type { MediaAssetCardMetadataDetailsProps } from "./media-asset-card-metadata-details.types"; export type MediaAssetCardTextCharCountDetailProps = Pick<MediaAssetCardMetadataDetailsProps, "asset" | "mediaIssueCopy">;',
]) {
  if (!textCharCountDetailTypesSource.includes(requiredTextCharCountDetailTypesUsage)) {
    throw new Error(`media-asset-card-text-char-count-detail.types.ts must own text-char-count detail props: ${requiredTextCharCountDetailTypesUsage}`);
  }
}

if (textCharCountDetailTypesLineCount > 2) {
  throw new Error(`media-asset-card-text-char-count-detail.types.ts exceeded 2 lines: ${textCharCountDetailTypesLineCount}`);
}

for (const requiredTextLineCountDetailUsage of [
  'import type { MediaAssetCardTextLineCountDetailProps } from "./media-asset-card-text-line-count-detail.types";',
  "}: MediaAssetCardTextLineCountDetailProps) {",
  "{mediaIssueCopy.textLines}",
  "{asset.metadata_json.text_line_count}",
]) {
  if (!textLineCountDetailSource.includes(requiredTextLineCountDetailUsage)) {
    throw new Error(`media-asset-card-text-line-count-detail.tsx must own text-line-count detail rendering: ${requiredTextLineCountDetailUsage}`);
  }
}

for (const forbiddenTextLineCountDetailToken of [
  "{mediaIssueCopy.textChars}",
  "{mediaIssueCopy.dimensions}",
  "{mediaIssueCopy.nextRetry}",
]) {
  if (textLineCountDetailSource.includes(forbiddenTextLineCountDetailToken)) {
    throw new Error(`media-asset-card-text-line-count-detail.tsx must keep other detail concerns delegated: ${forbiddenTextLineCountDetailToken}`);
  }
}

if (textLineCountDetailLineCount > 6) {
  throw new Error(`media-asset-card-text-line-count-detail.tsx exceeded 6 lines: ${textLineCountDetailLineCount}`);
}

for (const requiredTextLineCountDetailTypesUsage of [
  'import type { MediaAssetCardMetadataDetailsProps } from "./media-asset-card-metadata-details.types"; export type MediaAssetCardTextLineCountDetailProps = Pick<MediaAssetCardMetadataDetailsProps, "asset" | "mediaIssueCopy">;',
]) {
  if (!textLineCountDetailTypesSource.includes(requiredTextLineCountDetailTypesUsage)) {
    throw new Error(`media-asset-card-text-line-count-detail.types.ts must own text-line-count detail props: ${requiredTextLineCountDetailTypesUsage}`);
  }
}

if (textLineCountDetailTypesLineCount > 2) {
  throw new Error(`media-asset-card-text-line-count-detail.types.ts exceeded 2 lines: ${textLineCountDetailTypesLineCount}`);
}

for (const requiredNextRetryDetailUsage of [
  'import type { MediaAssetCardNextRetryDetailProps } from "./media-asset-card-next-retry-detail.types";',
  "}: MediaAssetCardNextRetryDetailProps) {",
  "{mediaIssueCopy.nextRetry}",
  "{formatHistoryTimestampLabel(nextRetryAt)}",
]) {
  if (!nextRetryDetailSource.includes(requiredNextRetryDetailUsage)) {
    throw new Error(`media-asset-card-next-retry-detail.tsx must own next-retry detail rendering: ${requiredNextRetryDetailUsage}`);
  }
}

for (const forbiddenNextRetryDetailToken of [
  "{mediaIssueCopy.lastAttempt}",
  "{mediaIssueCopy.textChars}",
  "{mediaIssueCopy.dimensions}",
]) {
  if (nextRetryDetailSource.includes(forbiddenNextRetryDetailToken)) {
    throw new Error(`media-asset-card-next-retry-detail.tsx must keep other detail concerns delegated: ${forbiddenNextRetryDetailToken}`);
  }
}

if (nextRetryDetailLineCount > 6) {
  throw new Error(`media-asset-card-next-retry-detail.tsx exceeded 6 lines: ${nextRetryDetailLineCount}`);
}

for (const requiredNextRetryDetailTypesUsage of [
  'import type { MediaAssetCardMetadataDetailsProps } from "./media-asset-card-metadata-details.types"; export type MediaAssetCardNextRetryDetailProps = Pick<MediaAssetCardMetadataDetailsProps, "formatHistoryTimestampLabel" | "mediaIssueCopy" | "nextRetryAt">;',
]) {
  if (!nextRetryDetailTypesSource.includes(requiredNextRetryDetailTypesUsage)) {
    throw new Error(`media-asset-card-next-retry-detail.types.ts must own next-retry detail props: ${requiredNextRetryDetailTypesUsage}`);
  }
}

if (nextRetryDetailTypesLineCount > 2) {
  throw new Error(`media-asset-card-next-retry-detail.types.ts exceeded 2 lines: ${nextRetryDetailTypesLineCount}`);
}

for (const requiredMetadataDetailsUsage of [
  'import { MediaAssetCardDimensionsDetail } from "./media-asset-card-dimensions-detail";',
  'import { MediaAssetCardLastAttemptDetail } from "./media-asset-card-last-attempt-detail";',
  'import { MediaAssetCardNextRetryDetail } from "./media-asset-card-next-retry-detail";',
  'import { MediaAssetCardTextCharCountDetail } from "./media-asset-card-text-char-count-detail";',
  'import { MediaAssetCardTextLineCountDetail } from "./media-asset-card-text-line-count-detail";',
  'import type { MediaAssetCardMetadataDetailsProps } from "./media-asset-card-metadata-details.types";',
  "}: MediaAssetCardMetadataDetailsProps) {",
  '<div className="detail-grid" style={{ marginTop: 12 }}>',
  "<MediaAssetCardDimensionsDetail asset={asset} mediaIssueCopy={mediaIssueCopy} />",
  "<MediaAssetCardLastAttemptDetail formatHistoryTimestampLabel={formatHistoryTimestampLabel} lastAttemptAt={lastAttemptAt} mediaIssueCopy={mediaIssueCopy} />",
  "<MediaAssetCardNextRetryDetail formatHistoryTimestampLabel={formatHistoryTimestampLabel} mediaIssueCopy={mediaIssueCopy} nextRetryAt={nextRetryAt} />",
  "<MediaAssetCardTextCharCountDetail asset={asset} mediaIssueCopy={mediaIssueCopy} />",
  "<MediaAssetCardTextLineCountDetail asset={asset} mediaIssueCopy={mediaIssueCopy} />",
]) {
  if (!metadataDetailsSource.includes(requiredMetadataDetailsUsage)) {
    throw new Error(`media-asset-card-metadata-details.tsx must reuse the extracted metadata-details props type: ${requiredMetadataDetailsUsage}`);
  }
}

for (const forbiddenMetadataDetailsToken of [
  '{typeof asset.metadata_json.width === "number" && typeof asset.metadata_json.height === "number" ? <div className="subtle-card"><div className="eyebrow">{mediaIssueCopy.dimensions}</div><div style={{ marginTop: 8, fontWeight: 600 }}>{asset.metadata_json.width} x {asset.metadata_json.height}</div></div> : null}',
  '{typeof asset.metadata_json.text_char_count === "number" ? <div className="subtle-card"><div className="eyebrow">{mediaIssueCopy.textChars}</div><div style={{ marginTop: 8, fontWeight: 600 }}>{asset.metadata_json.text_char_count}</div></div> : null}',
  '{typeof asset.metadata_json.text_line_count === "number" ? <div className="subtle-card"><div className="eyebrow">{mediaIssueCopy.textLines}</div><div style={{ marginTop: 8, fontWeight: 600 }}>{asset.metadata_json.text_line_count}</div></div> : null}',
  '{lastAttemptAt ? <div className="subtle-card"><div className="eyebrow">{mediaIssueCopy.lastAttempt}</div><div style={{ marginTop: 8, fontWeight: 600 }}>{formatHistoryTimestampLabel(lastAttemptAt)}</div></div> : null}',
  '{nextRetryAt ? <div className="subtle-card"><div className="eyebrow">{mediaIssueCopy.nextRetry}</div><div style={{ marginTop: 8, fontWeight: 600 }}>{formatHistoryTimestampLabel(nextRetryAt)}</div></div> : null}',
]) {
  if (metadataDetailsSource.includes(forbiddenMetadataDetailsToken)) {
    throw new Error(`media-asset-card-metadata-details.tsx must keep last-attempt rendering delegated: ${forbiddenMetadataDetailsToken}`);
  }
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

for (const requiredRetryCountTagUsage of [
  'import type { MediaAssetCardRetryCountTagProps } from "./media-asset-card-retry-count-tag.types";',
  "}: MediaAssetCardRetryCountTagProps) {",
  "{mediaIssueCopy.retries} {retryCount}",
  "`/${retryMaxAttempts}`",
]) {
  if (!retryCountTagSource.includes(requiredRetryCountTagUsage)) {
    throw new Error(`media-asset-card-retry-count-tag.tsx must own retry-count tag rendering: ${requiredRetryCountTagUsage}`);
  }
}

for (const forbiddenRetryCountTagToken of [
  "getStorageProviderLabel(locale, asset.storage_provider)",
  "formatMediaSize(asset)",
  "getRetryStateLabel(locale, retryState)",
]) {
  if (retryCountTagSource.includes(forbiddenRetryCountTagToken)) {
    throw new Error(`media-asset-card-retry-count-tag.tsx must keep other tag concerns delegated: ${forbiddenRetryCountTagToken}`);
  }
}

if (retryCountTagLineCount > 6) {
  throw new Error(`media-asset-card-retry-count-tag.tsx exceeded 6 lines: ${retryCountTagLineCount}`);
}

for (const requiredRetryCountTagTypesUsage of [
  'import type { MediaAssetCardMetadataTagsProps } from "./media-asset-card-metadata-tags.types"; export type MediaAssetCardRetryCountTagProps = Pick<MediaAssetCardMetadataTagsProps, "mediaIssueCopy"> & { retryCount: number | null; retryMaxAttempts: number | null };',
]) {
  if (!retryCountTagTypesSource.includes(requiredRetryCountTagTypesUsage)) {
    throw new Error(`media-asset-card-retry-count-tag.types.ts must own retry-count tag props: ${requiredRetryCountTagTypesUsage}`);
  }
}

if (retryCountTagTypesLineCount > 2) {
  throw new Error(`media-asset-card-retry-count-tag.types.ts exceeded 2 lines: ${retryCountTagTypesLineCount}`);
}

for (const requiredFileExtensionTagUsage of [
  'import type { MediaAssetCardFileExtensionTagProps } from "./media-asset-card-file-extension-tag.types";',
  "}: MediaAssetCardFileExtensionTagProps) {",
  "asset.metadata_json.file_extension",
  "{String(asset.metadata_json.file_extension)}",
]) {
  if (!fileExtensionTagSource.includes(requiredFileExtensionTagUsage)) {
    throw new Error(`media-asset-card-file-extension-tag.tsx must own file-extension tag rendering: ${requiredFileExtensionTagUsage}`);
  }
}

for (const forbiddenFileExtensionTagToken of [
  "getStorageProviderLabel(locale, asset.storage_provider)",
  "formatMediaSize(asset)",
  "getRetryStateLabel(locale, retryState)",
]) {
  if (fileExtensionTagSource.includes(forbiddenFileExtensionTagToken)) {
    throw new Error(`media-asset-card-file-extension-tag.tsx must keep other tag concerns delegated: ${forbiddenFileExtensionTagToken}`);
  }
}

if (fileExtensionTagLineCount > 6) {
  throw new Error(`media-asset-card-file-extension-tag.tsx exceeded 6 lines: ${fileExtensionTagLineCount}`);
}

for (const requiredFileExtensionTagTypesUsage of [
  'import type { MediaAssetCardMetadataTagsProps } from "./media-asset-card-metadata-tags.types"; export type MediaAssetCardFileExtensionTagProps = Pick<MediaAssetCardMetadataTagsProps, "asset">;',
]) {
  if (!fileExtensionTagTypesSource.includes(requiredFileExtensionTagTypesUsage)) {
    throw new Error(`media-asset-card-file-extension-tag.types.ts must own file-extension tag props: ${requiredFileExtensionTagTypesUsage}`);
  }
}

if (fileExtensionTagTypesLineCount > 2) {
  throw new Error(`media-asset-card-file-extension-tag.types.ts exceeded 2 lines: ${fileExtensionTagTypesLineCount}`);
}

for (const requiredSizeTagUsage of [
  'import { formatMediaSize } from "../lib/record-panel-format";',
  'import type { MediaAssetCardSizeTagProps } from "./media-asset-card-size-tag.types";',
  "}: MediaAssetCardSizeTagProps) {",
  "{formatMediaSize(asset)}",
]) {
  if (!sizeTagSource.includes(requiredSizeTagUsage)) {
    throw new Error(`media-asset-card-size-tag.tsx must own size tag rendering: ${requiredSizeTagUsage}`);
  }
}

for (const forbiddenSizeTagToken of [
  "getStorageProviderLabel(locale, asset.storage_provider)",
  "getRetryStateLabel(locale, retryState)",
  "getRemoteFetchStatusLabel(locale, remoteFetchStatus)",
]) {
  if (sizeTagSource.includes(forbiddenSizeTagToken)) {
    throw new Error(`media-asset-card-size-tag.tsx must keep other tag concerns delegated: ${forbiddenSizeTagToken}`);
  }
}

if (sizeTagLineCount > 6) {
  throw new Error(`media-asset-card-size-tag.tsx exceeded 6 lines: ${sizeTagLineCount}`);
}

for (const requiredSizeTagTypesUsage of [
  'import type { MediaAssetCardMetadataTagsProps } from "./media-asset-card-metadata-tags.types"; export type MediaAssetCardSizeTagProps = Pick<MediaAssetCardMetadataTagsProps, "asset">;',
]) {
  if (!sizeTagTypesSource.includes(requiredSizeTagTypesUsage)) {
    throw new Error(`media-asset-card-size-tag.types.ts must own size tag props: ${requiredSizeTagTypesUsage}`);
  }
}

if (sizeTagTypesLineCount > 2) {
  throw new Error(`media-asset-card-size-tag.types.ts exceeded 2 lines: ${sizeTagTypesLineCount}`);
}

for (const requiredProcessingStatusTagUsage of [
  'import { getProcessingStatusLabel } from "../lib/media-issue-display";',
  'import type { MediaAssetCardProcessingStatusTagProps } from "./media-asset-card-processing-status-tag.types";',
  "}: MediaAssetCardProcessingStatusTagProps) {",
  "{getProcessingStatusLabel(locale, asset.processing_status)}",
]) {
  if (!processingStatusTagSource.includes(requiredProcessingStatusTagUsage)) {
    throw new Error(`media-asset-card-processing-status-tag.tsx must own processing-status tag rendering: ${requiredProcessingStatusTagUsage}`);
  }
}

for (const forbiddenProcessingStatusTagToken of [
  "getStorageProviderLabel(locale, asset.storage_provider)",
  "formatMediaSize(asset)",
  "getRetryStateLabel(locale, retryState)",
]) {
  if (processingStatusTagSource.includes(forbiddenProcessingStatusTagToken)) {
    throw new Error(`media-asset-card-processing-status-tag.tsx must keep other tag concerns delegated: ${forbiddenProcessingStatusTagToken}`);
  }
}

if (processingStatusTagLineCount > 6) {
  throw new Error(`media-asset-card-processing-status-tag.tsx exceeded 6 lines: ${processingStatusTagLineCount}`);
}

for (const requiredProcessingStatusTagTypesUsage of [
  'import type { LocaleCode } from "../lib/locale"; import type { MediaAssetCardMetadataTagsProps } from "./media-asset-card-metadata-tags.types"; export type MediaAssetCardProcessingStatusTagProps = Pick<MediaAssetCardMetadataTagsProps, "asset"> & { locale: LocaleCode };',
]) {
  if (!processingStatusTagTypesSource.includes(requiredProcessingStatusTagTypesUsage)) {
    throw new Error(`media-asset-card-processing-status-tag.types.ts must own processing-status tag props: ${requiredProcessingStatusTagTypesUsage}`);
  }
}

if (processingStatusTagTypesLineCount > 2) {
  throw new Error(`media-asset-card-processing-status-tag.types.ts exceeded 2 lines: ${processingStatusTagTypesLineCount}`);
}

for (const requiredStorageProviderTagUsage of [
  'import { getStorageProviderLabel } from "../lib/storage-provider-display";',
  'import type { MediaAssetCardStorageProviderTagProps } from "./media-asset-card-storage-provider-tag.types";',
  "}: MediaAssetCardStorageProviderTagProps) {",
  "{getStorageProviderLabel(locale, asset.storage_provider)}",
]) {
  if (!storageProviderTagSource.includes(requiredStorageProviderTagUsage)) {
    throw new Error(`media-asset-card-storage-provider-tag.tsx must own storage-provider tag rendering: ${requiredStorageProviderTagUsage}`);
  }
}

for (const forbiddenStorageProviderTagToken of [
  "getProcessingStatusLabel(locale, asset.processing_status)",
  "formatMediaSize(asset)",
  "getRetryStateLabel(locale, retryState)",
]) {
  if (storageProviderTagSource.includes(forbiddenStorageProviderTagToken)) {
    throw new Error(`media-asset-card-storage-provider-tag.tsx must keep other tag concerns delegated: ${forbiddenStorageProviderTagToken}`);
  }
}

if (storageProviderTagLineCount > 6) {
  throw new Error(`media-asset-card-storage-provider-tag.tsx exceeded 6 lines: ${storageProviderTagLineCount}`);
}

for (const requiredStorageProviderTagTypesUsage of [
  'import type { LocaleCode } from "../lib/locale"; import type { MediaAssetCardMetadataTagsProps } from "./media-asset-card-metadata-tags.types"; export type MediaAssetCardStorageProviderTagProps = Pick<MediaAssetCardMetadataTagsProps, "asset"> & { locale: LocaleCode };',
]) {
  if (!storageProviderTagTypesSource.includes(requiredStorageProviderTagTypesUsage)) {
    throw new Error(`media-asset-card-storage-provider-tag.types.ts must own storage-provider tag props: ${requiredStorageProviderTagTypesUsage}`);
  }
}

if (storageProviderTagTypesLineCount > 2) {
  throw new Error(`media-asset-card-storage-provider-tag.types.ts exceeded 2 lines: ${storageProviderTagTypesLineCount}`);
}

for (const requiredProcessingSourceTagUsage of [
  'import type { MediaAssetCardProcessingSourceTagProps } from "./media-asset-card-processing-source-tag.types";',
  "}: MediaAssetCardProcessingSourceTagProps) {",
  "{processingSource}",
]) {
  if (!processingSourceTagSource.includes(requiredProcessingSourceTagUsage)) {
    throw new Error(`media-asset-card-processing-source-tag.tsx must own processing-source tag rendering: ${requiredProcessingSourceTagUsage}`);
  }
}

for (const forbiddenProcessingSourceTagToken of [
  "getStorageProviderLabel(locale, asset.storage_provider)",
  "formatMediaSize(asset)",
  "getRetryStateLabel(locale, retryState)",
]) {
  if (processingSourceTagSource.includes(forbiddenProcessingSourceTagToken)) {
    throw new Error(`media-asset-card-processing-source-tag.tsx must keep other tag concerns delegated: ${forbiddenProcessingSourceTagToken}`);
  }
}

if (processingSourceTagLineCount > 6) {
  throw new Error(`media-asset-card-processing-source-tag.tsx exceeded 6 lines: ${processingSourceTagLineCount}`);
}

for (const requiredProcessingSourceTagTypesUsage of [
  'export type MediaAssetCardProcessingSourceTagProps = { processingSource: string | null };',
]) {
  if (!processingSourceTagTypesSource.includes(requiredProcessingSourceTagTypesUsage)) {
    throw new Error(`media-asset-card-processing-source-tag.types.ts must own processing-source tag props: ${requiredProcessingSourceTagTypesUsage}`);
  }
}

if (processingSourceTagTypesLineCount > 2) {
  throw new Error(`media-asset-card-processing-source-tag.types.ts exceeded 2 lines: ${processingSourceTagTypesLineCount}`);
}

for (const requiredExtractionModeTagUsage of [
  'import type { MediaAssetCardExtractionModeTagProps } from "./media-asset-card-extraction-mode-tag.types";',
  "}: MediaAssetCardExtractionModeTagProps) {",
  "{extractionMode}",
]) {
  if (!extractionModeTagSource.includes(requiredExtractionModeTagUsage)) {
    throw new Error(`media-asset-card-extraction-mode-tag.tsx must own extraction-mode tag rendering: ${requiredExtractionModeTagUsage}`);
  }
}

for (const forbiddenExtractionModeTagToken of [
  "getStorageProviderLabel(locale, asset.storage_provider)",
  "formatMediaSize(asset)",
  "getRetryStateLabel(locale, retryState)",
]) {
  if (extractionModeTagSource.includes(forbiddenExtractionModeTagToken)) {
    throw new Error(`media-asset-card-extraction-mode-tag.tsx must keep other tag concerns delegated: ${forbiddenExtractionModeTagToken}`);
  }
}

if (extractionModeTagLineCount > 6) {
  throw new Error(`media-asset-card-extraction-mode-tag.tsx exceeded 6 lines: ${extractionModeTagLineCount}`);
}

for (const requiredExtractionModeTagTypesUsage of [
  'export type MediaAssetCardExtractionModeTagProps = { extractionMode: string | null };',
]) {
  if (!extractionModeTagTypesSource.includes(requiredExtractionModeTagTypesUsage)) {
    throw new Error(`media-asset-card-extraction-mode-tag.types.ts must own extraction-mode tag props: ${requiredExtractionModeTagTypesUsage}`);
  }
}

if (extractionModeTagTypesLineCount > 2) {
  throw new Error(`media-asset-card-extraction-mode-tag.types.ts exceeded 2 lines: ${extractionModeTagTypesLineCount}`);
}

for (const requiredActionsUsage of [
  'import { MediaAssetCardDeleteButton } from "./media-asset-card-delete-button";',
  'import { MediaAssetCardDownloadButton } from "./media-asset-card-download-button";',
  'import { MediaAssetCardRefreshButton } from "./media-asset-card-refresh-button";',
  'import { MediaAssetCardRetryButton } from "./media-asset-card-retry-button";',
  "<MediaAssetCardDeleteButton",
  "<MediaAssetCardDownloadButton",
  "<MediaAssetCardRefreshButton",
  "<MediaAssetCardRetryButton",
]) {
  if (!actionsSource.includes(requiredActionsUsage)) {
    throw new Error(
      `media-asset-card-actions.tsx must delegate download button rendering: ${requiredActionsUsage}`,
    );
  }
}

for (const forbiddenActionsToken of [
  "onClick={() => void onDownloadMedia(asset)}",
  "{downloadingMediaId === asset.id ? mediaIssueCopy.downloading : mediaIssueCopy.download}",
  "onClick={() => void onRefreshMedia(asset.id)}",
  "{refreshingMediaId === asset.id ? mediaIssueCopy.refreshing : mediaIssueCopy.refreshStatus}",
  'asset.processing_status !== "completed"',
  "onClick={() => void onRetryMediaProcessing(asset.id)}",
  "{retryingMediaId === asset.id ? mediaIssueCopy.retrying : mediaIssueCopy.retry}",
  "onClick={() => void onDeleteMediaAsset(asset.id)}",
  "deletingMediaId === asset.id || !canWriteWorkspace",
  "{deletingMediaId === asset.id ? mediaIssueCopy.deleting : mediaIssueCopy.deleteMedia}",
]) {
  if (actionsSource.includes(forbiddenActionsToken)) {
    throw new Error(
      `media-asset-card-actions.tsx must keep download button rendering delegated: ${forbiddenActionsToken}`,
    );
  }
}

for (const requiredDeleteButtonUsage of [
  'import type { MediaAssetCardDeleteButtonProps } from "./media-asset-card-delete-button.types";',
  "}: MediaAssetCardDeleteButtonProps) {",
  "deletingMediaId === asset.id || !canWriteWorkspace",
  "onClick={() => void onDeleteMediaAsset(asset.id)}",
  "{deletingMediaId === asset.id ? mediaIssueCopy.deleting : mediaIssueCopy.deleteMedia}",
]) {
  if (!deleteButtonSource.includes(requiredDeleteButtonUsage)) {
    throw new Error(
      `media-asset-card-delete-button.tsx must own delete button rendering: ${requiredDeleteButtonUsage}`,
    );
  }
}

for (const forbiddenDeleteButtonToken of [
  "onDownloadMedia(asset)",
  "onRefreshMedia(asset.id)",
  "onRetryMediaProcessing(asset.id)",
]) {
  if (deleteButtonSource.includes(forbiddenDeleteButtonToken)) {
    throw new Error(
      `media-asset-card-delete-button.tsx must keep non-delete actions delegated: ${forbiddenDeleteButtonToken}`,
    );
  }
}

if (deleteButtonLineCount > 4) {
  throw new Error(`media-asset-card-delete-button.tsx exceeded 4 lines: ${deleteButtonLineCount}`);
}

for (const requiredDeleteButtonTypesUsage of [
  'import type { MediaAssetCardActionsProps } from "./media-asset-card-actions.types"; export type MediaAssetCardDeleteButtonProps = Pick<MediaAssetCardActionsProps, "asset" | "canWriteWorkspace" | "deletingMediaId" | "mediaIssueCopy" | "onDeleteMediaAsset">;',
]) {
  if (!deleteButtonTypesSource.includes(requiredDeleteButtonTypesUsage)) {
    throw new Error(
      `media-asset-card-delete-button.types.ts must own delete button prop typing: ${requiredDeleteButtonTypesUsage}`,
    );
  }
}

if (deleteButtonTypesLineCount > 2) {
  throw new Error(
    `media-asset-card-delete-button.types.ts exceeded 2 lines: ${deleteButtonTypesLineCount}`,
  );
}

for (const requiredDownloadButtonUsage of [
  'import type { MediaAssetCardDownloadButtonProps } from "./media-asset-card-download-button.types";',
  "}: MediaAssetCardDownloadButtonProps) {",
  "onClick={() => void onDownloadMedia(asset)}",
  "{downloadingMediaId === asset.id ? mediaIssueCopy.downloading : mediaIssueCopy.download}",
]) {
  if (!downloadButtonSource.includes(requiredDownloadButtonUsage)) {
    throw new Error(
      `media-asset-card-download-button.tsx must own download button rendering: ${requiredDownloadButtonUsage}`,
    );
  }
}

for (const forbiddenDownloadButtonToken of [
  "onRefreshMedia(asset.id)",
  "onRetryMediaProcessing(asset.id)",
  "onDeleteMediaAsset(asset.id)",
]) {
  if (downloadButtonSource.includes(forbiddenDownloadButtonToken)) {
    throw new Error(
      `media-asset-card-download-button.tsx must keep non-download actions delegated: ${forbiddenDownloadButtonToken}`,
    );
  }
}

if (downloadButtonLineCount > 4) {
  throw new Error(
    `media-asset-card-download-button.tsx exceeded 4 lines: ${downloadButtonLineCount}`,
  );
}

for (const requiredDownloadButtonTypesUsage of [
  'import type { MediaAssetCardActionsProps } from "./media-asset-card-actions.types"; export type MediaAssetCardDownloadButtonProps = Pick<MediaAssetCardActionsProps, "asset" | "downloadingMediaId" | "mediaIssueCopy" | "onDownloadMedia">;',
]) {
  if (!downloadButtonTypesSource.includes(requiredDownloadButtonTypesUsage)) {
    throw new Error(
      `media-asset-card-download-button.types.ts must own download button prop typing: ${requiredDownloadButtonTypesUsage}`,
    );
  }
}

if (downloadButtonTypesLineCount > 2) {
  throw new Error(
    `media-asset-card-download-button.types.ts exceeded 2 lines: ${downloadButtonTypesLineCount}`,
  );
}

for (const requiredRefreshButtonUsage of [
  'import type { MediaAssetCardRefreshButtonProps } from "./media-asset-card-refresh-button.types";',
  "}: MediaAssetCardRefreshButtonProps) {",
  "onClick={() => void onRefreshMedia(asset.id)}",
  "{refreshingMediaId === asset.id ? mediaIssueCopy.refreshing : mediaIssueCopy.refreshStatus}",
]) {
  if (!refreshButtonSource.includes(requiredRefreshButtonUsage)) {
    throw new Error(
      `media-asset-card-refresh-button.tsx must own refresh button rendering: ${requiredRefreshButtonUsage}`,
    );
  }
}

for (const forbiddenRefreshButtonToken of [
  "onDownloadMedia(asset)",
  "onRetryMediaProcessing(asset.id)",
  "onDeleteMediaAsset(asset.id)",
]) {
  if (refreshButtonSource.includes(forbiddenRefreshButtonToken)) {
    throw new Error(
      `media-asset-card-refresh-button.tsx must keep non-refresh actions delegated: ${forbiddenRefreshButtonToken}`,
    );
  }
}

if (refreshButtonLineCount > 4) {
  throw new Error(
    `media-asset-card-refresh-button.tsx exceeded 4 lines: ${refreshButtonLineCount}`,
  );
}

for (const requiredRefreshButtonTypesUsage of [
  'import type { MediaAssetCardActionsProps } from "./media-asset-card-actions.types"; export type MediaAssetCardRefreshButtonProps = Pick<MediaAssetCardActionsProps, "asset" | "mediaIssueCopy" | "onRefreshMedia" | "refreshingMediaId">;',
]) {
  if (!refreshButtonTypesSource.includes(requiredRefreshButtonTypesUsage)) {
    throw new Error(
      `media-asset-card-refresh-button.types.ts must own refresh button prop typing: ${requiredRefreshButtonTypesUsage}`,
    );
  }
}

if (refreshButtonTypesLineCount > 2) {
  throw new Error(
    `media-asset-card-refresh-button.types.ts exceeded 2 lines: ${refreshButtonTypesLineCount}`,
  );
}

for (const requiredRetryButtonUsage of [
  'import type { MediaAssetCardRetryButtonProps } from "./media-asset-card-retry-button.types";',
  "}: MediaAssetCardRetryButtonProps) {",
  'asset.processing_status !== "completed"',
  "onClick={() => void onRetryMediaProcessing(asset.id)}",
  "{retryingMediaId === asset.id ? mediaIssueCopy.retrying : mediaIssueCopy.retry}",
]) {
  if (!retryButtonSource.includes(requiredRetryButtonUsage)) {
    throw new Error(
      `media-asset-card-retry-button.tsx must own retry button rendering: ${requiredRetryButtonUsage}`,
    );
  }
}

for (const forbiddenRetryButtonToken of [
  "onDownloadMedia(asset)",
  "onRefreshMedia(asset.id)",
  "onDeleteMediaAsset(asset.id)",
]) {
  if (retryButtonSource.includes(forbiddenRetryButtonToken)) {
    throw new Error(
      `media-asset-card-retry-button.tsx must keep non-retry actions delegated: ${forbiddenRetryButtonToken}`,
    );
  }
}

if (retryButtonLineCount > 4) {
  throw new Error(`media-asset-card-retry-button.tsx exceeded 4 lines: ${retryButtonLineCount}`);
}

for (const requiredRetryButtonTypesUsage of [
  'import type { MediaAssetCardActionsProps } from "./media-asset-card-actions.types"; export type MediaAssetCardRetryButtonProps = Pick<MediaAssetCardActionsProps, "asset" | "mediaIssueCopy" | "onRetryMediaProcessing" | "retryingMediaId">;',
]) {
  if (!retryButtonTypesSource.includes(requiredRetryButtonTypesUsage)) {
    throw new Error(
      `media-asset-card-retry-button.types.ts must own retry button prop typing: ${requiredRetryButtonTypesUsage}`,
    );
  }
}

if (retryButtonTypesLineCount > 2) {
  throw new Error(
    `media-asset-card-retry-button.types.ts exceeded 2 lines: ${retryButtonTypesLineCount}`,
  );
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

"use client";
import { useStoredLocale } from "../lib/locale";
import { buildMediaAssetCardProcessingStatusTagProps } from "./media-asset-card-processing-status-tag-props";
import { buildMediaAssetCardStorageProviderTagProps } from "./media-asset-card-storage-provider-tag-props";
import { MediaAssetCardExtractionModeTag } from "./media-asset-card-extraction-mode-tag";
import { MediaAssetCardFileExtensionTag } from "./media-asset-card-file-extension-tag"; import { MediaAssetCardProcessingSourceTag } from "./media-asset-card-processing-source-tag";
import { readMediaAssetCardMetadataTagValues } from "./media-asset-card-metadata-tag-values";
import { MediaAssetCardProcessingStatusTag } from "./media-asset-card-processing-status-tag"; import { MediaAssetCardRemoteFetchTag } from "./media-asset-card-remote-fetch-tag";
import { MediaAssetCardRetryCountTag } from "./media-asset-card-retry-count-tag"; import { MediaAssetCardRetryStateTag } from "./media-asset-card-retry-state-tag";
import { MediaAssetCardSizeTag } from "./media-asset-card-size-tag"; import { MediaAssetCardStorageProviderTag } from "./media-asset-card-storage-provider-tag"; import type { MediaAssetCardMetadataTagsProps } from "./media-asset-card-metadata-tags.types";
export function MediaAssetCardMetadataTags({ asset, mediaIssueCopy }: MediaAssetCardMetadataTagsProps) {
  const { locale } = useStoredLocale(), { extractionMode, processingSource, remoteFetchStatus, retryState, retryCount, retryMaxAttempts } = readMediaAssetCardMetadataTagValues({ asset });
  return <div className="tag-row"><MediaAssetCardProcessingStatusTag {...buildMediaAssetCardProcessingStatusTagProps({ asset, locale })} /><MediaAssetCardStorageProviderTag {...buildMediaAssetCardStorageProviderTagProps({ asset, locale })} /><MediaAssetCardSizeTag asset={asset} /><MediaAssetCardProcessingSourceTag processingSource={processingSource} /><MediaAssetCardExtractionModeTag extractionMode={extractionMode} /><MediaAssetCardRemoteFetchTag locale={locale} mediaIssueCopy={mediaIssueCopy} remoteFetchStatus={remoteFetchStatus} /><MediaAssetCardRetryStateTag locale={locale} mediaIssueCopy={mediaIssueCopy} retryState={retryState} /><MediaAssetCardRetryCountTag mediaIssueCopy={mediaIssueCopy} retryCount={retryCount} retryMaxAttempts={retryMaxAttempts} /><MediaAssetCardFileExtensionTag asset={asset} /></div>;
}

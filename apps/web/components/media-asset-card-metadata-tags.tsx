"use client";
import { useStoredLocale } from "../lib/locale";
import { getProcessingStatusLabel, getRetryStateLabel } from "../lib/media-issue-display";
import { formatMediaSize } from "../lib/record-panel-format";
import { readMetadataNumber, readMetadataText } from "../lib/record-panel-media";
import { getStorageProviderLabel } from "../lib/storage-provider-display";
import { MediaAssetCardRemoteFetchTag } from "./media-asset-card-remote-fetch-tag";
import type { MediaAssetCardMetadataTagsProps } from "./media-asset-card-metadata-tags.types";
export function MediaAssetCardMetadataTags({ asset, mediaIssueCopy }: MediaAssetCardMetadataTagsProps) {
  const { locale } = useStoredLocale(), extractionMode = readMetadataText(asset.metadata_json, "extraction_mode"), processingSource = readMetadataText(asset.metadata_json, "processing_source"), remoteFetchStatus = readMetadataText(asset.metadata_json, "remote_fetch_status"), retryState = readMetadataText(asset.metadata_json, "processing_retry_state"), retryCount = readMetadataNumber(asset.metadata_json, "processing_retry_count"), retryMaxAttempts = readMetadataNumber(asset.metadata_json, "processing_retry_max_attempts");
  return <div className="tag-row"><span className="tag">{getProcessingStatusLabel(locale, asset.processing_status)}</span><span className="tag">{getStorageProviderLabel(locale, asset.storage_provider)}</span><span className="tag">{formatMediaSize(asset)}</span>{processingSource ? <span className="tag">{processingSource}</span> : null}{extractionMode ? <span className="tag">{extractionMode}</span> : null}<MediaAssetCardRemoteFetchTag locale={locale} mediaIssueCopy={mediaIssueCopy} remoteFetchStatus={remoteFetchStatus} />{retryState && retryState !== "idle" ? <span className="tag">{mediaIssueCopy.retryStatePrefix} {getRetryStateLabel(locale, retryState)}</span> : null}{retryCount !== null ? <span className="tag">{mediaIssueCopy.retries} {retryCount}{retryMaxAttempts !== null ? `/${retryMaxAttempts}` : ""}</span> : null}{typeof asset.metadata_json.file_extension === "string" && asset.metadata_json.file_extension ? <span className="tag">{String(asset.metadata_json.file_extension)}</span> : null}</div>;
}

"use client";

import { formatMediaSize } from "../lib/record-panel-format";
import { readMetadataNumber, readMetadataText } from "../lib/record-panel-media";
import type { MediaAssetCardMetadataTagsProps } from "./media-asset-card-metadata-tags.types";

export function MediaAssetCardMetadataTags({ asset, mediaIssueCopy }: MediaAssetCardMetadataTagsProps) {
  const extractionMode = readMetadataText(asset.metadata_json, "extraction_mode");
  const processingSource = readMetadataText(asset.metadata_json, "processing_source");
  const remoteFetchStatus = readMetadataText(asset.metadata_json, "remote_fetch_status");
  const retryState = readMetadataText(asset.metadata_json, "processing_retry_state");
  const retryCount = readMetadataNumber(asset.metadata_json, "processing_retry_count");
  const retryMaxAttempts = readMetadataNumber(asset.metadata_json, "processing_retry_max_attempts");

  return <div className="tag-row"><span className="tag">{asset.processing_status}</span><span className="tag">{asset.storage_provider}</span><span className="tag">{formatMediaSize(asset)}</span>{processingSource ? <span className="tag">{processingSource}</span> : null}{extractionMode ? <span className="tag">{extractionMode}</span> : null}{remoteFetchStatus ? <span className="tag">{mediaIssueCopy.fetchPrefix} {remoteFetchStatus}</span> : null}{retryState && retryState !== "idle" ? <span className="tag">{mediaIssueCopy.retryStatePrefix} {retryState}</span> : null}{retryCount !== null ? <span className="tag">{mediaIssueCopy.retries} {retryCount}{retryMaxAttempts !== null ? `/${retryMaxAttempts}` : ""}</span> : null}{typeof asset.metadata_json.file_extension === "string" && asset.metadata_json.file_extension ? <span className="tag">{String(asset.metadata_json.file_extension)}</span> : null}</div>;
}

"use client";

import { MediaPreview } from "./media-preview";
import { readMetadataNumber, readMetadataText } from "../lib/record-panel-media";
import type { MediaAsset } from "../lib/types";
import type { MediaIssueCopy } from "../lib/record-panel-ui";

type MediaAssetCardProps = {
  asset: MediaAsset;
  authToken: string | null;
  workspaceId: string;
  canWriteWorkspace: boolean;
  mediaIssueCopy: MediaIssueCopy;
  downloadingMediaId: string | null;
  refreshingMediaId: string | null;
  retryingMediaId: string | null;
  deletingMediaId: string | null;
  formatMediaSize: (asset: MediaAsset) => string;
  formatHistoryTimestampLabel: (value?: string | null) => string;
  onDownloadMedia: (asset: MediaAsset) => Promise<void>;
  onRefreshMedia: (mediaId: string) => Promise<void>;
  onRetryMediaProcessing: (mediaId: string) => Promise<void>;
  onDeleteMediaAsset: (mediaId: string) => Promise<void>;
};

export function MediaAssetCard({
  asset,
  authToken,
  workspaceId,
  canWriteWorkspace,
  mediaIssueCopy,
  downloadingMediaId,
  refreshingMediaId,
  retryingMediaId,
  deletingMediaId,
  formatMediaSize,
  formatHistoryTimestampLabel,
  onDownloadMedia,
  onRefreshMedia,
  onRetryMediaProcessing,
  onDeleteMediaAsset,
}: MediaAssetCardProps) {
  const extractionMode = readMetadataText(asset.metadata_json, "extraction_mode");
  const processingSource = readMetadataText(asset.metadata_json, "processing_source");
  const lastAttemptAt = readMetadataText(asset.metadata_json, "processing_last_attempt_at");
  const remoteFetchStatus = readMetadataText(asset.metadata_json, "remote_fetch_status");
  const retryState = readMetadataText(asset.metadata_json, "processing_retry_state");
  const retryCount = readMetadataNumber(asset.metadata_json, "processing_retry_count");
  const retryMaxAttempts = readMetadataNumber(asset.metadata_json, "processing_retry_max_attempts");
  const nextRetryAt = readMetadataText(asset.metadata_json, "processing_retry_next_attempt_at");

  return (
    <article className="record-card">
      <div className="eyebrow">{asset.media_type}</div>
      <div>{asset.original_filename}</div>
      <div className="muted">{asset.mime_type}</div>
      <div className="tag-row">
        <span className="tag">{asset.processing_status}</span>
        <span className="tag">{asset.storage_provider}</span>
        <span className="tag">{formatMediaSize(asset)}</span>
        {processingSource ? <span className="tag">{processingSource}</span> : null}
        {extractionMode ? <span className="tag">{extractionMode}</span> : null}
        {remoteFetchStatus ? <span className="tag">fetch {remoteFetchStatus}</span> : null}
        {retryState && retryState !== "idle" ? <span className="tag">retry {retryState}</span> : null}
        {retryCount !== null ? (
          <span className="tag">
            retries {retryCount}
            {retryMaxAttempts !== null ? `/${retryMaxAttempts}` : ""}
          </span>
        ) : null}
        {typeof asset.metadata_json.file_extension === "string" && asset.metadata_json.file_extension ? (
          <span className="tag">{String(asset.metadata_json.file_extension)}</span>
        ) : null}
      </div>
      {authToken ? (
        <div style={{ marginTop: 12 }}>
          <MediaPreview asset={asset} token={authToken} workspaceId={workspaceId} />
        </div>
      ) : null}
      <div className="detail-grid" style={{ marginTop: 12 }}>
        {typeof asset.metadata_json.width === "number" && typeof asset.metadata_json.height === "number" ? (
          <div className="subtle-card">
            <div className="eyebrow">{mediaIssueCopy.dimensions}</div>
            <div style={{ marginTop: 8, fontWeight: 600 }}>
              {asset.metadata_json.width} x {asset.metadata_json.height}
            </div>
          </div>
        ) : null}
        {typeof asset.metadata_json.text_char_count === "number" ? (
          <div className="subtle-card">
            <div className="eyebrow">{mediaIssueCopy.textChars}</div>
            <div style={{ marginTop: 8, fontWeight: 600 }}>
              {asset.metadata_json.text_char_count}
            </div>
          </div>
        ) : null}
        {typeof asset.metadata_json.text_line_count === "number" ? (
          <div className="subtle-card">
            <div className="eyebrow">{mediaIssueCopy.textLines}</div>
            <div style={{ marginTop: 8, fontWeight: 600 }}>
              {asset.metadata_json.text_line_count}
            </div>
          </div>
        ) : null}
        {lastAttemptAt ? (
          <div className="subtle-card">
            <div className="eyebrow">{mediaIssueCopy.lastAttempt}</div>
            <div style={{ marginTop: 8, fontWeight: 600 }}>{formatHistoryTimestampLabel(lastAttemptAt)}</div>
          </div>
        ) : null}
        {nextRetryAt ? (
          <div className="subtle-card">
            <div className="eyebrow">{mediaIssueCopy.nextRetry}</div>
            <div style={{ marginTop: 8, fontWeight: 600 }}>{formatHistoryTimestampLabel(nextRetryAt)}</div>
          </div>
        ) : null}
      </div>
      {asset.extracted_text ? (
        <p style={{ margin: "10px 0 0", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
          {asset.extracted_text.length > 280 ? `${asset.extracted_text.slice(0, 280)}...` : asset.extracted_text}
        </p>
      ) : null}
      {asset.processing_error ? (
        <div className="notice error" style={{ marginTop: 10 }}>
          {asset.processing_error}
        </div>
      ) : null}
      <div className="action-row" style={{ marginTop: 12 }}>
        <button
          className="button secondary"
          type="button"
          disabled={downloadingMediaId === asset.id}
          onClick={() => void onDownloadMedia(asset)}
        >
          {downloadingMediaId === asset.id ? mediaIssueCopy.downloading : mediaIssueCopy.download}
        </button>
        <button
          className="button secondary"
          type="button"
          disabled={refreshingMediaId === asset.id}
          onClick={() => void onRefreshMedia(asset.id)}
        >
          {refreshingMediaId === asset.id ? mediaIssueCopy.refreshing : mediaIssueCopy.refreshStatus}
        </button>
        {asset.processing_status !== "completed" ? (
          <button
            className="button secondary"
            type="button"
            disabled={retryingMediaId === asset.id}
            onClick={() => void onRetryMediaProcessing(asset.id)}
          >
            {retryingMediaId === asset.id ? mediaIssueCopy.retrying : mediaIssueCopy.retry}
          </button>
        ) : null}
        <button
          className="button secondary"
          type="button"
          disabled={deletingMediaId === asset.id || !canWriteWorkspace}
          onClick={() => void onDeleteMediaAsset(asset.id)}
        >
          {deletingMediaId === asset.id ? mediaIssueCopy.deleting : mediaIssueCopy.deleteMedia}
        </button>
      </div>
    </article>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";

import { fetchMediaBlob } from "../lib/api";
import type { MediaAsset } from "../lib/types";

function isPreviewable(asset: MediaAsset): boolean {
  return asset.media_type === "image" || asset.media_type === "audio" || asset.media_type === "video";
}

function readNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

export function MediaPreview({
  asset,
  token,
  workspaceId,
}: {
  asset: MediaAsset;
  token: string;
  workspaceId: string;
}) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const width = readNumber(asset.metadata_json.width);
  const height = readNumber(asset.metadata_json.height);
  const previewLabel = useMemo(() => {
    if (width && height) {
      return `${width} x ${height}`;
    }
    return null;
  }, [height, width]);

  useEffect(() => {
    if (!isPreviewable(asset)) {
      setBlobUrl(null);
      setError("");
      return;
    }

    let isDisposed = false;
    let currentUrl: string | null = null;

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const blob = await fetchMediaBlob(token, workspaceId, asset.id);
        if (isDisposed) {
          return;
        }
        currentUrl = URL.createObjectURL(blob);
        setBlobUrl(currentUrl);
      } catch (caught) {
        if (isDisposed) {
          return;
        }
        setError(caught instanceof Error ? caught.message : "Failed to load preview");
      } finally {
        if (!isDisposed) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      isDisposed = true;
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }
    };
  }, [asset.id, asset.media_type, token, workspaceId]);

  if (!isPreviewable(asset)) {
    return <div className="media-preview-placeholder">Preview is not available for this file type.</div>;
  }

  if (loading && !blobUrl) {
    return <div className="media-preview-placeholder">Loading preview...</div>;
  }

  if (error) {
    return <div className="notice error">{error}</div>;
  }

  if (!blobUrl) {
    return <div className="media-preview-placeholder">Preview not ready.</div>;
  }

  return (
    <div className="media-preview-shell">
      {asset.media_type === "image" ? (
        <img alt={asset.original_filename} className="media-preview-image" src={blobUrl} />
      ) : null}
      {asset.media_type === "audio" ? (
        <audio className="media-preview-player" controls preload="metadata" src={blobUrl} />
      ) : null}
      {asset.media_type === "video" ? (
        <video className="media-preview-video" controls preload="metadata" src={blobUrl} />
      ) : null}
      {previewLabel ? (
        <div className="muted" style={{ marginTop: 8 }}>
          {previewLabel}
        </div>
      ) : null}
    </div>
  );
}

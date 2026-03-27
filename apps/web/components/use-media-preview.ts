"use client";

import { useEffect, useMemo, useState } from "react";

import { fetchMediaBlob } from "../lib/api";
import { getStoredLocale } from "../lib/locale";
import { getRecordPanelUiBundle } from "../lib/record-panel-ui";
import type { MediaPreviewControllerResult, MediaPreviewProps } from "./media-preview.types";

function isPreviewable(mediaType: MediaPreviewProps["asset"]["media_type"]) {
  return mediaType === "image" || mediaType === "audio" || mediaType === "video";
}

function readNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

export function useMediaPreview({
  asset,
  token,
  workspaceId,
}: MediaPreviewProps): MediaPreviewControllerResult {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const previewCopy = getRecordPanelUiBundle(getStoredLocale()).panelCopy;
  const width = readNumber(asset.metadata_json.width);
  const height = readNumber(asset.metadata_json.height);
  const previewable = isPreviewable(asset.media_type);
  const previewLabel = useMemo(() => {
    if (width && height) {
      return `${width} x ${height}`;
    }
    return null;
  }, [height, width]);

  useEffect(() => {
    if (!previewable) {
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
        setError(caught instanceof Error ? caught.message : previewCopy.previewLoadFailed);
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
  }, [asset.id, previewCopy.previewLoadFailed, previewable, token, workspaceId]);

  return {
    blobUrl,
    error,
    loading,
    previewLabel,
    previewable,
  };
}

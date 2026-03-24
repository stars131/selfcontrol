"use client";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { MediaAsset } from "../lib/types";
import { downloadRecordPanelMediaFile, getRecordPanelMediaFileErrorMessage, getRecordPanelMediaFileFallbackMessages } from "./record-panel-controller-media-file-helpers";
type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];
export function createRecordPanelControllerMediaDownloadAction({
  authToken,
  detailCopy,
  setDownloadingMediaId,
  setError,
  workspaceId,
}: {
  authToken: string | null;
  detailCopy: DetailCopy;
  setDownloadingMediaId: (value: string | null) => void;
  setError: (value: string) => void;
  workspaceId: string;
}) {
  const fallbackMessages = getRecordPanelMediaFileFallbackMessages(detailCopy);
  async function handleDownloadMedia(asset: MediaAsset) {
    if (!authToken) {
      setError(fallbackMessages.notAuthenticated);
      return;
    }
    setDownloadingMediaId(asset.id);
    setError("");
    try {
      await downloadRecordPanelMediaFile({ asset, authToken, workspaceId });
    } catch (caught) {
      setError(getRecordPanelMediaFileErrorMessage(caught, fallbackMessages.downloadMediaError));
    } finally {
      setDownloadingMediaId(null);
    }
  }
  return {
    handleDownloadMedia,
  };
}

"use client";
import { downloadRecordPanelMediaFile, getRecordPanelMediaFileErrorMessage, getRecordPanelMediaFileFallbackMessages } from "./record-panel-controller-media-file-helpers";
import type {
  RecordPanelControllerMediaDownloadActionInput,
  RecordPanelControllerMediaDownloadAsset,
} from "./record-panel-controller-media-transfer-action-input.types";

export function createRecordPanelControllerMediaDownloadAction({
  authToken,
  detailCopy,
  setDownloadingMediaId,
  setError,
  workspaceId,
}: RecordPanelControllerMediaDownloadActionInput) {
  const fallbackMessages = getRecordPanelMediaFileFallbackMessages(detailCopy);
  async function handleDownloadMedia(asset: RecordPanelControllerMediaDownloadAsset) {
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

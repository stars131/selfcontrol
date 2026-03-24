import type { ChangeEvent } from "react";

import { fetchMediaBlob } from "../lib/api";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { MediaAsset, RecordItem } from "../lib/types";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

export function getRecordPanelMediaFileErrorMessage(caught: unknown, fallbackMessage: string) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

export function resolveRecordPanelUploadInput(
  event: ChangeEvent<HTMLInputElement>,
  selectedRecord: RecordItem | null,
) {
  const file = event.target.files?.[0];
  if (!file || !selectedRecord) {
    return null;
  }

  return {
    file,
    recordId: selectedRecord.id,
  };
}

export async function downloadRecordPanelMediaFile({
  asset,
  authToken,
  workspaceId,
}: {
  asset: MediaAsset;
  authToken: string;
  workspaceId: string;
}) {
  const blob = await fetchMediaBlob(authToken, workspaceId, asset.id);
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = asset.original_filename || `${asset.id}.bin`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function getRecordPanelMediaFileFallbackMessages(detailCopy: DetailCopy) {
  return {
    deleteMediaError: detailCopy.deleteMediaError,
    downloadMediaError: detailCopy.downloadMediaError,
    notAuthenticated: detailCopy.notAuthenticated,
    uploadMediaError: detailCopy.uploadMediaError,
  };
}

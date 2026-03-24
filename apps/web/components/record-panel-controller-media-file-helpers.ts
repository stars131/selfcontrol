import type { ChangeEvent } from "react";

import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { RecordItem } from "../lib/types";
export { downloadRecordPanelMediaFile } from "./record-panel-controller-media-download";

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

export function getRecordPanelMediaFileFallbackMessages(detailCopy: DetailCopy) {
  return {
    deleteMediaError: detailCopy.deleteMediaError,
    downloadMediaError: detailCopy.downloadMediaError,
    notAuthenticated: detailCopy.notAuthenticated,
    uploadMediaError: detailCopy.uploadMediaError,
  };
}

import type { ChangeEvent } from "react";

import { resolveErrorMessage } from "../lib/error-message";
import type { RecordItem } from "../lib/types";
export { downloadRecordPanelMediaFile } from "./record-panel-controller-media-download";
import type { RecordPanelControllerDetailCopy } from "./record-panel-controller-detail-copy.types";

export function getRecordPanelMediaFileErrorMessage(caught: unknown, fallbackMessage: string) {
  return resolveErrorMessage(caught, fallbackMessage);
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

export function getRecordPanelMediaFileFallbackMessages(detailCopy: RecordPanelControllerDetailCopy) {
  return {
    deleteMediaError: detailCopy.deleteMediaError,
    downloadMediaError: detailCopy.downloadMediaError,
    notAuthenticated: detailCopy.notAuthenticated,
    uploadMediaError: detailCopy.uploadMediaError,
  };
}

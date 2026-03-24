"use client";
import type { ChangeEvent } from "react";
import type { RecordItem } from "../lib/types";
import type { RecordPanelProps } from "./record-panel.types";
import { getRecordPanelErrorMessage } from "./record-panel-legacy-action-error";
export function createRecordPanelLegacyUploadAction({
  onUploadMedia,
  selectedRecord,
  setError,
  setUploading,
}: { onUploadMedia: RecordPanelProps["onUploadMedia"]; selectedRecord: RecordItem | null; setError: (value: string) => void; setUploading: (value: boolean) => void }) {
  return async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedRecord) {
      return;
    }
    setUploading(true);
    setError("");
    try {
      await onUploadMedia(selectedRecord.id, file);
      event.target.value = "";
    } catch (caught) {
      setError(getRecordPanelErrorMessage(caught, "Failed to upload media"));
    } finally {
      setUploading(false);
    }
  };
}

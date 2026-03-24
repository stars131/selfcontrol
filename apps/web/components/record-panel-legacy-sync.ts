"use client";
import { useEffect } from "react";
import { EMPTY_RECORD_PANEL_FORM } from "./record-panel-legacy-state";
import type { UseRecordPanelLegacySyncInput } from "./record-panel-legacy-sync.types";
export function useRecordPanelLegacySync({ selectedRecord, setForm }: UseRecordPanelLegacySyncInput) {
  useEffect(() => {
    if (!selectedRecord) { setForm(EMPTY_RECORD_PANEL_FORM); return; }
    setForm({ title: selectedRecord.title ?? "", content: selectedRecord.content ?? "", type_code: selectedRecord.type_code, rating: selectedRecord.rating ? String(selectedRecord.rating) : "", is_avoid: selectedRecord.is_avoid });
  }, [selectedRecord, setForm]);
}

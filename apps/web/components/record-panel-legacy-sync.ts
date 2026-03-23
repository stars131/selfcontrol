"use client";

import { useEffect } from "react";

import type { RecordItem } from "../lib/types";
import { EMPTY_RECORD_PANEL_FORM } from "./record-panel-legacy-state";
import type { RecordPanelFormState } from "./record-panel.types";

export function useRecordPanelLegacySync({
  selectedRecord,
  setForm,
}: {
  selectedRecord: RecordItem | null;
  setForm: React.Dispatch<React.SetStateAction<RecordPanelFormState>>;
}) {
  useEffect(() => {
    if (!selectedRecord) {
      setForm(EMPTY_RECORD_PANEL_FORM);
      return;
    }
    setForm({
      title: selectedRecord.title ?? "",
      content: selectedRecord.content ?? "",
      type_code: selectedRecord.type_code,
      rating: selectedRecord.rating ? String(selectedRecord.rating) : "",
      is_avoid: selectedRecord.is_avoid,
    });
  }, [selectedRecord, setForm]);
}

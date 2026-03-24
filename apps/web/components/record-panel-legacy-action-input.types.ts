"use client";

import type { RecordItem } from "../lib/types";
import type { RecordPanelFormState, RecordPanelProps } from "./record-panel.types";

export type RecordPanelLegacyDeleteActionInput = { onDeleteRecord: RecordPanelProps["onDeleteRecord"]; selectedRecord: RecordItem | null; setDeleting: (value: boolean) => void; setError: (value: string) => void };
export type RecordPanelLegacySubmitActionInput = { form: RecordPanelFormState; onSaveRecord: RecordPanelProps["onSaveRecord"]; selectedRecord: RecordItem | null; setError: (value: string) => void; setSaving: (value: boolean) => void };
export type RecordPanelLegacyUploadActionInput = { onUploadMedia: RecordPanelProps["onUploadMedia"]; selectedRecord: RecordItem | null; setError: (value: string) => void; setUploading: (value: boolean) => void };
export type LegacyActionsInput = RecordPanelLegacyDeleteActionInput & RecordPanelLegacySubmitActionInput & RecordPanelLegacyUploadActionInput;

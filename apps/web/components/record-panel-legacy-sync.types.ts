"use client";
import type { Dispatch, SetStateAction } from "react";
import type { RecordItem } from "../lib/types";
import type { RecordPanelFormState } from "./record-panel.types";
export type UseRecordPanelLegacySyncInput = { selectedRecord: RecordItem | null; setForm: Dispatch<SetStateAction<RecordPanelFormState>> };

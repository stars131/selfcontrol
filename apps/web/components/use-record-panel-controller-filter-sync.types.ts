"use client";
import type { Dispatch, SetStateAction } from "react";
import type { RecordFilterState } from "../lib/types";
export type UseRecordPanelControllerFilterSyncInput = { recordFilter: RecordFilterState; setFilterDraft: Dispatch<SetStateAction<RecordFilterState>> };

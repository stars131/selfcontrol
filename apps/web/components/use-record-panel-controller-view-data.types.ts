"use client";
import type { MediaAsset, MediaDeadLetterOverview, RecordItem } from "../lib/types";
export type UseRecordPanelControllerViewDataInput = { mediaAssets: MediaAsset[]; mediaDeadLetterOverview: MediaDeadLetterOverview | null; records: RecordItem[]; selectedRecordId?: string | null };

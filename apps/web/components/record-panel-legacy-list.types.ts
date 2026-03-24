"use client";
import type { RecordItem } from "../lib/types";
export type RecordPanelLegacyListSelection = { onSelectRecord: (recordId: string) => void };
export type RecordPanelLegacyListItemProps = { record: RecordItem; selected: boolean } & RecordPanelLegacyListSelection;
export type RecordPanelLegacyListProps = { records: RecordItem[]; selectedRecordId: string | null } & RecordPanelLegacyListSelection;

import type { RecordFilterState } from "../lib/types";

export type ViewMode = "timeline" | "list";
export type SaveRecordInput = { recordId?: string; title?: string; content: string; type_code: string; rating?: number | null; occurred_at?: string; is_avoid: boolean; extra_data?: Record<string, unknown> };
export type ReminderUpdateInput = Partial<{ title: string | null; message: string | null; remind_at: string | null; status: string; is_enabled: boolean }>;
export type RecordPanelCreateReminderInput = { recordId: string; title?: string; message?: string; remind_at: string; channel_code?: string };
export type RecordPanelBulkRetryMediaDeadLetterInput = { mediaIds?: string[]; retryStates?: string[]; limit?: number };
export type RecordPanelLocationFilterInput = Pick<RecordFilterState, "placeQuery" | "reviewStatus" | "mappedOnly">;

import type { SaveRecordInput } from "./record-panel-v2-input.types"; export type QuickAddRecordDraft = Pick<SaveRecordInput, "content" | "is_avoid" | "type_code"> & { title: string };

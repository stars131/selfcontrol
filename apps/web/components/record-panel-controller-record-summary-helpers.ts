import type { RecordItem } from "../lib/types";

export function countAvoidRecords(records: RecordItem[]) {
  return records.filter((record) => record.is_avoid).length;
}

export function countFoodRecords(records: RecordItem[]) {
  return records.filter((record) => record.type_code === "food").length;
}

export function findSelectedRecord(records: RecordItem[], selectedRecordId?: string | null) {
  return records.find((record) => record.id === selectedRecordId) ?? null;
}

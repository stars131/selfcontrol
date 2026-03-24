import { readLocationHistory, readLocationReview } from "../lib/location";
import type { LocationReview, RecordItem } from "../lib/types";

export function getSelectedRecordLocationReview(selectedRecord: RecordItem | null): LocationReview | null {
  return readLocationReview(selectedRecord?.extra_data);
}

export function getSelectedRecordLocationHistory(selectedRecord: RecordItem | null) {
  return readLocationHistory(selectedRecord?.extra_data).slice().reverse();
}

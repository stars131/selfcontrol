import type { RecordItem } from "../lib/types";
import { countAvoidRecords, countFoodRecords, findSelectedRecord } from "./record-panel-controller-view-data-helpers";
export function buildRecordPanelRecordViewData({ records, selectedRecordId }: { records: RecordItem[]; selectedRecordId?: string | null }) {
  return { avoidCount: countAvoidRecords(records), foodCount: countFoodRecords(records), selectedRecord: findSelectedRecord(records, selectedRecordId) };
}

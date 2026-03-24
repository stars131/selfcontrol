import type { BuildRecordPanelRecordViewDataInput } from "./record-panel-controller-record-view-data.types";
import { countAvoidRecords, countFoodRecords, findSelectedRecord } from "./record-panel-controller-view-data-helpers";
export function buildRecordPanelRecordViewData({ records, selectedRecordId }: BuildRecordPanelRecordViewDataInput) {
  return { avoidCount: countAvoidRecords(records), foodCount: countFoodRecords(records), selectedRecord: findSelectedRecord(records, selectedRecordId) };
}

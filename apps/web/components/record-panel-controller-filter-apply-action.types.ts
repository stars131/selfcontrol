import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { ControllerProps } from "./record-panel-controller.types";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];
export type RecordPanelControllerFilterApplyActionInput = { detailCopy: DetailCopy; filterDraft: ControllerProps["recordFilter"]; onApplyRecordFilter: ControllerProps["onApplyRecordFilter"]; setError: (value: string) => void };

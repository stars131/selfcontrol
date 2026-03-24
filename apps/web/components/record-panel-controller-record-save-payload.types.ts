import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { LocationReviewFormState, RecordFormState } from "../lib/record-panel-forms";
import type { RecordItem } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

export type RecordSavePayload = Parameters<ControllerProps["onSaveRecord"]>[0];
export type ResolveRecordSaveActionInput = {
  detailCopy: DetailCopy;
  form: RecordFormState;
  locationReviewForm: LocationReviewFormState;
  selectedRecord: RecordItem | null;
};

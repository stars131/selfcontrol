import type { LocationReviewFormState, RecordFormState } from "../lib/record-panel-forms";
import type { RecordItem } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";
import type { RecordPanelControllerDetailCopy } from "./record-panel-controller-detail-copy.types";
export type RecordSavePayload = Parameters<ControllerProps["onSaveRecord"]>[0];
export type ResolveRecordSaveActionInput = { detailCopy: RecordPanelControllerDetailCopy; form: RecordFormState; locationReviewForm: LocationReviewFormState; selectedRecord: RecordItem | null };
export type BuildRecordSavePayloadInput = ResolveRecordSaveActionInput & { latitude: number | null; longitude: number | null };

import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { LocationReviewFormState, RecordFormState } from "../lib/record-panel-forms";
import type { RecordItem } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";
import { buildRecordPanelLocationExtraData } from "./record-panel-controller-record-location-payload";
type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];
type RecordSavePayload = Parameters<ControllerProps["onSaveRecord"]>[0];
export type ResolveRecordSaveActionInput = {
  detailCopy: DetailCopy;
  form: RecordFormState;
  locationReviewForm: LocationReviewFormState;
  selectedRecord: RecordItem | null;
};

export function parseRecordPanelCoordinate(value: string) {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return null;
  }
  const coordinate = Number(trimmedValue);
  return Number.isNaN(coordinate) ? Number.NaN : coordinate;
}

export function buildRecordPanelSavePayload({
  form,
  latitude,
  locationReviewForm,
  longitude,
  selectedRecord,
}: ResolveRecordSaveActionInput & {
  latitude: number | null;
  longitude: number | null;
}): RecordSavePayload {
  return {
    recordId: selectedRecord?.id,
    title: form.title.trim() || undefined,
    content: form.content.trim(),
    type_code: form.type_code,
    rating: form.rating ? Number(form.rating) : null,
    occurred_at: form.occurred_at ? new Date(form.occurred_at).toISOString() : undefined,
    is_avoid: form.is_avoid,
    extra_data: buildRecordPanelLocationExtraData({
      form,
      latitude,
      locationReviewForm,
      longitude,
    }),
  };
}

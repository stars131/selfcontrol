import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { LocationReviewFormState, RecordFormState } from "../lib/record-panel-forms";
import type { RecordItem } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";

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
  const hasLocation =
    form.location.place_name.trim() ||
    form.location.address.trim() ||
    latitude !== null ||
    longitude !== null;

  return {
    recordId: selectedRecord?.id,
    title: form.title.trim() || undefined,
    content: form.content.trim(),
    type_code: form.type_code,
    rating: form.rating ? Number(form.rating) : null,
    occurred_at: form.occurred_at ? new Date(form.occurred_at).toISOString() : undefined,
    is_avoid: form.is_avoid,
    extra_data: hasLocation
      ? {
          location: {
            place_name: form.location.place_name.trim() || undefined,
            address: form.location.address.trim() || undefined,
            latitude: latitude ?? undefined,
            longitude: longitude ?? undefined,
            source: form.location.source || "manual",
          },
          location_review: {
            status: locationReviewForm.status || "pending",
            note: locationReviewForm.note.trim() || undefined,
          },
        }
      : {
          location: null,
          location_review: null,
        },
  };
}

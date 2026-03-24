export { parseRecordPanelCoordinate } from "./record-panel-controller-record-save-coordinate";
export type { RecordSavePayload, ResolveRecordSaveActionInput } from "./record-panel-controller-record-save-payload.types";
import { buildRecordPanelLocationExtraData } from "./record-panel-controller-record-location-payload";
import type { RecordSavePayload, ResolveRecordSaveActionInput } from "./record-panel-controller-record-save-payload.types";

export function buildRecordPanelSavePayload({
  form,
  latitude,
  locationReviewForm,
  longitude,
  selectedRecord,
}: ResolveRecordSaveActionInput & { latitude: number | null; longitude: number | null }): RecordSavePayload {
  return {
    recordId: selectedRecord?.id,
    title: form.title.trim() || undefined,
    content: form.content.trim(),
    type_code: form.type_code,
    rating: form.rating ? Number(form.rating) : null,
    occurred_at: form.occurred_at ? new Date(form.occurred_at).toISOString() : undefined,
    is_avoid: form.is_avoid,
    extra_data: buildRecordPanelLocationExtraData({ form, latitude, locationReviewForm, longitude }),
  };
}

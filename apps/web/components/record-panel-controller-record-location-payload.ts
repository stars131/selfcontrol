import type { LocationReviewFormState, RecordFormState } from "../lib/record-panel-forms";

export function buildRecordPanelLocationExtraData({
  form,
  latitude,
  locationReviewForm,
  longitude,
}: {
  form: RecordFormState;
  latitude: number | null;
  locationReviewForm: LocationReviewFormState;
  longitude: number | null;
}) {
  const hasLocation =
    form.location.place_name.trim() ||
    form.location.address.trim() ||
    latitude !== null ||
    longitude !== null;

  return hasLocation
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
      };
}

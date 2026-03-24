import {
  buildRecordPanelSavePayload,
  parseRecordPanelCoordinate,
  type ResolveRecordSaveActionInput,
} from "./record-panel-controller-record-save-payload";

type RecordSaveResolution =
  | { errorMessage: string }
  | { payload: ReturnType<typeof buildRecordPanelSavePayload> };

export function resolveRecordPanelRecordSaveActionInput(
  input: ResolveRecordSaveActionInput,
): RecordSaveResolution {
  if (!input.form.content.trim()) {
    return { errorMessage: input.detailCopy.contentRequiredError };
  }
  const latitude = parseRecordPanelCoordinate(input.form.location.latitude);
  if (input.form.location.latitude.trim() && latitude !== null && Number.isNaN(latitude)) {
    return { errorMessage: input.detailCopy.latitudeInvalidError };
  }
  const longitude = parseRecordPanelCoordinate(input.form.location.longitude);
  if (input.form.location.longitude.trim() && longitude !== null && Number.isNaN(longitude)) {
    return { errorMessage: input.detailCopy.longitudeInvalidError };
  }
  return { payload: buildRecordPanelSavePayload({ ...input, latitude, longitude }) };
}

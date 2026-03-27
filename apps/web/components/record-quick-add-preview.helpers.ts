import type { QuickAddRecordDraft } from "./record-quick-add-bar.helpers.types";
import type { RecordQuickAddPreviewProps } from "./record-quick-add-preview.types";

export function shouldShowQuickAddPreview(draft: string) {
  return /^\s*(#|@|\d{4}[-/.]\d{1,2}[-/.]\d{1,2}|\d{1,2}:\d{2}(?::\d{2})?|today\b|yesterday\b|今天|昨天|\d(?:\/5|star|星|分)|\[|【)/i.test(
    draft,
  );
}

export function formatQuickAddPreviewTypeLabel(
  typeCode: QuickAddRecordDraft["type_code"],
  panelCopy: RecordQuickAddPreviewProps["panelCopy"],
) {
  if (typeCode === "food") {
    return panelCopy.food;
  }
  if (typeCode === "snack") {
    return panelCopy.snack;
  }
  if (typeCode === "bad_experience") {
    return panelCopy.badExperience;
  }
  return panelCopy.memo;
}

export function readQuickAddPreviewLocation(
  extraData: QuickAddRecordDraft["extra_data"],
) {
  const location =
    extraData &&
    typeof extraData.location === "object" &&
    extraData.location !== null
      ? (extraData.location as Record<string, unknown>)
      : null;

  return {
    placeName: typeof location?.place_name === "string" ? location.place_name : "",
    address: typeof location?.address === "string" ? location.address : "",
    latitude: typeof location?.latitude === "number" ? location.latitude : null,
    longitude: typeof location?.longitude === "number" ? location.longitude : null,
  };
}

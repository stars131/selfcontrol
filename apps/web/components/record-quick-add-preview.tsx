import { buildQuickAddRecordDraft } from "./record-quick-add-bar.helpers";
import type { RecordQuickAddPreviewProps } from "./record-quick-add-preview.types";

function shouldShowQuickAddPreview(draft: string) {
  return /^\s*(#|@|\d{4}[-/.]\d{1,2}[-/.]\d{1,2}|\d{1,2}:\d{2}(?::\d{2})?|today\b|yesterday\b|\u4eca\u5929|\u6628\u5929|\d(?:\/5|star|\u661f|\u5206)|\[|\u3010)/i.test(draft);
}

function formatTypeLabel(typeCode: string, panelCopy: RecordQuickAddPreviewProps["panelCopy"]) {
  if (typeCode === "food") return panelCopy.food;
  if (typeCode === "snack") return panelCopy.snack;
  if (typeCode === "bad_experience") return panelCopy.badExperience;
  return panelCopy.memo;
}

export function RecordQuickAddPreview({ draft, locale, panelCopy }: RecordQuickAddPreviewProps) {
  if (!shouldShowQuickAddPreview(draft.trim())) return null;
  const parsed = buildQuickAddRecordDraft(draft.trim());
  const contentPreview = parsed.content !== parsed.title ? parsed.content : "";
  const location = parsed.extra_data && typeof parsed.extra_data.location === "object" && parsed.extra_data.location !== null
    ? (parsed.extra_data.location as Record<string, unknown>)
    : null;
  const placeName = typeof location?.place_name === "string" ? location.place_name : "";
  const address = typeof location?.address === "string" ? location.address : "";
  const latitude = typeof location?.latitude === "number" ? location.latitude : null;
  const longitude = typeof location?.longitude === "number" ? location.longitude : null;

  return (
    <div className="tag-row" style={{ marginTop: 8 }}>
      <span className="tag">{panelCopy.quickAddPreview}</span>
      <span className="tag">{panelCopy.title}: {parsed.title}</span>
      {contentPreview ? <span className="tag">{panelCopy.content}: {contentPreview}</span> : null}
      <span className="tag">{formatTypeLabel(parsed.type_code, panelCopy)}</span>
      <span className="tag">{panelCopy.occurredAt}: {new Date(parsed.occurred_at ?? "").toLocaleString(locale)}</span>
      {parsed.rating !== null && parsed.rating !== undefined ? <span className="tag">{panelCopy.rating}: {parsed.rating}/5</span> : null}
      {placeName ? <span className="tag">{panelCopy.placeName}: {placeName}</span> : null}
      {address ? <span className="tag">{panelCopy.address}: {address}</span> : null}
      {latitude !== null && longitude !== null ? <span className="tag">{panelCopy.latitude}: {latitude}, {panelCopy.longitude}: {longitude}</span> : null}
    </div>
  );
}

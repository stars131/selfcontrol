import { buildQuickAddRecordDraft } from "./record-quick-add-bar.helpers";
import {
  formatQuickAddPreviewTypeLabel,
  readQuickAddPreviewLocation,
  shouldShowQuickAddPreview,
} from "./record-quick-add-preview.helpers";
import type { RecordQuickAddPreviewProps } from "./record-quick-add-preview.types";

export function RecordQuickAddPreview({ draft, locale, panelCopy }: RecordQuickAddPreviewProps) {
  if (!shouldShowQuickAddPreview(draft.trim())) return null;
  const parsed = buildQuickAddRecordDraft(draft.trim());
  const contentPreview = parsed.content !== parsed.title ? parsed.content : "";
  const { placeName, address, latitude, longitude } = readQuickAddPreviewLocation(parsed.extra_data);

  return (
    <div className="tag-row" style={{ marginTop: 8 }}>
      <span className="tag">{panelCopy.quickAddPreview}</span>
      <span className="tag">{panelCopy.title}: {parsed.title}</span>
      {contentPreview ? <span className="tag">{panelCopy.content}: {contentPreview}</span> : null}
      <span className="tag">{formatQuickAddPreviewTypeLabel(parsed.type_code, panelCopy)}</span>
      <span className="tag">{panelCopy.occurredAt}: {new Date(parsed.occurred_at ?? "").toLocaleString(locale)}</span>
      {parsed.rating !== null && parsed.rating !== undefined ? <span className="tag">{panelCopy.rating}: {parsed.rating}/5</span> : null}
      {placeName ? <span className="tag">{panelCopy.placeName}: {placeName}</span> : null}
      {address ? <span className="tag">{panelCopy.address}: {address}</span> : null}
      {latitude !== null && longitude !== null ? <span className="tag">{panelCopy.latitude}: {latitude}, {panelCopy.longitude}: {longitude}</span> : null}
    </div>
  );
}

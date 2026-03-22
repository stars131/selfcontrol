"use client";

export function MapPanelHeader({
  confirmedCount,
  isEditable,
  mappedCount,
  needsReviewCount,
}: {
  confirmedCount: number;
  isEditable: boolean;
  mappedCount: number;
  needsReviewCount: number;
}) {
  return (
    <>
      <div className="eyebrow">Map</div>
      <div className="muted" style={{ marginTop: 8 }}>
        {isEditable
          ? "Search an address or click the map to fill place details for the current record."
          : "Records with latitude and longitude appear here."}
      </div>
      <div className="tag-row">
        <span className="tag">{mappedCount} mapped</span>
        <span className="tag">{confirmedCount} confirmed</span>
        <span className="tag">{needsReviewCount} need review</span>
      </div>
    </>
  );
}

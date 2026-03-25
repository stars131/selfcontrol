"use client";

import type { MapStatusNoticesProps } from "./map-status-notices.types";

export function MapStatusNotices({
  draftCoordinates,
  draftLocation,
  isEditable,
  loadError,
  mappedRecordCount,
  searchError,
}: MapStatusNoticesProps) {
  return (
    <>
      {loadError ? (
        <div className="notice error" style={{ marginTop: 12 }}>
          {loadError}
        </div>
      ) : null}
      {searchError ? (
        <div className="notice error" style={{ marginTop: 12 }}>
          {searchError}
        </div>
      ) : null}
      {draftLocation?.latitude && draftLocation?.longitude ? (
        <div className="muted" style={{ marginTop: 12 }}>
          Current point: {draftLocation.latitude}, {draftLocation.longitude}
          {draftLocation.source ? ` | ${draftLocation.source}` : ""}
        </div>
      ) : null}
      {!mappedRecordCount && !draftCoordinates ? (
        <div className="notice" style={{ marginTop: 12 }}>
          {isEditable
            ? "No location selected yet. Search a place or click on the map to set one."
            : "No mapped records yet. Add latitude and longitude in the record editor."}
        </div>
      ) : null}
    </>
  );
}

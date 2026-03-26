"use client";

import type { MapStatusNoticesProps } from "./map-status-notices.types";

export function MapStatusNotices({
  currentPointLabel,
  draftCoordinates,
  draftLocation,
  draftLocationSourceLabel,
  isEditable,
  loadError,
  mappedRecordCount,
  noLocationSelectedLabel,
  noMappedRecordsLabel,
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
          {currentPointLabel}: {draftLocation.latitude}, {draftLocation.longitude}
          {draftLocationSourceLabel ? ` | ${draftLocationSourceLabel}` : ""}
        </div>
      ) : null}
      {!mappedRecordCount && !draftCoordinates ? (
        <div className="notice" style={{ marginTop: 12 }}>
          {isEditable ? noLocationSelectedLabel : noMappedRecordsLabel}
        </div>
      ) : null}
    </>
  );
}

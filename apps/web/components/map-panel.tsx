"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { RecordItem } from "../lib/types";

declare global {
  interface Window {
    AMap?: {
      Map: new (container: HTMLElement, options: Record<string, unknown>) => {
        clearMap?: () => void;
        setFitView?: () => void;
      };
      Marker: new (options: Record<string, unknown>) => {
        on?: (event: string, handler: () => void) => void;
        setMap?: (map: unknown) => void;
      };
    };
  }
}

type MappedRecord = {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
};

function parseMappedRecords(records: RecordItem[]): MappedRecord[] {
  return records
    .map((record) => {
      const raw = record.extra_data?.location;
      const location = typeof raw === "object" && raw !== null ? (raw as Record<string, unknown>) : {};
      const latitude = Number(location.latitude);
      const longitude = Number(location.longitude);

      if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
        return null;
      }

      return {
        id: record.id,
        title: record.title || record.content || "Untitled",
        latitude,
        longitude,
      };
    })
    .filter((item): item is MappedRecord => Boolean(item));
}

export function MapPanel({
  records,
  selectedRecordId,
  onSelectRecord,
}: {
  records: RecordItem[];
  selectedRecordId: string | null;
  onSelectRecord: (recordId: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<{
    clearMap?: () => void;
    setFitView?: () => void;
  } | null>(null);
  const [loadError, setLoadError] = useState("");
  const amapKey = process.env.NEXT_PUBLIC_AMAP_KEY;
  const mappedRecords = useMemo(() => parseMappedRecords(records), [records]);

  useEffect(() => {
    if (!amapKey || !containerRef.current) {
      return;
    }

    const initMap = () => {
      if (!window.AMap || !containerRef.current || mapRef.current) {
        return;
      }
      mapRef.current = new window.AMap.Map(containerRef.current, {
        zoom: 4,
        center: [105, 35],
        viewMode: "2D",
      });
    };

    if (window.AMap) {
      initMap();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${amapKey}`;
    script.async = true;
    script.onload = initMap;
    script.onerror = () => setLoadError("Failed to load AMap script");
    document.body.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, [amapKey]);

  useEffect(() => {
    if (!window.AMap || !mapRef.current) {
      return;
    }

    mapRef.current.clearMap?.();
    for (const record of mappedRecords) {
      const marker = new window.AMap.Marker({
        position: [record.longitude, record.latitude],
        title: record.title,
        label:
          selectedRecordId === record.id
            ? { content: `<div style="padding:4px 8px;">${record.title}</div>` }
            : undefined,
      });
      marker.on?.("click", () => onSelectRecord(record.id));
      marker.setMap?.(mapRef.current);
    }

    if (mappedRecords.length) {
      mapRef.current.setFitView?.();
    }
  }, [mappedRecords, onSelectRecord, selectedRecordId]);

  if (!amapKey) {
    return (
      <section className="record-card" style={{ marginTop: 20 }}>
        <div className="eyebrow">Map</div>
        <div className="notice" style={{ marginTop: 12 }}>
          AMap key is not configured. Add `NEXT_PUBLIC_AMAP_KEY` to `.env`.
        </div>
      </section>
    );
  }

  return (
    <section className="record-card" style={{ marginTop: 20 }}>
      <div className="eyebrow">Map</div>
      <div className="muted" style={{ marginTop: 8 }}>
        Records with latitude and longitude appear here.
      </div>
      {loadError ? (
        <div className="notice error" style={{ marginTop: 12 }}>
          {loadError}
        </div>
      ) : null}
      <div className="map-canvas" ref={containerRef} />
      {!mappedRecords.length ? (
        <div className="notice" style={{ marginTop: 12 }}>
          No mapped records yet. Add latitude and longitude in the record editor.
        </div>
      ) : null}
    </section>
  );
}

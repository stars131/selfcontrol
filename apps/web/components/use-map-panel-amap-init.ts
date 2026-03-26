"use client";
import { useEffect, useRef } from "react";
import { useStoredLocale } from "../lib/locale";
import { getRecordPanelUiBundle } from "../lib/record-panel-ui";
import { extractAddress, formatCoordinate, loadAmapScript, readLatitudeValue, readLongitudeValue } from "../lib/map-panel";
import type { UseMapPanelAmapInitInput } from "./use-map-panel-amap-init.types";

export function useMapPanelAmapInit({
  amapKey,
  containerRef,
  geocoderRef,
  mapRef,
  onDraftLocationChange,
  setLoadError,
}: UseMapPanelAmapInitInput) {
  const { locale } = useStoredLocale();
  const { panelCopy } = getRecordPanelUiBundle(locale);
  const onDraftLocationChangeRef = useRef(onDraftLocationChange);
  useEffect(() => {
    onDraftLocationChangeRef.current = onDraftLocationChange;
  }, [onDraftLocationChange]);
  useEffect(() => {
    if (!amapKey || !containerRef.current) {
      return;
    }
    let isCancelled = false;
    void loadAmapScript(amapKey, { browserOnlyLabel: panelCopy.mapBrowserOnly, scriptLoadFailedLabel: panelCopy.mapScriptLoadFailed })
      .then(() => {
        if (isCancelled || !window.AMap || !containerRef.current) {
          return;
        }

        if (!mapRef.current) {
          const mapInstance = new window.AMap.Map(containerRef.current, {
            zoom: 4,
            center: [105, 35],
            viewMode: "2D",
          });

          mapInstance.on?.("click", (event) => {
            const changeLocation = onDraftLocationChangeRef.current;
            if (!changeLocation || !geocoderRef.current || !event.lnglat) {
              return;
            }

            const longitude = readLongitudeValue(event.lnglat);
            const latitude = readLatitudeValue(event.lnglat);

            if (latitude === null || longitude === null) {
              return;
            }

            geocoderRef.current.getAddress?.([longitude, latitude], (_status, result) => {
              const { address, placeName } = extractAddress(result);
              changeLocation({
                place_name: placeName,
                address,
                latitude: formatCoordinate(latitude),
                longitude: formatCoordinate(longitude),
                source: "map",
              });
              mapRef.current?.setZoomAndCenter?.(15, [longitude, latitude]);
            });
          });

          mapRef.current = mapInstance;
        }

        if (!geocoderRef.current) {
          geocoderRef.current = new window.AMap.Geocoder({});
        }

        setLoadError("");
      })
      .catch((error: unknown) => {
        setLoadError(error instanceof Error ? error.message : panelCopy.mapLoadFailed);
      });

    return () => {
      isCancelled = true;
    };
  }, [amapKey, panelCopy.mapBrowserOnly, panelCopy.mapLoadFailed, panelCopy.mapScriptLoadFailed, setLoadError]);
}

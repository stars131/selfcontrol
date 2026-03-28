"use client";

import { useEffect } from "react";

import type { UseMapPanelAmapProps } from "./use-map-panel-amap.types";
import { useMapPanelAmapInit } from "./use-map-panel-amap-init";
import { useMapPanelAmapMarkers } from "./use-map-panel-amap-markers";

export function useMapPanelAmap(input: UseMapPanelAmapProps) {
  useMapPanelAmapInit(input);
  useMapPanelAmapMarkers(input);

  useEffect(() => {
    return () => {
      input.mapRef.current?.destroy?.();
      input.mapRef.current = null;
      input.geocoderRef.current = null;
    };
  }, []);
}

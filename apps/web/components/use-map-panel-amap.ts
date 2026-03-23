"use client";

import { useEffect } from "react";

import type { UseMapPanelAmapProps } from "./use-map-panel-amap.types";
import { useMapPanelAmapInit } from "./use-map-panel-amap-init";
import { useMapPanelAmapMarkers } from "./use-map-panel-amap-markers";

export function useMapPanelAmap(props: UseMapPanelAmapProps) {
  useMapPanelAmapInit(props);
  useMapPanelAmapMarkers(props);

  useEffect(() => {
    return () => {
      props.mapRef.current?.destroy?.();
      props.mapRef.current = null;
      props.geocoderRef.current = null;
    };
  }, []);
}

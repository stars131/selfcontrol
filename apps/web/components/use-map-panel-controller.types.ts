import { type AMapGeocoderInstance, type AMapMapInstance } from "../lib/map-panel"; import type { MapPanelProps } from "./map-panel.types";
export type UseMapPanelControllerProps = Omit<MapPanelProps, "onSelectRecord"> & { geocoderRef: { current: AMapGeocoderInstance | null }; mapRef: { current: AMapMapInstance | null } };

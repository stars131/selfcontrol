import fs from "node:fs";
import path from "node:path";

const mapPanelPath = path.resolve(process.cwd(), "components/map-panel.tsx");
const mapPanelSource = fs.readFileSync(mapPanelPath, "utf8");
const mapPanelLineCount = mapPanelSource.split(/\r?\n/).length;

if (!mapPanelSource.includes('from "../lib/map-panel";')) {
  throw new Error("map-panel.tsx must import shared helpers from ../lib/map-panel");
}

if (!mapPanelSource.includes('import { useMapPanelController } from "./use-map-panel-controller";')) {
  throw new Error("map-panel.tsx must import useMapPanelController");
}

if (!mapPanelSource.includes('import { useMapPanelAmap } from "./use-map-panel-amap";')) {
  throw new Error("map-panel.tsx must import useMapPanelAmap");
}

if (!mapPanelSource.includes('import { MapPanelContent } from "./map-panel-content";')) {
  throw new Error("map-panel.tsx must import MapPanelContent");
}

if (!mapPanelSource.includes('import { MapPanelUnavailableNotice } from "./map-panel-unavailable-notice";')) {
  throw new Error("map-panel.tsx must import MapPanelUnavailableNotice");
}

if (!mapPanelSource.includes('import type { MapPanelProps } from "./map-panel.types";')) {
  throw new Error("map-panel.tsx must import MapPanelProps");
}

if (!mapPanelSource.includes("<MapPanelContent")) {
  throw new Error("map-panel.tsx must delegate main map layout rendering to MapPanelContent");
}

if (!mapPanelSource.includes("<MapPanelUnavailableNotice")) {
  throw new Error("map-panel.tsx must delegate missing-key rendering to MapPanelUnavailableNotice");
}

if (!mapPanelSource.includes("useMapPanelController({")) {
  throw new Error("map-panel.tsx must delegate map search and filter orchestration to useMapPanelController");
}

if (!mapPanelSource.includes("useMapPanelAmap({")) {
  throw new Error("map-panel.tsx must delegate AMap lifecycle wiring to useMapPanelAmap");
}

for (const forbiddenToken of [
  "function loadAmapScript",
  "function escapeHtml",
  "function formatCoordinate",
  "function readLatitudeValue",
  "function readLongitudeValue",
  "function parseMappedRecords",
  "function extractAddress",
  "function parseDraftCoordinates",
  "let amapLoaderPromise",
  "interface Window",
  "useEffect(",
  "useState(",
  "useMemo(",
  "const handleSearch =",
  "const handleApplyFilter =",
  "const handleUseMappedOnly =",
  "const handleClearFilter =",
  'value={filterDraft.placeQuery}',
  'value={filterDraft.mappedOnly}',
  'value={filterDraft.reviewStatus}',
  'mappedRecords.slice(0, 8).map((record)',
  'value={searchQuery}',
  'Current point:',
  'No location selected yet.',
  '{mappedRecords.length} mapped',
  '{confirmedCount} confirmed',
  'import { MapDrilldownCard } from "./map-drilldown-card";',
  'import { MappedRecordsList } from "./mapped-records-list";',
  'import { MapSearchForm } from "./map-search-form";',
  'import { MapStatusNotices } from "./map-status-notices";',
  'import { MapPanelHeader } from "./map-panel-header";',
  "<MapDrilldownCard",
  "<MappedRecordsList",
  "<MapSearchForm",
  "<MapStatusNotices",
  "<MapPanelHeader",
  "AMap key is not configured.",
]) {
  if (mapPanelSource.includes(forbiddenToken)) {
    throw new Error(`map-panel.tsx must not reintroduce extracted helper logic: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 120;
if (mapPanelLineCount > maxAllowedLines) {
  throw new Error(`map-panel.tsx exceeded ${maxAllowedLines} lines: ${mapPanelLineCount}`);
}

console.log("map-panel structure verification passed");

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

if (!mapPanelSource.includes('import { MapDrilldownCard } from "./map-drilldown-card";')) {
  throw new Error("map-panel.tsx must import MapDrilldownCard");
}

if (!mapPanelSource.includes('import { MappedRecordsList } from "./mapped-records-list";')) {
  throw new Error("map-panel.tsx must import MappedRecordsList");
}

if (!mapPanelSource.includes('import { MapSearchForm } from "./map-search-form";')) {
  throw new Error("map-panel.tsx must import MapSearchForm");
}

if (!mapPanelSource.includes('import { MapStatusNotices } from "./map-status-notices";')) {
  throw new Error("map-panel.tsx must import MapStatusNotices");
}

if (!mapPanelSource.includes("useMapPanelController({")) {
  throw new Error("map-panel.tsx must delegate map search and filter orchestration to useMapPanelController");
}

if (!mapPanelSource.includes("<MapDrilldownCard")) {
  throw new Error("map-panel.tsx must delegate drill-down filter rendering to MapDrilldownCard");
}

if (!mapPanelSource.includes("<MappedRecordsList")) {
  throw new Error("map-panel.tsx must delegate mapped-record rendering to MappedRecordsList");
}

if (!mapPanelSource.includes("<MapSearchForm")) {
  throw new Error("map-panel.tsx must delegate search-form rendering to MapSearchForm");
}

if (!mapPanelSource.includes("<MapStatusNotices")) {
  throw new Error("map-panel.tsx must delegate status rendering to MapStatusNotices");
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
]) {
  if (mapPanelSource.includes(forbiddenToken)) {
    throw new Error(`map-panel.tsx must not reintroduce extracted helper logic: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 255;
if (mapPanelLineCount > maxAllowedLines) {
  throw new Error(`map-panel.tsx exceeded ${maxAllowedLines} lines: ${mapPanelLineCount}`);
}

console.log("map-panel structure verification passed");

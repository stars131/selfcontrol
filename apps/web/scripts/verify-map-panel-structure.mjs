import fs from "node:fs";
import path from "node:path";

const mapPanelPath = path.resolve(process.cwd(), "components/map-panel.tsx");
const mapPanelControllerPath = path.resolve(process.cwd(), "components/use-map-panel-controller.ts");
const mapPanelAmapPath = path.resolve(process.cwd(), "components/use-map-panel-amap.ts");
const mapPanelControllerActionsPath = path.resolve(
  process.cwd(),
  "components/map-panel-controller-actions.ts",
);
const mapPanelContentPath = path.resolve(process.cwd(), "components/map-panel-content.tsx");
const mapPanelContentViewPath = path.resolve(
  process.cwd(),
  "components/map-panel-content-view.ts",
);
const mapPanelContentViewTypesPath = path.resolve(
  process.cwd(),
  "components/map-panel-content-view.types.ts",
);
const mapPanelControllerStatePath = path.resolve(
  process.cwd(),
  "components/use-map-panel-controller-state.ts",
);
const mapPanelAmapInitPath = path.resolve(
  process.cwd(),
  "components/use-map-panel-amap-init.ts",
);
const mapPanelUnavailableNoticePath = path.resolve(
  process.cwd(),
  "components/map-panel-unavailable-notice.tsx",
);
const mapPanelSource = fs.readFileSync(mapPanelPath, "utf8");
const mapPanelControllerSource = fs.readFileSync(mapPanelControllerPath, "utf8");
const mapPanelAmapSource = fs.readFileSync(mapPanelAmapPath, "utf8");
const mapPanelControllerActionsSource = fs.readFileSync(mapPanelControllerActionsPath, "utf8");
const mapPanelContentSource = fs.readFileSync(mapPanelContentPath, "utf8");
const mapPanelContentViewSource = fs.readFileSync(mapPanelContentViewPath, "utf8");
const mapPanelContentViewTypesSource = fs.readFileSync(mapPanelContentViewTypesPath, "utf8");
const mapPanelControllerStateSource = fs.readFileSync(mapPanelControllerStatePath, "utf8");
const mapPanelAmapInitSource = fs.readFileSync(mapPanelAmapInitPath, "utf8");
const mapPanelUnavailableNoticeSource = fs.readFileSync(mapPanelUnavailableNoticePath, "utf8");
const mapPanelLineCount = mapPanelSource.split(/\r?\n/).length;
const mapPanelControllerLineCount = mapPanelControllerSource.split(/\r?\n/).length;
const mapPanelAmapLineCount = mapPanelAmapSource.split(/\r?\n/).length;
const mapPanelControllerActionsLineCount = mapPanelControllerActionsSource.split(/\r?\n/).length;
const mapPanelContentLineCount = mapPanelContentSource.split(/\r?\n/).length;
const mapPanelContentViewLineCount = mapPanelContentViewSource.split(/\r?\n/).length;
const mapPanelContentViewTypesLineCount = mapPanelContentViewTypesSource.split(/\r?\n/).length;
const mapPanelControllerStateLineCount = mapPanelControllerStateSource.split(/\r?\n/).length;
const mapPanelAmapInitLineCount = mapPanelAmapInitSource.split(/\r?\n/).length;
const mapPanelUnavailableNoticeLineCount = mapPanelUnavailableNoticeSource.split(/\r?\n/).length;

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

for (const requiredContentImport of [
  'import { useStoredLocale } from "../lib/locale";',
  'import { getRecordPanelUiBundle } from "../lib/record-panel-ui";',
  'import { buildMapPanelContentViewProps } from "./map-panel-content-view";',
  'import { MapDrilldownCard } from "./map-drilldown-card";',
  'import { MapPanelHeader } from "./map-panel-header";',
  'import { MapSearchForm } from "./map-search-form";',
  'import { MapStatusNotices } from "./map-status-notices";',
  'import { MappedRecordsList } from "./mapped-records-list";',
  'import type { MapPanelContentProps } from "./map-panel-content.types";',
]) {
  if (!mapPanelContentSource.includes(requiredContentImport)) {
    throw new Error(`map-panel-content.tsx must import delegated map-content dependencies: ${requiredContentImport}`);
  }
}

for (const requiredContentUsage of [
  "const { locale } = useStoredLocale();",
  "const { panelCopy } = getRecordPanelUiBundle(locale);",
  "const view = buildMapPanelContentViewProps({",
  "<MapPanelHeader {...view.headerProps} />",
  "<MapDrilldownCard {...view.drilldownCardProps} />",
  "{view.showSearchForm ? (",
  "<MapSearchForm {...view.searchFormProps} />",
  "<MapStatusNotices {...view.statusNoticesProps} />",
  "<MappedRecordsList {...view.mappedRecordsListProps} />",
]) {
  if (!mapPanelContentSource.includes(requiredContentUsage)) {
    throw new Error(`map-panel-content.tsx must delegate content prop assembly: ${requiredContentUsage}`);
  }
}

for (const forbiddenContentToken of [
  'from "../lib/location-source-display";',
  "confirmedCount={controller.confirmedCount}",
  "filterDraft={controller.filterDraft}",
  "draftCoordinates={controller.draftCoordinates}",
  "draftLocationSourceLabel={getLocationSourceLabel(",
  "mappedRecords={controller.mappedRecords}",
  "searchQuery={controller.searchQuery}",
]) {
  if (mapPanelContentSource.includes(forbiddenContentToken)) {
    throw new Error(`map-panel-content.tsx must keep map content view assembly delegated: ${forbiddenContentToken}`);
  }
}

if (mapPanelContentLineCount > 45) {
  throw new Error(`map-panel-content.tsx exceeded 45 lines: ${mapPanelContentLineCount}`);
}

for (const requiredContentViewImport of [
  'from "../lib/location-source-display";',
  'from "./map-panel-content-view.types";',
]) {
  if (!mapPanelContentViewSource.includes(requiredContentViewImport)) {
    throw new Error(`map-panel-content-view.ts must import shared map-content view types: ${requiredContentViewImport}`);
  }
}

for (const requiredContentViewUsage of [
  "export function buildMapPanelContentViewProps(",
  "headerProps: {",
  "drilldownCardProps: {",
  "searchFormProps: {",
  "showSearchForm: input.controller.isEditable,",
  "statusNoticesProps: {",
  "draftLocationSourceLabel: getLocationSourceLabel(input.draftLocation?.source, input.panelCopy),",
  "mappedRecordsListProps: {",
]) {
  if (!mapPanelContentViewSource.includes(requiredContentViewUsage)) {
    throw new Error(`map-panel-content-view.ts must own map content prop assembly: ${requiredContentViewUsage}`);
  }
}

for (const forbiddenContentViewToken of [
  'from "../lib/locale";',
  'from "../lib/record-panel-ui";',
  "<MapPanelHeader",
  "<MapDrilldownCard",
  "<MapSearchForm",
  "<MapStatusNotices",
  "<MappedRecordsList",
]) {
  if (mapPanelContentViewSource.includes(forbiddenContentViewToken)) {
    throw new Error(`map-panel-content-view.ts must stay as a pure prop builder: ${forbiddenContentViewToken}`);
  }
}

if (mapPanelContentViewLineCount > 70) {
  throw new Error(`map-panel-content-view.ts exceeded 70 lines: ${mapPanelContentViewLineCount}`);
}

for (const requiredContentViewTypesUsage of [
  'import type { PanelCopy } from "../lib/record-panel-ui";',
  "export type MapPanelContentViewInput =",
  "export type MapPanelContentViewProps = {",
]) {
  if (!mapPanelContentViewTypesSource.includes(requiredContentViewTypesUsage)) {
    throw new Error(`map-panel-content-view.types.ts must own map-content view contracts: ${requiredContentViewTypesUsage}`);
  }
}

if (mapPanelContentViewTypesLineCount > 3) {
  throw new Error(
    `map-panel-content-view.types.ts exceeded 3 lines: ${mapPanelContentViewTypesLineCount}`,
  );
}

for (const requiredUnavailableNoticeUsage of [
  'import { useStoredLocale } from "../lib/locale";',
  'import { getRecordPanelUiBundle } from "../lib/record-panel-ui";',
  "const { locale } = useStoredLocale();",
  "const { panelCopy } = getRecordPanelUiBundle(locale);",
  "panelCopy.mapTitle",
  "panelCopy.mapUnavailable",
]) {
  if (!mapPanelUnavailableNoticeSource.includes(requiredUnavailableNoticeUsage)) {
    throw new Error(`map-panel-unavailable-notice.tsx must localize missing-key messaging: ${requiredUnavailableNoticeUsage}`);
  }
}

const maxUnavailableNoticeLines = 16;
if (mapPanelUnavailableNoticeLineCount > maxUnavailableNoticeLines) {
  throw new Error(
    `map-panel-unavailable-notice.tsx exceeded ${maxUnavailableNoticeLines} lines: ${mapPanelUnavailableNoticeLineCount}`,
  );
}

for (const requiredControllerImport of [
  'from "./map-panel-controller-actions";',
  'from "./use-map-panel-derived-data";',
  'from "./use-map-panel-controller-state";',
  'from "./use-map-panel-sync";',
]) {
  if (!mapPanelControllerSource.includes(requiredControllerImport)) {
    throw new Error(`use-map-panel-controller.ts must import delegated controller helpers: ${requiredControllerImport}`);
  }
}

for (const requiredControllerUsage of [
  'import { useStoredLocale } from "../lib/locale";',
  'import { getRecordPanelUiBundle } from "../lib/record-panel-ui";',
  "createMapPanelControllerActions({",
  "useMapPanelDerivedData({",
  "useMapPanelControllerState(locationFilter)",
  "useMapPanelSync({",
  "const { locale } = useStoredLocale();",
  "const { panelCopy } = getRecordPanelUiBundle(locale);",
  "panelCopy.mapSearchFailed",
  "panelCopy.mapNoMatchingLocation",
  "panelCopy.mapSearchCoordinatesError",
]) {
  if (!mapPanelControllerSource.includes(requiredControllerUsage)) {
    throw new Error(`use-map-panel-controller.ts must delegate controller helper logic: ${requiredControllerUsage}`);
  }
}

for (const forbiddenControllerToken of [
  'from "./map-panel-controller-filter";',
  'from "./map-panel-controller-search";',
  "useState(",
  "const handleSearch =",
  "const handleApplyFilter =",
  "const handleUseMappedOnly =",
  "const handleClearFilter =",
]) {
  if (mapPanelControllerSource.includes(forbiddenControllerToken)) {
    throw new Error(`use-map-panel-controller.ts must keep state and action internals delegated: ${forbiddenControllerToken}`);
  }
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

const maxControllerLines = 120;
if (mapPanelControllerLineCount > maxControllerLines) {
  throw new Error(
    `use-map-panel-controller.ts exceeded ${maxControllerLines} lines: ${mapPanelControllerLineCount}`,
  );
}

for (const requiredControllerActionsUsage of [
  'from "./map-panel-controller-filter";',
  'from "./map-panel-controller-search";',
  "export function createMapPanelControllerActions({",
  "searchMapPanelLocation({",
  "noMatchingLocationLabel",
  "searchCoordinatesErrorLabel",
  "searchFailedLabel",
  "buildMappedOnlyLocationFilter(filterDraft)",
  "buildClearedLocationFilter()",
]) {
  if (!mapPanelControllerActionsSource.includes(requiredControllerActionsUsage)) {
    throw new Error(`map-panel-controller-actions.ts must own controller action wiring: ${requiredControllerActionsUsage}`);
  }
}

const maxControllerActionsLines = 85;
if (mapPanelControllerActionsLineCount > maxControllerActionsLines) {
  throw new Error(
    `map-panel-controller-actions.ts exceeded ${maxControllerActionsLines} lines: ${mapPanelControllerActionsLineCount}`,
  );
}

for (const requiredControllerStateUsage of [
  'import { useState } from "react";',
  "export function useMapPanelControllerState(locationFilter: LocationFilterState)",
  "const [loadError, setLoadError] = useState(\"\");",
  "const [filterDraft, setFilterDraft] = useState<LocationFilterState>(locationFilter);",
]) {
  if (!mapPanelControllerStateSource.includes(requiredControllerStateUsage)) {
    throw new Error(`use-map-panel-controller-state.ts must own controller state registration: ${requiredControllerStateUsage}`);
  }
}

const maxControllerStateLines = 30;
if (mapPanelControllerStateLineCount > maxControllerStateLines) {
  throw new Error(
    `use-map-panel-controller-state.ts exceeded ${maxControllerStateLines} lines: ${mapPanelControllerStateLineCount}`,
  );
}

for (const requiredAmapInitUsage of [
  'import { useStoredLocale } from "../lib/locale";',
  'import { getRecordPanelUiBundle } from "../lib/record-panel-ui";',
  "const { locale } = useStoredLocale();",
  "const { panelCopy } = getRecordPanelUiBundle(locale);",
  "panelCopy.mapBrowserOnly",
  "panelCopy.mapScriptLoadFailed",
  "panelCopy.mapLoadFailed",
  "loadAmapScript(amapKey, {",
]) {
  if (!mapPanelAmapInitSource.includes(requiredAmapInitUsage)) {
    throw new Error(`use-map-panel-amap-init.ts must localize map load errors: ${requiredAmapInitUsage}`);
  }
}

const maxAmapInitLines = 95;
if (mapPanelAmapInitLineCount > maxAmapInitLines) {
  throw new Error(`use-map-panel-amap-init.ts exceeded ${maxAmapInitLines} lines: ${mapPanelAmapInitLineCount}`);
}

for (const requiredAmapImport of [
  'from "./use-map-panel-amap.types";',
  'from "./use-map-panel-amap-init";',
  'from "./use-map-panel-amap-markers";',
]) {
  if (!mapPanelAmapSource.includes(requiredAmapImport)) {
    throw new Error(`use-map-panel-amap.ts must import delegated AMap helpers: ${requiredAmapImport}`);
  }
}

for (const requiredAmapUsage of [
  "useMapPanelAmapInit(input)",
  "useMapPanelAmapMarkers(input)",
  "input.mapRef.current?.destroy?.()",
  "input.geocoderRef.current = null",
]) {
  if (!mapPanelAmapSource.includes(requiredAmapUsage)) {
    throw new Error(`use-map-panel-amap.ts must delegate AMap orchestration: ${requiredAmapUsage}`);
  }
}

for (const forbiddenAmapToken of [
  'from "../lib/map-panel";',
  "useRef(",
  "loadAmapScript(",
  "extractAddress(",
  "formatCoordinate(",
  "readLatitudeValue(",
  "readLongitudeValue(",
  "escapeHtml(",
  "new window.AMap.Map(",
  "new window.AMap.Marker(",
  "mapRef.current.clearMap?.()",
  'mapInstance.on?.("click"',
]) {
  if (mapPanelAmapSource.includes(forbiddenAmapToken)) {
    throw new Error(`use-map-panel-amap.ts must keep init and marker details delegated: ${forbiddenAmapToken}`);
  }
}

const maxAmapLines = 30;
if (mapPanelAmapLineCount > maxAmapLines) {
  throw new Error(`use-map-panel-amap.ts exceeded ${maxAmapLines} lines: ${mapPanelAmapLineCount}`);
}

console.log("map-panel structure verification passed");

import fs from "node:fs";
import path from "node:path";

function readSource(relativePath) {
  return fs.readFileSync(path.resolve(process.cwd(), relativePath), "utf8");
}

function verifyLineLimit(relativePath, maxAllowedLines) {
  const lineCount = readSource(relativePath).split(/\r?\n/).length;
  if (lineCount > maxAllowedLines) {
    throw new Error(`${relativePath} exceeded ${maxAllowedLines} lines: ${lineCount}`);
  }
}

const editorWorkspacePath = "components/record-editor-workspace.tsx";
const editorWorkspaceSource = readSource(editorWorkspacePath);
const editorWorkspaceBindingsPath = "components/record-editor-workspace-bindings.ts";
const editorWorkspaceBindingsSource = readSource(editorWorkspaceBindingsPath);
const editorFieldBindingsPath = "components/record-editor-field-bindings.ts";
const editorFieldBindingsSource = readSource(editorFieldBindingsPath);
const editorLocationReviewBindingsPath = "components/record-editor-location-review-bindings.ts";
const editorLocationReviewBindingsSource = readSource(editorLocationReviewBindingsPath);
const editorSupportToolsPath = "components/record-editor-support-tools.tsx";
const editorSupportToolsSource = readSource(editorSupportToolsPath);
const editorSupportToolsPropsPath = "components/record-editor-support-tools-props.ts";
const editorSupportToolsPropsSource = readSource(editorSupportToolsPropsPath);
const editorWorkspaceSectionsPropsPath = "components/record-editor-workspace-sections-props.ts";
const editorWorkspaceSectionsPropsSource = readSource(editorWorkspaceSectionsPropsPath);
const editorWorkspaceMainSectionsPropsPath =
  "components/record-editor-workspace-main-sections-props.ts";
const editorWorkspaceMainSectionsPropsSource = readSource(editorWorkspaceMainSectionsPropsPath);
const editorWorkspaceSupportToolsPropsPath =
  "components/record-editor-workspace-support-tools-props.ts";
const editorWorkspaceSupportToolsPropsSource = readSource(editorWorkspaceSupportToolsPropsPath);
const reminderToolsPath = "components/record-reminder-tools.tsx";
const reminderToolsSource = readSource(reminderToolsPath);

if (!editorWorkspaceSource.includes('from "./record-editor-workspace-bindings";')) {
  throw new Error("record-editor-workspace.tsx must import record-editor-workspace-bindings");
}

if (!editorWorkspaceSource.includes('import type { RecordEditorWorkspaceProps } from "./record-editor-workspace.types";')) {
  throw new Error("record-editor-workspace.tsx must import RecordEditorWorkspaceProps from record-editor-workspace.types");
}

if (!editorWorkspaceSource.includes('import { RecordEditorMainSections } from "./record-editor-main-sections";')) {
  throw new Error("record-editor-workspace.tsx must import RecordEditorMainSections");
}

if (!editorWorkspaceSource.includes('import { RecordEditorSupportTools } from "./record-editor-support-tools";')) {
  throw new Error("record-editor-workspace.tsx must import RecordEditorSupportTools");
}

if (!editorWorkspaceSource.includes('from "./record-editor-workspace-sections-props";')) {
  throw new Error("record-editor-workspace.tsx must import record-editor-workspace-sections-props");
}

if (!editorWorkspaceSource.includes("<RecordEditorMainSections")) {
  throw new Error("record-editor-workspace.tsx must delegate main editor section rendering");
}

if (!editorWorkspaceSource.includes("<RecordEditorSupportTools")) {
  throw new Error("record-editor-workspace.tsx must delegate support tool rendering");
}

if (!editorWorkspaceSource.includes("buildRecordEditorMainSectionsProps({")) {
  throw new Error("record-editor-workspace.tsx must delegate main-section prop assembly");
}

if (!editorWorkspaceSource.includes("buildRecordEditorSupportToolsProps(props)")) {
  throw new Error("record-editor-workspace.tsx must delegate support-tools prop assembly");
}

for (const requiredWorkspaceBindingsExport of [
  'export { createRecordEditorFieldBindings } from "./record-editor-field-bindings";',
  'export { createLocationReviewBindings } from "./record-editor-location-review-bindings";',
]) {
  if (!editorWorkspaceBindingsSource.includes(requiredWorkspaceBindingsExport)) {
    throw new Error(
      `record-editor-workspace-bindings.ts must remain a stable re-export boundary: ${requiredWorkspaceBindingsExport}`,
    );
  }
}

for (const requiredSectionsPropsExport of [
  'export { buildRecordEditorMainSectionsProps } from "./record-editor-workspace-main-sections-props";',
  'export { buildRecordEditorSupportToolsProps } from "./record-editor-workspace-support-tools-props";',
]) {
  if (!editorWorkspaceSectionsPropsSource.includes(requiredSectionsPropsExport)) {
    throw new Error(
      `record-editor-workspace-sections-props.ts must remain a stable re-export boundary: ${requiredSectionsPropsExport}`,
    );
  }
}

for (const forbiddenToken of ["setForm((", "setLocationReviewForm(("]) {
  if (editorWorkspaceSource.includes(forbiddenToken)) {
    throw new Error(`record-editor-workspace.tsx must keep state-update closures in bindings helpers: ${forbiddenToken}`);
  }
}

for (const forbiddenToken of [
  "<LocationReviewPanel",
  "<RecordMediaTools",
  "<RecordReminderTools",
  "<RecordEditorFields",
  "authToken={authToken}",
  "canWriteWorkspace={canWriteWorkspace}",
  "fieldBindings={fieldBindings}",
  "selectedRecord={selectedRecord}",
]) {
  if (editorWorkspaceSource.includes(forbiddenToken)) {
    throw new Error(`record-editor-workspace.tsx must keep child section composition delegated: ${forbiddenToken}`);
  }
}

for (const forbiddenToken of ["type RecordEditorWorkspaceProps = {", "mediaIssueCopy: import("]) {
  if (editorWorkspaceSource.includes(forbiddenToken)) {
    throw new Error(`record-editor-workspace.tsx must keep its props contract delegated: ${forbiddenToken}`);
  }
}

verifyLineLimit(editorWorkspacePath, 110);
verifyLineLimit(editorWorkspaceBindingsPath, 10);
verifyLineLimit(editorWorkspaceSectionsPropsPath, 10);

for (const requiredFieldBindingsImport of [
  'import type { RecordFormState } from "../lib/record-panel-forms";',
]) {
  if (!editorFieldBindingsSource.includes(requiredFieldBindingsImport)) {
    throw new Error(
      `record-editor-field-bindings.ts must import field binding contracts: ${requiredFieldBindingsImport}`,
    );
  }
}

for (const requiredFieldBindingsUsage of [
  "export function createRecordEditorFieldBindings(",
  "location: { ...prev.location, address: value, source: \"manual\" }",
  "location: { ...prev.location, latitude: value, source: \"manual\" }",
  "location: { ...prev.location, longitude: value, source: \"manual\" }",
  "location: { ...prev.location, place_name: value, source: \"manual\" }",
]) {
  if (!editorFieldBindingsSource.includes(requiredFieldBindingsUsage)) {
    throw new Error(
      `record-editor-field-bindings.ts must own form field binding updates: ${requiredFieldBindingsUsage}`,
    );
  }
}

verifyLineLimit(editorFieldBindingsPath, 70);

for (const requiredLocationReviewBindingsImport of [
  'import type { LocationReviewFormState } from "../lib/record-panel-forms";',
]) {
  if (!editorLocationReviewBindingsSource.includes(requiredLocationReviewBindingsImport)) {
    throw new Error(
      `record-editor-location-review-bindings.ts must import review binding contracts: ${requiredLocationReviewBindingsImport}`,
    );
  }
}

for (const requiredLocationReviewBindingsUsage of [
  "export function createLocationReviewBindings(",
  'status: "confirmed"',
  'status: "needs_review"',
  'status: "pending"',
  "note: value",
]) {
  if (!editorLocationReviewBindingsSource.includes(requiredLocationReviewBindingsUsage)) {
    throw new Error(
      `record-editor-location-review-bindings.ts must own location-review binding updates: ${requiredLocationReviewBindingsUsage}`,
    );
  }
}

verifyLineLimit(editorLocationReviewBindingsPath, 45);

for (const requiredMainSectionsPropsImport of [
  'import { RecordEditorMainSections } from "./record-editor-main-sections";',
  'import type { RecordEditorWorkspaceProps } from "./record-editor-workspace.types";',
]) {
  if (!editorWorkspaceMainSectionsPropsSource.includes(requiredMainSectionsPropsImport)) {
    throw new Error(
      `record-editor-workspace-main-sections-props.ts must import main-section prop contracts: ${requiredMainSectionsPropsImport}`,
    );
  }
}

for (const requiredMainSectionsPropsUsage of [
  "export function buildRecordEditorMainSectionsProps({",
  "fieldBindings",
  "locationReviewBindings",
  "formatHistoryTimestampLabel: props.formatHistoryTimestampLabel",
  "summarizeHistoryActionLabel: props.summarizeHistoryActionLabel",
]) {
  if (!editorWorkspaceMainSectionsPropsSource.includes(requiredMainSectionsPropsUsage)) {
    throw new Error(
      `record-editor-workspace-main-sections-props.ts must own main-section prop mapping: ${requiredMainSectionsPropsUsage}`,
    );
  }
}

verifyLineLimit(editorWorkspaceMainSectionsPropsPath, 35);

for (const requiredSupportToolsPropsImport of [
  'import { RecordEditorSupportTools } from "./record-editor-support-tools";',
  'import type { RecordEditorWorkspaceProps } from "./record-editor-workspace.types";',
]) {
  if (!editorWorkspaceSupportToolsPropsSource.includes(requiredSupportToolsPropsImport)) {
    throw new Error(
      `record-editor-workspace-support-tools-props.ts must import support-tools prop contracts: ${requiredSupportToolsPropsImport}`,
    );
  }
}

for (const requiredSupportToolsPropsUsage of [
  "export function buildRecordEditorSupportToolsProps(",
  "authToken: props.authToken",
  "mediaIssueCopy: props.mediaIssueCopy",
  "selectedRecordMediaSizeLabel: props.selectedRecordMediaSizeLabel",
  "workspaceId: props.workspaceId",
]) {
  if (!editorWorkspaceSupportToolsPropsSource.includes(requiredSupportToolsPropsUsage)) {
    throw new Error(
      `record-editor-workspace-support-tools-props.ts must own support-tools prop mapping: ${requiredSupportToolsPropsUsage}`,
    );
  }
}

verifyLineLimit(editorWorkspaceSupportToolsPropsPath, 90);

if (!editorSupportToolsSource.includes('import type { RecordEditorSupportToolsProps } from "./record-editor-support-tools.types";')) {
  throw new Error("record-editor-support-tools.tsx must import RecordEditorSupportToolsProps from record-editor-support-tools.types");
}

if (!editorSupportToolsSource.includes('from "./record-editor-support-tools-props";')) {
  throw new Error("record-editor-support-tools.tsx must import support-tools prop builders");
}

if (!editorSupportToolsSource.includes("buildRecordMediaToolsProps(props)")) {
  throw new Error("record-editor-support-tools.tsx must delegate media tool prop assembly");
}

if (!editorSupportToolsSource.includes("buildRecordReminderToolsProps(props)")) {
  throw new Error("record-editor-support-tools.tsx must delegate reminder tool prop assembly");
}

for (const requiredPropsExport of [
  'export { buildRecordMediaToolsProps } from "./record-editor-support-tools-media-props";',
  'export { buildRecordReminderToolsProps } from "./record-editor-support-tools-reminder-props";',
]) {
  if (!editorSupportToolsPropsSource.includes(requiredPropsExport)) {
    throw new Error(`record-editor-support-tools-props.ts must remain a stable re-export boundary: ${requiredPropsExport}`);
  }
}

for (const forbiddenToken of ["<RecordMediaTools\n        allTrackedFilesPresentLabel", "<RecordReminderTools\n        canWriteWorkspace"]) {
  if (editorSupportToolsSource.includes(forbiddenToken)) {
    throw new Error(`record-editor-support-tools.tsx must keep child prop assembly delegated: ${forbiddenToken}`);
  }
}

verifyLineLimit(editorSupportToolsPath, 120);
verifyLineLimit(editorSupportToolsPropsPath, 20);

if (!reminderToolsSource.includes('import type { RecordReminderToolsProps } from "./record-reminder-tools.types";')) {
  throw new Error("record-reminder-tools.tsx must import RecordReminderToolsProps from record-reminder-tools.types");
}

if (!reminderToolsSource.includes('import { createRecordReminderBindings } from "./record-reminder-tools-bindings";')) {
  throw new Error("record-reminder-tools.tsx must import createRecordReminderBindings");
}

if (!reminderToolsSource.includes('import { buildRecordReminderPanelProps } from "./record-reminder-tools-panel-props";')) {
  throw new Error("record-reminder-tools.tsx must import buildRecordReminderPanelProps");
}

if (!reminderToolsSource.includes("createRecordReminderBindings({ onUpdateReminder, setReminderForm })")) {
  throw new Error("record-reminder-tools.tsx must delegate reminder form bindings");
}

if (!reminderToolsSource.includes("buildRecordReminderPanelProps({ bindings, props })")) {
  throw new Error("record-reminder-tools.tsx must delegate reminder panel prop assembly");
}

for (const forbiddenToken of [
  "onMarkReminderDone={(reminder)",
  "onMessageChange={(value)",
  "onRemindAtChange={(value)",
  "onTitleChange={(value)",
  "canWriteWorkspace={canWriteWorkspace}",
  "channelInApp={channelInApp}",
  "createReminderLabel={createReminderLabel}",
]) {
  if (reminderToolsSource.includes(forbiddenToken)) {
    throw new Error(`record-reminder-tools.tsx must keep reminder bindings delegated: ${forbiddenToken}`);
  }
}

verifyLineLimit(reminderToolsPath, 110);

const browseWorkspacePath = "components/record-browse-workspace.tsx";
const browseWorkspaceSource = readSource(browseWorkspacePath);
const recordSearchPanelPath = "components/record-search-panel.tsx";
const recordSearchPanelSource = readSource(recordSearchPanelPath);
const recordSearchPanelTypesPath = "components/record-search-panel.types.ts";
const recordSearchPanelTypesSource = readSource(recordSearchPanelTypesPath);
const recordSearchPanelFilterFieldsPath = "components/record-search-panel-filter-fields.tsx";
const recordSearchPanelFilterFieldsSource = readSource(recordSearchPanelFilterFieldsPath);
const recordSearchPanelPresetControlsPath = "components/record-search-panel-preset-controls.tsx";
const recordSearchPanelPresetControlsSource = readSource(recordSearchPanelPresetControlsPath);

if (!browseWorkspaceSource.includes('import type { RecordBrowseWorkspaceProps } from "./record-browse-workspace.types";')) {
  throw new Error("record-browse-workspace.tsx must import RecordBrowseWorkspaceProps from record-browse-workspace.types");
}

if (!browseWorkspaceSource.includes('from "./record-browse-workspace-props";')) {
  throw new Error("record-browse-workspace.tsx must import record-browse-workspace-props");
}

if (!browseWorkspaceSource.includes("buildRecordSearchPanelProps(props)")) {
  throw new Error("record-browse-workspace.tsx must delegate search panel prop assembly");
}

if (!browseWorkspaceSource.includes("buildMapPanelProps(props)")) {
  throw new Error("record-browse-workspace.tsx must delegate map panel prop assembly");
}

if (!browseWorkspaceSource.includes("buildRecordResultsViewProps(props)")) {
  throw new Error("record-browse-workspace.tsx must delegate results view prop assembly");
}

for (const forbiddenToken of ["useState(", "useEffect(", "useMemo(", "fetchMediaBlob(", "const handle"]) {
  if (browseWorkspaceSource.includes(forbiddenToken)) {
    throw new Error(`record-browse-workspace.tsx must remain a composition shell: ${forbiddenToken}`);
  }
}

for (const forbiddenToken of [
  "type RecordBrowseWorkspaceProps = {",
  "Dispatch<SetStateAction<",
  "onAvoidOnlyChange={(value)",
  "onQueryChange={(value)",
  "onTypeCodeChange={(value)",
  "<MapPanel\n        records=",
  "<RecordResultsView\n        avoidLabel=",
]) {
  if (browseWorkspaceSource.includes(forbiddenToken)) {
    throw new Error(`record-browse-workspace.tsx must keep its props contract delegated: ${forbiddenToken}`);
  }
}

verifyLineLimit(browseWorkspacePath, 120);

if (!recordSearchPanelSource.includes('import { RecordSearchPanelFilterFields } from "./record-search-panel-filter-fields";')) {
  throw new Error("record-search-panel.tsx must import RecordSearchPanelFilterFields");
}

if (!recordSearchPanelSource.includes('import { RecordSearchPanelPresetControls } from "./record-search-panel-preset-controls";')) {
  throw new Error("record-search-panel.tsx must import RecordSearchPanelPresetControls");
}

if (!recordSearchPanelSource.includes('import type { RecordSearchPanelProps } from "./record-search-panel.types";')) {
  throw new Error("record-search-panel.tsx must import RecordSearchPanelProps from record-search-panel.types");
}

for (const requiredSearchPanelUsage of [
  "<RecordSearchPanelFilterFields",
  "<RecordSearchPanelPresetControls",
]) {
  if (!recordSearchPanelSource.includes(requiredSearchPanelUsage)) {
    throw new Error(`record-search-panel.tsx must delegate child section rendering: ${requiredSearchPanelUsage}`);
  }
}

for (const forbiddenSearchPanelToken of [
  'import type { PanelCopy } from "../lib/record-panel-ui";',
  'import type { RecordFilterState } from "../lib/types";',
  "type RecordSearchPanelProps = {",
  'className="inline-fields"',
  'panelCopy.textQueryPlaceholder',
  'panelCopy.presetPlaceholder',
]) {
  if (recordSearchPanelSource.includes(forbiddenSearchPanelToken)) {
    throw new Error(`record-search-panel.tsx must keep field and preset internals delegated: ${forbiddenSearchPanelToken}`);
  }
}

verifyLineLimit(recordSearchPanelPath, 60);

for (const requiredSearchPanelTypesUsage of [
  "export type RecordSearchPanelProps = {",
  "filterDraft: RecordFilterState;",
  "onAvoidOnlyChange: (value: RecordFilterState[\"avoidOnly\"]) => void;",
]) {
  if (!recordSearchPanelTypesSource.includes(requiredSearchPanelTypesUsage)) {
    throw new Error(`record-search-panel.types.ts must own shared search panel prop contracts: ${requiredSearchPanelTypesUsage}`);
  }
}

verifyLineLimit(recordSearchPanelTypesPath, 25);

for (const requiredFilterFieldsImport of [
  'import type { RecordSearchPanelProps } from "./record-search-panel.types";',
]) {
  if (!recordSearchPanelFilterFieldsSource.includes(requiredFilterFieldsImport)) {
    throw new Error(`record-search-panel-filter-fields.tsx must import RecordSearchPanelProps: ${requiredFilterFieldsImport}`);
  }
}

for (const requiredFilterFieldsUsage of [
  "export function RecordSearchPanelFilterFields({",
  "panelCopy.textQuery",
  "panelCopy.textQueryPlaceholder",
  "panelCopy.badExperience",
  "panelCopy.nonAvoidOnly",
]) {
  if (!recordSearchPanelFilterFieldsSource.includes(requiredFilterFieldsUsage)) {
    throw new Error(`record-search-panel-filter-fields.tsx must own filter field rendering: ${requiredFilterFieldsUsage}`);
  }
}

verifyLineLimit(recordSearchPanelFilterFieldsPath, 60);

for (const requiredPresetControlsImport of [
  'import type { RecordSearchPanelProps } from "./record-search-panel.types";',
]) {
  if (!recordSearchPanelPresetControlsSource.includes(requiredPresetControlsImport)) {
    throw new Error(`record-search-panel-preset-controls.tsx must import RecordSearchPanelProps: ${requiredPresetControlsImport}`);
  }
}

for (const requiredPresetControlsUsage of [
  "export function RecordSearchPanelPresetControls({",
  "panelCopy.presetName",
  "panelCopy.presetPlaceholder",
  "panelCopy.saveCurrentFilter",
  "panelCopy.savingPreset",
]) {
  if (!recordSearchPanelPresetControlsSource.includes(requiredPresetControlsUsage)) {
    throw new Error(`record-search-panel-preset-controls.tsx must own preset control rendering: ${requiredPresetControlsUsage}`);
  }
}

verifyLineLimit(recordSearchPanelPresetControlsPath, 50);

console.log("record workspaces verification passed");

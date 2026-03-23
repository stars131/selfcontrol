import fs from "node:fs";
import path from "node:path";

const recordPanelPath = path.resolve(process.cwd(), "components/record-panel-v2.tsx");
const legacyRecordPanelPath = path.resolve(process.cwd(), "components/record-panel.tsx");
const recordPanelWorkspacePropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-workspace-props.ts",
);
const recordPanelEditorWorkspacePropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-props.ts",
);
const recordPanelShellPropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-shell-props.ts",
);
const recordPanelControllerPath = path.resolve(process.cwd(), "components/use-record-panel-controller.ts");
const recordPanelRecordHandlersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-handlers.ts",
);
const recordPanelFormActionsPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-form-actions.ts",
);
const recordPanelRecordSubmitActionsPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-submit-actions.ts",
);
const recordPanelMediaHandlersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-handlers.ts",
);
const recordPanelMediaAssetActionsPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-asset-actions.ts",
);
const legacyRecordPanelSource = fs.readFileSync(legacyRecordPanelPath, "utf8");
const source = fs.readFileSync(recordPanelPath, "utf8");
const workspacePropsSource = fs.readFileSync(recordPanelWorkspacePropsPath, "utf8");
const editorWorkspacePropsSource = fs.readFileSync(recordPanelEditorWorkspacePropsPath, "utf8");
const shellPropsSource = fs.readFileSync(recordPanelShellPropsPath, "utf8");
const controllerSource = fs.readFileSync(recordPanelControllerPath, "utf8");
const recordHandlersSource = fs.readFileSync(recordPanelRecordHandlersPath, "utf8");
const formActionsSource = fs.readFileSync(recordPanelFormActionsPath, "utf8");
const recordSubmitActionsSource = fs.readFileSync(recordPanelRecordSubmitActionsPath, "utf8");
const mediaAssetActionsSource = fs.readFileSync(recordPanelMediaAssetActionsPath, "utf8");
const mediaHandlersSource = fs.readFileSync(recordPanelMediaHandlersPath, "utf8");
const normalizedLines = source.split(/\r?\n/);
const legacyRecordPanelLines = legacyRecordPanelSource.split(/\r?\n/).length;
const workspacePropsLines = workspacePropsSource.split(/\r?\n/).length;
const editorWorkspacePropsLines = editorWorkspacePropsSource.split(/\r?\n/).length;
const shellPropsLines = shellPropsSource.split(/\r?\n/).length;
const controllerLines = controllerSource.split(/\r?\n/).length;
const recordHandlersLines = recordHandlersSource.split(/\r?\n/).length;
const formActionsLines = formActionsSource.split(/\r?\n/).length;
const recordSubmitActionsLines = recordSubmitActionsSource.split(/\r?\n/).length;
const mediaAssetActionsLines = mediaAssetActionsSource.split(/\r?\n/).length;
const mediaHandlersLines = mediaHandlersSource.split(/\r?\n/).length;

if (!source.includes('import { useRecordPanelController } from "./use-record-panel-controller";')) {
  throw new Error("record-panel-v2.tsx must import useRecordPanelController");
}

if (!source.includes('from "./record-panel-v2-workspace-props";')) {
  throw new Error("record-panel-v2.tsx must import record-panel-v2-workspace-props");
}

if (!source.includes('from "./record-panel-v2-shell-props";')) {
  throw new Error("record-panel-v2.tsx must import record-panel-v2-shell-props");
}

if (!source.includes('import { RecordPanelHeader } from "./record-panel-header";')) {
  throw new Error("record-panel-v2.tsx must import RecordPanelHeader");
}

if (!source.includes("useRecordPanelController(")) {
  throw new Error("record-panel-v2.tsx must delegate controller logic to useRecordPanelController");
}

if (!source.includes("const controller = useRecordPanelController({")) {
  if (!source.includes("const controller = useRecordPanelController(buildRecordPanelControllerInput(props));")) {
    throw new Error("record-panel-v2.tsx must keep controller state grouped behind a controller object");
  }
}

if (!source.includes("buildRecordBrowseWorkspaceProps({")) {
  if (!source.includes("buildRecordBrowseWorkspaceProps(")) {
    throw new Error("record-panel-v2.tsx must delegate browse workspace prop shaping to buildRecordBrowseWorkspaceProps");
  }
}

if (!source.includes("buildRecordEditorWorkspaceProps({")) {
  if (!source.includes("buildRecordEditorWorkspaceProps(")) {
    throw new Error("record-panel-v2.tsx must delegate editor workspace prop shaping to buildRecordEditorWorkspaceProps");
  }
}

if (!source.includes("buildRecordPanelHeaderProps({")) {
  throw new Error("record-panel-v2.tsx must delegate header prop shaping to buildRecordPanelHeaderProps");
}

if (!source.includes("buildRecordBrowseWorkspaceInput({ controller, props })")) {
  throw new Error("record-panel-v2.tsx must delegate browse workspace input shaping to buildRecordBrowseWorkspaceInput");
}

if (!source.includes("buildRecordEditorWorkspaceInput({ controller, props })")) {
  throw new Error("record-panel-v2.tsx must delegate editor workspace input shaping to buildRecordEditorWorkspaceInput");
}

if (!source.includes("<RecordPanelHeader")) {
  throw new Error("record-panel-v2.tsx must delegate top header rendering to RecordPanelHeader");
}

for (const requiredWorkspacePropsExport of [
  'export { buildRecordBrowseWorkspaceProps } from "./record-panel-v2-browse-workspace-props";',
  'export { buildRecordEditorWorkspaceProps } from "./record-panel-v2-editor-workspace-props";',
]) {
  if (!workspacePropsSource.includes(requiredWorkspacePropsExport)) {
    throw new Error(`record-panel-v2-workspace-props.ts must remain a stable re-export boundary: ${requiredWorkspacePropsExport}`);
  }
}

for (const forbiddenToken of [
  "useState(",
  "useEffect(",
  "useMemo(",
  "useStoredLocale(",
  "fetchMediaBlob(",
  "const handle",
  "const {\n    locale,",
  "authToken: props.authToken,",
  "onCreateRecord={() => props.onSelectRecord(null)}",
  "<RecordBrowseWorkspace\n          applyPresetLabel=",
  "<RecordEditorWorkspace\n          authToken=",
  '<div className="eyebrow">{panelCopy.workspace}</div>',
  "{panelCopy.structuredResults}",
  "{panelCopy.newRecord}",
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`record-panel-v2.tsx must remain a thin shell; found forbidden token: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 125;
if (normalizedLines.length > maxAllowedLines) {
  throw new Error(`record-panel-v2.tsx exceeded ${maxAllowedLines} lines: ${normalizedLines.length}`);
}

const maxWorkspacePropsLines = 20;
if (workspacePropsLines > maxWorkspacePropsLines) {
  throw new Error(
    `record-panel-v2-workspace-props.ts exceeded ${maxWorkspacePropsLines} lines: ${workspacePropsLines}`,
  );
}

for (const requiredEditorWorkspacePropsImport of [
  'from "./record-panel-v2-workspace-props.types";',
  'from "./record-panel-v2-editor-workspace-action-props";',
  'from "./record-panel-v2-editor-workspace-copy-props";',
]) {
  if (!editorWorkspacePropsSource.includes(requiredEditorWorkspacePropsImport)) {
    throw new Error(`record-panel-v2-editor-workspace-props.ts must import delegated editor prop helpers: ${requiredEditorWorkspacePropsImport}`);
  }
}

for (const requiredEditorWorkspacePropsUsage of [
  "buildRecordEditorWorkspaceCopyProps({ detailCopy })",
  "buildRecordEditorWorkspaceActionProps({",
  "...copyProps",
  "...actionProps",
]) {
  if (!editorWorkspacePropsSource.includes(requiredEditorWorkspacePropsUsage)) {
    throw new Error(`record-panel-v2-editor-workspace-props.ts must delegate editor prop assembly: ${requiredEditorWorkspacePropsUsage}`);
  }
}

for (const forbiddenEditorWorkspacePropsToken of [
  "channelInAppLabel: detailCopy.channelInApp",
  "onBulkRetryAllDeadLetter: () => handleBulkRetryDeadLetter(\"all\")",
  "reminderSectionDescription: detailCopy.reminderSectionDescription",
]) {
  if (editorWorkspacePropsSource.includes(forbiddenEditorWorkspacePropsToken)) {
    throw new Error(`record-panel-v2-editor-workspace-props.ts must keep copy/action internals delegated: ${forbiddenEditorWorkspacePropsToken}`);
  }
}

const maxEditorWorkspacePropsLines = 130;
if (editorWorkspacePropsLines > maxEditorWorkspacePropsLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-props.ts exceeded ${maxEditorWorkspacePropsLines} lines: ${editorWorkspacePropsLines}`,
  );
}

for (const requiredShellPropsExport of [
  'export { buildRecordBrowseWorkspaceInput } from "./record-panel-v2-browse-workspace-input";',
  'export { buildRecordPanelControllerInput } from "./record-panel-v2-controller-input";',
  'export { buildRecordEditorWorkspaceInput } from "./record-panel-v2-editor-workspace-input";',
  'export { buildRecordPanelHeaderProps } from "./record-panel-v2-header-props";',
]) {
  if (!shellPropsSource.includes(requiredShellPropsExport)) {
    throw new Error(`record-panel-v2-shell-props.ts must remain a stable re-export boundary: ${requiredShellPropsExport}`);
  }
}

const maxShellPropsLines = 10;
if (shellPropsLines > maxShellPropsLines) {
  throw new Error(
    `record-panel-v2-shell-props.ts exceeded ${maxShellPropsLines} lines: ${shellPropsLines}`,
  );
}

for (const requiredControllerImport of [
  'from "./record-panel-controller.types";',
  'from "./record-panel-controller-record-handlers";',
  'from "./record-panel-controller-media-handlers";',
  'from "./use-record-panel-controller-sync";',
  'from "./use-record-panel-controller-state";',
  'from "./use-record-panel-controller-view-data";',
]) {
  if (!controllerSource.includes(requiredControllerImport)) {
    throw new Error(`use-record-panel-controller.ts must import delegated controller helpers: ${requiredControllerImport}`);
  }
}

for (const requiredControllerUsage of [
  "useRecordPanelControllerSync({",
  "useRecordPanelControllerViewData({",
  "useRecordPanelControllerState(recordFilter)",
  "createRecordPanelControllerRecordHandlers({",
  "createRecordPanelControllerMediaHandlers({",
  "...recordHandlers",
  "...mediaHandlers",
]) {
  if (!controllerSource.includes(requiredControllerUsage)) {
    throw new Error(`use-record-panel-controller.ts must delegate controller orchestration: ${requiredControllerUsage}`);
  }
}

for (const forbiddenControllerToken of [
  'from "../lib/api";',
  "useEffect(",
  "useMemo(",
  "useState(",
  "const handle",
  "fetchMediaBlob(",
  "event.preventDefault()",
  "URL.createObjectURL(",
  "setSelectedDeadLetterIds((current)",
]) {
  if (controllerSource.includes(forbiddenControllerToken)) {
    throw new Error(`use-record-panel-controller.ts must keep sync and handler details delegated: ${forbiddenControllerToken}`);
  }
}

const maxControllerLines = 200;
if (controllerLines > maxControllerLines) {
  throw new Error(`use-record-panel-controller.ts exceeded ${maxControllerLines} lines: ${controllerLines}`);
}

for (const requiredRecordHandlersImport of [
  'from "./record-panel-controller-filter-actions";',
  'from "./record-panel-controller-form-actions";',
]) {
  if (!recordHandlersSource.includes(requiredRecordHandlersImport)) {
    throw new Error(`record-panel-controller-record-handlers.ts must import delegated record helpers: ${requiredRecordHandlersImport}`);
  }
}

for (const requiredRecordHandlersUsage of [
  "createRecordPanelControllerFormActions(props)",
  "createRecordPanelControllerFilterActions(props)",
  "...formActions",
  "...filterActions",
]) {
  if (!recordHandlersSource.includes(requiredRecordHandlersUsage)) {
    throw new Error(`record-panel-controller-record-handlers.ts must delegate record handler assembly: ${requiredRecordHandlersUsage}`);
  }
}

for (const forbiddenRecordHandlersToken of [
  'from "../lib/record-panel-forms";',
  "const handleSubmit",
  "const handleApplyFilter",
  "event.preventDefault()",
  "onSaveRecord(",
  "onCreateSearchPreset(",
]) {
  if (recordHandlersSource.includes(forbiddenRecordHandlersToken)) {
    throw new Error(`record-panel-controller-record-handlers.ts must keep record internals delegated: ${forbiddenRecordHandlersToken}`);
  }
}

const maxRecordHandlersLines = 20;
if (recordHandlersLines > maxRecordHandlersLines) {
  throw new Error(
    `record-panel-controller-record-handlers.ts exceeded ${maxRecordHandlersLines} lines: ${recordHandlersLines}`,
  );
}

for (const requiredFormActionsImport of [
  'from "./record-panel-controller-record-submit-actions";',
  'from "./record-panel-controller-reminder-actions";',
]) {
  if (!formActionsSource.includes(requiredFormActionsImport)) {
    throw new Error(`record-panel-controller-form-actions.ts must import delegated form helpers: ${requiredFormActionsImport}`);
  }
}

for (const requiredFormActionsUsage of [
  "createRecordPanelControllerRecordSubmitActions(props)",
  "createRecordPanelControllerReminderActions(props)",
  "...recordSubmitActions",
  "...reminderActions",
]) {
  if (!formActionsSource.includes(requiredFormActionsUsage)) {
    throw new Error(`record-panel-controller-form-actions.ts must delegate form action assembly: ${requiredFormActionsUsage}`);
  }
}

for (const forbiddenFormActionsToken of [
  'from "../lib/record-panel-forms";',
  "const handleSubmit",
  "const handleDelete",
  "const handleCreateReminderSubmit",
  "event.preventDefault()",
  "onSaveRecord(",
  "onCreateReminder(",
  "onDeleteRecord(",
]) {
  if (formActionsSource.includes(forbiddenFormActionsToken)) {
    throw new Error(`record-panel-controller-form-actions.ts must keep form/reminder internals delegated: ${forbiddenFormActionsToken}`);
  }
}

const maxFormActionsLines = 20;
if (formActionsLines > maxFormActionsLines) {
  throw new Error(
    `record-panel-controller-form-actions.ts exceeded ${maxFormActionsLines} lines: ${formActionsLines}`,
  );
}

for (const requiredRecordSubmitActionsImport of [
  'from "./record-panel-controller-record-delete-actions";',
  'from "./record-panel-controller-record-save-actions";',
]) {
  if (!recordSubmitActionsSource.includes(requiredRecordSubmitActionsImport)) {
    throw new Error(`record-panel-controller-record-submit-actions.ts must import delegated submit helpers: ${requiredRecordSubmitActionsImport}`);
  }
}

for (const requiredRecordSubmitActionsUsage of [
  "createRecordPanelControllerRecordSaveActions(props)",
  "createRecordPanelControllerRecordDeleteActions(props)",
  "...recordSaveActions",
  "...recordDeleteActions",
]) {
  if (!recordSubmitActionsSource.includes(requiredRecordSubmitActionsUsage)) {
    throw new Error(`record-panel-controller-record-submit-actions.ts must delegate submit action assembly: ${requiredRecordSubmitActionsUsage}`);
  }
}

for (const forbiddenRecordSubmitActionsToken of [
  'from "../lib/record-panel-forms";',
  'from "../lib/record-panel-detail";',
  "const handleSubmit",
  "const handleDelete",
  "event.preventDefault()",
  "onSaveRecord(",
  "onDeleteRecord(",
]) {
  if (recordSubmitActionsSource.includes(forbiddenRecordSubmitActionsToken)) {
    throw new Error(`record-panel-controller-record-submit-actions.ts must keep save/delete internals delegated: ${forbiddenRecordSubmitActionsToken}`);
  }
}

const maxRecordSubmitActionsLines = 20;
if (recordSubmitActionsLines > maxRecordSubmitActionsLines) {
  throw new Error(
    `record-panel-controller-record-submit-actions.ts exceeded ${maxRecordSubmitActionsLines} lines: ${recordSubmitActionsLines}`,
  );
}

for (const requiredMediaAssetActionsImport of [
  'from "./record-panel-controller-media-file-actions";',
  'from "./record-panel-controller-media-status-actions";',
]) {
  if (!mediaAssetActionsSource.includes(requiredMediaAssetActionsImport)) {
    throw new Error(`record-panel-controller-media-asset-actions.ts must import delegated media-asset helpers: ${requiredMediaAssetActionsImport}`);
  }
}

for (const requiredMediaAssetActionsUsage of [
  "createRecordPanelControllerMediaFileActions(props)",
  "createRecordPanelControllerMediaStatusActions(props)",
  "...mediaFileActions",
  "...mediaStatusActions",
]) {
  if (!mediaAssetActionsSource.includes(requiredMediaAssetActionsUsage)) {
    throw new Error(`record-panel-controller-media-asset-actions.ts must delegate media-asset action assembly: ${requiredMediaAssetActionsUsage}`);
  }
}

for (const forbiddenMediaAssetActionsToken of [
  'from "../lib/api";',
  'from "../lib/record-panel-detail";',
  "const handleUpload",
  "const handleRefreshMedia",
  "const handleRetryMediaProcessing",
  "const handleDownloadMedia",
  "const handleDeleteMediaAsset",
  "fetchMediaBlob(",
  "onRefreshMediaStatus(",
  "onRetryMedia(",
]) {
  if (mediaAssetActionsSource.includes(forbiddenMediaAssetActionsToken)) {
    throw new Error(`record-panel-controller-media-asset-actions.ts must keep media file/status internals delegated: ${forbiddenMediaAssetActionsToken}`);
  }
}

const maxMediaAssetActionsLines = 20;
if (mediaAssetActionsLines > maxMediaAssetActionsLines) {
  throw new Error(
    `record-panel-controller-media-asset-actions.ts exceeded ${maxMediaAssetActionsLines} lines: ${mediaAssetActionsLines}`,
  );
}

for (const requiredMediaHandlersImport of [
  'from "./record-panel-controller-dead-letter-actions";',
  'from "./record-panel-controller-media-asset-actions";',
]) {
  if (!mediaHandlersSource.includes(requiredMediaHandlersImport)) {
    throw new Error(`record-panel-controller-media-handlers.ts must import delegated media helpers: ${requiredMediaHandlersImport}`);
  }
}

for (const requiredMediaHandlersUsage of [
  "createRecordPanelControllerMediaAssetActions(props)",
  "createRecordPanelControllerDeadLetterActions(props)",
  "...mediaAssetActions",
  "...deadLetterActions",
]) {
  if (!mediaHandlersSource.includes(requiredMediaHandlersUsage)) {
    throw new Error(`record-panel-controller-media-handlers.ts must delegate media handler assembly: ${requiredMediaHandlersUsage}`);
  }
}

for (const forbiddenMediaHandlersToken of [
  'from "../lib/api";',
  'from "../lib/record-panel-media";',
  "const handleUpload",
  "const handleToggleDeadLetterSelection",
  "fetchMediaBlob(",
  "canRetryMediaIssue(",
]) {
  if (mediaHandlersSource.includes(forbiddenMediaHandlersToken)) {
    throw new Error(`record-panel-controller-media-handlers.ts must keep media internals delegated: ${forbiddenMediaHandlersToken}`);
  }
}

const maxMediaHandlersLines = 20;
if (mediaHandlersLines > maxMediaHandlersLines) {
  throw new Error(
    `record-panel-controller-media-handlers.ts exceeded ${maxMediaHandlersLines} lines: ${mediaHandlersLines}`,
  );
}

for (const requiredLegacyImport of [
  'import { createRecordPanelLegacyActions } from "./record-panel-legacy-actions";',
  'import { RecordPanelLegacyForm } from "./record-panel-legacy-form";',
  'import { RecordPanelLegacyList } from "./record-panel-legacy-list";',
  'import { useRecordPanelLegacyState } from "./record-panel-legacy-state";',
  'import { RecordPanelLegacyStats } from "./record-panel-legacy-stats";',
  'import { useRecordPanelLegacySync } from "./record-panel-legacy-sync";',
  'import type { RecordPanelProps } from "./record-panel.types";',
]) {
  if (!legacyRecordPanelSource.includes(requiredLegacyImport)) {
    throw new Error(`record-panel.tsx must import delegated legacy helpers: ${requiredLegacyImport}`);
  }
}

for (const requiredLegacyUsage of [
  "useRecordPanelLegacyState()",
  "useRecordPanelLegacySync({ selectedRecord, setForm })",
  "createRecordPanelLegacyActions({",
  "<RecordPanelLegacyStats",
  "<RecordPanelLegacyForm",
  "<RecordPanelLegacyList",
]) {
  if (!legacyRecordPanelSource.includes(requiredLegacyUsage)) {
    throw new Error(`record-panel.tsx must compose delegated legacy sections: ${requiredLegacyUsage}`);
  }
}

for (const forbiddenLegacyToken of [
  'import type { MediaAsset, RecordItem } from "../lib/types";',
  'className="panel-header"',
  'className="stats-grid"',
  'className="record-card form-stack"',
  'className="record-list compact-list"',
  "useEffect(",
  "useState(",
  "const EMPTY_FORM",
  "const handleSubmit",
  "const handleDelete",
  "const handleUpload",
  "records.map((record) => (",
  "mediaAssets.map((asset) => (",
]) {
  if (legacyRecordPanelSource.includes(forbiddenLegacyToken)) {
    throw new Error(`record-panel.tsx must keep legacy layout details delegated: ${forbiddenLegacyToken}`);
  }
}

const maxLegacyRecordPanelLines = 150;
if (legacyRecordPanelLines > maxLegacyRecordPanelLines) {
  throw new Error(
    `record-panel.tsx exceeded ${maxLegacyRecordPanelLines} lines: ${legacyRecordPanelLines}`,
  );
}

console.log("record-panel structure verification passed");

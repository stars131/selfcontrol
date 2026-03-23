import fs from "node:fs";
import path from "node:path";

const recordPanelPath = path.resolve(process.cwd(), "components/record-panel-v2.tsx");
const recordPanelWorkspacePropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-workspace-props.ts",
);
const recordPanelControllerPath = path.resolve(process.cwd(), "components/use-record-panel-controller.ts");
const source = fs.readFileSync(recordPanelPath, "utf8");
const workspacePropsSource = fs.readFileSync(recordPanelWorkspacePropsPath, "utf8");
const controllerSource = fs.readFileSync(recordPanelControllerPath, "utf8");
const normalizedLines = source.split(/\r?\n/);
const workspacePropsLines = workspacePropsSource.split(/\r?\n/).length;
const controllerLines = controllerSource.split(/\r?\n/).length;

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

for (const requiredControllerImport of [
  'from "./record-panel-controller.types";',
  'from "./record-panel-controller-record-handlers";',
  'from "./record-panel-controller-media-handlers";',
  'from "./use-record-panel-controller-sync";',
]) {
  if (!controllerSource.includes(requiredControllerImport)) {
    throw new Error(`use-record-panel-controller.ts must import delegated controller helpers: ${requiredControllerImport}`);
  }
}

for (const requiredControllerUsage of [
  "useRecordPanelControllerSync({",
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

const maxControllerLines = 220;
if (controllerLines > maxControllerLines) {
  throw new Error(`use-record-panel-controller.ts exceeded ${maxControllerLines} lines: ${controllerLines}`);
}

console.log("record-panel structure verification passed");

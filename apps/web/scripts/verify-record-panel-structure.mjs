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
const recordPanelEditorWorkspaceBasePropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-base-props.ts",
);
const recordPanelEditorWorkspaceBasePropsTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-base-props.types.ts",
);
const recordPanelShellPropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-shell-props.ts",
);
const recordPanelControllerPath = path.resolve(process.cwd(), "components/use-record-panel-controller.ts");
const recordPanelControllerResultPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-result.ts",
);
const recordPanelControllerHandlerGroupsPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-handler-groups.ts",
);
const recordPanelRecordHandlersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-handlers.ts",
);
const recordPanelHandlerGroupInputsPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-handler-group-inputs.ts",
);
const recordPanelFormActionsPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-form-actions.ts",
);
const recordPanelFilterActionsPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-filter-actions.ts",
);
const recordPanelFilterHelpersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-filter-helpers.ts",
);
const recordPanelRecordSubmitActionsPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-submit-actions.ts",
);
const recordPanelRecordSaveActionsPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-save-actions.ts",
);
const recordPanelRecordSaveHelpersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-save-helpers.ts",
);
const recordPanelReminderActionsPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-reminder-actions.ts",
);
const recordPanelReminderHelpersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-reminder-helpers.ts",
);
const recordPanelMediaStatusActionsPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-status-actions.ts",
);
const recordPanelMediaStatusHelpersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-status-helpers.ts",
);
const recordPanelMediaHandlersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-handlers.ts",
);
const recordPanelMediaAssetActionsPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-asset-actions.ts",
);
const legacyRecordPanelFormPath = path.resolve(process.cwd(), "components/record-panel-legacy-form.tsx");
const legacyRecordPanelFormTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-form.types.ts",
);
const legacyRecordPanelFormFieldsPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-form-fields.tsx",
);
const legacyRecordPanelFormMediaPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-form-media.tsx",
);
const legacyRecordPanelSource = fs.readFileSync(legacyRecordPanelPath, "utf8");
const legacyRecordPanelFormSource = fs.readFileSync(legacyRecordPanelFormPath, "utf8");
const legacyRecordPanelFormTypesSource = fs.readFileSync(legacyRecordPanelFormTypesPath, "utf8");
const legacyRecordPanelFormFieldsSource = fs.readFileSync(legacyRecordPanelFormFieldsPath, "utf8");
const legacyRecordPanelFormMediaSource = fs.readFileSync(legacyRecordPanelFormMediaPath, "utf8");
const source = fs.readFileSync(recordPanelPath, "utf8");
const workspacePropsSource = fs.readFileSync(recordPanelWorkspacePropsPath, "utf8");
const editorWorkspacePropsSource = fs.readFileSync(recordPanelEditorWorkspacePropsPath, "utf8");
const editorWorkspaceBasePropsSource = fs.readFileSync(
  recordPanelEditorWorkspaceBasePropsPath,
  "utf8",
);
const editorWorkspaceBasePropsTypesSource = fs.readFileSync(
  recordPanelEditorWorkspaceBasePropsTypesPath,
  "utf8",
);
const shellPropsSource = fs.readFileSync(recordPanelShellPropsPath, "utf8");
const controllerSource = fs.readFileSync(recordPanelControllerPath, "utf8");
const controllerResultSource = fs.readFileSync(recordPanelControllerResultPath, "utf8");
const recordHandlersSource = fs.readFileSync(recordPanelRecordHandlersPath, "utf8");
const handlerGroupInputsSource = fs.readFileSync(recordPanelHandlerGroupInputsPath, "utf8");
const formActionsSource = fs.readFileSync(recordPanelFormActionsPath, "utf8");
const filterActionsSource = fs.readFileSync(recordPanelFilterActionsPath, "utf8");
const filterHelpersSource = fs.readFileSync(recordPanelFilterHelpersPath, "utf8");
const recordSubmitActionsSource = fs.readFileSync(recordPanelRecordSubmitActionsPath, "utf8");
const recordSaveActionsSource = fs.readFileSync(recordPanelRecordSaveActionsPath, "utf8");
const recordSaveHelpersSource = fs.readFileSync(recordPanelRecordSaveHelpersPath, "utf8");
const reminderActionsSource = fs.readFileSync(recordPanelReminderActionsPath, "utf8");
const reminderHelpersSource = fs.readFileSync(recordPanelReminderHelpersPath, "utf8");
const mediaStatusActionsSource = fs.readFileSync(recordPanelMediaStatusActionsPath, "utf8");
const mediaStatusHelpersSource = fs.readFileSync(recordPanelMediaStatusHelpersPath, "utf8");
const mediaAssetActionsSource = fs.readFileSync(recordPanelMediaAssetActionsPath, "utf8");
const mediaHandlersSource = fs.readFileSync(recordPanelMediaHandlersPath, "utf8");
const normalizedLines = source.split(/\r?\n/);
const legacyRecordPanelLines = legacyRecordPanelSource.split(/\r?\n/).length;
const legacyRecordPanelFormLines = legacyRecordPanelFormSource.split(/\r?\n/).length;
const legacyRecordPanelFormTypesLines = legacyRecordPanelFormTypesSource.split(/\r?\n/).length;
const legacyRecordPanelFormFieldsLines = legacyRecordPanelFormFieldsSource.split(/\r?\n/).length;
const legacyRecordPanelFormMediaLines = legacyRecordPanelFormMediaSource.split(/\r?\n/).length;
const workspacePropsLines = workspacePropsSource.split(/\r?\n/).length;
const editorWorkspacePropsLines = editorWorkspacePropsSource.split(/\r?\n/).length;
const editorWorkspaceBasePropsLines = editorWorkspaceBasePropsSource.split(/\r?\n/).length;
const editorWorkspaceBasePropsTypesLines =
  editorWorkspaceBasePropsTypesSource.split(/\r?\n/).length;
const shellPropsLines = shellPropsSource.split(/\r?\n/).length;
const controllerLines = controllerSource.split(/\r?\n/).length;
const controllerResultLines = controllerResultSource.split(/\r?\n/).length;
const recordHandlersLines = recordHandlersSource.split(/\r?\n/).length;
const handlerGroupInputsLines = handlerGroupInputsSource.split(/\r?\n/).length;
const formActionsLines = formActionsSource.split(/\r?\n/).length;
const filterActionsLines = filterActionsSource.split(/\r?\n/).length;
const filterHelpersLines = filterHelpersSource.split(/\r?\n/).length;
const recordSubmitActionsLines = recordSubmitActionsSource.split(/\r?\n/).length;
const recordSaveActionsLines = recordSaveActionsSource.split(/\r?\n/).length;
const recordSaveHelpersLines = recordSaveHelpersSource.split(/\r?\n/).length;
const reminderActionsLines = reminderActionsSource.split(/\r?\n/).length;
const reminderHelpersLines = reminderHelpersSource.split(/\r?\n/).length;
const mediaStatusActionsLines = mediaStatusActionsSource.split(/\r?\n/).length;
const mediaStatusHelpersLines = mediaStatusHelpersSource.split(/\r?\n/).length;
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
  'from "./record-panel-v2-editor-workspace-base-props";',
  'from "./record-panel-v2-editor-workspace-copy-props";',
]) {
  if (!editorWorkspacePropsSource.includes(requiredEditorWorkspacePropsImport)) {
    throw new Error(`record-panel-v2-editor-workspace-props.ts must import delegated editor prop helpers: ${requiredEditorWorkspacePropsImport}`);
  }
}

for (const requiredEditorWorkspacePropsUsage of [
  "buildRecordEditorWorkspaceBaseProps({",
  "buildRecordEditorWorkspaceCopyProps({ detailCopy })",
  "buildRecordEditorWorkspaceActionProps({",
  "...baseProps",
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

for (const requiredEditorWorkspaceBasePropsImport of [
  'from "./record-panel-v2-editor-workspace-base-props.types";',
]) {
  if (!editorWorkspaceBasePropsSource.includes(requiredEditorWorkspaceBasePropsImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-props.ts must import shared editor prop types: ${requiredEditorWorkspaceBasePropsImport}`,
    );
  }
}

for (const requiredEditorWorkspaceBasePropsUsage of [
  "export function buildRecordEditorWorkspaceBaseProps({",
  "authToken,",
  "mediaAssets,",
  "selectedRecordMediaSizeLabel,",
  "workspaceId,",
]) {
  if (!editorWorkspaceBasePropsSource.includes(requiredEditorWorkspaceBasePropsUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-props.ts must own base editor prop assembly: ${requiredEditorWorkspaceBasePropsUsage}`,
    );
  }
}

const maxEditorWorkspaceBasePropsLines = 95;
if (editorWorkspaceBasePropsLines > maxEditorWorkspaceBasePropsLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-base-props.ts exceeded ${maxEditorWorkspaceBasePropsLines} lines: ${editorWorkspaceBasePropsLines}`,
  );
}

for (const requiredEditorWorkspaceBasePropsTypesImport of [
  'from "./record-panel-v2-workspace-props.types";',
]) {
  if (!editorWorkspaceBasePropsTypesSource.includes(requiredEditorWorkspaceBasePropsTypesImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-props.types.ts must import shared workspace prop types: ${requiredEditorWorkspaceBasePropsTypesImport}`,
    );
  }
}

for (const requiredEditorWorkspaceBasePropsTypesUsage of [
  "export type BuildRecordEditorWorkspaceBasePropsInput = Pick<",
  "export type RecordEditorWorkspaceBaseProps = Pick<",
  '"authToken"',
  '"selectedRecordMediaSizeLabel"',
  '"workspaceId"',
]) {
  if (!editorWorkspaceBasePropsTypesSource.includes(requiredEditorWorkspaceBasePropsTypesUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-props.types.ts must own base prop type contracts: ${requiredEditorWorkspaceBasePropsTypesUsage}`,
    );
  }
}

const maxEditorWorkspaceBasePropsTypesLines = 95;
if (editorWorkspaceBasePropsTypesLines > maxEditorWorkspaceBasePropsTypesLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-base-props.types.ts exceeded ${maxEditorWorkspaceBasePropsTypesLines} lines: ${editorWorkspaceBasePropsTypesLines}`,
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
  'from "./record-panel-controller-handler-groups";',
  'from "./record-panel-controller-result";',
  'from "./use-record-panel-controller-sync";',
  'from "./use-record-panel-controller-state";',
  'from "./use-record-panel-controller-view-data";',
]) {
  if (!controllerSource.includes(requiredControllerImport)) {
    throw new Error(`use-record-panel-controller.ts must import delegated controller helpers: ${requiredControllerImport}`);
  }
}

for (const requiredHandlerGroupsImport of [
  'from "./record-panel-controller-handler-group-inputs";',
  'from "./record-panel-controller-media-handlers";',
  'from "./record-panel-controller-record-handlers";',
]) {
  if (!fs.readFileSync(recordPanelControllerHandlerGroupsPath, "utf8").includes(requiredHandlerGroupsImport)) {
    throw new Error(
      `record-panel-controller-handler-groups.ts must import delegated handler-group helpers: ${requiredHandlerGroupsImport}`,
    );
  }
}

for (const requiredControllerUsage of [
  "useRecordPanelControllerSync({",
  "useRecordPanelControllerViewData({",
  "useRecordPanelControllerState(recordFilter)",
  "createRecordPanelControllerHandlerGroups({",
  "const { recordHandlers, mediaHandlers } = createRecordPanelControllerHandlerGroups({",
  "buildRecordPanelControllerResult({ mediaHandlers, recordHandlers, state, viewData })",
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
  "locale,",
  "...recordHandlers",
  "...mediaHandlers",
]) {
  if (controllerSource.includes(forbiddenControllerToken)) {
    throw new Error(`use-record-panel-controller.ts must keep sync and handler details delegated: ${forbiddenControllerToken}`);
  }
}

const maxControllerLines = 130;
if (controllerLines > maxControllerLines) {
  throw new Error(`use-record-panel-controller.ts exceeded ${maxControllerLines} lines: ${controllerLines}`);
}

const handlerGroupsSource = fs.readFileSync(recordPanelControllerHandlerGroupsPath, "utf8");
const handlerGroupsLines = handlerGroupsSource.split(/\r?\n/).length;

for (const requiredHandlerGroupUsage of [
  "buildRecordPanelControllerRecordHandlerInput(input)",
  "buildRecordPanelControllerMediaHandlerInput(input)",
  "createRecordPanelControllerRecordHandlers(",
  "createRecordPanelControllerMediaHandlers(",
]) {
  if (!handlerGroupsSource.includes(requiredHandlerGroupUsage)) {
    throw new Error(
      `record-panel-controller-handler-groups.ts must delegate handler input assembly: ${requiredHandlerGroupUsage}`,
    );
  }
}

for (const forbiddenHandlerGroupToken of [
  "detailCopy,",
  "filterDraft,",
  "locationReviewForm,",
  "selectedDeadLetterIds,",
  "setBulkRetryingDeadLetter,",
  "setRetryingMediaId,",
]) {
  if (handlerGroupsSource.includes(forbiddenHandlerGroupToken)) {
    throw new Error(
      `record-panel-controller-handler-groups.ts must keep handler input details delegated: ${forbiddenHandlerGroupToken}`,
    );
  }
}
const maxHandlerGroupsLines = 35;
if (handlerGroupsLines > maxHandlerGroupsLines) {
  throw new Error(
    `record-panel-controller-handler-groups.ts exceeded ${maxHandlerGroupsLines} lines: ${handlerGroupsLines}`,
  );
}

for (const requiredHandlerGroupInputsImport of [
  'from "./record-panel-controller.types";',
  'from "./use-record-panel-controller-state";',
  'from "./use-record-panel-controller-view-data";',
]) {
  if (!handlerGroupInputsSource.includes(requiredHandlerGroupInputsImport)) {
    throw new Error(
      `record-panel-controller-handler-group-inputs.ts must import shared controller types: ${requiredHandlerGroupInputsImport}`,
    );
  }
}

for (const requiredHandlerGroupInputsUsage of [
  "export type RecordPanelControllerHandlerGroupInput = Pick<",
  "export function buildRecordPanelControllerRecordHandlerInput(",
  "export function buildRecordPanelControllerMediaHandlerInput(",
  "detailCopy: input.detailCopy,",
  "authToken: input.authToken,",
]) {
  if (!handlerGroupInputsSource.includes(requiredHandlerGroupInputsUsage)) {
    throw new Error(
      `record-panel-controller-handler-group-inputs.ts must own handler input shaping: ${requiredHandlerGroupInputsUsage}`,
    );
  }
}

const maxHandlerGroupInputsLines = 110;
if (handlerGroupInputsLines > maxHandlerGroupInputsLines) {
  throw new Error(
    `record-panel-controller-handler-group-inputs.ts exceeded ${maxHandlerGroupInputsLines} lines: ${handlerGroupInputsLines}`,
  );
}

for (const requiredControllerResultImport of [
  'from "./record-panel-controller-handler-groups";',
  'from "./use-record-panel-controller-state";',
  'from "./use-record-panel-controller-view-data";',
]) {
  if (!controllerResultSource.includes(requiredControllerResultImport)) {
    throw new Error(
      `record-panel-controller-result.ts must import delegated controller result types: ${requiredControllerResultImport}`,
    );
  }
}

for (const requiredControllerResultUsage of [
  "export function buildRecordPanelControllerResult({",
  "locale: viewData.locale,",
  "form: state.form,",
  "detailCopy: viewData.detailCopy,",
  "...recordHandlers",
  "...mediaHandlers",
]) {
  if (!controllerResultSource.includes(requiredControllerResultUsage)) {
    throw new Error(
      `record-panel-controller-result.ts must own final controller result assembly: ${requiredControllerResultUsage}`,
    );
  }
}

for (const forbiddenControllerResultToken of [
  "useEffect(",
  "useMemo(",
  "useState(",
  "createRecordPanelControllerHandlerGroups(",
  "useRecordPanelControllerSync(",
]) {
  if (controllerResultSource.includes(forbiddenControllerResultToken)) {
    throw new Error(
      `record-panel-controller-result.ts must keep orchestration delegated: ${forbiddenControllerResultToken}`,
    );
  }
}

const maxControllerResultLines = 80;
if (controllerResultLines > maxControllerResultLines) {
  throw new Error(
    `record-panel-controller-result.ts exceeded ${maxControllerResultLines} lines: ${controllerResultLines}`,
  );
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

for (const requiredFilterActionsImport of [
  'from "./record-panel-controller-filter-helpers";',
]) {
  if (!filterActionsSource.includes(requiredFilterActionsImport)) {
    throw new Error(
      `record-panel-controller-filter-actions.ts must import delegated filter helpers: ${requiredFilterActionsImport}`,
    );
  }
}

for (const requiredFilterActionsUsage of [
  "getRecordPanelFilterErrorMessage(",
  "resolveRecordPanelPresetName(detailCopy, presetName)",
  "await onCreateSearchPreset(presetInput.presetName, filterDraft)",
]) {
  if (!filterActionsSource.includes(requiredFilterActionsUsage)) {
    throw new Error(
      `record-panel-controller-filter-actions.ts must delegate filter error and preset-name handling: ${requiredFilterActionsUsage}`,
    );
  }
}

for (const forbiddenFilterActionsToken of [
  "function getErrorMessage(",
  "if (!presetName.trim()) {",
  "detailCopy.presetNameRequiredError",
  "onCreateSearchPreset(presetName.trim(), filterDraft)",
]) {
  if (filterActionsSource.includes(forbiddenFilterActionsToken)) {
    throw new Error(
      `record-panel-controller-filter-actions.ts must keep filter internals delegated: ${forbiddenFilterActionsToken}`,
    );
  }
}

const maxFilterActionsLines = 65;
if (filterActionsLines > maxFilterActionsLines) {
  throw new Error(
    `record-panel-controller-filter-actions.ts exceeded ${maxFilterActionsLines} lines: ${filterActionsLines}`,
  );
}

for (const requiredFilterHelpersImport of [
  'from "../lib/record-panel-detail";',
]) {
  if (!filterHelpersSource.includes(requiredFilterHelpersImport)) {
    throw new Error(
      `record-panel-controller-filter-helpers.ts must import delegated filter copy contracts: ${requiredFilterHelpersImport}`,
    );
  }
}

for (const requiredFilterHelpersUsage of [
  "export function getRecordPanelFilterErrorMessage(",
  "export function resolveRecordPanelPresetName(",
  "presetNameRequiredError",
]) {
  if (!filterHelpersSource.includes(requiredFilterHelpersUsage)) {
    throw new Error(
      `record-panel-controller-filter-helpers.ts must own filter error formatting and preset-name validation: ${requiredFilterHelpersUsage}`,
    );
  }
}

const maxFilterHelpersLines = 25;
if (filterHelpersLines > maxFilterHelpersLines) {
  throw new Error(
    `record-panel-controller-filter-helpers.ts exceeded ${maxFilterHelpersLines} lines: ${filterHelpersLines}`,
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

for (const requiredRecordSaveActionsImport of [
  'from "./record-panel-controller-record-save-helpers";',
]) {
  if (!recordSaveActionsSource.includes(requiredRecordSaveActionsImport)) {
    throw new Error(
      `record-panel-controller-record-save-actions.ts must import delegated save helpers: ${requiredRecordSaveActionsImport}`,
    );
  }
}

for (const requiredRecordSaveActionsUsage of [
  "resolveRecordPanelRecordSaveActionInput({",
  "getRecordPanelRecordSaveErrorMessage(",
  "await onSaveRecord(saveInput.payload)",
]) {
  if (!recordSaveActionsSource.includes(requiredRecordSaveActionsUsage)) {
    throw new Error(
      `record-panel-controller-record-save-actions.ts must delegate validation and payload assembly: ${requiredRecordSaveActionsUsage}`,
    );
  }
}

for (const forbiddenRecordSaveActionsToken of [
  "function getErrorMessage(",
  "const latitude = form.location.latitude.trim() ? Number(form.location.latitude) : null;",
  "const longitude = form.location.longitude.trim() ? Number(form.location.longitude) : null;",
  "const hasLocation =",
  "latitudeInvalidError",
  "longitudeInvalidError",
  "extra_data: hasLocation",
]) {
  if (recordSaveActionsSource.includes(forbiddenRecordSaveActionsToken)) {
    throw new Error(
      `record-panel-controller-record-save-actions.ts must keep validation and payload internals delegated: ${forbiddenRecordSaveActionsToken}`,
    );
  }
}

const maxRecordSaveActionsLines = 65;
if (recordSaveActionsLines > maxRecordSaveActionsLines) {
  throw new Error(
    `record-panel-controller-record-save-actions.ts exceeded ${maxRecordSaveActionsLines} lines: ${recordSaveActionsLines}`,
  );
}

for (const requiredRecordSaveHelpersImport of [
  'from "../lib/record-panel-detail";',
  'from "../lib/record-panel-forms";',
  'from "./record-panel-controller.types";',
]) {
  if (!recordSaveHelpersSource.includes(requiredRecordSaveHelpersImport)) {
    throw new Error(
      `record-panel-controller-record-save-helpers.ts must import the delegated save contracts: ${requiredRecordSaveHelpersImport}`,
    );
  }
}

for (const requiredRecordSaveHelpersUsage of [
  "function parseCoordinate(value: string)",
  "function buildRecordSavePayload({",
  "export function getRecordPanelRecordSaveErrorMessage(",
  "export function resolveRecordPanelRecordSaveActionInput(",
  "contentRequiredError",
  "latitudeInvalidError",
  "longitudeInvalidError",
  "extra_data: hasLocation",
]) {
  if (!recordSaveHelpersSource.includes(requiredRecordSaveHelpersUsage)) {
    throw new Error(
      `record-panel-controller-record-save-helpers.ts must own save validation and payload assembly: ${requiredRecordSaveHelpersUsage}`,
    );
  }
}

const maxRecordSaveHelpersLines = 110;
if (recordSaveHelpersLines > maxRecordSaveHelpersLines) {
  throw new Error(
    `record-panel-controller-record-save-helpers.ts exceeded ${maxRecordSaveHelpersLines} lines: ${recordSaveHelpersLines}`,
  );
}

for (const requiredReminderActionsImport of [
  'from "./record-panel-controller-reminder-helpers";',
]) {
  if (!reminderActionsSource.includes(requiredReminderActionsImport)) {
    throw new Error(
      `record-panel-controller-reminder-actions.ts must import delegated reminder helpers: ${requiredReminderActionsImport}`,
    );
  }
}

for (const requiredReminderActionsUsage of [
  "resolveRecordPanelReminderActionInput({",
  "getRecordPanelReminderErrorMessage(",
  "await onCreateReminder(reminderInput.payload)",
]) {
  if (!reminderActionsSource.includes(requiredReminderActionsUsage)) {
    throw new Error(
      `record-panel-controller-reminder-actions.ts must delegate reminder validation and payload assembly: ${requiredReminderActionsUsage}`,
    );
  }
}

for (const forbiddenReminderActionsToken of [
  "function getErrorMessage(",
  '"Save or select a record before adding a reminder"',
  "detailCopy.reminderTimeRequiredError",
  "recordId: selectedRecord.id,",
  'channel_code: "in_app"',
]) {
  if (reminderActionsSource.includes(forbiddenReminderActionsToken)) {
    throw new Error(
      `record-panel-controller-reminder-actions.ts must keep reminder internals delegated: ${forbiddenReminderActionsToken}`,
    );
  }
}

const maxReminderActionsLines = 55;
if (reminderActionsLines > maxReminderActionsLines) {
  throw new Error(
    `record-panel-controller-reminder-actions.ts exceeded ${maxReminderActionsLines} lines: ${reminderActionsLines}`,
  );
}

for (const requiredReminderHelpersImport of [
  'from "../lib/record-panel-detail";',
  'from "../lib/record-panel-forms";',
  'from "./record-panel-controller.types";',
]) {
  if (!reminderHelpersSource.includes(requiredReminderHelpersImport)) {
    throw new Error(
      `record-panel-controller-reminder-helpers.ts must import shared reminder contracts: ${requiredReminderHelpersImport}`,
    );
  }
}

for (const requiredReminderHelpersUsage of [
  "function buildReminderPayload({",
  "export function getRecordPanelReminderErrorMessage(",
  "export function resolveRecordPanelReminderActionInput(",
  '"Save or select a record before adding a reminder"',
  "reminderTimeRequiredError",
  'channel_code: "in_app"',
]) {
  if (!reminderHelpersSource.includes(requiredReminderHelpersUsage)) {
    throw new Error(
      `record-panel-controller-reminder-helpers.ts must own reminder validation and payload assembly: ${requiredReminderHelpersUsage}`,
    );
  }
}

const maxReminderHelpersLines = 60;
if (reminderHelpersLines > maxReminderHelpersLines) {
  throw new Error(
    `record-panel-controller-reminder-helpers.ts exceeded ${maxReminderHelpersLines} lines: ${reminderHelpersLines}`,
  );
}

for (const requiredMediaStatusActionsImport of [
  'from "./record-panel-controller-media-status-helpers";',
]) {
  if (!mediaStatusActionsSource.includes(requiredMediaStatusActionsImport)) {
    throw new Error(
      `record-panel-controller-media-status-actions.ts must import delegated media-status helpers: ${requiredMediaStatusActionsImport}`,
    );
  }
}

for (const requiredMediaStatusActionsUsage of [
  "getRecordPanelMediaStatusErrorMessages(detailCopy)",
  "runRecordPanelMediaStatusAction({",
  "setActiveMediaId: setRefreshingMediaId",
  "setActiveMediaId: setRetryingMediaId",
]) {
  if (!mediaStatusActionsSource.includes(requiredMediaStatusActionsUsage)) {
    throw new Error(
      `record-panel-controller-media-status-actions.ts must delegate media-status execution details: ${requiredMediaStatusActionsUsage}`,
    );
  }
}

for (const forbiddenMediaStatusActionsToken of [
  "function getErrorMessage(",
  "setRefreshingMediaId(mediaId);",
  "setRetryingMediaId(mediaId);",
  "detailCopy.refreshMediaError",
  "detailCopy.retryMediaError",
]) {
  if (mediaStatusActionsSource.includes(forbiddenMediaStatusActionsToken)) {
    throw new Error(
      `record-panel-controller-media-status-actions.ts must keep media-status internals delegated: ${forbiddenMediaStatusActionsToken}`,
    );
  }
}

const maxMediaStatusActionsLines = 55;
if (mediaStatusActionsLines > maxMediaStatusActionsLines) {
  throw new Error(
    `record-panel-controller-media-status-actions.ts exceeded ${maxMediaStatusActionsLines} lines: ${mediaStatusActionsLines}`,
  );
}

for (const requiredMediaStatusHelpersImport of [
  'from "../lib/record-panel-detail";',
]) {
  if (!mediaStatusHelpersSource.includes(requiredMediaStatusHelpersImport)) {
    throw new Error(
      `record-panel-controller-media-status-helpers.ts must import media-status copy contracts: ${requiredMediaStatusHelpersImport}`,
    );
  }
}

for (const requiredMediaStatusHelpersUsage of [
  "export function getRecordPanelMediaStatusErrorMessage(",
  "export async function runRecordPanelMediaStatusAction({",
  "export function getRecordPanelMediaStatusErrorMessages(detailCopy: DetailCopy)",
  "refreshMediaError",
  "retryMediaError",
]) {
  if (!mediaStatusHelpersSource.includes(requiredMediaStatusHelpersUsage)) {
    throw new Error(
      `record-panel-controller-media-status-helpers.ts must own media-status error and execution helpers: ${requiredMediaStatusHelpersUsage}`,
    );
  }
}

const maxMediaStatusHelpersLines = 45;
if (mediaStatusHelpersLines > maxMediaStatusHelpersLines) {
  throw new Error(
    `record-panel-controller-media-status-helpers.ts exceeded ${maxMediaStatusHelpersLines} lines: ${mediaStatusHelpersLines}`,
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

for (const requiredLegacyFormImport of [
  'import { RecordPanelLegacyFormFields } from "./record-panel-legacy-form-fields";',
  'import { RecordPanelLegacyFormMedia } from "./record-panel-legacy-form-media";',
  'import type { RecordPanelLegacyFormProps } from "./record-panel-legacy-form.types";',
]) {
  if (!legacyRecordPanelFormSource.includes(requiredLegacyFormImport)) {
    throw new Error(`record-panel-legacy-form.tsx must import delegated form helpers: ${requiredLegacyFormImport}`);
  }
}

for (const requiredLegacyFormUsage of ["<RecordPanelLegacyFormFields", "<RecordPanelLegacyFormMedia"]) {
  if (!legacyRecordPanelFormSource.includes(requiredLegacyFormUsage)) {
    throw new Error(`record-panel-legacy-form.tsx must compose delegated form sections: ${requiredLegacyFormUsage}`);
  }
}

for (const forbiddenLegacyFormToken of [
  'import type { MediaAsset, RecordItem } from "../lib/types";',
  'import type { RecordPanelFormState } from "./record-panel.types";',
  "type RecordPanelLegacyFormProps = {",
  'placeholder="Optional title"',
  'placeholder="Write a note, food review, or reminder"',
  'className="record-list compact-list"',
  "No media uploaded for this record yet.",
]) {
  if (legacyRecordPanelFormSource.includes(forbiddenLegacyFormToken)) {
    throw new Error(`record-panel-legacy-form.tsx must keep field and media details delegated: ${forbiddenLegacyFormToken}`);
  }
}

const maxLegacyRecordPanelFormLines = 60;
if (legacyRecordPanelFormLines > maxLegacyRecordPanelFormLines) {
  throw new Error(
    `record-panel-legacy-form.tsx exceeded ${maxLegacyRecordPanelFormLines} lines: ${legacyRecordPanelFormLines}`,
  );
}

for (const requiredLegacyFormTypesUsage of [
  "export type RecordPanelLegacyFormProps = {",
  "mediaAssets: MediaAsset[];",
  "setForm: Dispatch<SetStateAction<RecordPanelFormState>>;",
]) {
  if (!legacyRecordPanelFormTypesSource.includes(requiredLegacyFormTypesUsage)) {
    throw new Error(`record-panel-legacy-form.types.ts must own the shared form contract: ${requiredLegacyFormTypesUsage}`);
  }
}

const maxLegacyRecordPanelFormTypesLines = 25;
if (legacyRecordPanelFormTypesLines > maxLegacyRecordPanelFormTypesLines) {
  throw new Error(
    `record-panel-legacy-form.types.ts exceeded ${maxLegacyRecordPanelFormTypesLines} lines: ${legacyRecordPanelFormTypesLines}`,
  );
}

for (const requiredLegacyFormFieldsUsage of [
  'import type { RecordPanelLegacyFormProps } from "./record-panel-legacy-form.types";',
  "export function RecordPanelLegacyFormFields({",
  'placeholder="Optional title"',
  'placeholder="Write a note, food review, or reminder"',
  "Avoid item",
]) {
  if (!legacyRecordPanelFormFieldsSource.includes(requiredLegacyFormFieldsUsage)) {
    throw new Error(`record-panel-legacy-form-fields.tsx must own editable field rendering: ${requiredLegacyFormFieldsUsage}`);
  }
}

const maxLegacyRecordPanelFormFieldsLines = 70;
if (legacyRecordPanelFormFieldsLines > maxLegacyRecordPanelFormFieldsLines) {
  throw new Error(
    `record-panel-legacy-form-fields.tsx exceeded ${maxLegacyRecordPanelFormFieldsLines} lines: ${legacyRecordPanelFormFieldsLines}`,
  );
}

for (const requiredLegacyFormMediaUsage of [
  'import type { RecordPanelLegacyFormProps } from "./record-panel-legacy-form.types";',
  "export function RecordPanelLegacyFormMedia({",
  "if (!selectedRecord) {",
  "Uploading media...",
  "No media uploaded for this record yet.",
]) {
  if (!legacyRecordPanelFormMediaSource.includes(requiredLegacyFormMediaUsage)) {
    throw new Error(`record-panel-legacy-form-media.tsx must own media rendering: ${requiredLegacyFormMediaUsage}`);
  }
}

const maxLegacyRecordPanelFormMediaLines = 45;
if (legacyRecordPanelFormMediaLines > maxLegacyRecordPanelFormMediaLines) {
  throw new Error(
    `record-panel-legacy-form-media.tsx exceeded ${maxLegacyRecordPanelFormMediaLines} lines: ${legacyRecordPanelFormMediaLines}`,
  );
}

const maxLegacyRecordPanelLines = 150;
if (legacyRecordPanelLines > maxLegacyRecordPanelLines) {
  throw new Error(
    `record-panel.tsx exceeded ${maxLegacyRecordPanelLines} lines: ${legacyRecordPanelLines}`,
  );
}

console.log("record-panel structure verification passed");

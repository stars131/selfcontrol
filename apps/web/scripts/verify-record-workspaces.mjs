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
const editorWorkspaceTypesPath = "components/record-editor-workspace.types.ts";
const editorWorkspaceTypesSource = readSource(editorWorkspaceTypesPath);
const editorWorkspaceActionsTypesPath = "components/record-editor-workspace-actions.types.ts";
const editorWorkspaceActionsTypesSource = readSource(editorWorkspaceActionsTypesPath);
const editorWorkspaceCopyTypesPath = "components/record-editor-workspace-copy.types.ts";
const editorWorkspaceCopyTypesSource = readSource(editorWorkspaceCopyTypesPath);
const editorWorkspaceDataTypesPath = "components/record-editor-workspace-data.types.ts";
const editorWorkspaceDataTypesSource = readSource(editorWorkspaceDataTypesPath);
const editorFieldBindingsPath = "components/record-editor-field-bindings.ts";
const editorFieldBindingsSource = readSource(editorFieldBindingsPath);
const editorLocationReviewBindingsPath = "components/record-editor-location-review-bindings.ts";
const editorLocationReviewBindingsSource = readSource(editorLocationReviewBindingsPath);
const editorSupportToolsPath = "components/record-editor-support-tools.tsx";
const editorSupportToolsSource = readSource(editorSupportToolsPath);
const editorSupportToolsPropsPath = "components/record-editor-support-tools-props.ts";
const editorSupportToolsPropsSource = readSource(editorSupportToolsPropsPath);
const editorSupportToolsTypesPath = "components/record-editor-support-tools.types.ts";
const editorSupportToolsTypesSource = readSource(editorSupportToolsTypesPath);
const editorSupportToolsMediaPropsPath = "components/record-editor-support-tools-media-props.ts";
const editorSupportToolsMediaPropsSource = readSource(editorSupportToolsMediaPropsPath);
const editorSupportToolsMediaCopyPropsPath =
  "components/record-editor-support-tools-media-copy-props.ts";
const editorSupportToolsMediaCopyPropsSource = readSource(editorSupportToolsMediaCopyPropsPath);
const editorSupportToolsMediaCopyPropsTypesPath =
  "components/record-editor-support-tools-media-copy-props.types.ts";
const editorSupportToolsMediaCopyPropsTypesSource = readSource(
  editorSupportToolsMediaCopyPropsTypesPath,
);
const editorSupportToolsMediaPassThroughPropsPath =
  "components/record-editor-support-tools-media-pass-through-props.ts";
const editorSupportToolsMediaPassThroughPropsSource = readSource(
  editorSupportToolsMediaPassThroughPropsPath,
);
const editorSupportToolsMediaTypesPath = "components/record-editor-support-tools-media.types.ts";
const editorSupportToolsMediaTypesSource = readSource(editorSupportToolsMediaTypesPath);
const editorSupportToolsReminderTypesPath =
  "components/record-editor-support-tools-reminder.types.ts";
const editorSupportToolsReminderTypesSource = readSource(editorSupportToolsReminderTypesPath);
const editorSupportToolsReminderPropsPath = "components/record-editor-support-tools-reminder-props.ts";
const editorSupportToolsReminderPropsSource = readSource(editorSupportToolsReminderPropsPath);
const editorSupportToolsReminderDerivedPropsPath =
  "components/record-editor-support-tools-reminder-derived-props.ts";
const editorSupportToolsReminderDerivedPropsSource = readSource(
  editorSupportToolsReminderDerivedPropsPath,
);
const editorSupportToolsReminderDerivedPropsTypesPath =
  "components/record-editor-support-tools-reminder-derived-props.types.ts";
const editorSupportToolsReminderDerivedPropsTypesSource = readSource(
  editorSupportToolsReminderDerivedPropsTypesPath,
);
const editorSupportToolsReminderPassThroughPropsPath =
  "components/record-editor-support-tools-reminder-pass-through-props.ts";
const editorSupportToolsReminderPassThroughPropsSource = readSource(
  editorSupportToolsReminderPassThroughPropsPath,
);
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
const reminderToolsBindingsPath = "components/record-reminder-tools-bindings.ts";
const reminderToolsBindingsSource = readSource(reminderToolsBindingsPath);
const reminderToolsBindingsTypesPath = "components/record-reminder-tools-bindings.types.ts";
const reminderToolsBindingsTypesSource = readSource(reminderToolsBindingsTypesPath);

if (!editorWorkspaceSource.includes('from "./record-editor-workspace-bindings";')) {
  throw new Error("record-editor-workspace.tsx must import record-editor-workspace-bindings");
}

if (!editorWorkspaceSource.includes('import type { RecordEditorWorkspaceProps } from "./record-editor-workspace.types";')) {
  throw new Error("record-editor-workspace.tsx must import RecordEditorWorkspaceProps from record-editor-workspace.types");
}

for (const requiredEditorWorkspaceTypesImport of [
  'import type { RecordEditorWorkspaceActionProps } from "./record-editor-workspace-actions.types";',
  'import type { RecordEditorWorkspaceCopyProps } from "./record-editor-workspace-copy.types";',
  'import type { RecordEditorWorkspaceDataProps } from "./record-editor-workspace-data.types";',
]) {
  if (!editorWorkspaceTypesSource.includes(requiredEditorWorkspaceTypesImport)) {
    throw new Error(
      `record-editor-workspace.types.ts must import delegated type groups: ${requiredEditorWorkspaceTypesImport}`,
    );
  }
}

for (const requiredEditorWorkspaceTypesUsage of [
  "export type RecordEditorWorkspaceProps = RecordEditorWorkspaceActionProps &",
  "RecordEditorWorkspaceCopyProps &",
  "RecordEditorWorkspaceDataProps;",
]) {
  if (!editorWorkspaceTypesSource.includes(requiredEditorWorkspaceTypesUsage)) {
    throw new Error(
      `record-editor-workspace.types.ts must compose delegated type groups: ${requiredEditorWorkspaceTypesUsage}`,
    );
  }
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
verifyLineLimit(editorWorkspaceTypesPath, 10);
verifyLineLimit(editorWorkspaceSectionsPropsPath, 10);

for (const requiredEditorWorkspaceActionsTypesImport of [
  'import type { ChangeEventHandler, FormEventHandler } from "react";',
  'import type { MediaAsset } from "../lib/types";',
]) {
  if (!editorWorkspaceActionsTypesSource.includes(requiredEditorWorkspaceActionsTypesImport)) {
    throw new Error(
      `record-editor-workspace-actions.types.ts must import action type contracts: ${requiredEditorWorkspaceActionsTypesImport}`,
    );
  }
}

for (const requiredEditorWorkspaceActionsTypesUsage of [
  "export type RecordEditorWorkspaceReminderUpdateInput = Partial<{",
  "title: string | null;",
  "is_enabled: boolean;",
  "export type RecordEditorWorkspaceActionProps = {",
  "onUpdateReminder: (",
]) {
  if (!editorWorkspaceActionsTypesSource.includes(requiredEditorWorkspaceActionsTypesUsage)) {
    throw new Error(
      `record-editor-workspace-actions.types.ts must own reminder update and action contracts: ${requiredEditorWorkspaceActionsTypesUsage}`,
    );
  }
}

verifyLineLimit(editorWorkspaceActionsTypesPath, 35);

for (const requiredEditorWorkspaceCopyTypesImport of [
  'import type { PanelCopy } from "../lib/record-panel-ui";',
]) {
  if (!editorWorkspaceCopyTypesSource.includes(requiredEditorWorkspaceCopyTypesImport)) {
    throw new Error(
      `record-editor-workspace-copy.types.ts must import copy type contracts: ${requiredEditorWorkspaceCopyTypesImport}`,
    );
  }
}

for (const requiredEditorWorkspaceCopyTypesUsage of [
  "export type RecordEditorWorkspaceCopyProps = {",
  "panelCopy: PanelCopy;",
  "channelInAppLabel: string;",
  "savingReminderLabel: string;",
  "untitledReminderLabel: string;",
]) {
  if (!editorWorkspaceCopyTypesSource.includes(requiredEditorWorkspaceCopyTypesUsage)) {
    throw new Error(
      `record-editor-workspace-copy.types.ts must own copy label contracts: ${requiredEditorWorkspaceCopyTypesUsage}`,
    );
  }
}

verifyLineLimit(editorWorkspaceCopyTypesPath, 30);

for (const requiredEditorWorkspaceDataTypesImport of [
  'import type { Dispatch, SetStateAction } from "react";',
  'import type { LocaleCode } from "../lib/locale";',
  'import type { MediaIssueCopy } from "../lib/record-panel-ui";',
  'import type {',
]) {
  if (!editorWorkspaceDataTypesSource.includes(requiredEditorWorkspaceDataTypesImport)) {
    throw new Error(
      `record-editor-workspace-data.types.ts must import data type contracts: ${requiredEditorWorkspaceDataTypesImport}`,
    );
  }
}

for (const requiredEditorWorkspaceDataTypesUsage of [
  "export type RecordEditorWorkspaceDataProps = {",
  "authToken: string | null;",
  "mediaIssueCopy: MediaIssueCopy;",
  "selectedLocationHistory: LocationHistoryEntry[];",
  "summarizeHistoryActionLabel: (entry: LocationHistoryEntry) => string;",
]) {
  if (!editorWorkspaceDataTypesSource.includes(requiredEditorWorkspaceDataTypesUsage)) {
    throw new Error(
      `record-editor-workspace-data.types.ts must own workspace data contracts: ${requiredEditorWorkspaceDataTypesUsage}`,
    );
  }
}

verifyLineLimit(editorWorkspaceDataTypesPath, 55);

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
  "export function buildRecordEditorMainSectionsProps(input: BuildRecordEditorMainSectionsPropsInput): RecordEditorMainSectionsProps {",
  "fieldBindings: input.fieldBindings",
  "locationReviewBindings: input.locationReviewBindings",
  "formatHistoryTimestampLabel: input.formatHistoryTimestampLabel",
  "summarizeHistoryActionLabel: input.summarizeHistoryActionLabel",
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

for (const requiredSupportToolsTypesImport of [
  'import type { RecordEditorMediaToolsProps } from "./record-editor-support-tools-media.types";',
  'import type { RecordEditorReminderToolsProps } from "./record-editor-support-tools-reminder.types";',
]) {
  if (!editorSupportToolsTypesSource.includes(requiredSupportToolsTypesImport)) {
    throw new Error(
      `record-editor-support-tools.types.ts must import delegated support-tool type groups: ${requiredSupportToolsTypesImport}`,
    );
  }
}

for (const requiredSupportToolsTypesUsage of [
  "export type RecordEditorSupportToolsProps = RecordEditorMediaToolsProps &",
  "RecordEditorReminderToolsProps;",
]) {
  if (!editorSupportToolsTypesSource.includes(requiredSupportToolsTypesUsage)) {
    throw new Error(
      `record-editor-support-tools.types.ts must compose delegated support-tool type groups: ${requiredSupportToolsTypesUsage}`,
    );
  }
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
verifyLineLimit(editorSupportToolsTypesPath, 10);

for (const requiredSupportToolsMediaPropsImport of [
  'import type { RecordEditorSupportToolsProps } from "./record-editor-support-tools.types";',
  'import { buildRecordMediaToolsCopyProps } from "./record-editor-support-tools-media-copy-props";',
  'import { buildRecordMediaToolsPassThroughProps } from "./record-editor-support-tools-media-pass-through-props";',
]) {
  if (!editorSupportToolsMediaPropsSource.includes(requiredSupportToolsMediaPropsImport)) {
    throw new Error(
      `record-editor-support-tools-media-props.ts must import delegated media prop helpers: ${requiredSupportToolsMediaPropsImport}`,
    );
  }
}

for (const requiredSupportToolsMediaPropsUsage of [
  "buildRecordMediaToolsCopyProps(props)",
  "buildRecordMediaToolsPassThroughProps(props)",
  "...copyProps",
  "...passThroughProps",
]) {
  if (!editorSupportToolsMediaPropsSource.includes(requiredSupportToolsMediaPropsUsage)) {
    throw new Error(
      `record-editor-support-tools-media-props.ts must delegate derived copy mapping: ${requiredSupportToolsMediaPropsUsage}`,
    );
  }
}

for (const forbiddenSupportToolsMediaPropsToken of [
  "allTrackedFilesPresentLabel: panelCopy.allTrackedFilesPresent",
  "deleteButtonLabel: deleting ? panelCopy.deleting : panelCopy.deleteRecord",
  "hasSelectedRecord: Boolean(selectedRecord)",
  "saveButtonLabel: saving ? panelCopy.saving : selectedRecord ? panelCopy.updateRecord : panelCopy.createRecord",
  "workspaceStorageLabel: panelCopy.workspaceStorage",
  "authToken,",
  "mediaAssets,",
  "selectedRecordMediaSizeLabel,",
]) {
  if (editorSupportToolsMediaPropsSource.includes(forbiddenSupportToolsMediaPropsToken)) {
    throw new Error(
      `record-editor-support-tools-media-props.ts must keep derived copy mapping delegated: ${forbiddenSupportToolsMediaPropsToken}`,
    );
  }
}

verifyLineLimit(editorSupportToolsMediaPropsPath, 35);

for (const requiredSupportToolsMediaCopyPropsImport of [
  'import type { BuildRecordMediaToolsCopyPropsInput } from "./record-editor-support-tools-media-copy-props.types";',
]) {
  if (!editorSupportToolsMediaCopyPropsSource.includes(requiredSupportToolsMediaCopyPropsImport)) {
    throw new Error(
      `record-editor-support-tools-media-copy-props.ts must import media support-tool contracts: ${requiredSupportToolsMediaCopyPropsImport}`,
    );
  }
}

for (const forbiddenSupportToolsMediaCopyPropsToken of [
  'import type { RecordEditorSupportToolsProps } from "./record-editor-support-tools.types";',
  "}: Pick<",
]) {
  if (editorSupportToolsMediaCopyPropsSource.includes(forbiddenSupportToolsMediaCopyPropsToken)) {
    throw new Error(
      `record-editor-support-tools-media-copy-props.ts must keep media copy input typing delegated: ${forbiddenSupportToolsMediaCopyPropsToken}`,
    );
  }
}

for (const requiredSupportToolsMediaCopyPropsUsage of [
  "export function buildRecordMediaToolsCopyProps({",
  "allTrackedFilesPresentLabel: panelCopy.allTrackedFilesPresent",
  "deleteButtonLabel: deleting ? panelCopy.deleting : panelCopy.deleteRecord",
  "saveButtonLabel: saving",
  "workspaceStorageLabel: panelCopy.workspaceStorage",
]) {
  if (!editorSupportToolsMediaCopyPropsSource.includes(requiredSupportToolsMediaCopyPropsUsage)) {
    throw new Error(
      `record-editor-support-tools-media-copy-props.ts must own derived media copy mapping: ${requiredSupportToolsMediaCopyPropsUsage}`,
    );
  }
}

verifyLineLimit(editorSupportToolsMediaCopyPropsPath, 35);
for (const requiredSupportToolsMediaCopyPropsTypesUsage of [
  'import type { RecordEditorSupportToolsProps } from "./record-editor-support-tools.types"; export type BuildRecordMediaToolsCopyPropsInput = Pick<RecordEditorSupportToolsProps, "deleting" | "panelCopy" | "saving" | "selectedRecord">;',
]) {
  if (!editorSupportToolsMediaCopyPropsTypesSource.includes(requiredSupportToolsMediaCopyPropsTypesUsage)) {
    throw new Error(
      `record-editor-support-tools-media-copy-props.types.ts must own media copy input typing: ${requiredSupportToolsMediaCopyPropsTypesUsage}`,
    );
  }
}

verifyLineLimit(editorSupportToolsMediaCopyPropsTypesPath, 2);

for (const requiredSupportToolsMediaPassThroughPropsImport of [
  'import type { RecordEditorSupportToolsProps } from "./record-editor-support-tools.types";',
]) {
  if (!editorSupportToolsMediaPassThroughPropsSource.includes(requiredSupportToolsMediaPassThroughPropsImport)) {
    throw new Error(
      `record-editor-support-tools-media-pass-through-props.ts must import media support-tool contracts: ${requiredSupportToolsMediaPassThroughPropsImport}`,
    );
  }
}

for (const requiredSupportToolsMediaPassThroughPropsUsage of [
  "export function buildRecordMediaToolsPassThroughProps({",
  "...passThroughProps",
  "void selectedRecord;",
  "void panelCopy;",
  "return passThroughProps;",
]) {
  if (!editorSupportToolsMediaPassThroughPropsSource.includes(requiredSupportToolsMediaPassThroughPropsUsage)) {
    throw new Error(
      `record-editor-support-tools-media-pass-through-props.ts must own runtime media prop pass-through mapping: ${requiredSupportToolsMediaPassThroughPropsUsage}`,
    );
  }
}

verifyLineLimit(editorSupportToolsMediaPassThroughPropsPath, 45);

for (const requiredSupportToolsMediaTypesImport of [
  'import type { RecordEditorWorkspaceProps } from "./record-editor-workspace.types";',
]) {
  if (!editorSupportToolsMediaTypesSource.includes(requiredSupportToolsMediaTypesImport)) {
    throw new Error(
      `record-editor-support-tools-media.types.ts must import workspace prop contracts: ${requiredSupportToolsMediaTypesImport}`,
    );
  }
}

for (const requiredSupportToolsMediaTypesUsage of [
  "export type RecordEditorMediaToolsProps = Pick<",
  '"mediaDeadLetterOverview"',
  '"selectedRecordMediaSizeLabel"',
  '"workspaceId"',
]) {
  if (!editorSupportToolsMediaTypesSource.includes(requiredSupportToolsMediaTypesUsage)) {
    throw new Error(
      `record-editor-support-tools-media.types.ts must own media-tool support contracts: ${requiredSupportToolsMediaTypesUsage}`,
    );
  }
}

verifyLineLimit(editorSupportToolsMediaTypesPath, 45);

for (const requiredSupportToolsReminderTypesImport of [
  'import type { RecordEditorWorkspaceProps } from "./record-editor-workspace.types";',
]) {
  if (!editorSupportToolsReminderTypesSource.includes(requiredSupportToolsReminderTypesImport)) {
    throw new Error(
      `record-editor-support-tools-reminder.types.ts must import workspace prop contracts: ${requiredSupportToolsReminderTypesImport}`,
    );
  }
}

for (const requiredSupportToolsReminderTypesUsage of [
  "export type RecordEditorReminderToolsProps = Pick<",
  '"createReminderLabel"',
  '"savingReminderLabel"',
  '"untitledReminderLabel"',
]) {
  if (!editorSupportToolsReminderTypesSource.includes(requiredSupportToolsReminderTypesUsage)) {
    throw new Error(
      `record-editor-support-tools-reminder.types.ts must own reminder-tool support contracts: ${requiredSupportToolsReminderTypesUsage}`,
    );
  }
}

verifyLineLimit(editorSupportToolsReminderTypesPath, 35);

for (const requiredSupportToolsReminderPropsImport of [
  'import type { RecordEditorSupportToolsProps } from "./record-editor-support-tools.types";',
  'import { buildRecordReminderToolsDerivedProps } from "./record-editor-support-tools-reminder-derived-props";',
  'import { buildRecordReminderToolsPassThroughProps } from "./record-editor-support-tools-reminder-pass-through-props";',
]) {
  if (!editorSupportToolsReminderPropsSource.includes(requiredSupportToolsReminderPropsImport)) {
    throw new Error(
      `record-editor-support-tools-reminder-props.ts must import delegated reminder prop helpers: ${requiredSupportToolsReminderPropsImport}`,
    );
  }
}

for (const requiredSupportToolsReminderPropsUsage of [
  "buildRecordReminderToolsDerivedProps(props)",
  "buildRecordReminderToolsPassThroughProps(props)",
  "...derivedProps",
  "...passThroughProps",
]) {
  if (!editorSupportToolsReminderPropsSource.includes(requiredSupportToolsReminderPropsUsage)) {
    throw new Error(
      `record-editor-support-tools-reminder-props.ts must delegate derived and pass-through reminder mapping: ${requiredSupportToolsReminderPropsUsage}`,
    );
  }
}

for (const forbiddenSupportToolsReminderPropsToken of [
  "channelInApp: channelInAppLabel",
  "hasSelectedRecord: Boolean(selectedRecord)",
  "selectedRecordTitle: selectedRecord?.title ?? null",
  "createReminderLabel,",
  "reminders,",
  "setReminderForm,",
]) {
  if (editorSupportToolsReminderPropsSource.includes(forbiddenSupportToolsReminderPropsToken)) {
    throw new Error(
      `record-editor-support-tools-reminder-props.ts must keep reminder derivation and pass-through mapping delegated: ${forbiddenSupportToolsReminderPropsToken}`,
    );
  }
}

verifyLineLimit(editorSupportToolsReminderPropsPath, 30);

for (const requiredSupportToolsReminderDerivedPropsImport of [
  'import type { BuildRecordReminderToolsDerivedPropsInput } from "./record-editor-support-tools-reminder-derived-props.types";',
]) {
  if (!editorSupportToolsReminderDerivedPropsSource.includes(requiredSupportToolsReminderDerivedPropsImport)) {
    throw new Error(
      `record-editor-support-tools-reminder-derived-props.ts must import reminder support-tool contracts: ${requiredSupportToolsReminderDerivedPropsImport}`,
    );
  }
}

for (const forbiddenSupportToolsReminderDerivedPropsToken of [
  'import type { RecordEditorSupportToolsProps } from "./record-editor-support-tools.types";',
  "}: Pick<",
]) {
  if (editorSupportToolsReminderDerivedPropsSource.includes(forbiddenSupportToolsReminderDerivedPropsToken)) {
    throw new Error(
      `record-editor-support-tools-reminder-derived-props.ts must keep reminder derived input typing delegated: ${forbiddenSupportToolsReminderDerivedPropsToken}`,
    );
  }
}

for (const requiredSupportToolsReminderDerivedPropsUsage of [
  "export function buildRecordReminderToolsDerivedProps({",
  "channelInApp: channelInAppLabel",
  "hasSelectedRecord: Boolean(selectedRecord)",
  "selectedRecordTitle: selectedRecord?.title ?? null",
]) {
  if (!editorSupportToolsReminderDerivedPropsSource.includes(requiredSupportToolsReminderDerivedPropsUsage)) {
    throw new Error(
      `record-editor-support-tools-reminder-derived-props.ts must own reminder derived mapping: ${requiredSupportToolsReminderDerivedPropsUsage}`,
    );
  }
}

verifyLineLimit(editorSupportToolsReminderDerivedPropsPath, 20);
for (const requiredSupportToolsReminderDerivedPropsTypesUsage of [
  'import type { RecordEditorSupportToolsProps } from "./record-editor-support-tools.types"; export type BuildRecordReminderToolsDerivedPropsInput = Pick<RecordEditorSupportToolsProps, "channelInAppLabel" | "selectedRecord">;',
]) {
  if (!editorSupportToolsReminderDerivedPropsTypesSource.includes(requiredSupportToolsReminderDerivedPropsTypesUsage)) {
    throw new Error(
      `record-editor-support-tools-reminder-derived-props.types.ts must own reminder derived input typing: ${requiredSupportToolsReminderDerivedPropsTypesUsage}`,
    );
  }
}

verifyLineLimit(editorSupportToolsReminderDerivedPropsTypesPath, 2);

for (const requiredSupportToolsReminderPassThroughPropsImport of [
  'import type { RecordEditorSupportToolsProps } from "./record-editor-support-tools.types";',
]) {
  if (!editorSupportToolsReminderPassThroughPropsSource.includes(requiredSupportToolsReminderPassThroughPropsImport)) {
    throw new Error(
      `record-editor-support-tools-reminder-pass-through-props.ts must import reminder support-tool contracts: ${requiredSupportToolsReminderPassThroughPropsImport}`,
    );
  }
}

for (const requiredSupportToolsReminderPassThroughPropsUsage of [
  "export function buildRecordReminderToolsPassThroughProps({",
  "...passThroughProps",
  "void channelInAppLabel;",
  "void selectedRecord;",
  "return passThroughProps;",
]) {
  if (!editorSupportToolsReminderPassThroughPropsSource.includes(requiredSupportToolsReminderPassThroughPropsUsage)) {
    throw new Error(
      `record-editor-support-tools-reminder-pass-through-props.ts must own reminder pass-through mapping: ${requiredSupportToolsReminderPassThroughPropsUsage}`,
    );
  }
}

verifyLineLimit(editorSupportToolsReminderPassThroughPropsPath, 20);

for (const requiredReminderToolsBindingsImport of [
  'import type { CreateRecordReminderBindingsInput } from "./record-reminder-tools-bindings.types";',
]) {
  if (!reminderToolsBindingsSource.includes(requiredReminderToolsBindingsImport)) {
    throw new Error(
      `record-reminder-tools-bindings.ts must import reminder bindings contracts: ${requiredReminderToolsBindingsImport}`,
    );
  }
}

for (const forbiddenReminderToolsBindingsToken of [
  'import type { RecordReminderToolsProps } from "./record-reminder-tools.types";',
  "type RecordReminderBindingsParams = Pick<",
]) {
  if (reminderToolsBindingsSource.includes(forbiddenReminderToolsBindingsToken)) {
    throw new Error(
      `record-reminder-tools-bindings.ts must keep reminder bindings input typing delegated: ${forbiddenReminderToolsBindingsToken}`,
    );
  }
}

for (const requiredReminderToolsBindingsUsage of [
  "export function createRecordReminderBindings({",
  "onMarkReminderDone(reminder: { id: string })",
  "onToggleReminderEnabled(reminder: { id: string; is_enabled: boolean })",
]) {
  if (!reminderToolsBindingsSource.includes(requiredReminderToolsBindingsUsage)) {
    throw new Error(
      `record-reminder-tools-bindings.ts must own reminder bindings behavior: ${requiredReminderToolsBindingsUsage}`,
    );
  }
}

verifyLineLimit(reminderToolsBindingsPath, 35);

for (const requiredReminderToolsBindingsTypesUsage of [
  'import type { RecordReminderToolsProps } from "./record-reminder-tools.types"; export type CreateRecordReminderBindingsInput = Pick<RecordReminderToolsProps, "onUpdateReminder" | "setReminderForm">;',
]) {
  if (!reminderToolsBindingsTypesSource.includes(requiredReminderToolsBindingsTypesUsage)) {
    throw new Error(
      `record-reminder-tools-bindings.types.ts must own reminder bindings input typing: ${requiredReminderToolsBindingsTypesUsage}`,
    );
  }
}

verifyLineLimit(reminderToolsBindingsTypesPath, 2);

if (!reminderToolsSource.includes('import type { RecordReminderToolsProps } from "./record-reminder-tools.types";')) {
  throw new Error("record-reminder-tools.tsx must import RecordReminderToolsProps from record-reminder-tools.types");
}

if (!reminderToolsSource.includes('import { createRecordReminderBindings } from "./record-reminder-tools-bindings";')) {
  throw new Error("record-reminder-tools.tsx must import createRecordReminderBindings");
}

if (!reminderToolsSource.includes('import { buildRecordReminderPanelProps } from "./record-reminder-tools-panel-props";')) {
  throw new Error("record-reminder-tools.tsx must import buildRecordReminderPanelProps");
}

for (const requiredReminderToolsUsage of [
  "const bindings = createRecordReminderBindings({",
  "onUpdateReminder: props.onUpdateReminder,",
  "setReminderForm: props.setReminderForm,",
  "buildRecordReminderPanelProps({ ...props, bindings })",
]) {
  if (!reminderToolsSource.includes(requiredReminderToolsUsage)) {
    throw new Error(
      `record-reminder-tools.tsx must delegate reminder bindings and panel prop assembly: ${requiredReminderToolsUsage}`,
    );
  }
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
const recordSearchPanelFilterFieldsTypesPath =
  "components/record-search-panel-filter-fields.types.ts";
const recordSearchPanelFilterFieldsTypesSource = readSource(
  recordSearchPanelFilterFieldsTypesPath,
);
const recordSearchPanelPresetControlsPath = "components/record-search-panel-preset-controls.tsx";
const recordSearchPanelPresetControlsSource = readSource(recordSearchPanelPresetControlsPath);
const recordSearchPanelPresetControlsTypesPath =
  "components/record-search-panel-preset-controls.types.ts";
const recordSearchPanelPresetControlsTypesSource = readSource(
  recordSearchPanelPresetControlsTypesPath,
);

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
  'import type { RecordSearchPanelFilterFieldsProps } from "./record-search-panel-filter-fields.types";',
]) {
  if (!recordSearchPanelFilterFieldsSource.includes(requiredFilterFieldsImport)) {
    throw new Error(`record-search-panel-filter-fields.tsx must import delegated filter field props: ${requiredFilterFieldsImport}`);
  }
}

for (const forbiddenFilterFieldsToken of [
  'import type { RecordSearchPanelProps } from "./record-search-panel.types";',
  "}: Pick<",
]) {
  if (recordSearchPanelFilterFieldsSource.includes(forbiddenFilterFieldsToken)) {
    throw new Error(`record-search-panel-filter-fields.tsx must keep filter field typing delegated: ${forbiddenFilterFieldsToken}`);
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
for (const requiredFilterFieldsTypesUsage of [
  'import type { RecordSearchPanelProps } from "./record-search-panel.types"; export type RecordSearchPanelFilterFieldsProps = Pick<RecordSearchPanelProps, "filterDraft" | "onAvoidOnlyChange" | "onQueryChange" | "onTypeCodeChange" | "panelCopy">;',
]) {
  if (!recordSearchPanelFilterFieldsTypesSource.includes(requiredFilterFieldsTypesUsage)) {
    throw new Error(`record-search-panel-filter-fields.types.ts must own filter field typing: ${requiredFilterFieldsTypesUsage}`);
  }
}

verifyLineLimit(recordSearchPanelFilterFieldsTypesPath, 2);

for (const requiredPresetControlsImport of [
  'import type { RecordSearchPanelPresetControlsProps } from "./record-search-panel-preset-controls.types";',
]) {
  if (!recordSearchPanelPresetControlsSource.includes(requiredPresetControlsImport)) {
    throw new Error(`record-search-panel-preset-controls.tsx must import delegated preset control props: ${requiredPresetControlsImport}`);
  }
}

for (const forbiddenPresetControlsToken of [
  'import type { RecordSearchPanelProps } from "./record-search-panel.types";',
  "}: Pick<",
]) {
  if (recordSearchPanelPresetControlsSource.includes(forbiddenPresetControlsToken)) {
    throw new Error(`record-search-panel-preset-controls.tsx must keep preset control typing delegated: ${forbiddenPresetControlsToken}`);
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
for (const requiredPresetControlsTypesUsage of [
  'import type { RecordSearchPanelProps } from "./record-search-panel.types"; export type RecordSearchPanelPresetControlsProps = Pick<RecordSearchPanelProps, "canWriteWorkspace" | "onPresetNameChange" | "onSavePreset" | "panelCopy" | "presetName" | "savingSearchPreset">;',
]) {
  if (!recordSearchPanelPresetControlsTypesSource.includes(requiredPresetControlsTypesUsage)) {
    throw new Error(`record-search-panel-preset-controls.types.ts must own preset control typing: ${requiredPresetControlsTypesUsage}`);
  }
}

verifyLineLimit(recordSearchPanelPresetControlsTypesPath, 2);

console.log("record workspaces verification passed");

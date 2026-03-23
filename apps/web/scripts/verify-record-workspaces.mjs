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
const editorSupportToolsPath = "components/record-editor-support-tools.tsx";
const editorSupportToolsSource = readSource(editorSupportToolsPath);
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

if (!editorWorkspaceSource.includes("<RecordEditorMainSections")) {
  throw new Error("record-editor-workspace.tsx must delegate main editor section rendering");
}

if (!editorWorkspaceSource.includes("<RecordEditorSupportTools")) {
  throw new Error("record-editor-workspace.tsx must delegate support tool rendering");
}

for (const forbiddenToken of ["setForm((", "setLocationReviewForm(("]) {
  if (editorWorkspaceSource.includes(forbiddenToken)) {
    throw new Error(`record-editor-workspace.tsx must keep state-update closures in bindings helpers: ${forbiddenToken}`);
  }
}

for (const forbiddenToken of ["<LocationReviewPanel", "<RecordMediaTools", "<RecordReminderTools", "<RecordEditorFields"]) {
  if (editorWorkspaceSource.includes(forbiddenToken)) {
    throw new Error(`record-editor-workspace.tsx must keep child section composition delegated: ${forbiddenToken}`);
  }
}

for (const forbiddenToken of ["type RecordEditorWorkspaceProps = {", "mediaIssueCopy: import("]) {
  if (editorWorkspaceSource.includes(forbiddenToken)) {
    throw new Error(`record-editor-workspace.tsx must keep its props contract delegated: ${forbiddenToken}`);
  }
}

verifyLineLimit(editorWorkspacePath, 180);

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

for (const forbiddenToken of ["<RecordMediaTools\n        allTrackedFilesPresentLabel", "<RecordReminderTools\n        canWriteWorkspace"]) {
  if (editorSupportToolsSource.includes(forbiddenToken)) {
    throw new Error(`record-editor-support-tools.tsx must keep child prop assembly delegated: ${forbiddenToken}`);
  }
}

verifyLineLimit(editorSupportToolsPath, 120);

if (!reminderToolsSource.includes('import type { RecordReminderToolsProps } from "./record-reminder-tools.types";')) {
  throw new Error("record-reminder-tools.tsx must import RecordReminderToolsProps from record-reminder-tools.types");
}

if (!reminderToolsSource.includes('import { createRecordReminderBindings } from "./record-reminder-tools-bindings";')) {
  throw new Error("record-reminder-tools.tsx must import createRecordReminderBindings");
}

if (!reminderToolsSource.includes("createRecordReminderBindings({ onUpdateReminder, setReminderForm })")) {
  throw new Error("record-reminder-tools.tsx must delegate reminder form bindings");
}

for (const forbiddenToken of ["onMarkReminderDone={(reminder)", "onMessageChange={(value)", "onRemindAtChange={(value)", "onTitleChange={(value)"]) {
  if (reminderToolsSource.includes(forbiddenToken)) {
    throw new Error(`record-reminder-tools.tsx must keep reminder bindings delegated: ${forbiddenToken}`);
  }
}

verifyLineLimit(reminderToolsPath, 110);

const browseWorkspacePath = "components/record-browse-workspace.tsx";
const browseWorkspaceSource = readSource(browseWorkspacePath);

if (!browseWorkspaceSource.includes('import type { RecordBrowseWorkspaceProps } from "./record-browse-workspace.types";')) {
  throw new Error("record-browse-workspace.tsx must import RecordBrowseWorkspaceProps from record-browse-workspace.types");
}

for (const forbiddenToken of ["useState(", "useEffect(", "useMemo(", "fetchMediaBlob(", "const handle"]) {
  if (browseWorkspaceSource.includes(forbiddenToken)) {
    throw new Error(`record-browse-workspace.tsx must remain a composition shell: ${forbiddenToken}`);
  }
}

for (const forbiddenToken of ["type RecordBrowseWorkspaceProps = {", "Dispatch<SetStateAction<"]) {
  if (browseWorkspaceSource.includes(forbiddenToken)) {
    throw new Error(`record-browse-workspace.tsx must keep its props contract delegated: ${forbiddenToken}`);
  }
}

verifyLineLimit(browseWorkspacePath, 170);

console.log("record workspaces verification passed");

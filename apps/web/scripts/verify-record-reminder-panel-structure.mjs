import fs from "node:fs";
import path from "node:path";

const panelPath = path.resolve(process.cwd(), "components/record-reminder-panel.tsx");
const panelSource = fs.readFileSync(panelPath, "utf8");
const panelLineCount = panelSource.split(/\r?\n/).length;
const formPath = path.resolve(process.cwd(), "components/record-reminder-form.tsx");
const formSource = fs.readFileSync(formPath, "utf8");
const formLineCount = formSource.split(/\r?\n/).length;
const formFieldsPath = path.resolve(process.cwd(), "components/record-reminder-form-fields.tsx");
const formFieldsTypesPath = path.resolve(
  process.cwd(),
  "components/record-reminder-form-fields.types.ts",
);
const formActionsPath = path.resolve(process.cwd(), "components/record-reminder-form-actions.tsx");
const formActionsTypesPath = path.resolve(
  process.cwd(),
  "components/record-reminder-form-actions.types.ts",
);
const formFieldsSource = fs.readFileSync(formFieldsPath, "utf8");
const formFieldsTypesSource = fs.readFileSync(formFieldsTypesPath, "utf8");
const formActionsSource = fs.readFileSync(formActionsPath, "utf8");
const formActionsTypesSource = fs.readFileSync(formActionsTypesPath, "utf8");
const formFieldsLineCount = formFieldsSource.split(/\r?\n/).length;
const formActionsLineCount = formActionsSource.split(/\r?\n/).length;
const formFieldsTypesLineCount = formFieldsTypesSource.split(/\r?\n/).length;
const formActionsTypesLineCount = formActionsTypesSource.split(/\r?\n/).length;
const itemCardPath = path.resolve(process.cwd(), "components/record-reminder-item-card.tsx");
const itemCardSummaryPath = path.resolve(
  process.cwd(),
  "components/record-reminder-item-card-summary.tsx",
);
const itemCardSummaryTypesPath = path.resolve(
  process.cwd(),
  "components/record-reminder-item-card-summary.types.ts",
);
const itemCardActionsPath = path.resolve(
  process.cwd(),
  "components/record-reminder-item-card-actions.tsx",
);
const itemCardActionsTypesPath = path.resolve(
  process.cwd(),
  "components/record-reminder-item-card-actions.types.ts",
);
const itemCardSource = fs.readFileSync(itemCardPath, "utf8");
const itemCardSummarySource = fs.readFileSync(itemCardSummaryPath, "utf8");
const itemCardSummaryTypesSource = fs.readFileSync(itemCardSummaryTypesPath, "utf8");
const itemCardActionsSource = fs.readFileSync(itemCardActionsPath, "utf8");
const itemCardActionsTypesSource = fs.readFileSync(itemCardActionsTypesPath, "utf8");
const itemCardLineCount = itemCardSource.split(/\r?\n/).length;
const itemCardSummaryLineCount = itemCardSummarySource.split(/\r?\n/).length;
const itemCardSummaryTypesLineCount = itemCardSummaryTypesSource.split(/\r?\n/).length;
const itemCardActionsLineCount = itemCardActionsSource.split(/\r?\n/).length;
const itemCardActionsTypesLineCount = itemCardActionsTypesSource.split(/\r?\n/).length;

if (!panelSource.includes('import { RecordReminderForm } from "./record-reminder-form";')) {
  throw new Error("record-reminder-panel.tsx must import RecordReminderForm");
}

if (!panelSource.includes('import { RecordReminderList } from "./record-reminder-list";')) {
  throw new Error("record-reminder-panel.tsx must import RecordReminderList");
}

if (!panelSource.includes('import type { RecordReminderPanelProps } from "./record-reminder-panel.types";')) {
  throw new Error("record-reminder-panel.tsx must import RecordReminderPanelProps");
}

if (!panelSource.includes("<RecordReminderForm")) {
  throw new Error("record-reminder-panel.tsx must delegate reminder form rendering");
}

if (!panelSource.includes("<RecordReminderList")) {
  throw new Error("record-reminder-panel.tsx must delegate reminder list rendering");
}

for (const requiredFormUsage of [
  'import { RecordReminderFormActions } from "./record-reminder-form-actions";',
  'import { RecordReminderFormFields } from "./record-reminder-form-fields";',
  'import type { RecordReminderFormProps } from "./record-reminder-form.types";',
  "<RecordReminderFormFields",
  "<RecordReminderFormActions",
]) {
  if (!formSource.includes(requiredFormUsage)) {
    throw new Error(`record-reminder-form.tsx must delegate reminder form sections: ${requiredFormUsage}`);
  }
}

for (const forbiddenFormToken of [
  'type="datetime-local"',
  'className="action-row"',
  'placeholder={reminderNotePlaceholder}',
  'onClick={() => void onCreateReminder()}',
]) {
  if (formSource.includes(forbiddenFormToken)) {
    throw new Error(`record-reminder-form.tsx must keep fields and actions delegated: ${forbiddenFormToken}`);
  }
}

for (const requiredFormFieldsUsage of [
  'import type { RecordReminderFormFieldsProps } from "./record-reminder-form-fields.types";',
  "}: RecordReminderFormFieldsProps) {",
  'type="datetime-local"',
  'placeholder={reminderNotePlaceholder}',
  'onChange={(event) => onTitleChange(event.target.value)}',
]) {
  if (!formFieldsSource.includes(requiredFormFieldsUsage)) {
    throw new Error(`record-reminder-form-fields.tsx must own reminder field rendering: ${requiredFormFieldsUsage}`);
  }
}

for (const requiredFormActionsUsage of [
  'import type { RecordReminderFormActionsProps } from "./record-reminder-form-actions.types";',
  "}: RecordReminderFormActionsProps) {",
  'className="action-row"',
  'onClick={() => void onCreateReminder()}',
]) {
  if (!formActionsSource.includes(requiredFormActionsUsage)) {
    throw new Error(`record-reminder-form-actions.tsx must own reminder submit rendering: ${requiredFormActionsUsage}`);
  }
}

for (const requiredFormFieldsTypesUsage of [
  'import type { RecordReminderFormProps } from "./record-reminder-form.types"; export type RecordReminderFormFieldsProps = Pick<RecordReminderFormProps, "canWriteWorkspace" | "channelInApp" | "channelLabel" | "onMessageChange" | "onRemindAtChange" | "onTitleChange" | "remindAtLabel" | "reminderForm" | "reminderNoteLabel" | "reminderNotePlaceholder" | "reminderTitleLabel" | "reminderTitlePlaceholder">;',
]) {
  if (!formFieldsTypesSource.includes(requiredFormFieldsTypesUsage)) {
    throw new Error(`record-reminder-form-fields.types.ts must own field prop typing: ${requiredFormFieldsTypesUsage}`);
  }
}

for (const requiredFormActionsTypesUsage of [
  'import type { RecordReminderFormProps } from "./record-reminder-form.types"; export type RecordReminderFormActionsProps = Pick<RecordReminderFormProps, "canWriteWorkspace" | "createReminderLabel" | "onCreateReminder" | "savingReminder" | "savingReminderLabel">;',
]) {
  if (!formActionsTypesSource.includes(requiredFormActionsTypesUsage)) {
    throw new Error(`record-reminder-form-actions.types.ts must own action prop typing: ${requiredFormActionsTypesUsage}`);
  }
}

for (const requiredItemCardUsage of [
  'import { RecordReminderItemCardActions } from "./record-reminder-item-card-actions";',
  'import { RecordReminderItemCardSummary } from "./record-reminder-item-card-summary";',
  'import type { RecordReminderItemCardProps } from "./record-reminder-panel.types";',
  "<RecordReminderItemCardSummary",
  "<RecordReminderItemCardActions",
]) {
  if (!itemCardSource.includes(requiredItemCardUsage)) {
    throw new Error(`record-reminder-item-card.tsx must delegate reminder item sections: ${requiredItemCardUsage}`);
  }
}

for (const forbiddenItemCardToken of [
  'className="tag-row"',
  'className="action-row"',
  'reminder.status !== "completed"',
  'formatReminderTimestampLabel(reminder.remind_at)',
]) {
  if (itemCardSource.includes(forbiddenItemCardToken)) {
    throw new Error(`record-reminder-item-card.tsx must keep summary and actions delegated: ${forbiddenItemCardToken}`);
  }
}

for (const requiredItemCardSummaryUsage of [
  'import type { RecordReminderItemCardSummaryProps } from "./record-reminder-item-card-summary.types";',
  "}: RecordReminderItemCardSummaryProps) {",
  'className="tag-row"',
  'formatReminderTimestampLabel(reminder.remind_at)',
  'formatReminderStatusLabel(reminder.status)',
]) {
  if (!itemCardSummarySource.includes(requiredItemCardSummaryUsage)) {
    throw new Error(`record-reminder-item-card-summary.tsx must own reminder summary rendering: ${requiredItemCardSummaryUsage}`);
  }
}

for (const requiredItemCardActionsUsage of [
  'import type { RecordReminderItemCardActionsProps } from "./record-reminder-item-card-actions.types";',
  "}: RecordReminderItemCardActionsProps) {",
  'className="action-row"',
  'reminder.status !== "completed"',
  'onClick={() => void onDeleteReminder(reminder.id)}',
]) {
  if (!itemCardActionsSource.includes(requiredItemCardActionsUsage)) {
    throw new Error(`record-reminder-item-card-actions.tsx must own reminder action rendering: ${requiredItemCardActionsUsage}`);
  }
}

for (const requiredItemCardSummaryTypesUsage of [
  'import type { RecordReminderItemCardProps } from "./record-reminder-panel.types"; export type RecordReminderItemCardSummaryProps = Pick<RecordReminderItemCardProps, "formatReminderEnabledLabel" | "formatReminderStatusLabel" | "formatReminderTimestampLabel" | "reminder" | "selectedRecordTitle" | "untitledReminderLabel">;',
]) {
  if (!itemCardSummaryTypesSource.includes(requiredItemCardSummaryTypesUsage)) {
    throw new Error(`record-reminder-item-card-summary.types.ts must own summary prop typing: ${requiredItemCardSummaryTypesUsage}`);
  }
}

for (const requiredItemCardActionsTypesUsage of [
  'import type { RecordReminderItemCardProps } from "./record-reminder-panel.types"; export type RecordReminderItemCardActionsProps = Pick<RecordReminderItemCardProps, "canWriteWorkspace" | "deleteReminderLabel" | "enableReminderLabel" | "markReminderDoneLabel" | "onDeleteReminder" | "onMarkReminderDone" | "onToggleReminderEnabled" | "pauseReminderLabel" | "reminder">;',
]) {
  if (!itemCardActionsTypesSource.includes(requiredItemCardActionsTypesUsage)) {
    throw new Error(`record-reminder-item-card-actions.types.ts must own action prop typing: ${requiredItemCardActionsTypesUsage}`);
  }
}

for (const forbiddenToken of [
  'type="datetime-local"',
  'reminders.map((reminder) =>',
  'reminder.status !== "completed"',
  'className="action-row"',
]) {
  if (panelSource.includes(forbiddenToken)) {
    throw new Error(`record-reminder-panel.tsx must keep form and item rendering delegated: ${forbiddenToken}`);
  }
}

const maxFormLines = 55;
if (formLineCount > maxFormLines) {
  throw new Error(`record-reminder-form.tsx exceeded ${maxFormLines} lines: ${formLineCount}`);
}

const maxFormFieldsLines = 65;
if (formFieldsLineCount > maxFormFieldsLines) {
  throw new Error(`record-reminder-form-fields.tsx exceeded ${maxFormFieldsLines} lines: ${formFieldsLineCount}`);
}

const maxFormActionsLines = 25;
if (formActionsLineCount > maxFormActionsLines) {
  throw new Error(`record-reminder-form-actions.tsx exceeded ${maxFormActionsLines} lines: ${formActionsLineCount}`);
}

const maxFormFieldsTypesLines = 2;
if (formFieldsTypesLineCount > maxFormFieldsTypesLines) {
  throw new Error(`record-reminder-form-fields.types.ts exceeded ${maxFormFieldsTypesLines} lines: ${formFieldsTypesLineCount}`);
}

const maxFormActionsTypesLines = 2;
if (formActionsTypesLineCount > maxFormActionsTypesLines) {
  throw new Error(`record-reminder-form-actions.types.ts exceeded ${maxFormActionsTypesLines} lines: ${formActionsTypesLineCount}`);
}

const maxItemCardLines = 50;
if (itemCardLineCount > maxItemCardLines) {
  throw new Error(`record-reminder-item-card.tsx exceeded ${maxItemCardLines} lines: ${itemCardLineCount}`);
}

const maxItemCardSummaryLines = 30;
if (itemCardSummaryLineCount > maxItemCardSummaryLines) {
  throw new Error(`record-reminder-item-card-summary.tsx exceeded ${maxItemCardSummaryLines} lines: ${itemCardSummaryLineCount}`);
}

const maxItemCardActionsLines = 50;
if (itemCardActionsLineCount > maxItemCardActionsLines) {
  throw new Error(`record-reminder-item-card-actions.tsx exceeded ${maxItemCardActionsLines} lines: ${itemCardActionsLineCount}`);
}

const maxItemCardSummaryTypesLines = 2;
if (itemCardSummaryTypesLineCount > maxItemCardSummaryTypesLines) {
  throw new Error(`record-reminder-item-card-summary.types.ts exceeded ${maxItemCardSummaryTypesLines} lines: ${itemCardSummaryTypesLineCount}`);
}

const maxItemCardActionsTypesLines = 2;
if (itemCardActionsTypesLineCount > maxItemCardActionsTypesLines) {
  throw new Error(`record-reminder-item-card-actions.types.ts exceeded ${maxItemCardActionsTypesLines} lines: ${itemCardActionsTypesLineCount}`);
}

const maxAllowedLines = 85;
if (panelLineCount > maxAllowedLines) {
  throw new Error(`record-reminder-panel.tsx exceeded ${maxAllowedLines} lines: ${panelLineCount}`);
}

console.log("record-reminder-panel structure verification passed");

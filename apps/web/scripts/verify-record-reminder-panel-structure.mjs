import fs from "node:fs";
import path from "node:path";

const panelPath = path.resolve(process.cwd(), "components/record-reminder-panel.tsx");
const panelSource = fs.readFileSync(panelPath, "utf8");
const panelLineCount = panelSource.split(/\r?\n/).length;
const formPath = path.resolve(process.cwd(), "components/record-reminder-form.tsx");
const formSource = fs.readFileSync(formPath, "utf8");
const itemCardPath = path.resolve(process.cwd(), "components/record-reminder-item-card.tsx");
const itemCardSource = fs.readFileSync(itemCardPath, "utf8");

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

if (!formSource.includes('type="datetime-local"')) {
  throw new Error("record-reminder-form.tsx must keep datetime input rendering");
}

if (!itemCardSource.includes('reminder.status !== "completed"')) {
  throw new Error("record-reminder-item-card.tsx must keep completed-status gating");
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

const maxAllowedLines = 85;
if (panelLineCount > maxAllowedLines) {
  throw new Error(`record-reminder-panel.tsx exceeded ${maxAllowedLines} lines: ${panelLineCount}`);
}

console.log("record-reminder-panel structure verification passed");

import fs from "node:fs";
import path from "node:path";

const fieldsPath = path.resolve(process.cwd(), "components/record-editor-fields.tsx");
const fieldsSource = fs.readFileSync(fieldsPath, "utf8");
const fieldsLineCount = fieldsSource.split(/\r?\n/).length;
const primaryPath = path.resolve(process.cwd(), "components/record-editor-primary-fields.tsx");
const primarySource = fs.readFileSync(primaryPath, "utf8");
const metadataPath = path.resolve(process.cwd(), "components/record-editor-metadata-fields.tsx");
const metadataSource = fs.readFileSync(metadataPath, "utf8");
const locationPath = path.resolve(process.cwd(), "components/record-editor-location-fields.tsx");
const locationSource = fs.readFileSync(locationPath, "utf8");

if (!fieldsSource.includes('import { RecordEditorPrimaryFields } from "./record-editor-primary-fields";')) {
  throw new Error("record-editor-fields.tsx must import RecordEditorPrimaryFields");
}

if (!fieldsSource.includes('import { RecordEditorMetadataFields } from "./record-editor-metadata-fields";')) {
  throw new Error("record-editor-fields.tsx must import RecordEditorMetadataFields");
}

if (!fieldsSource.includes('import { RecordEditorLocationFields } from "./record-editor-location-fields";')) {
  throw new Error("record-editor-fields.tsx must import RecordEditorLocationFields");
}

if (!fieldsSource.includes('import type { RecordEditorFieldsProps } from "./record-editor-fields.types";')) {
  throw new Error("record-editor-fields.tsx must import RecordEditorFieldsProps");
}

if (!fieldsSource.includes("<RecordEditorPrimaryFields")) {
  throw new Error("record-editor-fields.tsx must delegate primary field rendering");
}

if (!fieldsSource.includes("<RecordEditorMetadataFields")) {
  throw new Error("record-editor-fields.tsx must delegate metadata field rendering");
}

if (!fieldsSource.includes("<RecordEditorLocationFields")) {
  throw new Error("record-editor-fields.tsx must delegate location field rendering");
}

if (!metadataSource.includes('type="datetime-local"')) {
  throw new Error("record-editor-metadata-fields.tsx must keep occurred-at input rendering");
}

if (!locationSource.includes('inputMode="decimal"')) {
  throw new Error("record-editor-location-fields.tsx must keep decimal coordinate inputs");
}

if (!primarySource.includes("panelCopy.contentPlaceholder")) {
  throw new Error("record-editor-primary-fields.tsx must keep content placeholder rendering");
}

for (const forbiddenToken of [
  'type="datetime-local"',
  'inputMode="decimal"',
  "<option value=\"memo\">",
  "form.location.place_name",
]) {
  if (fieldsSource.includes(forbiddenToken)) {
    throw new Error(`record-editor-fields.tsx must keep field groups delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 75;
if (fieldsLineCount > maxAllowedLines) {
  throw new Error(`record-editor-fields.tsx exceeded ${maxAllowedLines} lines: ${fieldsLineCount}`);
}

console.log("record-editor-fields structure verification passed");

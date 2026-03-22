import fs from "node:fs";
import path from "node:path";

const providerSettingsPath = path.resolve(process.cwd(), "components/provider-settings-panel.tsx");
const source = fs.readFileSync(providerSettingsPath, "utf8");
const lineCount = source.split(/\r?\n/).length;

if (!source.includes('import { useProviderSettingsController } from "./use-provider-settings-controller";')) {
  throw new Error("provider-settings-panel.tsx must import useProviderSettingsController");
}

if (!source.includes('import { MediaStorageHealthCard } from "./media-storage-health-card";')) {
  throw new Error("provider-settings-panel.tsx must import MediaStorageHealthCard");
}

if (!source.includes("useProviderSettingsController({")) {
  throw new Error("provider-settings-panel.tsx must delegate draft and save orchestration to useProviderSettingsController");
}

if (!source.includes("<MediaStorageHealthCard")) {
  throw new Error("provider-settings-panel.tsx must render MediaStorageHealthCard for media storage health presentation");
}

for (const forbiddenToken of [
  "useState(",
  "useEffect(",
  "const [providerSavingCode",
  "const [providerDrafts",
  "const [error",
  "function buildProviderDraft",
  "function getActionErrorMessage",
  "const handleSaveProviderConfig =",
  "const handleResetProviderConfig =",
  'id="provider-media_storage-health"',
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`provider-settings-panel.tsx must keep controller logic delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 500;
if (lineCount > maxAllowedLines) {
  throw new Error(`provider-settings-panel.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

console.log("provider-settings structure verification passed");

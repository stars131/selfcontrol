import fs from "node:fs";
import path from "node:path";

const providerSettingsPath = path.resolve(process.cwd(), "components/provider-settings-panel.tsx");
const source = fs.readFileSync(providerSettingsPath, "utf8");
const lineCount = source.split(/\r?\n/).length;
const providerFeatureCardPath = path.resolve(process.cwd(), "components/provider-feature-card.tsx");
const providerFeatureCardSource = fs.readFileSync(providerFeatureCardPath, "utf8");
const providerFeatureCardLineCount = providerFeatureCardSource.split(/\r?\n/).length;

if (!source.includes('import { useProviderSettingsController } from "./use-provider-settings-controller";')) {
  throw new Error("provider-settings-panel.tsx must import useProviderSettingsController");
}

if (!source.includes('import { getProviderSettingsCopy } from "./provider-settings-copy";')) {
  throw new Error("provider-settings-panel.tsx must import getProviderSettingsCopy");
}

if (!source.includes('import { ProviderFeatureCard } from "./provider-feature-card";')) {
  throw new Error("provider-settings-panel.tsx must import ProviderFeatureCard");
}

if (!source.includes("useProviderSettingsController({")) {
  throw new Error("provider-settings-panel.tsx must delegate draft and save orchestration to useProviderSettingsController");
}

if (!source.includes("<ProviderFeatureCard")) {
  throw new Error("provider-settings-panel.tsx must delegate feature form rendering to ProviderFeatureCard");
}

if (!source.includes("getProviderSettingsCopy(locale)")) {
  throw new Error("provider-settings-panel.tsx must delegate locale copy lookup to getProviderSettingsCopy");
}

if (!providerFeatureCardSource.includes('import { MediaStorageHealthCard } from "./media-storage-health-card";')) {
  throw new Error("provider-feature-card.tsx must import MediaStorageHealthCard");
}

if (!providerFeatureCardSource.includes('import { ProviderFeatureMediaStorageOptions } from "./provider-feature-media-storage-options";')) {
  throw new Error("provider-feature-card.tsx must import ProviderFeatureMediaStorageOptions");
}

if (!providerFeatureCardSource.includes("<MediaStorageHealthCard")) {
  throw new Error("provider-feature-card.tsx must render MediaStorageHealthCard for media storage health presentation");
}

if (!providerFeatureCardSource.includes("<ProviderFeatureMediaStorageOptions")) {
  throw new Error("provider-feature-card.tsx must delegate media-storage option rendering to ProviderFeatureMediaStorageOptions");
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
  'id={`provider-${item.feature_code}`}',
  "draftItem.is_enabled",
  "MEDIA_STORAGE_FALLBACK_OPTION",
  "const COPY:",
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`provider-settings-panel.tsx must keep controller logic delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 130;
if (lineCount > maxAllowedLines) {
  throw new Error(`provider-settings-panel.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

const maxProviderFeatureCardLines = 170;
if (providerFeatureCardLineCount > maxProviderFeatureCardLines) {
  throw new Error(
    `provider-feature-card.tsx exceeded ${maxProviderFeatureCardLines} lines: ${providerFeatureCardLineCount}`,
  );
}

console.log("provider-settings structure verification passed");

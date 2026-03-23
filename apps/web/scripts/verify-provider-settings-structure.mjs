import fs from "node:fs";
import path from "node:path";

const providerSettingsPath = path.resolve(process.cwd(), "components/provider-settings-panel.tsx");
const providerSettingsControllerPath = path.resolve(
  process.cwd(),
  "components/use-provider-settings-controller.ts",
);
const providerSettingsCopyPath = path.resolve(process.cwd(), "components/provider-settings-copy.ts");
const source = fs.readFileSync(providerSettingsPath, "utf8");
const controllerSource = fs.readFileSync(providerSettingsControllerPath, "utf8");
const copySource = fs.readFileSync(providerSettingsCopyPath, "utf8");
const lineCount = source.split(/\r?\n/).length;
const controllerLineCount = controllerSource.split(/\r?\n/).length;
const copyLineCount = copySource.split(/\r?\n/).length;
const providerFeatureCardPath = path.resolve(process.cwd(), "components/provider-feature-card.tsx");
const providerFeatureCardSource = fs.readFileSync(providerFeatureCardPath, "utf8");
const providerFeatureCardLineCount = providerFeatureCardSource.split(/\r?\n/).length;
const providerFeatureCardFieldsPath = path.resolve(process.cwd(), "components/provider-feature-card-fields.tsx");
const providerFeatureCardFieldsSource = fs.readFileSync(providerFeatureCardFieldsPath, "utf8");

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

if (!providerFeatureCardSource.includes('import { ProviderFeatureCardFields } from "./provider-feature-card-fields";')) {
  throw new Error("provider-feature-card.tsx must import ProviderFeatureCardFields");
}

if (!providerFeatureCardSource.includes('import { ProviderFeatureCardStatus } from "./provider-feature-card-status";')) {
  throw new Error("provider-feature-card.tsx must import ProviderFeatureCardStatus");
}

if (!providerFeatureCardSource.includes('import type { ProviderFeatureCardProps } from "./provider-feature-card.types";')) {
  throw new Error("provider-feature-card.tsx must import ProviderFeatureCardProps");
}

if (!providerFeatureCardFieldsSource.includes('import { ProviderFeatureMediaStorageOptions } from "./provider-feature-media-storage-options";')) {
  throw new Error("provider-feature-card-fields.tsx must import ProviderFeatureMediaStorageOptions");
}

if (!providerFeatureCardSource.includes("<MediaStorageHealthCard")) {
  throw new Error("provider-feature-card.tsx must render MediaStorageHealthCard for media storage health presentation");
}

if (!providerFeatureCardSource.includes("<ProviderFeatureCardFields")) {
  throw new Error("provider-feature-card.tsx must delegate provider field rendering to ProviderFeatureCardFields");
}

if (!providerFeatureCardSource.includes("<ProviderFeatureCardStatus")) {
  throw new Error("provider-feature-card.tsx must delegate provider status rendering to ProviderFeatureCardStatus");
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

const maxProviderFeatureCardLines = 120;
if (providerFeatureCardLineCount > maxProviderFeatureCardLines) {
  throw new Error(
    `provider-feature-card.tsx exceeded ${maxProviderFeatureCardLines} lines: ${providerFeatureCardLineCount}`,
  );
}

for (const requiredControllerImport of [
  'from "./provider-settings-controller-actions";',
  'from "./provider-settings-controller.types";',
  'from "./use-provider-settings-draft-sync";',
]) {
  if (!controllerSource.includes(requiredControllerImport)) {
    throw new Error(`use-provider-settings-controller.ts must import delegated helpers: ${requiredControllerImport}`);
  }
}

for (const requiredControllerUsage of [
  "useProviderSettingsDraftSync({ providerConfigs, setProviderDrafts })",
  "createProviderSettingsControllerActions({",
  "...actions",
]) {
  if (!controllerSource.includes(requiredControllerUsage)) {
    throw new Error(`use-provider-settings-controller.ts must delegate controller orchestration: ${requiredControllerUsage}`);
  }
}

for (const forbiddenControllerToken of [
  "useEffect(",
  "function buildProviderDraft",
  "function getActionErrorMessage",
  "const handleSaveProviderConfig =",
  "const handleResetProviderConfig =",
  "JSON.stringify(buildProviderDraft(item))",
]) {
  if (controllerSource.includes(forbiddenControllerToken)) {
    throw new Error(`use-provider-settings-controller.ts must keep draft details delegated: ${forbiddenControllerToken}`);
  }
}

const maxControllerLines = 40;
if (controllerLineCount > maxControllerLines) {
  throw new Error(
    `use-provider-settings-controller.ts exceeded ${maxControllerLines} lines: ${controllerLineCount}`,
  );
}

for (const requiredCopyImport of [
  'from "./provider-settings-copy.payload";',
  'from "./provider-settings-copy.types";',
]) {
  if (!copySource.includes(requiredCopyImport)) {
    throw new Error(`provider-settings-copy.ts must import delegated copy modules: ${requiredCopyImport}`);
  }
}

for (const requiredCopyUsage of [
  "PROVIDER_SETTINGS_COPY[locale]",
  'export type { ProviderSettingsCopy } from "./provider-settings-copy.types";',
]) {
  if (!copySource.includes(requiredCopyUsage)) {
    throw new Error(`provider-settings-copy.ts must remain a thin copy wrapper: ${requiredCopyUsage}`);
  }
}

for (const forbiddenCopyToken of [
  "const COPY:",
  '"zh-CN": {',
  'en: {',
  'ja: {',
]) {
  if (copySource.includes(forbiddenCopyToken)) {
    throw new Error(`provider-settings-copy.ts must keep locale payload delegated: ${forbiddenCopyToken}`);
  }
}

const maxCopyLines = 15;
if (copyLineCount > maxCopyLines) {
  throw new Error(`provider-settings-copy.ts exceeded ${maxCopyLines} lines: ${copyLineCount}`);
}

console.log("provider-settings structure verification passed");

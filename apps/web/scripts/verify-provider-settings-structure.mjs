import fs from "node:fs";
import path from "node:path";

const providerSettingsPath = path.resolve(process.cwd(), "components/provider-settings-panel.tsx");
const providerSettingsControllerPath = path.resolve(
  process.cwd(),
  "components/use-provider-settings-controller.ts",
);
const providerSettingsPanelHelpersPath = path.resolve(
  process.cwd(),
  "components/provider-settings-panel-helpers.ts",
);
const providerSettingsFeatureListPath = path.resolve(
  process.cwd(),
  "components/provider-settings-feature-list.tsx",
);
const providerSettingsPanelTypesPath = path.resolve(
  process.cwd(),
  "components/provider-settings-panel.types.ts",
);
const providerSettingsCopyPath = path.resolve(process.cwd(), "components/provider-settings-copy.ts");
const source = fs.readFileSync(providerSettingsPath, "utf8");
const controllerSource = fs.readFileSync(providerSettingsControllerPath, "utf8");
const panelHelpersSource = fs.readFileSync(providerSettingsPanelHelpersPath, "utf8");
const featureListSource = fs.readFileSync(providerSettingsFeatureListPath, "utf8");
const panelTypesSource = fs.readFileSync(providerSettingsPanelTypesPath, "utf8");
const copySource = fs.readFileSync(providerSettingsCopyPath, "utf8");
const lineCount = source.split(/\r?\n/).length;
const controllerLineCount = controllerSource.split(/\r?\n/).length;
const panelHelpersLineCount = panelHelpersSource.split(/\r?\n/).length;
const featureListLineCount = featureListSource.split(/\r?\n/).length;
const panelTypesLineCount = panelTypesSource.split(/\r?\n/).length;
const copyLineCount = copySource.split(/\r?\n/).length;
const providerFeatureCardPath = path.resolve(process.cwd(), "components/provider-feature-card.tsx");
const providerFeatureCardSource = fs.readFileSync(providerFeatureCardPath, "utf8");
const providerFeatureCardLineCount = providerFeatureCardSource.split(/\r?\n/).length;
const providerFeatureCardActionsPath = path.resolve(
  process.cwd(),
  "components/provider-feature-card-actions.tsx",
);
const providerFeatureCardActionsSource = fs.readFileSync(providerFeatureCardActionsPath, "utf8");
const providerFeatureCardActionsLineCount =
  providerFeatureCardActionsSource.split(/\r?\n/).length;
const providerFeatureCardHelpersPath = path.resolve(
  process.cwd(),
  "components/provider-feature-card-helpers.ts",
);
const providerFeatureCardHelpersSource = fs.readFileSync(providerFeatureCardHelpersPath, "utf8");
const providerFeatureCardHelpersLineCount =
  providerFeatureCardHelpersSource.split(/\r?\n/).length;
const providerFeatureCardFieldsPath = path.resolve(process.cwd(), "components/provider-feature-card-fields.tsx");
const providerFeatureCardFieldsSource = fs.readFileSync(providerFeatureCardFieldsPath, "utf8");
const mediaStorageHealthCardPath = path.resolve(
  process.cwd(),
  "components/media-storage-health-card.tsx",
);
const mediaStorageHealthCardSource = fs.readFileSync(mediaStorageHealthCardPath, "utf8");
const mediaStorageHealthCardLineCount = mediaStorageHealthCardSource.split(/\r?\n/).length;
const mediaStorageHealthCapabilitiesPath = path.resolve(
  process.cwd(),
  "components/media-storage-health-capabilities.tsx",
);
const mediaStorageHealthCapabilitiesSource = fs.readFileSync(
  mediaStorageHealthCapabilitiesPath,
  "utf8",
);
const mediaStorageHealthCapabilitiesLineCount =
  mediaStorageHealthCapabilitiesSource.split(/\r?\n/).length;
const mediaStorageHealthCardTypesPath = path.resolve(
  process.cwd(),
  "components/media-storage-health-card.types.ts",
);
const mediaStorageHealthCardTypesSource = fs.readFileSync(
  mediaStorageHealthCardTypesPath,
  "utf8",
);
const mediaStorageHealthCardTypesLineCount =
  mediaStorageHealthCardTypesSource.split(/\r?\n/).length;

if (!source.includes('import { useProviderSettingsController } from "./use-provider-settings-controller";')) {
  throw new Error("provider-settings-panel.tsx must import useProviderSettingsController");
}

if (!source.includes('import { getProviderSettingsCopy } from "./provider-settings-copy";')) {
  throw new Error("provider-settings-panel.tsx must import getProviderSettingsCopy");
}

if (!source.includes('import { ProviderSettingsFeatureList } from "./provider-settings-feature-list";')) {
  throw new Error("provider-settings-panel.tsx must import ProviderSettingsFeatureList");
}

if (!source.includes('import type { ProviderSettingsPanelProps } from "./provider-settings-panel.types";')) {
  throw new Error("provider-settings-panel.tsx must import ProviderSettingsPanelProps");
}

if (!source.includes('from "./provider-settings-panel-helpers";')) {
  throw new Error("provider-settings-panel.tsx must import provider-settings-panel-helpers");
}

if (!source.includes("useProviderSettingsController({")) {
  throw new Error("provider-settings-panel.tsx must delegate draft and save orchestration to useProviderSettingsController");
}

if (!source.includes("<ProviderSettingsFeatureList")) {
  throw new Error("provider-settings-panel.tsx must delegate feature list rendering to ProviderSettingsFeatureList");
}

if (!source.includes("getProviderSettingsCopy(locale)")) {
  throw new Error("provider-settings-panel.tsx must delegate locale copy lookup to getProviderSettingsCopy");
}

for (const requiredPanelUsage of [
  'readProviderSettingsAnchorHighlightClass("provider-settings", highlightedAnchor)',
]) {
  if (!source.includes(requiredPanelUsage)) {
    throw new Error(`provider-settings-panel.tsx must delegate view helper logic: ${requiredPanelUsage}`);
  }
}

for (const forbiddenPanelToken of [
  'import type { LocaleCode } from "../lib/locale";',
  'import type { MediaStorageProviderHealth, ProviderFeatureConfig } from "../lib/types";',
  'import { ProviderFeatureCard } from "./provider-feature-card";',
  "buildProviderSettingsSecretStatusFormatter(copy)",
  "buildProviderFeatureCardProps({",
  'className="record-list compact-list"',
  "providerConfigs.map((item) => {",
  "type ProviderSettingsPanelProps = {",
]) {
  if (source.includes(forbiddenPanelToken)) {
    throw new Error(`provider-settings-panel.tsx must keep feature-list and props internals delegated: ${forbiddenPanelToken}`);
  }
}

const maxAllowedLines = 90;
if (lineCount > maxAllowedLines) {
  throw new Error(`provider-settings-panel.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

for (const requiredFeatureListImport of [
  'import { ProviderFeatureCard } from "./provider-feature-card";',
  'from "./provider-settings-panel-helpers";',
  'import type { ProviderSettingsPanelProps } from "./provider-settings-panel.types";',
  'import type { ProviderDraft } from "./provider-settings-controller.types";',
]) {
  if (!featureListSource.includes(requiredFeatureListImport)) {
    throw new Error(`provider-settings-feature-list.tsx must import shared provider feature-list dependencies: ${requiredFeatureListImport}`);
  }
}

for (const requiredFeatureListUsage of [
  "buildProviderSettingsSecretStatusFormatter(copy)",
  "buildProviderFeatureCardProps({",
  "providerConfigs.map((item) => {",
  "<ProviderFeatureCard",
  "isProviderDraftDirty(item)",
]) {
  if (!featureListSource.includes(requiredFeatureListUsage)) {
    throw new Error(`provider-settings-feature-list.tsx must own feature-card list rendering: ${requiredFeatureListUsage}`);
  }
}

const maxFeatureListLines = 85;
if (featureListLineCount > maxFeatureListLines) {
  throw new Error(`provider-settings-feature-list.tsx exceeded ${maxFeatureListLines} lines: ${featureListLineCount}`);
}

for (const requiredPanelTypesUsage of [
  "export type ProviderSettingsPanelProps = {",
  "providerConfigs: ProviderFeatureConfig[];",
  "onSaveProviderConfig: UseProviderSettingsControllerProps[\"onSaveProviderConfig\"];",
]) {
  if (!panelTypesSource.includes(requiredPanelTypesUsage)) {
    throw new Error(`provider-settings-panel.types.ts must own shared panel prop contracts: ${requiredPanelTypesUsage}`);
  }
}

const maxPanelTypesLines = 20;
if (panelTypesLineCount > maxPanelTypesLines) {
  throw new Error(`provider-settings-panel.types.ts exceeded ${maxPanelTypesLines} lines: ${panelTypesLineCount}`);
}

if (!providerFeatureCardSource.includes('import { MediaStorageHealthCard } from "./media-storage-health-card";')) {
  throw new Error("provider-feature-card.tsx must import MediaStorageHealthCard");
}

if (!providerFeatureCardSource.includes('import { ProviderFeatureCardActions } from "./provider-feature-card-actions";')) {
  throw new Error("provider-feature-card.tsx must import ProviderFeatureCardActions");
}

if (!providerFeatureCardSource.includes('import { readProviderFeatureCardAnchorHighlightClass } from "./provider-feature-card-helpers";')) {
  throw new Error("provider-feature-card.tsx must import readProviderFeatureCardAnchorHighlightClass");
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

if (!providerFeatureCardSource.includes("<ProviderFeatureCardActions")) {
  throw new Error("provider-feature-card.tsx must delegate action row rendering to ProviderFeatureCardActions");
}

for (const forbiddenProviderFeatureCardToken of [
  "function readAnchorHighlightClass",
  'highlightedAnchor === targetId ? " anchor-highlight" : ""',
  'className="action-row"',
  "copy.reset",
  "copy.saveProvider",
]) {
  if (providerFeatureCardSource.includes(forbiddenProviderFeatureCardToken)) {
    throw new Error(
      `provider-feature-card.tsx must keep helper and action-row details delegated: ${forbiddenProviderFeatureCardToken}`,
    );
  }
}

for (const requiredHealthCardImport of [
  'import { MediaStorageHealthCapabilities } from "./media-storage-health-capabilities";',
  'import type { MediaStorageHealthCardProps } from "./media-storage-health-card.types";',
]) {
  if (!mediaStorageHealthCardSource.includes(requiredHealthCardImport)) {
    throw new Error(
      `media-storage-health-card.tsx must import delegated health-card boundaries: ${requiredHealthCardImport}`,
    );
  }
}

if (!mediaStorageHealthCardSource.includes("<MediaStorageHealthCapabilities")) {
  throw new Error("media-storage-health-card.tsx must delegate capability grid rendering to MediaStorageHealthCapabilities");
}

for (const forbiddenHealthCardToken of [
  'import type { LocaleCode } from "../lib/locale";',
  'import type { MediaStorageProviderHealth, ProviderFeatureConfig } from "../lib/types";',
  "type MediaStorageHealthCopy = {",
  "copy.upload",
  "copy.download",
  "copy.delete",
  "mediaStorageHealth.capabilities.upload",
  "mediaStorageHealth.capabilities.download",
  "mediaStorageHealth.capabilities.delete",
]) {
  if (mediaStorageHealthCardSource.includes(forbiddenHealthCardToken)) {
    throw new Error(
      `media-storage-health-card.tsx must keep capability grid and prop typing delegated: ${forbiddenHealthCardToken}`,
    );
  }
}

const maxMediaStorageHealthCardLines = 90;
if (mediaStorageHealthCardLineCount > maxMediaStorageHealthCardLines) {
  throw new Error(
    `media-storage-health-card.tsx exceeded ${maxMediaStorageHealthCardLines} lines: ${mediaStorageHealthCardLineCount}`,
  );
}

for (const requiredHealthCapabilitiesImport of [
  'import type { MediaStorageHealthCardProps } from "./media-storage-health-card.types";',
]) {
  if (!mediaStorageHealthCapabilitiesSource.includes(requiredHealthCapabilitiesImport)) {
    throw new Error(
      `media-storage-health-capabilities.tsx must import shared health-card props: ${requiredHealthCapabilitiesImport}`,
    );
  }
}

for (const requiredHealthCapabilitiesUsage of [
  "export function MediaStorageHealthCapabilities({",
  "copy.upload",
  "copy.download",
  "copy.delete",
  "mediaStorageHealth.capabilities.upload",
  "mediaStorageHealth.capabilities.download",
  "mediaStorageHealth.capabilities.delete",
]) {
  if (!mediaStorageHealthCapabilitiesSource.includes(requiredHealthCapabilitiesUsage)) {
    throw new Error(
      `media-storage-health-capabilities.tsx must own capability grid rendering: ${requiredHealthCapabilitiesUsage}`,
    );
  }
}

const maxMediaStorageHealthCapabilitiesLines = 40;
if (mediaStorageHealthCapabilitiesLineCount > maxMediaStorageHealthCapabilitiesLines) {
  throw new Error(
    `media-storage-health-capabilities.tsx exceeded ${maxMediaStorageHealthCapabilitiesLines} lines: ${mediaStorageHealthCapabilitiesLineCount}`,
  );
}

for (const requiredHealthTypesUsage of [
  "export type MediaStorageHealthCopy = {",
  "export type MediaStorageHealthCardProps = {",
  'readAnchorHighlightClass: (targetId: string, highlightedAnchor?: string | null) => string;',
]) {
  if (!mediaStorageHealthCardTypesSource.includes(requiredHealthTypesUsage)) {
    throw new Error(
      `media-storage-health-card.types.ts must own shared health-card prop types: ${requiredHealthTypesUsage}`,
    );
  }
}

const maxMediaStorageHealthCardTypesLines = 35;
if (mediaStorageHealthCardTypesLineCount > maxMediaStorageHealthCardTypesLines) {
  throw new Error(
    `media-storage-health-card.types.ts exceeded ${maxMediaStorageHealthCardTypesLines} lines: ${mediaStorageHealthCardTypesLineCount}`,
  );
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
  "function readAnchorHighlightClass",
  'highlightedAnchor === targetId ? " anchor-highlight" : ""',
  'status === "configured"',
  "copy.configured",
  'id={`provider-${item.feature_code}`}',
  "draftItem.is_enabled",
  "MEDIA_STORAGE_FALLBACK_OPTION",
  "const COPY:",
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`provider-settings-panel.tsx must keep controller logic delegated: ${forbiddenToken}`);
  }
}

for (const requiredPanelHelpersImport of [
  'from "./provider-feature-card.types";',
  'from "./provider-settings-controller.types";',
  'from "./provider-settings-copy";',
]) {
  if (!panelHelpersSource.includes(requiredPanelHelpersImport)) {
    throw new Error(
      `provider-settings-panel-helpers.ts must import shared provider helper types: ${requiredPanelHelpersImport}`,
    );
  }
}

for (const requiredPanelHelpersUsage of [
  "export function readProviderSettingsAnchorHighlightClass(",
  "export function buildProviderSettingsSecretStatusFormatter(copy: ProviderSettingsCopy)",
  "export function buildProviderFeatureCardProps({",
  "return highlightedAnchor === targetId ? \" anchor-highlight\" : \"\";",
  "return copy.notRequired;",
]) {
  if (!panelHelpersSource.includes(requiredPanelHelpersUsage)) {
    throw new Error(
      `provider-settings-panel-helpers.ts must own panel helper logic: ${requiredPanelHelpersUsage}`,
    );
  }
}

for (const forbiddenPanelHelpersToken of [
  "<ProviderFeatureCard",
  "useProviderSettingsController(",
  "useState(",
  "useEffect(",
]) {
  if (panelHelpersSource.includes(forbiddenPanelHelpersToken)) {
    throw new Error(
      `provider-settings-panel-helpers.ts must keep rendering and controller orchestration delegated: ${forbiddenPanelHelpersToken}`,
    );
  }
}

const maxPanelHelpersLines = 80;
if (panelHelpersLineCount > maxPanelHelpersLines) {
  throw new Error(
    `provider-settings-panel-helpers.ts exceeded ${maxPanelHelpersLines} lines: ${panelHelpersLineCount}`,
  );
}

const maxProviderFeatureCardLines = 120;
if (providerFeatureCardLineCount > maxProviderFeatureCardLines) {
  throw new Error(
    `provider-feature-card.tsx exceeded ${maxProviderFeatureCardLines} lines: ${providerFeatureCardLineCount}`,
  );
}

for (const requiredProviderFeatureCardActionsImport of [
  'import type { ProviderFeatureCardProps } from "./provider-feature-card.types";',
]) {
  if (!providerFeatureCardActionsSource.includes(requiredProviderFeatureCardActionsImport)) {
    throw new Error(
      `provider-feature-card-actions.tsx must import shared provider feature card props: ${requiredProviderFeatureCardActionsImport}`,
    );
  }
}

for (const requiredProviderFeatureCardActionsUsage of [
  "export function ProviderFeatureCardActions({",
  "copy.reset",
  "copy.saveProvider",
  "providerSavingCode === item.feature_code ? copy.saving : copy.saveProvider",
]) {
  if (!providerFeatureCardActionsSource.includes(requiredProviderFeatureCardActionsUsage)) {
    throw new Error(
      `provider-feature-card-actions.tsx must own action-row rendering: ${requiredProviderFeatureCardActionsUsage}`,
    );
  }
}

const maxProviderFeatureCardActionsLines = 40;
if (providerFeatureCardActionsLineCount > maxProviderFeatureCardActionsLines) {
  throw new Error(
    `provider-feature-card-actions.tsx exceeded ${maxProviderFeatureCardActionsLines} lines: ${providerFeatureCardActionsLineCount}`,
  );
}

for (const requiredProviderFeatureCardHelpersUsage of [
  "export function readProviderFeatureCardAnchorHighlightClass(",
  'return highlightedAnchor === targetId ? " anchor-highlight" : "";',
]) {
  if (!providerFeatureCardHelpersSource.includes(requiredProviderFeatureCardHelpersUsage)) {
    throw new Error(
      `provider-feature-card-helpers.ts must own anchor highlight helper logic: ${requiredProviderFeatureCardHelpersUsage}`,
    );
  }
}

const maxProviderFeatureCardHelpersLines = 15;
if (providerFeatureCardHelpersLineCount > maxProviderFeatureCardHelpersLines) {
  throw new Error(
    `provider-feature-card-helpers.ts exceeded ${maxProviderFeatureCardHelpersLines} lines: ${providerFeatureCardHelpersLineCount}`,
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

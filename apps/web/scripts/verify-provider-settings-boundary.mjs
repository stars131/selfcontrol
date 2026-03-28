import fs from "node:fs";
import path from "node:path";

const componentsDir = path.resolve(process.cwd(), "components");
const settingsPagePath = path.resolve(process.cwd(), "app/app/workspaces/[workspaceId]/settings/page.tsx");
const workspacePagePath = path.resolve(process.cwd(), "app/app/workspaces/[workspaceId]/page.tsx");
const workspaceShellClientPath = path.resolve(process.cwd(), "components/workspace-shell-client.tsx");
const workspaceShellPanelsPath = path.resolve(process.cwd(), "components/workspace-shell-panels.tsx");
const workspaceSettingsClientPath = path.resolve(process.cwd(), "components/workspace-settings-client.tsx");
const workspaceSettingsProviderSectionPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-provider-section.tsx",
);
const providerSettingsPanelPath = path.resolve(process.cwd(), "components/provider-settings-panel.tsx");

const settingsPageSource = fs.readFileSync(settingsPagePath, "utf8");
const workspacePageSource = fs.readFileSync(workspacePagePath, "utf8");
const workspaceShellClientSource = fs.readFileSync(workspaceShellClientPath, "utf8");
const workspaceShellPanelsSource = fs.readFileSync(workspaceShellPanelsPath, "utf8");
const workspaceSettingsClientSource = fs.readFileSync(workspaceSettingsClientPath, "utf8");
const workspaceSettingsProviderSectionSource = fs.readFileSync(
  workspaceSettingsProviderSectionPath,
  "utf8",
);
const providerSettingsPanelSource = fs.readFileSync(providerSettingsPanelPath, "utf8");

if (
  !settingsPageSource.includes(
    'import { WorkspaceSettingsClient } from "../../../../../components/workspace-settings-client";',
  )
) {
  throw new Error("settings page must render WorkspaceSettingsClient");
}

if (!settingsPageSource.includes("return <WorkspaceSettingsClient workspaceId={workspaceId} />;")) {
  throw new Error("settings page must pass resolved workspaceId into WorkspaceSettingsClient");
}

if (
  !workspacePageSource.includes(
    'import { WorkspaceShellClient } from "../../../../components/workspace-shell-client";',
  )
) {
  throw new Error("workspace page must render WorkspaceShellClient");
}

if (!workspacePageSource.includes("return <WorkspaceShellClient workspaceId={workspaceId} />;")) {
  throw new Error("workspace page must pass resolved workspaceId into WorkspaceShellClient");
}

for (const forbiddenWorkspacePageToken of [
  "ProviderSettingsPanel",
  "workspace-settings-client",
  "provider-settings-panel",
]) {
  if (workspacePageSource.includes(forbiddenWorkspacePageToken)) {
    throw new Error(`workspace page must keep provider settings out of the main workspace shell: ${forbiddenWorkspacePageToken}`);
  }
}

for (const forbiddenWorkspaceShellToken of [
  "ProviderSettingsPanel",
  "WorkspaceSettingsProviderSection",
  "handleSaveProviderConfig",
  "providerConfigs",
  "mediaStorageHealth",
  "refreshMediaStorageHealth",
]) {
  if (workspaceShellClientSource.includes(forbiddenWorkspaceShellToken)) {
    throw new Error(`workspace-shell-client.tsx must not own provider settings orchestration: ${forbiddenWorkspaceShellToken}`);
  }
}

for (const forbiddenWorkspacePanelsToken of [
  "ProviderSettingsPanel",
  "WorkspaceSettingsProviderSection",
  "providerConfigs",
  "mediaStorageHealth",
]) {
  if (workspaceShellPanelsSource.includes(forbiddenWorkspacePanelsToken)) {
    throw new Error(`workspace-shell-panels.tsx must keep provider settings out of workspace panels: ${forbiddenWorkspacePanelsToken}`);
  }
}

for (const requiredSettingsClientToken of [
  'import { useWorkspaceSettingsController } from "./use-workspace-settings-controller";',
  "providerConfigs,",
  "mediaStorageHealth,",
  "handleSaveProviderConfig,",
  "<WorkspaceSettingsMainContent",
  "providerSectionProps={buildWorkspaceSettingsProviderSectionProps({",
]) {
  if (!workspaceSettingsClientSource.includes(requiredSettingsClientToken)) {
    throw new Error(`workspace-settings-client.tsx must remain the provider settings entrypoint: ${requiredSettingsClientToken}`);
  }
}

for (const requiredSettingsProviderSectionToken of [
  'import { ProviderSettingsPanel } from "./provider-settings-panel";',
  "<ProviderSettingsPanel",
  "providerConfigs={providerConfigs}",
  "onSaveProviderConfig={onSaveProviderConfig}",
]) {
  if (!workspaceSettingsProviderSectionSource.includes(requiredSettingsProviderSectionToken)) {
    throw new Error(`workspace-settings-provider-section.tsx must bridge provider settings from the settings page: ${requiredSettingsProviderSectionToken}`);
  }
}

const componentFiles = fs.readdirSync(componentsDir).filter((name) => name.endsWith(".ts") || name.endsWith(".tsx"));
const providerSettingsImporters = [];

for (const fileName of componentFiles) {
  const filePath = path.resolve(componentsDir, fileName);
  const source = fs.readFileSync(filePath, "utf8");
  if (
    source.includes('from "./provider-settings-panel"') ||
    source.includes('from "./workspace-settings-provider-section"')
  ) {
    providerSettingsImporters.push(fileName);
  }
}

const allowedImporters = new Set([
  "workspace-settings-main-content.tsx",
  "workspace-settings-provider-section.tsx",
]);

for (const importer of providerSettingsImporters) {
  if (!allowedImporters.has(importer)) {
    throw new Error(`provider settings UI boundary only allows settings-page importers, found unexpected importer: ${importer}`);
  }
}

console.log("provider-settings boundary verification passed");

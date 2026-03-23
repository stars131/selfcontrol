import fs from "node:fs";
import path from "node:path";

const workspaceSettingsPath = path.resolve(process.cwd(), "components/workspace-settings-client.tsx");
const workspaceSettingsProviderSectionPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-provider-section.tsx",
);
const workspaceSettingsManagedSectionsPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-managed-sections.tsx",
);
const workspaceSettingsControllerPath = path.resolve(
  process.cwd(),
  "components/use-workspace-settings-controller.ts",
);
const source = fs.readFileSync(workspaceSettingsPath, "utf8");
const providerSectionSource = fs.readFileSync(workspaceSettingsProviderSectionPath, "utf8");
const managedSectionsSource = fs.readFileSync(workspaceSettingsManagedSectionsPath, "utf8");
const controllerSource = fs.readFileSync(workspaceSettingsControllerPath, "utf8");
const lineCount = source.split(/\r?\n/).length;
const controllerLineCount = controllerSource.split(/\r?\n/).length;

if (!source.includes('import { useWorkspaceSettingsController } from "./use-workspace-settings-controller";')) {
  throw new Error("workspace-settings-client.tsx must import useWorkspaceSettingsController");
}

if (!source.includes('import { getWorkspaceSettingsCopy } from "./workspace-settings-copy";')) {
  throw new Error("workspace-settings-client.tsx must import getWorkspaceSettingsCopy");
}

if (!source.includes("useWorkspaceSettingsController(router, workspaceId)")) {
  throw new Error("workspace-settings-client.tsx must delegate settings orchestration to useWorkspaceSettingsController");
}

if (!source.includes("getWorkspaceSettingsCopy(locale)")) {
  throw new Error("workspace-settings-client.tsx must delegate locale copy lookup to getWorkspaceSettingsCopy");
}

for (const requiredImport of [
  'import { WorkspaceSettingsHeader } from "./workspace-settings-header";',
  'import { WorkspaceSettingsOverviewCard } from "./workspace-settings-overview-card";',
  'import { WorkspaceSettingsProviderSection } from "./workspace-settings-provider-section";',
  'import { WorkspaceSettingsManagedSections } from "./workspace-settings-managed-sections";',
]) {
  if (!source.includes(requiredImport)) {
    throw new Error(`workspace-settings-client.tsx must import delegated settings sections: ${requiredImport}`);
  }
}

for (const requiredUsage of [
  "<WorkspaceSettingsHeader",
  "<WorkspaceSettingsOverviewCard",
  "<WorkspaceSettingsProviderSection",
  "<WorkspaceSettingsManagedSections",
]) {
  if (!source.includes(requiredUsage)) {
    throw new Error(`workspace-settings-client.tsx must compose delegated settings sections: ${requiredUsage}`);
  }
}

if (!providerSectionSource.includes('import { ProviderSettingsPanel } from "./provider-settings-panel";')) {
  throw new Error("workspace-settings-provider-section.tsx must import ProviderSettingsPanel");
}

for (const requiredProviderUsage of [
  "<ProviderSettingsPanel",
  "providerTitle",
  "viewerNotice",
]) {
  if (!providerSectionSource.includes(requiredProviderUsage)) {
    throw new Error(`workspace-settings-provider-section.tsx must own provider/viewer branching: ${requiredProviderUsage}`);
  }
}

for (const requiredManagedImport of [
  'import { WorkspaceMembersSection } from "./workspace-members-section";',
  'import { WorkspaceExportCard } from "./workspace-export-card";',
  'import { WorkspaceExportJobsCard } from "./workspace-export-jobs-card";',
  'import { WorkspaceMediaRetentionCard } from "./workspace-media-retention-card";',
]) {
  if (!managedSectionsSource.includes(requiredManagedImport)) {
    throw new Error(`workspace-settings-managed-sections.tsx must import delegated managed sections: ${requiredManagedImport}`);
  }
}

for (const requiredManagedUsage of [
  "<WorkspaceMembersSection",
  "<WorkspaceExportCard",
  "<WorkspaceExportJobsCard",
  "<WorkspaceMediaRetentionCard",
]) {
  if (!managedSectionsSource.includes(requiredManagedUsage)) {
    throw new Error(`workspace-settings-managed-sections.tsx must compose delegated managed sections: ${requiredManagedUsage}`);
  }
}

for (const forbiddenToken of [
  "useState(",
  "useEffect(",
  'from "../lib/api"',
  'from "../lib/auth"',
  "getStoredToken(",
  "const refreshMediaStorageHealthState =",
  "const handleSaveProviderConfig =",
  "const handleUpdateMemberRole =",
  "const handleRemoveMember =",
  "members.map((member)",
  "const COPY:",
  "process.env.NEXT_PUBLIC_API_BASE_URL",
  "process.env.NEXT_PUBLIC_AMAP_KEY",
  'className="panel-header"',
  "workspace?.role === \"owner\" || workspace?.role === \"editor\"",
  'import { ProviderSettingsPanel } from "./provider-settings-panel";',
  'import { WorkspaceMembersSection } from "./workspace-members-section";',
  'import { WorkspaceExportCard } from "./workspace-export-card";',
  'import { WorkspaceExportJobsCard } from "./workspace-export-jobs-card";',
  'import { WorkspaceMediaRetentionCard } from "./workspace-media-retention-card";',
  "<ProviderSettingsPanel",
  "<WorkspaceMembersSection",
  "<WorkspaceExportCard",
  "<WorkspaceExportJobsCard",
  "<WorkspaceMediaRetentionCard",
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`workspace-settings-client.tsx must keep controller logic delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 110;
if (lineCount > maxAllowedLines) {
  throw new Error(`workspace-settings-client.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

for (const requiredControllerImport of [
  'from "./workspace-settings-actions";',
  'from "./workspace-settings-controller.types";',
  'from "./use-workspace-settings-anchor";',
  'from "./use-workspace-settings-load";',
]) {
  if (!controllerSource.includes(requiredControllerImport)) {
    throw new Error(`use-workspace-settings-controller.ts must import delegated helpers: ${requiredControllerImport}`);
  }
}

for (const requiredControllerUsage of [
  "useWorkspaceSettingsAnchor({",
  "useWorkspaceSettingsLoad({ router, state, workspaceId })",
  "createWorkspaceSettingsActions({ state, workspaceId })",
  "...state",
  "...actions",
]) {
  if (!controllerSource.includes(requiredControllerUsage)) {
    throw new Error(`use-workspace-settings-controller.ts must delegate controller orchestration: ${requiredControllerUsage}`);
  }
}

for (const forbiddenControllerToken of [
  "useEffect(",
  'from "../lib/api";',
  'from "../lib/auth";',
  "getStoredToken(",
  "getCurrentUser(",
  "getWorkspace(",
  "getKnowledgeStats(",
  "listProviderConfigs(",
  "listWorkspaceMembers(",
  "getMediaStorageProviderHealth(",
  "updateProviderConfig(",
  "updateWorkspaceMember(",
  "deleteWorkspaceMember(",
  "window.addEventListener(",
  "scrollIntoView(",
  "const refreshMediaStorageHealthState =",
  "const handleSaveProviderConfig =",
  "const handleUpdateMemberRole =",
  "const handleRemoveMember =",
]) {
  if (controllerSource.includes(forbiddenControllerToken)) {
    throw new Error(`use-workspace-settings-controller.ts must keep effect and action internals delegated: ${forbiddenControllerToken}`);
  }
}

const maxControllerLines = 85;
if (controllerLineCount > maxControllerLines) {
  throw new Error(
    `use-workspace-settings-controller.ts exceeded ${maxControllerLines} lines: ${controllerLineCount}`,
  );
}

console.log("workspace-settings structure verification passed");

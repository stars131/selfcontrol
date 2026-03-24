import fs from "node:fs";
import path from "node:path";

const workspaceSettingsPath = path.resolve(process.cwd(), "components/workspace-settings-client.tsx");
const workspaceSettingsClientHelpersPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-client-helpers.ts",
);
const workspaceSettingsClientTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-client.types.ts",
);
const workspaceSettingsLoadingShellPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-loading-shell.tsx",
);
const workspaceSettingsProviderSectionPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-provider-section.tsx",
);
const workspaceSettingsProviderSectionTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-provider-section.types.ts",
);
const workspaceSettingsManagedSectionsPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-managed-sections.tsx",
);
const workspaceSettingsControllerPath = path.resolve(
  process.cwd(),
  "components/use-workspace-settings-controller.ts",
);
const workspaceSettingsActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-actions.ts",
);
const workspaceSettingsActionErrorPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-action-error.ts",
);
const workspaceSettingsProviderActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-provider-actions.ts",
);
const workspaceSettingsMemberActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-member-actions.ts",
);
const source = fs.readFileSync(workspaceSettingsPath, "utf8");
const clientHelpersSource = fs.readFileSync(workspaceSettingsClientHelpersPath, "utf8");
const clientTypesSource = fs.readFileSync(workspaceSettingsClientTypesPath, "utf8");
const loadingShellSource = fs.readFileSync(workspaceSettingsLoadingShellPath, "utf8");
const providerSectionSource = fs.readFileSync(workspaceSettingsProviderSectionPath, "utf8");
const providerSectionTypesSource = fs.readFileSync(workspaceSettingsProviderSectionTypesPath, "utf8");
const managedSectionsSource = fs.readFileSync(workspaceSettingsManagedSectionsPath, "utf8");
const controllerSource = fs.readFileSync(workspaceSettingsControllerPath, "utf8");
const actionsSource = fs.readFileSync(workspaceSettingsActionsPath, "utf8");
const actionErrorSource = fs.readFileSync(workspaceSettingsActionErrorPath, "utf8");
const providerActionsSource = fs.readFileSync(workspaceSettingsProviderActionsPath, "utf8");
const memberActionsSource = fs.readFileSync(workspaceSettingsMemberActionsPath, "utf8");
const lineCount = source.split(/\r?\n/).length;
const clientHelpersLineCount = clientHelpersSource.split(/\r?\n/).length;
const clientTypesLineCount = clientTypesSource.split(/\r?\n/).length;
const loadingShellLineCount = loadingShellSource.split(/\r?\n/).length;
const providerSectionTypesLineCount = providerSectionTypesSource.split(/\r?\n/).length;
const controllerLineCount = controllerSource.split(/\r?\n/).length;
const actionsLineCount = actionsSource.split(/\r?\n/).length;
const actionErrorLineCount = actionErrorSource.split(/\r?\n/).length;
const providerActionsLineCount = providerActionsSource.split(/\r?\n/).length;
const memberActionsLineCount = memberActionsSource.split(/\r?\n/).length;

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
  'from "./workspace-settings-client-helpers";',
  'import type { WorkspaceSettingsClientProps } from "./workspace-settings-client.types";',
  'import { WorkspaceSettingsLoadingShell } from "./workspace-settings-loading-shell";',
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
  "readWorkspaceSettingsManagedRole(workspace)",
  "<WorkspaceSettingsLoadingShell",
  "buildWorkspaceSettingsProviderSectionProps({",
  "buildWorkspaceSettingsManagedSectionsProps({",
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

if (!providerSectionSource.includes('import type { WorkspaceSettingsProviderSectionProps } from "./workspace-settings-provider-section.types";')) {
  throw new Error("workspace-settings-provider-section.tsx must import WorkspaceSettingsProviderSectionProps");
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

for (const forbiddenProviderSectionToken of [
  'import type { LocaleCode } from "../lib/locale";',
  'import type { MediaStorageProviderHealth, ProviderFeatureConfig } from "../lib/types";',
  "type WorkspaceSettingsProviderSectionProps = {",
]) {
  if (providerSectionSource.includes(forbiddenProviderSectionToken)) {
    throw new Error(`workspace-settings-provider-section.tsx must keep provider section props delegated: ${forbiddenProviderSectionToken}`);
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
  'className="panel auth-panel"',
  'className="panel-header"',
  "workspace?.role === \"owner\" || workspace?.role === \"editor\"",
  'workspace && workspace.role !== "viewer" ? workspace.role : null',
  'import { ProviderSettingsPanel } from "./provider-settings-panel";',
  'import { WorkspaceMembersSection } from "./workspace-members-section";',
  'import { WorkspaceExportCard } from "./workspace-export-card";',
  'import { WorkspaceExportJobsCard } from "./workspace-export-jobs-card";',
  'import { WorkspaceMediaRetentionCard } from "./workspace-media-retention-card";',
  "token ? async () => refreshMediaStorageHealthState(token) : null",
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

for (const requiredClientHelpersImport of [
  'from "../lib/types";',
  'from "./workspace-settings-managed-sections.types";',
  'from "./workspace-settings-provider-section.types";',
]) {
  if (!clientHelpersSource.includes(requiredClientHelpersImport)) {
    throw new Error(`workspace-settings-client-helpers.ts must import shared settings helper types: ${requiredClientHelpersImport}`);
  }
}

for (const requiredClientHelpersUsage of [
  "export function readWorkspaceSettingsManagedRole(workspace: Workspace | null)",
  'workspace && workspace.role !== "viewer" ? workspace.role : null',
  "export function buildWorkspaceSettingsProviderSectionProps({",
  "onRefreshMediaStorageHealth: token ? async () => refreshMediaStorageHealthState(token) : null",
  "export function buildWorkspaceSettingsManagedSectionsProps(",
]) {
  if (!clientHelpersSource.includes(requiredClientHelpersUsage)) {
    throw new Error(`workspace-settings-client-helpers.ts must own client-side settings mapping: ${requiredClientHelpersUsage}`);
  }
}

if (clientHelpersLineCount > 45) {
  throw new Error(`workspace-settings-client-helpers.ts exceeded 45 lines: ${clientHelpersLineCount}`);
}

for (const requiredClientTypesUsage of [
  "export type WorkspaceSettingsClientProps = {",
  "workspaceId: string;",
]) {
  if (!clientTypesSource.includes(requiredClientTypesUsage)) {
    throw new Error(`workspace-settings-client.types.ts must own shared client props: ${requiredClientTypesUsage}`);
  }
}

if (clientTypesLineCount > 5) {
  throw new Error(`workspace-settings-client.types.ts exceeded 5 lines: ${clientTypesLineCount}`);
}

for (const requiredLoadingShellUsage of [
  "export function WorkspaceSettingsLoadingShell({ loadingLabel }: { loadingLabel: string })",
  'className="panel auth-panel"',
  "{loadingLabel}",
]) {
  if (!loadingShellSource.includes(requiredLoadingShellUsage)) {
    throw new Error(`workspace-settings-loading-shell.tsx must own loading shell rendering: ${requiredLoadingShellUsage}`);
  }
}

if (loadingShellLineCount > 15) {
  throw new Error(`workspace-settings-loading-shell.tsx exceeded 15 lines: ${loadingShellLineCount}`);
}

for (const requiredProviderSectionTypesUsage of [
  "export type WorkspaceSettingsProviderSectionProps = {",
  "managedRole: \"owner\" | \"editor\" | null;",
  "onSaveProviderConfig: ProviderSettingsPanelProps[\"onSaveProviderConfig\"];",
  "export type WorkspaceSettingsProviderSectionBuilderInput = {",
]) {
  if (!providerSectionTypesSource.includes(requiredProviderSectionTypesUsage)) {
    throw new Error(`workspace-settings-provider-section.types.ts must own provider section contracts: ${requiredProviderSectionTypesUsage}`);
  }
}

if (providerSectionTypesLineCount > 35) {
  throw new Error(`workspace-settings-provider-section.types.ts exceeded 35 lines: ${providerSectionTypesLineCount}`);
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

for (const requiredActionsImport of [
  'import { createWorkspaceSettingsMemberActions } from "./workspace-settings-member-actions";',
  'import { createWorkspaceSettingsProviderActions } from "./workspace-settings-provider-actions";',
]) {
  if (!actionsSource.includes(requiredActionsImport)) {
    throw new Error(`workspace-settings-actions.ts must import delegated action helpers: ${requiredActionsImport}`);
  }
}

for (const requiredActionsUsage of [
  "createWorkspaceSettingsProviderActions({ state, workspaceId })",
  "createWorkspaceSettingsMemberActions({ state, workspaceId })",
  "...providerActions",
  "...memberActions",
]) {
  if (!actionsSource.includes(requiredActionsUsage)) {
    throw new Error(`workspace-settings-actions.ts must compose delegated action groups: ${requiredActionsUsage}`);
  }
}

for (const forbiddenActionsToken of [
  'from "../lib/api";',
  "function getWorkspaceSettingsActionErrorMessage(",
  "async function refreshMediaStorageHealthState(",
  "async function handleSaveProviderConfig(",
  "async function handleUpdateMemberRole(",
  "async function handleRemoveMember(",
]) {
  if (actionsSource.includes(forbiddenActionsToken)) {
    throw new Error(`workspace-settings-actions.ts must keep action internals delegated: ${forbiddenActionsToken}`);
  }
}

if (actionsLineCount > 30) {
  throw new Error(`workspace-settings-actions.ts exceeded 30 lines: ${actionsLineCount}`);
}

for (const requiredActionErrorUsage of [
  "export function getWorkspaceSettingsActionErrorMessage(",
  "return caught instanceof Error ? caught.message : fallbackMessage;",
]) {
  if (!actionErrorSource.includes(requiredActionErrorUsage)) {
    throw new Error(`workspace-settings-action-error.ts must own shared error formatting: ${requiredActionErrorUsage}`);
  }
}

if (actionErrorLineCount > 10) {
  throw new Error(`workspace-settings-action-error.ts exceeded 10 lines: ${actionErrorLineCount}`);
}

for (const requiredProviderActionsUsage of [
  'from "../lib/api";',
  'from "./workspace-settings-action-error";',
  "export function createWorkspaceSettingsProviderActions({",
  "async function refreshMediaStorageHealthState(",
  "async function handleSaveProviderConfig(",
  "getMediaStorageProviderHealth(",
  "updateProviderConfig(",
]) {
  if (!providerActionsSource.includes(requiredProviderActionsUsage)) {
    throw new Error(`workspace-settings-provider-actions.ts must own provider action logic: ${requiredProviderActionsUsage}`);
  }
}

if (providerActionsLineCount > 65) {
  throw new Error(`workspace-settings-provider-actions.ts exceeded 65 lines: ${providerActionsLineCount}`);
}

for (const requiredMemberActionsUsage of [
  'from "../lib/api";',
  'from "./workspace-settings-action-error";',
  "export function createWorkspaceSettingsMemberActions({",
  "async function handleUpdateMemberRole(",
  "async function handleRemoveMember(",
  "updateWorkspaceMember(",
  "deleteWorkspaceMember(",
]) {
  if (!memberActionsSource.includes(requiredMemberActionsUsage)) {
    throw new Error(`workspace-settings-member-actions.ts must own member action logic: ${requiredMemberActionsUsage}`);
  }
}

if (memberActionsLineCount > 55) {
  throw new Error(`workspace-settings-member-actions.ts exceeded 55 lines: ${memberActionsLineCount}`);
}

console.log("workspace-settings structure verification passed");

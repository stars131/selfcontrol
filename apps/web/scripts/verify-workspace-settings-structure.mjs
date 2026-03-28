import fs from "node:fs";
import path from "node:path";

const workspaceSettingsPath = path.resolve(process.cwd(), "components/workspace-settings-client.tsx");
const workspaceSettingsClientHelpersPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-client-helpers.ts",
);
const workspaceSettingsClientViewPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-client-view.ts",
);
const workspaceSettingsClientViewTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-client-view.types.ts",
);
const workspaceSettingsClientTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-client.types.ts",
);
const workspaceSettingsMainContentPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-main-content.tsx",
);
const workspaceSettingsMainContentTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-main-content.types.ts",
);
const workspaceSettingsErrorNoticePath = path.resolve(
  process.cwd(),
  "components/workspace-settings-error-notice.tsx",
);
const workspaceSettingsErrorNoticeTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-error-notice.types.ts",
);
const workspaceSettingsLoadingShellPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-loading-shell.tsx",
);
const workspaceSettingsLoadingShellTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-loading-shell.types.ts",
);
const workspaceSettingsProviderSectionPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-provider-section.tsx",
);
const workspaceSettingsProviderSectionTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-provider-section.types.ts",
);
const workspaceSettingsProviderViewerNoticePath = path.resolve(
  process.cwd(),
  "components/workspace-settings-provider-viewer-notice.tsx",
);
const workspaceSettingsProviderViewerNoticeTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-provider-viewer-notice.types.ts",
);
const workspaceSettingsOverviewCardPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-overview-card.tsx",
);
const workspaceSettingsOverviewSummaryPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-overview-summary.tsx",
);
const workspaceSettingsOverviewSummaryTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-overview-summary.types.ts",
);
const workspaceSettingsOverviewDetailsPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-overview-details.tsx",
);
const workspaceSettingsOverviewDetailsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-overview-details.types.ts",
);
const workspaceSettingsManagedSectionsPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-managed-sections.tsx",
);
const workspaceSettingsManagedToolsPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-managed-tools.tsx",
);
const workspaceSettingsManagedToolsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-managed-tools.types.ts",
);
const workspaceSettingsHeaderPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-header.tsx",
);
const workspaceSettingsHeaderTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-header.types.ts",
);
const workspaceSettingsHeaderIntroPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-header-intro.tsx",
);
const workspaceSettingsHeaderIntroTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-header-intro.types.ts",
);
const workspaceSettingsHeaderActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-header-actions.tsx",
);
const workspaceSettingsHeaderActionsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-header-actions.types.ts",
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
const clientViewSource = fs.readFileSync(workspaceSettingsClientViewPath, "utf8");
const clientViewTypesSource = fs.readFileSync(workspaceSettingsClientViewTypesPath, "utf8");
const clientTypesSource = fs.readFileSync(workspaceSettingsClientTypesPath, "utf8");
const mainContentSource = fs.readFileSync(workspaceSettingsMainContentPath, "utf8");
const mainContentTypesSource = fs.readFileSync(workspaceSettingsMainContentTypesPath, "utf8");
const errorNoticeSource = fs.readFileSync(workspaceSettingsErrorNoticePath, "utf8");
const errorNoticeTypesSource = fs.readFileSync(workspaceSettingsErrorNoticeTypesPath, "utf8");
const loadingShellSource = fs.readFileSync(workspaceSettingsLoadingShellPath, "utf8");
const loadingShellTypesSource = fs.readFileSync(workspaceSettingsLoadingShellTypesPath, "utf8");
const providerSectionSource = fs.readFileSync(workspaceSettingsProviderSectionPath, "utf8");
const providerSectionTypesSource = fs.readFileSync(workspaceSettingsProviderSectionTypesPath, "utf8");
const providerViewerNoticeSource = fs.readFileSync(workspaceSettingsProviderViewerNoticePath, "utf8");
const providerViewerNoticeTypesSource = fs.readFileSync(
  workspaceSettingsProviderViewerNoticeTypesPath,
  "utf8",
);
const overviewCardSource = fs.readFileSync(workspaceSettingsOverviewCardPath, "utf8");
const overviewSummarySource = fs.readFileSync(workspaceSettingsOverviewSummaryPath, "utf8");
const overviewSummaryTypesSource = fs.readFileSync(
  workspaceSettingsOverviewSummaryTypesPath,
  "utf8",
);
const overviewDetailsSource = fs.readFileSync(workspaceSettingsOverviewDetailsPath, "utf8");
const overviewDetailsTypesSource = fs.readFileSync(
  workspaceSettingsOverviewDetailsTypesPath,
  "utf8",
);
const managedSectionsSource = fs.readFileSync(workspaceSettingsManagedSectionsPath, "utf8");
const managedToolsSource = fs.readFileSync(workspaceSettingsManagedToolsPath, "utf8");
const managedToolsTypesSource = fs.readFileSync(workspaceSettingsManagedToolsTypesPath, "utf8");
const headerSource = fs.readFileSync(workspaceSettingsHeaderPath, "utf8");
const headerTypesSource = fs.readFileSync(workspaceSettingsHeaderTypesPath, "utf8");
const headerIntroSource = fs.readFileSync(workspaceSettingsHeaderIntroPath, "utf8");
const headerIntroTypesSource = fs.readFileSync(workspaceSettingsHeaderIntroTypesPath, "utf8");
const headerActionsSource = fs.readFileSync(workspaceSettingsHeaderActionsPath, "utf8");
const headerActionsTypesSource = fs.readFileSync(
  workspaceSettingsHeaderActionsTypesPath,
  "utf8",
);
const controllerSource = fs.readFileSync(workspaceSettingsControllerPath, "utf8");
const actionsSource = fs.readFileSync(workspaceSettingsActionsPath, "utf8");
const actionErrorSource = fs.readFileSync(workspaceSettingsActionErrorPath, "utf8");
const providerActionsSource = fs.readFileSync(workspaceSettingsProviderActionsPath, "utf8");
const memberActionsSource = fs.readFileSync(workspaceSettingsMemberActionsPath, "utf8");
const lineCount = source.split(/\r?\n/).length;
const clientHelpersLineCount = clientHelpersSource.split(/\r?\n/).length;
const clientViewLineCount = clientViewSource.split(/\r?\n/).length;
const clientViewTypesLineCount = clientViewTypesSource.split(/\r?\n/).length;
const clientTypesLineCount = clientTypesSource.split(/\r?\n/).length;
const mainContentLineCount = mainContentSource.split(/\r?\n/).length;
const mainContentTypesLineCount = mainContentTypesSource.split(/\r?\n/).length;
const errorNoticeLineCount = errorNoticeSource.split(/\r?\n/).length;
const errorNoticeTypesLineCount = errorNoticeTypesSource.split(/\r?\n/).length;
const loadingShellLineCount = loadingShellSource.split(/\r?\n/).length;
const loadingShellTypesLineCount = loadingShellTypesSource.split(/\r?\n/).length;
const providerSectionLineCount = providerSectionSource.split(/\r?\n/).length;
const providerSectionTypesLineCount = providerSectionTypesSource.split(/\r?\n/).length;
const providerViewerNoticeLineCount = providerViewerNoticeSource.split(/\r?\n/).length;
const providerViewerNoticeTypesLineCount =
  providerViewerNoticeTypesSource.split(/\r?\n/).length;
const overviewCardLineCount = overviewCardSource.split(/\r?\n/).length;
const overviewSummaryLineCount = overviewSummarySource.split(/\r?\n/).length;
const overviewSummaryTypesLineCount = overviewSummaryTypesSource.split(/\r?\n/).length;
const overviewDetailsLineCount = overviewDetailsSource.split(/\r?\n/).length;
const overviewDetailsTypesLineCount = overviewDetailsTypesSource.split(/\r?\n/).length;
const managedSectionsLineCount = managedSectionsSource.split(/\r?\n/).length;
const managedToolsLineCount = managedToolsSource.split(/\r?\n/).length;
const managedToolsTypesLineCount = managedToolsTypesSource.split(/\r?\n/).length;
const headerLineCount = headerSource.split(/\r?\n/).length;
const headerTypesLineCount = headerTypesSource.split(/\r?\n/).length;
const headerIntroLineCount = headerIntroSource.split(/\r?\n/).length;
const headerIntroTypesLineCount = headerIntroTypesSource.split(/\r?\n/).length;
const headerActionsLineCount = headerActionsSource.split(/\r?\n/).length;
const headerActionsTypesLineCount = headerActionsTypesSource.split(/\r?\n/).length;
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
  'from "./workspace-settings-client-view";',
  'import type { WorkspaceSettingsClientProps } from "./workspace-settings-client.types";',
  'import { WorkspaceSettingsLoadingShell } from "./workspace-settings-loading-shell";',
  'import { WorkspaceSettingsHeader } from "./workspace-settings-header";',
  'import { WorkspaceSettingsMainContent } from "./workspace-settings-main-content";',
]) {
  if (!source.includes(requiredImport)) {
    throw new Error(`workspace-settings-client.tsx must import delegated settings sections: ${requiredImport}`);
  }
}

for (const requiredUsage of [
  "const controller = useWorkspaceSettingsController(router, workspaceId);",
  "const view = buildWorkspaceSettingsClientViewProps({",
  "if (view.showLoadingShell) {",
  "<WorkspaceSettingsLoadingShell {...view.loadingShellProps} />",
  "<WorkspaceSettingsHeader {...view.headerProps} />",
  "<WorkspaceSettingsMainContent {...view.mainContentProps} />",
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
  'import { WorkspaceSettingsProviderViewerNotice } from "./workspace-settings-provider-viewer-notice";',
  "<ProviderSettingsPanel",
  "<WorkspaceSettingsProviderViewerNotice",
]) {
  if (!providerSectionSource.includes(requiredProviderUsage)) {
    throw new Error(`workspace-settings-provider-section.tsx must own provider/viewer branching: ${requiredProviderUsage}`);
  }
}

for (const forbiddenProviderSectionToken of [
  'import type { LocaleCode } from "../lib/locale";',
  'import type { MediaStorageProviderHealth, ProviderFeatureConfig } from "../lib/types";',
  "type WorkspaceSettingsProviderSectionProps = {",
  '<section className="record-card">',
  '<div className="eyebrow">{providerTitle}</div>',
  '<div className="notice" style={{ marginTop: 12 }}>{viewerNotice}</div>',
]) {
  if (providerSectionSource.includes(forbiddenProviderSectionToken)) {
    throw new Error(`workspace-settings-provider-section.tsx must keep provider section props delegated: ${forbiddenProviderSectionToken}`);
  }
}

if (providerSectionLineCount > 25) {
  throw new Error(`workspace-settings-provider-section.tsx exceeded 25 lines: ${providerSectionLineCount}`);
}

for (const requiredProviderViewerNoticeUsage of [
  'import type { WorkspaceSettingsProviderViewerNoticeProps } from "./workspace-settings-provider-viewer-notice.types";',
  "}: WorkspaceSettingsProviderViewerNoticeProps) {",
  '<section className="record-card">',
  '<div className="eyebrow">{providerTitle}</div>',
  '{viewerNotice}',
]) {
  if (!providerViewerNoticeSource.includes(requiredProviderViewerNoticeUsage)) {
    throw new Error(
      `workspace-settings-provider-viewer-notice.tsx must own viewer-notice rendering: ${requiredProviderViewerNoticeUsage}`,
    );
  }
}

if (providerViewerNoticeSource.includes("type WorkspaceSettingsProviderViewerNoticeProps = Pick<")) {
  throw new Error(
    "workspace-settings-provider-viewer-notice.tsx must keep provider viewer-notice prop typing delegated",
  );
}

if (providerViewerNoticeLineCount > 16) {
  throw new Error(
    `workspace-settings-provider-viewer-notice.tsx exceeded 16 lines: ${providerViewerNoticeLineCount}`,
  );
}

for (const requiredProviderViewerNoticeTypesUsage of [
  'import type { WorkspaceSettingsProviderSectionProps } from "./workspace-settings-provider-section.types"; export type WorkspaceSettingsProviderViewerNoticeProps = Pick<WorkspaceSettingsProviderSectionProps, "providerTitle" | "viewerNotice">;',
]) {
  if (!providerViewerNoticeTypesSource.includes(requiredProviderViewerNoticeTypesUsage)) {
    throw new Error(
      `workspace-settings-provider-viewer-notice.types.ts must own viewer-notice prop typing: ${requiredProviderViewerNoticeTypesUsage}`,
    );
  }
}

if (providerViewerNoticeTypesLineCount > 2) {
  throw new Error(
    `workspace-settings-provider-viewer-notice.types.ts exceeded 2 lines: ${providerViewerNoticeTypesLineCount}`,
  );
}

for (const requiredManagedImport of [
  'import { WorkspaceMembersSection } from "./workspace-members-section";',
  'import { WorkspaceSettingsManagedTools } from "./workspace-settings-managed-tools";',
  'import type { WorkspaceSettingsManagedSectionsProps } from "./workspace-settings-managed-sections.types";',
]) {
  if (!managedSectionsSource.includes(requiredManagedImport)) {
    throw new Error(`workspace-settings-managed-sections.tsx must import delegated managed sections: ${requiredManagedImport}`);
  }
}

for (const requiredManagedUsage of [
  "<WorkspaceMembersSection",
  "<WorkspaceSettingsManagedTools",
  "}: WorkspaceSettingsManagedSectionsProps) {",
]) {
  if (!managedSectionsSource.includes(requiredManagedUsage)) {
    throw new Error(`workspace-settings-managed-sections.tsx must compose delegated managed sections: ${requiredManagedUsage}`);
  }
}

for (const forbiddenManagedSectionsToken of [
  'import { WorkspaceExportCard } from "./workspace-export-card";',
  'import { WorkspaceExportJobsCard } from "./workspace-export-jobs-card";',
  'import { WorkspaceMediaRetentionCard } from "./workspace-media-retention-card";',
  "<WorkspaceExportCard",
  "<WorkspaceExportJobsCard",
  "<WorkspaceMediaRetentionCard",
]) {
  if (managedSectionsSource.includes(forbiddenManagedSectionsToken)) {
    throw new Error(`workspace-settings-managed-sections.tsx must keep managed tools delegated: ${forbiddenManagedSectionsToken}`);
  }
}

if (managedSectionsLineCount > 35) {
  throw new Error(`workspace-settings-managed-sections.tsx exceeded 35 lines: ${managedSectionsLineCount}`);
}

for (const requiredManagedToolsUsage of [
  'import { WorkspaceExportCard } from "./workspace-export-card";',
  'import { WorkspaceExportJobsCard } from "./workspace-export-jobs-card";',
  'import { WorkspaceMediaRetentionCard } from "./workspace-media-retention-card";',
  'import type { WorkspaceSettingsManagedToolsProps } from "./workspace-settings-managed-tools.types";',
  "}: WorkspaceSettingsManagedToolsProps) {",
  "<WorkspaceMediaRetentionCard",
  "<WorkspaceExportCard",
  "<WorkspaceExportJobsCard",
]) {
  if (!managedToolsSource.includes(requiredManagedToolsUsage)) {
    throw new Error(`workspace-settings-managed-tools.tsx must own managed-tool composition: ${requiredManagedToolsUsage}`);
  }
}

if (managedToolsSource.includes("type WorkspaceSettingsManagedToolsProps = Pick<")) {
  throw new Error("workspace-settings-managed-tools.tsx must keep managed-tools prop typing delegated");
}

if (managedToolsLineCount > 25) {
  throw new Error(`workspace-settings-managed-tools.tsx exceeded 25 lines: ${managedToolsLineCount}`);
}

for (const requiredManagedToolsTypesUsage of [
  'import type { WorkspaceSettingsManagedSectionsProps } from "./workspace-settings-managed-sections.types"; export type WorkspaceSettingsManagedToolsProps = Pick<WorkspaceSettingsManagedSectionsProps, "locale" | "workspaceId" | "workspaceSlug"> & { managedRole: "owner" | "editor"; token: string };',
]) {
  if (!managedToolsTypesSource.includes(requiredManagedToolsTypesUsage)) {
    throw new Error(`workspace-settings-managed-tools.types.ts must own managed-tools prop typing: ${requiredManagedToolsTypesUsage}`);
  }
}

if (managedToolsTypesLineCount > 2) {
  throw new Error(`workspace-settings-managed-tools.types.ts exceeded 2 lines: ${managedToolsTypesLineCount}`);
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
  'from "./workspace-settings-client-helpers";',
  'import { ProviderSettingsPanel } from "./provider-settings-panel";',
  'import { WorkspaceMembersSection } from "./workspace-members-section";',
  'import { WorkspaceExportCard } from "./workspace-export-card";',
  'import { WorkspaceExportJobsCard } from "./workspace-export-jobs-card";',
  'import { WorkspaceMediaRetentionCard } from "./workspace-media-retention-card";',
  "buildWorkspaceSettingsProviderSectionProps({",
  "buildWorkspaceSettingsManagedSectionsProps({",
  "token ? async () => refreshMediaStorageHealthState(token) : null",
  "<ProviderSettingsPanel",
  "<WorkspaceMembersSection",
  "<WorkspaceExportCard",
  "<WorkspaceExportJobsCard",
  "<WorkspaceMediaRetentionCard",
  '<div className="panel-body">',
  '<div className="notice error" style={{ marginBottom: 16 }}>',
  '<div className="two-column-grid">',
  "<WorkspaceSettingsOverviewCard",
  "<WorkspaceSettingsProviderSection",
  "<WorkspaceSettingsManagedSections",
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`workspace-settings-client.tsx must keep controller logic delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 45;
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
  "export function buildWorkspaceSettingsProviderSectionProps(",
  "input: WorkspaceSettingsProviderSectionBuilderInput,",
  "const refreshToken = input.token;",
  "onRefreshMediaStorageHealth: refreshToken",
  "input.refreshMediaStorageHealthState(refreshToken)",
  "export function buildWorkspaceSettingsManagedSectionsProps(",
]) {
  if (!clientHelpersSource.includes(requiredClientHelpersUsage)) {
    throw new Error(`workspace-settings-client-helpers.ts must own client-side settings mapping: ${requiredClientHelpersUsage}`);
  }
}

if (clientHelpersLineCount > 45) {
  throw new Error(`workspace-settings-client-helpers.ts exceeded 45 lines: ${clientHelpersLineCount}`);
}

for (const requiredClientViewImport of [
  'from "./workspace-settings-client-helpers";',
  'from "./workspace-settings-client-view.types";',
  'from "./workspace-settings-header.types";',
  'from "./workspace-settings-loading-shell.types";',
  'from "./workspace-settings-main-content.types";',
]) {
  if (!clientViewSource.includes(requiredClientViewImport)) {
    throw new Error(`workspace-settings-client-view.ts must import shared client-view types: ${requiredClientViewImport}`);
  }
}

for (const requiredClientViewUsage of [
  "export function buildWorkspaceSettingsLoadingShellProps(",
  "export function buildWorkspaceSettingsHeaderProps(",
  "export function buildWorkspaceSettingsMainContentProps(",
  "const managedRole = readWorkspaceSettingsManagedRole(input.controller.workspace);",
  "buildWorkspaceSettingsManagedSectionsProps({",
  "buildWorkspaceSettingsProviderSectionProps({",
  "export function buildWorkspaceSettingsClientViewProps(",
  "showLoadingShell: input.controller.loading,",
]) {
  if (!clientViewSource.includes(requiredClientViewUsage)) {
    throw new Error(`workspace-settings-client-view.ts must own client view assembly: ${requiredClientViewUsage}`);
  }
}

for (const forbiddenClientViewToken of [
  'from "next/navigation";',
  'from "../lib/locale";',
  'from "./use-workspace-settings-controller";',
  'from "./workspace-settings-copy";',
  "<WorkspaceSettingsHeader",
  "<WorkspaceSettingsMainContent",
  "<WorkspaceSettingsLoadingShell",
  "<main className=",
]) {
  if (clientViewSource.includes(forbiddenClientViewToken)) {
    throw new Error(`workspace-settings-client-view.ts must stay as a pure prop builder: ${forbiddenClientViewToken}`);
  }
}

if (clientViewLineCount > 80) {
  throw new Error(`workspace-settings-client-view.ts exceeded 80 lines: ${clientViewLineCount}`);
}

for (const requiredClientViewTypesUsage of [
  'import type { LocaleCode } from "../lib/locale"; import type { Workspace } from "../lib/types";',
  "export type WorkspaceSettingsClientViewController = {",
  "export type WorkspaceSettingsClientViewInput = {",
  "export type WorkspaceSettingsClientViewProps = {",
]) {
  if (!clientViewTypesSource.includes(requiredClientViewTypesUsage)) {
    throw new Error(`workspace-settings-client-view.types.ts must own client-view contracts: ${requiredClientViewTypesUsage}`);
  }
}

if (clientViewTypesLineCount > 3) {
  throw new Error(`workspace-settings-client-view.types.ts exceeded 3 lines: ${clientViewTypesLineCount}`);
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

for (const requiredMainContentUsage of [
  'import { WorkspaceSettingsErrorNotice } from "./workspace-settings-error-notice";',
  'import { WorkspaceSettingsManagedSections } from "./workspace-settings-managed-sections";',
  'import { WorkspaceSettingsOverviewCard } from "./workspace-settings-overview-card";',
  'import { WorkspaceSettingsProviderSection } from "./workspace-settings-provider-section";',
  'import type { WorkspaceSettingsMainContentProps } from "./workspace-settings-main-content.types";',
  "}: WorkspaceSettingsMainContentProps) {",
  '<div className="panel-body">',
  "<WorkspaceSettingsErrorNotice",
  "<WorkspaceSettingsOverviewCard",
  "<WorkspaceSettingsProviderSection",
  "<WorkspaceSettingsManagedSections",
]) {
  if (!mainContentSource.includes(requiredMainContentUsage)) {
    throw new Error(`workspace-settings-main-content.tsx must own settings-body composition: ${requiredMainContentUsage}`);
  }
}

if (mainContentSource.includes("type WorkspaceSettingsMainContentProps =")) {
  throw new Error("workspace-settings-main-content.tsx must keep settings-body prop typing delegated");
}

if (mainContentLineCount > 24) {
  throw new Error(`workspace-settings-main-content.tsx exceeded 24 lines: ${mainContentLineCount}`);
}

for (const requiredMainContentTypesUsage of [
  'import type { KnowledgeStats } from "../lib/types"; import type { WorkspaceSettingsManagedSectionsProps } from "./workspace-settings-managed-sections.types"; import type { WorkspaceSettingsCopy } from "./workspace-settings-copy"; import type { WorkspaceSettingsProviderSectionProps } from "./workspace-settings-provider-section.types";',
  'export type WorkspaceSettingsMainContentProps = { copy: WorkspaceSettingsCopy; error: string; knowledgeStats: KnowledgeStats | null; managedSectionsProps: WorkspaceSettingsManagedSectionsProps; providerSectionProps: WorkspaceSettingsProviderSectionProps };',
]) {
  if (!mainContentTypesSource.includes(requiredMainContentTypesUsage)) {
    throw new Error(`workspace-settings-main-content.types.ts must own settings-body prop typing: ${requiredMainContentTypesUsage}`);
  }
}

if (mainContentTypesLineCount > 2) {
  throw new Error(`workspace-settings-main-content.types.ts exceeded 2 lines: ${mainContentTypesLineCount}`);
}

for (const requiredErrorNoticeUsage of [
  'import type { WorkspaceSettingsErrorNoticeProps } from "./workspace-settings-error-notice.types";',
  "}: WorkspaceSettingsErrorNoticeProps) {",
  "if (!error) {",
  'className="notice error"',
]) {
  if (!errorNoticeSource.includes(requiredErrorNoticeUsage)) {
    throw new Error(`workspace-settings-error-notice.tsx must own error-notice rendering: ${requiredErrorNoticeUsage}`);
  }
}

if (errorNoticeSource.includes("type WorkspaceSettingsErrorNoticeProps =")) {
  throw new Error("workspace-settings-error-notice.tsx must keep error-notice prop typing delegated");
}

if (errorNoticeLineCount > 10) {
  throw new Error(`workspace-settings-error-notice.tsx exceeded 10 lines: ${errorNoticeLineCount}`);
}

for (const requiredErrorNoticeTypesUsage of [
  'import type { WorkspaceSettingsMainContentProps } from "./workspace-settings-main-content.types"; export type WorkspaceSettingsErrorNoticeProps = Pick<WorkspaceSettingsMainContentProps, "error">;',
]) {
  if (!errorNoticeTypesSource.includes(requiredErrorNoticeTypesUsage)) {
    throw new Error(`workspace-settings-error-notice.types.ts must own error-notice prop typing: ${requiredErrorNoticeTypesUsage}`);
  }
}

if (errorNoticeTypesLineCount > 2) {
  throw new Error(`workspace-settings-error-notice.types.ts exceeded 2 lines: ${errorNoticeTypesLineCount}`);
}

for (const requiredLoadingShellUsage of [
  'import type { WorkspaceSettingsLoadingShellProps } from "./workspace-settings-loading-shell.types";',
  "export function WorkspaceSettingsLoadingShell({ loadingLabel }: WorkspaceSettingsLoadingShellProps)",
  'className="panel auth-panel"',
  "{loadingLabel}",
]) {
  if (!loadingShellSource.includes(requiredLoadingShellUsage)) {
    throw new Error(`workspace-settings-loading-shell.tsx must own loading shell rendering: ${requiredLoadingShellUsage}`);
  }
}

if (loadingShellSource.includes("export function WorkspaceSettingsLoadingShell({ loadingLabel }: { loadingLabel: string })")) {
  throw new Error("workspace-settings-loading-shell.tsx must keep loading-shell prop typing delegated");
}

if (loadingShellLineCount > 16) {
  throw new Error(`workspace-settings-loading-shell.tsx exceeded 16 lines: ${loadingShellLineCount}`);
}

for (const requiredLoadingShellTypesUsage of [
  'export type WorkspaceSettingsLoadingShellProps = { loadingLabel: string };',
]) {
  if (!loadingShellTypesSource.includes(requiredLoadingShellTypesUsage)) {
    throw new Error(`workspace-settings-loading-shell.types.ts must own loading-shell prop typing: ${requiredLoadingShellTypesUsage}`);
  }
}

if (loadingShellTypesLineCount > 3) {
  throw new Error(`workspace-settings-loading-shell.types.ts exceeded 3 lines: ${loadingShellTypesLineCount}`);
}

for (const requiredHeaderUsage of [
  'import { WorkspaceSettingsHeaderActions } from "./workspace-settings-header-actions";',
  'import { WorkspaceSettingsHeaderIntro } from "./workspace-settings-header-intro";',
  'import type { WorkspaceSettingsHeaderProps } from "./workspace-settings-header.types";',
  "}: WorkspaceSettingsHeaderProps) {",
  "<WorkspaceSettingsHeaderIntro",
  "<WorkspaceSettingsHeaderActions",
]) {
  if (!headerSource.includes(requiredHeaderUsage)) {
    throw new Error(`workspace-settings-header.tsx must delegate header actions: ${requiredHeaderUsage}`);
  }
}

for (const forbiddenHeaderToken of [
  'import Link from "next/link";',
  'import { LanguageSwitcher } from "./language-switcher";',
  '<div className="hero-actions">',
  "<LanguageSwitcher",
  "<Link className=\"button secondary\"",
  '<div className="eyebrow">{copy.eyebrow}</div>',
  '<h1 className="title">{copy.title}</h1>',
  "{copy.subtitle}",
  '<div className="muted" style={{ marginTop: 8 }}>{username}{workspace ? ` / ${workspace.role}` : ""}</div>',
]) {
  if (headerSource.includes(forbiddenHeaderToken)) {
    throw new Error(`workspace-settings-header.tsx must keep action-group internals delegated: ${forbiddenHeaderToken}`);
  }
}

if (headerLineCount > 25) {
  throw new Error(`workspace-settings-header.tsx exceeded 25 lines: ${headerLineCount}`);
}

for (const requiredHeaderTypesUsage of [
  'import type { LocaleCode } from "../lib/locale"; import type { Workspace } from "../lib/types"; import type { WorkspaceSettingsCopy } from "./workspace-settings-copy";',
  "export type WorkspaceSettingsHeaderProps = { copy: WorkspaceSettingsCopy; locale: LocaleCode; onLocaleChange: (locale: LocaleCode) => void; username?: string | null; workspace?: Workspace | null; workspaceId: string };",
]) {
  if (!headerTypesSource.includes(requiredHeaderTypesUsage)) {
    throw new Error(`workspace-settings-header.types.ts must own settings-header prop typing: ${requiredHeaderTypesUsage}`);
  }
}

if (headerTypesLineCount > 2) {
  throw new Error(`workspace-settings-header.types.ts exceeded 2 lines: ${headerTypesLineCount}`);
}

for (const requiredHeaderIntroUsage of [
  'import { useStoredLocale } from "../lib/locale";',
  'from "../lib/workspace-role-display";',
  'import type { WorkspaceSettingsHeaderIntroProps } from "./workspace-settings-header-intro.types";',
  "}: WorkspaceSettingsHeaderIntroProps) {",
  "const { locale } = useStoredLocale();",
  "getWorkspaceRoleLabel(locale, workspace.role)",
  '<div className="eyebrow">{copy.eyebrow}</div>',
  '<h1 className="title">{copy.title}</h1>',
  "{copy.subtitle}",
  "{username}",
]) {
  if (!headerIntroSource.includes(requiredHeaderIntroUsage)) {
    throw new Error(`workspace-settings-header-intro.tsx must own header intro rendering: ${requiredHeaderIntroUsage}`);
  }
}

if (headerIntroSource.includes("type WorkspaceSettingsHeaderIntroProps = Pick<")) {
  throw new Error("workspace-settings-header-intro.tsx must keep header-intro prop typing delegated");
}

if (headerIntroLineCount > 8) {
  throw new Error(`workspace-settings-header-intro.tsx exceeded 8 lines: ${headerIntroLineCount}`);
}

for (const requiredHeaderIntroTypesUsage of [
  'import type { WorkspaceSettingsHeaderProps } from "./workspace-settings-header.types"; export type WorkspaceSettingsHeaderIntroProps = Pick<WorkspaceSettingsHeaderProps, "copy" | "username" | "workspace">;',
]) {
  if (!headerIntroTypesSource.includes(requiredHeaderIntroTypesUsage)) {
    throw new Error(`workspace-settings-header-intro.types.ts must own header-intro prop typing: ${requiredHeaderIntroTypesUsage}`);
  }
}

if (headerIntroTypesLineCount > 2) {
  throw new Error(`workspace-settings-header-intro.types.ts exceeded 2 lines: ${headerIntroTypesLineCount}`);
}

for (const requiredHeaderActionsUsage of [
  'import Link from "next/link";',
  'import { LanguageSwitcher } from "./language-switcher";',
  'import type { WorkspaceSettingsHeaderActionsProps } from "./workspace-settings-header-actions.types";',
  "}: WorkspaceSettingsHeaderActionsProps) {",
  '<div className="hero-actions">',
  "<LanguageSwitcher",
  "<Link className=\"button secondary\"",
]) {
  if (!headerActionsSource.includes(requiredHeaderActionsUsage)) {
    throw new Error(`workspace-settings-header-actions.tsx must own action-group rendering: ${requiredHeaderActionsUsage}`);
  }
}

if (headerActionsSource.includes("type WorkspaceSettingsHeaderActionsProps = Pick<")) {
  throw new Error("workspace-settings-header-actions.tsx must keep header-actions prop typing delegated");
}

if (headerActionsLineCount > 20) {
  throw new Error(`workspace-settings-header-actions.tsx exceeded 20 lines: ${headerActionsLineCount}`);
}

for (const requiredHeaderActionsTypesUsage of [
  'import type { WorkspaceSettingsHeaderProps } from "./workspace-settings-header.types"; export type WorkspaceSettingsHeaderActionsProps = Pick<WorkspaceSettingsHeaderProps, "copy" | "locale" | "onLocaleChange" | "workspaceId">;',
]) {
  if (!headerActionsTypesSource.includes(requiredHeaderActionsTypesUsage)) {
    throw new Error(`workspace-settings-header-actions.types.ts must own header-actions prop typing: ${requiredHeaderActionsTypesUsage}`);
  }
}

if (headerActionsTypesLineCount > 2) {
  throw new Error(`workspace-settings-header-actions.types.ts exceeded 2 lines: ${headerActionsTypesLineCount}`);
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

for (const requiredOverviewCardUsage of [
  'import { WorkspaceSettingsOverviewSummary } from "./workspace-settings-overview-summary";',
  'import { WorkspaceSettingsOverviewDetails } from "./workspace-settings-overview-details";',
  'import type { WorkspaceSettingsOverviewCardProps } from "./workspace-settings-overview-card.types";',
  "}: WorkspaceSettingsOverviewCardProps) {",
  "<WorkspaceSettingsOverviewSummary",
  "<WorkspaceSettingsOverviewDetails",
]) {
  if (!overviewCardSource.includes(requiredOverviewCardUsage)) {
    throw new Error(`workspace-settings-overview-card.tsx must delegate overview details rendering: ${requiredOverviewCardUsage}`);
  }
}

for (const forbiddenOverviewCardToken of [
  '<div className="eyebrow">{copy.apiTitle}</div>',
  "{copy.apiDescription}",
  'process.env.NEXT_PUBLIC_API_BASE_URL',
  'process.env.NEXT_PUBLIC_AMAP_KEY',
  'knowledgeStats ? `${knowledgeStats.chunk_count} chunks / ${knowledgeStats.record_count} records` : "-"',
  '<div className="detail-grid" style={{ marginTop: 16 }}>',
]) {
  if (overviewCardSource.includes(forbiddenOverviewCardToken)) {
    throw new Error(`workspace-settings-overview-card.tsx must keep overview-detail internals delegated: ${forbiddenOverviewCardToken}`);
  }
}

if (overviewCardLineCount > 20) {
  throw new Error(`workspace-settings-overview-card.tsx exceeded 20 lines: ${overviewCardLineCount}`);
}

for (const requiredOverviewSummaryUsage of [
  'import type { WorkspaceSettingsOverviewSummaryProps } from "./workspace-settings-overview-summary.types";',
  "}: WorkspaceSettingsOverviewSummaryProps) {",
  '<div className="eyebrow">{copy.apiTitle}</div>',
  "{copy.apiDescription}",
]) {
  if (!overviewSummarySource.includes(requiredOverviewSummaryUsage)) {
    throw new Error(`workspace-settings-overview-summary.tsx must own overview summary rendering: ${requiredOverviewSummaryUsage}`);
  }
}

if (overviewSummarySource.includes("type WorkspaceSettingsOverviewSummaryProps = Pick<")) {
  throw new Error("workspace-settings-overview-summary.tsx must keep overview-summary prop typing delegated");
}

if (overviewSummaryLineCount > 12) {
  throw new Error(`workspace-settings-overview-summary.tsx exceeded 12 lines: ${overviewSummaryLineCount}`);
}

for (const requiredOverviewSummaryTypesUsage of [
  'import type { WorkspaceSettingsOverviewCardProps } from "./workspace-settings-overview-card.types"; export type WorkspaceSettingsOverviewSummaryProps = Pick<WorkspaceSettingsOverviewCardProps, "copy">;',
]) {
  if (!overviewSummaryTypesSource.includes(requiredOverviewSummaryTypesUsage)) {
    throw new Error(`workspace-settings-overview-summary.types.ts must own overview-summary prop typing: ${requiredOverviewSummaryTypesUsage}`);
  }
}

if (overviewSummaryTypesLineCount > 2) {
  throw new Error(`workspace-settings-overview-summary.types.ts exceeded 2 lines: ${overviewSummaryTypesLineCount}`);
}

for (const requiredOverviewDetailsUsage of [
  'import type { WorkspaceSettingsOverviewDetailsProps } from "./workspace-settings-overview-details.types";',
  "}: WorkspaceSettingsOverviewDetailsProps) {",
  '<div className="detail-grid" style={{ marginTop: 16 }}>',
  'process.env.NEXT_PUBLIC_API_BASE_URL',
  'process.env.NEXT_PUBLIC_AMAP_KEY',
  'knowledgeStats ? `${knowledgeStats.chunk_count} chunks / ${knowledgeStats.record_count} records` : "-"',
]) {
  if (!overviewDetailsSource.includes(requiredOverviewDetailsUsage)) {
    throw new Error(`workspace-settings-overview-details.tsx must own overview detail-grid rendering: ${requiredOverviewDetailsUsage}`);
  }
}

if (overviewDetailsSource.includes("type WorkspaceSettingsOverviewDetailsProps = Pick<")) {
  throw new Error("workspace-settings-overview-details.tsx must keep overview-details prop typing delegated");
}

if (overviewDetailsLineCount > 30) {
  throw new Error(`workspace-settings-overview-details.tsx exceeded 30 lines: ${overviewDetailsLineCount}`);
}

for (const requiredOverviewDetailsTypesUsage of [
  'import type { WorkspaceSettingsOverviewCardProps } from "./workspace-settings-overview-card.types"; export type WorkspaceSettingsOverviewDetailsProps = Pick<WorkspaceSettingsOverviewCardProps, "copy" | "knowledgeStats">;',
]) {
  if (!overviewDetailsTypesSource.includes(requiredOverviewDetailsTypesUsage)) {
    throw new Error(`workspace-settings-overview-details.types.ts must own overview-details prop typing: ${requiredOverviewDetailsTypesUsage}`);
  }
}

if (overviewDetailsTypesLineCount > 2) {
  throw new Error(`workspace-settings-overview-details.types.ts exceeded 2 lines: ${overviewDetailsTypesLineCount}`);
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
  "useWorkspaceSettingsLoad({ ...state, router, workspaceId })",
  "createWorkspaceSettingsActions({ ...state, workspaceId })",
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
  "createWorkspaceSettingsProviderActions(props)",
  "createWorkspaceSettingsMemberActions(props)",
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
  'import { resolveErrorMessage } from "../lib/error-message";',
  "export function getWorkspaceSettingsActionErrorMessage(",
  "return resolveErrorMessage(caught, fallbackMessage);",
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
  'from "../lib/locale";',
  'from "./workspace-settings-action-error";',
  'from "./workspace-settings-copy";',
  "export function createWorkspaceSettingsProviderActions({",
  "const copy = getWorkspaceSettingsCopy(getStoredLocale());",
  "async function refreshMediaStorageHealthState(",
  "async function handleSaveProviderConfig(",
  "getMediaStorageProviderHealth(",
  "updateProviderConfig(",
  "copy.loadMediaStorageHealthFailed",
  "copy.notAuthenticated",
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
  'from "../lib/locale";',
  'from "./workspace-settings-action-error";',
  'from "./workspace-settings-copy";',
  "export function createWorkspaceSettingsMemberActions({",
  "const copy = getWorkspaceSettingsCopy(getStoredLocale());",
  "async function handleUpdateMemberRole(",
  "async function handleRemoveMember(",
  "updateWorkspaceMember(",
  "deleteWorkspaceMember(",
  "copy.notAuthenticated",
  "copy.updateMemberFailed",
  "copy.removeMemberFailed",
]) {
  if (!memberActionsSource.includes(requiredMemberActionsUsage)) {
    throw new Error(`workspace-settings-member-actions.ts must own member action logic: ${requiredMemberActionsUsage}`);
  }
}

if (memberActionsLineCount > 55) {
  throw new Error(`workspace-settings-member-actions.ts exceeded 55 lines: ${memberActionsLineCount}`);
}

console.log("workspace-settings structure verification passed");

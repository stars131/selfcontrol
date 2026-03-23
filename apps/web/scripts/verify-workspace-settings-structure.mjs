import fs from "node:fs";
import path from "node:path";

const workspaceSettingsPath = path.resolve(process.cwd(), "components/workspace-settings-client.tsx");
const source = fs.readFileSync(workspaceSettingsPath, "utf8");
const lineCount = source.split(/\r?\n/).length;

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

if (!source.includes('import { WorkspaceMembersSection } from "./workspace-members-section";')) {
  throw new Error("workspace-settings-client.tsx must import WorkspaceMembersSection");
}

if (!source.includes('import { WorkspaceSettingsHeader } from "./workspace-settings-header";')) {
  throw new Error("workspace-settings-client.tsx must import WorkspaceSettingsHeader");
}

if (!source.includes('import { WorkspaceSettingsOverviewCard } from "./workspace-settings-overview-card";')) {
  throw new Error("workspace-settings-client.tsx must import WorkspaceSettingsOverviewCard");
}

if (!source.includes("<WorkspaceMembersSection")) {
  throw new Error("workspace-settings-client.tsx must delegate member management rendering to WorkspaceMembersSection");
}

if (!source.includes("<WorkspaceSettingsHeader")) {
  throw new Error("workspace-settings-client.tsx must delegate settings header rendering");
}

if (!source.includes("<WorkspaceSettingsOverviewCard")) {
  throw new Error("workspace-settings-client.tsx must delegate environment overview rendering");
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
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`workspace-settings-client.tsx must keep controller logic delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 160;
if (lineCount > maxAllowedLines) {
  throw new Error(`workspace-settings-client.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

console.log("workspace-settings structure verification passed");

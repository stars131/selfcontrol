import fs from "node:fs";
import path from "node:path";

const workspaceSettingsPath = path.resolve(process.cwd(), "components/workspace-settings-client.tsx");
const source = fs.readFileSync(workspaceSettingsPath, "utf8");
const lineCount = source.split(/\r?\n/).length;

if (!source.includes('import { useWorkspaceSettingsController } from "./use-workspace-settings-controller";')) {
  throw new Error("workspace-settings-client.tsx must import useWorkspaceSettingsController");
}

if (!source.includes("useWorkspaceSettingsController(router, workspaceId)")) {
  throw new Error("workspace-settings-client.tsx must delegate settings orchestration to useWorkspaceSettingsController");
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
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`workspace-settings-client.tsx must keep controller logic delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 380;
if (lineCount > maxAllowedLines) {
  throw new Error(`workspace-settings-client.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

console.log("workspace-settings structure verification passed");

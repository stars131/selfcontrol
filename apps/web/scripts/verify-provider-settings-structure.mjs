import fs from "node:fs";
import path from "node:path";

const providerSettingsPath = path.resolve(process.cwd(), "components/provider-settings-panel.tsx");
const source = fs.readFileSync(providerSettingsPath, "utf8");
const lineCount = source.split(/\r?\n/).length;

if (!source.includes('import { useProviderSettingsController } from "./use-provider-settings-controller";')) {
  throw new Error("provider-settings-panel.tsx must import useProviderSettingsController");
}

if (!source.includes("useProviderSettingsController({")) {
  throw new Error("provider-settings-panel.tsx must delegate draft and save orchestration to useProviderSettingsController");
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
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`provider-settings-panel.tsx must keep controller logic delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 560;
if (lineCount > maxAllowedLines) {
  throw new Error(`provider-settings-panel.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

console.log("provider-settings structure verification passed");

import fs from "node:fs";
import path from "node:path";

const packageJsonPath = path.resolve(process.cwd(), "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const scripts = packageJson.scripts ?? {};
const uiGuardrailsCommand = scripts["verify:ui-guardrails"];

if (typeof uiGuardrailsCommand !== "string" || !uiGuardrailsCommand.trim()) {
  throw new Error("package.json must define a non-empty verify:ui-guardrails script");
}

if (!uiGuardrailsCommand.includes("npx tsc --noEmit")) {
  throw new Error("verify:ui-guardrails must keep TypeScript verification at the front of the UI guardrail pipeline");
}

const excludedVerifyScripts = new Set([
  "verify:guardrail-coverage",
  "verify:record-panel-detail-copy",
  "verify:ui-guardrails",
]);

const verifyScripts = Object.keys(scripts)
  .filter((name) => name.startsWith("verify:") && !excludedVerifyScripts.has(name))
  .sort();

const missingScripts = verifyScripts.filter((name) => !uiGuardrailsCommand.includes(name));

if (missingScripts.length > 0) {
  throw new Error(
    `verify:ui-guardrails must cover every standalone UI verify script. Missing: ${missingScripts.join(", ")}`,
  );
}

console.log("guardrail coverage verification passed");

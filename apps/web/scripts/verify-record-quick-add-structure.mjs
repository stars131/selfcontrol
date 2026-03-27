import fs from "node:fs";
import path from "node:path";

const helperPath = path.resolve(process.cwd(), "components/record-quick-add-bar.helpers.ts");
const helperSource = fs.readFileSync(helperPath, "utf8");
const helperLineCount = helperSource.split(/\r?\n/).length;
const controlTokensPath = path.resolve(
  process.cwd(),
  "components/record-quick-add-control-tokens.ts",
);
const controlTokensSource = fs.readFileSync(controlTokensPath, "utf8");
const controlTokensLineCount = controlTokensSource.split(/\r?\n/).length;
const tokenParsersPath = path.resolve(
  process.cwd(),
  "components/record-quick-add-token-parsers.ts",
);
const tokenParsersSource = fs.readFileSync(tokenParsersPath, "utf8");
const tokenParsersLineCount = tokenParsersSource.split(/\r?\n/).length;
const rulesPath = path.resolve(process.cwd(), "components/record-quick-add-rules.ts");
const rulesSource = fs.readFileSync(rulesPath, "utf8");
const rulesLineCount = rulesSource.split(/\r?\n/).length;

for (const requiredHelperImport of [
  'import { parseQuickAddControlTokens } from "./record-quick-add-control-tokens";',
  'import { buildQuickAddTitle } from "./record-quick-add-token-parsers";',
]) {
  if (!helperSource.includes(requiredHelperImport)) {
    throw new Error(
      `record-quick-add-bar.helpers.ts must import delegated quick-add helpers: ${requiredHelperImport}`,
    );
  }
}

for (const forbiddenHelperToken of [
  "QUICK_ADD_TAG_RULES",
  "QUICK_ADD_TIME_TOKENS",
  "parseQuickAddAbsoluteDateToken(",
  "parseQuickAddTimeOfDayToken(",
  "parseQuickAddRatingToken(",
  "parseQuickAddLocationSegment(",
  "parseQuickAddExplicitTitle(",
]) {
  if (helperSource.includes(forbiddenHelperToken)) {
    throw new Error(
      `record-quick-add-bar.helpers.ts must keep quick-add parsing delegated: ${forbiddenHelperToken}`,
    );
  }
}

if (helperLineCount > 20) {
  throw new Error(
    `record-quick-add-bar.helpers.ts exceeded 20 lines: ${helperLineCount}`,
  );
}

for (const requiredControlTokenUsage of [
  'from "./record-quick-add-rules";',
  'from "./record-quick-add-token-parsers";',
  "QUICK_ADD_TAG_RULES[normalizedToken]",
  "QUICK_ADD_TIME_TOKENS[normalizedToken]",
  "parseQuickAddAbsoluteDateToken(token, now)",
  "parseQuickAddTimeOfDayToken(token, nextOccurredAt)",
  "parseQuickAddRatingToken(normalizedToken)",
  "parseQuickAddLocationSegment(",
  "parseQuickAddExplicitTitle(",
]) {
  if (!controlTokensSource.includes(requiredControlTokenUsage)) {
    throw new Error(
      `record-quick-add-control-tokens.ts must own control-token orchestration: ${requiredControlTokenUsage}`,
    );
  }
}

if (controlTokensSource.includes("export function buildQuickAddRecordDraft")) {
  throw new Error(
    "record-quick-add-control-tokens.ts must not take over the public quick-add entrypoint",
  );
}

if (controlTokensLineCount > 90) {
  throw new Error(
    `record-quick-add-control-tokens.ts exceeded 90 lines: ${controlTokensLineCount}`,
  );
}

for (const requiredParserUsage of [
  "export function buildQuickAddTitle(",
  "export function buildQuickAddOccurredAt(",
  "export function parseQuickAddAbsoluteDateToken(",
  "export function parseQuickAddTimeOfDayToken(",
  "export function parseQuickAddRatingToken(",
  "export function parseQuickAddLocationSegment(",
  "export function parseQuickAddExplicitTitle(",
]) {
  if (!tokenParsersSource.includes(requiredParserUsage)) {
    throw new Error(
      `record-quick-add-token-parsers.ts must own shared quick-add parser helpers: ${requiredParserUsage}`,
    );
  }
}

if (tokenParsersSource.includes("export function parseQuickAddControlTokens(")) {
  throw new Error(
    "record-quick-add-token-parsers.ts must keep control-token orchestration delegated",
  );
}

if (tokenParsersLineCount > 125) {
  throw new Error(
    `record-quick-add-token-parsers.ts exceeded 125 lines: ${tokenParsersLineCount}`,
  );
}

for (const requiredRulesUsage of [
  "export type QuickAddTagRule =",
  'export type QuickAddTimeTokenRule = "today" | "yesterday";',
  "export const QUICK_ADD_TAG_RULES",
  "export const QUICK_ADD_TIME_TOKENS",
  "#零食",
  "#踩雷",
]) {
  if (!rulesSource.includes(requiredRulesUsage)) {
    throw new Error(
      `record-quick-add-rules.ts must own quick-add rule tables: ${requiredRulesUsage}`,
    );
  }
}

if (rulesSource.includes("parseQuickAddAbsoluteDateToken(")) {
  throw new Error(
    "record-quick-add-rules.ts must not take over parser responsibilities",
  );
}

if (rulesLineCount > 60) {
  throw new Error(`record-quick-add-rules.ts exceeded 60 lines: ${rulesLineCount}`);
}

console.log("record-quick-add structure verification passed");

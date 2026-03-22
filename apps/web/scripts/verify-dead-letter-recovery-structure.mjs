import fs from "node:fs";
import path from "node:path";

const panelPath = path.resolve(process.cwd(), "components/dead-letter-recovery-panel.tsx");
const panelSource = fs.readFileSync(panelPath, "utf8");
const panelLineCount = panelSource.split(/\r?\n/).length;
const summaryPath = path.resolve(process.cwd(), "components/dead-letter-recovery-summary.tsx");
const summarySource = fs.readFileSync(summaryPath, "utf8");
const itemCardPath = path.resolve(process.cwd(), "components/dead-letter-recovery-item-card.tsx");
const itemCardSource = fs.readFileSync(itemCardPath, "utf8");

if (!panelSource.includes('import { DeadLetterRecoverySummary } from "./dead-letter-recovery-summary";')) {
  throw new Error("dead-letter-recovery-panel.tsx must import DeadLetterRecoverySummary");
}

if (!panelSource.includes('import { DeadLetterRecoveryItemCard } from "./dead-letter-recovery-item-card";')) {
  throw new Error("dead-letter-recovery-panel.tsx must import DeadLetterRecoveryItemCard");
}

if (!panelSource.includes('import type { DeadLetterRecoveryPanelProps } from "./dead-letter-recovery-panel.types";')) {
  throw new Error("dead-letter-recovery-panel.tsx must import DeadLetterRecoveryPanelProps");
}

if (!panelSource.includes("<DeadLetterRecoverySummary")) {
  throw new Error("dead-letter-recovery-panel.tsx must delegate summary rendering");
}

if (!panelSource.includes("<DeadLetterRecoveryItemCard")) {
  throw new Error("dead-letter-recovery-panel.tsx must delegate item-card rendering");
}

if (!summarySource.includes("mediaDeadLetterOverview?.total_count ?? 0")) {
  throw new Error("dead-letter-recovery-summary.tsx must keep total-count rendering");
}

if (!summarySource.includes("Object.entries(mediaDeadLetterOverview.by_retry_state)")) {
  throw new Error("dead-letter-recovery-summary.tsx must keep retry-state summary rendering");
}

if (!itemCardSource.includes("const action = getMediaIssueAction(locale, item);")) {
  throw new Error("dead-letter-recovery-item-card.tsx must keep action lookup local");
}

if (!itemCardSource.includes("const settingsHref = buildMediaIssueSettingsHref(workspaceId, item);")) {
  throw new Error("dead-letter-recovery-item-card.tsx must keep settings link lookup local");
}

for (const forbiddenToken of [
  "Object.entries(mediaDeadLetterOverview.by_retry_state)",
  "Object.entries(mediaDeadLetterOverview.by_issue_category)",
  "getMediaIssueAction(locale, item)",
  "buildMediaIssueSettingsHref(workspaceId, item)",
  "className=\"record-card\" key={item.media_id}",
]) {
  if (panelSource.includes(forbiddenToken)) {
    throw new Error(`dead-letter-recovery-panel.tsx must keep detail rendering delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 95;
if (panelLineCount > maxAllowedLines) {
  throw new Error(`dead-letter-recovery-panel.tsx exceeded ${maxAllowedLines} lines: ${panelLineCount}`);
}

console.log("dead-letter recovery structure verification passed");

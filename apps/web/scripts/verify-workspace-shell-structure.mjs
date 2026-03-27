import fs from "node:fs";
import path from "node:path";

const workspaceShellPath = path.resolve(process.cwd(), "components/workspace-shell-client.tsx");
const workspaceShellClientPropsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-client-props.ts",
);
const workspaceShellPanelsPath = path.resolve(process.cwd(), "components/workspace-shell-panels.tsx");
const workspaceShellStatePath = path.resolve(process.cwd(), "components/use-workspace-shell-state.ts");
const workspaceShellStateValuesPath = path.resolve(
  process.cwd(),
  "components/use-workspace-shell-state-values.ts",
);
const workspaceShellStateCoreValuesPath = path.resolve(
  process.cwd(),
  "components/use-workspace-shell-state-core-values.ts",
);
const workspaceShellStateConversationValuesPath = path.resolve(
  process.cwd(),
  "components/use-workspace-shell-state-conversation-values.ts",
);
const workspaceShellStateMediaValuesPath = path.resolve(
  process.cwd(),
  "components/use-workspace-shell-state-media-values.ts",
);
const workspaceShellStateManagedValuesPath = path.resolve(
  process.cwd(),
  "components/use-workspace-shell-state-managed-values.ts",
);
const workspaceShellStatePermissionsPath = path.resolve(
  process.cwd(),
  "components/use-workspace-shell-state-permissions.ts",
);
const workspaceShellRefreshersPath = path.resolve(process.cwd(), "components/use-workspace-shell-refreshers.ts");
const workspaceShellActionsPath = path.resolve(process.cwd(), "components/use-workspace-shell-actions.ts");
const workspaceShellActionsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-actions.types.ts",
);
const workspaceShellActionInputsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-action-inputs.types.ts",
);
const workspaceShellEffectsPath = path.resolve(process.cwd(), "components/use-workspace-shell-effects.ts");
const workspaceShellInitialLoadPath = path.resolve(
  process.cwd(),
  "components/use-workspace-shell-initial-load.ts",
);
const workspaceShellInitialLoadAuthPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-initial-load-auth.ts",
);
const workspaceShellInitialLoadDataInputPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-initial-load-data-input.ts",
);
const workspaceShellInitialLoadRunnerPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-initial-load-runner.ts",
);
const workspaceShellInitialLoadHelpersPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-initial-load-helpers.ts",
);
const workspaceShellInitialLoadHelpersTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-initial-load-helpers.types.ts",
);
const workspaceShellMediaFilterActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-media-filter-actions.ts",
);
const workspaceShellRecordFilterActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-record-filter-actions.ts",
);
const workspaceShellRecordFilterApplyActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-record-filter-apply-actions.ts",
);
const workspaceShellSearchPresetActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-search-preset-actions.ts",
);
const workspaceShellMediaUploadActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-media-upload-actions.ts",
);
const workspaceShellMediaSelectedActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-media-selected-actions.ts",
);
const workspaceShellMediaDeadLetterActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-media-dead-letter-actions.ts",
);
const workspaceShellMediaActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-media-actions.ts",
);
const workspaceShellMediaActionRefreshPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-media-action-refresh.ts",
);
const workspaceShellRecordActionRefreshPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-record-action-refresh.ts",
);
const workspaceShellRecordActionPayloadsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-record-action-payloads.ts",
);
const workspaceShellRecordSaveActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-record-save-actions.ts",
);
const workspaceShellRecordDeleteActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-record-delete-actions.ts",
);
const workspaceShellReminderNotificationActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-reminder-notification-actions.ts",
);
const workspaceShellReminderActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-reminder-actions.ts",
);
const workspaceShellNotificationActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-notification-actions.ts",
);
const workspaceShellChatActionResultsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-chat-action-results.ts",
);
const workspaceShellChatSendActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-chat-send-actions.ts",
);
const workspaceShellChatConversationActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-chat-conversation-actions.ts",
);
const workspaceShellChatActionConversationsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-chat-action-conversations.ts",
);
const workspaceShellChatActionSelectionPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-chat-action-selection.ts",
);
const workspaceShellChatRecordActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-chat-record-actions.ts",
);
const workspaceShellAdminActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-admin-actions.ts",
);
const workspaceShellConversationStateLoadPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-conversation-state-load.ts",
);
const workspaceShellConversationStateLoadTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-conversation-state-load.types.ts",
);
const workspaceShellManagedStateLoadPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-managed-state-load.ts",
);
const workspaceShellManagedStateLoadTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-managed-state-load.types.ts",
);
const workspaceShellInitialFollowUpPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-initial-follow-up.ts",
);
const workspaceShellInitialFollowUpTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-initial-follow-up.types.ts",
);
const workspaceShellInitialBootstrapPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-initial-bootstrap.ts",
);
const workspaceShellInitialBootstrapTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-initial-bootstrap.types.ts",
);
const source = fs.readFileSync(workspaceShellPath, "utf8");
const clientPropsSource = fs.readFileSync(workspaceShellClientPropsPath, "utf8");
const panelsSource = fs.readFileSync(workspaceShellPanelsPath, "utf8");
const workspaceShellStateSource = fs.readFileSync(workspaceShellStatePath, "utf8");
const workspaceShellStateValuesSource = fs.readFileSync(workspaceShellStateValuesPath, "utf8");
const workspaceShellStateCoreValuesSource = fs.readFileSync(
  workspaceShellStateCoreValuesPath,
  "utf8",
);
const workspaceShellStateConversationValuesSource = fs.readFileSync(
  workspaceShellStateConversationValuesPath,
  "utf8",
);
const workspaceShellStateMediaValuesSource = fs.readFileSync(
  workspaceShellStateMediaValuesPath,
  "utf8",
);
const workspaceShellStateManagedValuesSource = fs.readFileSync(
  workspaceShellStateManagedValuesPath,
  "utf8",
);
const workspaceShellStatePermissionsSource = fs.readFileSync(
  workspaceShellStatePermissionsPath,
  "utf8",
);
const refreshersSource = fs.readFileSync(workspaceShellRefreshersPath, "utf8");
const actionsSource = fs.readFileSync(workspaceShellActionsPath, "utf8");
const workspaceShellActionsTypesSource = fs.readFileSync(
  workspaceShellActionsTypesPath,
  "utf8",
);
const workspaceShellActionInputsTypesSource = fs.readFileSync(
  workspaceShellActionInputsTypesPath,
  "utf8",
);
const effectsSource = fs.readFileSync(workspaceShellEffectsPath, "utf8");
const initialLoadSource = fs.readFileSync(workspaceShellInitialLoadPath, "utf8");
const initialLoadAuthSource = fs.readFileSync(workspaceShellInitialLoadAuthPath, "utf8");
const initialLoadDataInputSource = fs.readFileSync(workspaceShellInitialLoadDataInputPath, "utf8");
const initialLoadRunnerSource = fs.readFileSync(workspaceShellInitialLoadRunnerPath, "utf8");
const initialLoadHelpersSource = fs.readFileSync(workspaceShellInitialLoadHelpersPath, "utf8");
const initialLoadHelpersTypesSource = fs.readFileSync(
  workspaceShellInitialLoadHelpersTypesPath,
  "utf8",
);
const mediaFilterActionsSource = fs.readFileSync(workspaceShellMediaFilterActionsPath, "utf8");
const recordFilterActionsSource = fs.readFileSync(
  workspaceShellRecordFilterActionsPath,
  "utf8",
);
const recordFilterApplyActionsSource = fs.readFileSync(
  workspaceShellRecordFilterApplyActionsPath,
  "utf8",
);
const searchPresetActionsSource = fs.readFileSync(
  workspaceShellSearchPresetActionsPath,
  "utf8",
);
const mediaUploadActionsSource = fs.readFileSync(
  workspaceShellMediaUploadActionsPath,
  "utf8",
);
const mediaSelectedActionsSource = fs.readFileSync(
  workspaceShellMediaSelectedActionsPath,
  "utf8",
);
const mediaDeadLetterActionsSource = fs.readFileSync(
  workspaceShellMediaDeadLetterActionsPath,
  "utf8",
);
const mediaActionsSource = fs.readFileSync(workspaceShellMediaActionsPath, "utf8");
const mediaActionRefreshSource = fs.readFileSync(
  workspaceShellMediaActionRefreshPath,
  "utf8",
);
const recordActionRefreshSource = fs.readFileSync(
  workspaceShellRecordActionRefreshPath,
  "utf8",
);
const recordActionPayloadsSource = fs.readFileSync(
  workspaceShellRecordActionPayloadsPath,
  "utf8",
);
const recordSaveActionsSource = fs.readFileSync(
  workspaceShellRecordSaveActionsPath,
  "utf8",
);
const recordDeleteActionsSource = fs.readFileSync(
  workspaceShellRecordDeleteActionsPath,
  "utf8",
);
const reminderNotificationActionsSource = fs.readFileSync(
  workspaceShellReminderNotificationActionsPath,
  "utf8",
);
const reminderActionsSource = fs.readFileSync(workspaceShellReminderActionsPath, "utf8");
const notificationActionsSource = fs.readFileSync(
  workspaceShellNotificationActionsPath,
  "utf8",
);
const chatActionResultsSource = fs.readFileSync(
  workspaceShellChatActionResultsPath,
  "utf8",
);
const chatSendActionsSource = fs.readFileSync(workspaceShellChatSendActionsPath, "utf8");
const chatConversationActionsSource = fs.readFileSync(
  workspaceShellChatConversationActionsPath,
  "utf8",
);
const chatActionConversationsSource = fs.readFileSync(
  workspaceShellChatActionConversationsPath,
  "utf8",
);
const chatActionSelectionSource = fs.readFileSync(
  workspaceShellChatActionSelectionPath,
  "utf8",
);
const chatRecordActionsSource = fs.readFileSync(workspaceShellChatRecordActionsPath, "utf8");
const adminActionsSource = fs.readFileSync(workspaceShellAdminActionsPath, "utf8");
const conversationStateLoadSource = fs.readFileSync(
  workspaceShellConversationStateLoadPath,
  "utf8",
);
const conversationStateLoadTypesSource = fs.readFileSync(
  workspaceShellConversationStateLoadTypesPath,
  "utf8",
);
const managedStateLoadSource = fs.readFileSync(workspaceShellManagedStateLoadPath, "utf8");
const managedStateLoadTypesSource = fs.readFileSync(
  workspaceShellManagedStateLoadTypesPath,
  "utf8",
);
const initialFollowUpSource = fs.readFileSync(workspaceShellInitialFollowUpPath, "utf8");
const initialFollowUpTypesSource = fs.readFileSync(
  workspaceShellInitialFollowUpTypesPath,
  "utf8",
);
const initialBootstrapSource = fs.readFileSync(workspaceShellInitialBootstrapPath, "utf8");
const initialBootstrapTypesSource = fs.readFileSync(
  workspaceShellInitialBootstrapTypesPath,
  "utf8",
);
const lineCount = source.split(/\r?\n/).length;
const clientPropsLineCount = clientPropsSource.split(/\r?\n/).length;
const panelsLineCount = panelsSource.split(/\r?\n/).length;
const workspaceShellStateLineCount = workspaceShellStateSource.split(/\r?\n/).length;
const workspaceShellStateValuesLineCount =
  workspaceShellStateValuesSource.split(/\r?\n/).length;
const workspaceShellStateCoreValuesLineCount =
  workspaceShellStateCoreValuesSource.split(/\r?\n/).length;
const workspaceShellStateConversationValuesLineCount =
  workspaceShellStateConversationValuesSource.split(/\r?\n/).length;
const workspaceShellStateMediaValuesLineCount =
  workspaceShellStateMediaValuesSource.split(/\r?\n/).length;
const workspaceShellStateManagedValuesLineCount =
  workspaceShellStateManagedValuesSource.split(/\r?\n/).length;
const workspaceShellStatePermissionsLineCount =
  workspaceShellStatePermissionsSource.split(/\r?\n/).length;
const actionsLineCount = actionsSource.split(/\r?\n/).length;
const workspaceShellActionsTypesLineCount =
  workspaceShellActionsTypesSource.split(/\r?\n/).length;
const workspaceShellActionInputsTypesLineCount =
  workspaceShellActionInputsTypesSource.split(/\r?\n/).length;
const effectsLineCount = effectsSource.split(/\r?\n/).length;
const initialLoadLineCount = initialLoadSource.split(/\r?\n/).length;
const initialLoadAuthLineCount = initialLoadAuthSource.split(/\r?\n/).length;
const initialLoadDataInputLineCount = initialLoadDataInputSource.split(/\r?\n/).length;
const initialLoadRunnerLineCount = initialLoadRunnerSource.split(/\r?\n/).length;
const initialLoadHelpersLineCount = initialLoadHelpersSource.split(/\r?\n/).length;
const initialLoadHelpersTypesLineCount = initialLoadHelpersTypesSource.split(/\r?\n/).length;
const mediaFilterActionsLineCount = mediaFilterActionsSource.split(/\r?\n/).length;
const recordFilterActionsLineCount = recordFilterActionsSource.split(/\r?\n/).length;
const recordFilterApplyActionsLineCount =
  recordFilterApplyActionsSource.split(/\r?\n/).length;
const searchPresetActionsLineCount = searchPresetActionsSource.split(/\r?\n/).length;
const mediaUploadActionsLineCount = mediaUploadActionsSource.split(/\r?\n/).length;
const mediaSelectedActionsLineCount = mediaSelectedActionsSource.split(/\r?\n/).length;
const mediaDeadLetterActionsLineCount =
  mediaDeadLetterActionsSource.split(/\r?\n/).length;
const mediaActionsLineCount = mediaActionsSource.split(/\r?\n/).length;
const mediaActionRefreshLineCount = mediaActionRefreshSource.split(/\r?\n/).length;
const recordActionRefreshLineCount = recordActionRefreshSource.split(/\r?\n/).length;
const recordActionPayloadsLineCount = recordActionPayloadsSource.split(/\r?\n/).length;
const recordSaveActionsLineCount = recordSaveActionsSource.split(/\r?\n/).length;
const recordDeleteActionsLineCount = recordDeleteActionsSource.split(/\r?\n/).length;
const reminderNotificationActionsLineCount =
  reminderNotificationActionsSource.split(/\r?\n/).length;
const reminderActionsLineCount = reminderActionsSource.split(/\r?\n/).length;
const notificationActionsLineCount = notificationActionsSource.split(/\r?\n/).length;
const chatActionResultsLineCount = chatActionResultsSource.split(/\r?\n/).length;
const chatSendActionsLineCount = chatSendActionsSource.split(/\r?\n/).length;
const chatConversationActionsLineCount =
  chatConversationActionsSource.split(/\r?\n/).length;
const chatActionConversationsLineCount =
  chatActionConversationsSource.split(/\r?\n/).length;
const chatActionSelectionLineCount = chatActionSelectionSource.split(/\r?\n/).length;
const chatRecordActionsLineCount = chatRecordActionsSource.split(/\r?\n/).length;
const adminActionsLineCount = adminActionsSource.split(/\r?\n/).length;
const conversationStateLoadLineCount = conversationStateLoadSource.split(/\r?\n/).length;
const conversationStateLoadTypesLineCount =
  conversationStateLoadTypesSource.split(/\r?\n/).length;
const managedStateLoadLineCount = managedStateLoadSource.split(/\r?\n/).length;
const managedStateLoadTypesLineCount = managedStateLoadTypesSource.split(/\r?\n/).length;
const initialFollowUpLineCount = initialFollowUpSource.split(/\r?\n/).length;
const initialFollowUpTypesLineCount = initialFollowUpTypesSource.split(/\r?\n/).length;
const initialBootstrapLineCount = initialBootstrapSource.split(/\r?\n/).length;
const initialBootstrapTypesLineCount = initialBootstrapTypesSource.split(/\r?\n/).length;

for (const requiredRefreshersImport of [
  'from "./workspace-shell-conversation-refreshers";',
  'from "./workspace-shell-managed-refreshers";',
  'from "./workspace-shell-record-media-refreshers";',
  'from "./workspace-shell-refreshers.types";',
]) {
  if (!refreshersSource.includes(requiredRefreshersImport)) {
    throw new Error(`use-workspace-shell-refreshers.ts must import delegated refresher groups: ${requiredRefreshersImport}`);
  }
}

for (const requiredRefreshersUsage of [
  "createWorkspaceShellConversationRefreshers(props)",
  "createWorkspaceShellManagedRefreshers(props)",
  "createWorkspaceShellRecordMediaRefreshers(props)",
  "...conversationRefreshers",
  "...managedRefreshers",
  "...recordMediaRefreshers",
]) {
  if (!refreshersSource.includes(requiredRefreshersUsage)) {
    throw new Error(`use-workspace-shell-refreshers.ts must delegate refresher assembly: ${requiredRefreshersUsage}`);
  }
}

for (const forbiddenRefreshersToken of [
  "INITIAL_RECORD_FILTER",
  "loadConversationMessagesForWorkspace(",
  "refreshAuditLogItems(",
  "refreshKnowledgeStatsData(",
  "refreshMediaAssets(",
  "refreshMediaDeadLetterOverviewData(",
  "refreshMediaProcessingOverviewData(",
  "refreshMediaStorageSummaryData(",
  "refreshNotificationItems(",
  "refreshProviderConfigItems(",
  "refreshRecordCollection(",
  "refreshReminderItems(",
  "refreshSearchPresetItems(",
  "refreshShareLinkItems(",
  "syncDueNotificationsAndRefresh(",
]) {
  if (refreshersSource.includes(forbiddenRefreshersToken)) {
    throw new Error(`use-workspace-shell-refreshers.ts must keep refresher internals delegated: ${forbiddenRefreshersToken}`);
  }
}

const refreshersLineCount = refreshersSource.split(/\r?\n/).length;
const maxRefreshersLines = 30;
if (refreshersLineCount > maxRefreshersLines) {
  throw new Error(
    `use-workspace-shell-refreshers.ts exceeded ${maxRefreshersLines} lines: ${refreshersLineCount}`,
  );
}

for (const delegatedRefresherPath of [
  path.resolve(process.cwd(), "components/workspace-shell-conversation-refreshers.ts"),
  path.resolve(process.cwd(), "components/workspace-shell-managed-refreshers.ts"),
  path.resolve(process.cwd(), "components/workspace-shell-record-media-refreshers.ts"),
]) {
  const delegatedRefresherSource = fs.readFileSync(delegatedRefresherPath, "utf8");
  if (!delegatedRefresherSource.includes('from "../lib/workspace-shell-refresh";')) {
    throw new Error(
      `${path.basename(delegatedRefresherPath)} must import shared refresh helpers from ../lib/workspace-shell-refresh`,
    );
  }
}

if (!source.includes('import { createWorkspaceShellRefreshers } from "./use-workspace-shell-refreshers";')) {
  throw new Error("workspace-shell-client.tsx must import createWorkspaceShellRefreshers");
}

if (!source.includes('import { useWorkspaceShellEffects } from "./use-workspace-shell-effects";')) {
  throw new Error("workspace-shell-client.tsx must import useWorkspaceShellEffects");
}

if (!source.includes('import { useWorkspaceShellActions } from "./use-workspace-shell-actions";')) {
  throw new Error("workspace-shell-client.tsx must import useWorkspaceShellActions");
}

if (!source.includes('import { useWorkspaceShellState } from "./use-workspace-shell-state";')) {
  throw new Error("workspace-shell-client.tsx must import useWorkspaceShellState");
}

if (!source.includes('import { WorkspaceShellFrame } from "./workspace-shell-frame";')) {
  throw new Error("workspace-shell-client.tsx must import WorkspaceShellFrame");
}

if (!source.includes('import { WorkspaceShellPanels } from "./workspace-shell-panels";')) {
  throw new Error("workspace-shell-client.tsx must import WorkspaceShellPanels");
}

if (!source.includes('from "./workspace-shell-client-props";')) {
  throw new Error("workspace-shell-client.tsx must import workspace-shell-client-props");
}

for (const requiredClientPropsExport of [
  'export { buildWorkspaceShellActionsInput } from "./workspace-shell-client-actions-input";',
  'export { buildWorkspaceShellEffectsInput } from "./workspace-shell-client-effects-input";',
  'export { buildWorkspaceShellPanelsProps } from "./workspace-shell-client-panels-props";',
  'export { buildWorkspaceShellRefreshersInput } from "./workspace-shell-client-refreshers-input";',
]) {
  if (!clientPropsSource.includes(requiredClientPropsExport)) {
    throw new Error(`workspace-shell-client-props.ts must remain a stable re-export boundary: ${requiredClientPropsExport}`);
  }
}

if (!panelsSource.includes('import type { WorkspaceShellPanelsProps } from "./workspace-shell-panels.types";')) {
  throw new Error("workspace-shell-panels.tsx must import WorkspaceShellPanelsProps from workspace-shell-panels.types");
}

if (!panelsSource.includes('from "./workspace-shell-panels-props";')) {
  throw new Error("workspace-shell-panels.tsx must import workspace-shell-panels-props");
}

if (!source.includes("useWorkspaceShellEffects(")) {
  throw new Error("workspace-shell-client.tsx must delegate lifecycle synchronization to useWorkspaceShellEffects");
}

if (!source.includes("useWorkspaceShellActions(")) {
  throw new Error("workspace-shell-client.tsx must delegate action orchestration to useWorkspaceShellActions");
}

if (!source.includes("useWorkspaceShellState()")) {
  throw new Error("workspace-shell-client.tsx must delegate local state registration to useWorkspaceShellState");
}

for (const requiredStateImport of [
  'from "./use-workspace-shell-state-permissions";',
  'from "./use-workspace-shell-state-values";',
]) {
  if (!workspaceShellStateSource.includes(requiredStateImport)) {
    throw new Error(`use-workspace-shell-state.ts must import delegated state helpers: ${requiredStateImport}`);
  }
}

for (const requiredStateUsage of [
  "useWorkspaceShellStateValues()",
  "useWorkspaceShellStatePermissions(state.workspace)",
  "...state",
  "...permissions",
]) {
  if (!workspaceShellStateSource.includes(requiredStateUsage)) {
    throw new Error(`use-workspace-shell-state.ts must delegate state composition: ${requiredStateUsage}`);
  }
}

for (const forbiddenStateToken of [
  "useState(",
  "INITIAL_RECORD_FILTER",
  'workspace?.role === "owner"',
  'workspace?.role === "editor"',
]) {
  if (workspaceShellStateSource.includes(forbiddenStateToken)) {
    throw new Error(`use-workspace-shell-state.ts must keep state internals delegated: ${forbiddenStateToken}`);
  }
}

const maxWorkspaceShellStateLines = 20;
if (workspaceShellStateLineCount > maxWorkspaceShellStateLines) {
  throw new Error(
    `use-workspace-shell-state.ts exceeded ${maxWorkspaceShellStateLines} lines: ${workspaceShellStateLineCount}`,
  );
}

for (const requiredStateValuesImport of [
  'from "./use-workspace-shell-state-core-values";',
  'from "./use-workspace-shell-state-conversation-values";',
  'from "./use-workspace-shell-state-media-values";',
  'from "./use-workspace-shell-state-managed-values";',
]) {
  if (!workspaceShellStateValuesSource.includes(requiredStateValuesImport)) {
    throw new Error(`use-workspace-shell-state-values.ts must import shared shell state dependencies: ${requiredStateValuesImport}`);
  }
}

for (const requiredStateValuesUsage of [
  "useWorkspaceShellStateCoreValues()",
  "useWorkspaceShellStateConversationValues()",
  "useWorkspaceShellStateMediaValues()",
  "useWorkspaceShellStateManagedValues()",
  "...coreState",
  "...conversationState",
  "...mediaState",
  "...managedState",
]) {
  if (!workspaceShellStateValuesSource.includes(requiredStateValuesUsage)) {
    throw new Error(`use-workspace-shell-state-values.ts must own state registration: ${requiredStateValuesUsage}`);
  }
}

for (const forbiddenStateValuesToken of [
  'from "../lib/workspace-shell-refresh";',
  'from "../lib/types";',
  "useState(",
  "useState(INITIAL_RECORD_FILTER)",
  "setSavingSearchPreset",
  "setKnowledgeStats",
  "setMediaDeadLetterOverview",
]) {
  if (workspaceShellStateValuesSource.includes(forbiddenStateValuesToken)) {
    throw new Error(`use-workspace-shell-state-values.ts must keep grouped state internals delegated: ${forbiddenStateValuesToken}`);
  }
}

const maxWorkspaceShellStateValuesLines = 25;
if (workspaceShellStateValuesLineCount > maxWorkspaceShellStateValuesLines) {
  throw new Error(
    `use-workspace-shell-state-values.ts exceeded ${maxWorkspaceShellStateValuesLines} lines: ${workspaceShellStateValuesLineCount}`,
  );
}

for (const requiredCoreStateValuesUsage of [
  'from "../lib/workspace-shell-refresh";',
  'from "../lib/types";',
  "useState<string | null>(null)",
  "useState(INITIAL_RECORD_FILTER)",
  "setSavingSearchPreset",
]) {
  if (!workspaceShellStateCoreValuesSource.includes(requiredCoreStateValuesUsage)) {
    throw new Error(`use-workspace-shell-state-core-values.ts must own core shell state registration: ${requiredCoreStateValuesUsage}`);
  }
}

const maxWorkspaceShellStateCoreValuesLines = 55;
if (workspaceShellStateCoreValuesLineCount > maxWorkspaceShellStateCoreValuesLines) {
  throw new Error(
    `use-workspace-shell-state-core-values.ts exceeded ${maxWorkspaceShellStateCoreValuesLines} lines: ${workspaceShellStateCoreValuesLineCount}`,
  );
}

for (const requiredConversationStateValuesUsage of [
  'from "../lib/types";',
  "useState<Conversation[]>([])",
  "useState<string | null>(null)",
  "useState<ChatMessage[]>([])",
]) {
  if (!workspaceShellStateConversationValuesSource.includes(requiredConversationStateValuesUsage)) {
    throw new Error(`use-workspace-shell-state-conversation-values.ts must own conversation state registration: ${requiredConversationStateValuesUsage}`);
  }
}

const maxWorkspaceShellStateConversationValuesLines = 25;
if (
  workspaceShellStateConversationValuesLineCount >
  maxWorkspaceShellStateConversationValuesLines
) {
  throw new Error(
    `use-workspace-shell-state-conversation-values.ts exceeded ${maxWorkspaceShellStateConversationValuesLines} lines: ${workspaceShellStateConversationValuesLineCount}`,
  );
}

for (const requiredMediaStateValuesUsage of [
  'from "../lib/types";',
  "useState<MediaAsset[]>([])",
  "useState<MediaDeadLetterOverview | null>(null)",
  "useState<MediaProcessingOverview | null>(null)",
  "useState<MediaStorageSummary | null>(null)",
  "useState<ReminderItem[]>([])",
  "useState<NotificationItem[]>([])",
]) {
  if (!workspaceShellStateMediaValuesSource.includes(requiredMediaStateValuesUsage)) {
    throw new Error(`use-workspace-shell-state-media-values.ts must own media state registration: ${requiredMediaStateValuesUsage}`);
  }
}

const maxWorkspaceShellStateMediaValuesLines = 40;
if (workspaceShellStateMediaValuesLineCount > maxWorkspaceShellStateMediaValuesLines) {
  throw new Error(
    `use-workspace-shell-state-media-values.ts exceeded ${maxWorkspaceShellStateMediaValuesLines} lines: ${workspaceShellStateMediaValuesLineCount}`,
  );
}

for (const requiredManagedStateValuesUsage of [
  'from "../lib/types";',
  "useState<KnowledgeStats | null>(null)",
  "useState<ShareLinkItem[]>([])",
  "useState(\"\")",
  "useState<AuditLogItem[]>([])",
]) {
  if (!workspaceShellStateManagedValuesSource.includes(requiredManagedStateValuesUsage)) {
    throw new Error(`use-workspace-shell-state-managed-values.ts must own managed state registration: ${requiredManagedStateValuesUsage}`);
  }
}

const maxWorkspaceShellStateManagedValuesLines = 35;
if (workspaceShellStateManagedValuesLineCount > maxWorkspaceShellStateManagedValuesLines) {
  throw new Error(
    `use-workspace-shell-state-managed-values.ts exceeded ${maxWorkspaceShellStateManagedValuesLines} lines: ${workspaceShellStateManagedValuesLineCount}`,
  );
}

for (const requiredStatePermissionsUsage of [
  "export function useWorkspaceShellStatePermissions(workspace: Workspace | null)",
  'workspace?.role === "owner" || workspace?.role === "editor"',
  'workspace?.role === "owner"',
]) {
  if (!workspaceShellStatePermissionsSource.includes(requiredStatePermissionsUsage)) {
    throw new Error(`use-workspace-shell-state-permissions.ts must own workspace permission derivation: ${requiredStatePermissionsUsage}`);
  }
}

for (const forbiddenStatePermissionsToken of [
  "useState(",
  "INITIAL_RECORD_FILTER",
  "setWorkspace",
]) {
  if (workspaceShellStatePermissionsSource.includes(forbiddenStatePermissionsToken)) {
    throw new Error(`use-workspace-shell-state-permissions.ts must keep raw state registration delegated: ${forbiddenStatePermissionsToken}`);
  }
}

const maxWorkspaceShellStatePermissionsLines = 20;
if (workspaceShellStatePermissionsLineCount > maxWorkspaceShellStatePermissionsLines) {
  throw new Error(
    `use-workspace-shell-state-permissions.ts exceeded ${maxWorkspaceShellStatePermissionsLines} lines: ${workspaceShellStatePermissionsLineCount}`,
  );
}

if (!source.includes("createWorkspaceShellRefreshers({")) {
  if (!source.includes("createWorkspaceShellRefreshers(")) {
    throw new Error("workspace-shell-client.tsx must delegate refresh helper composition to createWorkspaceShellRefreshers");
  }
}

if (!source.includes("<WorkspaceShellPanels")) {
  throw new Error("workspace-shell-client.tsx must delegate panel composition to WorkspaceShellPanels");
}

if (!panelsSource.includes("<ChatPanel")) {
  throw new Error("workspace-shell-panels.tsx must keep composing ChatPanel");
}

if (!panelsSource.includes("<RecordPanelV2")) {
  throw new Error("workspace-shell-panels.tsx must keep composing RecordPanelV2");
}

if (!panelsSource.includes("buildChatPanelProps(props)")) {
  throw new Error("workspace-shell-panels.tsx must delegate chat panel prop assembly");
}

if (!panelsSource.includes("buildRecordPanelProps(props)")) {
  throw new Error("workspace-shell-panels.tsx must delegate record panel prop assembly");
}

if (!source.includes("<WorkspaceShellFrame")) {
  throw new Error("workspace-shell-client.tsx must delegate loading and error shell rendering to WorkspaceShellFrame");
}

for (const requiredHelperUsage of [
  "buildWorkspaceShellRefreshersInput({ state, workspaceId })",
  "buildWorkspaceShellEffectsInput({ router, state, workspaceId })",
  "buildWorkspaceShellActionsInput({ refreshers, state, workspaceId })",
  "buildWorkspaceShellPanelsProps({ actions, state, workspaceId })",
]) {
  if (!source.includes(requiredHelperUsage)) {
    throw new Error(`workspace-shell-client.tsx must delegate shell prop assembly: ${requiredHelperUsage}`);
  }
}

for (const forbiddenToken of [
  "useState(",
  "useEffect(",
  "const handle",
  "listRecords(",
  "listMedia(",
  "listMessages(",
  "listNotifications(",
  "listProviderConfigs(",
  "listReminders(",
  "listSearchPresets(",
  "listShareLinks(",
  "listAuditLogs(",
  "getKnowledgeStats(",
  "getMediaDeadLetterOverview(",
  "getMediaProcessingOverview(",
  "getMediaStorageSummary(",
  "syncNotifications(",
  "<ChatPanel",
  "<RecordPanelV2",
  "Loading workspace...",
  "notice error",
  "const refreshRecords = async",
  "const refreshMedia = async",
  "const refreshNotifications = async",
  "const refreshKnowledge = async",
  "token, setToken, workspace, setWorkspace",
  "refreshAuditLogs,",
  "handleSendMessage,",
  "activeConversationId={activeConversationId}",
  "authToken={token}",
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`workspace-shell-client.tsx must keep refresh logic delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 120;
if (lineCount > maxAllowedLines) {
  throw new Error(`workspace-shell-client.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

const maxPanelsLines = 130;
if (panelsLineCount > maxPanelsLines) {
  throw new Error(`workspace-shell-panels.tsx exceeded ${maxPanelsLines} lines: ${panelsLineCount}`);
}

const maxClientPropsLines = 20;
if (clientPropsLineCount > maxClientPropsLines) {
  throw new Error(
    `workspace-shell-client-props.ts exceeded ${maxClientPropsLines} lines: ${clientPropsLineCount}`,
  );
}

for (const requiredActionsImport of [
  'from "./workspace-shell-actions.types";',
  'from "./workspace-shell-chat-record-actions";',
  'from "./workspace-shell-media-filter-actions";',
  'from "./workspace-shell-admin-actions";',
]) {
  if (!actionsSource.includes(requiredActionsImport)) {
    throw new Error(`use-workspace-shell-actions.ts must import delegated action modules: ${requiredActionsImport}`);
  }
}

for (const requiredActionsUsage of [
  "createWorkspaceShellChatRecordActions(props)",
  "createWorkspaceShellMediaFilterActions(props)",
  "createWorkspaceShellAdminActions(props)",
  "...chatRecordActions",
  "...mediaFilterActions",
  "...adminActions",
]) {
  if (!actionsSource.includes(requiredActionsUsage)) {
    throw new Error(`use-workspace-shell-actions.ts must delegate action assembly: ${requiredActionsUsage}`);
  }
}

for (const forbiddenActionsToken of [
  'from "../lib/api";',
  'from "../lib/timeline";',
  "const handle",
  "sendMessage(",
  "createConversation(",
  "createRecord(",
  "updateRecord(",
  "deleteRecord(",
  "uploadMedia(",
  "deleteMedia(",
  "retryMediaProcessing(",
  "getMediaStatus(",
  "bulkRetryMediaDeadLetter(",
  "createSearchPreset(",
  "deleteSearchPreset(",
  "createReminder(",
  "updateReminder(",
  "deleteReminder(",
  "syncDueNotifications(",
  "updateNotification(",
  "reindexKnowledge(",
  "updateProviderConfig(",
  "createShareLink(",
  "updateShareLink(",
]) {
  if (actionsSource.includes(forbiddenActionsToken)) {
    throw new Error(`use-workspace-shell-actions.ts must keep action internals delegated: ${forbiddenActionsToken}`);
  }
}

const maxActionsLines = 40;
if (actionsLineCount > maxActionsLines) {
  throw new Error(`use-workspace-shell-actions.ts exceeded ${maxActionsLines} lines: ${actionsLineCount}`);
}

for (const requiredActionsTypesUsage of [
  'import type { Dispatch, SetStateAction } from "react";',
  'from "../lib/types";',
  "type StateSetter<T> = Dispatch<SetStateAction<T>>;",
  "export type UseWorkspaceShellActionsProps = {",
  "initialRecordFilter: RecordFilterState;",
]) {
  if (!workspaceShellActionsTypesSource.includes(requiredActionsTypesUsage)) {
    throw new Error(
      `workspace-shell-actions.types.ts must keep shared shell action prop typing centralized: ${requiredActionsTypesUsage}`,
    );
  }
}

for (const forbiddenActionsTypesToken of [
  'from "./record-panel-v2.types";',
  "WorkspaceShellBulkRetryInput",
  "WorkspaceShellReminderCreateInput",
  "WorkspaceShellShareLinkInput",
  "WorkspaceShellSaveRecordInput",
  "WorkspaceShellReminderUpdateInput",
]) {
  if (workspaceShellActionsTypesSource.includes(forbiddenActionsTypesToken)) {
    throw new Error(
      `workspace-shell-actions.types.ts must not own action input payload types: ${forbiddenActionsTypesToken}`,
    );
  }
}

const maxActionsTypesLines = 60;
if (workspaceShellActionsTypesLineCount > maxActionsTypesLines) {
  throw new Error(
    `workspace-shell-actions.types.ts exceeded ${maxActionsTypesLines} lines: ${workspaceShellActionsTypesLineCount}`,
  );
}

for (const requiredActionInputsTypesUsage of [
  'import type { ReminderUpdateInput, SaveRecordInput } from "./record-panel-v2.types";',
  "export type WorkspaceShellBulkRetryInput = {",
  "export type WorkspaceShellReminderCreateInput = {",
  "export type WorkspaceShellShareLinkInput = {",
  "export type WorkspaceShellSaveRecordInput = SaveRecordInput;",
  "export type WorkspaceShellReminderUpdateInput = ReminderUpdateInput;",
]) {
  if (!workspaceShellActionInputsTypesSource.includes(requiredActionInputsTypesUsage)) {
    throw new Error(
      `workspace-shell-action-inputs.types.ts must own extracted action input payload types: ${requiredActionInputsTypesUsage}`,
    );
  }
}

for (const forbiddenActionInputsTypesToken of [
  'from "../lib/types";',
  "export type UseWorkspaceShellActionsProps = {",
  "Dispatch<SetStateAction",
]) {
  if (workspaceShellActionInputsTypesSource.includes(forbiddenActionInputsTypesToken)) {
    throw new Error(
      `workspace-shell-action-inputs.types.ts must remain focused on action input payload typing: ${forbiddenActionInputsTypesToken}`,
    );
  }
}

const maxActionInputsTypesLines = 30;
if (workspaceShellActionInputsTypesLineCount > maxActionInputsTypesLines) {
  throw new Error(
    `workspace-shell-action-inputs.types.ts exceeded ${maxActionInputsTypesLines} lines: ${workspaceShellActionInputsTypesLineCount}`,
  );
}

for (const requiredEffectsImport of [
  'from "./workspace-shell-effects.types";',
  'from "./use-workspace-shell-initial-load";',
  'from "./use-workspace-shell-selection-effects";',
  'from "./use-workspace-shell-notification-effect";',
]) {
  if (!effectsSource.includes(requiredEffectsImport)) {
    throw new Error(`use-workspace-shell-effects.ts must import delegated effect modules: ${requiredEffectsImport}`);
  }
}

for (const requiredEffectsUsage of [
  "useWorkspaceShellInitialLoad(props)",
  "useWorkspaceShellSelectionEffects(props)",
  "useWorkspaceShellNotificationEffect(props)",
]) {
  if (!effectsSource.includes(requiredEffectsUsage)) {
    throw new Error(`use-workspace-shell-effects.ts must delegate effect orchestration: ${requiredEffectsUsage}`);
  }
}

for (const forbiddenEffectsToken of [
  "useEffect(",
  'from "../lib/api";',
  'from "../lib/auth";',
  'from "../lib/workspace-shell-refresh";',
  "getStoredToken(",
  "refreshMediaAssets(",
  "refreshReminderItems(",
  "syncDueNotificationsAndRefresh(",
]) {
  if (effectsSource.includes(forbiddenEffectsToken)) {
    throw new Error(`use-workspace-shell-effects.ts must keep effect internals delegated: ${forbiddenEffectsToken}`);
  }
}

const maxEffectsLines = 25;
if (effectsLineCount > maxEffectsLines) {
  throw new Error(`use-workspace-shell-effects.ts exceeded ${maxEffectsLines} lines: ${effectsLineCount}`);
}

for (const requiredInitialLoadImport of [
  'from "./workspace-shell-effects.types";',
  'from "./workspace-shell-initial-load-auth";',
  'from "./workspace-shell-initial-load-runner";',
]) {
  if (!initialLoadSource.includes(requiredInitialLoadImport)) {
    throw new Error(`use-workspace-shell-initial-load.ts must import delegated initial-load helpers: ${requiredInitialLoadImport}`);
  }
}

for (const requiredInitialLoadUsage of [
  "readWorkspaceShellInitialToken(router)",
  "runWorkspaceShellInitialLoad(activeToken, {",
]) {
  if (!initialLoadSource.includes(requiredInitialLoadUsage)) {
    throw new Error(`use-workspace-shell-initial-load.ts must delegate initial-load flow: ${requiredInitialLoadUsage}`);
  }
}

for (const forbiddenInitialLoadToken of [
  "createConversation(",
  "getWorkspace(",
  "listConversations(",
  "refreshRecordCollection(",
  "refreshNotificationItems(",
  "refreshKnowledgeStatsData(",
  "refreshMediaStorageSummaryData(",
  "refreshMediaProcessingOverviewData(",
  "refreshMediaDeadLetterOverviewData(",
  "refreshProviderConfigItems(",
  "refreshShareLinkItems(",
  "refreshSearchPresetItems(",
  "refreshAuditLogItems(",
  "clearStoredSession(",
  "getStoredToken(",
  "loadWorkspaceShellInitialData(",
]) {
  if (initialLoadSource.includes(forbiddenInitialLoadToken)) {
    throw new Error(`use-workspace-shell-initial-load.ts must keep detailed load steps delegated: ${forbiddenInitialLoadToken}`);
  }
}

const maxInitialLoadLines = 110;
if (initialLoadLineCount > maxInitialLoadLines) {
  throw new Error(
    `use-workspace-shell-initial-load.ts exceeded ${maxInitialLoadLines} lines: ${initialLoadLineCount}`,
  );
}

for (const requiredInitialLoadAuthUsage of [
  'from "../lib/auth";',
  'from "./workspace-shell-effects.types";',
  "export function readWorkspaceShellInitialToken(router: RouterLike): string | null",
  "getStoredToken()",
  'router.replace("/login")',
]) {
  if (!initialLoadAuthSource.includes(requiredInitialLoadAuthUsage)) {
    throw new Error(`workspace-shell-initial-load-auth.ts must own token gate logic: ${requiredInitialLoadAuthUsage}`);
  }
}

const maxInitialLoadAuthLines = 15;
if (initialLoadAuthLineCount > maxInitialLoadAuthLines) {
  throw new Error(
    `workspace-shell-initial-load-auth.ts exceeded ${maxInitialLoadAuthLines} lines: ${initialLoadAuthLineCount}`,
  );
}

for (const requiredInitialLoadDataInputUsage of [
  'from "./workspace-shell-effects.types";',
  "export function buildWorkspaceShellInitialDataInput(",
  "activeToken,",
  "workspaceId: props.workspaceId",
  "setMediaStorageSummary: props.setMediaStorageSummary",
]) {
  if (!initialLoadDataInputSource.includes(requiredInitialLoadDataInputUsage)) {
    throw new Error(`workspace-shell-initial-load-data-input.ts must own initial-load input mapping: ${requiredInitialLoadDataInputUsage}`);
  }
}

const maxInitialLoadDataInputLines = 35;
if (initialLoadDataInputLineCount > maxInitialLoadDataInputLines) {
  throw new Error(
    `workspace-shell-initial-load-data-input.ts exceeded ${maxInitialLoadDataInputLines} lines: ${initialLoadDataInputLineCount}`,
  );
}

for (const requiredInitialLoadRunnerUsage of [
  'from "../lib/auth";',
  'from "./workspace-shell-action-copy";',
  'from "./workspace-shell-initial-load-data-input";',
  'from "./workspace-shell-initial-load-helpers";',
  "export async function runWorkspaceShellInitialLoad(",
  "const copy = getStoredWorkspaceShellActionCopy();",
  "props.setToken(activeToken)",
  "loadWorkspaceShellInitialData(buildWorkspaceShellInitialDataInput(activeToken, props))",
  "clearStoredSession()",
  "copy.loadWorkspaceDataFailed",
  'props.router.replace("/login")',
]) {
  if (!initialLoadRunnerSource.includes(requiredInitialLoadRunnerUsage)) {
    throw new Error(`workspace-shell-initial-load-runner.ts must own initial-load execution flow: ${requiredInitialLoadRunnerUsage}`);
  }
}

const maxInitialLoadRunnerLines = 25;
if (initialLoadRunnerLineCount > maxInitialLoadRunnerLines) {
  throw new Error(
    `workspace-shell-initial-load-runner.ts exceeded ${maxInitialLoadRunnerLines} lines: ${initialLoadRunnerLineCount}`,
  );
}

for (const requiredInitialLoadHelpersImport of [
  'from "./workspace-shell-initial-bootstrap";',
  'from "./workspace-shell-initial-follow-up";',
  'import type { LoadWorkspaceShellInitialDataInput } from "./workspace-shell-initial-load-helpers.types";',
]) {
  if (!initialLoadHelpersSource.includes(requiredInitialLoadHelpersImport)) {
    throw new Error(`workspace-shell-initial-load-helpers.ts must import delegated bootstrap helpers: ${requiredInitialLoadHelpersImport}`);
  }
}

for (const requiredInitialLoadHelpersUsage of [
  "export async function loadWorkspaceShellInitialData({",
  "}: LoadWorkspaceShellInitialDataInput) {",
  "loadWorkspaceShellInitialBootstrap({",
  "loadWorkspaceShellInitialFollowUp({",
]) {
  if (!initialLoadHelpersSource.includes(requiredInitialLoadHelpersUsage)) {
    throw new Error(`workspace-shell-initial-load-helpers.ts must delegate bootstrap sequencing: ${requiredInitialLoadHelpersUsage}`);
  }
}

for (const forbiddenInitialLoadHelpersToken of [
  'from "./workspace-shell-effects.types";',
  'from "./workspace-shell-conversation-state-load";',
  'from "./workspace-shell-managed-state-load";',
  "type LoadWorkspaceShellInitialDataInput = {",
  "createConversation(",
  "listConversations(",
  "loadConversationMessagesForWorkspace(",
  "getWorkspace(",
  "refreshRecordCollection(",
  "refreshNotificationItems(",
  "refreshKnowledgeStatsData(",
  "refreshMediaStorageSummaryData(",
  "refreshMediaProcessingOverviewData(",
  "refreshMediaDeadLetterOverviewData(",
  "refreshProviderConfigItems(",
  "refreshShareLinkItems(",
  "refreshSearchPresetItems(",
  "refreshAuditLogItems(",
]) {
  if (initialLoadHelpersSource.includes(forbiddenInitialLoadHelpersToken)) {
    throw new Error(`workspace-shell-initial-load-helpers.ts must keep bootstrap internals delegated: ${forbiddenInitialLoadHelpersToken}`);
  }
}

const maxInitialLoadHelpersLines = 135;
if (initialLoadHelpersLineCount > maxInitialLoadHelpersLines) {
  throw new Error(
    `workspace-shell-initial-load-helpers.ts exceeded ${maxInitialLoadHelpersLines} lines: ${initialLoadHelpersLineCount}`,
  );
}

for (const requiredInitialLoadHelpersTypesUsage of [
  'import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types"; export type LoadWorkspaceShellInitialDataInput = { activeToken: string; setActiveConversationId: UseWorkspaceShellEffectsProps["setActiveConversationId"]; setAuditLogs: UseWorkspaceShellEffectsProps["setAuditLogs"]; setConversations: UseWorkspaceShellEffectsProps["setConversations"]; setKnowledgeStats: UseWorkspaceShellEffectsProps["setKnowledgeStats"]; setLatestSharePath: UseWorkspaceShellEffectsProps["setLatestSharePath"]; setMediaDeadLetterOverview: UseWorkspaceShellEffectsProps["setMediaDeadLetterOverview"]; setMediaProcessingOverview: UseWorkspaceShellEffectsProps["setMediaProcessingOverview"]; setMediaStorageSummary: UseWorkspaceShellEffectsProps["setMediaStorageSummary"]; setMessages: UseWorkspaceShellEffectsProps["setMessages"]; setNotifications: UseWorkspaceShellEffectsProps["setNotifications"]; setRecords: UseWorkspaceShellEffectsProps["setRecords"]; setSearchPresets: UseWorkspaceShellEffectsProps["setSearchPresets"]; setSelectedRecordId: UseWorkspaceShellEffectsProps["setSelectedRecordId"]; setShareLinks: UseWorkspaceShellEffectsProps["setShareLinks"]; setTimelineDays: UseWorkspaceShellEffectsProps["setTimelineDays"]; setVisibleRecords: UseWorkspaceShellEffectsProps["setVisibleRecords"]; setWorkspace: UseWorkspaceShellEffectsProps["setWorkspace"]; workspaceId: string };',
]) {
  if (!initialLoadHelpersTypesSource.includes(requiredInitialLoadHelpersTypesUsage)) {
    throw new Error(
      `workspace-shell-initial-load-helpers.types.ts must own initial-load input typing: ${requiredInitialLoadHelpersTypesUsage}`,
    );
  }
}

const maxInitialLoadHelpersTypesLines = 2;
if (initialLoadHelpersTypesLineCount > maxInitialLoadHelpersTypesLines) {
  throw new Error(
    `workspace-shell-initial-load-helpers.types.ts exceeded ${maxInitialLoadHelpersTypesLines} lines: ${initialLoadHelpersTypesLineCount}`,
  );
}

for (const requiredConversationStateLoadImport of [
  'from "../lib/api";',
  'from "../lib/workspace-shell-refresh";',
  'from "./chat-panel-display-copy";',
  'import type {',
  'from "./workspace-shell-conversation-state-load.types";',
]) {
  if (!conversationStateLoadSource.includes(requiredConversationStateLoadImport)) {
    throw new Error(
      `workspace-shell-conversation-state-load.ts must import delegated conversation-load dependencies: ${requiredConversationStateLoadImport}`,
    );
  }
}

for (const requiredConversationStateLoadUsage of [
  "export async function loadWorkspaceShellConversationState({",
  "}: LoadWorkspaceShellConversationStateInput) {",
  "function canManageWorkspace(role: WorkspaceShellLoadRole)",
  "getStoredChatPanelDisplayCopy().initialConversationTitle",
]) {
  if (!conversationStateLoadSource.includes(requiredConversationStateLoadUsage)) {
    throw new Error(
      `workspace-shell-conversation-state-load.ts must use the extracted conversation-load input and shared role typing: ${requiredConversationStateLoadUsage}`,
    );
  }
}

for (const forbiddenConversationStateLoadToken of [
  'type WorkspaceRole = "owner" | "editor" | "viewer";',
  "type LoadWorkspaceShellConversationStateInput = {",
  '"Workspace chat"',
]) {
  if (conversationStateLoadSource.includes(forbiddenConversationStateLoadToken)) {
    throw new Error(
      `workspace-shell-conversation-state-load.ts must keep shared role and input typing delegated: ${forbiddenConversationStateLoadToken}`,
    );
  }
}

const maxConversationStateLoadLines = 40;
if (conversationStateLoadLineCount > maxConversationStateLoadLines) {
  throw new Error(
    `workspace-shell-conversation-state-load.ts exceeded ${maxConversationStateLoadLines} lines: ${conversationStateLoadLineCount}`,
  );
}

for (const requiredConversationStateLoadTypesUsage of [
  'import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types"; export type WorkspaceShellLoadRole = "owner" | "editor" | "viewer"; export type LoadWorkspaceShellConversationStateInput = { activeToken: string; role: WorkspaceShellLoadRole; setActiveConversationId: UseWorkspaceShellEffectsProps["setActiveConversationId"]; setConversations: UseWorkspaceShellEffectsProps["setConversations"]; setMessages: UseWorkspaceShellEffectsProps["setMessages"]; workspaceId: string };',
]) {
  if (!conversationStateLoadTypesSource.includes(requiredConversationStateLoadTypesUsage)) {
    throw new Error(
      `workspace-shell-conversation-state-load.types.ts must own shared shell role and conversation-load typing: ${requiredConversationStateLoadTypesUsage}`,
    );
  }
}

const maxConversationStateLoadTypesLines = 2;
if (conversationStateLoadTypesLineCount > maxConversationStateLoadTypesLines) {
  throw new Error(
    `workspace-shell-conversation-state-load.types.ts exceeded ${maxConversationStateLoadTypesLines} lines: ${conversationStateLoadTypesLineCount}`,
  );
}

for (const requiredManagedStateLoadImport of [
  'from "../lib/workspace-shell-refresh";',
  'import type { LoadWorkspaceShellManagedStateInput } from "./workspace-shell-managed-state-load.types";',
  'import type { WorkspaceShellLoadRole } from "./workspace-shell-conversation-state-load.types";',
]) {
  if (!managedStateLoadSource.includes(requiredManagedStateLoadImport)) {
    throw new Error(
      `workspace-shell-managed-state-load.ts must import delegated managed-load dependencies: ${requiredManagedStateLoadImport}`,
    );
  }
}

for (const requiredManagedStateLoadUsage of [
  "export async function loadWorkspaceShellManagedState({",
  "}: LoadWorkspaceShellManagedStateInput) {",
  "function canManageWorkspace(role: WorkspaceShellLoadRole)",
]) {
  if (!managedStateLoadSource.includes(requiredManagedStateLoadUsage)) {
    throw new Error(
      `workspace-shell-managed-state-load.ts must use the extracted managed-load input and shared role typing: ${requiredManagedStateLoadUsage}`,
    );
  }
}

for (const forbiddenManagedStateLoadToken of [
  'type WorkspaceRole = "owner" | "editor" | "viewer";',
  "type LoadWorkspaceShellManagedStateInput = {",
]) {
  if (managedStateLoadSource.includes(forbiddenManagedStateLoadToken)) {
    throw new Error(
      `workspace-shell-managed-state-load.ts must keep shared role and input typing delegated: ${forbiddenManagedStateLoadToken}`,
    );
  }
}

const maxManagedStateLoadLines = 45;
if (managedStateLoadLineCount > maxManagedStateLoadLines) {
  throw new Error(
    `workspace-shell-managed-state-load.ts exceeded ${maxManagedStateLoadLines} lines: ${managedStateLoadLineCount}`,
  );
}

for (const requiredManagedStateLoadTypesUsage of [
  'import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types"; import type { WorkspaceShellLoadRole } from "./workspace-shell-conversation-state-load.types"; export type LoadWorkspaceShellManagedStateInput = { activeToken: string; role: WorkspaceShellLoadRole; setLatestSharePath: UseWorkspaceShellEffectsProps["setLatestSharePath"]; setMediaDeadLetterOverview: UseWorkspaceShellEffectsProps["setMediaDeadLetterOverview"]; setShareLinks: UseWorkspaceShellEffectsProps["setShareLinks"]; workspaceId: string };',
]) {
  if (!managedStateLoadTypesSource.includes(requiredManagedStateLoadTypesUsage)) {
    throw new Error(
      `workspace-shell-managed-state-load.types.ts must own managed-load typing: ${requiredManagedStateLoadTypesUsage}`,
    );
  }
}

const maxManagedStateLoadTypesLines = 2;
if (managedStateLoadTypesLineCount > maxManagedStateLoadTypesLines) {
  throw new Error(
    `workspace-shell-managed-state-load.types.ts exceeded ${maxManagedStateLoadTypesLines} lines: ${managedStateLoadTypesLineCount}`,
  );
}

for (const requiredInitialFollowUpImport of [
  'from "../lib/workspace-shell-refresh";',
  'import type { LoadWorkspaceShellInitialFollowUpInput } from "./workspace-shell-initial-follow-up.types";',
  'from "./workspace-shell-managed-state-load";',
]) {
  if (!initialFollowUpSource.includes(requiredInitialFollowUpImport)) {
    throw new Error(
      `workspace-shell-initial-follow-up.ts must import delegated follow-up dependencies: ${requiredInitialFollowUpImport}`,
    );
  }
}

for (const requiredInitialFollowUpUsage of [
  "export async function loadWorkspaceShellInitialFollowUp({",
  "}: LoadWorkspaceShellInitialFollowUpInput) {",
  "await loadWorkspaceShellManagedState({",
]) {
  if (!initialFollowUpSource.includes(requiredInitialFollowUpUsage)) {
    throw new Error(
      `workspace-shell-initial-follow-up.ts must use the extracted follow-up input type: ${requiredInitialFollowUpUsage}`,
    );
  }
}

for (const forbiddenInitialFollowUpToken of [
  "type LoadWorkspaceShellInitialFollowUpInput = {",
]) {
  if (initialFollowUpSource.includes(forbiddenInitialFollowUpToken)) {
    throw new Error(
      `workspace-shell-initial-follow-up.ts must keep follow-up input typing delegated: ${forbiddenInitialFollowUpToken}`,
    );
  }
}

const maxInitialFollowUpLines = 35;
if (initialFollowUpLineCount > maxInitialFollowUpLines) {
  throw new Error(
    `workspace-shell-initial-follow-up.ts exceeded ${maxInitialFollowUpLines} lines: ${initialFollowUpLineCount}`,
  );
}

for (const requiredInitialFollowUpTypesUsage of [
  'import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types"; import type { WorkspaceShellLoadRole } from "./workspace-shell-conversation-state-load.types"; export type LoadWorkspaceShellInitialFollowUpInput = { activeToken: string; role: WorkspaceShellLoadRole; setAuditLogs: UseWorkspaceShellEffectsProps["setAuditLogs"]; setLatestSharePath: UseWorkspaceShellEffectsProps["setLatestSharePath"]; setMediaDeadLetterOverview: UseWorkspaceShellEffectsProps["setMediaDeadLetterOverview"]; setSearchPresets: UseWorkspaceShellEffectsProps["setSearchPresets"]; setShareLinks: UseWorkspaceShellEffectsProps["setShareLinks"]; workspaceId: string };',
]) {
  if (!initialFollowUpTypesSource.includes(requiredInitialFollowUpTypesUsage)) {
    throw new Error(
      `workspace-shell-initial-follow-up.types.ts must own follow-up input typing: ${requiredInitialFollowUpTypesUsage}`,
    );
  }
}

const maxInitialFollowUpTypesLines = 2;
if (initialFollowUpTypesLineCount > maxInitialFollowUpTypesLines) {
  throw new Error(
    `workspace-shell-initial-follow-up.types.ts exceeded ${maxInitialFollowUpTypesLines} lines: ${initialFollowUpTypesLineCount}`,
  );
}

for (const requiredInitialBootstrapImport of [
  'from "../lib/api";',
  'from "../lib/workspace-shell-refresh";',
  'from "./workspace-shell-conversation-state-load";',
  'import type { LoadWorkspaceShellInitialBootstrapInput } from "./workspace-shell-initial-bootstrap.types";',
  'import type { WorkspaceShellLoadRole } from "./workspace-shell-conversation-state-load.types";',
]) {
  if (!initialBootstrapSource.includes(requiredInitialBootstrapImport)) {
    throw new Error(
      `workspace-shell-initial-bootstrap.ts must import delegated bootstrap dependencies: ${requiredInitialBootstrapImport}`,
    );
  }
}

for (const requiredInitialBootstrapUsage of [
  "export async function loadWorkspaceShellInitialBootstrap({",
  "}: LoadWorkspaceShellInitialBootstrapInput) {",
  "role: workspaceResult.workspace.role as WorkspaceShellLoadRole",
]) {
  if (!initialBootstrapSource.includes(requiredInitialBootstrapUsage)) {
    throw new Error(
      `workspace-shell-initial-bootstrap.ts must use the extracted bootstrap input and shared role typing: ${requiredInitialBootstrapUsage}`,
    );
  }
}

for (const forbiddenInitialBootstrapToken of [
  'type WorkspaceRole = "owner" | "editor" | "viewer";',
  "type LoadWorkspaceShellInitialBootstrapInput = {",
]) {
  if (initialBootstrapSource.includes(forbiddenInitialBootstrapToken)) {
    throw new Error(
      `workspace-shell-initial-bootstrap.ts must keep shared role and bootstrap input typing delegated: ${forbiddenInitialBootstrapToken}`,
    );
  }
}

const maxInitialBootstrapLines = 65;
if (initialBootstrapLineCount > maxInitialBootstrapLines) {
  throw new Error(
    `workspace-shell-initial-bootstrap.ts exceeded ${maxInitialBootstrapLines} lines: ${initialBootstrapLineCount}`,
  );
}

for (const requiredInitialBootstrapTypesUsage of [
  'import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types"; export type LoadWorkspaceShellInitialBootstrapInput = { activeToken: string; setActiveConversationId: UseWorkspaceShellEffectsProps["setActiveConversationId"]; setConversations: UseWorkspaceShellEffectsProps["setConversations"]; setKnowledgeStats: UseWorkspaceShellEffectsProps["setKnowledgeStats"]; setMediaProcessingOverview: UseWorkspaceShellEffectsProps["setMediaProcessingOverview"]; setMediaStorageSummary: UseWorkspaceShellEffectsProps["setMediaStorageSummary"]; setMessages: UseWorkspaceShellEffectsProps["setMessages"]; setNotifications: UseWorkspaceShellEffectsProps["setNotifications"]; setRecords: UseWorkspaceShellEffectsProps["setRecords"]; setSelectedRecordId: UseWorkspaceShellEffectsProps["setSelectedRecordId"]; setTimelineDays: UseWorkspaceShellEffectsProps["setTimelineDays"]; setVisibleRecords: UseWorkspaceShellEffectsProps["setVisibleRecords"]; setWorkspace: UseWorkspaceShellEffectsProps["setWorkspace"]; workspaceId: string };',
]) {
  if (!initialBootstrapTypesSource.includes(requiredInitialBootstrapTypesUsage)) {
    throw new Error(
      `workspace-shell-initial-bootstrap.types.ts must own bootstrap input typing: ${requiredInitialBootstrapTypesUsage}`,
    );
  }
}

const maxInitialBootstrapTypesLines = 2;
if (initialBootstrapTypesLineCount > maxInitialBootstrapTypesLines) {
  throw new Error(
    `workspace-shell-initial-bootstrap.types.ts exceeded ${maxInitialBootstrapTypesLines} lines: ${initialBootstrapTypesLineCount}`,
  );
}

for (const requiredMediaFilterImport of [
  'from "./workspace-shell-actions.types";',
  'from "./workspace-shell-media-actions";',
  'from "./workspace-shell-record-filter-actions";',
]) {
  if (!mediaFilterActionsSource.includes(requiredMediaFilterImport)) {
    throw new Error(`workspace-shell-media-filter-actions.ts must import delegated action groups: ${requiredMediaFilterImport}`);
  }
}

for (const requiredMediaFilterUsage of [
  "createWorkspaceShellMediaActions(props)",
  "createWorkspaceShellRecordFilterActions(props)",
  "...mediaActions",
  "...recordFilterActions",
]) {
  if (!mediaFilterActionsSource.includes(requiredMediaFilterUsage)) {
    throw new Error(`workspace-shell-media-filter-actions.ts must delegate action-group assembly: ${requiredMediaFilterUsage}`);
  }
}

for (const forbiddenMediaFilterToken of [
  'from "../lib/api";',
  'from "./workspace-shell-action-guards";',
  "const handleUploadMedia",
  "const handleApplyRecordFilter",
  "uploadMedia(",
  "deleteMedia(",
  "createSearchPreset(",
  "deleteSearchPreset(",
]) {
  if (mediaFilterActionsSource.includes(forbiddenMediaFilterToken)) {
    throw new Error(`workspace-shell-media-filter-actions.ts must keep media/filter internals delegated: ${forbiddenMediaFilterToken}`);
  }
}

const maxMediaFilterActionsLines = 25;
if (mediaFilterActionsLineCount > maxMediaFilterActionsLines) {
  throw new Error(
    `workspace-shell-media-filter-actions.ts exceeded ${maxMediaFilterActionsLines} lines: ${mediaFilterActionsLineCount}`,
  );
}

for (const requiredRecordFilterActionsImport of [
  'from "./workspace-shell-actions.types";',
  'from "./workspace-shell-record-filter-apply-actions";',
  'from "./workspace-shell-search-preset-actions";',
]) {
  if (!recordFilterActionsSource.includes(requiredRecordFilterActionsImport)) {
    throw new Error(
      `workspace-shell-record-filter-actions.ts must import delegated filter and preset action groups: ${requiredRecordFilterActionsImport}`,
    );
  }
}

for (const requiredRecordFilterActionsUsage of [
  "createWorkspaceShellRecordFilterApplyActions(props)",
  "createWorkspaceShellSearchPresetActions(props)",
  "...filterApplyActions",
  "...searchPresetActions",
]) {
  if (!recordFilterActionsSource.includes(requiredRecordFilterActionsUsage)) {
    throw new Error(
      `workspace-shell-record-filter-actions.ts must delegate action-group assembly: ${requiredRecordFilterActionsUsage}`,
    );
  }
}

for (const forbiddenRecordFilterActionsToken of [
  'from "../lib/api";',
  'from "./workspace-shell-action-guards";',
  'from "./workspace-shell-record-filter-actions.types";',
  "const handleResetFilter",
  "const handleCreateSearchPreset",
  "createSearchPreset(",
  "deleteSearchPreset(",
  "refreshRecords(",
]) {
  if (recordFilterActionsSource.includes(forbiddenRecordFilterActionsToken)) {
    throw new Error(
      `workspace-shell-record-filter-actions.ts must keep filter and preset internals delegated: ${forbiddenRecordFilterActionsToken}`,
    );
  }
}

const maxRecordFilterActionsLines = 20;
if (recordFilterActionsLineCount > maxRecordFilterActionsLines) {
  throw new Error(
    `workspace-shell-record-filter-actions.ts exceeded ${maxRecordFilterActionsLines} lines: ${recordFilterActionsLineCount}`,
  );
}

for (const requiredRecordFilterApplyActionsUsage of [
  'from "./workspace-shell-action-guards";',
  'from "./workspace-shell-record-filter-actions.types";',
  'import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";',
  "export function createWorkspaceShellRecordFilterApplyActions(",
  "async function handleResetFilter()",
  'async function handleApplyRecordFilter(nextFilter: UseWorkspaceShellActionsProps["recordFilter"])',
  "async function handleApplyLocationFilter(",
  "await refreshRecords(activeToken, initialRecordFilter);",
  "await refreshRecords(activeToken, nextFilter);",
]) {
  if (!recordFilterApplyActionsSource.includes(requiredRecordFilterApplyActionsUsage)) {
    throw new Error(
      `workspace-shell-record-filter-apply-actions.ts must own filter application flow: ${requiredRecordFilterApplyActionsUsage}`,
    );
  }
}

for (const forbiddenRecordFilterApplyActionsToken of [
  'from "../lib/api";',
  "createSearchPreset(",
  "deleteSearchPreset(",
  "refreshSearchPresets(",
  "refreshAuditLogs(",
]) {
  if (recordFilterApplyActionsSource.includes(forbiddenRecordFilterApplyActionsToken)) {
    throw new Error(
      `workspace-shell-record-filter-apply-actions.ts must keep preset persistence delegated: ${forbiddenRecordFilterApplyActionsToken}`,
    );
  }
}

const maxRecordFilterApplyActionsLines = 50;
if (recordFilterApplyActionsLineCount > maxRecordFilterApplyActionsLines) {
  throw new Error(
    `workspace-shell-record-filter-apply-actions.ts exceeded ${maxRecordFilterApplyActionsLines} lines: ${recordFilterApplyActionsLineCount}`,
  );
}

for (const requiredSearchPresetActionsUsage of [
  'from "../lib/api";',
  'from "./workspace-shell-action-guards";',
  'import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";',
  "export function createWorkspaceShellSearchPresetActions(",
  "async function handleCreateSearchPreset(",
  "async function handleDeleteSearchPreset(presetId: string)",
  "await createSearchPreset(activeToken, workspaceId, {",
  "await deleteSearchPreset(activeToken, workspaceId, presetId);",
  "await refreshSearchPresets(activeToken);",
  "await refreshAuditLogs(activeToken);",
]) {
  if (!searchPresetActionsSource.includes(requiredSearchPresetActionsUsage)) {
    throw new Error(
      `workspace-shell-search-preset-actions.ts must own search preset persistence flow: ${requiredSearchPresetActionsUsage}`,
    );
  }
}

for (const forbiddenSearchPresetActionsToken of [
  'from "./workspace-shell-record-filter-actions.types";',
  "handleApplyLocationFilter(",
  "handleResetFilter(",
  "refreshRecords(",
  "setFilteringRecords(",
  "setRecordFilter(",
]) {
  if (searchPresetActionsSource.includes(forbiddenSearchPresetActionsToken)) {
    throw new Error(
      `workspace-shell-search-preset-actions.ts must keep filter-application flow delegated: ${forbiddenSearchPresetActionsToken}`,
    );
  }
}

const maxSearchPresetActionsLines = 45;
if (searchPresetActionsLineCount > maxSearchPresetActionsLines) {
  throw new Error(
    `workspace-shell-search-preset-actions.ts exceeded ${maxSearchPresetActionsLines} lines: ${searchPresetActionsLineCount}`,
  );
}

for (const requiredMediaActionsImport of [
  'from "./workspace-shell-actions.types";',
  'from "./workspace-shell-media-dead-letter-actions";',
  'from "./workspace-shell-media-selected-actions";',
  'from "./workspace-shell-media-upload-actions";',
]) {
  if (!mediaActionsSource.includes(requiredMediaActionsImport)) {
    throw new Error(
      `workspace-shell-media-actions.ts must import delegated media action groups: ${requiredMediaActionsImport}`,
    );
  }
}

for (const requiredMediaActionsUsage of [
  "createWorkspaceShellMediaUploadActions(props)",
  "createWorkspaceShellMediaSelectedActions(props)",
  "createWorkspaceShellMediaDeadLetterActions(props)",
  "...mediaUploadActions",
  "...mediaSelectedActions",
  "...mediaDeadLetterActions",
]) {
  if (!mediaActionsSource.includes(requiredMediaActionsUsage)) {
    throw new Error(
      `workspace-shell-media-actions.ts must delegate media action-group assembly: ${requiredMediaActionsUsage}`,
    );
  }
}

for (const forbiddenMediaActionsToken of [
  'from "../lib/api";',
  'from "./workspace-shell-action-inputs.types";',
  'from "./workspace-shell-action-copy";',
  'from "./workspace-shell-action-guards";',
  'from "./workspace-shell-media-action-refresh";',
  "const handleUploadMedia",
  "const handleDeleteMedia",
  "const handleBulkRetryMediaDeadLetter",
  "uploadMedia(",
  "deleteMedia(",
  "retryMediaProcessing(",
  "getMediaStatus(",
  "bulkRetryMediaDeadLetter(",
  "await refreshMedia(activeToken, recordId);",
  "await refreshMediaProcessingOverview(activeToken);",
  "await refreshMediaDeadLetterOverview(activeToken);",
  "await refreshKnowledge(activeToken);",
  "await refreshAuditLogs(activeToken);",
]) {
  if (mediaActionsSource.includes(forbiddenMediaActionsToken)) {
    throw new Error(
      `workspace-shell-media-actions.ts must keep media internals delegated: ${forbiddenMediaActionsToken}`,
    );
  }
}

const maxMediaActionsLines = 20;
if (mediaActionsLineCount > maxMediaActionsLines) {
  throw new Error(
    `workspace-shell-media-actions.ts exceeded ${maxMediaActionsLines} lines: ${mediaActionsLineCount}`,
  );
}

for (const requiredMediaUploadActionsUsage of [
  'from "../lib/api";',
  'from "./workspace-shell-action-guards";',
  'from "./workspace-shell-media-action-refresh";',
  'import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";',
  "export function createWorkspaceShellMediaUploadActions(",
  "async function handleUploadMedia(recordId: string, file: File)",
  "await uploadMedia(activeToken, workspaceId, recordId, file);",
  "await refreshWorkspaceShellMediaUpload(props, activeToken, recordId);",
]) {
  if (!mediaUploadActionsSource.includes(requiredMediaUploadActionsUsage)) {
    throw new Error(
      `workspace-shell-media-upload-actions.ts must own upload flow: ${requiredMediaUploadActionsUsage}`,
    );
  }
}

for (const forbiddenMediaUploadActionsToken of [
  "deleteMedia(",
  "retryMediaProcessing(",
  "getMediaStatus(",
  "bulkRetryMediaDeadLetter(",
  "refreshWorkspaceShellMediaMutation(",
  "refreshWorkspaceShellMediaStatusViews(",
]) {
  if (mediaUploadActionsSource.includes(forbiddenMediaUploadActionsToken)) {
    throw new Error(
      `workspace-shell-media-upload-actions.ts must keep selected and dead-letter actions delegated: ${forbiddenMediaUploadActionsToken}`,
    );
  }
}

const maxMediaUploadActionsLines = 25;
if (mediaUploadActionsLineCount > maxMediaUploadActionsLines) {
  throw new Error(
    `workspace-shell-media-upload-actions.ts exceeded ${maxMediaUploadActionsLines} lines: ${mediaUploadActionsLineCount}`,
  );
}

for (const requiredMediaSelectedActionsUsage of [
  'from "../lib/api";',
  'from "./workspace-shell-action-copy";',
  'from "./workspace-shell-action-guards";',
  'from "./workspace-shell-media-action-refresh";',
  'import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";',
  "export function createWorkspaceShellMediaSelectedActions(",
  "async function handleDeleteMedia(mediaId: string)",
  "async function handleRetryMedia(mediaId: string)",
  "async function handleRefreshMediaStatus(mediaId: string)",
  "await deleteMedia(activeToken, workspaceId, mediaId);",
  "await retryMediaProcessing(activeToken, workspaceId, mediaId);",
  "await getMediaStatus(activeToken, workspaceId, mediaId);",
  "await refreshWorkspaceShellMediaMutation(props, activeToken, recordId);",
  "await refreshWorkspaceShellMediaStatusViews(props, activeToken, recordId);",
  "await refreshMediaStorageSummary(activeToken);",
]) {
  if (!mediaSelectedActionsSource.includes(requiredMediaSelectedActionsUsage)) {
    throw new Error(
      `workspace-shell-media-selected-actions.ts must own selected-media flow: ${requiredMediaSelectedActionsUsage}`,
    );
  }
}

for (const forbiddenMediaSelectedActionsToken of [
  "uploadMedia(",
  "bulkRetryMediaDeadLetter(",
  "refreshWorkspaceShellMediaUpload(",
]) {
  if (mediaSelectedActionsSource.includes(forbiddenMediaSelectedActionsToken)) {
    throw new Error(
      `workspace-shell-media-selected-actions.ts must keep upload and dead-letter actions delegated: ${forbiddenMediaSelectedActionsToken}`,
    );
  }
}

const maxMediaSelectedActionsLines = 50;
if (mediaSelectedActionsLineCount > maxMediaSelectedActionsLines) {
  throw new Error(
    `workspace-shell-media-selected-actions.ts exceeded ${maxMediaSelectedActionsLines} lines: ${mediaSelectedActionsLineCount}`,
  );
}

for (const requiredMediaDeadLetterActionsUsage of [
  'from "../lib/api";',
  'from "./workspace-shell-action-inputs.types";',
  'from "./workspace-shell-action-guards";',
  'from "./workspace-shell-media-action-refresh";',
  'import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";',
  "export function createWorkspaceShellMediaDeadLetterActions(",
  "async function handleBulkRetryMediaDeadLetter(input: WorkspaceShellBulkRetryInput)",
  "await bulkRetryMediaDeadLetter(activeToken, workspaceId, input);",
  "await refreshWorkspaceShellMediaMutation(props, activeToken, selectedRecordId);",
]) {
  if (!mediaDeadLetterActionsSource.includes(requiredMediaDeadLetterActionsUsage)) {
    throw new Error(
      `workspace-shell-media-dead-letter-actions.ts must own dead-letter recovery flow: ${requiredMediaDeadLetterActionsUsage}`,
    );
  }
}

for (const forbiddenMediaDeadLetterActionsToken of [
  "uploadMedia(",
  "deleteMedia(",
  "retryMediaProcessing(",
  "getMediaStatus(",
  "refreshWorkspaceShellMediaUpload(",
  "refreshWorkspaceShellMediaStatusViews(",
]) {
  if (mediaDeadLetterActionsSource.includes(forbiddenMediaDeadLetterActionsToken)) {
    throw new Error(
      `workspace-shell-media-dead-letter-actions.ts must keep upload and selected-media actions delegated: ${forbiddenMediaDeadLetterActionsToken}`,
    );
  }
}

const maxMediaDeadLetterActionsLines = 25;
if (mediaDeadLetterActionsLineCount > maxMediaDeadLetterActionsLines) {
  throw new Error(
    `workspace-shell-media-dead-letter-actions.ts exceeded ${maxMediaDeadLetterActionsLines} lines: ${mediaDeadLetterActionsLineCount}`,
  );
}

for (const requiredMediaActionRefreshUsage of [
  'import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";',
  "export async function refreshWorkspaceShellMediaUpload(",
  "export async function refreshWorkspaceShellMediaMutation(",
  "export async function refreshWorkspaceShellMediaStatusViews(",
  "await refreshers.refreshMedia(activeToken, recordId);",
  "await refreshers.refreshMediaStorageSummary(activeToken);",
  "await refreshers.refreshMediaProcessingOverview(activeToken);",
  "await refreshers.refreshMediaDeadLetterOverview(activeToken);",
  "await refreshers.refreshKnowledge(activeToken);",
  "await refreshers.refreshAuditLogs(activeToken);",
]) {
  if (!mediaActionRefreshSource.includes(requiredMediaActionRefreshUsage)) {
    throw new Error(
      `workspace-shell-media-action-refresh.ts must own media refresh sequences: ${requiredMediaActionRefreshUsage}`,
    );
  }
}

for (const forbiddenMediaActionRefreshToken of [
  'from "../lib/api";',
  'from "./workspace-shell-action-guards";',
  "uploadMedia(",
  "deleteMedia(",
  "retryMediaProcessing(",
  "getMediaStatus(",
  "bulkRetryMediaDeadLetter(",
]) {
  if (mediaActionRefreshSource.includes(forbiddenMediaActionRefreshToken)) {
    throw new Error(
      `workspace-shell-media-action-refresh.ts must keep API calls delegated to media actions: ${forbiddenMediaActionRefreshToken}`,
    );
  }
}

const maxMediaActionRefreshLines = 55;
if (mediaActionRefreshLineCount > maxMediaActionRefreshLines) {
  throw new Error(
    `workspace-shell-media-action-refresh.ts exceeded ${maxMediaActionRefreshLines} lines: ${mediaActionRefreshLineCount}`,
  );
}

for (const requiredChatRecordImport of [
  'from "./workspace-shell-actions.types";',
  'from "./workspace-shell-chat-actions";',
  'from "./workspace-shell-record-actions";',
]) {
  if (!chatRecordActionsSource.includes(requiredChatRecordImport)) {
    throw new Error(`workspace-shell-chat-record-actions.ts must import delegated action groups: ${requiredChatRecordImport}`);
  }
}

for (const requiredChatRecordUsage of [
  "createWorkspaceShellChatActions(props)",
  "createWorkspaceShellRecordActions(props)",
  "...chatActions",
  "...recordActions",
]) {
  if (!chatRecordActionsSource.includes(requiredChatRecordUsage)) {
    throw new Error(`workspace-shell-chat-record-actions.ts must delegate action-group assembly: ${requiredChatRecordUsage}`);
  }
}

for (const forbiddenChatRecordToken of [
  'from "../lib/api";',
  'from "../lib/timeline";',
  'from "./workspace-shell-action-guards";',
  "const handleSendMessage",
  "const handleSaveRecord",
  "sendMessage(",
  "createConversation(",
  "createRecord(",
  "updateRecord(",
  "deleteRecord(",
]) {
  if (chatRecordActionsSource.includes(forbiddenChatRecordToken)) {
    throw new Error(`workspace-shell-chat-record-actions.ts must keep chat/record internals delegated: ${forbiddenChatRecordToken}`);
  }
}

const maxChatRecordActionsLines = 20;
if (chatRecordActionsLineCount > maxChatRecordActionsLines) {
  throw new Error(
    `workspace-shell-chat-record-actions.ts exceeded ${maxChatRecordActionsLines} lines: ${chatRecordActionsLineCount}`,
  );
}

const workspaceShellChatActionsSource = fs.readFileSync(
  path.resolve(process.cwd(), "components/workspace-shell-chat-actions.ts"),
  "utf8",
);
for (const requiredWorkspaceShellChatActionsImport of [
  'from "./workspace-shell-actions.types";',
  'from "./workspace-shell-chat-conversation-actions";',
  'from "./workspace-shell-chat-send-actions";',
]) {
  if (!workspaceShellChatActionsSource.includes(requiredWorkspaceShellChatActionsImport)) {
    throw new Error(
      `workspace-shell-chat-actions.ts must import delegated chat action groups: ${requiredWorkspaceShellChatActionsImport}`,
    );
  }
}

for (const requiredChatActionsPath of [
  "createWorkspaceShellChatSendActions(props)",
  "createWorkspaceShellChatConversationActions(props)",
  "...chatSendActions",
  "...chatConversationActions",
]) {
  if (!workspaceShellChatActionsSource.includes(requiredChatActionsPath)) {
    throw new Error(
      `workspace-shell-chat-actions.ts must delegate chat action-group assembly: ${requiredChatActionsPath}`,
    );
  }
}
for (const forbiddenChatActionsToken of [
  'from "../lib/api";',
  'from "./workspace-shell-action-guards";',
  'from "./workspace-shell-chat-action-conversations";',
  'from "./workspace-shell-chat-action-selection";',
  'from "./workspace-shell-chat-action-results";',
  'from "./workspace-shell-record-action-refresh";',
  "const handleSendMessage",
  "const handleCreateConversation",
  "sendMessage(",
  "createConversation(",
  "refreshWorkspaceShellRecordMutation(",
  "selectWorkspaceShellChatCreatedRecord(",
  "applyWorkspaceShellChatSearchResult(",
  "buildWorkspaceShellConversationTitle(",
  "applyWorkspaceShellConversationCreation(",
  "selectWorkspaceShellConversation(",
  "await refreshRecords(activeToken, recordFilter);",
  "await refreshKnowledge(activeToken);",
  "await refreshAuditLogs(activeToken);",
  "setVisibleRecords(result.records)",
  "setTimelineDays(buildTimelineDays(result.records))",
  "setSelectedRecordId(result.records[0]?.id ?? null)",
  "getStoredChatPanelDisplayCopy()",
  "setConversations((prev) => [result.conversation, ...prev])",
  "setActiveConversationId(result.conversation.id)",
  "setMessages([])",
  "void loadConversationMessages(token, conversationId)",
]) {
  if (workspaceShellChatActionsSource.includes(forbiddenChatActionsToken)) {
    throw new Error(
      `workspace-shell-chat-actions.ts must keep chat internals delegated: ${forbiddenChatActionsToken}`,
    );
  }
}

const maxChatActionsLines = 20;
if (workspaceShellChatActionsSource.split(/\r?\n/).length > maxChatActionsLines) {
  throw new Error(
    `workspace-shell-chat-actions.ts exceeded ${maxChatActionsLines} lines: ${workspaceShellChatActionsSource.split(/\r?\n/).length}`,
  );
}

for (const requiredChatSendActionsUsage of [
  'from "../lib/api";',
  'from "./workspace-shell-action-guards";',
  'from "./workspace-shell-chat-action-results";',
  'from "./workspace-shell-record-action-refresh";',
  'import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";',
  "export function createWorkspaceShellChatSendActions(",
  "async function handleSendMessage(message: string)",
  "await sendMessage(activeToken, workspaceId, conversationId, message);",
  'const mode = String(result.assistant_message.metadata_json.mode ?? "");',
  'if (mode === "create") {',
  "await refreshWorkspaceShellRecordMutation(",
  "selectWorkspaceShellChatCreatedRecord(setSelectedRecordId, result.records);",
  "applyWorkspaceShellChatSearchResult(",
]) {
  if (!chatSendActionsSource.includes(requiredChatSendActionsUsage)) {
    throw new Error(
      `workspace-shell-chat-send-actions.ts must own send-message flow: ${requiredChatSendActionsUsage}`,
    );
  }
}

for (const forbiddenChatSendActionsToken of [
  "createConversation(",
  "buildWorkspaceShellConversationTitle(",
  "applyWorkspaceShellConversationCreation(",
  "selectWorkspaceShellConversation(",
]) {
  if (chatSendActionsSource.includes(forbiddenChatSendActionsToken)) {
    throw new Error(
      `workspace-shell-chat-send-actions.ts must keep conversation lifecycle delegated: ${forbiddenChatSendActionsToken}`,
    );
  }
}

const maxChatSendActionsLines = 55;
if (chatSendActionsLineCount > maxChatSendActionsLines) {
  throw new Error(
    `workspace-shell-chat-send-actions.ts exceeded ${maxChatSendActionsLines} lines: ${chatSendActionsLineCount}`,
  );
}

for (const requiredChatConversationActionsUsage of [
  'from "../lib/api";',
  'from "./workspace-shell-action-guards";',
  'from "./workspace-shell-chat-action-conversations";',
  'from "./workspace-shell-chat-action-selection";',
  'import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";',
  "export function createWorkspaceShellChatConversationActions(",
  "async function handleCreateConversation()",
  "function handleSelectConversation(conversationId: string)",
  "await createConversation(",
  "buildWorkspaceShellConversationTitle(conversationsCount)",
  "applyWorkspaceShellConversationCreation(",
  "selectWorkspaceShellConversation(",
]) {
  if (!chatConversationActionsSource.includes(requiredChatConversationActionsUsage)) {
    throw new Error(
      `workspace-shell-chat-conversation-actions.ts must own conversation lifecycle flow: ${requiredChatConversationActionsUsage}`,
    );
  }
}

for (const forbiddenChatConversationActionsToken of [
  "sendMessage(",
  "refreshWorkspaceShellRecordMutation(",
  "selectWorkspaceShellChatCreatedRecord(",
  "applyWorkspaceShellChatSearchResult(",
]) {
  if (chatConversationActionsSource.includes(forbiddenChatConversationActionsToken)) {
    throw new Error(
      `workspace-shell-chat-conversation-actions.ts must keep send-message flow delegated: ${forbiddenChatConversationActionsToken}`,
    );
  }
}

const maxChatConversationActionsLines = 40;
if (chatConversationActionsLineCount > maxChatConversationActionsLines) {
  throw new Error(
    `workspace-shell-chat-conversation-actions.ts exceeded ${maxChatConversationActionsLines} lines: ${chatConversationActionsLineCount}`,
  );
}

const workspaceShellRecordActionsSource = fs.readFileSync(
  path.resolve(process.cwd(), "components/workspace-shell-record-actions.ts"),
  "utf8",
);
for (const requiredRecordActionsImport of [
  'from "./workspace-shell-actions.types";',
  'from "./workspace-shell-record-delete-actions";',
  'from "./workspace-shell-record-save-actions";',
]) {
  if (!workspaceShellRecordActionsSource.includes(requiredRecordActionsImport)) {
    throw new Error(
      `workspace-shell-record-actions.ts must import delegated record action groups: ${requiredRecordActionsImport}`,
    );
  }
}

for (const requiredRecordActionsUsage of [
  "createWorkspaceShellRecordSaveActions(props)",
  "createWorkspaceShellRecordDeleteActions(props)",
  "...recordSaveActions",
  "...recordDeleteActions",
]) {
  if (!workspaceShellRecordActionsSource.includes(requiredRecordActionsUsage)) {
    throw new Error(
      `workspace-shell-record-actions.ts must delegate record action-group assembly: ${requiredRecordActionsUsage}`,
    );
  }
}

for (const forbiddenRecordActionsToken of [
  'from "../lib/api";',
  'from "./workspace-shell-action-inputs.types";',
  'from "./workspace-shell-action-guards";',
  'from "./workspace-shell-record-action-payloads";',
  'from "./workspace-shell-record-action-refresh";',
  "const handleSaveRecord",
  "const handleDeleteRecord",
  "createRecord(",
  "updateRecord(",
  "deleteRecord(",
  "refreshWorkspaceShellRecordMutation(",
  "refreshWorkspaceShellRecordDeletion(",
  "title: input.title,",
  "content: input.content,",
  "type_code: input.type_code,",
  'source_type: "manual",',
]) {
  if (workspaceShellRecordActionsSource.includes(forbiddenRecordActionsToken)) {
    throw new Error(
      `workspace-shell-record-actions.ts must keep record internals delegated: ${forbiddenRecordActionsToken}`,
    );
  }
}

const maxRecordActionsLines = 20;
if (workspaceShellRecordActionsSource.split(/\r?\n/).length > maxRecordActionsLines) {
  throw new Error(
    `workspace-shell-record-actions.ts exceeded ${maxRecordActionsLines} lines: ${workspaceShellRecordActionsSource.split(/\r?\n/).length}`,
  );
}

for (const requiredRecordSaveActionsUsage of [
  'from "../lib/api";',
  'from "./workspace-shell-action-inputs.types";',
  'from "./workspace-shell-action-guards";',
  'from "./workspace-shell-record-action-payloads";',
  'from "./workspace-shell-record-action-refresh";',
  'import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";',
  "export function createWorkspaceShellRecordSaveActions(",
  "async function handleSaveRecord(input: WorkspaceShellSaveRecordInput)",
  "await updateRecord(",
  "await createRecord(",
  "buildWorkspaceShellRecordUpdatePayload(input)",
  "buildWorkspaceShellRecordCreatePayload(input)",
  "await refreshWorkspaceShellRecordMutation(",
  "setSelectedRecordId(input.recordId);",
  "setSelectedRecordId(result.record.id);",
]) {
  if (!recordSaveActionsSource.includes(requiredRecordSaveActionsUsage)) {
    throw new Error(
      `workspace-shell-record-save-actions.ts must own record save flow: ${requiredRecordSaveActionsUsage}`,
    );
  }
}

for (const forbiddenRecordSaveActionsToken of [
  "deleteRecord(",
  "refreshWorkspaceShellRecordDeletion(",
  "refreshMediaStorageSummary(",
  "refreshMediaProcessingOverview(",
  "refreshMediaDeadLetterOverview(",
]) {
  if (recordSaveActionsSource.includes(forbiddenRecordSaveActionsToken)) {
    throw new Error(
      `workspace-shell-record-save-actions.ts must keep deletion flow delegated: ${forbiddenRecordSaveActionsToken}`,
    );
  }
}

const maxRecordSaveActionsLines = 55;
if (recordSaveActionsLineCount > maxRecordSaveActionsLines) {
  throw new Error(
    `workspace-shell-record-save-actions.ts exceeded ${maxRecordSaveActionsLines} lines: ${recordSaveActionsLineCount}`,
  );
}

for (const requiredRecordDeleteActionsUsage of [
  'from "../lib/api";',
  'from "./workspace-shell-action-guards";',
  'from "./workspace-shell-record-action-refresh";',
  'import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";',
  "export function createWorkspaceShellRecordDeleteActions(",
  "async function handleDeleteRecord(recordId: string)",
  "await deleteRecord(activeToken, workspaceId, recordId);",
  "const nextRecords = records.filter((record) => record.id !== recordId);",
  "setSelectedRecordId(nextRecords[0]?.id ?? null);",
  "await refreshWorkspaceShellRecordDeletion(",
]) {
  if (!recordDeleteActionsSource.includes(requiredRecordDeleteActionsUsage)) {
    throw new Error(
      `workspace-shell-record-delete-actions.ts must own record deletion flow: ${requiredRecordDeleteActionsUsage}`,
    );
  }
}

for (const forbiddenRecordDeleteActionsToken of [
  "createRecord(",
  "updateRecord(",
  "buildWorkspaceShellRecordUpdatePayload(",
  "buildWorkspaceShellRecordCreatePayload(",
  "refreshWorkspaceShellRecordMutation(",
]) {
  if (recordDeleteActionsSource.includes(forbiddenRecordDeleteActionsToken)) {
    throw new Error(
      `workspace-shell-record-delete-actions.ts must keep save flow delegated: ${forbiddenRecordDeleteActionsToken}`,
    );
  }
}

const maxRecordDeleteActionsLines = 45;
if (recordDeleteActionsLineCount > maxRecordDeleteActionsLines) {
  throw new Error(
    `workspace-shell-record-delete-actions.ts exceeded ${maxRecordDeleteActionsLines} lines: ${recordDeleteActionsLineCount}`,
  );
}

for (const requiredRecordActionRefreshUsage of [
  'import type { RecordFilterState } from "../lib/types";',
  'import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";',
  "export async function refreshWorkspaceShellRecordMutation(",
  "export async function refreshWorkspaceShellRecordDeletion(",
  "await refreshers.refreshRecords(activeToken, recordFilter);",
  "await refreshers.refreshKnowledge(activeToken);",
  "await refreshers.refreshAuditLogs(activeToken);",
  "await refreshers.refreshMediaStorageSummary(activeToken);",
  "await refreshers.refreshMediaProcessingOverview(activeToken);",
  "await refreshers.refreshMediaDeadLetterOverview(activeToken);",
]) {
  if (!recordActionRefreshSource.includes(requiredRecordActionRefreshUsage)) {
    throw new Error(
      `workspace-shell-record-action-refresh.ts must own shared record refresh sequences: ${requiredRecordActionRefreshUsage}`,
    );
  }
}

for (const forbiddenRecordActionRefreshToken of [
  'from "../lib/api";',
  'from "./workspace-shell-action-guards";',
  "createRecord(",
  "updateRecord(",
  "deleteRecord(",
  "createConversation(",
  "sendMessage(",
]) {
  if (recordActionRefreshSource.includes(forbiddenRecordActionRefreshToken)) {
    throw new Error(
      `workspace-shell-record-action-refresh.ts must keep API calls delegated: ${forbiddenRecordActionRefreshToken}`,
    );
  }
}

const maxRecordActionRefreshLines = 40;
if (recordActionRefreshLineCount > maxRecordActionRefreshLines) {
  throw new Error(
    `workspace-shell-record-action-refresh.ts exceeded ${maxRecordActionRefreshLines} lines: ${recordActionRefreshLineCount}`,
  );
}

for (const requiredChatActionResultsUsage of [
  'import { buildTimelineDays } from "../lib/timeline";',
  'import type { RecordItem } from "../lib/types";',
  'import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";',
  "export function applyWorkspaceShellChatSearchResult(",
  "export function selectWorkspaceShellChatCreatedRecord(",
  "setters.setVisibleRecords(records);",
  "setters.setTimelineDays(buildTimelineDays(records));",
  "setters.setSelectedRecordId(records[0]?.id ?? null);",
  "setSelectedRecordId(records[0].id);",
]) {
  if (!chatActionResultsSource.includes(requiredChatActionResultsUsage)) {
    throw new Error(
      `workspace-shell-chat-action-results.ts must own chat result projection helpers: ${requiredChatActionResultsUsage}`,
    );
  }
}

for (const forbiddenChatActionResultsToken of [
  'from "../lib/api";',
  'from "./workspace-shell-action-guards";',
  "sendMessage(",
  "createConversation(",
  "refreshWorkspaceShellRecordMutation(",
]) {
  if (chatActionResultsSource.includes(forbiddenChatActionResultsToken)) {
    throw new Error(
      `workspace-shell-chat-action-results.ts must keep API and refresh orchestration delegated: ${forbiddenChatActionResultsToken}`,
    );
  }
}

const maxChatActionResultsLines = 30;
if (chatActionResultsLineCount > maxChatActionResultsLines) {
  throw new Error(
    `workspace-shell-chat-action-results.ts exceeded ${maxChatActionResultsLines} lines: ${chatActionResultsLineCount}`,
  );
}

for (const requiredChatActionConversationsUsage of [
  'import type { Conversation } from "../lib/types";',
  'import { getStoredChatPanelDisplayCopy } from "./chat-panel-display-copy";',
  'import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";',
  "export function buildWorkspaceShellConversationTitle(",
  "export function applyWorkspaceShellConversationCreation(",
  "getStoredChatPanelDisplayCopy().buildConversationTitle(conversationsCount + 1)",
  "setters.setConversations((prev) => [conversation, ...prev]);",
  "setters.setActiveConversationId(conversation.id);",
  "setters.setMessages([]);",
]) {
  if (!chatActionConversationsSource.includes(requiredChatActionConversationsUsage)) {
    throw new Error(
      `workspace-shell-chat-action-conversations.ts must own conversation title and creation projection helpers: ${requiredChatActionConversationsUsage}`,
    );
  }
}

for (const forbiddenChatActionConversationsToken of [
  'from "../lib/api";',
  'from "./workspace-shell-action-guards";',
  "createConversation(",
  "sendMessage(",
  "refreshWorkspaceShellRecordMutation(",
]) {
  if (chatActionConversationsSource.includes(forbiddenChatActionConversationsToken)) {
    throw new Error(
      `workspace-shell-chat-action-conversations.ts must keep API and refresh orchestration delegated: ${forbiddenChatActionConversationsToken}`,
    );
  }
}

const maxChatActionConversationsLines = 24;
if (chatActionConversationsLineCount > maxChatActionConversationsLines) {
  throw new Error(
    `workspace-shell-chat-action-conversations.ts exceeded ${maxChatActionConversationsLines} lines: ${chatActionConversationsLineCount}`,
  );
}

for (const requiredChatActionSelectionUsage of [
  'import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";',
  "export function selectWorkspaceShellConversation(",
  "if (!token) {",
  "helpers.setActiveConversationId(conversationId);",
  "void helpers.loadConversationMessages(token, conversationId);",
]) {
  if (!chatActionSelectionSource.includes(requiredChatActionSelectionUsage)) {
    throw new Error(
      `workspace-shell-chat-action-selection.ts must own conversation selection helpers: ${requiredChatActionSelectionUsage}`,
    );
  }
}

for (const forbiddenChatActionSelectionToken of [
  'from "../lib/api";',
  'from "./workspace-shell-action-guards";',
  "createConversation(",
  "sendMessage(",
  "refreshWorkspaceShellRecordMutation(",
]) {
  if (chatActionSelectionSource.includes(forbiddenChatActionSelectionToken)) {
    throw new Error(
      `workspace-shell-chat-action-selection.ts must keep API and refresh orchestration delegated: ${forbiddenChatActionSelectionToken}`,
    );
  }
}

const maxChatActionSelectionLines = 20;
if (chatActionSelectionLineCount > maxChatActionSelectionLines) {
  throw new Error(
    `workspace-shell-chat-action-selection.ts exceeded ${maxChatActionSelectionLines} lines: ${chatActionSelectionLineCount}`,
  );
}

for (const requiredRecordActionPayloadUsage of [
  'import type { WorkspaceShellSaveRecordInput } from "./workspace-shell-action-inputs.types";',
  "export function buildWorkspaceShellRecordUpdatePayload(",
  "export function buildWorkspaceShellRecordCreatePayload(",
  "rating: input.rating ?? null,",
  "rating: input.rating ?? undefined,",
  'source_type: "manual",',
  "type_code: input.type_code,",
]) {
  if (!recordActionPayloadsSource.includes(requiredRecordActionPayloadUsage)) {
    throw new Error(
      `workspace-shell-record-action-payloads.ts must own record request payload shaping: ${requiredRecordActionPayloadUsage}`,
    );
  }
}

for (const forbiddenRecordActionPayloadToken of [
  'from "../lib/api";',
  'from "./workspace-shell-action-guards";',
  "createRecord(",
  "updateRecord(",
  "deleteRecord(",
  "refreshWorkspaceShellRecordMutation(",
]) {
  if (recordActionPayloadsSource.includes(forbiddenRecordActionPayloadToken)) {
    throw new Error(
      `workspace-shell-record-action-payloads.ts must keep API and refresh orchestration delegated: ${forbiddenRecordActionPayloadToken}`,
    );
  }
}

const maxRecordActionPayloadsLines = 35;
if (recordActionPayloadsLineCount > maxRecordActionPayloadsLines) {
  throw new Error(
    `workspace-shell-record-action-payloads.ts exceeded ${maxRecordActionPayloadsLines} lines: ${recordActionPayloadsLineCount}`,
  );
}

for (const requiredReminderNotificationActionsImport of [
  'from "./workspace-shell-actions.types";',
  'from "./workspace-shell-notification-actions";',
  'from "./workspace-shell-reminder-actions";',
]) {
  if (!reminderNotificationActionsSource.includes(requiredReminderNotificationActionsImport)) {
    throw new Error(
      `workspace-shell-reminder-notification-actions.ts must import delegated reminder and notification action groups: ${requiredReminderNotificationActionsImport}`,
    );
  }
}

for (const requiredReminderNotificationActionsUsage of [
  "createWorkspaceShellReminderActions(props)",
  "createWorkspaceShellNotificationActions(props)",
  "...reminderActions",
  "...notificationActions",
]) {
  if (!reminderNotificationActionsSource.includes(requiredReminderNotificationActionsUsage)) {
    throw new Error(
      `workspace-shell-reminder-notification-actions.ts must delegate action-group assembly: ${requiredReminderNotificationActionsUsage}`,
    );
  }
}

for (const forbiddenReminderNotificationActionsToken of [
  'from "../lib/api";',
  'from "./workspace-shell-action-inputs.types";',
  'from "./workspace-shell-action-guards";',
  "const handleCreateReminder",
  "const handleSyncNotifications",
  "createReminder(",
  "deleteReminder(",
  "updateReminder(",
  "updateNotification(",
]) {
  if (reminderNotificationActionsSource.includes(forbiddenReminderNotificationActionsToken)) {
    throw new Error(
      `workspace-shell-reminder-notification-actions.ts must keep reminder/notification internals delegated: ${forbiddenReminderNotificationActionsToken}`,
    );
  }
}

const maxReminderNotificationActionsLines = 20;
if (reminderNotificationActionsLineCount > maxReminderNotificationActionsLines) {
  throw new Error(
    `workspace-shell-reminder-notification-actions.ts exceeded ${maxReminderNotificationActionsLines} lines: ${reminderNotificationActionsLineCount}`,
  );
}

for (const requiredReminderActionsUsage of [
  'from "../lib/api";',
  'from "./workspace-shell-action-inputs.types";',
  'from "./workspace-shell-action-guards";',
  'import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";',
  "export function createWorkspaceShellReminderActions(",
  "async function handleCreateReminder(input: WorkspaceShellReminderCreateInput)",
  "async function handleUpdateReminder(",
  "async function handleDeleteReminder(reminderId: string)",
  "await createReminder(activeToken, workspaceId, input.recordId, {",
  "await refreshReminders(activeToken, input.recordId);",
  "await refreshReminders(activeToken, selectedRecordId);",
]) {
  if (!reminderActionsSource.includes(requiredReminderActionsUsage)) {
    throw new Error(
      `workspace-shell-reminder-actions.ts must own reminder mutation flow: ${requiredReminderActionsUsage}`,
    );
  }
}

for (const forbiddenReminderActionsToken of [
  "syncDueNotifications(",
  "updateNotification(",
  "refreshNotifications(",
]) {
  if (reminderActionsSource.includes(forbiddenReminderActionsToken)) {
    throw new Error(
      `workspace-shell-reminder-actions.ts must keep notification actions delegated: ${forbiddenReminderActionsToken}`,
    );
  }
}

const maxReminderActionsLines = 55;
if (reminderActionsLineCount > maxReminderActionsLines) {
  throw new Error(
    `workspace-shell-reminder-actions.ts exceeded ${maxReminderActionsLines} lines: ${reminderActionsLineCount}`,
  );
}

for (const requiredNotificationActionsUsage of [
  'from "../lib/api";',
  'from "./workspace-shell-action-guards";',
  'import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";',
  "export function createWorkspaceShellNotificationActions(",
  "async function handleSyncNotifications()",
  "async function handleMarkNotificationRead(notificationId: string)",
  "await syncDueNotifications(activeToken);",
  "await updateNotification(activeToken, workspaceId, notificationId, { is_read: true });",
  "await refreshNotifications(activeToken);",
]) {
  if (!notificationActionsSource.includes(requiredNotificationActionsUsage)) {
    throw new Error(
      `workspace-shell-notification-actions.ts must own notification mutation flow: ${requiredNotificationActionsUsage}`,
    );
  }
}

for (const forbiddenNotificationActionsToken of [
  "createReminder(",
  "updateReminder(",
  "deleteReminder(",
  "refreshReminders(",
]) {
  if (notificationActionsSource.includes(forbiddenNotificationActionsToken)) {
    throw new Error(
      `workspace-shell-notification-actions.ts must keep reminder actions delegated: ${forbiddenNotificationActionsToken}`,
    );
  }
}

const maxNotificationActionsLines = 30;
if (notificationActionsLineCount > maxNotificationActionsLines) {
  throw new Error(
    `workspace-shell-notification-actions.ts exceeded ${maxNotificationActionsLines} lines: ${notificationActionsLineCount}`,
  );
}

for (const requiredAdminImport of [
  'from "./workspace-shell-actions.types";',
  'from "./workspace-shell-knowledge-provider-actions";',
  'from "./workspace-shell-reminder-notification-actions";',
  'from "./workspace-shell-share-actions";',
]) {
  if (!adminActionsSource.includes(requiredAdminImport)) {
    throw new Error(`workspace-shell-admin-actions.ts must import delegated action groups: ${requiredAdminImport}`);
  }
}

for (const requiredAdminUsage of [
  "createWorkspaceShellReminderNotificationActions(props)",
  "createWorkspaceShellKnowledgeProviderActions(props)",
  "createWorkspaceShellShareActions(props)",
  "...reminderNotificationActions",
  "...knowledgeProviderActions",
  "...shareActions",
]) {
  if (!adminActionsSource.includes(requiredAdminUsage)) {
    throw new Error(`workspace-shell-admin-actions.ts must delegate action-group assembly: ${requiredAdminUsage}`);
  }
}

for (const forbiddenAdminToken of [
  'from "../lib/api";',
  'from "./workspace-shell-action-guards";',
  "const handleCreateReminder",
  "const handleReindexKnowledge",
  "const handleCreateShareLink",
  "createReminder(",
  "updateReminder(",
  "deleteReminder(",
  "updateNotification(",
  "reindexKnowledge(",
  "updateProviderConfig(",
  "createShareLink(",
  "updateShareLink(",
]) {
  if (adminActionsSource.includes(forbiddenAdminToken)) {
    throw new Error(`workspace-shell-admin-actions.ts must keep admin internals delegated: ${forbiddenAdminToken}`);
  }
}

const maxAdminActionsLines = 20;
if (adminActionsLineCount > maxAdminActionsLines) {
  throw new Error(
    `workspace-shell-admin-actions.ts exceeded ${maxAdminActionsLines} lines: ${adminActionsLineCount}`,
  );
}

console.log("workspace-shell structure verification passed");

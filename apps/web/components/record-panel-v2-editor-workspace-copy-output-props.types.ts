import type { RecordEditorWorkspaceProps } from "./record-panel-v2-workspace-props.types";

export type RecordEditorWorkspaceChannelCopyProps = Pick<RecordEditorWorkspaceProps, "channelInAppLabel" | "channelLabel">;
export type RecordEditorWorkspaceMediaCopyProps = Pick<RecordEditorWorkspaceProps, "largestFilePrefixLabel" | "noMediaLabel">;
export type RecordEditorWorkspaceReminderCopyProps = Pick<RecordEditorWorkspaceProps, "createReminderLabel" | "deleteReminderLabel" | "enableReminderLabel" | "markReminderDoneLabel" | "noRemindersLabel" | "pauseReminderLabel" | "reminderNoteLabel" | "reminderNotePlaceholder" | "reminderSectionDescription" | "reminderSectionTitle" | "reminderTitleLabel" | "reminderTitlePlaceholder" | "remindAtLabel" | "savingReminderLabel" | "untitledReminderLabel">;
export type RecordEditorWorkspaceCopyProps = RecordEditorWorkspaceChannelCopyProps & RecordEditorWorkspaceMediaCopyProps & RecordEditorWorkspaceReminderCopyProps;

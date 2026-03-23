import type {
  BuildRecordEditorWorkspacePropsInput,
  RecordEditorWorkspaceProps,
} from "./record-panel-v2-workspace-props.types";

export function buildRecordEditorWorkspaceCopyProps({
  detailCopy,
}: Pick<BuildRecordEditorWorkspacePropsInput, "detailCopy">): Pick<
  RecordEditorWorkspaceProps,
  | "channelInAppLabel"
  | "channelLabel"
  | "createReminderLabel"
  | "deleteReminderLabel"
  | "enableReminderLabel"
  | "largestFilePrefixLabel"
  | "markReminderDoneLabel"
  | "noMediaLabel"
  | "noRemindersLabel"
  | "pauseReminderLabel"
  | "reminderNoteLabel"
  | "reminderNotePlaceholder"
  | "reminderSectionDescription"
  | "reminderSectionTitle"
  | "reminderTitleLabel"
  | "reminderTitlePlaceholder"
  | "remindAtLabel"
  | "savingReminderLabel"
  | "untitledReminderLabel"
> {
  return {
    channelInAppLabel: detailCopy.channelInApp,
    channelLabel: detailCopy.channelLabel,
    createReminderLabel: detailCopy.createReminder,
    deleteReminderLabel: detailCopy.deleteReminder,
    enableReminderLabel: detailCopy.enableReminder,
    largestFilePrefixLabel: detailCopy.largestFilePrefix,
    markReminderDoneLabel: detailCopy.markReminderDone,
    noMediaLabel: detailCopy.noMedia,
    noRemindersLabel: detailCopy.noReminders,
    pauseReminderLabel: detailCopy.pauseReminder,
    reminderNoteLabel: detailCopy.reminderNoteLabel,
    reminderNotePlaceholder: detailCopy.reminderNotePlaceholder,
    reminderSectionDescription: detailCopy.reminderSectionDescription,
    reminderSectionTitle: detailCopy.reminderSectionTitle,
    reminderTitleLabel: detailCopy.reminderTitleLabel,
    reminderTitlePlaceholder: detailCopy.reminderTitlePlaceholder,
    remindAtLabel: detailCopy.remindAtLabel,
    savingReminderLabel: detailCopy.savingReminder,
    untitledReminderLabel: detailCopy.untitledReminder,
  };
}

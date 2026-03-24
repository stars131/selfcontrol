import type { BuildRecordEditorWorkspacePropsInput, RecordEditorWorkspaceProps } from "./record-panel-v2-workspace-props.types";

export function buildRecordEditorWorkspaceReminderCopyProps({ detailCopy }: Pick<BuildRecordEditorWorkspacePropsInput, "detailCopy">): Pick<RecordEditorWorkspaceProps, "createReminderLabel" | "deleteReminderLabel" | "enableReminderLabel" | "markReminderDoneLabel" | "noRemindersLabel" | "pauseReminderLabel" | "reminderNoteLabel" | "reminderNotePlaceholder" | "reminderSectionDescription" | "reminderSectionTitle" | "reminderTitleLabel" | "reminderTitlePlaceholder" | "remindAtLabel" | "savingReminderLabel" | "untitledReminderLabel"> {
  return {
    createReminderLabel: detailCopy.createReminder,
    deleteReminderLabel: detailCopy.deleteReminder,
    enableReminderLabel: detailCopy.enableReminder,
    markReminderDoneLabel: detailCopy.markReminderDone,
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

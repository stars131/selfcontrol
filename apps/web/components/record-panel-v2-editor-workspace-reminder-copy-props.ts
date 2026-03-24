import type { RecordEditorWorkspaceReminderCopyProps } from "./record-panel-v2-editor-workspace-copy-output-props.types";
import type { RecordEditorWorkspaceCopyPropsInput } from "./record-panel-v2-editor-workspace-copy-props-input.types";

export function buildRecordEditorWorkspaceReminderCopyProps({ detailCopy }: RecordEditorWorkspaceCopyPropsInput): RecordEditorWorkspaceReminderCopyProps {
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

import type { RecordEditorWorkspaceReminderCopyProps } from "./record-panel-v2-editor-workspace-copy-output-props.types";
import type { RecordEditorWorkspaceCopyPropsInput } from "./record-panel-v2-editor-workspace-copy-props-input.types";

export function buildRecordEditorWorkspaceReminderCopyProps(input: RecordEditorWorkspaceCopyPropsInput): RecordEditorWorkspaceReminderCopyProps {
  return {
    createReminderLabel: input.detailCopy.createReminder,
    deleteReminderLabel: input.detailCopy.deleteReminder,
    enableReminderLabel: input.detailCopy.enableReminder,
    markReminderDoneLabel: input.detailCopy.markReminderDone,
    noRemindersLabel: input.detailCopy.noReminders,
    pauseReminderLabel: input.detailCopy.pauseReminder,
    reminderNoteLabel: input.detailCopy.reminderNoteLabel,
    reminderNotePlaceholder: input.detailCopy.reminderNotePlaceholder,
    reminderSectionDescription: input.detailCopy.reminderSectionDescription,
    reminderSectionTitle: input.detailCopy.reminderSectionTitle,
    reminderTitleLabel: input.detailCopy.reminderTitleLabel,
    reminderTitlePlaceholder: input.detailCopy.reminderTitlePlaceholder,
    remindAtLabel: input.detailCopy.remindAtLabel,
    savingReminderLabel: input.detailCopy.savingReminder,
    untitledReminderLabel: input.detailCopy.untitledReminder,
  };
}

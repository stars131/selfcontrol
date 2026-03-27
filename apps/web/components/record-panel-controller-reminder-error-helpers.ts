import { resolveErrorMessage } from "../lib/error-message";

export function getRecordPanelReminderErrorMessage(caught: unknown, fallbackMessage: string) {
  return resolveErrorMessage(caught, fallbackMessage);
}

import { resolveErrorMessage } from "../lib/error-message";

export function getRecordPanelRecordSaveErrorMessage(caught: unknown, fallbackMessage: string) {
  return resolveErrorMessage(caught, fallbackMessage);
}

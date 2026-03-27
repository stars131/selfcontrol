import { resolveErrorMessage } from "../lib/error-message";
export function getRecordPanelErrorMessage(caught: unknown, fallbackMessage: string) {
  return resolveErrorMessage(caught, fallbackMessage);
}

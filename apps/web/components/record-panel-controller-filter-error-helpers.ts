import { resolveErrorMessage } from "../lib/error-message";

export function getRecordPanelFilterErrorMessage(caught: unknown, fallbackMessage: string) {
  return resolveErrorMessage(caught, fallbackMessage);
}

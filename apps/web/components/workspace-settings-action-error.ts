import { resolveErrorMessage } from "../lib/error-message";

export function getWorkspaceSettingsActionErrorMessage(
  caught: unknown,
  fallbackMessage: string,
) {
  return resolveErrorMessage(caught, fallbackMessage);
}

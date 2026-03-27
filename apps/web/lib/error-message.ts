export function resolveErrorMessage(caught: unknown, fallbackMessage: string) {
  if (!(caught instanceof Error)) {
    return fallbackMessage;
  }

  const message = caught.message.trim();
  return message || fallbackMessage;
}

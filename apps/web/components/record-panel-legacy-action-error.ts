export function getRecordPanelErrorMessage(caught: unknown, fallbackMessage: string) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

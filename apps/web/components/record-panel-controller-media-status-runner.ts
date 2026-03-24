import type { RunRecordPanelMediaStatusActionInput } from "./record-panel-controller-media-status-runner.types";
import { getRecordPanelMediaStatusErrorMessage } from "./record-panel-controller-media-status-error-helpers";

export async function runRecordPanelMediaStatusAction({
  action,
  fallbackMessage,
  mediaId,
  setActiveMediaId,
  setError,
}: RunRecordPanelMediaStatusActionInput) {
  setActiveMediaId(mediaId); setError("");
  try {
    await action(mediaId);
  } catch (caught) {
    setError(getRecordPanelMediaStatusErrorMessage(caught, fallbackMessage));
  } finally {
    setActiveMediaId(null);
  }
}

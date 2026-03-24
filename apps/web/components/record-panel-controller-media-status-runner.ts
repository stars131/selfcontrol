import { getRecordPanelMediaStatusErrorMessage } from "./record-panel-controller-media-status-error-helpers";

export async function runRecordPanelMediaStatusAction({
  action,
  fallbackMessage,
  mediaId,
  setActiveMediaId,
  setError,
}: {
  action: (mediaId: string) => Promise<void>;
  fallbackMessage: string;
  mediaId: string;
  setActiveMediaId: (value: string | null) => void;
  setError: (value: string) => void;
}) {
  setActiveMediaId(mediaId); setError("");
  try {
    await action(mediaId);
  } catch (caught) {
    setError(getRecordPanelMediaStatusErrorMessage(caught, fallbackMessage));
  } finally {
    setActiveMediaId(null);
  }
}

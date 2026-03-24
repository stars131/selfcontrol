import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

export function getRecordPanelMediaStatusErrorMessage(
  caught: unknown,
  fallbackMessage: string,
) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

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
  setActiveMediaId(mediaId);
  setError("");
  try {
    await action(mediaId);
  } catch (caught) {
    setError(getRecordPanelMediaStatusErrorMessage(caught, fallbackMessage));
  } finally {
    setActiveMediaId(null);
  }
}

export function getRecordPanelMediaStatusErrorMessages(detailCopy: DetailCopy) {
  return {
    refreshMediaError: detailCopy.refreshMediaError,
    retryMediaError: detailCopy.retryMediaError,
  };
}

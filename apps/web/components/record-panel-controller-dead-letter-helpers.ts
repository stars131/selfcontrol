import { canRetryMediaIssue } from "../lib/record-panel-media";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { MediaDeadLetterOverview } from "../lib/types";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

export function getRecordPanelDeadLetterErrorMessage(
  caught: unknown,
  fallbackMessage: string,
) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

export function toggleRecordPanelDeadLetterSelection(
  current: string[],
  mediaId: string,
  checked: boolean,
) {
  if (checked) {
    return current.includes(mediaId) ? current : [...current, mediaId];
  }

  return current.filter((item) => item !== mediaId);
}

export function getRecordPanelSelectableDeadLetterIds(
  mediaDeadLetterOverview: MediaDeadLetterOverview | null,
) {
  return (mediaDeadLetterOverview?.items ?? [])
    .filter((item) => canRetryMediaIssue(item))
    .map((item) => item.media_id);
}

export function getRecordPanelDeadLetterRetryRequest(
  mode: "selected" | "all",
  selectedDeadLetterIds: string[],
) {
  return mode === "selected"
    ? { mediaIds: selectedDeadLetterIds }
    : { retryStates: ["manual_only", "exhausted", "disabled"], limit: 50 };
}

export function getRecordPanelDeadLetterFallbackMessage(detailCopy: DetailCopy) {
  return detailCopy.bulkRetryError;
}

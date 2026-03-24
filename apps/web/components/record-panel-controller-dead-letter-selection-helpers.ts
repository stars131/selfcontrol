import { canRetryMediaIssue } from "../lib/record-panel-media";
import type { MediaDeadLetterOverview } from "../lib/types";

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

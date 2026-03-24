import { formatByteCount } from "../lib/record-panel-format";
import { canRetryMediaIssue } from "../lib/record-panel-media";
import type { MediaAsset, MediaDeadLetterOverview } from "../lib/types";

export function getSelectedRecordMediaSizeLabel(mediaAssets: MediaAsset[]) {
  return formatByteCount(mediaAssets.reduce((sum, asset) => sum + asset.size_bytes, 0));
}

export function getActionableDeadLetterIds(
  mediaDeadLetterOverview: MediaDeadLetterOverview | null,
) {
  return new Set(
    (mediaDeadLetterOverview?.items ?? [])
      .filter((item) => canRetryMediaIssue(item))
      .map((item) => item.media_id),
  );
}

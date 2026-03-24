import { formatByteCount } from "../lib/record-panel-format";
import { canRetryMediaIssue } from "../lib/record-panel-media";
import type { MediaAsset, MediaDeadLetterOverview, RecordItem } from "../lib/types";

export function countAvoidRecords(records: RecordItem[]) {
  return records.filter((record) => record.is_avoid).length;
}

export function countFoodRecords(records: RecordItem[]) {
  return records.filter((record) => record.type_code === "food").length;
}

export function findSelectedRecord(records: RecordItem[], selectedRecordId?: string | null) {
  return records.find((record) => record.id === selectedRecordId) ?? null;
}

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

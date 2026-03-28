import { readMetadataText } from "../lib/record-panel-media";
import type { ReadMediaAssetCardMetadataDetailTimingInput } from "./media-asset-card-metadata-detail-timing.types";
export function readMediaAssetCardMetadataDetailTiming({ asset }: ReadMediaAssetCardMetadataDetailTimingInput) { return { lastAttemptAt: readMetadataText(asset.metadata_json, "processing_last_attempt_at"), nextRetryAt: readMetadataText(asset.metadata_json, "processing_retry_next_attempt_at") }; }

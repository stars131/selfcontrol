import { readMediaAssetCardMetadataDetailTiming } from "./media-asset-card-metadata-detail-timing";
import type { MediaAssetCardMetadataDetailsProps } from "./media-asset-card-metadata-details.types";
import type { BuildMediaAssetCardMetadataDetailsPropsInput } from "./media-asset-card-metadata-details-props.types";
export function buildMediaAssetCardMetadataDetailsProps({ asset, formatHistoryTimestampLabel, mediaIssueCopy }: BuildMediaAssetCardMetadataDetailsPropsInput): MediaAssetCardMetadataDetailsProps { const { lastAttemptAt, nextRetryAt } = readMediaAssetCardMetadataDetailTiming({ asset }); return { asset, formatHistoryTimestampLabel, lastAttemptAt, mediaIssueCopy, nextRetryAt }; }

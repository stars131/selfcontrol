import { readMediaAssetCardMetadataDetailTiming } from "./media-asset-card-metadata-detail-timing";
import type { MediaAssetCardMetadataDetailsProps } from "./media-asset-card-metadata-details.types";
import type { BuildMediaAssetCardMetadataDetailsPropsInput } from "./media-asset-card-metadata-details-props.types";
export function buildMediaAssetCardMetadataDetailsProps(input: BuildMediaAssetCardMetadataDetailsPropsInput): MediaAssetCardMetadataDetailsProps { const { lastAttemptAt, nextRetryAt } = readMediaAssetCardMetadataDetailTiming({ asset: input.asset }); return { asset: input.asset, formatHistoryTimestampLabel: input.formatHistoryTimestampLabel, lastAttemptAt, mediaIssueCopy: input.mediaIssueCopy, nextRetryAt }; }

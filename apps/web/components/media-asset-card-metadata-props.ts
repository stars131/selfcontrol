import type { MediaAssetCardMetadataProps } from "./media-asset-card-metadata.types";
import type { BuildMediaAssetCardMetadataPropsInput } from "./media-asset-card-metadata-props.types";
export function buildMediaAssetCardMetadataProps({ asset, formatHistoryTimestampLabel, mediaIssueCopy }: BuildMediaAssetCardMetadataPropsInput): MediaAssetCardMetadataProps { return { asset, formatHistoryTimestampLabel, mediaIssueCopy }; }

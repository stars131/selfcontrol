import type { MediaAssetCardPreviewProps } from "./media-asset-card-preview.types";
import type { BuildMediaAssetCardPreviewPropsInput } from "./media-asset-card-preview-props.types";
export function buildMediaAssetCardPreviewProps({ asset, authToken, workspaceId }: BuildMediaAssetCardPreviewPropsInput): MediaAssetCardPreviewProps { return { asset, authToken, workspaceId }; }

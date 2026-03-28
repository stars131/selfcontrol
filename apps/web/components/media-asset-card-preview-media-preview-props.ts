"use client";
import type { MediaPreviewProps } from "./media-preview.types";
import type { BuildMediaAssetCardPreviewMediaPreviewPropsInput } from "./media-asset-card-preview-media-preview-props.types";
export function buildMediaAssetCardPreviewMediaPreviewProps({ asset, authToken, workspaceId }: BuildMediaAssetCardPreviewMediaPreviewPropsInput): MediaPreviewProps { return { asset, token: authToken, workspaceId }; }

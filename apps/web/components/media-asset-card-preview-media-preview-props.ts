"use client";
import type { MediaPreviewProps } from "./media-preview.types";
import type { BuildMediaAssetCardPreviewMediaPreviewPropsInput } from "./media-asset-card-preview-media-preview-props.types";
export function buildMediaAssetCardPreviewMediaPreviewProps(input: BuildMediaAssetCardPreviewMediaPreviewPropsInput): MediaPreviewProps { return { asset: input.asset, token: input.authToken, workspaceId: input.workspaceId }; }

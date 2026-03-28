"use client";
import type { MediaAssetCardDeleteButtonProps } from "./media-asset-card-delete-button.types";
import type { BuildMediaAssetCardDeleteButtonPropsInput } from "./media-asset-card-delete-button-props.types";
export function buildMediaAssetCardDeleteButtonProps({ asset, canWriteWorkspace, deletingMediaId, mediaIssueCopy, onDeleteMediaAsset }: BuildMediaAssetCardDeleteButtonPropsInput): MediaAssetCardDeleteButtonProps { return { asset, canWriteWorkspace, deletingMediaId, mediaIssueCopy, onDeleteMediaAsset }; }

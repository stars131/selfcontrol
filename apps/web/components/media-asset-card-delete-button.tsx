"use client";
import type { MediaAssetCardDeleteButtonProps } from "./media-asset-card-delete-button.types";
export function MediaAssetCardDeleteButton({ asset, canWriteWorkspace, deletingMediaId, mediaIssueCopy, onDeleteMediaAsset }: MediaAssetCardDeleteButtonProps) { return <button className="button secondary" type="button" disabled={deletingMediaId === asset.id || !canWriteWorkspace} onClick={() => void onDeleteMediaAsset(asset.id)}>{deletingMediaId === asset.id ? mediaIssueCopy.deleting : mediaIssueCopy.deleteMedia}</button>; }

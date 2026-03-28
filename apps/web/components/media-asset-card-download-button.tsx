"use client";
import type { MediaAssetCardDownloadButtonProps } from "./media-asset-card-download-button.types";
export function MediaAssetCardDownloadButton({ asset, downloadingMediaId, mediaIssueCopy, onDownloadMedia }: MediaAssetCardDownloadButtonProps) { return <button className="button secondary" type="button" disabled={downloadingMediaId === asset.id} onClick={() => void onDownloadMedia(asset)}>{downloadingMediaId === asset.id ? mediaIssueCopy.downloading : mediaIssueCopy.download}</button>; }

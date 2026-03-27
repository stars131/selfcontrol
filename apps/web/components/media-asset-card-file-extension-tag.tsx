"use client";
import type { MediaAssetCardFileExtensionTagProps } from "./media-asset-card-file-extension-tag.types";
export function MediaAssetCardFileExtensionTag({ asset }: MediaAssetCardFileExtensionTagProps) { return typeof asset.metadata_json.file_extension === "string" && asset.metadata_json.file_extension ? <span className="tag">{String(asset.metadata_json.file_extension)}</span> : null; }

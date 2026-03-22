import type { MediaAsset } from "./types";

export function formatMediaSize(asset: MediaAsset): string {
  const stored = asset.metadata_json.size_label;
  if (typeof stored === "string" && stored.trim()) {
    return stored;
  }

  return formatByteCount(asset.size_bytes, ["B", "KB", "MB", "GB"]);
}

export function formatByteCount(sizeBytes: number, units = ["B", "KB", "MB", "GB", "TB"]): string {
  let value = sizeBytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return unitIndex === 0 ? `${value} ${units[unitIndex]}` : `${value.toFixed(1)} ${units[unitIndex]}`;
}

"use client";

import type { MediaAssetCardIntroProps } from "./media-asset-card-intro.types";

export function MediaAssetCardIntro({ asset }: MediaAssetCardIntroProps) {
  return <><div className="eyebrow">{asset.media_type}</div><div>{asset.original_filename}</div><div className="muted">{asset.mime_type}</div></>;
}

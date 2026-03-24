"use client";

import { MediaPreviewContent } from "./media-preview-content";
import type { MediaPreviewProps } from "./media-preview.types";
import { useMediaPreview } from "./use-media-preview";

export function MediaPreview(props: MediaPreviewProps) {
  const controller = useMediaPreview(props);

  return <MediaPreviewContent asset={props.asset} {...controller} />;
}

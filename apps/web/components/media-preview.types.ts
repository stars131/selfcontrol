import type { MediaAsset } from "../lib/types";

export type MediaPreviewProps = {
  asset: MediaAsset;
  token: string;
  workspaceId: string;
};

export type MediaPreviewControllerResult = {
  blobUrl: string | null;
  error: string;
  loading: boolean;
  previewLabel: string | null;
  previewable: boolean;
};

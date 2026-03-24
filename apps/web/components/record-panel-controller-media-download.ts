import { fetchMediaBlob } from "../lib/api";
import type { MediaAsset } from "../lib/types";

export async function downloadRecordPanelMediaFile({
  asset,
  authToken,
  workspaceId,
}: {
  asset: MediaAsset;
  authToken: string;
  workspaceId: string;
}) {
  const blob = await fetchMediaBlob(authToken, workspaceId, asset.id);
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = asset.original_filename || `${asset.id}.bin`;
  anchor.click();
  URL.revokeObjectURL(url);
}

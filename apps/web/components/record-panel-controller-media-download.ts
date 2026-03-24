import { fetchMediaBlob } from "../lib/api";
import type { DownloadRecordPanelMediaFileInput } from "./record-panel-controller-media-download.types";

export async function downloadRecordPanelMediaFile({
  asset,
  authToken,
  workspaceId,
}: DownloadRecordPanelMediaFileInput) {
  const blob = await fetchMediaBlob(authToken, workspaceId, asset.id);
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = asset.original_filename || `${asset.id}.bin`;
  anchor.click();
  URL.revokeObjectURL(url);
}

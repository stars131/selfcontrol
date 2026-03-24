import type { RecordPanelControllerDetailCopy } from "./record-panel-controller-detail-copy.types";
type PresetNameResolution = { errorMessage: string } | { presetName: string };

export function resolveRecordPanelPresetName(
  detailCopy: RecordPanelControllerDetailCopy,
  presetName: string,
): PresetNameResolution {
  const trimmedPresetName = presetName.trim();
  if (!trimmedPresetName) {
    return { errorMessage: detailCopy.presetNameRequiredError };
  }
  return { presetName: trimmedPresetName };
}

import type { RecordPanelControllerDetailCopy } from "./record-panel-controller-detail-copy.types";
import type { PresetNameResolution } from "./record-panel-controller-filter-preset-name.types";

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

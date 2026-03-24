import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];
type PresetNameResolution = { errorMessage: string } | { presetName: string };

export function resolveRecordPanelPresetName(
  detailCopy: DetailCopy,
  presetName: string,
): PresetNameResolution {
  const trimmedPresetName = presetName.trim();
  if (!trimmedPresetName) {
    return { errorMessage: detailCopy.presetNameRequiredError };
  }
  return { presetName: trimmedPresetName };
}

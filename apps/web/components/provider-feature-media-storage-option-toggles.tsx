"use client";

import {
  buildProviderFeatureMediaStorageOptionsPatch,
  MEDIA_STORAGE_AUTO_RETRY_OPTION,
  MEDIA_STORAGE_FALLBACK_OPTION,
  readProviderFeatureMediaStorageBooleanOption,
} from "./provider-feature-media-storage-options.helpers";
import type { ProviderFeatureMediaStorageOptionTogglesProps } from "./provider-feature-media-storage-option-toggles.types";

export function ProviderFeatureMediaStorageOptionToggles({
  copy,
  draftItem,
  featureCode,
  onProviderDraftChange,
}: ProviderFeatureMediaStorageOptionTogglesProps) {
  return <><label className="muted" style={{ display: "block", marginTop: 10 }}><input checked={readProviderFeatureMediaStorageBooleanOption(draftItem.options_json, MEDIA_STORAGE_FALLBACK_OPTION)} onChange={(event) => onProviderDraftChange(featureCode, buildProviderFeatureMediaStorageOptionsPatch(draftItem.options_json, MEDIA_STORAGE_FALLBACK_OPTION, event.target.checked))} style={{ marginRight: 8 }} type="checkbox" />{copy.fallbackToLocal}</label><label className="muted" style={{ display: "block", marginTop: 10 }}><input checked={readProviderFeatureMediaStorageBooleanOption(draftItem.options_json, MEDIA_STORAGE_AUTO_RETRY_OPTION)} onChange={(event) => onProviderDraftChange(featureCode, buildProviderFeatureMediaStorageOptionsPatch(draftItem.options_json, MEDIA_STORAGE_AUTO_RETRY_OPTION, event.target.checked))} style={{ marginRight: 8 }} type="checkbox" />{copy.autoRetry}</label></>;
}

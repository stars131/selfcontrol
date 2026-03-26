"use client";

import {
  buildProviderFeatureMediaStorageOptionsPatch,
  MEDIA_STORAGE_RETRY_BACKOFF_OPTION,
  MEDIA_STORAGE_RETRY_MAX_ATTEMPTS_OPTION,
  readProviderFeatureMediaStorageTextOption,
} from "./provider-feature-media-storage-options.helpers";
import type { ProviderFeatureMediaStorageRetryFieldsProps } from "./provider-feature-media-storage-retry-fields.types";

export function ProviderFeatureMediaStorageRetryFields({
  copy,
  draftItem,
  featureCode,
  onProviderDraftChange,
}: ProviderFeatureMediaStorageRetryFieldsProps) {
  return <><input className="input" placeholder={copy.retryAttempts} style={{ marginTop: 10 }} value={readProviderFeatureMediaStorageTextOption(draftItem.options_json, MEDIA_STORAGE_RETRY_MAX_ATTEMPTS_OPTION)} onChange={(event) => onProviderDraftChange(featureCode, buildProviderFeatureMediaStorageOptionsPatch(draftItem.options_json, MEDIA_STORAGE_RETRY_MAX_ATTEMPTS_OPTION, event.target.value))} /><input className="input" placeholder={copy.retryBackoff} style={{ marginTop: 10 }} value={readProviderFeatureMediaStorageTextOption(draftItem.options_json, MEDIA_STORAGE_RETRY_BACKOFF_OPTION)} onChange={(event) => onProviderDraftChange(featureCode, buildProviderFeatureMediaStorageOptionsPatch(draftItem.options_json, MEDIA_STORAGE_RETRY_BACKOFF_OPTION, event.target.value))} /></>;
}

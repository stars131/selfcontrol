"use client";

import type { ProviderDraft } from "./provider-settings-controller.types";
import type {
  ProviderFeatureMediaStorageOptionKey,
  ProviderFeatureMediaStorageOptionsPatch,
} from "./provider-feature-media-storage-options.helpers.types";

export const MEDIA_STORAGE_FALLBACK_OPTION: ProviderFeatureMediaStorageOptionKey =
  "fallback_to_local_on_upload_failure";
export const MEDIA_STORAGE_AUTO_RETRY_OPTION: ProviderFeatureMediaStorageOptionKey =
  "auto_retry_enabled";
export const MEDIA_STORAGE_RETRY_MAX_ATTEMPTS_OPTION: ProviderFeatureMediaStorageOptionKey =
  "remote_retry_max_attempts";
export const MEDIA_STORAGE_RETRY_BACKOFF_OPTION: ProviderFeatureMediaStorageOptionKey =
  "remote_retry_backoff_seconds";

export function readProviderFeatureMediaStorageBooleanOption(
  options: ProviderDraft["options_json"],
  key: ProviderFeatureMediaStorageOptionKey,
) {
  return options[key] === true;
}

export function readProviderFeatureMediaStorageTextOption(
  options: ProviderDraft["options_json"],
  key: ProviderFeatureMediaStorageOptionKey,
): string {
  const value = options[key];
  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  return "";
}

export function buildProviderFeatureMediaStorageOptionsPatch(
  options: ProviderDraft["options_json"],
  key: ProviderFeatureMediaStorageOptionKey,
  value: boolean | string,
): ProviderFeatureMediaStorageOptionsPatch {
  return {
    options_json: {
      ...options,
      [key]: value,
    },
  };
}

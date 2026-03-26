"use client";

import {
  buildProviderFeatureMediaStorageOptionsPatch,
  MEDIA_STORAGE_RETRY_BACKOFF_OPTION,
  MEDIA_STORAGE_RETRY_MAX_ATTEMPTS_OPTION,
  readProviderFeatureMediaStorageTextOption,
} from "./provider-feature-media-storage-options.helpers";
import { ProviderFeatureMediaStorageOptionToggles } from "./provider-feature-media-storage-option-toggles";
import type { ProviderFeatureMediaStorageOptionsProps } from "./provider-feature-media-storage-options.types";

export function ProviderFeatureMediaStorageOptions({
  copy,
  draftItem,
  featureCode,
  onProviderDraftChange,
}: ProviderFeatureMediaStorageOptionsProps) {
  return (
    <>
      <ProviderFeatureMediaStorageOptionToggles copy={copy} draftItem={draftItem} featureCode={featureCode} onProviderDraftChange={onProviderDraftChange} />
      <input
        className="input"
        placeholder={copy.retryAttempts}
        style={{ marginTop: 10 }}
        value={readProviderFeatureMediaStorageTextOption(
          draftItem.options_json,
          MEDIA_STORAGE_RETRY_MAX_ATTEMPTS_OPTION,
        )}
        onChange={(event) =>
          onProviderDraftChange(
            featureCode,
            buildProviderFeatureMediaStorageOptionsPatch(
              draftItem.options_json,
              MEDIA_STORAGE_RETRY_MAX_ATTEMPTS_OPTION,
              event.target.value,
            ),
          )
        }
      />
      <input
        className="input"
        placeholder={copy.retryBackoff}
        style={{ marginTop: 10 }}
        value={readProviderFeatureMediaStorageTextOption(
          draftItem.options_json,
          MEDIA_STORAGE_RETRY_BACKOFF_OPTION,
        )}
        onChange={(event) =>
          onProviderDraftChange(
            featureCode,
            buildProviderFeatureMediaStorageOptionsPatch(
              draftItem.options_json,
              MEDIA_STORAGE_RETRY_BACKOFF_OPTION,
              event.target.value,
            ),
          )
        }
      />
      <div className="muted" style={{ marginTop: 8 }}>
        {copy.retryHint}
      </div>
    </>
  );
}

"use client";

import {
  buildProviderFeatureMediaStorageOptionsPatch,
  MEDIA_STORAGE_AUTO_RETRY_OPTION,
  MEDIA_STORAGE_FALLBACK_OPTION,
  MEDIA_STORAGE_RETRY_BACKOFF_OPTION,
  MEDIA_STORAGE_RETRY_MAX_ATTEMPTS_OPTION,
  readProviderFeatureMediaStorageBooleanOption,
  readProviderFeatureMediaStorageTextOption,
} from "./provider-feature-media-storage-options.helpers";
import type { ProviderFeatureMediaStorageOptionsProps } from "./provider-feature-media-storage-options.types";

export function ProviderFeatureMediaStorageOptions({
  copy,
  draftItem,
  featureCode,
  onProviderDraftChange,
}: ProviderFeatureMediaStorageOptionsProps) {
  return (
    <>
      <label className="muted" style={{ display: "block", marginTop: 10 }}>
        <input
          checked={readProviderFeatureMediaStorageBooleanOption(
            draftItem.options_json,
            MEDIA_STORAGE_FALLBACK_OPTION,
          )}
          onChange={(event) =>
            onProviderDraftChange(
              featureCode,
              buildProviderFeatureMediaStorageOptionsPatch(
                draftItem.options_json,
                MEDIA_STORAGE_FALLBACK_OPTION,
                event.target.checked,
              ),
            )
          }
          style={{ marginRight: 8 }}
          type="checkbox"
        />
        {copy.fallbackToLocal}
      </label>
      <label className="muted" style={{ display: "block", marginTop: 10 }}>
        <input
          checked={readProviderFeatureMediaStorageBooleanOption(
            draftItem.options_json,
            MEDIA_STORAGE_AUTO_RETRY_OPTION,
          )}
          onChange={(event) =>
            onProviderDraftChange(
              featureCode,
              buildProviderFeatureMediaStorageOptionsPatch(
                draftItem.options_json,
                MEDIA_STORAGE_AUTO_RETRY_OPTION,
                event.target.checked,
              ),
            )
          }
          style={{ marginRight: 8 }}
          type="checkbox"
        />
        {copy.autoRetry}
      </label>
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

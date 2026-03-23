"use client";

import type { ProviderSettingsCopy } from "./provider-settings-copy";
import type { ProviderDraft } from "./provider-settings-controller.types";

const MEDIA_STORAGE_FALLBACK_OPTION = "fallback_to_local_on_upload_failure";
const MEDIA_STORAGE_AUTO_RETRY_OPTION = "auto_retry_enabled";
const MEDIA_STORAGE_RETRY_MAX_ATTEMPTS_OPTION = "remote_retry_max_attempts";
const MEDIA_STORAGE_RETRY_BACKOFF_OPTION = "remote_retry_backoff_seconds";

function readBooleanOption(options: Record<string, unknown>, key: string) {
  return options[key] === true;
}

function readTextOption(options: Record<string, unknown>, key: string): string {
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

export function ProviderFeatureMediaStorageOptions({
  copy,
  draftItem,
  featureCode,
  onProviderDraftChange,
}: {
  copy: ProviderSettingsCopy;
  draftItem: ProviderDraft;
  featureCode: string;
  onProviderDraftChange: (featureCode: string, patch: Partial<ProviderDraft>) => void;
}) {
  return (
    <>
      <label className="muted" style={{ display: "block", marginTop: 10 }}>
        <input
          checked={readBooleanOption(draftItem.options_json, MEDIA_STORAGE_FALLBACK_OPTION)}
          onChange={(event) =>
            onProviderDraftChange(featureCode, {
              options_json: {
                ...draftItem.options_json,
                [MEDIA_STORAGE_FALLBACK_OPTION]: event.target.checked,
              },
            })
          }
          style={{ marginRight: 8 }}
          type="checkbox"
        />
        {copy.fallbackToLocal}
      </label>
      <label className="muted" style={{ display: "block", marginTop: 10 }}>
        <input
          checked={readBooleanOption(draftItem.options_json, MEDIA_STORAGE_AUTO_RETRY_OPTION)}
          onChange={(event) =>
            onProviderDraftChange(featureCode, {
              options_json: {
                ...draftItem.options_json,
                [MEDIA_STORAGE_AUTO_RETRY_OPTION]: event.target.checked,
              },
            })
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
        value={readTextOption(draftItem.options_json, MEDIA_STORAGE_RETRY_MAX_ATTEMPTS_OPTION)}
        onChange={(event) =>
          onProviderDraftChange(featureCode, {
            options_json: {
              ...draftItem.options_json,
              [MEDIA_STORAGE_RETRY_MAX_ATTEMPTS_OPTION]: event.target.value,
            },
          })
        }
      />
      <input
        className="input"
        placeholder={copy.retryBackoff}
        style={{ marginTop: 10 }}
        value={readTextOption(draftItem.options_json, MEDIA_STORAGE_RETRY_BACKOFF_OPTION)}
        onChange={(event) =>
          onProviderDraftChange(featureCode, {
            options_json: {
              ...draftItem.options_json,
              [MEDIA_STORAGE_RETRY_BACKOFF_OPTION]: event.target.value,
            },
          })
        }
      />
      <div className="muted" style={{ marginTop: 8 }}>
        {copy.retryHint}
      </div>
    </>
  );
}

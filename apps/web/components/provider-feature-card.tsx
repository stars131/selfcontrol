"use client";

import type { LocaleCode } from "../lib/locale";
import type { MediaStorageProviderHealth, ProviderFeatureConfig } from "../lib/types";
import type { ProviderDraft } from "./use-provider-settings-controller";
import { MediaStorageHealthCard } from "./media-storage-health-card";

const MEDIA_STORAGE_FALLBACK_OPTION = "fallback_to_local_on_upload_failure";
const MEDIA_STORAGE_AUTO_RETRY_OPTION = "auto_retry_enabled";
const MEDIA_STORAGE_RETRY_MAX_ATTEMPTS_OPTION = "remote_retry_max_attempts";
const MEDIA_STORAGE_RETRY_BACKOFF_OPTION = "remote_retry_backoff_seconds";

type ProviderSettingsCopy = {
  enabled: string;
  provider: string;
  modelName: string;
  apiBaseUrl: string;
  apiKeyEnvName: string;
  fallbackToLocal: string;
  autoRetry: string;
  retryAttempts: string;
  retryBackoff: string;
  retryHint: string;
  defaultProfile: string;
  workspaceOverride: string;
  secret: string;
  customEndpoint: string;
  defaultEndpoint: string;
  storageHealth: string;
  refreshHealth: string;
  refreshing: string;
  saveProvider: string;
  saving: string;
  reachable: string;
  unreachable: string;
  available: string;
  unavailable: string;
  upload: string;
  download: string;
  delete: string;
  checkedAt: string;
  endpointRoot: string;
  reset: string;
  unsavedChanges: string;
};

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

function readAnchorHighlightClass(targetId: string, highlightedAnchor?: string | null): string {
  return highlightedAnchor === targetId ? " anchor-highlight" : "";
}

export function ProviderFeatureCard({
  copy,
  draftItem,
  formatSecretStatus,
  highlightedAnchor,
  isDirty,
  item,
  locale,
  mediaStorageHealth,
  onProviderDraftChange,
  onRefreshMediaStorageHealth,
  onReset,
  onSave,
  providerSavingCode,
  refreshingMediaStorageHealth = false,
}: {
  copy: ProviderSettingsCopy;
  draftItem: ProviderDraft;
  formatSecretStatus: (status: ProviderFeatureConfig["secret_status"]) => string;
  highlightedAnchor?: string | null;
  isDirty: boolean;
  item: ProviderFeatureConfig;
  locale: LocaleCode;
  mediaStorageHealth?: MediaStorageProviderHealth | null;
  onProviderDraftChange: (featureCode: string, patch: Partial<ProviderDraft>) => void;
  onRefreshMediaStorageHealth?: (() => Promise<void>) | null;
  onReset: (item: ProviderFeatureConfig) => void;
  onSave: (featureCode: string) => Promise<void>;
  providerSavingCode: string;
  refreshingMediaStorageHealth?: boolean;
}) {
  return (
    <article
      className={`message${readAnchorHighlightClass(`provider-${item.feature_code}`, highlightedAnchor)}`}
      id={`provider-${item.feature_code}`}
    >
      <div className="eyebrow">{item.feature_label}</div>
      <div style={{ marginTop: 8, lineHeight: 1.6 }}>{item.feature_description}</div>
      <label className="muted" style={{ display: "block", marginTop: 10 }}>
        <input
          checked={draftItem.is_enabled}
          onChange={(event) =>
            onProviderDraftChange(item.feature_code, { is_enabled: event.target.checked })
          }
          style={{ marginRight: 8 }}
          type="checkbox"
        />
        {copy.enabled}
      </label>
      <div className="muted" style={{ marginTop: 10 }}>{copy.provider}</div>
      <select
        className="input"
        style={{ marginTop: 8 }}
        value={draftItem.provider_code}
        onChange={(event) =>
          onProviderDraftChange(item.feature_code, { provider_code: event.target.value })
        }
      >
        {item.providers.map((providerCode) => (
          <option key={providerCode} value={providerCode}>
            {providerCode}
          </option>
        ))}
      </select>
      <input
        className="input"
        placeholder={copy.modelName}
        style={{ marginTop: 10 }}
        value={draftItem.model_name}
        onChange={(event) =>
          onProviderDraftChange(item.feature_code, { model_name: event.target.value })
        }
      />
      <input
        className="input"
        placeholder={copy.apiBaseUrl}
        style={{ marginTop: 10 }}
        value={draftItem.api_base_url}
        onChange={(event) =>
          onProviderDraftChange(item.feature_code, { api_base_url: event.target.value })
        }
      />
      <input
        className="input"
        placeholder={copy.apiKeyEnvName}
        style={{ marginTop: 10 }}
        value={draftItem.api_key_env_name}
        onChange={(event) =>
          onProviderDraftChange(item.feature_code, { api_key_env_name: event.target.value })
        }
      />
      {item.feature_code === "media_storage" ? (
        <>
          <label className="muted" style={{ display: "block", marginTop: 10 }}>
            <input
              checked={readBooleanOption(draftItem.options_json, MEDIA_STORAGE_FALLBACK_OPTION)}
              onChange={(event) =>
                onProviderDraftChange(item.feature_code, {
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
                onProviderDraftChange(item.feature_code, {
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
              onProviderDraftChange(item.feature_code, {
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
              onProviderDraftChange(item.feature_code, {
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
      ) : null}
      <div className="muted" style={{ marginTop: 8 }}>
        {item.is_default ? copy.defaultProfile : copy.workspaceOverride}
      </div>
      <div className="tag-row">
        <span className="tag">
          {copy.secret} {formatSecretStatus(item.secret_status)}
          {item.secret_env_name ? ` (${item.secret_env_name})` : ""}
        </span>
        {item.api_base_url ? <span className="tag">{copy.customEndpoint}</span> : <span className="tag">{copy.defaultEndpoint}</span>}
        {isDirty ? <span className="tag">{copy.unsavedChanges}</span> : null}
      </div>
      {item.config_warnings.length ? (
        <div className="notice" style={{ marginTop: 10 }}>
          {item.config_warnings.join(" ")}
        </div>
      ) : null}
      {item.feature_code === "media_storage" && mediaStorageHealth ? (
        <MediaStorageHealthCard
          copy={copy}
          formatSecretStatus={formatSecretStatus}
          highlightedAnchor={highlightedAnchor}
          locale={locale}
          mediaStorageHealth={mediaStorageHealth}
          onRefreshMediaStorageHealth={onRefreshMediaStorageHealth}
          readAnchorHighlightClass={readAnchorHighlightClass}
          refreshingMediaStorageHealth={refreshingMediaStorageHealth}
        />
      ) : null}
      <div className="action-row" style={{ marginTop: 10 }}>
        <button
          className="button secondary"
          disabled={!isDirty || providerSavingCode === item.feature_code}
          type="button"
          onClick={() => onReset(item)}
        >
          {copy.reset}
        </button>
        <button
          className="button secondary"
          disabled={providerSavingCode === item.feature_code || !isDirty}
          type="button"
          onClick={() => void onSave(item.feature_code)}
        >
          {providerSavingCode === item.feature_code ? copy.saving : copy.saveProvider}
        </button>
      </div>
    </article>
  );
}

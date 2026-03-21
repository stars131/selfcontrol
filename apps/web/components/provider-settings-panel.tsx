"use client";

import { useEffect, useState } from "react";

import type { MediaStorageProviderHealth, ProviderFeatureConfig } from "../lib/types";

type ProviderDraft = {
  provider_code: string;
  model_name: string;
  is_enabled: boolean;
  api_base_url: string;
  api_key_env_name: string;
  options_json: Record<string, unknown>;
};

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

function readAnchorHighlightClass(targetId: string, highlightedAnchor?: string | null): string {
  return highlightedAnchor === targetId ? " anchor-highlight" : "";
}

export function ProviderSettingsPanel({
  providerConfigs,
  mediaStorageHealth = null,
  refreshingMediaStorageHealth = false,
  highlightedAnchor = null,
  onRefreshMediaStorageHealth,
  onSaveProviderConfig,
}: {
  providerConfigs: ProviderFeatureConfig[];
  mediaStorageHealth?: MediaStorageProviderHealth | null;
  refreshingMediaStorageHealth?: boolean;
  highlightedAnchor?: string | null;
  onRefreshMediaStorageHealth?: (() => Promise<void>) | null;
  onSaveProviderConfig: (
    featureCode: string,
    input: {
      provider_code: string;
      model_name?: string | null;
      is_enabled: boolean;
      api_base_url?: string | null;
      api_key_env_name?: string | null;
      options_json?: Record<string, unknown>;
    },
  ) => Promise<void>;
}) {
  const [providerSavingCode, setProviderSavingCode] = useState("");
  const [providerDrafts, setProviderDrafts] = useState<Record<string, ProviderDraft>>({});
  const [error, setError] = useState("");

  useEffect(() => {
    const nextDrafts: Record<string, ProviderDraft> = {};
    for (const item of providerConfigs) {
      nextDrafts[item.feature_code] = {
        provider_code: item.provider_code,
        model_name: item.model_name ?? "",
        is_enabled: item.is_enabled,
        api_base_url: item.api_base_url ?? "",
        api_key_env_name: item.api_key_env_name ?? "",
        options_json: item.options_json ?? {},
      };
    }
    setProviderDrafts(nextDrafts);
  }, [providerConfigs]);

  const handleProviderDraftChange = (featureCode: string, patch: Partial<ProviderDraft>) => {
    setProviderDrafts((current) => ({
      ...current,
      [featureCode]: {
        provider_code: current[featureCode]?.provider_code ?? "",
        model_name: current[featureCode]?.model_name ?? "",
        is_enabled: current[featureCode]?.is_enabled ?? false,
        api_base_url: current[featureCode]?.api_base_url ?? "",
        api_key_env_name: current[featureCode]?.api_key_env_name ?? "",
        options_json: current[featureCode]?.options_json ?? {},
        ...patch,
      },
    }));
  };

  const handleSaveProviderConfig = async (featureCode: string) => {
    const item = providerDrafts[featureCode];
    if (!item) {
      return;
    }

    setProviderSavingCode(featureCode);
    setError("");
    try {
      await onSaveProviderConfig(featureCode, {
        provider_code: item.provider_code,
        model_name: item.model_name || null,
        is_enabled: item.is_enabled,
        api_base_url: item.api_base_url || null,
        api_key_env_name: item.api_key_env_name || null,
        options_json: item.options_json,
      });
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Save failed";
      setError(message);
    } finally {
      setProviderSavingCode("");
    }
  };

  return (
    <section
      className={`record-card${readAnchorHighlightClass("provider-settings", highlightedAnchor)}`}
      id="provider-settings"
    >
      <div className="eyebrow">Provider Settings</div>
      <div className="muted" style={{ marginTop: 8 }}>
        Configure each AI feature separately. Secrets stay in environment variables and this page only stores the env var names.
      </div>
      {error ? <div className="notice error" style={{ marginTop: 12 }}>{error}</div> : null}
      <div className="record-list compact-list" style={{ marginTop: 12 }}>
        {providerConfigs.map((item) => {
          const draftItem = providerDrafts[item.feature_code];
          if (!draftItem) {
            return null;
          }

          return (
            <article
              className={`message${readAnchorHighlightClass(`provider-${item.feature_code}`, highlightedAnchor)}`}
              id={`provider-${item.feature_code}`}
              key={item.feature_code}
            >
              <div className="eyebrow">{item.feature_label}</div>
              <div style={{ marginTop: 8, lineHeight: 1.6 }}>{item.feature_description}</div>
              <label className="muted" style={{ display: "block", marginTop: 10 }}>
                <input
                  checked={draftItem.is_enabled}
                  onChange={(event) =>
                    handleProviderDraftChange(item.feature_code, { is_enabled: event.target.checked })
                  }
                  style={{ marginRight: 8 }}
                  type="checkbox"
                />
                Enabled
              </label>
              <div className="muted" style={{ marginTop: 10 }}>Provider</div>
              <select
                className="input"
                style={{ marginTop: 8 }}
                value={draftItem.provider_code}
                onChange={(event) =>
                  handleProviderDraftChange(item.feature_code, { provider_code: event.target.value })
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
                placeholder="Model name"
                style={{ marginTop: 10 }}
                value={draftItem.model_name}
                onChange={(event) =>
                  handleProviderDraftChange(item.feature_code, { model_name: event.target.value })
                }
              />
              <input
                className="input"
                placeholder="API base URL"
                style={{ marginTop: 10 }}
                value={draftItem.api_base_url}
                onChange={(event) =>
                  handleProviderDraftChange(item.feature_code, { api_base_url: event.target.value })
                }
              />
              <input
                className="input"
                placeholder="API key env name"
                style={{ marginTop: 10 }}
                value={draftItem.api_key_env_name}
                onChange={(event) =>
                  handleProviderDraftChange(item.feature_code, { api_key_env_name: event.target.value })
                }
              />
              {item.feature_code === "media_storage" ? (
                <>
                  <label className="muted" style={{ display: "block", marginTop: 10 }}>
                    <input
                      checked={readBooleanOption(draftItem.options_json, MEDIA_STORAGE_FALLBACK_OPTION)}
                      onChange={(event) =>
                        handleProviderDraftChange(item.feature_code, {
                          options_json: {
                            ...draftItem.options_json,
                            [MEDIA_STORAGE_FALLBACK_OPTION]: event.target.checked,
                          },
                        })
                      }
                      style={{ marginRight: 8 }}
                      type="checkbox"
                    />
                    Fallback to local storage if remote upload fails
                  </label>
                  <label className="muted" style={{ display: "block", marginTop: 10 }}>
                    <input
                      checked={readBooleanOption(draftItem.options_json, MEDIA_STORAGE_AUTO_RETRY_OPTION)}
                      onChange={(event) =>
                        handleProviderDraftChange(item.feature_code, {
                          options_json: {
                            ...draftItem.options_json,
                            [MEDIA_STORAGE_AUTO_RETRY_OPTION]: event.target.checked,
                          },
                        })
                      }
                      style={{ marginRight: 8 }}
                      type="checkbox"
                    />
                    Enable automatic remote processing retries
                  </label>
                  <input
                    className="input"
                    placeholder="Max remote retry attempts"
                    style={{ marginTop: 10 }}
                    value={readTextOption(draftItem.options_json, MEDIA_STORAGE_RETRY_MAX_ATTEMPTS_OPTION)}
                    onChange={(event) =>
                      handleProviderDraftChange(item.feature_code, {
                        options_json: {
                          ...draftItem.options_json,
                          [MEDIA_STORAGE_RETRY_MAX_ATTEMPTS_OPTION]: event.target.value,
                        },
                      })
                    }
                  />
                  <input
                    className="input"
                    placeholder="Retry backoff seconds, e.g. 60,300,900"
                    style={{ marginTop: 10 }}
                    value={readTextOption(draftItem.options_json, MEDIA_STORAGE_RETRY_BACKOFF_OPTION)}
                    onChange={(event) =>
                      handleProviderDraftChange(item.feature_code, {
                        options_json: {
                          ...draftItem.options_json,
                          [MEDIA_STORAGE_RETRY_BACKOFF_OPTION]: event.target.value,
                        },
                      })
                    }
                  />
                  <div className="muted" style={{ marginTop: 8 }}>
                    Retry settings apply to remote media extraction recovery in this workspace.
                  </div>
                </>
              ) : null}
              <div className="muted" style={{ marginTop: 8 }}>
                {item.is_default ? "Using default profile" : "Workspace override saved"}
              </div>
              <div className="tag-row">
                <span className="tag">
                  secret {item.secret_status}
                  {item.secret_env_name ? ` (${item.secret_env_name})` : ""}
                </span>
                {item.api_base_url ? <span className="tag">custom endpoint</span> : <span className="tag">default endpoint</span>}
              </div>
              {item.config_warnings.length ? (
                <div className="notice" style={{ marginTop: 10 }}>
                  {item.config_warnings.join(" ")}
                </div>
              ) : null}
              {item.feature_code === "media_storage" && mediaStorageHealth ? (
                <div
                  className={`record-card form-stack${readAnchorHighlightClass("provider-media_storage-health", highlightedAnchor)}`}
                  id="provider-media_storage-health"
                  style={{ marginTop: 12 }}
                >
                  <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div className="eyebrow">Storage health</div>
                      <div style={{ marginTop: 8, fontWeight: 600 }}>
                        {mediaStorageHealth.status}
                      </div>
                    </div>
                    {onRefreshMediaStorageHealth ? (
                      <button
                        className="button secondary"
                        disabled={refreshingMediaStorageHealth}
                        type="button"
                        onClick={() => void onRefreshMediaStorageHealth()}
                      >
                        {refreshingMediaStorageHealth ? "Refreshing..." : "Refresh health"}
                      </button>
                    ) : null}
                  </div>
                  <div className="muted" style={{ lineHeight: 1.6 }}>
                    {mediaStorageHealth.message}
                  </div>
                  <div className="tag-row">
                    <span className="tag">provider {mediaStorageHealth.provider_code}</span>
                    <span className="tag">secret {mediaStorageHealth.secret_status}</span>
                    {typeof mediaStorageHealth.reachable === "boolean" ? (
                      <span className="tag">
                        {mediaStorageHealth.reachable ? "reachable" : "unreachable"}
                      </span>
                    ) : null}
                    {mediaStorageHealth.service_name ? (
                      <span className="tag">
                        {mediaStorageHealth.service_name}
                        {mediaStorageHealth.service_version ? ` ${mediaStorageHealth.service_version}` : ""}
                      </span>
                    ) : null}
                    {typeof mediaStorageHealth.response_time_ms === "number" ? (
                      <span className="tag">{mediaStorageHealth.response_time_ms} ms</span>
                    ) : null}
                  </div>
                  <div className="detail-grid">
                    <div className="subtle-card">
                      <div className="eyebrow">Upload</div>
                      <div style={{ marginTop: 8, fontWeight: 600 }}>
                        {mediaStorageHealth.capabilities.upload ? "Available" : "Unavailable"}
                      </div>
                    </div>
                    <div className="subtle-card">
                      <div className="eyebrow">Download</div>
                      <div style={{ marginTop: 8, fontWeight: 600 }}>
                        {mediaStorageHealth.capabilities.download ? "Available" : "Unavailable"}
                      </div>
                    </div>
                    <div className="subtle-card">
                      <div className="eyebrow">Delete</div>
                      <div style={{ marginTop: 8, fontWeight: 600 }}>
                        {mediaStorageHealth.capabilities.delete ? "Available" : "Unavailable"}
                      </div>
                    </div>
                  </div>
                  <div className="muted">
                    Checked at {new Date(mediaStorageHealth.checked_at).toLocaleString()}
                  </div>
                  {mediaStorageHealth.api_base_url ? (
                    <div className="muted" style={{ wordBreak: "break-all" }}>
                      Endpoint root: {mediaStorageHealth.api_base_url}
                    </div>
                  ) : null}
                  {mediaStorageHealth.warnings.length ? (
                    <div className="notice">
                      {mediaStorageHealth.warnings.join(" ")}
                    </div>
                  ) : null}
                </div>
              ) : null}
              <div className="action-row" style={{ marginTop: 10 }}>
                <button
                  className="button secondary"
                  disabled={providerSavingCode === item.feature_code}
                  type="button"
                  onClick={() => void handleSaveProviderConfig(item.feature_code)}
                >
                  {providerSavingCode === item.feature_code ? "Saving..." : "Save provider"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

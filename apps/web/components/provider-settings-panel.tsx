"use client";

import { useEffect, useState } from "react";

import type { ProviderFeatureConfig } from "../lib/types";

type ProviderDraft = {
  provider_code: string;
  model_name: string;
  is_enabled: boolean;
  api_base_url: string;
  api_key_env_name: string;
};

export function ProviderSettingsPanel({
  providerConfigs,
  onSaveProviderConfig,
}: {
  providerConfigs: ProviderFeatureConfig[];
  onSaveProviderConfig: (
    featureCode: string,
    input: {
      provider_code: string;
      model_name?: string | null;
      is_enabled: boolean;
      api_base_url?: string | null;
      api_key_env_name?: string | null;
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
      });
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Save failed";
      setError(message);
    } finally {
      setProviderSavingCode("");
    }
  };

  return (
    <section className="record-card">
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
            <article className="message" key={item.feature_code}>
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

"use client";

import type { ProviderFeatureCardCoreFieldsProps } from "./provider-feature-card-core-fields.types";

export function ProviderFeatureCardCoreFields({
  copy,
  draftItem,
  item,
  onProviderDraftChange,
}: ProviderFeatureCardCoreFieldsProps) {
  return (
    <>
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
    </>
  );
}

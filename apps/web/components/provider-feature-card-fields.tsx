"use client";

import { ProviderFeatureMediaStorageOptions } from "./provider-feature-media-storage-options";
import type { ProviderFeatureCardFieldsProps } from "./provider-feature-card-fields.types";

export function ProviderFeatureCardFields({
  copy,
  draftItem,
  item,
  onProviderDraftChange,
}: ProviderFeatureCardFieldsProps) {
  return (
    <>
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
        <ProviderFeatureMediaStorageOptions
          copy={copy}
          draftItem={draftItem}
          featureCode={item.feature_code}
          onProviderDraftChange={onProviderDraftChange}
        />
      ) : null}
    </>
  );
}

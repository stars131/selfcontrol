"use client";

import type { ProviderFeatureCardStatusProps } from "./provider-feature-card-status.types";

export function ProviderFeatureCardStatus({
  copy,
  formatSecretStatus,
  isDirty,
  item,
}: ProviderFeatureCardStatusProps) {
  return (
    <>
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
    </>
  );
}

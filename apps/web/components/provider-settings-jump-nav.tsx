"use client";

import type { ProviderSettingsJumpNavProps } from "./provider-settings-jump-nav.types";

export function ProviderSettingsJumpNav({
  jumpToLabel,
  healthSectionLabel,
  providerConfigs,
}: ProviderSettingsJumpNavProps) {
  return (
    <div className="form-stack" style={{ marginTop: 12 }}>
      <div className="eyebrow">{jumpToLabel}</div>
      <div className="tag-row" style={{ marginTop: 0 }}>
        {providerConfigs.map((item) => (
          <a className="tag" href={`#provider-${item.feature_code}`} key={item.feature_code}>
            {item.feature_label}
          </a>
        ))}
        {providerConfigs.some((item) => item.feature_code === "media_storage") ? (
          <a className="tag" href="#provider-media_storage-health">
            {healthSectionLabel}
          </a>
        ) : null}
      </div>
    </div>
  );
}

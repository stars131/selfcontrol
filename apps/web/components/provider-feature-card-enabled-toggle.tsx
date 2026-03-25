"use client";

import type { ProviderFeatureCardEnabledToggleProps } from "./provider-feature-card-enabled-toggle.types";

export function ProviderFeatureCardEnabledToggle({
  copy,
  draftItem,
  item,
  onProviderDraftChange,
}: ProviderFeatureCardEnabledToggleProps) {
  return (
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
  );
}

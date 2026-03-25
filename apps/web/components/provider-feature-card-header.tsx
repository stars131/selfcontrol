"use client";

import type { ProviderFeatureCardHeaderProps } from "./provider-feature-card-header.types";

export function ProviderFeatureCardHeader({
  item,
}: ProviderFeatureCardHeaderProps) {
  return (
    <>
      <div className="eyebrow">{item.feature_label}</div>
      <div style={{ marginTop: 8, lineHeight: 1.6 }}>{item.feature_description}</div>
    </>
  );
}

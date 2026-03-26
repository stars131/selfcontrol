"use client";

import { ProviderFeatureMediaStorageOptionToggles } from "./provider-feature-media-storage-option-toggles";
import { ProviderFeatureMediaStorageRetryFields } from "./provider-feature-media-storage-retry-fields";
import type { ProviderFeatureMediaStorageOptionsProps } from "./provider-feature-media-storage-options.types";

export function ProviderFeatureMediaStorageOptions({
  copy,
  draftItem,
  featureCode,
  onProviderDraftChange,
}: ProviderFeatureMediaStorageOptionsProps) {
  return (
    <>
      <ProviderFeatureMediaStorageOptionToggles copy={copy} draftItem={draftItem} featureCode={featureCode} onProviderDraftChange={onProviderDraftChange} />
      <ProviderFeatureMediaStorageRetryFields copy={copy} draftItem={draftItem} featureCode={featureCode} onProviderDraftChange={onProviderDraftChange} />
      <div className="muted" style={{ marginTop: 8 }}>
        {copy.retryHint}
      </div>
    </>
  );
}

"use client";

import { ProviderFeatureCardCoreFields } from "./provider-feature-card-core-fields";
import { ProviderFeatureCardEnabledToggle } from "./provider-feature-card-enabled-toggle";
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
      <ProviderFeatureCardEnabledToggle
        copy={copy}
        draftItem={draftItem}
        item={item}
        onProviderDraftChange={onProviderDraftChange}
      />
      <ProviderFeatureCardCoreFields
        copy={copy}
        draftItem={draftItem}
        item={item}
        onProviderDraftChange={onProviderDraftChange}
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

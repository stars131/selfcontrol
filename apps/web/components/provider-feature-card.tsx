"use client";

import { MediaStorageHealthCard } from "./media-storage-health-card";
import { ProviderFeatureCardActions } from "./provider-feature-card-actions";
import { ProviderFeatureCardFields } from "./provider-feature-card-fields";
import { readProviderFeatureCardAnchorHighlightClass } from "./provider-feature-card-helpers";
import { ProviderFeatureCardStatus } from "./provider-feature-card-status";
import type { ProviderFeatureCardProps } from "./provider-feature-card.types";

export function ProviderFeatureCard({
  copy,
  draftItem,
  formatSecretStatus,
  highlightedAnchor,
  isDirty,
  item,
  locale,
  mediaStorageHealth,
  onProviderDraftChange,
  onRefreshMediaStorageHealth,
  onReset,
  onSave,
  providerSavingCode,
  refreshingMediaStorageHealth = false,
}: ProviderFeatureCardProps) {
  return (
    <article
      className={`message${readProviderFeatureCardAnchorHighlightClass(`provider-${item.feature_code}`, highlightedAnchor)}`}
      id={`provider-${item.feature_code}`}
    >
      <div className="eyebrow">{item.feature_label}</div>
      <div style={{ marginTop: 8, lineHeight: 1.6 }}>{item.feature_description}</div>
      <ProviderFeatureCardFields
        copy={copy}
        draftItem={draftItem}
        item={item}
        onProviderDraftChange={onProviderDraftChange}
      />
      <ProviderFeatureCardStatus
        copy={copy}
        formatSecretStatus={formatSecretStatus}
        isDirty={isDirty}
        item={item}
      />
      {item.feature_code === "media_storage" && mediaStorageHealth ? (
        <MediaStorageHealthCard
          copy={copy}
          formatSecretStatus={formatSecretStatus}
          highlightedAnchor={highlightedAnchor}
          locale={locale}
          mediaStorageHealth={mediaStorageHealth}
          onRefreshMediaStorageHealth={onRefreshMediaStorageHealth}
          readAnchorHighlightClass={readProviderFeatureCardAnchorHighlightClass}
          refreshingMediaStorageHealth={refreshingMediaStorageHealth}
        />
      ) : null}
      <ProviderFeatureCardActions
        copy={copy}
        isDirty={isDirty}
        item={item}
        onReset={onReset}
        onSave={onSave}
        providerSavingCode={providerSavingCode}
      />
    </article>
  );
}

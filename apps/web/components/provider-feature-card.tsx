"use client";

import { ProviderFeatureCardActions } from "./provider-feature-card-actions";
import { ProviderFeatureCardFields } from "./provider-feature-card-fields";
import { ProviderFeatureCardHeader } from "./provider-feature-card-header";
import { ProviderFeatureCardHealthSection } from "./provider-feature-card-health-section";
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
      <ProviderFeatureCardHeader item={item} />
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
      <ProviderFeatureCardHealthSection
        copy={copy}
        formatSecretStatus={formatSecretStatus}
        highlightedAnchor={highlightedAnchor}
        item={item}
        locale={locale}
        mediaStorageHealth={mediaStorageHealth}
        onRefreshMediaStorageHealth={onRefreshMediaStorageHealth}
        refreshingMediaStorageHealth={refreshingMediaStorageHealth}
      />
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

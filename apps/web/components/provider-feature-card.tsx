"use client";

import { MediaStorageHealthCard } from "./media-storage-health-card";
import { ProviderFeatureCardFields } from "./provider-feature-card-fields";
import { ProviderFeatureCardStatus } from "./provider-feature-card-status";
import type { ProviderFeatureCardProps } from "./provider-feature-card.types";

function readAnchorHighlightClass(targetId: string, highlightedAnchor?: string | null): string {
  return highlightedAnchor === targetId ? " anchor-highlight" : "";
}

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
      className={`message${readAnchorHighlightClass(`provider-${item.feature_code}`, highlightedAnchor)}`}
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
          readAnchorHighlightClass={readAnchorHighlightClass}
          refreshingMediaStorageHealth={refreshingMediaStorageHealth}
        />
      ) : null}
      <div className="action-row" style={{ marginTop: 10 }}>
        <button
          className="button secondary"
          disabled={!isDirty || providerSavingCode === item.feature_code}
          type="button"
          onClick={() => onReset(item)}
        >
          {copy.reset}
        </button>
        <button
          className="button secondary"
          disabled={providerSavingCode === item.feature_code || !isDirty}
          type="button"
          onClick={() => void onSave(item.feature_code)}
        >
          {providerSavingCode === item.feature_code ? copy.saving : copy.saveProvider}
        </button>
      </div>
    </article>
  );
}

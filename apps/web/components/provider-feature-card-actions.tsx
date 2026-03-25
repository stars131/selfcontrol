"use client";

import type { ProviderFeatureCardActionsProps } from "./provider-feature-card-actions.types";

export function ProviderFeatureCardActions({
  copy,
  isDirty,
  item,
  onReset,
  onSave,
  providerSavingCode,
}: ProviderFeatureCardActionsProps) {
  return (
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
  );
}

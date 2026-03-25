"use client";

import type { ProviderSettingsPanelIntroProps } from "./provider-settings-panel-intro.types";

export function ProviderSettingsPanelIntro({
  copy,
  error,
}: ProviderSettingsPanelIntroProps) {
  return (
    <>
      <div className="eyebrow">{copy.title}</div>
      <div className="muted" style={{ marginTop: 8 }}>
        {copy.subtitle}
      </div>
      {error ? <div className="notice error" style={{ marginTop: 12 }}>{error}</div> : null}
    </>
  );
}

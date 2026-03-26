"use client";

import type { MapDrilldownCardIntroProps } from "./map-drilldown-card-intro.types";

export function MapDrilldownCardIntro({ title }: MapDrilldownCardIntroProps) {
  return <div className="eyebrow">{title}</div>;
}

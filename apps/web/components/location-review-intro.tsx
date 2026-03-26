"use client";

import type { LocationReviewIntroProps } from "./location-review-intro.types";

export function LocationReviewIntro({ panelCopy }: LocationReviewIntroProps) {
  return <><div className="eyebrow">{panelCopy.locationReview}</div><div className="muted">{panelCopy.locationReviewDescription}</div></>;
}

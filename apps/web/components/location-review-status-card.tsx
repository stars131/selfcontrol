"use client";

import type { LocationReviewStatusCardProps } from "./location-review-status-card.types";

export function LocationReviewStatusCard({ label, value }: LocationReviewStatusCardProps) {
  return (
    <div className="subtle-card">
      <div className="eyebrow">{label}</div>
      <div style={{ marginTop: 8, fontWeight: 600 }}>{value}</div>
    </div>
  );
}

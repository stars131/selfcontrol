"use client";

export function readProviderFeatureCardAnchorHighlightClass(
  targetId: string,
  highlightedAnchor?: string | null,
): string {
  return highlightedAnchor === targetId ? " anchor-highlight" : "";
}

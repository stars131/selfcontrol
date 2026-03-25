"use client";

import { useEffect } from "react";
import type { UseWorkspaceSettingsAnchorInput } from "./use-workspace-settings-anchor.types";

export function useWorkspaceSettingsAnchor({
  highlightedAnchor,
  providerConfigCount,
  healthCheckedAt,
  setHighlightedAnchor,
}: UseWorkspaceSettingsAnchorInput) {
  useEffect(() => {
    const syncHighlightedAnchor = () => {
      const anchor = window.location.hash ? decodeURIComponent(window.location.hash.slice(1)) : "";
      setHighlightedAnchor(anchor || null);
    };

    syncHighlightedAnchor();
    window.addEventListener("hashchange", syncHighlightedAnchor);
    return () => window.removeEventListener("hashchange", syncHighlightedAnchor);
  }, [setHighlightedAnchor]);

  useEffect(() => {
    if (!highlightedAnchor) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(highlightedAnchor);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [highlightedAnchor, providerConfigCount, healthCheckedAt]);
}

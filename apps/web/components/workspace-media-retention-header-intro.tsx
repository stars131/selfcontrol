"use client";
import type { WorkspaceMediaRetentionHeaderIntroProps } from "./workspace-media-retention-header-intro.types";

export function WorkspaceMediaRetentionHeaderIntro({ copy }: WorkspaceMediaRetentionHeaderIntroProps) {
  return (
    <div><div className="eyebrow">{copy.eyebrow}</div><div style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 8 }}>{copy.title}</div><div className="muted" style={{ marginTop: 8, lineHeight: 1.7 }}>{copy.description}</div></div>
  );
}

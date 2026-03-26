"use client";

import type { WorkspaceSettingsHeaderIntroProps } from "./workspace-settings-header-intro.types";

export function WorkspaceSettingsHeaderIntro({ copy, username, workspace }: WorkspaceSettingsHeaderIntroProps) {
  return <div><div className="eyebrow">{copy.eyebrow}</div><h1 className="title">{copy.title}</h1><div className="muted" style={{ marginTop: 8 }}>{copy.subtitle}</div>{username ? <div className="muted" style={{ marginTop: 8 }}>{username}{workspace ? ` / ${workspace.role}` : ""}</div> : null}</div>;
}

"use client";
import { useStoredLocale } from "../lib/locale";
import { getWorkspaceRoleLabel } from "../lib/workspace-role-display";
import type { WorkspaceSettingsHeaderIntroProps } from "./workspace-settings-header-intro.types";
export function WorkspaceSettingsHeaderIntro({ copy, username, workspace }: WorkspaceSettingsHeaderIntroProps) {
  const { locale } = useStoredLocale(); return <div><div className="eyebrow">{copy.eyebrow}</div><h1 className="title">{copy.title}</h1><div className="muted" style={{ marginTop: 8 }}>{copy.subtitle}</div>{username ? <div className="muted" style={{ marginTop: 8 }}>{username}{workspace ? ` / ${getWorkspaceRoleLabel(locale, workspace.role)}` : ""}</div> : null}</div>;
}

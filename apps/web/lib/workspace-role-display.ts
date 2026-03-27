import type { LocaleCode } from "./locale";

const WORKSPACE_ROLE_LABELS: Record<LocaleCode, Record<string, string>> = {
  "zh-CN": { owner: "所有者", editor: "可编辑", viewer: "只读" },
  en: { owner: "owner", editor: "editor", viewer: "viewer" },
  ja: { owner: "オーナー", editor: "編集可", viewer: "閲覧のみ" },
};

export function getWorkspaceRoleLabel(locale: LocaleCode, role: string): string {
  return WORKSPACE_ROLE_LABELS[locale][role] ?? role;
}

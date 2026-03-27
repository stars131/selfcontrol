import type { LocaleCode } from "./locale";

const WORKSPACE_ROLE_LABELS: Record<LocaleCode, Record<string, string>> = {
  "zh-CN": { owner: "所有者", editor: "可编辑", viewer: "只读" },
  en: { owner: "owner", editor: "editor", viewer: "viewer" },
  ja: { owner: "オーナー", editor: "編集可", viewer: "閲覧のみ" },
};

const WORKSPACE_VISIBILITY_LABELS: Record<LocaleCode, Record<string, string>> = {
  "zh-CN": { private: "私有", public: "公开" },
  en: { private: "private", public: "public" },
  ja: { private: "非公開", public: "公開" },
};

export function getWorkspaceRoleLabel(locale: LocaleCode, role: string): string {
  return WORKSPACE_ROLE_LABELS[locale][role] ?? role;
}

export function getWorkspaceVisibilityLabel(locale: LocaleCode, visibility: string): string {
  return WORKSPACE_VISIBILITY_LABELS[locale][visibility] ?? visibility;
}

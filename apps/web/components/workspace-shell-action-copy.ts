"use client";

import { getStoredLocale, type LocaleCode } from "../lib/locale";

type WorkspaceShellActionCopy = {
  loadingWorkspace: string;
  loadWorkspaceDataFailed: string;
  noActiveConversation: string;
  notAuthenticated: string;
  ownerOnlyShareLinks: string;
  viewerReadOnly: string;
};

const COPY: Record<LocaleCode, WorkspaceShellActionCopy> = {
  "zh-CN": {
    loadingWorkspace: "正在加载工作区...",
    loadWorkspaceDataFailed: "加载工作区数据失败",
    noActiveConversation: "当前没有可用会话",
    notAuthenticated: "尚未登录",
    ownerOnlyShareLinks: "仅工作区所有者可以管理分享链接",
    viewerReadOnly: "Viewer 仅可只读访问",
  },
  en: {
    loadingWorkspace: "Loading workspace...",
    loadWorkspaceDataFailed: "Failed to load workspace data",
    noActiveConversation: "No active conversation",
    notAuthenticated: "Not authenticated",
    ownerOnlyShareLinks: "Only workspace owners can manage share links",
    viewerReadOnly: "Viewer access is read-only",
  },
  ja: {
    loadingWorkspace: "ワークスペースを読み込み中...",
    loadWorkspaceDataFailed: "ワークスペースデータの読み込みに失敗しました",
    noActiveConversation: "有効な会話がありません",
    notAuthenticated: "未認証です",
    ownerOnlyShareLinks: "共有リンクを管理できるのはワークスペース所有者のみです",
    viewerReadOnly: "Viewer は読み取り専用です",
  },
};

export function getWorkspaceShellActionCopy(locale: LocaleCode) {
  return COPY[locale];
}

export function getStoredWorkspaceShellActionCopy() {
  return getWorkspaceShellActionCopy(getStoredLocale());
}

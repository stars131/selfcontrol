"use client";

import { getStoredLocale, type LocaleCode } from "../lib/locale";

type ChatPanelActionCopy = {
  auditRefreshFailed: string;
  reindexFailed: string;
  requestFailed: string;
  shareCreationFailed: string;
  shareUpdateFailed: string;
  syncFailed: string;
};

const COPY: Record<LocaleCode, ChatPanelActionCopy> = {
  "zh-CN": {
    auditRefreshFailed: "刷新审计日志失败",
    reindexFailed: "重建知识库索引失败",
    requestFailed: "请求失败",
    shareCreationFailed: "创建分享失败",
    shareUpdateFailed: "更新分享失败",
    syncFailed: "同步失败",
  },
  en: {
    auditRefreshFailed: "Audit refresh failed",
    reindexFailed: "Reindex failed",
    requestFailed: "Request failed",
    shareCreationFailed: "Share creation failed",
    shareUpdateFailed: "Share update failed",
    syncFailed: "Sync failed",
  },
  ja: {
    auditRefreshFailed: "監査ログの更新に失敗しました",
    reindexFailed: "ナレッジの再索引に失敗しました",
    requestFailed: "リクエストに失敗しました",
    shareCreationFailed: "共有の作成に失敗しました",
    shareUpdateFailed: "共有の更新に失敗しました",
    syncFailed: "同期に失敗しました",
  },
};

export function getStoredChatPanelActionCopy() {
  return COPY[getStoredLocale()];
}

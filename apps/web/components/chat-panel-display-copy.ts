"use client";

import { getStoredLocale, type LocaleCode } from "../lib/locale";

type ChatPanelDisplayCopy = {
  headerEyebrow: string;
  headerTitle: string;
  workspaceLabel: string;
  settingsLabel: string;
  newConversationLabel: string;
  syncRemindersLabel: string;
  syncingLabel: string;
  initialConversationTitle: string;
  buildConversationTitle: (index: number) => string;
};

const COPY: Record<LocaleCode, ChatPanelDisplayCopy> = {
  "zh-CN": {
    headerEyebrow: "助手",
    headerTitle: "聊天助手",
    workspaceLabel: "工作区",
    settingsLabel: "设置",
    newConversationLabel: "新建会话",
    syncRemindersLabel: "同步提醒",
    syncingLabel: "同步中...",
    initialConversationTitle: "工作区对话",
    buildConversationTitle: (index) => `对话 ${index}`,
  },
  en: {
    headerEyebrow: "Agent",
    headerTitle: "Chat Assistant",
    workspaceLabel: "Workspace",
    settingsLabel: "Settings",
    newConversationLabel: "New conversation",
    syncRemindersLabel: "Sync reminders",
    syncingLabel: "Syncing...",
    initialConversationTitle: "Workspace chat",
    buildConversationTitle: (index) => `Chat ${index}`,
  },
  ja: {
    headerEyebrow: "エージェント",
    headerTitle: "チャットアシスタント",
    workspaceLabel: "ワークスペース",
    settingsLabel: "設定",
    newConversationLabel: "新しい会話",
    syncRemindersLabel: "リマインダーを同期",
    syncingLabel: "同期中...",
    initialConversationTitle: "ワークスペース会話",
    buildConversationTitle: (index) => `会話 ${index}`,
  },
};

export function getChatPanelDisplayCopy(locale: LocaleCode) {
  return COPY[locale];
}

export function getStoredChatPanelDisplayCopy() {
  return getChatPanelDisplayCopy(getStoredLocale());
}

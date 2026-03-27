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
  composerPlaceholder: string;
  composerViewerPlaceholder: string;
  sendLabel: string;
  workingLabel: string;
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
    composerPlaceholder: "示例：保存这条零食记录、杭州这家火锅不好吃、去年夏天附近那家拉面",
    composerViewerPlaceholder: "当前共享工作区为只读模式，无法创建聊天内容。",
    sendLabel: "发送",
    workingLabel: "处理中...",
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
    composerPlaceholder: "Examples: save this snack note, bad hotpot in Hangzhou, ramen near last summer trip",
    composerViewerPlaceholder: "Viewer mode: chat creation is disabled for this shared workspace.",
    sendLabel: "Send",
    workingLabel: "Working...",
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
    composerPlaceholder: "例: このおやつを記録、杭州のこの火鍋はいまいち、去年の夏旅の近くのラーメン",
    composerViewerPlaceholder: "共有ワークスペースは閲覧専用のため、チャットを作成できません。",
    sendLabel: "送信",
    workingLabel: "処理中...",
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

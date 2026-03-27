import type { LocaleCode } from "./locale";

const CHAT_MESSAGE_THREAD_COPY: Record<LocaleCode, { assistant: string; empty: string; user: string }> = {
  "zh-CN": { assistant: "助手", empty: "先发起一次搜索，或者直接使用保存 / 添加 / 记录，把你的输入转成一条新记录。", user: "你" },
  en: { assistant: "assistant", empty: "Start with a search query, or use save / add / note to turn your message into a new record.", user: "you" },
  ja: { assistant: "アシスタント", empty: "まず検索するか、save / add / note を使ってメッセージを新しい記録に変換してください。", user: "あなた" },
};

export function getChatMessageThreadCopy(locale: LocaleCode) {
  return CHAT_MESSAGE_THREAD_COPY[locale];
}

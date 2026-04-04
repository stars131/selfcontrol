import type { LocaleCode } from "./locale";

const CHAT_MESSAGE_SOURCE_COPY: Record<
  LocaleCode,
  {
    defaultLabel: string;
    moreCount: (count: number) => string;
    relatedRecord: string;
    score: string;
    typeLabels: Record<string, string>;
  }
> = {
  "zh-CN": {
    defaultLabel: "记忆",
    moreCount: (count) => `还有 ${count} 个来源`,
    relatedRecord: "关联记录",
    score: "相关度",
    typeLabels: { chat: "对话", knowledge: "知识", media: "媒体", record: "记录", source: "来源" },
  },
  en: {
    defaultLabel: "memory",
    moreCount: (count) => `${count} more source${count === 1 ? "" : "s"}`,
    relatedRecord: "Related record",
    score: "score",
    typeLabels: { chat: "Chat", knowledge: "Knowledge", media: "Media", record: "Record", source: "Source" },
  },
  ja: {
    defaultLabel: "メモリ",
    moreCount: (count) => `他 ${count} 件のソース`,
    relatedRecord: "関連記録",
    score: "関連度",
    typeLabels: { chat: "会話", knowledge: "ナレッジ", media: "メディア", record: "記録", source: "ソース" },
  },
};

export function getChatMessageSourceTypeLabel(locale: LocaleCode, sourceType?: string | null): string {
  return CHAT_MESSAGE_SOURCE_COPY[locale].typeLabels[sourceType ?? ""] ?? sourceType ?? CHAT_MESSAGE_SOURCE_COPY[locale].typeLabels.source;
}

export function getChatMessageSourceDefaultLabel(locale: LocaleCode): string {
  return CHAT_MESSAGE_SOURCE_COPY[locale].defaultLabel;
}

export function getChatMessageSourceRelatedRecordLabel(locale: LocaleCode): string {
  return CHAT_MESSAGE_SOURCE_COPY[locale].relatedRecord;
}

export function getChatMessageSourceScoreLabel(locale: LocaleCode): string {
  return CHAT_MESSAGE_SOURCE_COPY[locale].score;
}

export function getChatMessageSourceMoreCountLabel(locale: LocaleCode, count: number): string {
  return CHAT_MESSAGE_SOURCE_COPY[locale].moreCount(count);
}

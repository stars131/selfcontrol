import type { LocaleCode } from "../lib/locale";

export type LandingPageCopy = {
  eyebrow: string;
  title: string;
  description: string;
  createAccount: string;
  signIn: string;
  captureTitle: string;
  captureValue: string;
  retrieveTitle: string;
  retrieveValue: string;
  operateTitle: string;
  operateValue: string;
};

const LANDING_PAGE_COPY: Record<LocaleCode, LandingPageCopy> = {
  "zh-CN": {
    eyebrow: "SelfControl",
    title: "个人记忆工作台",
    description:
      "SelfControl 是一个多模态记忆系统，用来记录备忘、饮食体验、避雷清单、附件内容、地图位置，以及通过助手驱动的查询与整理流程。",
    createAccount: "创建账号",
    signIn: "登录",
    captureTitle: "采集",
    captureValue: "文字 / 语音 / 图片 / 视频",
    retrieveTitle: "检索",
    retrieveValue: "筛选 + 关键词 + 语义搜索",
    operateTitle: "交互",
    operateValue: "左侧聊天，右侧结构化卡片",
  },
  en: {
    eyebrow: "SelfControl",
    title: "Personal Memory Workspace",
    description:
      "SelfControl is a multi-modal memory system for notes, food records, warning lists, media attachments, search, maps, and an assistant-driven workflow.",
    createAccount: "Create Account",
    signIn: "Sign In",
    captureTitle: "Capture",
    captureValue: "text / voice / image / video",
    retrieveTitle: "Retrieve",
    retrieveValue: "filters + text + semantic search",
    operateTitle: "Operate",
    operateValue: "chat left, structured cards right",
  },
  ja: {
    eyebrow: "SelfControl",
    title: "個人メモリーワークスペース",
    description:
      "SelfControl は、メモ、食事記録、注意リスト、メディア添付、検索、地図、アシスタント主導の操作をまとめるマルチモーダル記憶システムです。",
    createAccount: "アカウント作成",
    signIn: "ログイン",
    captureTitle: "記録",
    captureValue: "テキスト / 音声 / 画像 / 動画",
    retrieveTitle: "検索",
    retrieveValue: "フィルター + キーワード + セマンティック検索",
    operateTitle: "操作",
    operateValue: "左チャット、右構造化カード",
  },
};

export function getLandingPageCopy(locale: LocaleCode): LandingPageCopy {
  return LANDING_PAGE_COPY[locale];
}

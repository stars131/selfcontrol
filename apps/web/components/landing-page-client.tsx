"use client";

import Link from "next/link";

import { useStoredLocale, type LocaleCode } from "../lib/locale";
import { LanguageSwitcher } from "./language-switcher";

const COPY: Record<
  LocaleCode,
  {
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
  }
> = {
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

const DISPLAY_COPY: Record<
  LocaleCode,
  {
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
  }
> = {
  "zh-CN": {
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

export function LandingPageClient() {
  const { locale, setLocale } = useStoredLocale();
  const copy = { ...COPY[locale], ...DISPLAY_COPY[locale] };

  return (
    <main className="page-shell">
      <section className="panel" style={{ maxWidth: 960, margin: "0 auto" }}>
        <div className="panel-header">
          <div>
            <div className="eyebrow">{copy.eyebrow}</div>
            <h1 className="title">{copy.title}</h1>
          </div>
          <div className="hero-actions">
            <LanguageSwitcher locale={locale} onChange={setLocale} />
            <Link className="button secondary" href="/register">
              {copy.createAccount}
            </Link>
            <Link className="button" href="/login">
              {copy.signIn}
            </Link>
          </div>
        </div>
        <div className="panel-body">
          <p className="muted" style={{ lineHeight: 1.7, maxWidth: 720 }}>
            {copy.description}
          </p>
          <div className="stats-grid" style={{ marginTop: 20 }}>
            <div className="stat-card">
              <div className="eyebrow">{copy.captureTitle}</div>
              <div className="title" style={{ fontSize: 18 }}>
                {copy.captureValue}
              </div>
            </div>
            <div className="stat-card">
              <div className="eyebrow">{copy.retrieveTitle}</div>
              <div className="title" style={{ fontSize: 18 }}>
                {copy.retrieveValue}
              </div>
            </div>
            <div className="stat-card">
              <div className="eyebrow">{copy.operateTitle}</div>
              <div className="title" style={{ fontSize: 18 }}>
                {copy.operateValue}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

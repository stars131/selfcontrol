"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getCurrentUser, getKnowledgeStats, listProviderConfigs, updateProviderConfig } from "../lib/api";
import { clearStoredSession, getStoredToken } from "../lib/auth";
import { useStoredLocale, type LocaleCode } from "../lib/locale";
import type { KnowledgeStats, ProviderFeatureConfig, User } from "../lib/types";
import { LanguageSwitcher } from "./language-switcher";
import { ProviderSettingsPanel } from "./provider-settings-panel";

const COPY: Record<
  LocaleCode,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    back: string;
    providerTitle: string;
    apiTitle: string;
    apiDescription: string;
    apiBaseLabel: string;
    mapKeyLabel: string;
    mapKeyReady: string;
    mapKeyMissing: string;
    knowledgeTitle: string;
    loading: string;
  }
> = {
  "zh-CN": {
    eyebrow: "设置",
    title: "工作区设置",
    subtitle: "管理 AI provider、API 地址以及当前工作区的知识库配置。",
    back: "返回工作区",
    providerTitle: "AI Provider",
    apiTitle: "API 接入",
    apiDescription: "浏览器侧只保存 provider 选择、模型名、API Base URL 和环境变量名，真正的密钥继续保存在服务器环境变量中。",
    apiBaseLabel: "当前前端 API Base URL",
    mapKeyLabel: "高德地图 Key 状态",
    mapKeyReady: "已配置",
    mapKeyMissing: "未配置",
    knowledgeTitle: "知识库状态",
    loading: "正在加载设置...",
  },
  en: {
    eyebrow: "Settings",
    title: "Workspace Settings",
    subtitle: "Manage AI providers, API endpoints, and knowledge-base settings for this workspace.",
    back: "Back to workspace",
    providerTitle: "AI Providers",
    apiTitle: "API Integration",
    apiDescription:
      "The browser only stores provider selection, model name, API base URL, and env var names. Real secrets stay on the server.",
    apiBaseLabel: "Current frontend API base URL",
    mapKeyLabel: "AMap key status",
    mapKeyReady: "Configured",
    mapKeyMissing: "Missing",
    knowledgeTitle: "Knowledge status",
    loading: "Loading settings...",
  },
  ja: {
    eyebrow: "設定",
    title: "ワークスペース設定",
    subtitle: "このワークスペースの AI プロバイダー、API エンドポイント、知識ベース設定を管理します。",
    back: "ワークスペースへ戻る",
    providerTitle: "AI プロバイダー",
    apiTitle: "API 連携",
    apiDescription:
      "ブラウザにはプロバイダー選択、モデル名、API Base URL、環境変数名のみ保存します。実際の秘密鍵はサーバー側に保持します。",
    apiBaseLabel: "現在のフロントエンド API Base URL",
    mapKeyLabel: "AMap キー状態",
    mapKeyReady: "設定済み",
    mapKeyMissing: "未設定",
    knowledgeTitle: "知識ベース状態",
    loading: "設定を読み込み中...",
  },
};

export function WorkspaceSettingsClient({ workspaceId }: { workspaceId: string }) {
  const router = useRouter();
  const { locale, setLocale } = useStoredLocale();
  const copy = COPY[locale];
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [providerConfigs, setProviderConfigs] = useState<ProviderFeatureConfig[]>([]);
  const [knowledgeStats, setKnowledgeStats] = useState<KnowledgeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const activeToken = getStoredToken();
    if (!activeToken) {
      router.replace("/login");
      return;
    }

    const load = async () => {
      try {
        setToken(activeToken);
        const [me, providerResult, knowledgeResult] = await Promise.all([
          getCurrentUser(activeToken),
          listProviderConfigs(activeToken, workspaceId),
          getKnowledgeStats(activeToken, workspaceId),
        ]);
        setUser(me.user);
        setProviderConfigs(providerResult.items);
        setKnowledgeStats(knowledgeResult.stats);
      } catch (caught) {
        clearStoredSession();
        setError(caught instanceof Error ? caught.message : "Failed to load settings");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [router, workspaceId]);

  const handleSaveProviderConfig = async (
    featureCode: string,
    input: {
      provider_code: string;
      model_name?: string | null;
      is_enabled: boolean;
      api_base_url?: string | null;
      api_key_env_name?: string | null;
    },
  ) => {
    if (!token) {
      throw new Error("Not authenticated");
    }

    const result = await updateProviderConfig(token, workspaceId, featureCode, {
      ...input,
      options_json: {},
    });
    setProviderConfigs((current) =>
      current.map((item) => (item.feature_code === featureCode ? result.config : item)),
    );
  };

  if (loading) {
    return (
      <main className="page-shell">
        <section className="panel auth-panel">
          <div className="panel-body">
            <div className="notice">{copy.loading}</div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="panel" style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div className="panel-header">
          <div>
            <div className="eyebrow">{copy.eyebrow}</div>
            <h1 className="title">{copy.title}</h1>
            <div className="muted" style={{ marginTop: 8 }}>
              {copy.subtitle}
            </div>
            {user ? (
              <div className="muted" style={{ marginTop: 8 }}>
                {user.username}
              </div>
            ) : null}
          </div>
          <div className="hero-actions">
            <LanguageSwitcher locale={locale} onChange={setLocale} />
            <Link className="button secondary" href={`/app/workspaces/${workspaceId}`}>
              {copy.back}
            </Link>
          </div>
        </div>
        <div className="panel-body">
          {error ? <div className="notice error" style={{ marginBottom: 16 }}>{error}</div> : null}
          <div className="two-column-grid">
            <section className="record-card">
              <div className="eyebrow">{copy.apiTitle}</div>
              <div className="muted" style={{ marginTop: 8, lineHeight: 1.7 }}>
                {copy.apiDescription}
              </div>
              <div className="detail-grid" style={{ marginTop: 16 }}>
                <div className="subtle-card">
                  <div className="eyebrow">{copy.apiBaseLabel}</div>
                  <div style={{ marginTop: 8, wordBreak: "break-all", fontWeight: 600 }}>
                    {process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1"}
                  </div>
                </div>
                <div className="subtle-card">
                  <div className="eyebrow">{copy.mapKeyLabel}</div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>
                    {process.env.NEXT_PUBLIC_AMAP_KEY ? copy.mapKeyReady : copy.mapKeyMissing}
                  </div>
                </div>
                <div className="subtle-card">
                  <div className="eyebrow">{copy.knowledgeTitle}</div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>
                    {knowledgeStats
                      ? `${knowledgeStats.chunk_count} chunks / ${knowledgeStats.record_count} records`
                      : "-"}
                  </div>
                </div>
              </div>
            </section>
            <ProviderSettingsPanel
              onSaveProviderConfig={handleSaveProviderConfig}
              providerConfigs={providerConfigs}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import type { LocaleCode } from "../lib/locale";
import type { MediaStorageProviderHealth, ProviderFeatureConfig } from "../lib/types";
import { ProviderFeatureCard } from "./provider-feature-card";
import { ProviderSettingsJumpNav } from "./provider-settings-jump-nav";
import { useProviderSettingsController } from "./use-provider-settings-controller";

const COPY: Record<
  LocaleCode,
  {
    title: string;
    subtitle: string;
    jumpTo: string;
    enabled: string;
    provider: string;
    modelName: string;
    apiBaseUrl: string;
    apiKeyEnvName: string;
    fallbackToLocal: string;
    autoRetry: string;
    retryAttempts: string;
    retryBackoff: string;
    retryHint: string;
    defaultProfile: string;
    workspaceOverride: string;
    secret: string;
    customEndpoint: string;
    defaultEndpoint: string;
    storageHealth: string;
    refreshHealth: string;
    refreshing: string;
    reachable: string;
    unreachable: string;
    available: string;
    unavailable: string;
    upload: string;
    download: string;
    delete: string;
    checkedAt: string;
    endpointRoot: string;
    saveProvider: string;
    saving: string;
    reset: string;
    unsavedChanges: string;
    healthSection: string;
    configured: string;
    missing: string;
    notRequired: string;
  }
> = {
  "zh-CN": {
    title: "提供商设置",
    subtitle: "分别配置每个 AI 功能。这里仅保存环境变量名，不保存真实密钥。",
    jumpTo: "跳转到",
    enabled: "启用",
    provider: "提供商",
    modelName: "模型名称",
    apiBaseUrl: "API Base URL",
    apiKeyEnvName: "API 密钥环境变量名",
    fallbackToLocal: "远端上传失败时回退到本地存储",
    autoRetry: "启用远端处理自动重试",
    retryAttempts: "最大远端重试次数",
    retryBackoff: "重试退避秒数，例如 60,300,900",
    retryHint: "这些重试设置会应用到当前工作区的远端媒体恢复流程。",
    defaultProfile: "使用默认配置",
    workspaceOverride: "已保存工作区覆盖配置",
    secret: "密钥",
    customEndpoint: "自定义端点",
    defaultEndpoint: "默认端点",
    storageHealth: "存储健康状态",
    refreshHealth: "刷新健康状态",
    refreshing: "刷新中...",
    reachable: "可达",
    unreachable: "不可达",
    available: "可用",
    unavailable: "不可用",
    upload: "上传",
    download: "下载",
    delete: "删除",
    checkedAt: "检查时间",
    endpointRoot: "端点根地址",
    saveProvider: "保存提供商",
    saving: "保存中...",
    reset: "重置",
    unsavedChanges: "有未保存变更",
    healthSection: "存储健康",
    configured: "已配置",
    missing: "缺失",
    notRequired: "不需要",
  },
  en: {
    title: "Provider Settings",
    subtitle: "Configure each AI feature separately. Secrets stay in environment variables and this page only stores env var names.",
    jumpTo: "Jump to",
    enabled: "Enabled",
    provider: "Provider",
    modelName: "Model name",
    apiBaseUrl: "API base URL",
    apiKeyEnvName: "API key env name",
    fallbackToLocal: "Fallback to local storage if remote upload fails",
    autoRetry: "Enable automatic remote processing retries",
    retryAttempts: "Max remote retry attempts",
    retryBackoff: "Retry backoff seconds, e.g. 60,300,900",
    retryHint: "Retry settings apply to remote media extraction recovery in this workspace.",
    defaultProfile: "Using default profile",
    workspaceOverride: "Workspace override saved",
    secret: "secret",
    customEndpoint: "custom endpoint",
    defaultEndpoint: "default endpoint",
    storageHealth: "Storage health",
    refreshHealth: "Refresh health",
    refreshing: "Refreshing...",
    reachable: "reachable",
    unreachable: "unreachable",
    available: "Available",
    unavailable: "Unavailable",
    upload: "Upload",
    download: "Download",
    delete: "Delete",
    checkedAt: "Checked at",
    endpointRoot: "Endpoint root",
    saveProvider: "Save provider",
    saving: "Saving...",
    reset: "Reset",
    unsavedChanges: "Unsaved changes",
    healthSection: "Storage health",
    configured: "configured",
    missing: "missing",
    notRequired: "not required",
  },
  ja: {
    title: "プロバイダー設定",
    subtitle: "各 AI 機能を個別に設定します。この画面には環境変数名のみを保存し、実際の秘密情報は保存しません。",
    jumpTo: "移動",
    enabled: "有効",
    provider: "プロバイダー",
    modelName: "モデル名",
    apiBaseUrl: "API Base URL",
    apiKeyEnvName: "API キー環境変数名",
    fallbackToLocal: "リモートアップロード失敗時はローカル保存にフォールバック",
    autoRetry: "リモート処理の自動再試行を有効化",
    retryAttempts: "最大再試行回数",
    retryBackoff: "再試行待機秒数。例: 60,300,900",
    retryHint: "これらの再試行設定は、このワークスペースのリモート媒体復旧に適用されます。",
    defaultProfile: "デフォルト設定を使用中",
    workspaceOverride: "ワークスペース上書きを保存済み",
    secret: "シークレット",
    customEndpoint: "カスタムエンドポイント",
    defaultEndpoint: "デフォルトエンドポイント",
    storageHealth: "保存先の健全性",
    refreshHealth: "健全性を更新",
    refreshing: "更新中...",
    reachable: "到達可能",
    unreachable: "到達不可",
    available: "利用可能",
    unavailable: "利用不可",
    upload: "アップロード",
    download: "ダウンロード",
    delete: "削除",
    checkedAt: "確認時刻",
    endpointRoot: "エンドポイントルート",
    saveProvider: "保存",
    saving: "保存中...",
    reset: "リセット",
    unsavedChanges: "未保存の変更あり",
    healthSection: "保存先健全性",
    configured: "設定済み",
    missing: "未設定",
    notRequired: "不要",
  },
};

function readAnchorHighlightClass(targetId: string, highlightedAnchor?: string | null): string {
  return highlightedAnchor === targetId ? " anchor-highlight" : "";
}

export function ProviderSettingsPanel({
  locale,
  providerConfigs,
  mediaStorageHealth = null,
  refreshingMediaStorageHealth = false,
  highlightedAnchor = null,
  onRefreshMediaStorageHealth,
  onSaveProviderConfig,
}: {
  locale: LocaleCode;
  providerConfigs: ProviderFeatureConfig[];
  mediaStorageHealth?: MediaStorageProviderHealth | null;
  refreshingMediaStorageHealth?: boolean;
  highlightedAnchor?: string | null;
  onRefreshMediaStorageHealth?: (() => Promise<void>) | null;
  onSaveProviderConfig: (
    featureCode: string,
    input: {
      provider_code: string;
      model_name?: string | null;
      is_enabled: boolean;
      api_base_url?: string | null;
      api_key_env_name?: string | null;
      options_json?: Record<string, unknown>;
    },
  ) => Promise<void>;
}) {
  const copy = COPY[locale];
  const {
    providerSavingCode,
    providerDrafts,
    error,
    handleProviderDraftChange,
    handleSaveProviderConfig,
    handleResetProviderConfig,
    isProviderDraftDirty,
  } = useProviderSettingsController({
    providerConfigs,
    onSaveProviderConfig,
  });

  const formatSecretStatus = (status: ProviderFeatureConfig["secret_status"]) => {
    if (status === "configured") {
      return copy.configured;
    }
    if (status === "missing") {
      return copy.missing;
    }
    return copy.notRequired;
  };

  return (
    <section
      className={`record-card${readAnchorHighlightClass("provider-settings", highlightedAnchor)}`}
      id="provider-settings"
    >
      <div className="eyebrow">{copy.title}</div>
      <div className="muted" style={{ marginTop: 8 }}>
        {copy.subtitle}
      </div>
      {error ? <div className="notice error" style={{ marginTop: 12 }}>{error}</div> : null}
      <ProviderSettingsJumpNav
        healthSectionLabel={copy.healthSection}
        jumpToLabel={copy.jumpTo}
        providerConfigs={providerConfigs}
      />
      <div className="record-list compact-list" style={{ marginTop: 12 }}>
        {providerConfigs.map((item) => {
          const draftItem = providerDrafts[item.feature_code];
          if (!draftItem) {
            return null;
          }
          const isDirty = isProviderDraftDirty(item);

          return (
            <ProviderFeatureCard
              copy={copy}
              draftItem={draftItem}
              formatSecretStatus={formatSecretStatus}
              highlightedAnchor={highlightedAnchor}
              isDirty={isDirty}
              key={item.feature_code}
              item={item}
              locale={locale}
              mediaStorageHealth={mediaStorageHealth}
              onProviderDraftChange={handleProviderDraftChange}
              onRefreshMediaStorageHealth={onRefreshMediaStorageHealth}
              onReset={handleResetProviderConfig}
              onSave={handleSaveProviderConfig}
              providerSavingCode={providerSavingCode}
              refreshingMediaStorageHealth={refreshingMediaStorageHealth}
            />
          );
        })}
      </div>
    </section>
  );
}

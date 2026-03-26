import type { LocaleCode } from "./locale";
import type { MediaProcessingIssue } from "./types";

const ISSUE_CATEGORY_LABELS: Record<LocaleCode, Record<string, string>> = {
  "zh-CN": {
    local_file_missing: "本地文件缺失",
    provider_disabled: "提供商未启用",
    missing_secret: "缺少密钥",
    provider_config_error: "提供商配置异常",
    provider_unsupported: "提供商不支持当前路径",
    remote_asset_missing: "远端文件不存在",
    transient_remote_failure: "远端临时故障",
    provider_not_ready: "提供商尚未就绪",
    retry_budget_exhausted: "重试额度已耗尽",
    auto_retry_disabled: "自动重试已关闭",
    manual_recovery_required: "需要人工恢复",
    remote_fetch_failed: "远端拉取失败",
    unknown_processing_issue: "未知处理问题",
  },
  en: {
    local_file_missing: "Local file missing",
    provider_disabled: "Provider disabled",
    missing_secret: "Missing secret",
    provider_config_error: "Provider config error",
    provider_unsupported: "Unsupported provider path",
    remote_asset_missing: "Remote asset missing",
    transient_remote_failure: "Transient remote failure",
    provider_not_ready: "Provider not ready",
    retry_budget_exhausted: "Retry budget exhausted",
    auto_retry_disabled: "Auto retry disabled",
    manual_recovery_required: "Manual recovery required",
    remote_fetch_failed: "Remote fetch failed",
    unknown_processing_issue: "Unknown processing issue",
  },
  ja: {
    local_file_missing: "ローカルファイルがありません",
    provider_disabled: "プロバイダーが無効です",
    missing_secret: "シークレットが未設定です",
    provider_config_error: "プロバイダー設定エラー",
    provider_unsupported: "未対応のプロバイダーパス",
    remote_asset_missing: "リモート資産が見つかりません",
    transient_remote_failure: "一時的なリモート障害",
    provider_not_ready: "プロバイダーが未準備です",
    retry_budget_exhausted: "再試行上限に達しました",
    auto_retry_disabled: "自動再試行が無効です",
    manual_recovery_required: "手動復旧が必要です",
    remote_fetch_failed: "リモート取得に失敗しました",
    unknown_processing_issue: "不明な処理エラー",
  },
};

const ACTION_LABELS: Record<LocaleCode, Record<string, string>> = {
  "zh-CN": {
    restore_or_delete_local_file: "恢复文件或删除媒体记录",
    enable_provider: "启用对应的提取提供商",
    configure_secret: "配置提供商密钥",
    fix_provider_config: "修正提供商设置",
    switch_provider: "切换到受支持的提供商",
    review_remote_asset: "检查远端文件或清理失效引用",
    retry_after_remote_check: "检查远端服务后重试",
    retry_when_ready: "等待提供商完成后重试",
    increase_retry_budget_or_retry_now: "调整重试策略或手动重试",
    enable_auto_retry_or_retry_now: "开启自动重试或手动重试",
    manual_retry: "人工确认后重试",
    check_remote_storage_health: "检查远端存储健康状态",
    review_and_retry: "检查错误详情后重试",
  },
  en: {
    restore_or_delete_local_file: "Restore file or delete media record",
    enable_provider: "Enable the extraction provider",
    configure_secret: "Configure the provider secret",
    fix_provider_config: "Fix provider settings",
    switch_provider: "Switch to a supported provider",
    review_remote_asset: "Review remote asset or stale reference",
    retry_after_remote_check: "Retry after checking remote service health",
    retry_when_ready: "Retry when provider processing is ready",
    increase_retry_budget_or_retry_now: "Tune retry policy or retry manually",
    enable_auto_retry_or_retry_now: "Enable auto retry or retry manually",
    manual_retry: "Retry manually after review",
    check_remote_storage_health: "Check remote storage health",
    review_and_retry: "Review error details and retry",
  },
  ja: {
    restore_or_delete_local_file: "ファイルを復元するか媒体記録を削除",
    enable_provider: "抽出プロバイダーを有効化",
    configure_secret: "プロバイダーのシークレットを設定",
    fix_provider_config: "プロバイダー設定を修正",
    switch_provider: "対応済みプロバイダーに切り替え",
    review_remote_asset: "リモート資産または古い参照を確認",
    retry_after_remote_check: "リモートサービス確認後に再試行",
    retry_when_ready: "プロバイダー準備完了後に再試行",
    increase_retry_budget_or_retry_now: "再試行ポリシーを調整するか手動再試行",
    enable_auto_retry_or_retry_now: "自動再試行を有効化するか手動再試行",
    manual_retry: "確認後に手動再試行",
    check_remote_storage_health: "リモート保存先の健全性を確認",
    review_and_retry: "詳細確認後に再試行",
  },
};

const ACTION_DETAIL_LABELS: Record<LocaleCode, Record<string, string>> = {
  "zh-CN": {
    restore_or_delete_local_file: "元数据还在，但磁盘上的本地文件已经不存在。",
    enable_provider: "先在工作区中开启 OCR、ASR 或视频转写提供商，再进行重试。",
    configure_secret: "先在服务端环境变量中配置所需密钥，再重新处理。",
    fix_provider_config: "请先检查当前工作区的媒体存储端点和提供商配置。",
    switch_provider: "当前媒体类型或传输模式暂不支持这个提供商流程。",
    review_remote_asset: "远端对象可能已被外部删除，需要确认或移除失效引用。",
    retry_after_remote_check: "远端服务当前看起来可能限流或暂时不可用。",
    retry_when_ready: "上游已接收媒体，但处理尚未完成。",
    increase_retry_budget_or_retry_now: "自动重试因达到工作区上限而停止。",
    enable_auto_retry_or_retry_now: "当前工作区关闭了远端媒体自动重试。",
    manual_retry: "这个问题被标记为不适合自动重试，需要人工判断。",
    check_remote_storage_health: "服务器在拉取远端媒体内容时失败。",
    review_and_retry: "建议先查看提供商设置和错误详情再决定是否重试。",
  },
  en: {
    restore_or_delete_local_file: "The metadata still exists, but the local file is missing from disk.",
    enable_provider: "Turn on the workspace OCR, ASR, or video transcription provider before retrying.",
    configure_secret: "Set the required server-side API key environment variable, then retry processing.",
    fix_provider_config: "Review the workspace media storage endpoint and provider configuration before retrying.",
    switch_provider: "The selected provider flow is not supported for this media type or transport mode yet.",
    review_remote_asset: "The stored remote object may have been deleted outside SelfControl.",
    retry_after_remote_check: "The remote provider looks temporarily unavailable or rate-limited.",
    retry_when_ready: "The upstream provider accepted the media but has not finished processing it yet.",
    increase_retry_budget_or_retry_now: "Automatic retries stopped after reaching the workspace retry limit.",
    enable_auto_retry_or_retry_now: "This workspace currently disables automatic remote media retries.",
    manual_retry: "This issue was marked as unsuitable for automatic retry and needs operator review.",
    check_remote_storage_health: "The server failed while fetching the remote media content for processing.",
    review_and_retry: "Inspect provider settings and the stored error details before retrying.",
  },
  ja: {
    restore_or_delete_local_file: "メタデータは残っていますが、ローカルファイルがディスク上にありません。",
    enable_provider: "再試行の前に、ワークスペースで OCR、ASR、または動画転写を有効にしてください。",
    configure_secret: "必要なサーバー側 API キー環境変数を設定してから再試行してください。",
    fix_provider_config: "再試行前にワークスペースの媒体保存先エンドポイントと設定を確認してください。",
    switch_provider: "この媒体種別または転送方式では現在のプロバイダーフローは未対応です。",
    review_remote_asset: "保存済みのリモートオブジェクトが外部で削除された可能性があります。",
    retry_after_remote_check: "リモートサービスが一時的に不安定またはレート制限中の可能性があります。",
    retry_when_ready: "上流プロバイダーは受け付けましたが、処理はまだ完了していません。",
    increase_retry_budget_or_retry_now: "ワークスペースの再試行上限に達したため自動再試行が停止しました。",
    enable_auto_retry_or_retry_now: "このワークスペースではリモート媒体の自動再試行が無効です。",
    manual_retry: "この問題は自動再試行に不向きと判定され、運用者の確認が必要です。",
    check_remote_storage_health: "リモート媒体の取得中にサーバー側で失敗しました。",
    review_and_retry: "再試行前に設定と保存済みエラー詳細を確認してください。",
  },
};

const RETRY_STATE_LABELS: Record<LocaleCode, Record<string, string>> = {
  "zh-CN": {
    manual_only: "仅人工恢复",
    exhausted: "重试已耗尽",
    disabled: "自动重试关闭",
    scheduled: "等待自动重试",
    idle: "空闲",
  },
  en: {
    manual_only: "Manual only",
    exhausted: "Retry exhausted",
    disabled: "Auto retry disabled",
    scheduled: "Retry scheduled",
    idle: "Idle",
  },
  ja: {
    manual_only: "手動のみ",
    exhausted: "再試行上限到達",
    disabled: "自動再試行オフ",
    scheduled: "再試行待ち",
    idle: "待機中",
  },
};

const PROCESSING_STATUS_LABELS: Record<LocaleCode, Record<string, string>> = {
  "zh-CN": {
    pending: "待处理",
    processing: "处理中",
    completed: "已完成",
    failed: "失败",
    deferred: "已延后",
  },
  en: {
    pending: "Pending",
    processing: "Processing",
    completed: "Completed",
    failed: "Failed",
    deferred: "Deferred",
  },
  ja: {
    pending: "待機中",
    processing: "処理中",
    completed: "完了",
    failed: "失敗",
    deferred: "保留",
  },
};

const REMOTE_FETCH_STATUS_LABELS: Record<LocaleCode, Record<string, string>> = {
  "zh-CN": {
    downloaded: "已拉取",
    failed: "拉取失败",
  },
  en: {
    downloaded: "downloaded",
    failed: "fetch failed",
  },
  ja: {
    downloaded: "取得済み",
    failed: "取得失敗",
  },
};

export function getMediaIssueLabel(locale: LocaleCode, issue: Pick<MediaProcessingIssue, "issue_category" | "issue_label">): string | null {
  const issueCategory = issue.issue_category ?? "";
  return ISSUE_CATEGORY_LABELS[locale][issueCategory] ?? issue.issue_label ?? null;
}

export function getMediaIssueAction(locale: LocaleCode, issue: Pick<MediaProcessingIssue, "recommended_action_code" | "recommended_action_label" | "recommended_action_detail">): {
  label: string | null;
  detail: string | null;
} {
  const actionCode = issue.recommended_action_code ?? "";
  return {
    label: ACTION_LABELS[locale][actionCode] ?? issue.recommended_action_label ?? null,
    detail: ACTION_DETAIL_LABELS[locale][actionCode] ?? issue.recommended_action_detail ?? null,
  };
}

export function getRetryStateLabel(locale: LocaleCode, retryState?: string | null): string | null {
  if (!retryState) {
    return null;
  }
  return RETRY_STATE_LABELS[locale][retryState] ?? retryState;
}

export function getProcessingStatusLabel(locale: LocaleCode, processingStatus: string): string {
  return PROCESSING_STATUS_LABELS[locale][processingStatus] ?? processingStatus;
}

export function getRemoteFetchStatusLabel(locale: LocaleCode, remoteFetchStatus?: string | null): string | null {
  if (!remoteFetchStatus) {
    return null;
  }
  return REMOTE_FETCH_STATUS_LABELS[locale][remoteFetchStatus] ?? remoteFetchStatus;
}

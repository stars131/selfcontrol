import type { LocaleCode } from "./locale";
import type { AuditLogItem } from "./types";

type AuditLogCardCopy = {
  title: string;
  refresh: string;
  refreshing: string;
  empty: string;
};

const AUDIT_LOG_CARD_COPY: Record<LocaleCode, AuditLogCardCopy> = {
  en: {
    title: "Audit Logs",
    refresh: "Refresh logs",
    refreshing: "Refreshing...",
    empty: "No audit logs yet.",
  },
  "zh-CN": {
    title: "审计日志",
    refresh: "刷新日志",
    refreshing: "刷新中...",
    empty: "还没有审计日志。",
  },
  ja: {
    title: "監査ログ",
    refresh: "ログを更新",
    refreshing: "更新中...",
    empty: "監査ログはまだありません。",
  },
};

const AUDIT_LOG_ACTION_LABELS: Record<LocaleCode, Record<string, string>> = {
  en: {
    "knowledge.reindex": "Knowledge reindex",
    "media.delete": "Delete media",
    "media.dead_letter_bulk_retry": "Bulk retry dead-letter media",
    "media.retention_archive": "Archive retained media",
    "media.retention_cleanup": "Clean retained media",
    "media.retry_processing": "Retry media processing",
    "media.upload": "Upload media",
    "provider_config.update": "Update provider config",
    "record.create": "Create record",
    "record.create_from_chat": "Create record from chat",
    "record.delete": "Delete record",
    "record.update": "Update record",
    "search_preset.create": "Create search preset",
    "search_preset.delete": "Delete search preset",
    "search_preset.update": "Update search preset",
    "share_link.accept": "Accept share link",
    "share_link.create": "Create share link",
    "share_link.update": "Update share link",
    "workspace.export": "Export workspace",
    "workspace.import": "Import workspace",
    "workspace_member.remove": "Remove workspace member",
    "workspace_member.update_role": "Update workspace role",
  },
  "zh-CN": {
    "knowledge.reindex": "重建知识库索引",
    "media.delete": "删除媒体",
    "media.dead_letter_bulk_retry": "批量重试死信媒体",
    "media.retention_archive": "归档保留媒体",
    "media.retention_cleanup": "清理保留媒体",
    "media.retry_processing": "重试媒体处理",
    "media.upload": "上传媒体",
    "provider_config.update": "更新模型配置",
    "record.create": "创建记录",
    "record.create_from_chat": "从聊天创建记录",
    "record.delete": "删除记录",
    "record.update": "更新记录",
    "search_preset.create": "创建搜索预设",
    "search_preset.delete": "删除搜索预设",
    "search_preset.update": "更新搜索预设",
    "share_link.accept": "接受共享链接",
    "share_link.create": "创建共享链接",
    "share_link.update": "更新共享链接",
    "workspace.export": "导出工作区",
    "workspace.import": "导入工作区",
    "workspace_member.remove": "移除工作区成员",
    "workspace_member.update_role": "更新工作区角色",
  },
  ja: {
    "knowledge.reindex": "知識ベースを再索引",
    "media.delete": "メディアを削除",
    "media.dead_letter_bulk_retry": "デッドレターメディアを一括再試行",
    "media.retention_archive": "保持対象メディアをアーカイブ",
    "media.retention_cleanup": "保持対象メディアをクリーンアップ",
    "media.retry_processing": "メディア処理を再試行",
    "media.upload": "メディアをアップロード",
    "provider_config.update": "モデル設定を更新",
    "record.create": "記録を作成",
    "record.create_from_chat": "チャットから記録を作成",
    "record.delete": "記録を削除",
    "record.update": "記録を更新",
    "search_preset.create": "検索プリセットを作成",
    "search_preset.delete": "検索プリセットを削除",
    "search_preset.update": "検索プリセットを更新",
    "share_link.accept": "共有リンクを承認",
    "share_link.create": "共有リンクを作成",
    "share_link.update": "共有リンクを更新",
    "workspace.export": "ワークスペースをエクスポート",
    "workspace.import": "ワークスペースをインポート",
    "workspace_member.remove": "ワークスペースメンバーを削除",
    "workspace_member.update_role": "ワークスペース権限を更新",
  },
};

const AUDIT_LOG_RESOURCE_LABELS: Record<LocaleCode, Record<string, string>> = {
  en: {
    knowledge_index: "Knowledge index",
    media_asset: "Media asset",
    provider_config: "Provider config",
    record: "Record",
    search_preset: "Search preset",
    share_link: "Share link",
    workspace: "Workspace",
    workspace_member: "Workspace member",
  },
  "zh-CN": {
    knowledge_index: "知识库索引",
    media_asset: "媒体资源",
    provider_config: "模型配置",
    record: "记录",
    search_preset: "搜索预设",
    share_link: "共享链接",
    workspace: "工作区",
    workspace_member: "工作区成员",
  },
  ja: {
    knowledge_index: "知識インデックス",
    media_asset: "メディア資産",
    provider_config: "モデル設定",
    record: "記録",
    search_preset: "検索プリセット",
    share_link: "共有リンク",
    workspace: "ワークスペース",
    workspace_member: "ワークスペースメンバー",
  },
};

const AUDIT_LOG_STATUS_LABELS: Record<LocaleCode, Record<string, string>> = {
  en: {
    failed: "failed",
    success: "success",
  },
  "zh-CN": {
    failed: "失败",
    success: "成功",
  },
  ja: {
    failed: "失敗",
    success: "成功",
  },
};

export function getAuditLogCardCopy(locale: LocaleCode): AuditLogCardCopy {
  return AUDIT_LOG_CARD_COPY[locale];
}

export function getAuditLogActionLabel(locale: LocaleCode, actionCode: AuditLogItem["action_code"]): string {
  return AUDIT_LOG_ACTION_LABELS[locale][actionCode] ?? actionCode;
}

export function getAuditLogResourceLabel(locale: LocaleCode, resourceType: AuditLogItem["resource_type"]): string {
  return AUDIT_LOG_RESOURCE_LABELS[locale][resourceType] ?? resourceType;
}

export function getAuditLogStatusLabel(locale: LocaleCode, status: AuditLogItem["status"]): string {
  return AUDIT_LOG_STATUS_LABELS[locale][status] ?? status;
}

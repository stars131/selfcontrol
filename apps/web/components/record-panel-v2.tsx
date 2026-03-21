"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

import { fetchMediaBlob } from "../lib/api";
import { useStoredLocale } from "../lib/locale";
import {
  getMediaIssueAction,
  getMediaIssueLabel,
  getProcessingStatusLabel,
  getRetryStateLabel,
} from "../lib/media-issue-display";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import { MapPanel, type LocationDraft } from "./map-panel";
import { MediaPreview } from "./media-preview";
import { readLocationHistory, readLocationInfo, readLocationReview } from "../lib/location";
import type {
  LocationReview,
  MediaAsset,
  MediaDeadLetterOverview,
  MediaProcessingIssue,
  MediaProcessingOverview,
  MediaStorageSummary,
  RecordFilterState,
  RecordItem,
  ReminderItem,
  SearchPresetItem,
  TimelineDay,
} from "../lib/types";

type RecordFormState = {
  title: string;
  content: string;
  type_code: string;
  rating: string;
  occurred_at: string;
  is_avoid: boolean;
  location: LocationDraft;
};

type ReminderFormState = {
  title: string;
  message: string;
  remind_at: string;
};

type LocationReviewFormState = {
  status: string;
  note: string;
};

type ViewMode = "timeline" | "list";

function createEmptyLocation(): LocationDraft {
  return {
    place_name: "",
    address: "",
    latitude: "",
    longitude: "",
    source: "manual",
  };
}

function createEmptyForm(): RecordFormState {
  return {
    title: "",
    content: "",
    type_code: "memo",
    rating: "",
    occurred_at: "",
    is_avoid: false,
    location: createEmptyLocation(),
  };
}

function readLocation(record: RecordItem | null): LocationDraft {
  const location = readLocationInfo(record?.extra_data);
  return {
    place_name: location.place_name,
    address: location.address,
    latitude: location.latitude === null ? "" : String(location.latitude),
    longitude: location.longitude === null ? "" : String(location.longitude),
    source: location.source,
  };
}

function readLocationReviewForm(record: RecordItem | null): LocationReviewFormState {
  const review = readLocationReview(record?.extra_data);
  return {
    status: review?.status || "pending",
    note: review?.note || "",
  };
}

function formatDatetimeInput(value?: string | null): string {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const timezoneOffsetMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - timezoneOffsetMs).toISOString().slice(0, 16);
}

function createEmptyReminderForm(): ReminderFormState {
  return {
    title: "",
    message: "",
    remind_at: "",
  };
}

function readMetadataText(metadata: Record<string, unknown>, key: string): string | null {
  const value = metadata[key];
  return typeof value === "string" && value.trim() ? value : null;
}

function readMetadataNumber(metadata: Record<string, unknown>, key: string): number | null {
  const value = metadata[key];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function canRetryMediaIssue(issue: MediaProcessingIssue): boolean {
  return issue.can_bulk_retry === true;
}

function resolveMediaIssueSettingsAnchor(issue: MediaProcessingIssue): string | null {
  const actionCode = issue.recommended_action_code ?? "";
  const featureCode = issue.recommended_settings_feature_code ?? "";
  if (!featureCode) {
    return null;
  }
  if (
    actionCode === "check_remote_storage_health" ||
    (actionCode === "retry_after_remote_check" && featureCode === "media_storage")
  ) {
    return "provider-media_storage-health";
  }
  return `provider-${featureCode}`;
}

function buildMediaIssueSettingsHref(workspaceId: string, issue: MediaProcessingIssue): string | null {
  const anchor = resolveMediaIssueSettingsAnchor(issue);
  if (!anchor) {
    return null;
  }
  return `/app/workspaces/${workspaceId}/settings#${anchor}`;
}

export function RecordPanelV2({
  authToken,
  canWriteWorkspace,
  workspaceId,
  records,
  selectedRecordId,
  timelineDays,
  mediaAssets,
  mediaDeadLetterOverview,
  mediaProcessingOverview,
  mediaStorageSummary,
  reminders,
  onSelectRecord,
  onSaveRecord,
  onCreateReminder,
  onDeleteMedia,
  onUpdateReminder,
  onDeleteReminder,
  onDeleteRecord,
  onBulkRetryMediaDeadLetter,
  onRefreshMediaStatus,
  onApplyRecordFilter,
  onApplyLocationFilter,
  onCreateSearchPreset,
  onDeleteSearchPreset,
  onRetryMedia,
  onUploadMedia,
  onResetFilter,
  recordFilter,
  searchPresets,
  savingSearchPreset,
  filteringRecords,
}: {
  authToken: string | null;
  canWriteWorkspace: boolean;
  workspaceId: string;
  records: RecordItem[];
  timelineDays: TimelineDay[];
  selectedRecordId: string | null;
  mediaAssets: MediaAsset[];
  mediaDeadLetterOverview: MediaDeadLetterOverview | null;
  mediaProcessingOverview: MediaProcessingOverview | null;
  mediaStorageSummary: MediaStorageSummary | null;
  reminders: ReminderItem[];
  onSelectRecord: (recordId: string | null) => void;
  onSaveRecord: (input: {
    recordId?: string;
    title?: string;
    content: string;
    type_code: string;
    rating?: number | null;
    occurred_at?: string;
    is_avoid: boolean;
    extra_data?: Record<string, unknown>;
  }) => Promise<void>;
  onCreateReminder: (input: {
    recordId: string;
    title?: string;
    message?: string;
    remind_at: string;
    channel_code?: string;
  }) => Promise<void>;
  onDeleteMedia: (mediaId: string) => Promise<void>;
  onUpdateReminder: (
    reminderId: string,
    input: Partial<{
      title: string | null;
      message: string | null;
      remind_at: string | null;
      status: string;
      is_enabled: boolean;
    }>,
  ) => Promise<void>;
  onDeleteReminder: (reminderId: string) => Promise<void>;
  onDeleteRecord: (recordId: string) => Promise<void>;
  onBulkRetryMediaDeadLetter: (input: {
    mediaIds?: string[];
    retryStates?: string[];
    limit?: number;
  }) => Promise<void>;
  onRefreshMediaStatus: (mediaId: string) => Promise<void>;
  onApplyRecordFilter: (nextFilter: RecordFilterState) => Promise<void>;
  onApplyLocationFilter: (
    nextFilter: Pick<RecordFilterState, "placeQuery" | "reviewStatus" | "mappedOnly">,
  ) => Promise<void>;
  onCreateSearchPreset: (name: string, nextFilter: RecordFilterState) => Promise<void>;
  onDeleteSearchPreset: (presetId: string) => Promise<void>;
  onRetryMedia: (mediaId: string) => Promise<void>;
  onUploadMedia: (recordId: string, file: File) => Promise<void>;
  onResetFilter: () => Promise<void>;
  recordFilter: RecordFilterState;
  searchPresets: SearchPresetItem[];
  savingSearchPreset: boolean;
  filteringRecords: boolean;
}) {
  const { locale } = useStoredLocale();
  const avoidCount = records.filter((record) => record.is_avoid).length;
  const foodCount = records.filter((record) => record.type_code === "food").length;
  const selectedRecord = useMemo(
    () => records.find((record) => record.id === selectedRecordId) ?? null,
    [records, selectedRecordId],
  );
  const [form, setForm] = useState<RecordFormState>(createEmptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [refreshingMediaId, setRefreshingMediaId] = useState<string | null>(null);
  const [retryingMediaId, setRetryingMediaId] = useState<string | null>(null);
  const [bulkRetryingDeadLetter, setBulkRetryingDeadLetter] = useState(false);
  const [downloadingMediaId, setDownloadingMediaId] = useState<string | null>(null);
  const [deletingMediaId, setDeletingMediaId] = useState<string | null>(null);
  const [reminderForm, setReminderForm] = useState<ReminderFormState>(createEmptyReminderForm);
  const [savingReminder, setSavingReminder] = useState(false);
  const [locationReviewForm, setLocationReviewForm] = useState<LocationReviewFormState>({
    status: "pending",
    note: "",
  });
  const [viewMode, setViewMode] = useState<ViewMode>("timeline");
  const [filterDraft, setFilterDraft] = useState<RecordFilterState>(recordFilter);
  const [presetName, setPresetName] = useState("");
  const [selectedDeadLetterIds, setSelectedDeadLetterIds] = useState<string[]>([]);
  const [error, setError] = useState("");
  const selectedLocationReview = useMemo<LocationReview | null>(
    () => readLocationReview(selectedRecord?.extra_data),
    [selectedRecord],
  );
  const selectedLocationHistory = useMemo(
    () => readLocationHistory(selectedRecord?.extra_data).slice().reverse(),
    [selectedRecord],
  );
  const selectedRecordMediaSizeBytes = useMemo(
    () => mediaAssets.reduce((sum, asset) => sum + asset.size_bytes, 0),
    [mediaAssets],
  );
  const actionableDeadLetterIds = useMemo(
    () =>
      new Set(
        (mediaDeadLetterOverview?.items ?? [])
          .filter((item) => canRetryMediaIssue(item))
          .map((item) => item.media_id),
      ),
    [mediaDeadLetterOverview],
  );

  const legacyMediaIssueCopy = useMemo(
    () => ({
      recentIssuesTitle:
        locale === "zh-CN" ? "最近媒体问题" : locale === "ja" ? "最近の媒体問題" : "Recent media issues",
      recentIssuesDescription:
        locale === "zh-CN"
          ? "展示工作区最近失败或延后的媒体项目，并附带远端拉取状态。"
          : locale === "ja"
            ? "ワークスペース内で最近失敗または保留になった媒体項目と、リモート取得状態を表示します。"
            : "Recent failed or deferred items across the workspace, including remote fetch state.",
      noRecentIssues:
        locale === "zh-CN"
          ? "当前没有最近的媒体处理问题。"
          : locale === "ja"
            ? "最近の媒体処理問題はありません。"
            : "No recent media processing issues.",
      deadLetterTitle:
        locale === "zh-CN" ? "死信恢复" : locale === "ja" ? "デッドレター復旧" : "Dead-letter recovery",
      deadLetterDescription:
        locale === "zh-CN"
          ? "这些远端媒体因为重试停止或本就不适合自动重试，需要人工介入。"
          : locale === "ja"
            ? "これらのリモート媒体は再試行が停止したか、自動再試行に不向きで、手動対応が必要です。"
            : "Remote media items that need manual recovery after retries stopped or were never eligible for auto-retry.",
      noDeadLetter:
        locale === "zh-CN"
          ? "当前没有死信媒体项目。"
          : locale === "ja"
            ? "現在デッドレター媒体はありません。"
            : "No dead-letter media items right now.",
      openSettings:
        locale === "zh-CN" ? "打开设置" : locale === "ja" ? "設定を開く" : "Open settings",
      retryNow:
        locale === "zh-CN" ? "立即重试" : locale === "ja" ? "今すぐ再試行" : "Retry now",
      retrying:
        locale === "zh-CN" ? "重试中..." : locale === "ja" ? "再試行中..." : "Retrying...",
      selectVisible:
        locale === "zh-CN" ? "选择可见项" : locale === "ja" ? "表示項目を選択" : "Select visible",
      clearSelection:
        locale === "zh-CN" ? "清空选择" : locale === "ja" ? "選択を解除" : "Clear selection",
      retrySelectedPrefix:
        locale === "zh-CN" ? "重试已选" : locale === "ja" ? "選択分を再試行" : "Retry selected",
      retryAll:
        locale === "zh-CN" ? "重试全部可操作项" : locale === "ja" ? "実行可能な項目をすべて再試行" : "Retry all actionable",
      itemSuffix: locale === "zh-CN" ? "项" : locale === "ja" ? "件" : "item(s)",
      lastAttempt: locale === "zh-CN" ? "最近尝试" : locale === "ja" ? "最終試行" : "Last attempt",
      lastFailure: locale === "zh-CN" ? "最近失败" : locale === "ja" ? "最終失敗" : "Last failure",
      nextRetry: locale === "zh-CN" ? "下一次重试" : locale === "ja" ? "次回再試行" : "Next retry",
      retryBudgetUsed:
        locale === "zh-CN" ? "已使用重试额度" : locale === "ja" ? "使用済み再試行枠" : "Retry budget used",
      retries: locale === "zh-CN" ? "重试" : locale === "ja" ? "再試行" : "retries",
      retryStatePrefix:
        locale === "zh-CN" ? "恢复" : locale === "ja" ? "復旧" : "retry",
      fetchPrefix: locale === "zh-CN" ? "拉取" : locale === "ja" ? "取得" : "fetch",
    }),
    [locale],
  );

  const mediaIssueCopy = useMemo(
    () => ({
      recentIssuesTitle:
        locale === "zh-CN" ? "最近媒体问题" : locale === "ja" ? "最近の媒体問題" : "Recent media issues",
      recentIssuesDescription:
        locale === "zh-CN"
          ? "显示工作区最近失败或延后的媒体条目，并附带远程拉取状态。"
          : locale === "ja"
            ? "ワークスペース内で最近失敗または保留になった媒体項目と、リモート取得状態を表示します。"
            : "Recent failed or deferred items across the workspace, including remote fetch state.",
      noRecentIssues:
        locale === "zh-CN"
          ? "当前没有最近的媒体处理问题。"
          : locale === "ja"
            ? "最近の媒体処理の問題はありません。"
            : "No recent media processing issues.",
      deadLetterTitle:
        locale === "zh-CN" ? "死信恢复" : locale === "ja" ? "デッドレター復旧" : "Dead-letter recovery",
      deadLetterDescription:
        locale === "zh-CN"
          ? "这些远程媒体因为重试停止或本就不适合自动重试，需要人工介入。"
          : locale === "ja"
            ? "これらのリモート媒体は再試行が停止したか、自動再試行の対象外のため、手動対応が必要です。"
            : "Remote media items that need manual recovery after retries stopped or were never eligible for auto-retry.",
      noDeadLetter:
        locale === "zh-CN"
          ? "当前没有死信媒体项目。"
          : locale === "ja"
            ? "現在デッドレター媒体項目はありません。"
            : "No dead-letter media items right now.",
      openSettings:
        locale === "zh-CN" ? "打开设置" : locale === "ja" ? "設定を開く" : "Open settings",
      retryNow:
        locale === "zh-CN" ? "立即重试" : locale === "ja" ? "今すぐ再試行" : "Retry now",
      retrying:
        locale === "zh-CN" ? "重试中..." : locale === "ja" ? "再試行中..." : "Retrying...",
      selectVisible:
        locale === "zh-CN" ? "选择可见项" : locale === "ja" ? "表示項目を選択" : "Select visible",
      clearSelection:
        locale === "zh-CN" ? "清空选择" : locale === "ja" ? "選択を解除" : "Clear selection",
      retrySelectedPrefix:
        locale === "zh-CN" ? "重试已选" : locale === "ja" ? "選択分を再試行" : "Retry selected",
      retryAll:
        locale === "zh-CN" ? "重试全部可操作项" : locale === "ja" ? "実行可能な項目をすべて再試行" : "Retry all actionable",
      itemSuffix: locale === "zh-CN" ? "项" : locale === "ja" ? "件" : "item(s)",
      lastAttempt: locale === "zh-CN" ? "最近尝试" : locale === "ja" ? "最終試行" : "Last attempt",
      lastFailure: locale === "zh-CN" ? "最近失败" : locale === "ja" ? "最終失敗" : "Last failure",
      nextRetry: locale === "zh-CN" ? "下一次重试" : locale === "ja" ? "次回再試行" : "Next retry",
      retryBudgetUsed:
        locale === "zh-CN" ? "已使用重试额度" : locale === "ja" ? "使用済み再試行枠" : "Retry budget used",
      retries: locale === "zh-CN" ? "重试" : locale === "ja" ? "再試行" : "retries",
      retryStatePrefix:
        locale === "zh-CN" ? "恢复" : locale === "ja" ? "復旧" : "retry",
      fetchPrefix: locale === "zh-CN" ? "拉取" : locale === "ja" ? "取得" : "fetch",
      dimensions: locale === "zh-CN" ? "尺寸" : locale === "ja" ? "寸法" : "Dimensions",
      textChars: locale === "zh-CN" ? "文本字符" : locale === "ja" ? "文字数" : "Text chars",
      textLines: locale === "zh-CN" ? "文本行数" : locale === "ja" ? "行数" : "Text lines",
      download: locale === "zh-CN" ? "下载" : locale === "ja" ? "ダウンロード" : "Download",
      downloading: locale === "zh-CN" ? "下载中..." : locale === "ja" ? "ダウンロード中..." : "Downloading...",
      refreshStatus: locale === "zh-CN" ? "刷新状态" : locale === "ja" ? "状態を更新" : "Refresh status",
      refreshing: locale === "zh-CN" ? "刷新中..." : locale === "ja" ? "更新中..." : "Refreshing...",
      retry: locale === "zh-CN" ? "重试" : locale === "ja" ? "再試行" : "Retry",
      deleteMedia: locale === "zh-CN" ? "删除媒体" : locale === "ja" ? "媒体を削除" : "Delete media",
      deleting: locale === "zh-CN" ? "删除中..." : locale === "ja" ? "削除中..." : "Deleting...",
    }),
    [locale],
  );
  void legacyMediaIssueCopy;
  const panelCopy = useMemo(
    () => ({
      workspace: locale === "zh-CN" ? "工作区" : locale === "ja" ? "ワークスペース" : "Workspace",
      structuredResults: locale === "zh-CN" ? "结构化结果" : locale === "ja" ? "構造化結果" : "Structured Results",
      newRecord: locale === "zh-CN" ? "新建记录" : locale === "ja" ? "新規記録" : "New record",
      visibleRecords: locale === "zh-CN" ? "可见记录" : locale === "ja" ? "表示中の記録" : "Visible records",
      food: locale === "zh-CN" ? "食物" : locale === "ja" ? "食事" : "Food",
      avoid: locale === "zh-CN" ? "避雷" : locale === "ja" ? "回避" : "Avoid",
      advancedSearch: locale === "zh-CN" ? "高级搜索" : locale === "ja" ? "詳細検索" : "Advanced search",
      textQuery: locale === "zh-CN" ? "文本检索" : locale === "ja" ? "テキスト検索" : "Text query",
      textQueryPlaceholder:
        locale === "zh-CN" ? "菜品 / 零食 / 警告" : locale === "ja" ? "料理 / おやつ / 注意点" : "dish / snack / warning",
      type: locale === "zh-CN" ? "类型" : locale === "ja" ? "種類" : "Type",
      all: locale === "zh-CN" ? "全部" : locale === "ja" ? "すべて" : "all",
      memo: locale === "zh-CN" ? "备忘" : locale === "ja" ? "メモ" : "memo",
      snack: locale === "zh-CN" ? "零食" : locale === "ja" ? "おやつ" : "snack",
      badExperience: locale === "zh-CN" ? "踩雷记录" : locale === "ja" ? "悪い体験" : "bad_experience",
      allRecords: locale === "zh-CN" ? "全部记录" : locale === "ja" ? "全記録" : "all records",
      avoidOnlyOption: locale === "zh-CN" ? "仅避雷" : locale === "ja" ? "回避のみ" : "avoid only",
      nonAvoidOnly: locale === "zh-CN" ? "仅非避雷" : locale === "ja" ? "通常のみ" : "non-avoid only",
      filtering: locale === "zh-CN" ? "筛选中..." : locale === "ja" ? "絞り込み中..." : "Filtering...",
      applyAdvancedFilter:
        locale === "zh-CN" ? "应用高级筛选" : locale === "ja" ? "詳細フィルターを適用" : "Apply advanced filter",
      resetList: locale === "zh-CN" ? "重置列表" : locale === "ja" ? "一覧をリセット" : "Reset list",
      presetName: locale === "zh-CN" ? "预设名称" : locale === "ja" ? "プリセット名" : "Preset name",
      presetPlaceholder:
        locale === "zh-CN" ? "已验证美食地点" : locale === "ja" ? "確認済みの食事スポット" : "Confirmed food spots",
      savingPreset: locale === "zh-CN" ? "保存预设中..." : locale === "ja" ? "プリセット保存中..." : "Saving preset...",
      saveCurrentFilter:
        locale === "zh-CN" ? "保存当前筛选" : locale === "ja" ? "現在のフィルターを保存" : "Save current filter",
      savedPreset: locale === "zh-CN" ? "已保存预设" : locale === "ja" ? "保存済みプリセット" : "Saved preset",
      applyPreset: locale === "zh-CN" ? "应用预设" : locale === "ja" ? "プリセットを適用" : "Apply preset",
      deletePreset: locale === "zh-CN" ? "删除预设" : locale === "ja" ? "プリセットを削除" : "Delete preset",
      noSavedFilters:
        locale === "zh-CN"
          ? "还没有保存的筛选。保存当前高级筛选后可重复使用。"
          : locale === "ja"
            ? "保存済みフィルターはまだありません。現在の詳細フィルターを保存すると再利用できます。"
            : "No saved filters yet. Save your current advanced filter to reuse it.",
      editRecord: locale === "zh-CN" ? "编辑记录" : locale === "ja" ? "記録を編集" : "Edit record",
      newManualRecord: locale === "zh-CN" ? "手动新建记录" : locale === "ja" ? "手動で新規記録" : "New manual record",
      title: locale === "zh-CN" ? "标题" : locale === "ja" ? "タイトル" : "Title",
      optionalTitle: locale === "zh-CN" ? "可选标题" : locale === "ja" ? "任意タイトル" : "Optional title",
      content: locale === "zh-CN" ? "内容" : locale === "ja" ? "内容" : "Content",
      contentPlaceholder:
        locale === "zh-CN"
          ? "写下备忘、食物评价或提醒"
          : locale === "ja"
            ? "メモ、食事レビュー、またはリマインダーを書いてください"
            : "Write a note, food review, or reminder",
      rating: locale === "zh-CN" ? "评分" : locale === "ja" ? "評価" : "Rating",
      occurredAt: locale === "zh-CN" ? "发生时间" : locale === "ja" ? "発生日時" : "Occurred at",
      placeName: locale === "zh-CN" ? "地点名称" : locale === "ja" ? "場所名" : "Place name",
      placePlaceholder: locale === "zh-CN" ? "西湖寿司" : locale === "ja" ? "西湖すし" : "West Lake Sushi",
      address: locale === "zh-CN" ? "地址" : locale === "ja" ? "住所" : "Address",
      addressPlaceholder:
        locale === "zh-CN" ? "杭州西湖区" : locale === "ja" ? "杭州・西湖区" : "Hangzhou, West Lake district",
      avoidItem: locale === "zh-CN" ? "避雷项目" : locale === "ja" ? "回避項目" : "Avoid item",
      latitude: locale === "zh-CN" ? "纬度" : locale === "ja" ? "緯度" : "Latitude",
      longitude: locale === "zh-CN" ? "经度" : locale === "ja" ? "経度" : "Longitude",
      locationSource: locale === "zh-CN" ? "位置来源" : locale === "ja" ? "位置ソース" : "Location source",
      locationReview: locale === "zh-CN" ? "位置复核" : locale === "ja" ? "位置レビュー" : "Location Review",
      locationReviewDescription:
        locale === "zh-CN"
          ? "在记录进入长期记忆前，先确认可信坐标或标记可疑地点。"
          : locale === "ja"
            ? "この記録が長期記憶に入る前に、信頼できる座標を確認するか、疑わしい場所に印を付けます。"
            : "Confirm trusted coordinates or flag doubtful places before this record enters long-term memory.",
      reviewStatus: locale === "zh-CN" ? "复核状态" : locale === "ja" ? "レビュー状態" : "Review status",
      pending: locale === "zh-CN" ? "待处理" : locale === "ja" ? "保留" : "pending",
      confirmed: locale === "zh-CN" ? "已确认" : locale === "ja" ? "確認済み" : "confirmed",
      needsReview: locale === "zh-CN" ? "需复核" : locale === "ja" ? "再確認が必要" : "needs_review",
      reviewNote: locale === "zh-CN" ? "复核备注" : locale === "ja" ? "レビュー備考" : "Review note",
      reviewNotePlaceholder:
        locale === "zh-CN"
          ? "说明该地点为何可信，或为什么需要再次检查"
          : locale === "ja"
            ? "この場所が信頼できる理由、または再確認が必要な理由を書いてください"
            : "Why this place is trusted or needs another check",
      markConfirmed: locale === "zh-CN" ? "标记为已确认" : locale === "ja" ? "確認済みにする" : "Mark confirmed",
      markNeedsReview:
        locale === "zh-CN" ? "标记为需复核" : locale === "ja" ? "再確認が必要にする" : "Mark needs review",
      resetReview: locale === "zh-CN" ? "重置复核" : locale === "ja" ? "レビューをリセット" : "Reset review",
      storedStatus: locale === "zh-CN" ? "已存状态" : locale === "ja" ? "保存済み状態" : "Stored status",
      lastUpdated: locale === "zh-CN" ? "最近更新" : locale === "ja" ? "最終更新" : "Last updated",
      confirmedAt: locale === "zh-CN" ? "确认时间" : locale === "ja" ? "確認日時" : "Confirmed at",
      notConfirmed: locale === "zh-CN" ? "未确认" : locale === "ja" ? "未確認" : "Not confirmed",
      unnamedLocation: locale === "zh-CN" ? "未命名地点" : locale === "ja" ? "名称未設定の場所" : "Unnamed location",
      noAddress: locale === "zh-CN" ? "无地址" : locale === "ja" ? "住所なし" : "No address",
      noLocationHistory:
        locale === "zh-CN"
          ? "还没有位置历史。先保存一个带地图点位的记录即可开始复核追踪。"
          : locale === "ja"
            ? "位置履歴はまだありません。地図上のポイント付き記録を保存すると追跡を開始できます。"
            : "No location history yet. Save a mapped point to start review tracking.",
      saving: locale === "zh-CN" ? "保存中..." : locale === "ja" ? "保存中..." : "Saving...",
      updateRecord: locale === "zh-CN" ? "更新记录" : locale === "ja" ? "記録を更新" : "Update record",
      createRecord: locale === "zh-CN" ? "创建记录" : locale === "ja" ? "記録を作成" : "Create record",
      deleting: locale === "zh-CN" ? "删除中..." : locale === "ja" ? "削除中..." : "Deleting...",
      deleteRecord: locale === "zh-CN" ? "删除记录" : locale === "ja" ? "記録を削除" : "Delete record",
      uploadAttachment: locale === "zh-CN" ? "上传附件" : locale === "ja" ? "添付をアップロード" : "Upload attachment",
      uploadingMedia: locale === "zh-CN" ? "媒体上传中..." : locale === "ja" ? "媒体をアップロード中..." : "Uploading media...",
      thisRecordMedia: locale === "zh-CN" ? "本记录媒体" : locale === "ja" ? "この記録の媒体" : "This record media",
      workspaceStorage: locale === "zh-CN" ? "工作区存储" : locale === "ja" ? "ワークスペース保存量" : "Workspace storage",
      storageHealth: locale === "zh-CN" ? "存储健康" : locale === "ja" ? "保存状態" : "Storage health",
      allTrackedFilesPresent:
        locale === "zh-CN" ? "所有已跟踪文件均存在" : locale === "ja" ? "追跡中のファイルはすべて存在します" : "All tracked files present",
      missingFiles:
        locale === "zh-CN" ? "缺失文件" : locale === "ja" ? "不足ファイル" : "missing file(s)",
      processingCompleted: locale === "zh-CN" ? "处理完成" : locale === "ja" ? "処理完了" : "Processing completed",
      needsAttention: locale === "zh-CN" ? "需要关注" : locale === "ja" ? "要対応" : "Needs attention",
      queueState: locale === "zh-CN" ? "队列状态" : locale === "ja" ? "キュー状態" : "Queue state",
      queued: locale === "zh-CN" ? "排队中" : locale === "ja" ? "待機中" : "queued",
      storageMix: locale === "zh-CN" ? "存储构成" : locale === "ja" ? "保存構成" : "Storage mix",
      local: locale === "zh-CN" ? "本地" : locale === "ja" ? "ローカル" : "local",
      remote: locale === "zh-CN" ? "远程" : locale === "ja" ? "リモート" : "remote",
    }),
    [locale],
  );

  const {
    copy: detailCopy,
    formatAvoidCountLabel,
    formatFileCountLabel,
    formatHistoryTimestampLabel,
    formatRecordTimestampLabel,
    formatReminderEnabledLabel,
    formatReminderStatusLabel,
    formatReminderTimestampLabel,
    formatReviewStatusLabel,
    formatTimelineCountLabel,
    formatTimelineDateLabel,
    summarizeHistoryActionLabel,
    summarizeRecordFilterLabel,
  } = useMemo(() => getRecordPanelDetailBundle(locale), [locale]);

  useEffect(() => {
    setSelectedDeadLetterIds((current) => current.filter((item) => actionableDeadLetterIds.has(item)));
  }, [actionableDeadLetterIds]);

  useEffect(() => {
    if (!selectedRecord) {
      setForm(createEmptyForm());
      setLocationReviewForm({
        status: "pending",
        note: "",
      });
      return;
    }

    setForm({
      title: selectedRecord.title ?? "",
      content: selectedRecord.content ?? "",
      type_code: selectedRecord.type_code,
      rating: selectedRecord.rating ? String(selectedRecord.rating) : "",
      occurred_at: formatDatetimeInput(selectedRecord.occurred_at),
      is_avoid: selectedRecord.is_avoid,
      location: readLocation(selectedRecord),
    });
    setLocationReviewForm(readLocationReviewForm(selectedRecord));
  }, [selectedRecord]);

  useEffect(() => {
    if (!selectedRecord) {
      setReminderForm(createEmptyReminderForm());
      return;
    }

    setReminderForm({
      title: selectedRecord.title ?? "",
      message: "",
      remind_at: "",
    });
  }, [selectedRecord]);

  useEffect(() => {
    setFilterDraft(recordFilter);
  }, [recordFilter]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.content.trim()) {
      setError(detailCopy.contentRequiredError);
      return;
    }

    const latitude = form.location.latitude.trim() ? Number(form.location.latitude) : null;
    const longitude = form.location.longitude.trim() ? Number(form.location.longitude) : null;

    if (form.location.latitude.trim() && (latitude === null || Number.isNaN(latitude))) {
      setError(detailCopy.latitudeInvalidError);
      return;
    }

    if (form.location.longitude.trim() && (longitude === null || Number.isNaN(longitude))) {
      setError(detailCopy.longitudeInvalidError);
      return;
    }

    setSaving(true);
    setError("");
    try {
      const hasLocation =
        form.location.place_name.trim() ||
        form.location.address.trim() ||
        latitude !== null ||
        longitude !== null;

      await onSaveRecord({
        recordId: selectedRecord?.id,
        title: form.title.trim() || undefined,
        content: form.content.trim(),
        type_code: form.type_code,
        rating: form.rating ? Number(form.rating) : null,
        occurred_at: form.occurred_at ? new Date(form.occurred_at).toISOString() : undefined,
        is_avoid: form.is_avoid,
        extra_data: hasLocation
          ? {
              location: {
                place_name: form.location.place_name.trim() || undefined,
                address: form.location.address.trim() || undefined,
                latitude: latitude ?? undefined,
                longitude: longitude ?? undefined,
                source: form.location.source || "manual",
              },
              location_review: {
                status: locationReviewForm.status || "pending",
                note: locationReviewForm.note.trim() || undefined,
              },
            }
          : {
              location: null,
              location_review: null,
            },
      });

      if (!selectedRecord) {
        setForm(createEmptyForm());
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : detailCopy.saveRecordError);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedRecord) {
      return;
    }
    setDeleting(true);
    setError("");
    try {
      await onDeleteRecord(selectedRecord.id);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : detailCopy.deleteRecordError);
    } finally {
      setDeleting(false);
    }
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedRecord) {
      return;
    }
    setUploading(true);
    setError("");
    try {
      await onUploadMedia(selectedRecord.id, file);
      event.target.value = "";
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : detailCopy.uploadMediaError);
    } finally {
      setUploading(false);
    }
  };

  const handleCreateReminderSubmit = async () => {
    if (!selectedRecord) {
      setError("Save or select a record before adding a reminder");
      return;
    }
    if (!reminderForm.remind_at) {
      setError(detailCopy.reminderTimeRequiredError);
      return;
    }

    setSavingReminder(true);
    setError("");
    try {
      await onCreateReminder({
        recordId: selectedRecord.id,
        title: reminderForm.title.trim() || selectedRecord.title || undefined,
        message: reminderForm.message.trim() || undefined,
        remind_at: new Date(reminderForm.remind_at).toISOString(),
        channel_code: "in_app",
      });
      setReminderForm((prev) => ({
        ...prev,
        message: "",
        remind_at: "",
      }));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : detailCopy.createReminderError);
    } finally {
      setSavingReminder(false);
    }
  };

  const handleRefreshMedia = async (mediaId: string) => {
    setRefreshingMediaId(mediaId);
    setError("");
    try {
      await onRefreshMediaStatus(mediaId);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : detailCopy.refreshMediaError);
    } finally {
      setRefreshingMediaId(null);
    }
  };

  const handleRetryMediaProcessing = async (mediaId: string) => {
    setRetryingMediaId(mediaId);
    setError("");
    try {
      await onRetryMedia(mediaId);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : detailCopy.retryMediaError);
    } finally {
      setRetryingMediaId(null);
    }
  };

  const handleToggleDeadLetterSelection = (mediaId: string, checked: boolean) => {
    setSelectedDeadLetterIds((current) => {
      if (checked) {
        return current.includes(mediaId) ? current : [...current, mediaId];
      }
      return current.filter((item) => item !== mediaId);
    });
  };

  const handleSelectAllDeadLetter = () => {
    setSelectedDeadLetterIds(
      (mediaDeadLetterOverview?.items ?? [])
        .filter((item) => canRetryMediaIssue(item))
        .map((item) => item.media_id),
    );
  };

  const handleClearDeadLetterSelection = () => {
    setSelectedDeadLetterIds([]);
  };

  const handleBulkRetryDeadLetter = async (mode: "selected" | "all") => {
    setBulkRetryingDeadLetter(true);
    setError("");
    try {
      await onBulkRetryMediaDeadLetter(
        mode === "selected"
          ? { mediaIds: selectedDeadLetterIds }
          : { retryStates: ["manual_only", "exhausted", "disabled"], limit: 50 },
      );
      if (mode === "selected") {
        setSelectedDeadLetterIds([]);
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : detailCopy.bulkRetryError);
    } finally {
      setBulkRetryingDeadLetter(false);
    }
  };

  const handleDownloadMedia = async (asset: MediaAsset) => {
    if (!authToken) {
      setError(detailCopy.notAuthenticated);
      return;
    }

    setDownloadingMediaId(asset.id);
    setError("");
    try {
      const blob = await fetchMediaBlob(authToken, workspaceId, asset.id);
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = asset.original_filename || `${asset.id}.bin`;
      anchor.click();
      URL.revokeObjectURL(url);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : detailCopy.downloadMediaError);
    } finally {
      setDownloadingMediaId(null);
    }
  };

  const handleDeleteMediaAsset = async (mediaId: string) => {
    setDeletingMediaId(mediaId);
    setError("");
    try {
      await onDeleteMedia(mediaId);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : detailCopy.deleteMediaError);
    } finally {
      setDeletingMediaId(null);
    }
  };

  const handleApplyFilter = async () => {
    setError("");
    try {
      await onApplyRecordFilter(filterDraft);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : detailCopy.applyFilterError);
    }
  };

  const handleSavePreset = async () => {
    if (!presetName.trim()) {
      setError(detailCopy.presetNameRequiredError);
      return;
    }

    setError("");
    try {
      await onCreateSearchPreset(presetName.trim(), filterDraft);
      setPresetName("");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : detailCopy.savePresetError);
    }
  };

  const handleDeletePreset = async (presetId: string) => {
    setError("");
    try {
      await onDeleteSearchPreset(presetId);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : detailCopy.deletePresetError);
    }
  };

  const formatMediaSize = (asset: MediaAsset): string => {
    const stored = asset.metadata_json.size_label;
    if (typeof stored === "string" && stored.trim()) {
      return stored;
    }

    const units = ["B", "KB", "MB", "GB"];
    let value = asset.size_bytes;
    let unitIndex = 0;
    while (value >= 1024 && unitIndex < units.length - 1) {
      value /= 1024;
      unitIndex += 1;
    }
    return unitIndex === 0 ? `${value} ${units[unitIndex]}` : `${value.toFixed(1)} ${units[unitIndex]}`;
  };

  const formatByteCount = (sizeBytes: number): string => {
    const units = ["B", "KB", "MB", "GB", "TB"];
    let value = sizeBytes;
    let unitIndex = 0;
    while (value >= 1024 && unitIndex < units.length - 1) {
      value /= 1024;
      unitIndex += 1;
    }
    return unitIndex === 0 ? `${value} ${units[unitIndex]}` : `${value.toFixed(1)} ${units[unitIndex]}`;
  };

  const renderRecordCard = (record: RecordItem) => {
    const location = readLocation(record);
    const review = readLocationReview(record.extra_data);

    return (
      <article
        className={`record-card selectable-card ${record.id === selectedRecordId ? "selected" : ""}`}
        key={record.id}
        onClick={() => onSelectRecord(record.id)}
      >
        <div className="eyebrow">{record.type_code}</div>
        <h3 style={{ margin: "8px 0 6px", fontSize: 20 }}>
          {record.title || detailCopy.untitledRecord}
        </h3>
        <div className="muted">
          {formatRecordTimestampLabel(record)} | {record.source_type}
        </div>
        <p style={{ margin: "12px 0 0", lineHeight: 1.6 }}>{record.content || detailCopy.noContent}</p>
        {location.place_name || location.address ? (
          <div className="muted" style={{ marginTop: 10 }}>
            {location.place_name || detailCopy.unknownPlace}
            {location.address ? ` | ${location.address}` : ""}
          </div>
        ) : null}
        <div className="tag-row">
          <span className="tag">{record.status}</span>
          {record.rating ? <span className="tag">{detailCopy.ratingPrefix} {record.rating}</span> : null}
          {record.is_avoid ? <span className="tag">{detailCopy.avoidLabel}</span> : null}
          {location.latitude && location.longitude ? (
            <span className="tag">{detailCopy.mapPrefix} {formatReviewStatusLabel(review?.status)}</span>
          ) : null}
        </div>
      </article>
    );
  };

  const renderMediaAssetCard = (asset: MediaAsset) => {
    const extractionMode = readMetadataText(asset.metadata_json, "extraction_mode");
    const processingSource = readMetadataText(asset.metadata_json, "processing_source");
    const lastAttemptAt = readMetadataText(asset.metadata_json, "processing_last_attempt_at");
    const remoteFetchStatus = readMetadataText(asset.metadata_json, "remote_fetch_status");
    const retryState = readMetadataText(asset.metadata_json, "processing_retry_state");
    const retryCount = readMetadataNumber(asset.metadata_json, "processing_retry_count");
    const retryMaxAttempts = readMetadataNumber(asset.metadata_json, "processing_retry_max_attempts");
    const nextRetryAt = readMetadataText(asset.metadata_json, "processing_retry_next_attempt_at");

    return (
      <article className="record-card" key={asset.id}>
        <div className="eyebrow">{asset.media_type}</div>
        <div>{asset.original_filename}</div>
        <div className="muted">{asset.mime_type}</div>
        <div className="tag-row">
          <span className="tag">{asset.processing_status}</span>
          <span className="tag">{asset.storage_provider}</span>
          <span className="tag">{formatMediaSize(asset)}</span>
          {processingSource ? <span className="tag">{processingSource}</span> : null}
          {extractionMode ? <span className="tag">{extractionMode}</span> : null}
          {remoteFetchStatus ? <span className="tag">fetch {remoteFetchStatus}</span> : null}
          {retryState && retryState !== "idle" ? <span className="tag">retry {retryState}</span> : null}
          {retryCount !== null ? (
            <span className="tag">
              retries {retryCount}
              {retryMaxAttempts !== null ? `/${retryMaxAttempts}` : ""}
            </span>
          ) : null}
          {typeof asset.metadata_json.file_extension === "string" && asset.metadata_json.file_extension ? (
            <span className="tag">{String(asset.metadata_json.file_extension)}</span>
          ) : null}
        </div>
        {authToken ? (
          <div style={{ marginTop: 12 }}>
            <MediaPreview asset={asset} token={authToken} workspaceId={workspaceId} />
          </div>
        ) : null}
        <div className="detail-grid" style={{ marginTop: 12 }}>
          {typeof asset.metadata_json.width === "number" &&
          typeof asset.metadata_json.height === "number" ? (
            <div className="subtle-card">
              <div className="eyebrow">{mediaIssueCopy.dimensions}</div>
              <div style={{ marginTop: 8, fontWeight: 600 }}>
                {asset.metadata_json.width} x {asset.metadata_json.height}
              </div>
            </div>
          ) : null}
          {typeof asset.metadata_json.text_char_count === "number" ? (
            <div className="subtle-card">
              <div className="eyebrow">{mediaIssueCopy.textChars}</div>
              <div style={{ marginTop: 8, fontWeight: 600 }}>
                {asset.metadata_json.text_char_count}
              </div>
            </div>
          ) : null}
          {typeof asset.metadata_json.text_line_count === "number" ? (
            <div className="subtle-card">
              <div className="eyebrow">{mediaIssueCopy.textLines}</div>
              <div style={{ marginTop: 8, fontWeight: 600 }}>
                {asset.metadata_json.text_line_count}
              </div>
            </div>
          ) : null}
          {lastAttemptAt ? (
            <div className="subtle-card">
              <div className="eyebrow">{mediaIssueCopy.lastAttempt}</div>
              <div style={{ marginTop: 8, fontWeight: 600 }}>
                {formatHistoryTimestampLabel(lastAttemptAt)}
              </div>
            </div>
          ) : null}
          {nextRetryAt ? (
            <div className="subtle-card">
              <div className="eyebrow">{mediaIssueCopy.nextRetry}</div>
              <div style={{ marginTop: 8, fontWeight: 600 }}>
                {formatHistoryTimestampLabel(nextRetryAt)}
              </div>
            </div>
          ) : null}
        </div>
        {asset.extracted_text ? (
          <p style={{ margin: "10px 0 0", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
            {asset.extracted_text.length > 280
              ? `${asset.extracted_text.slice(0, 280)}...`
              : asset.extracted_text}
          </p>
        ) : null}
        {asset.processing_error ? (
          <div className="notice error" style={{ marginTop: 10 }}>
            {asset.processing_error}
          </div>
        ) : null}
        <div className="action-row" style={{ marginTop: 12 }}>
          <button
            className="button secondary"
            type="button"
            disabled={downloadingMediaId === asset.id}
            onClick={() => void handleDownloadMedia(asset)}
          >
            {downloadingMediaId === asset.id ? mediaIssueCopy.downloading : mediaIssueCopy.download}
          </button>
          <button
            className="button secondary"
            type="button"
            disabled={refreshingMediaId === asset.id}
            onClick={() => void handleRefreshMedia(asset.id)}
          >
            {refreshingMediaId === asset.id ? mediaIssueCopy.refreshing : mediaIssueCopy.refreshStatus}
          </button>
          {asset.processing_status !== "completed" ? (
            <button
              className="button secondary"
              type="button"
              disabled={retryingMediaId === asset.id}
              onClick={() => void handleRetryMediaProcessing(asset.id)}
            >
              {retryingMediaId === asset.id ? mediaIssueCopy.retrying : mediaIssueCopy.retry}
            </button>
          ) : null}
          <button
            className="button secondary"
            type="button"
            disabled={deletingMediaId === asset.id || !canWriteWorkspace}
            onClick={() => void handleDeleteMediaAsset(asset.id)}
          >
            {deletingMediaId === asset.id ? mediaIssueCopy.deleting : mediaIssueCopy.deleteMedia}
          </button>
        </div>
      </article>
    );
  };

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">{panelCopy.workspace}</div>
          <h2 className="title" style={{ fontSize: 22 }}>
            {panelCopy.structuredResults}
          </h2>
          <div className="muted" style={{ marginTop: 8 }}>
            {workspaceId}
          </div>
        </div>
        <div className="action-row">
          <button className="button secondary" disabled={!canWriteWorkspace} type="button" onClick={() => onSelectRecord(null)}>
            {panelCopy.newRecord}
          </button>
        </div>
      </div>
      <div className="panel-body">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="eyebrow">{panelCopy.visibleRecords}</div>
            <div className="title" style={{ fontSize: 20 }}>
              {records.length}
            </div>
          </div>
          <div className="stat-card">
            <div className="eyebrow">{panelCopy.food}</div>
            <div className="title" style={{ fontSize: 20 }}>
              {foodCount}
            </div>
          </div>
          <div className="stat-card">
            <div className="eyebrow">{panelCopy.avoid}</div>
            <div className="title" style={{ fontSize: 20 }}>
              {avoidCount}
            </div>
          </div>
        </div>

        <div className="record-card form-stack" style={{ marginTop: 20 }}>
          <div className="eyebrow">{panelCopy.advancedSearch}</div>
          <div className="inline-fields">
            <label className="field">
              <span className="field-label">{panelCopy.textQuery}</span>
              <input
                className="input"
                value={filterDraft.query}
                onChange={(event) =>
                  setFilterDraft((current) => ({
                    ...current,
                    query: event.target.value,
                  }))
                }
                placeholder={panelCopy.textQueryPlaceholder}
              />
            </label>
            <label className="field">
              <span className="field-label">{panelCopy.type}</span>
              <select
                className="input"
                value={filterDraft.typeCode}
                onChange={(event) =>
                  setFilterDraft((current) => ({
                    ...current,
                    typeCode: event.target.value,
                  }))
                }
              >
                <option value="all">{panelCopy.all}</option>
                <option value="memo">{panelCopy.memo}</option>
                <option value="food">{panelCopy.food}</option>
                <option value="snack">{panelCopy.snack}</option>
                <option value="bad_experience">{panelCopy.badExperience}</option>
              </select>
            </label>
            <label className="field">
              <span className="field-label">{panelCopy.avoid}</span>
              <select
                className="input"
                value={filterDraft.avoidOnly}
                onChange={(event) =>
                  setFilterDraft((current) => ({
                    ...current,
                    avoidOnly: event.target.value as RecordFilterState["avoidOnly"],
                  }))
                }
              >
                <option value="all">{panelCopy.allRecords}</option>
                <option value="avoid">{panelCopy.avoidOnlyOption}</option>
                <option value="normal">{panelCopy.nonAvoidOnly}</option>
              </select>
            </label>
          </div>
          <div className="action-row">
            <button className="button secondary" disabled={filteringRecords} type="button" onClick={() => void handleApplyFilter()}>
              {filteringRecords ? panelCopy.filtering : panelCopy.applyAdvancedFilter}
            </button>
            <button className="button secondary" disabled={filteringRecords} type="button" onClick={() => void onResetFilter()}>
              {panelCopy.resetList}
            </button>
          </div>
          <div className="muted">{summarizeRecordFilterLabel(recordFilter)}</div>
          <div className="inline-fields">
            <label className="field">
              <span className="field-label">{panelCopy.presetName}</span>
              <input
                className="input"
                disabled={!canWriteWorkspace}
                value={presetName}
                onChange={(event) => setPresetName(event.target.value)}
                placeholder={panelCopy.presetPlaceholder}
              />
            </label>
            <div className="field" style={{ alignSelf: "end" }}>
              <button
                className="button secondary"
                disabled={savingSearchPreset || !canWriteWorkspace}
                type="button"
                onClick={() => void handleSavePreset()}
              >
                {savingSearchPreset ? panelCopy.savingPreset : panelCopy.saveCurrentFilter}
              </button>
            </div>
          </div>
          {searchPresets.length ? (
            <div className="record-list compact-list">
              {searchPresets.map((preset) => (
                <article className="record-card" key={preset.id}>
                  <div className="eyebrow">{panelCopy.savedPreset}</div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>{preset.name}</div>
                  <div className="muted" style={{ marginTop: 8 }}>
                    {summarizeRecordFilterLabel(preset.filters)}
                  </div>
                  <div className="action-row" style={{ marginTop: 12 }}>
                    <button
                      className="button secondary"
                      disabled={filteringRecords}
                      type="button"
                      onClick={() => void onApplyRecordFilter(preset.filters)}
                    >
                      {panelCopy.applyPreset}
                    </button>
                    {canWriteWorkspace ? (
                      <button className="button secondary" type="button" onClick={() => void handleDeletePreset(preset.id)}>
                        {panelCopy.deletePreset}
                      </button>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="notice">{panelCopy.noSavedFilters}</div>
          )}
        </div>

        <MapPanel
          records={records}
          selectedRecordId={selectedRecordId}
          onSelectRecord={onSelectRecord}
          filteringRecords={filteringRecords}
          locationFilter={recordFilter}
          onApplyLocationFilter={onApplyLocationFilter}
          draftLocation={canWriteWorkspace ? form.location : null}
          onDraftLocationChange={
            canWriteWorkspace
              ? (nextLocation) =>
                  setForm((prev) => ({
                    ...prev,
                    location: nextLocation,
                  }))
              : undefined
          }
        />

        <form className="record-card form-stack" style={{ marginTop: 20 }} onSubmit={handleSubmit}>
          <div className="eyebrow">{selectedRecord ? panelCopy.editRecord : panelCopy.newManualRecord}</div>
          <label className="field">
            <span className="field-label">{panelCopy.title}</span>
            <input
              className="input"
              disabled={!canWriteWorkspace}
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              placeholder={panelCopy.optionalTitle}
            />
          </label>
          <label className="field">
            <span className="field-label">{panelCopy.content}</span>
            <textarea
              className="textarea"
              disabled={!canWriteWorkspace}
              value={form.content}
              onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
              placeholder={panelCopy.contentPlaceholder}
            />
          </label>
          <div className="inline-fields">
            <label className="field">
              <span className="field-label">{panelCopy.type}</span>
              <select
                className="input"
                disabled={!canWriteWorkspace}
                value={form.type_code}
                onChange={(event) => setForm((prev) => ({ ...prev, type_code: event.target.value }))}
              >
                <option value="memo">{panelCopy.memo}</option>
                <option value="food">{panelCopy.food}</option>
                <option value="snack">{panelCopy.snack}</option>
                <option value="bad_experience">{panelCopy.badExperience}</option>
              </select>
            </label>
            <label className="field">
              <span className="field-label">{panelCopy.rating}</span>
              <input
                className="input"
                type="number"
                disabled={!canWriteWorkspace}
                min="1"
                max="5"
                value={form.rating}
                onChange={(event) => setForm((prev) => ({ ...prev, rating: event.target.value }))}
                placeholder="1-5"
              />
            </label>
            <label className="field">
              <span className="field-label">{panelCopy.occurredAt}</span>
              <input
                className="input"
                type="datetime-local"
                disabled={!canWriteWorkspace}
                value={form.occurred_at}
                onChange={(event) => setForm((prev) => ({ ...prev, occurred_at: event.target.value }))}
              />
            </label>
          </div>
          <div className="inline-fields">
            <label className="field">
              <span className="field-label">{panelCopy.placeName}</span>
              <input
                className="input"
                disabled={!canWriteWorkspace}
                value={form.location.place_name}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    location: { ...prev.location, place_name: event.target.value, source: "manual" },
                  }))
                }
                placeholder={panelCopy.placePlaceholder}
              />
            </label>
            <label className="field">
              <span className="field-label">{panelCopy.address}</span>
              <input
                className="input"
                disabled={!canWriteWorkspace}
                value={form.location.address}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    location: { ...prev.location, address: event.target.value, source: "manual" },
                  }))
                }
                placeholder={panelCopy.addressPlaceholder}
              />
            </label>
            <label className="checkbox-field">
              <input
                checked={form.is_avoid}
                disabled={!canWriteWorkspace}
                type="checkbox"
                onChange={(event) => setForm((prev) => ({ ...prev, is_avoid: event.target.checked }))}
              />
              <span>{panelCopy.avoidItem}</span>
            </label>
          </div>
          <div className="inline-fields">
            <label className="field">
              <span className="field-label">{panelCopy.latitude}</span>
              <input
                className="input"
                inputMode="decimal"
                disabled={!canWriteWorkspace}
                value={form.location.latitude}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    location: { ...prev.location, latitude: event.target.value, source: "manual" },
                  }))
                }
                placeholder="30.274100"
              />
            </label>
            <label className="field">
              <span className="field-label">{panelCopy.longitude}</span>
              <input
                className="input"
                inputMode="decimal"
                disabled={!canWriteWorkspace}
                value={form.location.longitude}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    location: { ...prev.location, longitude: event.target.value, source: "manual" },
                  }))
                }
                placeholder="120.155100"
              />
            </label>
            <label className="field">
              <span className="field-label">{panelCopy.locationSource}</span>
              <input className="input" disabled value={form.location.source || "manual"} />
            </label>
          </div>
          <div className="record-card form-stack">
            <div className="eyebrow">{panelCopy.locationReview}</div>
            <div className="muted">
              {panelCopy.locationReviewDescription}
            </div>
            <div className="inline-fields">
              <label className="field">
                <span className="field-label">{panelCopy.reviewStatus}</span>
                <select
                  className="input"
                  disabled={!canWriteWorkspace}
                  value={locationReviewForm.status}
                  onChange={(event) =>
                    setLocationReviewForm((prev) => ({
                      ...prev,
                      status: event.target.value,
                    }))
                  }
                >
                  <option value="pending">{panelCopy.pending}</option>
                  <option value="confirmed">{panelCopy.confirmed}</option>
                  <option value="needs_review">{panelCopy.needsReview}</option>
                </select>
              </label>
              <label className="field" style={{ gridColumn: "span 2" }}>
                <span className="field-label">{panelCopy.reviewNote}</span>
                <input
                  className="input"
                  disabled={!canWriteWorkspace}
                  value={locationReviewForm.note}
                  onChange={(event) =>
                    setLocationReviewForm((prev) => ({
                      ...prev,
                      note: event.target.value,
                    }))
                  }
                  placeholder={panelCopy.reviewNotePlaceholder}
                />
              </label>
            </div>
            <div className="action-row">
              <button
                className="button secondary"
                type="button"
                disabled={!canWriteWorkspace}
                onClick={() =>
                  setLocationReviewForm((prev) => ({
                    ...prev,
                    status: "confirmed",
                  }))
                }
              >
                {panelCopy.markConfirmed}
              </button>
              <button
                className="button secondary"
                type="button"
                disabled={!canWriteWorkspace}
                onClick={() =>
                  setLocationReviewForm((prev) => ({
                    ...prev,
                    status: "needs_review",
                  }))
                }
              >
                {panelCopy.markNeedsReview}
              </button>
              <button
                className="button secondary"
                type="button"
                disabled={!canWriteWorkspace}
                onClick={() =>
                  setLocationReviewForm({
                    status: "pending",
                    note: "",
                  })
                }
              >
                {panelCopy.resetReview}
              </button>
            </div>
            {selectedRecord && selectedLocationReview ? (
              <div className="detail-grid">
                <div className="subtle-card">
                  <div className="eyebrow">{panelCopy.storedStatus}</div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>
                    {formatReviewStatusLabel(selectedLocationReview.status)}
                  </div>
                </div>
                <div className="subtle-card">
                  <div className="eyebrow">{panelCopy.lastUpdated}</div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>
                    {formatHistoryTimestampLabel(selectedLocationReview.updated_at)}
                  </div>
                </div>
                <div className="subtle-card">
                  <div className="eyebrow">{panelCopy.confirmedAt}</div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>
                    {selectedLocationReview.confirmed_at
                      ? formatHistoryTimestampLabel(selectedLocationReview.confirmed_at)
                      : panelCopy.notConfirmed}
                  </div>
                </div>
              </div>
            ) : null}
            {selectedRecord ? (
              <div className="history-list">
                {selectedLocationHistory.length ? (
                  selectedLocationHistory.slice(0, 6).map((entry) => (
                    <article className="history-item" key={`${entry.changed_at}-${entry.action_code}`}>
                      <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <div className="eyebrow">{summarizeHistoryActionLabel(entry)}</div>
                          <div style={{ marginTop: 8, fontWeight: 600 }}>
                            {entry.place_name || entry.address || panelCopy.unnamedLocation}
                          </div>
                        </div>
                        <div className="muted">{formatHistoryTimestampLabel(entry.changed_at)}</div>
                      </div>
                      <div className="muted" style={{ marginTop: 8 }}>
                        {entry.address || panelCopy.noAddress}
                      </div>
                      {(entry.latitude ?? null) !== null && (entry.longitude ?? null) !== null ? (
                        <div className="muted" style={{ marginTop: 8 }}>
                          {entry.latitude}, {entry.longitude}
                        </div>
                      ) : null}
                      <div className="tag-row">
                        {entry.source ? <span className="tag">{entry.source}</span> : null}
                        {entry.review_status ? <span className="tag">{formatReviewStatusLabel(entry.review_status)}</span> : null}
                      </div>
                      {entry.review_note ? (
                        <div className="muted" style={{ marginTop: 8 }}>
                          {entry.review_note}
                        </div>
                      ) : null}
                    </article>
                  ))
                ) : (
                  <div className="notice">
                    {panelCopy.noLocationHistory}
                  </div>
                )}
              </div>
            ) : null}
          </div>
          {error ? <div className="notice error">{error}</div> : null}
          <div className="action-row">
            <button className="button" disabled={saving || !canWriteWorkspace} type="submit">
              {saving ? panelCopy.saving : selectedRecord ? panelCopy.updateRecord : panelCopy.createRecord}
            </button>
            {selectedRecord ? (
              <button className="button secondary" disabled={deleting || !canWriteWorkspace} onClick={handleDelete} type="button">
                {deleting ? panelCopy.deleting : panelCopy.deleteRecord}
              </button>
            ) : null}
          </div>
          {selectedRecord ? (
            <>
              <label className="field">
                <span className="field-label">{panelCopy.uploadAttachment}</span>
                <input disabled={!canWriteWorkspace} onChange={handleUpload} type="file" />
              </label>
              {uploading ? <div className="notice">{panelCopy.uploadingMedia}</div> : null}
              <div className="detail-grid" style={{ marginBottom: 16 }}>
                <div className="subtle-card">
                  <div className="eyebrow">{panelCopy.thisRecordMedia}</div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>
                    {formatFileCountLabel(mediaAssets.length)} / {formatByteCount(selectedRecordMediaSizeBytes)}
                  </div>
                </div>
                <div className="subtle-card">
                  <div className="eyebrow">{panelCopy.workspaceStorage}</div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>
                    {mediaStorageSummary
                      ? `${formatFileCountLabel(mediaStorageSummary.total_count)} / ${mediaStorageSummary.total_size_label}`
                      : "-"}
                  </div>
                </div>
                <div className="subtle-card">
                  <div className="eyebrow">{panelCopy.storageHealth}</div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>
                    {mediaStorageSummary
                      ? mediaStorageSummary.missing_file_count
                        ? `${mediaStorageSummary.missing_file_count} ${panelCopy.missingFiles}`
                        : panelCopy.allTrackedFilesPresent
                      : "-"}
                  </div>
                </div>
              </div>
              {mediaProcessingOverview ? (
                <>
                  <div className="detail-grid" style={{ marginBottom: 16 }}>
                    <div className="subtle-card">
                      <div className="eyebrow">{panelCopy.processingCompleted}</div>
                      <div style={{ marginTop: 8, fontWeight: 600 }}>
                        {mediaProcessingOverview.completed_count}/{mediaProcessingOverview.total_count}
                      </div>
                    </div>
                    <div className="subtle-card">
                      <div className="eyebrow">{panelCopy.needsAttention}</div>
                      <div style={{ marginTop: 8, fontWeight: 600 }}>
                        {mediaProcessingOverview.failed_count + mediaProcessingOverview.deferred_count}
                      </div>
                    </div>
                    <div className="subtle-card">
                      <div className="eyebrow">{panelCopy.queueState}</div>
                      <div style={{ marginTop: 8, fontWeight: 600 }}>
                        {mediaProcessingOverview.pending_count + mediaProcessingOverview.processing_count} {panelCopy.queued}
                      </div>
                    </div>
                    <div className="subtle-card">
                      <div className="eyebrow">{panelCopy.storageMix}</div>
                      <div style={{ marginTop: 8, fontWeight: 600 }}>
                        {mediaProcessingOverview.local_item_count} {panelCopy.local} / {mediaProcessingOverview.remote_item_count} {panelCopy.remote}
                      </div>
                    </div>
                  </div>
                  <div className="tag-row" style={{ marginBottom: 16 }}>
                    {Object.entries(mediaProcessingOverview.by_storage_provider).map(([providerCode, count]) => (
                      <span className="tag" key={providerCode}>
                        {providerCode}: {count}
                      </span>
                    ))}
                  </div>
                    <div className="record-card form-stack" style={{ marginBottom: 16 }}>
                    <div className="eyebrow">{mediaIssueCopy.recentIssuesTitle}</div>
                    <div className="muted">
                      {mediaIssueCopy.recentIssuesDescription}
                    </div>
                    {mediaProcessingOverview.recent_issues.length ? (
                      <div className="record-list compact-list" style={{ marginTop: 16 }}>
                        {mediaProcessingOverview.recent_issues.map((issue) => (
                          <article className="record-card" key={issue.media_id}>
                            <div className="eyebrow">{issue.media_type}</div>
                            <div>{issue.original_filename}</div>
                            <div className="tag-row">
                              <span className="tag">{getProcessingStatusLabel(locale, issue.processing_status)}</span>
                              <span className="tag">{issue.storage_provider}</span>
                              {issue.processing_source ? <span className="tag">{issue.processing_source}</span> : null}
                              {issue.remote_fetch_status ? (
                                <span className="tag">{mediaIssueCopy.fetchPrefix} {issue.remote_fetch_status}</span>
                              ) : null}
                              {issue.extraction_mode ? <span className="tag">{issue.extraction_mode}</span> : null}
                              {issue.processing_retry_state ? (
                                <span className="tag">
                                  {mediaIssueCopy.retryStatePrefix} {getRetryStateLabel(locale, issue.processing_retry_state)}
                                </span>
                              ) : null}
                              {getMediaIssueLabel(locale, issue) ? (
                                <span className="tag">{getMediaIssueLabel(locale, issue)}</span>
                              ) : null}
                              {typeof issue.processing_retry_count === "number" ? (
                                <span className="tag">
                                  {mediaIssueCopy.retries} {issue.processing_retry_count}
                                  {typeof issue.processing_retry_max_attempts === "number"
                                    ? `/${issue.processing_retry_max_attempts}`
                                    : ""}
                                </span>
                              ) : null}
                            </div>
                            <div className="muted" style={{ marginTop: 8 }}>
                              {mediaIssueCopy.lastAttempt}: {formatHistoryTimestampLabel(issue.processing_last_attempt_at)}
                            </div>
                            {issue.processing_last_failure_at ? (
                              <div className="muted" style={{ marginTop: 6 }}>
                                {mediaIssueCopy.lastFailure}: {formatHistoryTimestampLabel(issue.processing_last_failure_at)}
                              </div>
                            ) : null}
                            {issue.processing_retry_next_attempt_at ? (
                              <div className="muted" style={{ marginTop: 6 }}>
                                {mediaIssueCopy.nextRetry}: {formatHistoryTimestampLabel(issue.processing_retry_next_attempt_at)}
                              </div>
                            ) : null}
                            {getMediaIssueAction(locale, issue).label ? (
                              <div className="notice" style={{ marginTop: 10 }}>
                                {getMediaIssueAction(locale, issue).label}
                                {getMediaIssueAction(locale, issue).detail ? `: ${getMediaIssueAction(locale, issue).detail}` : ""}
                              </div>
                            ) : null}
                            {canWriteWorkspace || buildMediaIssueSettingsHref(workspaceId, issue) ? (
                              <div className="action-row" style={{ marginTop: 10 }}>
                                {canWriteWorkspace && canRetryMediaIssue(issue) ? (
                                  <button
                                    className="button secondary"
                                    disabled={retryingMediaId === issue.media_id}
                                    type="button"
                                    onClick={() => void handleRetryMediaProcessing(issue.media_id)}
                                  >
                                    {retryingMediaId === issue.media_id ? mediaIssueCopy.retrying : mediaIssueCopy.retryNow}
                                  </button>
                                ) : null}
                                {buildMediaIssueSettingsHref(workspaceId, issue) ? (
                                  <Link
                                    className="button secondary"
                                    href={buildMediaIssueSettingsHref(workspaceId, issue) ?? "#"}
                                  >
                                    {mediaIssueCopy.openSettings}
                                  </Link>
                                ) : null}
                              </div>
                            ) : null}
                            {issue.processing_error ? (
                              <div className="notice error" style={{ marginTop: 10 }}>
                                {issue.processing_error}
                              </div>
                            ) : null}
                          </article>
                        ))}
                      </div>
                    ) : (
                      <div className="notice" style={{ marginTop: 16 }}>
                        {mediaIssueCopy.noRecentIssues}
                      </div>
                    )}
                  </div>
                  <div className="record-card form-stack" style={{ marginBottom: 16 }}>
                    <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div className="eyebrow">{mediaIssueCopy.deadLetterTitle}</div>
                        <div className="muted" style={{ marginTop: 8 }}>
                          {mediaIssueCopy.deadLetterDescription}
                        </div>
                      </div>
                      <div className="tag-row">
                        <span className="tag">
                          {mediaDeadLetterOverview?.total_count ?? 0} {mediaIssueCopy.itemSuffix}
                        </span>
                        {mediaDeadLetterOverview
                          ? Object.entries(mediaDeadLetterOverview.by_retry_state).map(([retryState, count]) => (
                              <span className="tag" key={retryState}>
                                {getRetryStateLabel(locale, retryState)}: {count}
                              </span>
                            ))
                          : null}
                        {mediaDeadLetterOverview
                          ? Object.entries(mediaDeadLetterOverview.by_issue_category).map(([issueCategory, count]) => (
                              <span className="tag" key={issueCategory}>
                                {getMediaIssueLabel(locale, { issue_category: issueCategory, issue_label: null })}: {count}
                              </span>
                            ))
                          : null}
                      </div>
                    </div>
                    {mediaDeadLetterOverview?.items.length ? (
                      <>
                        <div className="action-row">
                          <button
                            className="button secondary"
                            disabled={bulkRetryingDeadLetter}
                            type="button"
                            onClick={handleSelectAllDeadLetter}
                          >
                            {mediaIssueCopy.selectVisible}
                          </button>
                          <button
                            className="button secondary"
                            disabled={bulkRetryingDeadLetter || !selectedDeadLetterIds.length}
                            type="button"
                            onClick={handleClearDeadLetterSelection}
                          >
                            {mediaIssueCopy.clearSelection}
                          </button>
                          <button
                            className="button secondary"
                            disabled={bulkRetryingDeadLetter || !selectedDeadLetterIds.length}
                            type="button"
                            onClick={() => void handleBulkRetryDeadLetter("selected")}
                          >
                            {bulkRetryingDeadLetter
                              ? mediaIssueCopy.retrying
                              : `${mediaIssueCopy.retrySelectedPrefix} (${selectedDeadLetterIds.length})`}
                          </button>
                          <button
                            className="button secondary"
                            disabled={bulkRetryingDeadLetter}
                            type="button"
                            onClick={() => void handleBulkRetryDeadLetter("all")}
                          >
                            {bulkRetryingDeadLetter ? mediaIssueCopy.retrying : mediaIssueCopy.retryAll}
                          </button>
                        </div>
                        <div className="record-list compact-list">
                          {mediaDeadLetterOverview.items.map((item) => (
                            <article className="record-card" key={item.media_id}>
                              <label className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                  <input
                                    checked={selectedDeadLetterIds.includes(item.media_id)}
                                    disabled={bulkRetryingDeadLetter || !canRetryMediaIssue(item)}
                                    type="checkbox"
                                    onChange={(event) =>
                                      handleToggleDeadLetterSelection(item.media_id, event.target.checked)
                                    }
                                  />
                                  <div>
                                    <div className="eyebrow">{item.media_type}</div>
                                    <div>{item.original_filename}</div>
                                  </div>
                                </div>
                                <div className="tag-row">
                                  <span className="tag">{getProcessingStatusLabel(locale, item.processing_status)}</span>
                                  <span className="tag">{item.storage_provider}</span>
                                  {item.processing_retry_state ? (
                                    <span className="tag">
                                      {mediaIssueCopy.retryStatePrefix} {getRetryStateLabel(locale, item.processing_retry_state)}
                                    </span>
                                  ) : null}
                                  {getMediaIssueLabel(locale, item) ? (
                                    <span className="tag">{getMediaIssueLabel(locale, item)}</span>
                                  ) : null}
                                </div>
                              </label>
                              <div className="muted" style={{ marginTop: 8 }}>
                                {mediaIssueCopy.lastAttempt}: {formatHistoryTimestampLabel(item.processing_last_attempt_at)}
                              </div>
                              {item.processing_last_failure_at ? (
                                <div className="muted" style={{ marginTop: 6 }}>
                                  {mediaIssueCopy.lastFailure}: {formatHistoryTimestampLabel(item.processing_last_failure_at)}
                                </div>
                              ) : null}
                              {typeof item.processing_retry_count === "number" ? (
                                <div className="muted" style={{ marginTop: 6 }}>
                                  {mediaIssueCopy.retryBudgetUsed}: {item.processing_retry_count}
                                  {typeof item.processing_retry_max_attempts === "number"
                                    ? ` / ${item.processing_retry_max_attempts}`
                                    : ""}
                                </div>
                              ) : null}
                              {getMediaIssueAction(locale, item).label ? (
                                <div className="notice" style={{ marginTop: 10 }}>
                                  {getMediaIssueAction(locale, item).label}
                                  {getMediaIssueAction(locale, item).detail ? `: ${getMediaIssueAction(locale, item).detail}` : ""}
                                </div>
                              ) : null}
                              {canWriteWorkspace || buildMediaIssueSettingsHref(workspaceId, item) ? (
                                <div className="action-row" style={{ marginTop: 10 }}>
                                  {canWriteWorkspace && canRetryMediaIssue(item) ? (
                                    <button
                                      className="button secondary"
                                      disabled={retryingMediaId === item.media_id}
                                      type="button"
                                      onClick={() => void handleRetryMediaProcessing(item.media_id)}
                                    >
                                      {retryingMediaId === item.media_id ? mediaIssueCopy.retrying : mediaIssueCopy.retryNow}
                                    </button>
                                  ) : null}
                                  {buildMediaIssueSettingsHref(workspaceId, item) ? (
                                    <Link
                                      className="button secondary"
                                      href={buildMediaIssueSettingsHref(workspaceId, item) ?? "#"}
                                    >
                                      {mediaIssueCopy.openSettings}
                                    </Link>
                                  ) : null}
                                </div>
                              ) : null}
                              {item.processing_error ? (
                                <div className="notice error" style={{ marginTop: 10 }}>
                                  {item.processing_error}
                                </div>
                              ) : null}
                            </article>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="notice">{mediaIssueCopy.noDeadLetter}</div>
                    )}
                  </div>
                </>
              ) : null}
              {mediaStorageSummary?.largest_item_name ? (
                <div className="muted" style={{ marginBottom: 16 }}>
                  {detailCopy.largestFilePrefix}: {mediaStorageSummary.largest_item_name} ({mediaStorageSummary.largest_item_size_label})
                </div>
              ) : null}
              <div className="record-list compact-list">
                {mediaAssets.length ? (
                  mediaAssets.map((asset) => renderMediaAssetCard(asset))
                ) : (
                  <div className="notice">{detailCopy.noMedia}</div>
                )}
              </div>

              <div className="record-card form-stack">
                <div className="eyebrow">{detailCopy.reminderSectionTitle}</div>
                <div className="muted">
                  {detailCopy.reminderSectionDescription}
                </div>
                <div className="form-stack">
                  <div className="inline-fields">
                    <label className="field">
                      <span className="field-label">{detailCopy.reminderTitleLabel}</span>
                      <input
                        className="input"
                        disabled={!canWriteWorkspace}
                        value={reminderForm.title}
                        onChange={(event) =>
                          setReminderForm((prev) => ({
                            ...prev,
                            title: event.target.value,
                          }))
                        }
                        placeholder={detailCopy.reminderTitlePlaceholder}
                      />
                    </label>
                    <label className="field">
                      <span className="field-label">{detailCopy.remindAtLabel}</span>
                      <input
                        className="input"
                        type="datetime-local"
                        disabled={!canWriteWorkspace}
                        value={reminderForm.remind_at}
                        onChange={(event) =>
                          setReminderForm((prev) => ({
                            ...prev,
                            remind_at: event.target.value,
                          }))
                        }
                      />
                    </label>
                    <label className="field">
                      <span className="field-label">{detailCopy.channelLabel}</span>
                      <input className="input" disabled value={detailCopy.channelInApp} />
                    </label>
                  </div>
                  <label className="field">
                    <span className="field-label">{detailCopy.reminderNoteLabel}</span>
                    <textarea
                      className="textarea"
                      disabled={!canWriteWorkspace}
                      value={reminderForm.message}
                      onChange={(event) =>
                        setReminderForm((prev) => ({
                          ...prev,
                          message: event.target.value,
                        }))
                      }
                      placeholder={detailCopy.reminderNotePlaceholder}
                    />
                  </label>
                  <div className="action-row">
                    <button
                      className="button secondary"
                      disabled={savingReminder || !canWriteWorkspace}
                      type="button"
                      onClick={() => void handleCreateReminderSubmit()}
                    >
                      {savingReminder ? detailCopy.savingReminder : detailCopy.createReminder}
                    </button>
                  </div>
                </div>
                <div className="record-list compact-list">
                  {reminders.length ? (
                    reminders.map((reminder) => (
                      <article className="record-card" key={reminder.id}>
                        <div className="eyebrow">{reminder.channel_code}</div>
                        <h4 style={{ margin: "8px 0 6px", fontSize: 18 }}>
                          {reminder.title || selectedRecord.title || detailCopy.untitledReminder}
                        </h4>
                        <div className="muted">{formatReminderTimestampLabel(reminder.remind_at)}</div>
                        {reminder.message ? (
                          <p style={{ margin: "10px 0 0", lineHeight: 1.6 }}>{reminder.message}</p>
                        ) : null}
                        <div className="tag-row">
                          <span className="tag">{formatReminderStatusLabel(reminder.status)}</span>
                          <span className="tag">{formatReminderEnabledLabel(reminder.is_enabled)}</span>
                        </div>
                        <div className="action-row" style={{ marginTop: 12 }}>
                          <button
                            className="button secondary"
                            type="button"
                            disabled={!canWriteWorkspace}
                            onClick={() =>
                              void onUpdateReminder(reminder.id, {
                                is_enabled: !reminder.is_enabled,
                              })
                            }
                          >
                            {reminder.is_enabled ? detailCopy.pauseReminder : detailCopy.enableReminder}
                          </button>
                          {reminder.status !== "completed" ? (
                            <button
                              className="button secondary"
                              type="button"
                              disabled={!canWriteWorkspace}
                              onClick={() =>
                                void onUpdateReminder(reminder.id, {
                                  status: "completed",
                                  is_enabled: false,
                                })
                              }
                            >
                              {detailCopy.markReminderDone}
                            </button>
                          ) : null}
                          <button
                            className="button secondary"
                            type="button"
                            disabled={!canWriteWorkspace}
                            onClick={() => void onDeleteReminder(reminder.id)}
                          >
                            {detailCopy.deleteReminder}
                          </button>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="notice">{detailCopy.noReminders}</div>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </form>

        <div style={{ marginTop: 20 }} className="action-row">
          <button
            className={viewMode === "timeline" ? "button" : "button secondary"}
            type="button"
            onClick={() => setViewMode("timeline")}
          >
            {detailCopy.timelineView}
          </button>
          <button
            className={viewMode === "list" ? "button" : "button secondary"}
            type="button"
            onClick={() => setViewMode("list")}
          >
            {detailCopy.flatListView}
          </button>
        </div>

        {viewMode === "timeline" ? (
          <div style={{ marginTop: 20 }} className="record-list">
            {timelineDays.length ? (
              timelineDays.map((day) => (
                <section className="record-card" key={day.date}>
                  <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div className="eyebrow">{detailCopy.timelineDayLabel}</div>
                      <h3 style={{ margin: "8px 0 6px", fontSize: 20 }}>{formatTimelineDateLabel(day.date)}</h3>
                      <div className="muted">
                        {formatTimelineCountLabel(day.count)}
                      </div>
                    </div>
                    <div className="tag-row" style={{ marginTop: 0, justifyContent: "flex-end" }}>
                      <span className="tag">{day.date}</span>
                      {day.avoid_count ? <span className="tag">{formatAvoidCountLabel(day.avoid_count)}</span> : null}
                    </div>
                  </div>
                  {day.top_places.length ? (
                    <div className="tag-row" style={{ marginTop: 14 }}>
                      {day.top_places.map((place) => (
                        <span className="tag" key={place}>
                          {place}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <div className="record-list compact-list" style={{ marginTop: 14 }}>
                    {day.items.map((record) => renderRecordCard(record))}
                  </div>
                </section>
              ))
            ) : (
              <div className="notice">
                {detailCopy.noRecords}
              </div>
            )}
          </div>
        ) : (
          <div style={{ marginTop: 20 }} className="record-list">
            {records.length ? (
              records.map((record) => renderRecordCard(record))
            ) : (
              <div className="notice">
                {detailCopy.noRecords}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}


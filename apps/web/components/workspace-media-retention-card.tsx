"use client";

import { useEffect, useState } from "react";

import { cleanupMediaRetention, getMediaRetentionReport } from "../lib/api";
import type { LocaleCode } from "../lib/locale";
import type { MediaRetentionCleanupResult, MediaRetentionItem, MediaRetentionReport } from "../lib/types";

const COPY: Record<
  LocaleCode,
  {
    eyebrow: string;
    title: string;
    description: string;
    refresh: string;
    refreshing: string;
    threshold: string;
    totalTracked: string;
    agedMedia: string;
    storageRisk: string;
    noLargestItems: string;
    noCandidates: string;
    largestTitle: string;
    candidatesTitle: string;
    orphanFiles: string;
    missingFiles: string;
    oldestMedia: string;
    cleanupNote: string;
    ageDays: string;
    createdAt: string;
    missing: string;
    allHealthy: string;
    days: string;
    loadFailed: string;
    ownerActions: string;
    editorReadOnly: string;
    selectLabel: string;
    selectAll: string;
    clearSelection: string;
    selectedSummary: string;
    deleteSelected: string;
    deleteOrphans: string;
    processing: string;
    cleanupFailed: string;
    cleanupCompleted: string;
    cleanupConfirmSelected: string;
    cleanupConfirmOrphans: string;
  }
> = {
  "zh-CN": {
    eyebrow: "媒体保留",
    title: "媒体保留报告",
    description: "先做只读分析，帮助你识别长期占空间的旧附件、缺失文件和孤儿文件，后续再接自动归档或清理动作。",
    refresh: "刷新报告",
    refreshing: "刷新中...",
    threshold: "过旧阈值",
    totalTracked: "已跟踪媒体",
    agedMedia: "超过阈值的媒体",
    storageRisk: "存储风险",
    noLargestItems: "当前没有媒体文件。",
    noCandidates: "当前没有超过阈值的清理候选。",
    largestTitle: "最大文件",
    candidatesTitle: "清理候选",
    orphanFiles: "孤儿文件",
    missingFiles: "缺失跟踪文件",
    oldestMedia: "最老媒体",
    cleanupNote: "建议优先处理“清理候选”中的大文件，再决定是否做冷热分层或归档。",
    ageDays: "文件年龄",
    createdAt: "创建时间",
    missing: "文件缺失",
    allHealthy: "已跟踪文件完整",
    days: "天",
    loadFailed: "加载保留报告失败",
    ownerActions: "清理动作",
    editorReadOnly: "当前为 editor，只能查看保留分析，不能执行删除。",
    selectLabel: "选择候选",
    selectAll: "全选候选",
    clearSelection: "清空选择",
    selectedSummary: "已选候选",
    deleteSelected: "删除已选旧媒体",
    deleteOrphans: "删除孤儿文件",
    processing: "处理中...",
    cleanupFailed: "执行清理失败",
    cleanupCompleted: "清理已完成",
    cleanupConfirmSelected: "确定删除当前选中的旧媒体吗？此操作会删除数据库记录和本地文件。",
    cleanupConfirmOrphans: "确定删除当前工作区检测到的孤儿文件吗？此操作不可撤销。",
  },
  en: {
    eyebrow: "Media Retention",
    title: "Media Retention Report",
    description:
      "Read-only analysis for long-term storage growth. It highlights stale attachments, missing tracked files, and local orphan files before any cleanup automation is introduced.",
    refresh: "Refresh report",
    refreshing: "Refreshing...",
    threshold: "Stale threshold",
    totalTracked: "Tracked media",
    agedMedia: "Older than threshold",
    storageRisk: "Storage risk",
    noLargestItems: "No media files found.",
    noCandidates: "No cleanup candidates exceed the current age threshold.",
    largestTitle: "Largest files",
    candidatesTitle: "Cleanup candidates",
    orphanFiles: "Orphan files",
    missingFiles: "Missing tracked files",
    oldestMedia: "Oldest media",
    cleanupNote: "Prioritize large stale files first, then decide whether the next step should be archive tiers or explicit cleanup actions.",
    ageDays: "Age",
    createdAt: "Created",
    missing: "File missing",
    allHealthy: "Tracked files are present",
    days: "days",
    loadFailed: "Failed to load retention report",
    ownerActions: "Cleanup Actions",
    editorReadOnly: "Editor access can review retention analysis but cannot execute deletions.",
    selectLabel: "Select candidate",
    selectAll: "Select all",
    clearSelection: "Clear selection",
    selectedSummary: "Selected candidates",
    deleteSelected: "Delete selected stale media",
    deleteOrphans: "Delete orphan files",
    processing: "Processing...",
    cleanupFailed: "Failed to execute cleanup",
    cleanupCompleted: "Cleanup completed",
    cleanupConfirmSelected:
      "Delete the selected stale media now? This removes both the tracked record and local file.",
    cleanupConfirmOrphans:
      "Delete all detected orphan files in this workspace now? This cannot be undone.",
  },
  ja: {
    eyebrow: "メディア保持",
    title: "メディア保持レポート",
    description:
      "長期的なストレージ増加を確認するための読み取り専用レポートです。古い添付、欠損ファイル、孤立ファイルを整理前に把握できます。",
    refresh: "レポート更新",
    refreshing: "更新中...",
    threshold: "古いとみなす日数",
    totalTracked: "追跡中メディア",
    agedMedia: "しきい値超過",
    storageRisk: "ストレージリスク",
    noLargestItems: "メディアファイルはまだありません。",
    noCandidates: "現在のしきい値を超える候補はありません。",
    largestTitle: "最大ファイル",
    candidatesTitle: "整理候補",
    orphanFiles: "孤立ファイル",
    missingFiles: "欠損した追跡ファイル",
    oldestMedia: "最古のメディア",
    cleanupNote: "まず大きく古いファイルを確認し、その後でアーカイブ層や明示的な削除機能を追加するのが安全です。",
    ageDays: "経過日数",
    createdAt: "作成日時",
    missing: "ファイル欠損",
    allHealthy: "追跡ファイルは揃っています",
    days: "日",
    loadFailed: "保持レポートの読み込みに失敗しました",
    ownerActions: "整理操作",
    editorReadOnly: "editor 権限では保持分析のみ確認でき、削除は実行できません。",
    selectLabel: "候補を選択",
    selectAll: "候補を全選択",
    clearSelection: "選択解除",
    selectedSummary: "選択済み候補",
    deleteSelected: "選択した古いメディアを削除",
    deleteOrphans: "孤立ファイルを削除",
    processing: "処理中...",
    cleanupFailed: "整理の実行に失敗しました",
    cleanupCompleted: "整理が完了しました",
    cleanupConfirmSelected: "選択した古いメディアを削除しますか。DB レコードとローカルファイルの両方が削除されます。",
    cleanupConfirmOrphans: "このワークスペースで検出された孤立ファイルを削除しますか。この操作は元に戻せません。",
  },
};

function formatCreatedAt(value: string, locale: LocaleCode) {
  return new Date(value).toLocaleString(locale);
}

function renderItem(item: MediaRetentionItem, locale: LocaleCode, copy: (typeof COPY)[LocaleCode]) {
  return (
    <article className="message" key={item.media_id}>
      <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ minWidth: 0 }}>
          <div className="eyebrow">{item.media_type}</div>
          <div style={{ marginTop: 8, fontWeight: 600, wordBreak: "break-word" }}>{item.original_filename}</div>
          <div className="muted" style={{ marginTop: 8 }}>
            {copy.createdAt} {formatCreatedAt(item.created_at, locale)}
          </div>
        </div>
        <div style={{ textAlign: "right", marginLeft: 16 }}>
          <div style={{ fontWeight: 600 }}>{item.size_label}</div>
          <div className="muted" style={{ marginTop: 8 }}>
            {copy.ageDays} {item.age_days} {copy.days}
          </div>
        </div>
      </div>
      <div className="tag-row" style={{ marginTop: 12 }}>
        <span className="tag">{item.processing_status}</span>
        {item.file_missing ? <span className="tag">{copy.missing}</span> : null}
      </div>
    </article>
  );
}

export function WorkspaceMediaRetentionCard({
  token,
  workspaceId,
  locale,
  role,
}: {
  token: string;
  workspaceId: string;
  locale: LocaleCode;
  role: "owner" | "editor";
}) {
  const copy = COPY[locale];
  const [olderThanDays, setOlderThanDays] = useState(90);
  const [report, setReport] = useState<MediaRetentionReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMediaIds, setSelectedMediaIds] = useState<string[]>([]);
  const [cleanupLoading, setCleanupLoading] = useState(false);
  const [cleanupError, setCleanupError] = useState("");
  const [cleanupResult, setCleanupResult] = useState<MediaRetentionCleanupResult | null>(null);

  const loadReport = async (threshold: number) => {
    setLoading(true);
    setError("");
    try {
      const result = await getMediaRetentionReport(token, workspaceId, {
        olderThanDays: threshold,
        limit: 5,
      });
      setReport(result.report);
      setSelectedMediaIds((current) =>
        current.filter((mediaId) => result.report.retention_candidates.some((item) => item.media_id === mediaId)),
      );
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : copy.loadFailed);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadReport(olderThanDays);
  }, [olderThanDays, token, workspaceId]);

  const storageRiskLabel = report
    ? [
        report.missing_file_count ? `${report.missing_file_count} ${copy.missingFiles}` : copy.allHealthy,
        `${report.orphan_file_count} ${copy.orphanFiles}`,
      ].join(" / ")
    : "-";

  const toggleSelectedMedia = (mediaId: string) => {
    setSelectedMediaIds((current) =>
      current.includes(mediaId) ? current.filter((item) => item !== mediaId) : [...current, mediaId],
    );
  };

  const handleCleanup = async ({
    mediaIds,
    purgeOrphanFiles,
    confirmMessage,
  }: {
    mediaIds: string[];
    purgeOrphanFiles: boolean;
    confirmMessage: string;
  }) => {
    if (!window.confirm(confirmMessage)) {
      return;
    }

    setCleanupLoading(true);
    setCleanupError("");
    try {
      const result = await cleanupMediaRetention(token, workspaceId, {
        mediaIds,
        olderThanDays,
        purgeOrphanFiles,
        dryRun: false,
      });
      setCleanupResult(result.result);
      await loadReport(olderThanDays);
    } catch (caught) {
      setCleanupError(caught instanceof Error ? caught.message : copy.cleanupFailed);
    } finally {
      setCleanupLoading(false);
    }
  };

  return (
    <section className="record-card" style={{ marginTop: 24 }}>
      <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
        <div>
          <div className="eyebrow">{copy.eyebrow}</div>
          <div style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 8 }}>{copy.title}</div>
          <div className="muted" style={{ marginTop: 8, lineHeight: 1.7 }}>
            {copy.description}
          </div>
        </div>
        <div className="form-stack" style={{ minWidth: 220 }}>
          <label className="field">
            <span className="field-label">{copy.threshold}</span>
            <select
              className="input"
              disabled={loading}
              value={olderThanDays}
              onChange={(event) => setOlderThanDays(Number(event.target.value))}
            >
              <option value={30}>30 {copy.days}</option>
              <option value={90}>90 {copy.days}</option>
              <option value={180}>180 {copy.days}</option>
              <option value={365}>365 {copy.days}</option>
            </select>
          </label>
          <button className="button secondary" disabled={loading} type="button" onClick={() => void loadReport(olderThanDays)}>
            {loading ? copy.refreshing : copy.refresh}
          </button>
        </div>
      </div>
      {error ? (
        <div className="notice error" style={{ marginTop: 16 }}>
          {error}
        </div>
      ) : null}
      {cleanupError ? (
        <div className="notice error" style={{ marginTop: 16 }}>
          {cleanupError}
        </div>
      ) : null}
      {cleanupResult ? (
        <div className="notice" style={{ marginTop: 16 }}>
          {copy.cleanupCompleted}: {cleanupResult.candidate_media_count} / {cleanupResult.candidate_media_size_label},{" "}
          {cleanupResult.orphan_file_count} {copy.orphanFiles.toLowerCase ? copy.orphanFiles.toLowerCase() : copy.orphanFiles}
          {cleanupResult.orphan_file_count || cleanupResult.orphan_file_size_bytes
            ? ` / ${cleanupResult.orphan_file_size_label}`
            : ""}
        </div>
      ) : null}
      <div className="detail-grid" style={{ marginTop: 16 }}>
        <div className="subtle-card">
          <div className="eyebrow">{copy.totalTracked}</div>
          <div style={{ marginTop: 8, fontWeight: 600 }}>
            {report ? `${report.total_count} / ${report.total_size_label}` : "-"}
          </div>
          {report?.oldest_media_age_days != null ? (
            <div className="muted" style={{ marginTop: 8 }}>
              {copy.oldestMedia} {report.oldest_media_age_days} {copy.days}
            </div>
          ) : null}
        </div>
        <div className="subtle-card">
          <div className="eyebrow">{copy.agedMedia}</div>
          <div style={{ marginTop: 8, fontWeight: 600 }}>
            {report ? `${report.old_item_count} / ${report.old_item_size_label}` : "-"}
          </div>
        </div>
        <div className="subtle-card">
          <div className="eyebrow">{copy.storageRisk}</div>
          <div style={{ marginTop: 8, fontWeight: 600 }}>{storageRiskLabel}</div>
        </div>
      </div>
      <div className="muted" style={{ marginTop: 16 }}>
        {report
          ? `${copy.orphanFiles}: ${report.orphan_file_count} / ${report.orphan_file_size_label}. ${copy.cleanupNote}`
          : copy.cleanupNote}
      </div>
      <section className="subtle-card" style={{ marginTop: 16 }}>
        <div className="eyebrow">{copy.ownerActions}</div>
        {role === "owner" ? (
          <div className="form-stack" style={{ marginTop: 12 }}>
            <div className="muted">
              {copy.selectedSummary}: {selectedMediaIds.length}
            </div>
            <div className="action-row">
              <button
                className="button secondary"
                disabled={cleanupLoading || !report?.retention_candidates.length}
                type="button"
                onClick={() => setSelectedMediaIds(report?.retention_candidates.map((item) => item.media_id) ?? [])}
              >
                {copy.selectAll}
              </button>
              <button
                className="button secondary"
                disabled={cleanupLoading || !selectedMediaIds.length}
                type="button"
                onClick={() => setSelectedMediaIds([])}
              >
                {copy.clearSelection}
              </button>
              <button
                className="button secondary"
                disabled={cleanupLoading || !selectedMediaIds.length}
                type="button"
                onClick={() =>
                  void handleCleanup({
                    mediaIds: selectedMediaIds,
                    purgeOrphanFiles: false,
                    confirmMessage: copy.cleanupConfirmSelected,
                  })
                }
              >
                {cleanupLoading ? copy.processing : copy.deleteSelected}
              </button>
              <button
                className="button secondary"
                disabled={cleanupLoading || !report?.orphan_file_count}
                type="button"
                onClick={() =>
                  void handleCleanup({
                    mediaIds: [],
                    purgeOrphanFiles: true,
                    confirmMessage: copy.cleanupConfirmOrphans,
                  })
                }
              >
                {cleanupLoading ? copy.processing : copy.deleteOrphans}
              </button>
            </div>
          </div>
        ) : (
          <div className="notice" style={{ marginTop: 12 }}>
            {copy.editorReadOnly}
          </div>
        )}
      </section>
      <div className="two-column-grid" style={{ marginTop: 16 }}>
        <section className="subtle-card">
          <div className="eyebrow">{copy.largestTitle}</div>
          <div className="record-list compact-list" style={{ marginTop: 12 }}>
            {report?.largest_items.length ? (
              report.largest_items.map((item) => renderItem(item, locale, copy))
            ) : (
              <div className="notice">{copy.noLargestItems}</div>
            )}
          </div>
        </section>
        <section className="subtle-card">
          <div className="eyebrow">{copy.candidatesTitle}</div>
          <div className="record-list compact-list" style={{ marginTop: 12 }}>
            {report?.retention_candidates.length ? (
              report.retention_candidates.map((item) => (
                <div key={item.media_id}>
                  {role === "owner" ? (
                    <label className="muted" style={{ display: "block", marginBottom: 8 }}>
                      <input
                        checked={selectedMediaIds.includes(item.media_id)}
                        disabled={cleanupLoading}
                        onChange={() => toggleSelectedMedia(item.media_id)}
                        style={{ marginRight: 8 }}
                        type="checkbox"
                      />
                      {copy.selectLabel}
                    </label>
                  ) : null}
                  {renderItem(item, locale, copy)}
                </div>
              ))
            ) : (
              <div className="notice">{copy.noCandidates}</div>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}

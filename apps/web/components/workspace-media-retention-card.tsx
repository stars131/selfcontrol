"use client";

import { useEffect, useState } from "react";

import { getMediaRetentionReport } from "../lib/api";
import type { LocaleCode } from "../lib/locale";
import type { MediaRetentionItem, MediaRetentionReport } from "../lib/types";

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
}: {
  token: string;
  workspaceId: string;
  locale: LocaleCode;
}) {
  const copy = COPY[locale];
  const [olderThanDays, setOlderThanDays] = useState(90);
  const [report, setReport] = useState<MediaRetentionReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadReport = async (threshold: number) => {
    setLoading(true);
    setError("");
    try {
      const result = await getMediaRetentionReport(token, workspaceId, {
        olderThanDays: threshold,
        limit: 5,
      });
      setReport(result.report);
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
              report.retention_candidates.map((item) => renderItem(item, locale, copy))
            ) : (
              <div className="notice">{copy.noCandidates}</div>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}

"use client";

import type { LocaleCode } from "../lib/locale";
import type {
} from "../lib/types";
import { MediaRetentionItemCard } from "./media-retention-item-card";
import { WorkspaceMediaRetentionActions } from "./workspace-media-retention-actions";
import { WorkspaceMediaRetentionLists } from "./workspace-media-retention-lists";
import { WorkspaceMediaRetentionSummary } from "./workspace-media-retention-summary";
import {
  useWorkspaceMediaRetentionController,
} from "./use-workspace-media-retention-controller";

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
    archivedMedia: string;
    remoteMedia?: string;
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
    archived: string;
    primary: string;
    remoteReference?: string;
    allHealthy: string;
    days: string;
    loadFailed: string;
    ownerActions: string;
    editorReadOnly: string;
    selectLabel: string;
    selectAll: string;
    clearSelection: string;
    selectedSummary: string;
    archiveSelected: string;
    deleteSelected: string;
    deleteOrphans: string;
    processing: string;
    actionFailed: string;
    archiveCompleted: string;
    cleanupCompleted: string;
    archiveConfirmSelected: string;
    cleanupConfirmSelected: string;
    cleanupConfirmOrphans: string;
  }
> = {
  "zh-CN": {
    eyebrow: "媒体保留",
    title: "媒体保留报告",
    description: "用来识别旧附件、已归档附件、缺失文件和孤儿文件，帮助你先归档再清理。",
    refresh: "刷新报告",
    refreshing: "刷新中...",
    threshold: "过旧阈值",
    totalTracked: "已跟踪媒体",
    agedMedia: "超过阈值",
    archivedMedia: "已归档媒体",
    storageRisk: "存储风险",
    noLargestItems: "当前没有媒体文件。",
    noCandidates: "当前没有未归档的旧媒体候选。",
    largestTitle: "最大文件",
    candidatesTitle: "待处理候选",
    orphanFiles: "孤儿文件",
    missingFiles: "缺失跟踪文件",
    oldestMedia: "最老媒体",
    cleanupNote: "建议先把旧但仍可能有价值的附件归档，再对确认不需要的内容执行删除。",
    ageDays: "文件年龄",
    createdAt: "创建时间",
    missing: "文件缺失",
    archived: "已归档",
    primary: "主存储",
    allHealthy: "已跟踪文件完整",
    days: "天",
    loadFailed: "加载保留报告失败",
    ownerActions: "归档与清理动作",
    editorReadOnly: "当前为 editor，只能查看分析，不能执行归档或删除。",
    selectLabel: "选择候选",
    selectAll: "全选候选",
    clearSelection: "清空选择",
    selectedSummary: "已选候选",
    archiveSelected: "归档已选旧媒体",
    deleteSelected: "删除已选旧媒体",
    deleteOrphans: "删除孤儿文件",
    processing: "处理中...",
    actionFailed: "执行操作失败",
    archiveCompleted: "归档已完成",
    cleanupCompleted: "清理已完成",
    archiveConfirmSelected: "确定将当前选中的旧媒体归档吗？归档后仍可访问，但会移动到 archive 存储层。",
    cleanupConfirmSelected: "确定删除当前选中的旧媒体吗？此操作会删除数据库记录和本地文件。",
    cleanupConfirmOrphans: "确定删除当前工作区检测到的孤儿文件吗？此操作不可撤销。",
  },
  en: {
    eyebrow: "Media Retention",
    title: "Media Retention Report",
    description:
      "Identify stale attachments, archived files, missing tracked files, and orphan files so old media can be archived before deletion.",
    refresh: "Refresh report",
    refreshing: "Refreshing...",
    threshold: "Stale threshold",
    totalTracked: "Tracked media",
    agedMedia: "Older than threshold",
    archivedMedia: "Archived media",
    remoteMedia: "Remote references",
    storageRisk: "Storage risk",
    noLargestItems: "No media files found.",
    noCandidates: "No unarchived stale media candidates exceed the current threshold.",
    largestTitle: "Largest files",
    candidatesTitle: "Action candidates",
    orphanFiles: "Orphan files",
    missingFiles: "Missing tracked files",
    oldestMedia: "Oldest media",
    cleanupNote: "Archive stale but still valuable files first, then delete only the content you are sure you no longer need.",
    ageDays: "Age",
    createdAt: "Created",
    missing: "File missing",
    archived: "Archived",
    primary: "Primary",
    remoteReference: "Remote reference",
    allHealthy: "Tracked files are present",
    days: "days",
    loadFailed: "Failed to load retention report",
    ownerActions: "Archive and Cleanup Actions",
    editorReadOnly: "Editor access can review analysis but cannot archive or delete files.",
    selectLabel: "Select candidate",
    selectAll: "Select all",
    clearSelection: "Clear selection",
    selectedSummary: "Selected candidates",
    archiveSelected: "Archive selected stale media",
    deleteSelected: "Delete selected stale media",
    deleteOrphans: "Delete orphan files",
    processing: "Processing...",
    actionFailed: "Failed to execute action",
    archiveCompleted: "Archive completed",
    cleanupCompleted: "Cleanup completed",
    archiveConfirmSelected:
      "Archive the selected stale media now? They will remain accessible but move into the archive storage tier.",
    cleanupConfirmSelected:
      "Delete the selected stale media now? This removes both the tracked record and local file.",
    cleanupConfirmOrphans: "Delete all detected orphan files in this workspace now? This cannot be undone.",
  },
  ja: {
    eyebrow: "メディア保持",
    title: "メディア保持レポート",
    description:
      "古い添付、アーカイブ済み添付、欠損ファイル、孤立ファイルを把握し、削除前に安全にアーカイブできます。",
    refresh: "レポート更新",
    refreshing: "更新中...",
    threshold: "古いとみなす日数",
    totalTracked: "追跡中メディア",
    agedMedia: "しきい値超過",
    archivedMedia: "アーカイブ済み",
    storageRisk: "ストレージリスク",
    noLargestItems: "メディアファイルはまだありません。",
    noCandidates: "未アーカイブの古い候補はありません。",
    largestTitle: "最大ファイル",
    candidatesTitle: "処理候補",
    orphanFiles: "孤立ファイル",
    missingFiles: "欠損した追跡ファイル",
    oldestMedia: "最古のメディア",
    cleanupNote: "価値が残る古いファイルは先にアーカイブし、不要と確認できたものだけを削除するのが安全です。",
    ageDays: "経過日数",
    createdAt: "作成日時",
    missing: "ファイル欠損",
    archived: "アーカイブ済み",
    primary: "通常保存",
    allHealthy: "追跡ファイルは揃っています",
    days: "日",
    loadFailed: "保持レポートの読み込みに失敗しました",
    ownerActions: "アーカイブと整理操作",
    editorReadOnly: "editor 権限では分析のみ確認でき、アーカイブや削除は実行できません。",
    selectLabel: "候補を選択",
    selectAll: "候補を全選択",
    clearSelection: "選択解除",
    selectedSummary: "選択済み候補",
    archiveSelected: "選択した古いメディアをアーカイブ",
    deleteSelected: "選択した古いメディアを削除",
    deleteOrphans: "孤立ファイルを削除",
    processing: "処理中...",
    actionFailed: "操作の実行に失敗しました",
    archiveCompleted: "アーカイブが完了しました",
    cleanupCompleted: "整理が完了しました",
    archiveConfirmSelected:
      "選択した古いメディアをアーカイブしますか。引き続き参照できますが、archive 層へ移動されます。",
    cleanupConfirmSelected:
      "選択した古いメディアを削除しますか。DB レコードとローカルファイルの両方が削除されます。",
    cleanupConfirmOrphans: "このワークスペースで検出された孤立ファイルを削除しますか。この操作は元に戻せません。",
  },
};

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
  const remoteMediaLabel = copy.remoteMedia ?? "Remote media";
  const remoteReferenceLabel = copy.remoteReference ?? "Remote reference";
  const {
    olderThanDays,
    report,
    loading,
    error,
    selectedMediaIds,
    actionLoading,
    actionError,
    actionResult,
    storageRiskLabel,
    setOlderThanDays,
    loadReport,
    toggleSelectedMedia,
    selectAllCandidates,
    clearSelection,
    handleArchive,
    handleCleanup,
  } = useWorkspaceMediaRetentionController({
    token,
    workspaceId,
    remoteMediaLabel,
    missingFilesLabel: copy.missingFiles,
    orphanFilesLabel: copy.orphanFiles,
    allHealthyLabel: copy.allHealthy,
    loadFailedMessage: copy.loadFailed,
    actionFailedMessage: copy.actionFailed,
  });

  const actionMessage =
    actionResult?.kind === "archive"
      ? `${copy.archiveCompleted}: ${actionResult.result.candidate_media_count} / ${actionResult.result.candidate_media_size_label}`
      : actionResult?.kind === "cleanup"
        ? `${copy.cleanupCompleted}: ${actionResult.result.candidate_media_count} / ${actionResult.result.candidate_media_size_label}, ${actionResult.result.orphan_file_count} / ${actionResult.result.orphan_file_size_label}`
        : "";

  return (
    <section className="record-card" style={{ marginTop: 24 }}>
      <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
        <div>
          <div className="eyebrow">{copy.eyebrow}</div>
          <div style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 8 }}>{copy.title}</div>
          <div className="muted" style={{ marginTop: 8, lineHeight: 1.7 }}>{copy.description}</div>
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

      {error ? <div className="notice error" style={{ marginTop: 16 }}>{error}</div> : null}
      {actionError ? <div className="notice error" style={{ marginTop: 16 }}>{actionError}</div> : null}
      {actionMessage ? <div className="notice" style={{ marginTop: 16 }}>{actionMessage}</div> : null}

      <WorkspaceMediaRetentionSummary
        copy={copy}
        remoteMediaLabel={remoteMediaLabel}
        report={report}
        storageRiskLabel={storageRiskLabel}
      />

      <WorkspaceMediaRetentionActions
        actionLoading={actionLoading}
        archiveConfirmSelected={copy.archiveConfirmSelected}
        archiveSelectedLabel={copy.archiveSelected}
        canDeleteOrphans={Boolean(report?.orphan_file_count)}
        canSelectAll={Boolean(report?.retention_candidates.length)}
        clearSelectionLabel={copy.clearSelection}
        deleteOrphansLabel={copy.deleteOrphans}
        deleteSelectedLabel={copy.deleteSelected}
        editorReadOnly={copy.editorReadOnly}
        onArchive={handleArchive}
        onCleanupOrphans={() =>
          handleCleanup({
            mediaIds: [],
            purgeOrphanFiles: true,
            confirmMessage: copy.cleanupConfirmOrphans,
          })
        }
        onCleanupSelected={() =>
          handleCleanup({
            mediaIds: selectedMediaIds,
            purgeOrphanFiles: false,
            confirmMessage: copy.cleanupConfirmSelected,
          })
        }
        onClearSelection={clearSelection}
        onSelectAllCandidates={selectAllCandidates}
        ownerActions={copy.ownerActions}
        processingLabel={copy.processing}
        role={role}
        selectedCount={selectedMediaIds.length}
        selectedSummary={copy.selectedSummary}
        selectAllLabel={copy.selectAll}
      />

      <WorkspaceMediaRetentionLists
        actionLoading={actionLoading}
        copy={copy}
        locale={locale}
        onToggleSelected={toggleSelectedMedia}
        report={report}
        role={role}
        selectedMediaIds={selectedMediaIds}
      />
    </section>
  );
}

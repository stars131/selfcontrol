import type { LocaleCode } from "../lib/locale";

export type WorkspaceExportJobsCopy = {
  eyebrow: string;
  title: string;
  description: string;
  ownerOnly: string;
  refresh: string;
  queue: string;
  loading: string;
  queued: string;
  download: string;
  empty: string;
  loadFailed: string;
  createFailed: string;
  downloadFailed: string;
};

const COPY: Record<LocaleCode, WorkspaceExportJobsCopy> = {
  "zh-CN": {
    eyebrow: "异步导出",
    title: "导出任务",
    description: "为大型工作区创建后台导出任务。完成后可下载 ZIP，无需一直保持请求连接。",
    ownerOnly: "仅工作区所有者可以创建导出任务。",
    refresh: "刷新任务",
    queue: "创建导出任务",
    loading: "处理中...",
    queued: "任务已创建",
    download: "下载结果",
    empty: "当前还没有导出任务。",
    loadFailed: "加载导出任务失败",
    createFailed: "创建导出任务失败",
    downloadFailed: "下载导出任务结果失败",
  },
  en: {
    eyebrow: "Async Export",
    title: "Export Jobs",
    description:
      "Create background export jobs for large workspaces. Download the ZIP after completion without keeping the request open.",
    ownerOnly: "Only workspace owners can create export jobs.",
    refresh: "Refresh jobs",
    queue: "Create export job",
    loading: "Processing...",
    queued: "Job created",
    download: "Download result",
    empty: "No export jobs yet.",
    loadFailed: "Failed to load jobs",
    createFailed: "Failed to create export job",
    downloadFailed: "Failed to download job artifact",
  },
  ja: {
    eyebrow: "非同期エクスポート",
    title: "エクスポートジョブ",
    description:
      "大規模ワークスペース向けにバックグラウンドのエクスポートジョブを作成できます。完了後に ZIP をダウンロードでき、リクエストを開いたまま待つ必要はありません。",
    ownerOnly: "ワークスペース所有者のみエクスポートジョブを作成できます。",
    refresh: "ジョブを更新",
    queue: "エクスポートジョブを作成",
    loading: "処理中...",
    queued: "ジョブを作成しました",
    download: "結果をダウンロード",
    empty: "エクスポートジョブはまだありません。",
    loadFailed: "エクスポートジョブの読み込みに失敗しました",
    createFailed: "エクスポートジョブの作成に失敗しました",
    downloadFailed: "ジョブ成果物のダウンロードに失敗しました",
  },
};

export function getWorkspaceExportJobsCopy(locale: LocaleCode): WorkspaceExportJobsCopy {
  return COPY[locale];
}

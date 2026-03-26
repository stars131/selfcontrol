import type { LocaleCode } from "./locale";
import type { WorkspaceTransferJob } from "./types";

const JOB_TYPE_LABELS: Record<LocaleCode, Record<string, string>> = {
  en: {
    export: "export",
    import: "import",
  },
  "zh-CN": {
    export: "导出",
    import: "导入",
  },
  ja: {
    export: "エクスポート",
    import: "インポート",
  },
};

const JOB_STATUS_LABELS: Record<LocaleCode, Record<string, string>> = {
  en: {
    completed: "completed",
    failed: "failed",
    pending: "pending",
    running: "running",
  },
  "zh-CN": {
    completed: "已完成",
    failed: "失败",
    pending: "等待中",
    running: "执行中",
  },
  ja: {
    completed: "完了",
    failed: "失敗",
    pending: "待機中",
    running: "実行中",
  },
};

export function getWorkspaceTransferJobTypeLabel(locale: LocaleCode, jobType: WorkspaceTransferJob["job_type"]): string {
  return JOB_TYPE_LABELS[locale][jobType] ?? jobType;
}

export function getWorkspaceTransferJobStatusLabel(locale: LocaleCode, status: WorkspaceTransferJob["status"]): string {
  return JOB_STATUS_LABELS[locale][status] ?? status;
}

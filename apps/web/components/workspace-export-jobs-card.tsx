"use client";

import { useEffect, useState } from "react";

import {
  createWorkspaceExportJob,
  downloadWorkspaceTransferJob,
  listWorkspaceTransferJobs,
} from "../lib/api";
import type { LocaleCode } from "../lib/locale";
import type { WorkspaceTransferJob } from "../lib/types";

const COPY: Record<
  LocaleCode,
  {
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
  }
> = {
  "zh-CN": {
    eyebrow: "异步导出",
    title: "导出任务",
    description: "为大工作区创建后台导出任务。完成后可下载 ZIP，不需要一直等待请求保持连接。",
    ownerOnly: "只有 owner 可以创建导出任务。",
    refresh: "刷新任务",
    queue: "创建导出任务",
    loading: "处理中...",
    queued: "任务已创建",
    download: "下载结果",
    empty: "当前没有导出任务。",
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
  },
  ja: {
    eyebrow: "非同期エクスポート",
    title: "エクスポートジョブ",
    description:
      "大きなワークスペース向けにバックグラウンドのエクスポートジョブを作成できます。完了後に ZIP を取得できます。",
    ownerOnly: "エクスポートジョブを作成できるのは owner のみです。",
    refresh: "ジョブ更新",
    queue: "エクスポートジョブ作成",
    loading: "処理中...",
    queued: "ジョブを作成しました",
    download: "結果を取得",
    empty: "エクスポートジョブはまだありません。",
  },
};

export function WorkspaceExportJobsCard({
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
  const [jobs, setJobs] = useState<WorkspaceTransferJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await listWorkspaceTransferJobs(token);
      setJobs(result.items.filter((item) => item.job_type === "export" && item.workspace_id === workspaceId));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadJobs();
  }, [token, workspaceId]);

  const handleCreateJob = async () => {
    setActionLoading(true);
    setError("");
    setMessage("");
    try {
      await createWorkspaceExportJob(token, workspaceId);
      setMessage(copy.queued);
      await loadJobs();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to create export job");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDownload = async (jobId: string) => {
    setActionLoading(true);
    setError("");
    try {
      const result = await downloadWorkspaceTransferJob(token, jobId);
      const objectUrl = window.URL.createObjectURL(result.blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = result.filename ?? `workspace-export-${jobId}.zip`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(objectUrl);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to download job artifact");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <section className="record-card" style={{ marginTop: 24 }}>
      <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
        <div>
          <div className="eyebrow">{copy.eyebrow}</div>
          <div style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 8 }}>{copy.title}</div>
          <div className="muted" style={{ marginTop: 8, lineHeight: 1.7 }}>{copy.description}</div>
        </div>
        <div className="action-row">
          <button className="button secondary" disabled={loading || actionLoading} type="button" onClick={() => void loadJobs()}>
            {loading ? copy.loading : copy.refresh}
          </button>
          {role === "owner" ? (
            <button className="button secondary" disabled={actionLoading} type="button" onClick={() => void handleCreateJob()}>
              {actionLoading ? copy.loading : copy.queue}
            </button>
          ) : null}
        </div>
      </div>

      {role !== "owner" ? <div className="notice" style={{ marginTop: 16 }}>{copy.ownerOnly}</div> : null}
      {error ? <div className="notice error" style={{ marginTop: 16 }}>{error}</div> : null}
      {message ? <div className="notice" style={{ marginTop: 16 }}>{message}</div> : null}

      <div className="record-list compact-list" style={{ marginTop: 16 }}>
        {jobs.length ? (
          jobs.map((job) => (
            <article className="message" key={job.id}>
              <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div className="eyebrow">{job.job_type} / {job.status}</div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>{job.id}</div>
                  <div className="muted" style={{ marginTop: 8 }}>{new Date(job.created_at).toLocaleString(locale)}</div>
                </div>
                {job.status === "completed" ? (
                  <button className="button secondary" disabled={actionLoading} type="button" onClick={() => void handleDownload(job.id)}>
                    {copy.download}
                  </button>
                ) : null}
              </div>
              {job.error_message ? <div className="notice error" style={{ marginTop: 12 }}>{job.error_message}</div> : null}
            </article>
          ))
        ) : (
          <div className="notice">{copy.empty}</div>
        )}
      </div>
    </section>
  );
}

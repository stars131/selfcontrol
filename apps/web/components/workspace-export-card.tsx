"use client";

import type { LocaleCode } from "../lib/locale";
import { useWorkspaceExportController } from "./use-workspace-export-controller";

const COPY: Record<
  LocaleCode,
  {
    eyebrow: string;
    title: string;
    description: string;
    ownerOnly: string;
    note: string;
    button: string;
    loading: string;
    success: string;
    failed: string;
  }
> = {
  "zh-CN": {
    eyebrow: "导出",
    title: "工作区导出",
    description: "导出当前工作区的 ZIP 快照，包含成员、记录、媒体清单和可用的本地附件文件。",
    ownerOnly: "只有 owner 可以执行导出。",
    note: "导出包不包含 provider 密钥、访问令牌或分享令牌。大体量工作区后续会补异步导出。",
    button: "下载工作区 ZIP",
    loading: "导出中...",
    success: "导出已开始下载。",
    failed: "导出失败",
  },
  en: {
    eyebrow: "Export",
    title: "Workspace Export",
    description:
      "Download a ZIP snapshot of the current workspace, including members, records, media manifest entries, and available local attachment files.",
    ownerOnly: "Only workspace owners can export.",
    note: "Provider secrets, access tokens, and share tokens are excluded. Large workspaces should move to async export in a later slice.",
    button: "Download workspace ZIP",
    loading: "Exporting...",
    success: "Export download started.",
    failed: "Export failed",
  },
  ja: {
    eyebrow: "エクスポート",
    title: "ワークスペース書き出し",
    description:
      "現在のワークスペースを ZIP スナップショットとして書き出します。メンバー、記録、メディア一覧、利用可能なローカル添付を含みます。",
    ownerOnly: "エクスポートを実行できるのは owner のみです。",
    note: "provider の秘密情報、アクセストークン、共有トークンは含まれません。大規模ワークスペース向けの非同期書き出しは後続で追加します。",
    button: "ワークスペース ZIP を取得",
    loading: "書き出し中...",
    success: "書き出しのダウンロードを開始しました。",
    failed: "書き出しに失敗しました",
  },
};

export function WorkspaceExportCard({
  token,
  workspaceId,
  workspaceSlug,
  locale,
  role,
}: {
  token: string;
  workspaceId: string;
  workspaceSlug?: string | null;
  locale: LocaleCode;
  role: "owner" | "editor";
}) {
  const copy = COPY[locale];
  const { loading, error, success, handleDownload } = useWorkspaceExportController({
    token,
    workspaceId,
    workspaceSlug,
    successMessage: copy.success,
    failedMessage: copy.failed,
  });

  return (
    <section className="record-card" style={{ marginTop: 24 }}>
      <div className="eyebrow">{copy.eyebrow}</div>
      <div style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 8 }}>{copy.title}</div>
      <div className="muted" style={{ marginTop: 8, lineHeight: 1.7 }}>
        {copy.description}
      </div>
      <div className="muted" style={{ marginTop: 8 }}>
        {copy.note}
      </div>
      {role === "owner" ? (
        <div className="action-row" style={{ marginTop: 16 }}>
          <button className="button secondary" disabled={loading} type="button" onClick={() => void handleDownload()}>
            {loading ? copy.loading : copy.button}
          </button>
        </div>
      ) : (
        <div className="notice" style={{ marginTop: 16 }}>
          {copy.ownerOnly}
        </div>
      )}
      {error ? (
        <div className="notice error" style={{ marginTop: 16 }}>
          {error}
        </div>
      ) : null}
      {success ? (
        <div className="notice" style={{ marginTop: 16 }}>
          {success}
        </div>
      ) : null}
    </section>
  );
}

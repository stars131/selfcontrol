import type { LocaleCode } from "../lib/locale";

export type WorkspaceExportCopy = {
  eyebrow: string;
  title: string;
  description: string;
  ownerOnly: string;
  note: string;
  button: string;
  loading: string;
  success: string;
  failed: string;
};

const COPY: Record<LocaleCode, WorkspaceExportCopy> = {
  "zh-CN": {
    eyebrow: "导出",
    title: "工作区导出",
    description: "下载当前工作区的 ZIP 快照，包含成员、记录、媒体清单条目和可用的本地附件文件。",
    ownerOnly: "仅工作区所有者可以导出。",
    note: "导出包不包含 provider 密钥、访问令牌或分享令牌。大型工作区后续会切换到异步导出。",
    button: "下载工作区 ZIP",
    loading: "导出中...",
    success: "已开始下载导出文件。",
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
    title: "ワークスペースのエクスポート",
    description:
      "現在のワークスペースの ZIP スナップショットをダウンロードします。メンバー、記録、メディアマニフェスト項目、利用可能なローカル添付ファイルを含みます。",
    ownerOnly: "ワークスペース所有者のみエクスポートできます。",
    note: "provider の秘密情報、アクセストークン、共有トークンは含まれません。大規模ワークスペース向けの非同期エクスポートは後続で追加します。",
    button: "ワークスペース ZIP をダウンロード",
    loading: "エクスポート中...",
    success: "エクスポートのダウンロードを開始しました。",
    failed: "エクスポートに失敗しました",
  },
};

export function getWorkspaceExportCopy(locale: LocaleCode): WorkspaceExportCopy {
  return COPY[locale];
}

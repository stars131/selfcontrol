import type { LocaleCode } from "./locale";

type ChatShareLinksCopy = {
  create: string;
  creating: string;
  disable: string;
  disabled: string;
  editor: string;
  empty: string;
  enabled: string;
  latestLink: string;
  maxUsesPlaceholder: string;
  shareLinks: string;
  shareNamePlaceholder: string;
  tokenHintPrefix: string;
  updating: string;
  usedPrefix: string;
  viewer: string;
};

type SharePreviewPageCopy = {
  controlCenter: string;
  invalidLink: string;
  joinFailed: string;
  joinWorkspace: string;
  joining: string;
  loadFailed: string;
  loading: string;
  shareEyebrow: string;
  shareTitle: string;
};

const CHAT_SHARE_LINKS_COPY: Record<LocaleCode, ChatShareLinksCopy> = {
  en: {
    create: "Create share link",
    creating: "Creating...",
    disable: "Disable",
    disabled: "disabled",
    editor: "editor",
    empty: "No share links yet.",
    enabled: "enabled",
    latestLink: "Latest link",
    maxUsesPlaceholder: "Max uses",
    shareLinks: "Share Links",
    shareNamePlaceholder: "Share name",
    tokenHintPrefix: "token hint",
    updating: "Updating...",
    usedPrefix: "used",
    viewer: "viewer",
  },
  "zh-CN": {
    create: "创建分享链接",
    creating: "创建中...",
    disable: "停用",
    disabled: "已停用",
    editor: "可编辑",
    empty: "暂无分享链接。",
    enabled: "已启用",
    latestLink: "最新链接",
    maxUsesPlaceholder: "最大使用次数",
    shareLinks: "分享链接",
    shareNamePlaceholder: "分享名称",
    tokenHintPrefix: "令牌提示",
    updating: "更新中...",
    usedPrefix: "已使用",
    viewer: "只读",
  },
  ja: {
    create: "共有リンクを作成",
    creating: "作成中...",
    disable: "無効化",
    disabled: "無効",
    editor: "編集可",
    empty: "共有リンクはまだありません。",
    enabled: "有効",
    latestLink: "最新リンク",
    maxUsesPlaceholder: "最大使用回数",
    shareLinks: "共有リンク",
    shareNamePlaceholder: "共有名",
    tokenHintPrefix: "トークンヒント",
    updating: "更新中...",
    usedPrefix: "使用回数",
    viewer: "閲覧のみ",
  },
};

const SHARE_PREVIEW_PAGE_COPY: Record<LocaleCode, SharePreviewPageCopy> = {
  en: {
    controlCenter: "Go to control center",
    invalidLink: "This share link is invalid or expired.",
    joinFailed: "Failed to join workspace",
    joinWorkspace: "Join Workspace",
    joining: "Joining...",
    loadFailed: "Failed to load share link",
    loading: "Loading share preview...",
    shareEyebrow: "Share",
    shareTitle: "Workspace Share Link",
  },
  "zh-CN": {
    controlCenter: "前往控制中心",
    invalidLink: "这个分享链接无效或已过期。",
    joinFailed: "加入工作区失败",
    joinWorkspace: "加入工作区",
    joining: "加入中...",
    loadFailed: "加载分享链接失败",
    loading: "正在加载分享预览...",
    shareEyebrow: "分享",
    shareTitle: "工作区分享链接",
  },
  ja: {
    controlCenter: "コントロールセンターへ",
    invalidLink: "この共有リンクは無効か期限切れです。",
    joinFailed: "ワークスペースへの参加に失敗しました",
    joinWorkspace: "ワークスペースに参加",
    joining: "参加中...",
    loadFailed: "共有リンクの読み込みに失敗しました",
    loading: "共有プレビューを読み込み中...",
    shareEyebrow: "共有",
    shareTitle: "ワークスペース共有リンク",
  },
};

export function getChatShareLinksCopy(locale: LocaleCode): ChatShareLinksCopy {
  return CHAT_SHARE_LINKS_COPY[locale];
}

export function getSharePermissionLabel(locale: LocaleCode, permissionCode: string): string {
  if (permissionCode === "editor") {
    return CHAT_SHARE_LINKS_COPY[locale].editor;
  }
  if (permissionCode === "viewer") {
    return CHAT_SHARE_LINKS_COPY[locale].viewer;
  }
  return permissionCode;
}

export function getShareEnabledLabel(locale: LocaleCode, isEnabled: boolean): string {
  return isEnabled ? CHAT_SHARE_LINKS_COPY[locale].enabled : CHAT_SHARE_LINKS_COPY[locale].disabled;
}

export function getSharePreviewPageCopy(locale: LocaleCode): SharePreviewPageCopy {
  return SHARE_PREVIEW_PAGE_COPY[locale];
}

import type { LocaleCode } from "./locale";

const NOTIFICATION_CARD_COPY: Record<LocaleCode, { empty: string; markRead: string; noUnread: string; showingOf: (shown: number, total: number) => string; title: string; unread: (count: number) => string }> = {
  "zh-CN": { empty: "还没有通知。", markRead: "标记已读", noUnread: "没有未读提醒通知。", showingOf: (shown, total) => `显示 ${shown} / ${total} 条`, title: "通知", unread: (count) => `${count} 条未读提醒通知` },
  en: { empty: "No notifications yet.", markRead: "Mark read", noUnread: "No unread reminder notifications.", showingOf: (shown, total) => `Showing ${shown} of ${total}`, title: "Notifications", unread: (count) => `${count} unread reminder notification${count === 1 ? "" : "s"}` },
  ja: { empty: "通知はまだありません。", markRead: "既読にする", noUnread: "未読のリマインダー通知はありません。", showingOf: (shown, total) => `${total} 件中 ${shown} 件表示`, title: "通知", unread: (count) => `未読のリマインダー通知 ${count} 件` },
};

const NOTIFICATION_EVENT_LABELS: Record<LocaleCode, Record<string, string>> = {
  "zh-CN": { reminder_due: "提醒到期" },
  en: { reminder_due: "Reminder due" },
  ja: { reminder_due: "リマインダー期限" },
};

export function getNotificationCardCopy(locale: LocaleCode) {
  return NOTIFICATION_CARD_COPY[locale];
}

export function getNotificationEventLabel(locale: LocaleCode, eventType: string): string {
  return NOTIFICATION_EVENT_LABELS[locale][eventType] ?? eventType;
}

"use client";

import { useStoredLocale } from "../lib/locale";
import { getNotificationCardCopy, getNotificationEventLabel } from "../lib/notification-display";
import type { ChatNotificationsCardProps } from "./chat-notifications-card.types";

export function ChatNotificationsCard({
  notifications,
  onMarkNotificationRead,
  unreadCount,
}: ChatNotificationsCardProps) {
  const { locale } = useStoredLocale();
  const copy = getNotificationCardCopy(locale);
  return (
    <div className="record-card" style={{ marginBottom: 16 }}>
      <div className="eyebrow">{copy.title}</div>
      <div className="muted" style={{ marginTop: 8 }}>
        {unreadCount ? copy.unread(unreadCount) : copy.noUnread}
      </div>
      <div className="record-list compact-list" style={{ marginTop: 12 }}>
        {notifications.length ? (
          <>
            {notifications.slice(0, 6).map((notification) => (
              <article className="message" key={notification.id}>
                <div className="eyebrow">{getNotificationEventLabel(locale, notification.event_type)}</div>
                <div style={{ marginTop: 8, fontWeight: 600 }}>{notification.title}</div>
                {notification.message ? (
                  <div style={{ marginTop: 8, lineHeight: 1.6 }}>{notification.message}</div>
                ) : null}
                <div className="muted" style={{ marginTop: 8 }}>
                  {new Date(notification.created_at).toLocaleString(locale)}
                </div>
                {!notification.is_read ? (
                  <div className="action-row" style={{ marginTop: 10 }}>
                    <button
                      className="button secondary"
                      type="button"
                      onClick={() => void onMarkNotificationRead(notification.id)}
                    >
                      {copy.markRead}
                    </button>
                  </div>
                ) : null}
              </article>
            ))}
            {notifications.length > 6 ? (
              <div className="muted" style={{ textAlign: "center", fontSize: 13 }}>
                {copy.showingOf(6, notifications.length)}
              </div>
            ) : null}
          </>
        ) : (
          <div className="notice">{copy.empty}</div>
        )}
      </div>
    </div>
  );
}

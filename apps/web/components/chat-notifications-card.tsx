"use client";

import type { ChatNotificationsCardProps } from "./chat-notifications-card.types";

export function ChatNotificationsCard({
  notifications,
  onMarkNotificationRead,
  unreadCount,
}: ChatNotificationsCardProps) {
  return (
    <div className="record-card" style={{ marginBottom: 16 }}>
      <div className="eyebrow">Notifications</div>
      <div className="muted" style={{ marginTop: 8 }}>
        {unreadCount ? `${unreadCount} unread reminder notification(s)` : "No unread reminder notifications."}
      </div>
      <div className="record-list compact-list" style={{ marginTop: 12 }}>
        {notifications.length ? (
          notifications.slice(0, 6).map((notification) => (
            <article className="message" key={notification.id}>
              <div className="eyebrow">{notification.event_type}</div>
              <div style={{ marginTop: 8, fontWeight: 600 }}>{notification.title}</div>
              {notification.message ? (
                <div style={{ marginTop: 8, lineHeight: 1.6 }}>{notification.message}</div>
              ) : null}
              <div className="muted" style={{ marginTop: 8 }}>
                {new Date(notification.created_at).toLocaleString()}
              </div>
              {!notification.is_read ? (
                <div className="action-row" style={{ marginTop: 10 }}>
                  <button
                    className="button secondary"
                    type="button"
                    onClick={() => void onMarkNotificationRead(notification.id)}
                  >
                    Mark read
                  </button>
                </div>
              ) : null}
            </article>
          ))
        ) : (
          <div className="notice">No notifications yet.</div>
        )}
      </div>
    </div>
  );
}

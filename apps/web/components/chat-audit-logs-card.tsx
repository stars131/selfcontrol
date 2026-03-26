"use client";

import {
  getAuditLogActionLabel,
  getAuditLogCardCopy,
  getAuditLogResourceLabel,
  getAuditLogStatusLabel,
} from "../lib/audit-log-display";
import { useStoredLocale } from "../lib/locale";
import type { ChatAuditLogsCardProps } from "./chat-audit-logs-card.types";

export function ChatAuditLogsCard({
  auditLogs,
  onRefreshAuditLogs,
  refreshingAudit,
}: ChatAuditLogsCardProps) {
  const { locale } = useStoredLocale();
  const copy = getAuditLogCardCopy(locale);

  return (
    <div className="record-card" style={{ marginBottom: 16 }}>
      <div className="action-row" style={{ justifyContent: "space-between" }}>
        <div className="eyebrow">{copy.title}</div>
        <button
          className="button secondary"
          disabled={refreshingAudit}
          type="button"
          onClick={() => void onRefreshAuditLogs()}
        >
          {refreshingAudit ? copy.refreshing : copy.refresh}
        </button>
      </div>
      <div className="record-list compact-list" style={{ marginTop: 12 }}>
        {auditLogs.length ? (
          auditLogs.map((item) => (
            <article className="message" key={item.id}>
              <div className="eyebrow">
                {getAuditLogActionLabel(locale, item.action_code)} / {getAuditLogStatusLabel(locale, item.status)}
              </div>
              <div style={{ marginTop: 8, fontWeight: 600 }}>
                {item.message ?? getAuditLogResourceLabel(locale, item.resource_type)}
              </div>
              {item.created_at ? (
                <div className="muted" style={{ marginTop: 8 }}>
                  {new Date(item.created_at).toLocaleString(locale)}
                </div>
              ) : null}
            </article>
          ))
        ) : (
          <div className="notice">{copy.empty}</div>
        )}
      </div>
    </div>
  );
}

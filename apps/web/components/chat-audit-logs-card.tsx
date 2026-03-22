"use client";

import type { AuditLogItem } from "../lib/types";

export function ChatAuditLogsCard({
  auditLogs,
  onRefreshAuditLogs,
  refreshingAudit,
}: {
  auditLogs: AuditLogItem[];
  onRefreshAuditLogs: () => Promise<void>;
  refreshingAudit: boolean;
}) {
  return (
    <div className="record-card" style={{ marginBottom: 16 }}>
      <div className="action-row" style={{ justifyContent: "space-between" }}>
        <div className="eyebrow">Audit Logs</div>
        <button
          className="button secondary"
          disabled={refreshingAudit}
          type="button"
          onClick={() => void onRefreshAuditLogs()}
        >
          {refreshingAudit ? "Refreshing..." : "Refresh logs"}
        </button>
      </div>
      <div className="record-list compact-list" style={{ marginTop: 12 }}>
        {auditLogs.length ? (
          auditLogs.map((item) => (
            <article className="message" key={item.id}>
              <div className="eyebrow">
                {item.action_code} / {item.status}
              </div>
              <div style={{ marginTop: 8, fontWeight: 600 }}>{item.message ?? item.resource_type}</div>
              {item.created_at ? (
                <div className="muted" style={{ marginTop: 8 }}>
                  {new Date(item.created_at).toLocaleString()}
                </div>
              ) : null}
            </article>
          ))
        ) : (
          <div className="notice">No audit logs yet.</div>
        )}
      </div>
    </div>
  );
}

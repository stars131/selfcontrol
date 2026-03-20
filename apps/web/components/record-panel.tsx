import type { RecordItem } from "../lib/types";

export function RecordPanel({
  workspaceId,
  records,
}: {
  workspaceId: string;
  records: RecordItem[];
}) {
  const avoidCount = records.filter((record) => record.is_avoid).length;
  const foodCount = records.filter((record) => record.type_code === "food").length;

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Workspace</div>
          <h2 className="title" style={{ fontSize: 22 }}>
            Structured Results
          </h2>
          <div className="muted" style={{ marginTop: 8 }}>
            {workspaceId}
          </div>
        </div>
      </div>
      <div className="panel-body">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="eyebrow">Visible records</div>
            <div className="title" style={{ fontSize: 20 }}>
              {records.length}
            </div>
          </div>
          <div className="stat-card">
            <div className="eyebrow">Food</div>
            <div className="title" style={{ fontSize: 20 }}>
              {foodCount}
            </div>
          </div>
          <div className="stat-card">
            <div className="eyebrow">Avoid</div>
            <div className="title" style={{ fontSize: 20 }}>
              {avoidCount}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20 }} className="record-list">
          {records.length ? (
            records.map((record) => (
              <article className="record-card" key={record.id}>
                <div className="eyebrow">{record.type_code}</div>
                <h3 style={{ margin: "8px 0 6px", fontSize: 20 }}>
                  {record.title || "Untitled"}
                </h3>
                <div className="muted">
                  {record.created_at} · {record.source_type}
                </div>
                <p style={{ margin: "12px 0 0", lineHeight: 1.6 }}>
                  {record.content || "No content"}
                </p>
                <div className="tag-row">
                  <span className="tag">{record.status}</span>
                  {record.rating ? <span className="tag">rating {record.rating}</span> : null}
                  {record.is_avoid ? <span className="tag">avoid</span> : null}
                </div>
              </article>
            ))
          ) : (
            <div className="notice">
              No records yet. Save one from the chat panel or run a search that returns data.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

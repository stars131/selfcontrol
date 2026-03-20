const demoRecords = [
  {
    title: "万象城烤鱼",
    type: "food",
    time: "2026-03-19 19:30",
    note: "鱼肉新鲜，酱汁偏辣，适合再次去。",
    tags: ["杭州", "烤鱼", "推荐"],
  },
  {
    title: "某品牌海苔脆",
    type: "snack",
    time: "2026-03-18 15:10",
    note: "包装好看但味道一般，列入避雷。",
    tags: ["零食", "避雷"],
  },
];

export function RecordPanel({ workspaceId }: { workspaceId: string }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Workspace</div>
          <h2 className="title" style={{ fontSize: 22 }}>
            {workspaceId}
          </h2>
        </div>
        <button className="button" type="button">
          快速新增
        </button>
      </div>
      <div className="panel-body">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="eyebrow">总记录</div>
            <div className="title" style={{ fontSize: 20 }}>
              128
            </div>
          </div>
          <div className="stat-card">
            <div className="eyebrow">避雷项</div>
            <div className="title" style={{ fontSize: 20 }}>
              17
            </div>
          </div>
          <div className="stat-card">
            <div className="eyebrow">地点</div>
            <div className="title" style={{ fontSize: 20 }}>
              43
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20 }} className="record-list">
          {demoRecords.map((record) => (
            <article className="record-card" key={record.title}>
              <div className="eyebrow">{record.type}</div>
              <h3 style={{ margin: "8px 0 6px", fontSize: 20 }}>{record.title}</h3>
              <div className="muted">{record.time}</div>
              <p style={{ margin: "12px 0 0", lineHeight: 1.6 }}>{record.note}</p>
              <div className="tag-row">
                {record.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


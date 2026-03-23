"use client";

export function RecordPanelLegacyStats({
  avoidCount,
  foodCount,
  recordCount,
  workspaceId,
  onResetFilter,
}: {
  avoidCount: number;
  foodCount: number;
  recordCount: number;
  workspaceId: string;
  onResetFilter: () => Promise<void>;
}) {
  return (
    <>
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
        <button className="button secondary" type="button" onClick={() => void onResetFilter()}>
          Reset list
        </button>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="eyebrow">Visible records</div>
          <div className="title" style={{ fontSize: 20 }}>
            {recordCount}
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
    </>
  );
}

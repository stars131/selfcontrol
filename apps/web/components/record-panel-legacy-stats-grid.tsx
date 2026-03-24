"use client";

export function RecordPanelLegacyStatsGrid({
  avoidCount,
  foodCount,
  recordCount,
}: {
  avoidCount: number;
  foodCount: number;
  recordCount: number;
}) {
  return (
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
  );
}

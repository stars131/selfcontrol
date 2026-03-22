"use client";

type RecordPanelStatsProps = {
  visibleRecordsLabel: string;
  foodLabel: string;
  avoidLabel: string;
  visibleRecordCount: number;
  foodCount: number;
  avoidCount: number;
};

export function RecordPanelStats({
  visibleRecordsLabel,
  foodLabel,
  avoidLabel,
  visibleRecordCount,
  foodCount,
  avoidCount,
}: RecordPanelStatsProps) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="eyebrow">{visibleRecordsLabel}</div>
        <div className="title" style={{ fontSize: 20 }}>
          {visibleRecordCount}
        </div>
      </div>
      <div className="stat-card">
        <div className="eyebrow">{foodLabel}</div>
        <div className="title" style={{ fontSize: 20 }}>
          {foodCount}
        </div>
      </div>
      <div className="stat-card">
        <div className="eyebrow">{avoidLabel}</div>
        <div className="title" style={{ fontSize: 20 }}>
          {avoidCount}
        </div>
      </div>
    </div>
  );
}

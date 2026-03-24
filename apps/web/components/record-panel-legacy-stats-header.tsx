"use client";

export function RecordPanelLegacyStatsHeader({
  workspaceId,
  onResetFilter,
}: {
  workspaceId: string;
  onResetFilter: () => Promise<void>;
}) {
  return (
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
  );
}

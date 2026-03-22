"use client";

type WorkspaceMediaRetentionHeaderCopy = {
  eyebrow: string;
  title: string;
  description: string;
  threshold: string;
  days: string;
  refresh: string;
  refreshing: string;
};

export function WorkspaceMediaRetentionHeader({
  copy,
  loading,
  olderThanDays,
  onOlderThanDaysChange,
  onRefresh,
}: {
  copy: WorkspaceMediaRetentionHeaderCopy;
  loading: boolean;
  olderThanDays: number;
  onOlderThanDaysChange: (value: number) => void;
  onRefresh: () => Promise<void>;
}) {
  return (
    <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
      <div>
        <div className="eyebrow">{copy.eyebrow}</div>
        <div style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 8 }}>{copy.title}</div>
        <div className="muted" style={{ marginTop: 8, lineHeight: 1.7 }}>{copy.description}</div>
      </div>
      <div className="form-stack" style={{ minWidth: 220 }}>
        <label className="field">
          <span className="field-label">{copy.threshold}</span>
          <select
            className="input"
            disabled={loading}
            value={olderThanDays}
            onChange={(event) => onOlderThanDaysChange(Number(event.target.value))}
          >
            <option value={30}>30 {copy.days}</option>
            <option value={90}>90 {copy.days}</option>
            <option value={180}>180 {copy.days}</option>
            <option value={365}>365 {copy.days}</option>
          </select>
        </label>
        <button className="button secondary" disabled={loading} type="button" onClick={() => void onRefresh()}>
          {loading ? copy.refreshing : copy.refresh}
        </button>
      </div>
    </div>
  );
}

"use client";
import type { WorkspaceMediaRetentionHeaderControlsProps } from "./workspace-media-retention-header-controls.types";

export function WorkspaceMediaRetentionHeaderControls({ copy, loading, olderThanDays, onOlderThanDaysChange, onRefresh }: WorkspaceMediaRetentionHeaderControlsProps) {
  return (
    <div className="form-stack" style={{ minWidth: 220 }}>
      <label className="field">
        <span className="field-label">{copy.threshold}</span>
        <select className="input" disabled={loading} value={olderThanDays} onChange={(event) => onOlderThanDaysChange(Number(event.target.value))}>
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
  );
}

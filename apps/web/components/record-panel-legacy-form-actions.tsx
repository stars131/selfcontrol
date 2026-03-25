"use client";

import type { RecordPanelLegacyFormActionsProps } from "./record-panel-legacy-form-actions.types";

export function RecordPanelLegacyFormActions({
  deleting,
  handleDelete,
  saving,
  selectedRecord,
}: RecordPanelLegacyFormActionsProps) {
  return (
    <div className="action-row">
      <button className="button" disabled={saving} type="submit">
        {saving ? "Saving..." : selectedRecord ? "Update record" : "Create record"}
      </button>
      {selectedRecord ? (
        <button className="button secondary" disabled={deleting} onClick={() => void handleDelete()} type="button">
          {deleting ? "Deleting..." : "Delete record"}
        </button>
      ) : null}
    </div>
  );
}

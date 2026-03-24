"use client";

import type { RecordPanelLegacyFormProps } from "./record-panel-legacy-form.types";

export function RecordPanelLegacyFormActions({
  deleting,
  handleDelete,
  saving,
  selectedRecord,
}: Pick<RecordPanelLegacyFormProps, "deleting" | "handleDelete" | "saving" | "selectedRecord">) {
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

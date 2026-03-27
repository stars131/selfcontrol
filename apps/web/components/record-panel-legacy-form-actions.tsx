"use client";

import { useStoredLocale } from "../lib/locale";
import { getRecordPanelUiBundle } from "../lib/record-panel-ui";
import type { RecordPanelLegacyFormActionsProps } from "./record-panel-legacy-form-actions.types";

export function RecordPanelLegacyFormActions({
  deleting,
  handleDelete,
  saving,
  selectedRecord,
}: RecordPanelLegacyFormActionsProps) {
  const { locale } = useStoredLocale();
  const { panelCopy } = getRecordPanelUiBundle(locale);
  return (
    <div className="action-row">
      <button className="button" disabled={saving} type="submit">
        {saving ? panelCopy.saving : selectedRecord ? panelCopy.updateRecord : panelCopy.createRecord}
      </button>
      {selectedRecord ? (
        <button className="button secondary" disabled={deleting} onClick={() => void handleDelete()} type="button">
          {deleting ? panelCopy.deleting : panelCopy.deleteRecord}
        </button>
      ) : null}
    </div>
  );
}

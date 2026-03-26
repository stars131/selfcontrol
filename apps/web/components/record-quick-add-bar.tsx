"use client";

import { FormEvent, useState } from "react";

import { useStoredLocale } from "../lib/locale";
import { getRecordPanelUiBundle } from "../lib/record-panel-ui";
import { buildQuickAddRecordDraft } from "./record-quick-add-bar.helpers";
import type { RecordQuickAddBarProps } from "./record-quick-add-bar.types";

export function RecordQuickAddBar({ canWriteWorkspace, onSaveRecord }: RecordQuickAddBarProps) {
  const { locale } = useStoredLocale();
  const { panelCopy } = getRecordPanelUiBundle(locale);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = draft.trim();
    if (!canWriteWorkspace || !content || saving) return;
    const quickAddDraft = buildQuickAddRecordDraft(content);
    setSaving(true);
    setError("");
    try {
      await onSaveRecord({
        ...quickAddDraft,
        extra_data: {
          ...quickAddDraft.extra_data,
          capture_mode: "quick_add",
        },
      });
      setDraft("");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : panelCopy.quickAddError);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="record-card form-stack" style={{ marginBottom: 20 }} onSubmit={handleSubmit}>
      <div className="action-row" style={{ alignItems: "center" }}>
        <input
          className="input"
          disabled={!canWriteWorkspace || saving}
          placeholder={
            canWriteWorkspace ? panelCopy.quickAddPlaceholder : panelCopy.quickAddDisabled
          }
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button className="button" disabled={!canWriteWorkspace || saving || !draft.trim()} type="submit">
          {saving ? panelCopy.quickAddSaving : panelCopy.quickAddSave}
        </button>
      </div>
      {canWriteWorkspace ? (
        <div className="meta-text" style={{ marginTop: 8 }}>
          {panelCopy.quickAddHint}
        </div>
      ) : null}
      {error ? <div className="notice error">{error}</div> : null}
    </form>
  );
}

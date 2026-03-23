"use client";

import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

import type { MediaAsset, RecordItem } from "../lib/types";
import type { RecordPanelFormState } from "./record-panel.types";

export function RecordPanelLegacyForm({
  deleting,
  error,
  form,
  handleDelete,
  handleSubmit,
  handleUpload,
  mediaAssets,
  saving,
  selectedRecord,
  setForm,
  uploading,
}: {
  deleting: boolean;
  error: string;
  form: RecordPanelFormState;
  handleDelete: () => Promise<void>;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  handleUpload: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  mediaAssets: MediaAsset[];
  saving: boolean;
  selectedRecord: RecordItem | null;
  setForm: Dispatch<SetStateAction<RecordPanelFormState>>;
  uploading: boolean;
}) {
  return (
    <form className="record-card form-stack" style={{ marginTop: 20 }} onSubmit={(event) => void handleSubmit(event)}>
      <div className="eyebrow">{selectedRecord ? "Edit record" : "New manual record"}</div>
      <label className="field">
        <span className="field-label">Title</span>
        <input
          className="input"
          value={form.title}
          onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
          placeholder="Optional title"
        />
      </label>
      <label className="field">
        <span className="field-label">Content</span>
        <textarea
          className="textarea"
          value={form.content}
          onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
          placeholder="Write a note, food review, or reminder"
        />
      </label>
      <div className="inline-fields">
        <label className="field">
          <span className="field-label">Type</span>
          <select
            className="input"
            value={form.type_code}
            onChange={(event) => setForm((prev) => ({ ...prev, type_code: event.target.value }))}
          >
            <option value="memo">memo</option>
            <option value="food">food</option>
            <option value="snack">snack</option>
            <option value="bad_experience">bad_experience</option>
          </select>
        </label>
        <label className="field">
          <span className="field-label">Rating</span>
          <input
            className="input"
            type="number"
            min="1"
            max="5"
            value={form.rating}
            onChange={(event) => setForm((prev) => ({ ...prev, rating: event.target.value }))}
            placeholder="1-5"
          />
        </label>
        <label className="checkbox-field">
          <input
            checked={form.is_avoid}
            type="checkbox"
            onChange={(event) => setForm((prev) => ({ ...prev, is_avoid: event.target.checked }))}
          />
          <span>Avoid item</span>
        </label>
      </div>
      {error ? <div className="notice error">{error}</div> : null}
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
      {selectedRecord ? (
        <>
          <label className="field">
            <span className="field-label">Upload attachment</span>
            <input onChange={(event) => void handleUpload(event)} type="file" />
          </label>
          {uploading ? <div className="notice">Uploading media...</div> : null}
          <div className="record-list compact-list">
            {mediaAssets.length ? (
              mediaAssets.map((asset) => (
                <article className="record-card" key={asset.id}>
                  <div className="eyebrow">{asset.media_type}</div>
                  <div>{asset.original_filename}</div>
                  <div className="muted">{asset.mime_type}</div>
                </article>
              ))
            ) : (
              <div className="notice">No media uploaded for this record yet.</div>
            )}
          </div>
        </>
      ) : null}
    </form>
  );
}

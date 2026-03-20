"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

import type { MediaAsset, RecordItem } from "../lib/types";

export function RecordPanel({
  workspaceId,
  records,
  selectedRecordId,
  mediaAssets,
  onSelectRecord,
  onSaveRecord,
  onDeleteRecord,
  onUploadMedia,
  onResetFilter,
}: {
  workspaceId: string;
  records: RecordItem[];
  selectedRecordId: string | null;
  mediaAssets: MediaAsset[];
  onSelectRecord: (recordId: string) => void;
  onSaveRecord: (input: {
    recordId?: string;
    title?: string;
    content: string;
    type_code: string;
    rating?: number | null;
    is_avoid: boolean;
  }) => Promise<void>;
  onDeleteRecord: (recordId: string) => Promise<void>;
  onUploadMedia: (recordId: string, file: File) => Promise<void>;
  onResetFilter: () => Promise<void>;
}) {
  const avoidCount = records.filter((record) => record.is_avoid).length;
  const foodCount = records.filter((record) => record.type_code === "food").length;
  const selectedRecord = useMemo(
    () => records.find((record) => record.id === selectedRecordId) ?? null,
    [records, selectedRecordId],
  );
  const [form, setForm] = useState({
    title: "",
    content: "",
    type_code: "memo",
    rating: "",
    is_avoid: false,
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selectedRecord) {
      setForm({
        title: "",
        content: "",
        type_code: "memo",
        rating: "",
        is_avoid: false,
      });
      return;
    }
    setForm({
      title: selectedRecord.title ?? "",
      content: selectedRecord.content ?? "",
      type_code: selectedRecord.type_code,
      rating: selectedRecord.rating ? String(selectedRecord.rating) : "",
      is_avoid: selectedRecord.is_avoid,
    });
  }, [selectedRecord]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.content.trim()) {
      setError("Content is required");
      return;
    }

    setSaving(true);
    setError("");
    try {
      await onSaveRecord({
        recordId: selectedRecord?.id,
        title: form.title.trim() || undefined,
        content: form.content.trim(),
        type_code: form.type_code,
        rating: form.rating ? Number(form.rating) : null,
        is_avoid: form.is_avoid,
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to save record");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedRecord) {
      return;
    }
    setDeleting(true);
    setError("");
    try {
      await onDeleteRecord(selectedRecord.id);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to delete record");
    } finally {
      setDeleting(false);
    }
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedRecord) {
      return;
    }
    setUploading(true);
    setError("");
    try {
      await onUploadMedia(selectedRecord.id, file);
      event.target.value = "";
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to upload media");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="panel">
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
      <div className="panel-body">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="eyebrow">Visible records</div>
            <div className="title" style={{ fontSize: 20 }}>
              {records.length}
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

        <form className="record-card form-stack" style={{ marginTop: 20 }} onSubmit={handleSubmit}>
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
              <button className="button secondary" disabled={deleting} onClick={handleDelete} type="button">
                {deleting ? "Deleting..." : "Delete record"}
              </button>
            ) : null}
          </div>
          {selectedRecord ? (
            <>
              <label className="field">
                <span className="field-label">Upload attachment</span>
                <input onChange={handleUpload} type="file" />
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

        <div style={{ marginTop: 20 }} className="record-list">
          {records.length ? (
            records.map((record) => (
              <article
                className={`record-card selectable-card ${record.id === selectedRecordId ? "selected" : ""}`}
                key={record.id}
                onClick={() => onSelectRecord(record.id)}
              >
                <div className="eyebrow">{record.type_code}</div>
                <h3 style={{ margin: "8px 0 6px", fontSize: 20 }}>
                  {record.title || "Untitled"}
                </h3>
                <div className="muted">
                  {record.created_at} · {record.source_type}
                </div>
                <p style={{ margin: "12px 0 0", lineHeight: 1.6 }}>
                  {record.content || "No content"}
                </p>
                <div className="tag-row">
                  <span className="tag">{record.status}</span>
                  {record.rating ? <span className="tag">rating {record.rating}</span> : null}
                  {record.is_avoid ? <span className="tag">avoid</span> : null}
                </div>
              </article>
            ))
          ) : (
            <div className="notice">
              No records yet. Save one from the chat panel or create one manually above.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

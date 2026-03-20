"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

import { MapPanel } from "./map-panel";
import type { MediaAsset, RecordItem } from "../lib/types";

type LocationDraft = {
  place_name: string;
  address: string;
  latitude: string;
  longitude: string;
};

function readLocation(record: RecordItem | null): LocationDraft {
  const raw = record?.extra_data?.location;
  const location = typeof raw === "object" && raw !== null ? (raw as Record<string, unknown>) : {};

  return {
    place_name: typeof location.place_name === "string" ? location.place_name : "",
    address: typeof location.address === "string" ? location.address : "",
    latitude:
      typeof location.latitude === "number" || typeof location.latitude === "string"
        ? String(location.latitude)
        : "",
    longitude:
      typeof location.longitude === "number" || typeof location.longitude === "string"
        ? String(location.longitude)
        : "",
  };
}

export function RecordPanelV2({
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
    extra_data?: Record<string, unknown>;
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
    location: {
      place_name: "",
      address: "",
      latitude: "",
      longitude: "",
    } as LocationDraft,
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
        location: {
          place_name: "",
          address: "",
          latitude: "",
          longitude: "",
        },
      });
      return;
    }
    setForm({
      title: selectedRecord.title ?? "",
      content: selectedRecord.content ?? "",
      type_code: selectedRecord.type_code,
      rating: selectedRecord.rating ? String(selectedRecord.rating) : "",
      is_avoid: selectedRecord.is_avoid,
      location: readLocation(selectedRecord),
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
      const latitude = form.location.latitude ? Number(form.location.latitude) : null;
      const longitude = form.location.longitude ? Number(form.location.longitude) : null;
      const hasLocation =
        form.location.place_name.trim() ||
        form.location.address.trim() ||
        (latitude !== null && !Number.isNaN(latitude)) ||
        (longitude !== null && !Number.isNaN(longitude));

      await onSaveRecord({
        recordId: selectedRecord?.id,
        title: form.title.trim() || undefined,
        content: form.content.trim(),
        type_code: form.type_code,
        rating: form.rating ? Number(form.rating) : null,
        is_avoid: form.is_avoid,
        extra_data: hasLocation
          ? {
              location: {
                place_name: form.location.place_name.trim() || undefined,
                address: form.location.address.trim() || undefined,
                latitude: latitude !== null && !Number.isNaN(latitude) ? latitude : undefined,
                longitude: longitude !== null && !Number.isNaN(longitude) ? longitude : undefined,
                source: "manual",
              },
            }
          : {},
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

        <MapPanel
          records={records}
          selectedRecordId={selectedRecordId}
          onSelectRecord={onSelectRecord}
        />

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
              <span className="field-label">Place name</span>
              <input
                className="input"
                value={form.location.place_name}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    location: { ...prev.location, place_name: event.target.value },
                  }))
                }
                placeholder="West Lake Sushi"
              />
            </label>
            <label className="field">
              <span className="field-label">Address</span>
              <input
                className="input"
                value={form.location.address}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    location: { ...prev.location, address: event.target.value },
                  }))
                }
                placeholder="Hangzhou, West Lake district"
              />
            </label>
          </div>
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
            <label className="field">
              <span className="field-label">Latitude</span>
              <input
                className="input"
                inputMode="decimal"
                value={form.location.latitude}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    location: { ...prev.location, latitude: event.target.value },
                  }))
                }
                placeholder="30.2741"
              />
            </label>
          </div>
          <div className="inline-fields">
            <label className="field">
              <span className="field-label">Longitude</span>
              <input
                className="input"
                inputMode="decimal"
                value={form.location.longitude}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    location: { ...prev.location, longitude: event.target.value },
                  }))
                }
                placeholder="120.1551"
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
            records.map((record) => {
              const location = readLocation(record);

              return (
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
                  {location.place_name || location.address ? (
                    <div className="muted" style={{ marginTop: 10 }}>
                      {location.place_name || "Unknown place"}
                      {location.address ? ` · ${location.address}` : ""}
                    </div>
                  ) : null}
                  <div className="tag-row">
                    <span className="tag">{record.status}</span>
                    {record.rating ? <span className="tag">rating {record.rating}</span> : null}
                    {record.is_avoid ? <span className="tag">avoid</span> : null}
                  </div>
                </article>
              );
            })
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

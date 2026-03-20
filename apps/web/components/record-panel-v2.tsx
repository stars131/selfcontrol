"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

import { MapPanel, type LocationDraft } from "./map-panel";
import type { MediaAsset, RecordItem, ReminderItem } from "../lib/types";

type RecordFormState = {
  title: string;
  content: string;
  type_code: string;
  rating: string;
  occurred_at: string;
  is_avoid: boolean;
  location: LocationDraft;
};

type ReminderFormState = {
  title: string;
  message: string;
  remind_at: string;
};

function createEmptyLocation(): LocationDraft {
  return {
    place_name: "",
    address: "",
    latitude: "",
    longitude: "",
    source: "manual",
  };
}

function createEmptyForm(): RecordFormState {
  return {
    title: "",
    content: "",
    type_code: "memo",
    rating: "",
    occurred_at: "",
    is_avoid: false,
    location: createEmptyLocation(),
  };
}

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
    source: typeof location.source === "string" ? location.source : "manual",
  };
}

function formatDatetimeInput(value?: string | null): string {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const timezoneOffsetMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - timezoneOffsetMs).toISOString().slice(0, 16);
}

function formatRecordTimestamp(record: RecordItem): string {
  const rawValue = record.occurred_at || record.created_at;
  const date = new Date(rawValue);
  return Number.isNaN(date.getTime()) ? rawValue : date.toLocaleString();
}

function createEmptyReminderForm(): ReminderFormState {
  return {
    title: "",
    message: "",
    remind_at: "",
  };
}

function formatReminderTimestamp(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

export function RecordPanelV2({
  workspaceId,
  records,
  selectedRecordId,
  mediaAssets,
  reminders,
  onSelectRecord,
  onSaveRecord,
  onCreateReminder,
  onUpdateReminder,
  onDeleteReminder,
  onDeleteRecord,
  onRefreshMediaStatus,
  onRetryMedia,
  onUploadMedia,
  onResetFilter,
}: {
  workspaceId: string;
  records: RecordItem[];
  selectedRecordId: string | null;
  mediaAssets: MediaAsset[];
  reminders: ReminderItem[];
  onSelectRecord: (recordId: string | null) => void;
  onSaveRecord: (input: {
    recordId?: string;
    title?: string;
    content: string;
    type_code: string;
    rating?: number | null;
    occurred_at?: string;
    is_avoid: boolean;
    extra_data?: Record<string, unknown>;
  }) => Promise<void>;
  onCreateReminder: (input: {
    recordId: string;
    title?: string;
    message?: string;
    remind_at: string;
    channel_code?: string;
  }) => Promise<void>;
  onUpdateReminder: (
    reminderId: string,
    input: Partial<{
      title: string | null;
      message: string | null;
      remind_at: string | null;
      status: string;
      is_enabled: boolean;
    }>,
  ) => Promise<void>;
  onDeleteReminder: (reminderId: string) => Promise<void>;
  onDeleteRecord: (recordId: string) => Promise<void>;
  onRefreshMediaStatus: (mediaId: string) => Promise<void>;
  onRetryMedia: (mediaId: string) => Promise<void>;
  onUploadMedia: (recordId: string, file: File) => Promise<void>;
  onResetFilter: () => Promise<void>;
}) {
  const avoidCount = records.filter((record) => record.is_avoid).length;
  const foodCount = records.filter((record) => record.type_code === "food").length;
  const selectedRecord = useMemo(
    () => records.find((record) => record.id === selectedRecordId) ?? null,
    [records, selectedRecordId],
  );
  const [form, setForm] = useState<RecordFormState>(createEmptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [refreshingMediaId, setRefreshingMediaId] = useState<string | null>(null);
  const [retryingMediaId, setRetryingMediaId] = useState<string | null>(null);
  const [reminderForm, setReminderForm] = useState<ReminderFormState>(createEmptyReminderForm);
  const [savingReminder, setSavingReminder] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selectedRecord) {
      setForm(createEmptyForm());
      return;
    }

    setForm({
      title: selectedRecord.title ?? "",
      content: selectedRecord.content ?? "",
      type_code: selectedRecord.type_code,
      rating: selectedRecord.rating ? String(selectedRecord.rating) : "",
      occurred_at: formatDatetimeInput(selectedRecord.occurred_at),
      is_avoid: selectedRecord.is_avoid,
      location: readLocation(selectedRecord),
    });
  }, [selectedRecord]);

  useEffect(() => {
    if (!selectedRecord) {
      setReminderForm(createEmptyReminderForm());
      return;
    }

    setReminderForm({
      title: selectedRecord.title ?? "",
      message: "",
      remind_at: "",
    });
  }, [selectedRecord]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.content.trim()) {
      setError("Content is required");
      return;
    }

    const latitude = form.location.latitude.trim() ? Number(form.location.latitude) : null;
    const longitude = form.location.longitude.trim() ? Number(form.location.longitude) : null;

    if (form.location.latitude.trim() && (latitude === null || Number.isNaN(latitude))) {
      setError("Latitude must be a valid number");
      return;
    }

    if (form.location.longitude.trim() && (longitude === null || Number.isNaN(longitude))) {
      setError("Longitude must be a valid number");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const hasLocation =
        form.location.place_name.trim() ||
        form.location.address.trim() ||
        latitude !== null ||
        longitude !== null;

      await onSaveRecord({
        recordId: selectedRecord?.id,
        title: form.title.trim() || undefined,
        content: form.content.trim(),
        type_code: form.type_code,
        rating: form.rating ? Number(form.rating) : null,
        occurred_at: form.occurred_at ? new Date(form.occurred_at).toISOString() : undefined,
        is_avoid: form.is_avoid,
        extra_data: hasLocation
          ? {
              location: {
                place_name: form.location.place_name.trim() || undefined,
                address: form.location.address.trim() || undefined,
                latitude: latitude ?? undefined,
                longitude: longitude ?? undefined,
                source: form.location.source || "manual",
              },
            }
          : {},
      });

      if (!selectedRecord) {
        setForm(createEmptyForm());
      }
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

  const handleCreateReminderSubmit = async () => {
    if (!selectedRecord) {
      setError("Save or select a record before adding a reminder");
      return;
    }
    if (!reminderForm.remind_at) {
      setError("Reminder time is required");
      return;
    }

    setSavingReminder(true);
    setError("");
    try {
      await onCreateReminder({
        recordId: selectedRecord.id,
        title: reminderForm.title.trim() || selectedRecord.title || undefined,
        message: reminderForm.message.trim() || undefined,
        remind_at: new Date(reminderForm.remind_at).toISOString(),
        channel_code: "in_app",
      });
      setReminderForm((prev) => ({
        ...prev,
        message: "",
        remind_at: "",
      }));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to create reminder");
    } finally {
      setSavingReminder(false);
    }
  };

  const handleRefreshMedia = async (mediaId: string) => {
    setRefreshingMediaId(mediaId);
    setError("");
    try {
      await onRefreshMediaStatus(mediaId);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to refresh media status");
    } finally {
      setRefreshingMediaId(null);
    }
  };

  const handleRetryMediaProcessing = async (mediaId: string) => {
    setRetryingMediaId(mediaId);
    setError("");
    try {
      await onRetryMedia(mediaId);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to retry media processing");
    } finally {
      setRetryingMediaId(null);
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
        <div className="action-row">
          <button className="button secondary" type="button" onClick={() => onSelectRecord(null)}>
            New record
          </button>
          <button className="button secondary" type="button" onClick={() => void onResetFilter()}>
            Reset list
          </button>
        </div>
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
          draftLocation={form.location}
          onDraftLocationChange={(nextLocation) =>
            setForm((prev) => ({
              ...prev,
              location: nextLocation,
            }))
          }
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
              <span className="field-label">Occurred at</span>
              <input
                className="input"
                type="datetime-local"
                value={form.occurred_at}
                onChange={(event) => setForm((prev) => ({ ...prev, occurred_at: event.target.value }))}
              />
            </label>
          </div>
          <div className="inline-fields">
            <label className="field">
              <span className="field-label">Place name</span>
              <input
                className="input"
                value={form.location.place_name}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    location: { ...prev.location, place_name: event.target.value, source: "manual" },
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
                    location: { ...prev.location, address: event.target.value, source: "manual" },
                  }))
                }
                placeholder="Hangzhou, West Lake district"
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
          <div className="inline-fields">
            <label className="field">
              <span className="field-label">Latitude</span>
              <input
                className="input"
                inputMode="decimal"
                value={form.location.latitude}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    location: { ...prev.location, latitude: event.target.value, source: "manual" },
                  }))
                }
                placeholder="30.274100"
              />
            </label>
            <label className="field">
              <span className="field-label">Longitude</span>
              <input
                className="input"
                inputMode="decimal"
                value={form.location.longitude}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    location: { ...prev.location, longitude: event.target.value, source: "manual" },
                  }))
                }
                placeholder="120.155100"
              />
            </label>
            <label className="field">
              <span className="field-label">Location source</span>
              <input className="input" disabled value={form.location.source || "manual"} />
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
                      <div className="tag-row">
                        <span className="tag">{asset.processing_status}</span>
                        <span className="tag">{asset.storage_provider}</span>
                      </div>
                      {asset.extracted_text ? (
                        <p style={{ margin: "10px 0 0", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                          {asset.extracted_text.length > 280
                            ? `${asset.extracted_text.slice(0, 280)}...`
                            : asset.extracted_text}
                        </p>
                      ) : null}
                      {asset.processing_error ? (
                        <div className="notice error" style={{ marginTop: 10 }}>
                          {asset.processing_error}
                        </div>
                      ) : null}
                      <div className="action-row" style={{ marginTop: 12 }}>
                        <button
                          className="button secondary"
                          type="button"
                          disabled={refreshingMediaId === asset.id}
                          onClick={() => void handleRefreshMedia(asset.id)}
                        >
                          {refreshingMediaId === asset.id ? "Refreshing..." : "Refresh status"}
                        </button>
                        {asset.processing_status !== "completed" ? (
                          <button
                            className="button secondary"
                            type="button"
                            disabled={retryingMediaId === asset.id}
                            onClick={() => void handleRetryMediaProcessing(asset.id)}
                          >
                            {retryingMediaId === asset.id ? "Retrying..." : "Retry"}
                          </button>
                        ) : null}
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="notice">No media uploaded for this record yet.</div>
                )}
              </div>

              <div className="record-card form-stack">
                <div className="eyebrow">Reminder V1</div>
                <div className="muted">
                  Save one-time reminders on this record. Delivery execution will be connected in the next backend step.
                </div>
                <div className="form-stack">
                  <div className="inline-fields">
                    <label className="field">
                      <span className="field-label">Reminder title</span>
                      <input
                        className="input"
                        value={reminderForm.title}
                        onChange={(event) =>
                          setReminderForm((prev) => ({
                            ...prev,
                            title: event.target.value,
                          }))
                        }
                        placeholder="Dinner follow-up"
                      />
                    </label>
                    <label className="field">
                      <span className="field-label">Remind at</span>
                      <input
                        className="input"
                        type="datetime-local"
                        value={reminderForm.remind_at}
                        onChange={(event) =>
                          setReminderForm((prev) => ({
                            ...prev,
                            remind_at: event.target.value,
                          }))
                        }
                      />
                    </label>
                    <label className="field">
                      <span className="field-label">Channel</span>
                      <input className="input" disabled value="in_app" />
                    </label>
                  </div>
                  <label className="field">
                    <span className="field-label">Reminder note</span>
                    <textarea
                      className="textarea"
                      value={reminderForm.message}
                      onChange={(event) =>
                        setReminderForm((prev) => ({
                          ...prev,
                          message: event.target.value,
                        }))
                      }
                      placeholder="What should this reminder tell you?"
                    />
                  </label>
                  <div className="action-row">
                    <button
                      className="button secondary"
                      disabled={savingReminder}
                      type="button"
                      onClick={() => void handleCreateReminderSubmit()}
                    >
                      {savingReminder ? "Saving reminder..." : "Create reminder"}
                    </button>
                  </div>
                </div>
                <div className="record-list compact-list">
                  {reminders.length ? (
                    reminders.map((reminder) => (
                      <article className="record-card" key={reminder.id}>
                        <div className="eyebrow">{reminder.channel_code}</div>
                        <h4 style={{ margin: "8px 0 6px", fontSize: 18 }}>
                          {reminder.title || selectedRecord.title || "Untitled reminder"}
                        </h4>
                        <div className="muted">{formatReminderTimestamp(reminder.remind_at)}</div>
                        {reminder.message ? (
                          <p style={{ margin: "10px 0 0", lineHeight: 1.6 }}>{reminder.message}</p>
                        ) : null}
                        <div className="tag-row">
                          <span className="tag">{reminder.status}</span>
                          <span className="tag">{reminder.is_enabled ? "enabled" : "paused"}</span>
                        </div>
                        <div className="action-row" style={{ marginTop: 12 }}>
                          <button
                            className="button secondary"
                            type="button"
                            onClick={() =>
                              void onUpdateReminder(reminder.id, {
                                is_enabled: !reminder.is_enabled,
                              })
                            }
                          >
                            {reminder.is_enabled ? "Pause" : "Enable"}
                          </button>
                          {reminder.status !== "completed" ? (
                            <button
                              className="button secondary"
                              type="button"
                              onClick={() =>
                                void onUpdateReminder(reminder.id, {
                                  status: "completed",
                                  is_enabled: false,
                                })
                              }
                            >
                              Mark done
                            </button>
                          ) : null}
                          <button
                            className="button secondary"
                            type="button"
                            onClick={() => void onDeleteReminder(reminder.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="notice">No reminders for this record yet.</div>
                  )}
                </div>
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
                    {formatRecordTimestamp(record)} | {record.source_type}
                  </div>
                  <p style={{ margin: "12px 0 0", lineHeight: 1.6 }}>
                    {record.content || "No content"}
                  </p>
                  {location.place_name || location.address ? (
                    <div className="muted" style={{ marginTop: 10 }}>
                      {location.place_name || "Unknown place"}
                      {location.address ? ` | ${location.address}` : ""}
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


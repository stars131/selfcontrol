"use client";

import type { RecordEditorFieldsProps } from "./record-editor-fields.types";

type RecordEditorLocationFieldsProps = Pick<
  RecordEditorFieldsProps,
  | "canWriteWorkspace"
  | "form"
  | "onAddressChange"
  | "onAvoidChange"
  | "onLatitudeChange"
  | "onLongitudeChange"
  | "onPlaceNameChange"
  | "panelCopy"
>;

export function RecordEditorLocationFields({
  canWriteWorkspace,
  form,
  onAddressChange,
  onAvoidChange,
  onLatitudeChange,
  onLongitudeChange,
  onPlaceNameChange,
  panelCopy,
}: RecordEditorLocationFieldsProps) {
  return (
    <>
      <div className="inline-fields">
        <label className="field">
          <span className="field-label">{panelCopy.placeName}</span>
          <input
            className="input"
            disabled={!canWriteWorkspace}
            value={form.location.place_name}
            onChange={(event) => onPlaceNameChange(event.target.value)}
            placeholder={panelCopy.placePlaceholder}
          />
        </label>
        <label className="field">
          <span className="field-label">{panelCopy.address}</span>
          <input
            className="input"
            disabled={!canWriteWorkspace}
            value={form.location.address}
            onChange={(event) => onAddressChange(event.target.value)}
            placeholder={panelCopy.addressPlaceholder}
          />
        </label>
        <label className="checkbox-field">
          <input
            checked={form.is_avoid}
            disabled={!canWriteWorkspace}
            type="checkbox"
            onChange={(event) => onAvoidChange(event.target.checked)}
          />
          <span>{panelCopy.avoidItem}</span>
        </label>
      </div>
      <div className="inline-fields">
        <label className="field">
          <span className="field-label">{panelCopy.latitude}</span>
          <input
            className="input"
            inputMode="decimal"
            disabled={!canWriteWorkspace}
            value={form.location.latitude}
            onChange={(event) => onLatitudeChange(event.target.value)}
            placeholder="30.274100"
          />
        </label>
        <label className="field">
          <span className="field-label">{panelCopy.longitude}</span>
          <input
            className="input"
            inputMode="decimal"
            disabled={!canWriteWorkspace}
            value={form.location.longitude}
            onChange={(event) => onLongitudeChange(event.target.value)}
            placeholder="120.155100"
          />
        </label>
        <label className="field">
          <span className="field-label">{panelCopy.locationSource}</span>
          <input className="input" disabled value={form.location.source || "manual"} />
        </label>
      </div>
    </>
  );
}

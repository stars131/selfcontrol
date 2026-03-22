"use client";

import type { PanelCopy } from "../lib/record-panel-ui";
import type { RecordFormState } from "../lib/record-panel-forms";

type RecordEditorFieldsProps = {
  canWriteWorkspace: boolean;
  editorLabel: string;
  form: RecordFormState;
  panelCopy: PanelCopy;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onTypeCodeChange: (value: string) => void;
  onRatingChange: (value: string) => void;
  onOccurredAtChange: (value: string) => void;
  onPlaceNameChange: (value: string) => void;
  onAddressChange: (value: string) => void;
  onAvoidChange: (value: boolean) => void;
  onLatitudeChange: (value: string) => void;
  onLongitudeChange: (value: string) => void;
};

export function RecordEditorFields({
  canWriteWorkspace,
  editorLabel,
  form,
  panelCopy,
  onTitleChange,
  onContentChange,
  onTypeCodeChange,
  onRatingChange,
  onOccurredAtChange,
  onPlaceNameChange,
  onAddressChange,
  onAvoidChange,
  onLatitudeChange,
  onLongitudeChange,
}: RecordEditorFieldsProps) {
  return (
    <>
      <div className="eyebrow">{editorLabel}</div>
      <label className="field">
        <span className="field-label">{panelCopy.title}</span>
        <input
          className="input"
          disabled={!canWriteWorkspace}
          value={form.title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder={panelCopy.optionalTitle}
        />
      </label>
      <label className="field">
        <span className="field-label">{panelCopy.content}</span>
        <textarea
          className="textarea"
          disabled={!canWriteWorkspace}
          value={form.content}
          onChange={(event) => onContentChange(event.target.value)}
          placeholder={panelCopy.contentPlaceholder}
        />
      </label>
      <div className="inline-fields">
        <label className="field">
          <span className="field-label">{panelCopy.type}</span>
          <select
            className="input"
            disabled={!canWriteWorkspace}
            value={form.type_code}
            onChange={(event) => onTypeCodeChange(event.target.value)}
          >
            <option value="memo">{panelCopy.memo}</option>
            <option value="food">{panelCopy.food}</option>
            <option value="snack">{panelCopy.snack}</option>
            <option value="bad_experience">{panelCopy.badExperience}</option>
          </select>
        </label>
        <label className="field">
          <span className="field-label">{panelCopy.rating}</span>
          <input
            className="input"
            type="number"
            disabled={!canWriteWorkspace}
            min="1"
            max="5"
            value={form.rating}
            onChange={(event) => onRatingChange(event.target.value)}
            placeholder="1-5"
          />
        </label>
        <label className="field">
          <span className="field-label">{panelCopy.occurredAt}</span>
          <input
            className="input"
            type="datetime-local"
            disabled={!canWriteWorkspace}
            value={form.occurred_at}
            onChange={(event) => onOccurredAtChange(event.target.value)}
          />
        </label>
      </div>
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

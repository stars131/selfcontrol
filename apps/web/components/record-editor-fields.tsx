"use client";

import { RecordEditorLocationFields } from "./record-editor-location-fields";
import { RecordEditorMetadataFields } from "./record-editor-metadata-fields";
import { RecordEditorPrimaryFields } from "./record-editor-primary-fields";
import type { RecordEditorFieldsProps } from "./record-editor-fields.types";

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
      <RecordEditorPrimaryFields
        canWriteWorkspace={canWriteWorkspace}
        editorLabel={editorLabel}
        form={form}
        onContentChange={onContentChange}
        onTitleChange={onTitleChange}
        panelCopy={panelCopy}
      />
      <RecordEditorMetadataFields
        canWriteWorkspace={canWriteWorkspace}
        form={form}
        onOccurredAtChange={onOccurredAtChange}
        onRatingChange={onRatingChange}
        onTypeCodeChange={onTypeCodeChange}
        panelCopy={panelCopy}
      />
      <RecordEditorLocationFields
        canWriteWorkspace={canWriteWorkspace}
        form={form}
        onAddressChange={onAddressChange}
        onAvoidChange={onAvoidChange}
        onLatitudeChange={onLatitudeChange}
        onLongitudeChange={onLongitudeChange}
        onPlaceNameChange={onPlaceNameChange}
        panelCopy={panelCopy}
      />
    </>
  );
}

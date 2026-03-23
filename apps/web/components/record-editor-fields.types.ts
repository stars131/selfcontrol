"use client";

import type { RecordFormState } from "../lib/record-panel-forms";
import type { PanelCopy } from "../lib/record-panel-ui";

export type RecordEditorFieldsProps = {
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

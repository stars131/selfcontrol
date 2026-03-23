"use client";

import { LocationReviewPanel } from "./location-review-panel";
import { RecordEditorFields } from "./record-editor-fields";
import type { RecordEditorWorkspaceProps } from "./record-editor-workspace.types";

type RecordEditorMainSectionsProps = Pick<
  RecordEditorWorkspaceProps,
  | "canWriteWorkspace"
  | "form"
  | "formatHistoryTimestampLabel"
  | "formatReviewStatusLabel"
  | "locationReviewForm"
  | "panelCopy"
  | "selectedLocationHistory"
  | "selectedLocationReview"
  | "selectedRecord"
  | "summarizeHistoryActionLabel"
> & {
  fieldBindings: {
    onAddressChange: (value: string) => void;
    onAvoidChange: (value: boolean) => void;
    onContentChange: (value: string) => void;
    onLatitudeChange: (value: string) => void;
    onLongitudeChange: (value: string) => void;
    onOccurredAtChange: (value: string) => void;
    onPlaceNameChange: (value: string) => void;
    onRatingChange: (value: string) => void;
    onTitleChange: (value: string) => void;
    onTypeCodeChange: (value: string) => void;
  };
  locationReviewBindings: {
    onMarkConfirmed: () => void;
    onMarkNeedsReview: () => void;
    onNoteChange: (value: string) => void;
    onResetReview: () => void;
    onStatusChange: (value: string) => void;
  };
};

export function RecordEditorMainSections({
  canWriteWorkspace,
  fieldBindings,
  form,
  formatHistoryTimestampLabel,
  formatReviewStatusLabel,
  locationReviewBindings,
  locationReviewForm,
  panelCopy,
  selectedLocationHistory,
  selectedLocationReview,
  selectedRecord,
  summarizeHistoryActionLabel,
}: RecordEditorMainSectionsProps) {
  const hasSelectedRecord = Boolean(selectedRecord);

  return (
    <>
      <RecordEditorFields
        canWriteWorkspace={canWriteWorkspace}
        editorLabel={selectedRecord ? panelCopy.editRecord : panelCopy.newManualRecord}
        form={form}
        onAddressChange={fieldBindings.onAddressChange}
        onAvoidChange={fieldBindings.onAvoidChange}
        onContentChange={fieldBindings.onContentChange}
        onLatitudeChange={fieldBindings.onLatitudeChange}
        onLongitudeChange={fieldBindings.onLongitudeChange}
        onOccurredAtChange={fieldBindings.onOccurredAtChange}
        onPlaceNameChange={fieldBindings.onPlaceNameChange}
        onRatingChange={fieldBindings.onRatingChange}
        onTitleChange={fieldBindings.onTitleChange}
        onTypeCodeChange={fieldBindings.onTypeCodeChange}
        panelCopy={panelCopy}
      />
      <LocationReviewPanel
        canWriteWorkspace={canWriteWorkspace}
        formatHistoryTimestampLabel={formatHistoryTimestampLabel}
        formatReviewStatusLabel={formatReviewStatusLabel}
        hasSelectedRecord={hasSelectedRecord}
        onMarkConfirmed={locationReviewBindings.onMarkConfirmed}
        onMarkNeedsReview={locationReviewBindings.onMarkNeedsReview}
        onNoteChange={locationReviewBindings.onNoteChange}
        onResetReview={locationReviewBindings.onResetReview}
        onStatusChange={locationReviewBindings.onStatusChange}
        panelCopy={panelCopy}
        reviewForm={locationReviewForm}
        selectedLocationHistory={selectedLocationHistory}
        selectedLocationReview={selectedLocationReview}
        summarizeHistoryActionLabel={summarizeHistoryActionLabel}
      />
    </>
  );
}

"use client";
import { RecordEditorMainSections } from "./record-editor-main-sections";
import type { RecordEditorMainSectionsProps } from "./record-editor-main-sections.types";
import type { RecordEditorWorkspaceProps } from "./record-editor-workspace.types";
import type { BuildRecordEditorMainSectionsPropsInput } from "./record-editor-workspace-main-sections-props.types";

export function buildRecordEditorMainSectionsProps({
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
}: BuildRecordEditorMainSectionsPropsInput): RecordEditorMainSectionsProps {
  return {
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
  };
}

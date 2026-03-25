"use client";
import { RecordEditorMainSections } from "./record-editor-main-sections";
import type { RecordEditorMainSectionsProps } from "./record-editor-main-sections.types";
import type { RecordEditorWorkspaceProps } from "./record-editor-workspace.types";
import type { BuildRecordEditorMainSectionsPropsInput } from "./record-editor-workspace-main-sections-props.types";

export function buildRecordEditorMainSectionsProps({
  fieldBindings,
  locationReviewBindings,
  props,
}: BuildRecordEditorMainSectionsPropsInput): RecordEditorMainSectionsProps {
  return {
    canWriteWorkspace: props.canWriteWorkspace,
    fieldBindings,
    form: props.form,
    formatHistoryTimestampLabel: props.formatHistoryTimestampLabel,
    formatReviewStatusLabel: props.formatReviewStatusLabel,
    locationReviewBindings,
    locationReviewForm: props.locationReviewForm,
    panelCopy: props.panelCopy,
    selectedLocationHistory: props.selectedLocationHistory,
    selectedLocationReview: props.selectedLocationReview,
    selectedRecord: props.selectedRecord,
    summarizeHistoryActionLabel: props.summarizeHistoryActionLabel,
  };
}

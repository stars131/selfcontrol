"use client";
import { RecordEditorMainSections } from "./record-editor-main-sections";
import type { RecordEditorMainSectionsProps } from "./record-editor-main-sections.types";
import type { RecordEditorWorkspaceProps } from "./record-editor-workspace.types";
import type { BuildRecordEditorMainSectionsPropsInput } from "./record-editor-workspace-main-sections-props.types";

export function buildRecordEditorMainSectionsProps(input: BuildRecordEditorMainSectionsPropsInput): RecordEditorMainSectionsProps {
  return {
    canWriteWorkspace: input.canWriteWorkspace,
    fieldBindings: input.fieldBindings,
    form: input.form,
    formatHistoryTimestampLabel: input.formatHistoryTimestampLabel,
    formatReviewStatusLabel: input.formatReviewStatusLabel,
    locationReviewBindings: input.locationReviewBindings,
    locationReviewForm: input.locationReviewForm,
    panelCopy: input.panelCopy,
    selectedLocationHistory: input.selectedLocationHistory,
    selectedLocationReview: input.selectedLocationReview,
    selectedRecord: input.selectedRecord,
    summarizeHistoryActionLabel: input.summarizeHistoryActionLabel,
  };
}

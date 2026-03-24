"use client";

import type { ComponentProps } from "react";

import { RecordEditorMainSections } from "./record-editor-main-sections";
import type { RecordEditorWorkspaceProps } from "./record-editor-workspace.types";

type RecordEditorMainSectionsProps = ComponentProps<typeof RecordEditorMainSections>;

export function buildRecordEditorMainSectionsProps({
  fieldBindings,
  locationReviewBindings,
  props,
}: {
  fieldBindings: RecordEditorMainSectionsProps["fieldBindings"];
  locationReviewBindings: RecordEditorMainSectionsProps["locationReviewBindings"];
  props: RecordEditorWorkspaceProps;
}): RecordEditorMainSectionsProps {
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

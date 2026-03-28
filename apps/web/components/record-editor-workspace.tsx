"use client";

import { RecordEditorMainSections } from "./record-editor-main-sections";
import { RecordEditorSupportTools } from "./record-editor-support-tools";
import type { RecordEditorWorkspaceProps } from "./record-editor-workspace.types";
import {
  createLocationReviewBindings,
  createRecordEditorFieldBindings,
} from "./record-editor-workspace-bindings";
import {
  buildRecordEditorMainSectionsProps,
  buildRecordEditorSupportToolsProps,
} from "./record-editor-workspace-sections-props";

export function RecordEditorWorkspace(props: RecordEditorWorkspaceProps) {
  const fieldBindings = createRecordEditorFieldBindings(props.setForm);
  const locationReviewBindings = createLocationReviewBindings(props.setLocationReviewForm);
  const mainSectionsProps = buildRecordEditorMainSectionsProps({
    ...props,
    fieldBindings,
    locationReviewBindings,
  });
  const supportToolsProps = buildRecordEditorSupportToolsProps(props);

  return (
    <form className="record-card form-stack" style={{ marginTop: 20 }} onSubmit={props.onSubmit}>
      <RecordEditorMainSections {...mainSectionsProps} />
      <RecordEditorSupportTools {...supportToolsProps} />
    </form>
  );
}

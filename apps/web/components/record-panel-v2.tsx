"use client";

import { RecordBrowseWorkspace } from "./record-browse-workspace";
import { RecordEditorWorkspace } from "./record-editor-workspace";
import { RecordPanelHeader } from "./record-panel-header";
import type { RecordPanelV2Props } from "./record-panel-v2.types";
import {
  buildRecordBrowseWorkspaceInput,
  buildRecordEditorWorkspaceInput,
  buildRecordPanelControllerInput,
  buildRecordPanelHeaderProps,
} from "./record-panel-v2-shell-props";
import {
  buildRecordBrowseWorkspaceProps,
  buildRecordEditorWorkspaceProps,
} from "./record-panel-v2-workspace-props";
import { useRecordPanelController } from "./use-record-panel-controller";

export function RecordPanelV2({
  ...props
}: RecordPanelV2Props) {
  const controller = useRecordPanelController(buildRecordPanelControllerInput(props));
  const browseWorkspaceProps = buildRecordBrowseWorkspaceProps(
    buildRecordBrowseWorkspaceInput({ controller, props }),
  );
  const editorWorkspaceProps = buildRecordEditorWorkspaceProps(
    buildRecordEditorWorkspaceInput({ controller, props }),
  );
  const headerProps = buildRecordPanelHeaderProps({
    canWriteWorkspace: props.canWriteWorkspace,
    onSelectRecord: props.onSelectRecord,
    panelCopy: controller.panelCopy,
    workspaceId: props.workspaceId,
  });

  return (
    <section className="panel">
      <RecordPanelHeader {...headerProps} />
      <div className="panel-body">
        <RecordBrowseWorkspace {...browseWorkspaceProps} />
        <RecordEditorWorkspace {...editorWorkspaceProps} />
      </div>
    </section>
  );
}

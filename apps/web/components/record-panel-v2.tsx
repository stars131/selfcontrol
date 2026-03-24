"use client";

import { RecordBrowseWorkspace } from "./record-browse-workspace";
import { RecordEditorWorkspace } from "./record-editor-workspace";
import { RecordPanelHeader } from "./record-panel-header";
import type { RecordPanelV2Props } from "./record-panel-v2.types";
import {
  buildRecordPanelControllerInput,
  buildRecordPanelShellViewProps,
} from "./record-panel-v2-shell-props";
import { useRecordPanelController } from "./use-record-panel-controller";

export function RecordPanelV2({
  ...props
}: RecordPanelV2Props) {
  const controller = useRecordPanelController(buildRecordPanelControllerInput(props));
  const { browseWorkspaceProps, editorWorkspaceProps, headerProps } =
    buildRecordPanelShellViewProps({ controller, props });

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

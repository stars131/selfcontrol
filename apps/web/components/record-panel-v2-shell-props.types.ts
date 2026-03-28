import type { RecordPanelController as RecordPanelControllerValue } from "./record-panel-controller-output.types";
import type { RecordPanelHeaderComponentProps } from "./record-panel-header.types"; import type { RecordPanelV2Props } from "./record-panel-v2.types";
export type RecordPanelHeaderProps = RecordPanelHeaderComponentProps;
export type RecordPanelController = RecordPanelControllerValue;
export type RecordPanelShellInput = RecordPanelV2Props & { controller: RecordPanelController };

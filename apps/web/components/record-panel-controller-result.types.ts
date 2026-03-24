import type { createRecordPanelControllerHandlerGroups } from "./record-panel-controller-handler-groups";
import type { useRecordPanelControllerState } from "./use-record-panel-controller-state";
import type { useRecordPanelControllerViewData } from "./use-record-panel-controller-view-data";

type ControllerState = ReturnType<typeof useRecordPanelControllerState>; type ControllerViewData = ReturnType<typeof useRecordPanelControllerViewData>; type ControllerHandlers = ReturnType<typeof createRecordPanelControllerHandlerGroups>;
export type BuildRecordPanelControllerResultInput = { mediaHandlers: ControllerHandlers["mediaHandlers"]; recordHandlers: ControllerHandlers["recordHandlers"]; state: ControllerState; viewData: ControllerViewData };

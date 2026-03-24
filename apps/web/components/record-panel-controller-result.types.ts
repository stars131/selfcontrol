import type { BuildRecordPanelControllerHandlerGroupsResultInput } from "./record-panel-controller-handler-groups-result.types";
import type { BuildRecordPanelControllerStateResultInput } from "./record-panel-controller-state-result.types";
import type { BuildRecordPanelControllerViewDataResultInput } from "./record-panel-controller-view-data-result.types";
export type BuildRecordPanelControllerResultInput = { mediaHandlers: BuildRecordPanelControllerHandlerGroupsResultInput["mediaHandlers"]; recordHandlers: BuildRecordPanelControllerHandlerGroupsResultInput["recordHandlers"]; state: BuildRecordPanelControllerStateResultInput; viewData: BuildRecordPanelControllerViewDataResultInput };

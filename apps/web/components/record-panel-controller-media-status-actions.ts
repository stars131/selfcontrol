"use client";
import { createRecordPanelControllerMediaRefreshAction } from "./record-panel-controller-media-refresh-action";
import { createRecordPanelControllerMediaRetryAction } from "./record-panel-controller-media-retry-action";
import type { RecordPanelControllerMediaStatusActionInput } from "./record-panel-controller-media-status-action-input.types";

export function createRecordPanelControllerMediaStatusActions({
  ...input
}: RecordPanelControllerMediaStatusActionInput) {
  const mediaRefreshAction = createRecordPanelControllerMediaRefreshAction(input);
  const mediaRetryAction = createRecordPanelControllerMediaRetryAction(input);

  return {
    ...mediaRefreshAction,
    ...mediaRetryAction,
  };
}

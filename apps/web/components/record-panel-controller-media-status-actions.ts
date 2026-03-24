"use client";
import { createRecordPanelControllerMediaRefreshAction } from "./record-panel-controller-media-refresh-action";
import { createRecordPanelControllerMediaRetryAction } from "./record-panel-controller-media-retry-action";

export function createRecordPanelControllerMediaStatusActions({
  ...props
}: Parameters<typeof createRecordPanelControllerMediaRefreshAction>[0] &
  Parameters<typeof createRecordPanelControllerMediaRetryAction>[0]) {
  const mediaRefreshAction = createRecordPanelControllerMediaRefreshAction(props);
  const mediaRetryAction = createRecordPanelControllerMediaRetryAction(props);

  return {
    ...mediaRefreshAction,
    ...mediaRetryAction,
  };
}

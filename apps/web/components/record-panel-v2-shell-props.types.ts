"use client";

import type { ComponentProps } from "react";

import { RecordPanelHeader } from "./record-panel-header";
import type { RecordPanelV2Props } from "./record-panel-v2.types";

export type RecordPanelHeaderProps = ComponentProps<typeof RecordPanelHeader>;
export type RecordPanelController = ReturnType<
  typeof import("./use-record-panel-controller").useRecordPanelController
>;
export type RecordPanelShellInput = {
  controller: RecordPanelController;
  props: RecordPanelV2Props;
};

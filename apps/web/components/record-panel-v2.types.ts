"use client";
import type { RecordPanelV2ActionProps } from "./record-panel-v2-props-action.types";
import type { RecordPanelV2DataProps } from "./record-panel-v2-props-data.types";

export type { RecordPanelBulkRetryMediaDeadLetterInput, RecordPanelCreateReminderInput, RecordPanelLocationFilterInput, ReminderUpdateInput, SaveRecordInput, ViewMode } from "./record-panel-v2-input.types";
export type RecordPanelV2Props = RecordPanelV2ActionProps & RecordPanelV2DataProps;

"use client";

import type { RecordPanelControllerRecordSubmitActionInput } from "./record-panel-controller-record-submit-action-input.types";
import type { RecordPanelControllerReminderActionInput } from "./record-panel-controller-reminder-action-input.types";

export type RecordPanelControllerFormActionInput =
  RecordPanelControllerRecordSubmitActionInput &
  RecordPanelControllerReminderActionInput;

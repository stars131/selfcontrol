"use client";
import type { Dispatch, SetStateAction } from "react";
import type { LocationReviewFormState, RecordFormState, ReminderFormState } from "../lib/record-panel-forms";
import type { RecordItem } from "../lib/types";
type SelectedRecord = RecordItem | null;
export type SelectedRecordFormSyncInput = { selectedRecord: SelectedRecord; setForm: Dispatch<SetStateAction<RecordFormState>>; setLocationReviewForm: Dispatch<SetStateAction<LocationReviewFormState>> };
export type SelectedRecordReminderSyncInput = { selectedRecord: SelectedRecord; setReminderForm: Dispatch<SetStateAction<ReminderFormState>> };
export type SelectedRecordSyncInput = SelectedRecordFormSyncInput & SelectedRecordReminderSyncInput;

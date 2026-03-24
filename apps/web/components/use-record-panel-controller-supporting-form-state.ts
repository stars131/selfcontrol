"use client";

import { useState } from "react";
import {
  createEmptyReminderForm,
  type LocationReviewFormState,
  type ReminderFormState,
} from "../lib/record-panel-forms";

export function useRecordPanelControllerSupportingFormState() {
  const [reminderForm, setReminderForm] = useState<ReminderFormState>(createEmptyReminderForm);
  const [savingReminder, setSavingReminder] = useState(false);
  const [locationReviewForm, setLocationReviewForm] = useState<LocationReviewFormState>({
    status: "pending",
    note: "",
  });
  const [error, setError] = useState("");
  return {
    reminderForm,
    setReminderForm,
    savingReminder,
    setSavingReminder,
    locationReviewForm,
    setLocationReviewForm,
    error,
    setError,
  };
}

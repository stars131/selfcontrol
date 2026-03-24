"use client";

import { useState } from "react";
import {
  createEmptyForm,
  createEmptyReminderForm,
  type LocationReviewFormState,
  type ReminderFormState,
} from "../lib/record-panel-forms";

export function useRecordPanelControllerFormState() {
  const [form, setForm] = useState(createEmptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [reminderForm, setReminderForm] = useState<ReminderFormState>(createEmptyReminderForm);
  const [savingReminder, setSavingReminder] = useState(false);
  const [locationReviewForm, setLocationReviewForm] = useState<LocationReviewFormState>({
    status: "pending",
    note: "",
  });
  const [error, setError] = useState("");
  return {
    form,
    setForm,
    saving,
    setSaving,
    deleting,
    setDeleting,
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

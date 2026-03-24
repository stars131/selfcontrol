"use client";

import { useState } from "react";
import { createEmptyForm } from "../lib/record-panel-forms";

export function useRecordPanelControllerRecordFormState() {
  const [form, setForm] = useState(createEmptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  return { form, setForm, saving, setSaving, deleting, setDeleting };
}

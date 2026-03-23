"use client";

import { useState } from "react";

import type { RecordPanelFormState } from "./record-panel.types";

export const EMPTY_RECORD_PANEL_FORM: RecordPanelFormState = {
  title: "",
  content: "",
  type_code: "memo",
  rating: "",
  is_avoid: false,
};

export function useRecordPanelLegacyState() {
  const [form, setForm] = useState<RecordPanelFormState>(EMPTY_RECORD_PANEL_FORM);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  return {
    form,
    setForm,
    saving,
    setSaving,
    deleting,
    setDeleting,
    uploading,
    setUploading,
    error,
    setError,
  };
}

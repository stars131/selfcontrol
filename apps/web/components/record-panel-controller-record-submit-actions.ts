"use client";

import type { FormEvent } from "react";

import {
  createEmptyForm,
  type LocationReviewFormState,
  type RecordFormState,
} from "../lib/record-panel-forms";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { RecordItem } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

function getErrorMessage(caught: unknown, fallbackMessage: string) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

export function createRecordPanelControllerRecordSubmitActions({
  detailCopy,
  form,
  locationReviewForm,
  onDeleteRecord,
  onSaveRecord,
  selectedRecord,
  setDeleting,
  setError,
  setForm,
  setSaving,
}: {
  detailCopy: DetailCopy;
  form: RecordFormState;
  locationReviewForm: LocationReviewFormState;
  onDeleteRecord: ControllerProps["onDeleteRecord"];
  onSaveRecord: ControllerProps["onSaveRecord"];
  selectedRecord: RecordItem | null;
  setDeleting: (value: boolean) => void;
  setError: (value: string) => void;
  setForm: React.Dispatch<React.SetStateAction<RecordFormState>>;
  setSaving: (value: boolean) => void;
}) {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.content.trim()) {
      setError(detailCopy.contentRequiredError);
      return;
    }

    const latitude = form.location.latitude.trim() ? Number(form.location.latitude) : null;
    const longitude = form.location.longitude.trim() ? Number(form.location.longitude) : null;

    if (form.location.latitude.trim() && (latitude === null || Number.isNaN(latitude))) {
      setError(detailCopy.latitudeInvalidError);
      return;
    }

    if (form.location.longitude.trim() && (longitude === null || Number.isNaN(longitude))) {
      setError(detailCopy.longitudeInvalidError);
      return;
    }

    setSaving(true);
    setError("");
    try {
      const hasLocation =
        form.location.place_name.trim() ||
        form.location.address.trim() ||
        latitude !== null ||
        longitude !== null;

      await onSaveRecord({
        recordId: selectedRecord?.id,
        title: form.title.trim() || undefined,
        content: form.content.trim(),
        type_code: form.type_code,
        rating: form.rating ? Number(form.rating) : null,
        occurred_at: form.occurred_at ? new Date(form.occurred_at).toISOString() : undefined,
        is_avoid: form.is_avoid,
        extra_data: hasLocation
          ? {
              location: {
                place_name: form.location.place_name.trim() || undefined,
                address: form.location.address.trim() || undefined,
                latitude: latitude ?? undefined,
                longitude: longitude ?? undefined,
                source: form.location.source || "manual",
              },
              location_review: {
                status: locationReviewForm.status || "pending",
                note: locationReviewForm.note.trim() || undefined,
              },
            }
          : {
              location: null,
              location_review: null,
            },
      });

      if (!selectedRecord) {
        setForm(createEmptyForm());
      }
    } catch (caught) {
      setError(getErrorMessage(caught, detailCopy.saveRecordError));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!selectedRecord) {
      return;
    }
    setDeleting(true);
    setError("");
    try {
      await onDeleteRecord(selectedRecord.id);
    } catch (caught) {
      setError(getErrorMessage(caught, detailCopy.deleteRecordError));
    } finally {
      setDeleting(false);
    }
  }

  return {
    handleSubmit,
    handleDelete,
  };
}

"use client";

import { RecordPanelLegacyClassificationFields } from "./record-panel-legacy-classification-fields";
import { RecordPanelLegacyPrimaryFields } from "./record-panel-legacy-primary-fields";
import type { RecordPanelLegacyFormFieldsProps } from "./record-panel-legacy-form-fields.types";

export function RecordPanelLegacyFormFields({
  form,
  setForm,
}: RecordPanelLegacyFormFieldsProps) {
  return (
    <>
      <RecordPanelLegacyPrimaryFields form={form} setForm={setForm} />
      <RecordPanelLegacyClassificationFields form={form} setForm={setForm} />
    </>
  );
}

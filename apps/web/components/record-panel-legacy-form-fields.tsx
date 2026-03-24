"use client";

import { RecordPanelLegacyClassificationFields } from "./record-panel-legacy-classification-fields";
import type { RecordPanelLegacyFormProps } from "./record-panel-legacy-form.types";
import { RecordPanelLegacyPrimaryFields } from "./record-panel-legacy-primary-fields";

export function RecordPanelLegacyFormFields({
  form,
  setForm,
}: Pick<RecordPanelLegacyFormProps, "form" | "setForm">) {
  return (
    <>
      <RecordPanelLegacyPrimaryFields form={form} setForm={setForm} />
      <RecordPanelLegacyClassificationFields form={form} setForm={setForm} />
    </>
  );
}

"use client";

import type { WorkspaceCreateSectionProps } from "./workspace-create-section.types";

export function WorkspaceCreateSection({
  copy,
  name,
  suggestedSlug,
  creating,
  onNameChange,
  onSubmit,
}: WorkspaceCreateSectionProps) {
  return (
    <section className="record-card">
      <div className="eyebrow">{copy.createEyebrow}</div>
      <h2 style={{ margin: "8px 0 12px" }}>{copy.createTitle}</h2>
      <form className="form-stack" onSubmit={(event) => void onSubmit(event)}>
        <label className="field">
          <span className="field-label">{copy.name}</span>
          <input
            className="input"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder="Food memory"
          />
        </label>
        <label className="field">
          <span className="field-label">{copy.slugPreview}</span>
          <input className="input" value={suggestedSlug} readOnly />
        </label>
        <button className="button" type="submit" disabled={creating}>
          {creating ? `${copy.createWorkspace}...` : copy.createWorkspace}
        </button>
      </form>
    </section>
  );
}

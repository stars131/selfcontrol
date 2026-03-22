"use client";

import type { FormEvent } from "react";

type WorkspaceCreateCopy = {
  createEyebrow: string;
  createTitle: string;
  name: string;
  slugPreview: string;
  createWorkspace: string;
};

export function WorkspaceCreateSection({
  copy,
  name,
  suggestedSlug,
  creating,
  onNameChange,
  onSubmit,
}: {
  copy: WorkspaceCreateCopy;
  name: string;
  suggestedSlug: string;
  creating: boolean;
  onNameChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}) {
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

"use client";

import type { RefObject } from "react";

type WorkspaceImportCopy = {
  importEyebrow: string;
  importTitle: string;
  importArchive: string;
  importName: string;
  importSlug: string;
  importWorkspace: string;
  queueImportJob: string;
};

export function WorkspaceImportSection({
  copy,
  fileInputRef,
  importName,
  importSlug,
  importFile,
  importing,
  queueingImportJob,
  onImportNameChange,
  onImportSlugChange,
  onImportFileChange,
  onImportWorkspace,
  onQueueImportJob,
}: {
  copy: WorkspaceImportCopy;
  fileInputRef: RefObject<HTMLInputElement | null>;
  importName: string;
  importSlug: string;
  importFile: File | null;
  importing: boolean;
  queueingImportJob: boolean;
  onImportNameChange: (value: string) => void;
  onImportSlugChange: (value: string) => void;
  onImportFileChange: (file: File | null) => void;
  onImportWorkspace: () => Promise<void>;
  onQueueImportJob: () => Promise<void>;
}) {
  return (
    <section className="record-card">
      <div className="eyebrow">{copy.importEyebrow}</div>
      <h2 style={{ margin: "8px 0 12px" }}>{copy.importTitle}</h2>
      <div className="form-stack">
        <label className="field">
          <span className="field-label">{copy.importArchive}</span>
          <input
            ref={fileInputRef}
            className="input"
            type="file"
            accept=".zip,application/zip"
            onChange={(event) => onImportFileChange(event.target.files?.[0] ?? null)}
          />
        </label>
        <label className="field">
          <span className="field-label">{copy.importName}</span>
          <input
            className="input"
            value={importName}
            onChange={(event) => onImportNameChange(event.target.value)}
          />
        </label>
        <label className="field">
          <span className="field-label">{copy.importSlug}</span>
          <input
            className="input"
            value={importSlug}
            onChange={(event) => onImportSlugChange(event.target.value)}
          />
        </label>
        <button
          className="button"
          type="button"
          disabled={importing || !importFile}
          onClick={() => void onImportWorkspace()}
        >
          {importing ? `${copy.importWorkspace}...` : copy.importWorkspace}
        </button>
        <button
          className="button secondary"
          type="button"
          disabled={queueingImportJob || !importFile}
          onClick={() => void onQueueImportJob()}
        >
          {queueingImportJob ? `${copy.queueImportJob}...` : copy.queueImportJob}
        </button>
      </div>
    </section>
  );
}

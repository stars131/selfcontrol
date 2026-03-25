"use client";

import Link from "next/link";

import type { WorkspaceListSectionProps } from "./workspace-list-section.types";

export function WorkspaceListSection({
  copy,
  workspaces,
}: WorkspaceListSectionProps) {
  return (
    <section className="record-card" style={{ gridColumn: "1 / -1" }}>
      <div className="eyebrow">{copy.listEyebrow}</div>
      <h2 style={{ margin: "8px 0 12px" }}>{copy.listTitle}</h2>
      <div className="record-list">
        {workspaces.length ? (
          workspaces.map((workspace) => (
            <article className="record-card" key={workspace.id}>
              <div className="eyebrow">
                {workspace.visibility} / {workspace.role}
              </div>
              <h3 style={{ margin: "8px 0 6px" }}>{workspace.name}</h3>
              <div className="muted">{workspace.slug}</div>
              <div style={{ marginTop: 12 }}>
                <div className="action-row">
                  <Link className="button" href={`/app/workspaces/${workspace.id}`}>
                    {copy.openWorkspace}
                  </Link>
                  {workspace.role !== "viewer" ? (
                    <Link className="button secondary" href={`/app/workspaces/${workspace.id}/settings`}>
                      {copy.settings}
                    </Link>
                  ) : null}
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="notice">{copy.noWorkspace}</div>
        )}
      </div>
    </section>
  );
}

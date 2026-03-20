import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="panel" style={{ maxWidth: 960, margin: "0 auto" }}>
        <div className="panel-header">
          <div>
            <div className="eyebrow">SelfControl</div>
            <h1 className="title">Personal Memory Workspace</h1>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <Link className="button secondary" href="/register">
              Create Account
            </Link>
            <Link className="button" href="/login">
              Sign In
            </Link>
          </div>
        </div>
        <div className="panel-body">
          <p className="muted" style={{ lineHeight: 1.7, maxWidth: 720 }}>
            SelfControl is a multi-modal memory system for notes, food records, warning lists,
            media attachments, search, maps, and an assistant-driven workflow.
          </p>
          <div className="stats-grid" style={{ marginTop: 20 }}>
            <div className="stat-card">
              <div className="eyebrow">Capture</div>
              <div className="title" style={{ fontSize: 18 }}>
                text / voice / image / video
              </div>
            </div>
            <div className="stat-card">
              <div className="eyebrow">Retrieve</div>
              <div className="title" style={{ fontSize: 18 }}>
                filters + text + semantic search
              </div>
            </div>
            <div className="stat-card">
              <div className="eyebrow">Operate</div>
              <div className="title" style={{ fontSize: 18 }}>
                chat left, structured cards right
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

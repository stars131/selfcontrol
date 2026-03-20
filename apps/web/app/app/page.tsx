import Link from "next/link";

export default function AppEntryPage() {
  return (
    <main className="page-shell">
      <section className="panel" style={{ maxWidth: 960, margin: "0 auto" }}>
        <div className="panel-header">
          <div>
            <div className="eyebrow">Workspace</div>
            <h1 className="title">工作台入口</h1>
          </div>
          <Link className="button" href="/app/workspaces/demo-space">
            打开示例空间
          </Link>
        </div>
        <div className="panel-body">
          <p className="muted">
            当前前端骨架先使用静态空间入口，后续接入登录态和真实空间列表接口。
          </p>
        </div>
      </section>
    </main>
  );
}


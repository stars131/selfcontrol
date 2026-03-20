import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="panel" style={{ maxWidth: 920, margin: "0 auto" }}>
        <div className="panel-header">
          <div>
            <div className="eyebrow">SelfControl</div>
            <h1 className="title">个人多模态记忆系统</h1>
          </div>
          <Link className="button" href="/app">
            进入工作台
          </Link>
        </div>
        <div className="panel-body">
          <p className="muted">
            这是一套以聊天助手为入口的生活记录系统，支持文字、语音、图片、视频、地图与 RAG 检索。
          </p>
          <div className="stats-grid" style={{ marginTop: 20 }}>
            <div className="stat-card">
              <div className="eyebrow">记录方式</div>
              <div className="title" style={{ fontSize: 18 }}>
                文字 / 语音 / 图片 / 视频
              </div>
            </div>
            <div className="stat-card">
              <div className="eyebrow">检索</div>
              <div className="title" style={{ fontSize: 18 }}>
                结构化 + 全文 + 向量
              </div>
            </div>
            <div className="stat-card">
              <div className="eyebrow">形态</div>
              <div className="title" style={{ fontSize: 18 }}>
                桌面与手机响应式
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


# SelfControl

SelfControl 是一个多模态生活记录、检索与聊天助手系统。

当前仓库包含：

- `apps/api`: FastAPI 后端
- `apps/web`: Next.js 前端
- `infra`: Docker 与 Nginx 配置
- `docs`: 设计文档

## 快速开始

1. 复制环境变量模板：

```bash
cp .env.example .env
```

2. 启动开发环境：

```bash
docker compose up --build
```

3. 访问服务：

- Web: `http://localhost:3000`
- API: `http://localhost:8000`
- API Docs: `http://localhost:8000/docs`

## 文档

- 项目说明：[PROJECT_SPEC.md](./PROJECT_SPEC.md)
- ER 与表结构：[docs/ERD_AND_SCHEMA.md](./docs/ERD_AND_SCHEMA.md)
- API 设计：[docs/API_AND_WORKFLOWS.md](./docs/API_AND_WORKFLOWS.md)


# SelfControl

SelfControl 是一个面向个人长期使用的多模态记忆与检索系统，支持聊天式录入、结构化记录、媒体附件、地图、RAG 知识检索和可扩展的 AI Provider 配置。

当前仓库包含：
- `apps/api`: FastAPI 后端
- `apps/web`: Next.js 前端
- `infra`: 部署相关配置
- `docs`: 项目和开发文档

## 快速开始

1. 复制环境变量模板

```bash
cp .env.example .env
```

2. 启动开发环境

```bash
docker compose up --build
```

3. 执行数据库迁移

```bash
cd apps/api
alembic upgrade head
```

4. 访问服务

- Web: `http://localhost:3000`
- API: `http://localhost:8000`
- API Docs: `http://localhost:8000/docs`
- Health: `http://localhost:8000/health`

## 运行说明

- `MEDIA_PROCESSING_MODE=async`：媒体上传和重试通过 Celery worker 异步处理，适合 Linux 服务器部署。
- `MEDIA_PROCESSING_MODE=sync`：API 进程同步处理媒体，适合本地调试和最小依赖场景。
- `/health` 会返回当前媒体处理模式、存储目录状态和基础运行配置。
- 生产环境应设置强 `SECRET_KEY`，并将 `AUTO_CREATE_TABLES=false`，通过 Alembic 迁移管理数据库结构。

## 文档

- 项目规格：[PROJECT_SPEC.md](./PROJECT_SPEC.md)
- ER 与表结构：[docs/ERD_AND_SCHEMA.md](./docs/ERD_AND_SCHEMA.md)
- API 与工作流：[docs/API_AND_WORKFLOWS.md](./docs/API_AND_WORKFLOWS.md)
- 开发环境：[docs/DEVELOPMENT_SETUP.md](./docs/DEVELOPMENT_SETUP.md)
- Linux 部署：[docs/LINUX_DEPLOYMENT.md](./docs/LINUX_DEPLOYMENT.md)
- 运维手册：[docs/OPERATIONS.md](./docs/OPERATIONS.md)

# SelfControl 开发环境说明

## 1. 推荐环境

- 开发宿主机：Windows
- 主要运行环境：Linux VM
- 推荐使用 VS Code Remote SSH

## 2. 首次启动

```bash
cp .env.example .env
docker compose up --build
```

## 3. 服务说明

- `db`: PostgreSQL + pgvector
- `redis`: Celery broker
- `api`: FastAPI 后端
- `worker`: 异步任务进程
- `web`: Next.js 前端

## 4. 后续建议

- 在 API 侧补 Alembic 迁移
- 在 Web 侧接入真实登录页和 API 调用层
- 在 Worker 侧增加媒体处理任务


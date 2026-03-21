# SelfControl 开发环境说明

## 1. 推荐环境

- 开发宿主机：Windows
- 主要运行环境：Linux VM
- 推荐使用 VS Code Remote SSH 或等价远程开发方式

## 2. 首次启动

```bash
cp .env.example .env
docker compose up --build
```

如果数据库是首次初始化，再执行：

```bash
cd apps/api
alembic upgrade head
```

## 3. 服务说明

- `db`: PostgreSQL + pgvector
- `redis`: Celery broker / backend
- `api`: FastAPI 后端
- `worker`: 异步任务进程
- `web`: Next.js 前端

## 4. 媒体处理模式

- `MEDIA_PROCESSING_MODE=async`
  - 上传媒体后由 `worker` 异步处理
  - 更适合 Linux 服务器和长期运行环境
  - 前端通过状态刷新查看 `pending / processing / completed / failed`
- `MEDIA_PROCESSING_MODE=sync`
  - API 进程直接处理媒体
  - 更适合快速本地开发或没有 worker 的环境

可通过 `http://localhost:8000/health` 检查当前媒体处理模式、存储目录和临时目录状态。

## 5. 当前建议

- 本地 Windows + Linux VM 开发时，默认保留 `MEDIA_PROCESSING_MODE=async`
- 如果只临时调试 API，可切回 `sync`
- 服务器部署时应同时启动 `api`、`worker`、`redis`，否则异步媒体任务不会被消费
- 生产环境应设置强 `SECRET_KEY`，并关闭 `AUTO_CREATE_TABLES`，改为显式执行 Alembic 迁移

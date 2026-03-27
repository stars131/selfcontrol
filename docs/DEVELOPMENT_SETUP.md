# SelfControl 开发环境说明

## 1. 推荐环境

- 开发宿主机：Windows
- 主要运行环境：Linux 虚拟机
- 推荐通过 VS Code Remote SSH 或同类远程方式开发
- 推荐 Python 版本：`3.12` 或 `3.13`
- 推荐 Node.js 主版本：`20`
- 仓库已提供 `.python-version` 和 `.nvmrc` 作为工具链基线

## 2. 首次启动

如果是第一次拉取仓库，先安装开发依赖：

Windows：

```powershell
./scripts/bootstrap-dev.ps1
```

Linux VM：

```bash
sh ./scripts/bootstrap-dev.sh
```

在启动容器前，可先运行环境体检脚本，快速确认 Node、Python、Docker、Git hooks 和依赖状态：

Windows：

```powershell
./scripts/doctor-dev.ps1
```

Linux VM：

```bash
sh ./scripts/doctor-dev.sh
```

如需在本地推送前自动执行校验，可安装仓库级 Git hooks：

Windows：

```powershell
./scripts/install-git-hooks.ps1
```

Linux VM：

```bash
sh ./scripts/install-git-hooks.sh
```

然后准备本地环境并启动服务：

```bash
cp .env.example .env
docker compose up --build
```

如果数据库是第一次初始化，再执行：

```bash
cd apps/api
alembic upgrade head
```

## 3. 服务说明

- `db`：PostgreSQL + pgvector
- `redis`：Celery broker / backend
- `api`：FastAPI 后端
- `worker`：异步任务进程
- `web`：Next.js 前端

## 4. 媒体处理模式

- `MEDIA_PROCESSING_MODE=async`
  - 上传媒体后由 `worker` 异步处理
  - 更适合 Linux 服务器和长期运行环境
  - 前端通过状态刷新查看 `pending / processing / completed / failed`
- `MEDIA_PROCESSING_MODE=sync`
  - API 进程直接处理媒体
  - 更适合快速本地开发或没有 worker 的环境

可通过 `http://localhost:8000/health` 检查当前媒体处理模式、存储目录和临时目录状态。

## 5. 本地验证命令

前端：

```bash
cd apps/web
npm install
npm run verify:ui-guardrails
```

后端：

```bash
python -m pip install -r apps/api/requirements-dev.txt
python -m pytest apps/api/tests -q
```

项目级统一校验：

Windows：

```powershell
./scripts/verify-all.ps1
```

Linux VM：

```bash
sh ./scripts/verify-all.sh
```

如果 hooks 已安装，`git push` 时会自动执行上述项目级校验。如确有必要临时跳过，可设置 `SELFCONTROL_SKIP_VERIFY=1`。

## 6. 当前建议

- 本地 Windows + Linux VM 开发时，默认保持 `MEDIA_PROCESSING_MODE=async`
- 如果只是临时调试 API，可切回 `sync`
- 服务器部署时应同时启动 `api`、`worker`、`redis`，否则异步媒体任务不会被消费
- 生产环境应设置强 `SECRET_KEY`，并关闭 `AUTO_CREATE_TABLES`，改为显式执行 Alembic 迁移
- 在排查环境问题前，优先运行 `doctor-dev`，再决定是否执行 bootstrap 或容器启动

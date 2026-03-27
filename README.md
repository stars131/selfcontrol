# SelfControl

SelfControl 是一个面向长期个人使用、同时保留多人协作扩展能力的多模态备忘与检索系统。项目支持聊天式录入、结构化记录、媒体附件、地图位置、提醒、RAG 知识检索，以及可拆分的 AI Provider 配置。

当前仓库包含：

- `apps/api`: FastAPI 后端
- `apps/web`: Next.js 前端
- `infra`: 部署与运维相关配置
- `docs`: 项目与部署文档

## 快速开始

1. 复制环境变量模板

```bash
cp .env.example .env
```

2. 启动开发环境

```bash
docker compose up --build
```

3. 初始化数据库迁移

```bash
cd apps/api
alembic upgrade head
```

4. 访问服务

- Web: `http://localhost:3000`
- API: `http://localhost:8000`
- API Docs: `http://localhost:8000/docs`
- Health: `http://localhost:8000/health`

## 推荐开发方式

- 本地宿主机：Windows
- 主要运行环境：Linux 虚拟机
- 推荐通过 VS Code Remote SSH 或等价远程方式开发

首次拉取仓库后的依赖安装：

建议 Python 版本：`3.12` 或 `3.13`

Windows PowerShell：

```powershell
./scripts/bootstrap-dev.ps1
```

Linux / macOS / VM：

```bash
sh ./scripts/bootstrap-dev.sh
```

可选安装 Git pre-push hooks：

Windows PowerShell：

```powershell
./scripts/install-git-hooks.ps1
```

Linux / macOS / VM：

```bash
sh ./scripts/install-git-hooks.sh
```

## 常用验证命令

前端：

```bash
cd apps/web
npm run verify:ui-guardrails
```

后端：

```bash
python -m pytest apps/api/tests -q
```

项目级一键校验：

Windows PowerShell：

```powershell
./scripts/verify-all.ps1
```

Linux / macOS / VM：

```bash
sh ./scripts/verify-all.sh
```

## 跨平台文本规范

- 仓库使用 `.editorconfig` 统一 UTF-8、缩进和默认换行规范
- 仓库使用 `.gitattributes` 约束 Git 中的文本行尾，降低 Windows 和 Linux VM 间的无效 diff
- `*.ps1` 保持 `CRLF`，其余主要源码和文档默认保持 `LF`

## 推送前校验

- 安装 hooks 后，`git push` 前会自动运行项目级校验
- 如遇紧急情况，可临时设置 `SELFCONTROL_SKIP_VERIFY=1` 跳过
- 该跳过开关只应用于例外情况，不应作为日常流程

## 运行说明

- `MEDIA_PROCESSING_MODE=async`
  - 媒体上传和重试通过 Celery worker 异步处理
  - 更适合 Linux 服务器和长期运行环境
- `MEDIA_PROCESSING_MODE=sync`
  - API 进程同步处理媒体
  - 更适合本地调试和最小依赖场景
- `/health`
  - 返回当前媒体处理模式、存储目录状态和基础运行配置
- 生产环境
  - 必须设置强 `SECRET_KEY`
  - 应关闭 `AUTO_CREATE_TABLES`
  - 通过 Alembic 管理数据库迁移

## 文档

- 项目规格：[PROJECT_SPEC.md](./PROJECT_SPEC.md)
- ER 与表结构：[docs/ERD_AND_SCHEMA.md](./docs/ERD_AND_SCHEMA.md)
- API 与工作流：[docs/API_AND_WORKFLOWS.md](./docs/API_AND_WORKFLOWS.md)
- 开发环境：[docs/DEVELOPMENT_SETUP.md](./docs/DEVELOPMENT_SETUP.md)
- Linux 部署：[docs/LINUX_DEPLOYMENT.md](./docs/LINUX_DEPLOYMENT.md)
- 运维手册：[docs/OPERATIONS.md](./docs/OPERATIONS.md)
- TLS 部署：[docs/TLS_DEPLOYMENT.md](./docs/TLS_DEPLOYMENT.md)

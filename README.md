# SelfControl

SelfControl 是一个面向长期个人使用、同时保留多人协作扩展能力的多模态备忘与检索系统。

项目当前覆盖：

- 聊天式录入与查询
- 结构化记录、评分、避雷标记、时间与地点
- 图片、音频、视频等媒体附件
- OCR / ASR / 视频转写后的可搜索内容沉淀
- RAG 知识检索与可切换 AI Provider 配置
- 地图位置显示、位置筛选、位置复核
- 提醒、共享空间、分享链接、导入导出、媒体保留与归档

仓库结构：

- `apps/api`: FastAPI 后端
- `apps/web`: Next.js 前端
- `infra`: 部署与运行环境相关配置
- `docs`: 项目、开发、部署、运维文档
- `scripts`: 跨平台开发与校验脚本

## 快速开始

1. 复制环境变量模板

```bash
cp .env.example .env
```

2. 安装开发依赖

Windows PowerShell:

```powershell
./scripts/bootstrap-dev.ps1
```

Linux / macOS / VM:

```bash
sh ./scripts/bootstrap-dev.sh
```

3. 启动开发环境

```bash
docker compose up --build
```

4. 首次初始化数据库

```bash
cd apps/api
alembic upgrade head
```

5. 访问服务

- Web: `http://localhost:3000`
- API: `http://localhost:8000`
- API Docs: `http://localhost:8000/docs`
- Health: `http://localhost:8000/health`

## 推荐开发方式

- 本地宿主机：Windows
- 主要运行环境：Linux 虚拟机
- 推荐通过 VS Code Remote SSH 或同类远程方式开发
- 推荐 Node.js 主版本：`20`
- 推荐 Python 版本：`3.12` 或 `3.13`
- 仓库已提供 `.nvmrc` 与 `.python-version` 作为工具链基线

## 常用脚本

环境体检：

- Windows: `./scripts/doctor-dev.ps1`
- Linux / macOS / VM: `sh ./scripts/doctor-dev.sh`

安装 Git hooks：

- Windows: `./scripts/install-git-hooks.ps1`
- Linux / macOS / VM: `sh ./scripts/install-git-hooks.sh`

项目级一键校验：

- Windows: `./scripts/verify-all.ps1`
- Linux / macOS / VM: `sh ./scripts/verify-all.sh`

直接执行的常用命令：

前端：

```bash
cd apps/web
npm run verify:ui-guardrails
```

后端：

Windows:

```powershell
python -m pytest apps/api/tests -q
```

Linux / macOS / VM:

```bash
python3 -m pytest apps/api/tests -q
```

## 运行说明

`MEDIA_PROCESSING_MODE=async`

- 媒体上传和重试通过 Celery worker 异步处理
- 更适合 Linux 服务器与长期运行环境

`MEDIA_PROCESSING_MODE=sync`

- API 进程同步处理媒体
- 更适合本地调试或最小依赖环境

生产环境要求：

- 必须设置强 `SECRET_KEY`
- 必须关闭 `AUTO_CREATE_TABLES`
- 数据库结构通过 Alembic 管理

## 验证与质量基线

- Web 端结构守卫、命名守卫、覆盖守卫统一由 `npm run verify:ui-guardrails` 执行
- API 测试由 `pytest` 执行
- 根级 `verify-all` 脚本会串联前后端校验
- Git pre-push hooks 默认执行根级校验
- GitHub Actions 已覆盖 Linux 校验、Windows 根级校验与依赖更新治理

## 文档索引

- 项目规格：[PROJECT_SPEC.md](./PROJECT_SPEC.md)
- 贡献指南：[CONTRIBUTING.md](./CONTRIBUTING.md)
- 安全策略：[SECURITY.md](./SECURITY.md)
- 开发环境说明：[docs/DEVELOPMENT_SETUP.md](./docs/DEVELOPMENT_SETUP.md)
- 开发环境体检：[docs/DEV_ENV_DOCTOR.md](./docs/DEV_ENV_DOCTOR.md)
- API 与工作流：[docs/API_AND_WORKFLOWS.md](./docs/API_AND_WORKFLOWS.md)
- ER 图与表结构：[docs/ERD_AND_SCHEMA.md](./docs/ERD_AND_SCHEMA.md)
- Linux 部署：[docs/LINUX_DEPLOYMENT.md](./docs/LINUX_DEPLOYMENT.md)
- TLS 部署：[docs/TLS_DEPLOYMENT.md](./docs/TLS_DEPLOYMENT.md)
- 运维手册：[docs/OPERATIONS.md](./docs/OPERATIONS.md)
- 部署校验清单：[docs/DEPLOYMENT_VALIDATION_CHECKLIST.md](./docs/DEPLOYMENT_VALIDATION_CHECKLIST.md)

## 变更管理

- 每个有意义的切片都必须更新 `PROJECT_PROGRESS.md`
- 工作流、部署、恢复、安全相关变更需要同步更新文档
- 当前虽然以单人开发为主，但默认按企业级可维护性和后续多人协作标准推进

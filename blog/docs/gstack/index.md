# GStack 专栏

本专栏面向 **[garrytan/gstack](https://github.com/garrytan/gstack)** 仓库：**源码导读**（按模块拆目录）与 **开发与贡献文档**（命令、测试、文档约定）。站点根路径为 **`/gstack/`**；每个仓库顶层模块对应 `docs/gstack/<模块>/` 子目录，便于并行扩充、互不混杂。

**GStack** 是一套 **SKILL.md 工作流技能库**（`/review`、`/qa`、`/ship`、`/browse` 等），与 **OpenClaw** 等多通道智能体框架互补：OpenClaw 侧重消息与 Gateway，GStack 侧重仓库内交付节奏。

---

## 文档怎么放（目录约定）

| 规则 | 说明 |
|------|------|
| **站点根** | 一律在 `blog/docs/gstack/` 下，URL 前缀为 `/gstack/`。 |
| **多模块** | 与仓库顶层目录对齐：例如源码在 `browse/` → 文档在 `gstack/browse/`。 |
| **模块内** | 每个子目录必有 `index.md`（模块概览 + 子文链接）；深度文用 `01-`、`02-` 前缀文件名，便于排序。 |
| **不要** | 在 `gstack/` 根下放大量零散 `.md`，避免与「按模块分桶」冲突；总览类放在 [`repo/`](./repo/) 或本页。 |

更细的协作说明见：[文档目录与贡献约定](/gstack/repo/04-docs-layout)。

---

## 模块地图（对应仓库路径）

| 文档目录 | 仓库路径 | 说明 |
|----------|----------|------|
| [**repo/**](./repo/) | 仓库根、`CLAUDE.md`、`AGENTS.md` | 简介、安装、技能表、开发命令、**文档编写规范** |
| [**browse/**](./browse/) | `browse/` | 无头浏览器 CLI（Playwright）、命令注册、`snapshot` |
| [**design/**](./design/) | `design/` | Design 二进制 CLI（图像相关命令） |
| [**scripts/**](./scripts/) | `scripts/` | `gen-skill-docs`、resolvers、skill-check、DX 脚本 |
| [**test/**](./test/) | `test/` | 技能校验、eval、E2E、touchfiles 与分层 |
| [**extension/**](./extension/) | `extension/` | Chrome 扩展（侧栏、活动等） |
| [**lib/**](./lib/) | `lib/` | 共享库（如 worktree） |
| [**bin/**](./bin/) | `bin/` | `gstack-*` 等小工具 |
| [**skill-pipeline/**](./skill-pipeline/) | `SKILL.md.tmpl`、各技能 `*.tmpl` + `scripts/` | 模板 → `SKILL.md` 生成管线（非单个技能目录） |
| [**skills/**](./skills/) | （文档站组织） | **一条斜杠命令一个页面**（`01-office-hours` …），与 `docs/skills.md` 表格对齐；中文导读 + 链到英文长文 |

各技能业务目录（如 `ship/`、`review/`、`qa/`）的**专项源码笔记**：若篇幅大，可在 `skill-pipeline/` 下加深度文，或扩写对应 [`skills/` 命令页](./skills/)，避免在 `gstack/` 根目录堆积。

---

## 官方链接

- **源码**：[github.com/garrytan/gstack](https://github.com/garrytan/gstack)
- **协议**：MIT

---

## 与 OpenClaw 的关系

- **OpenClaw**：多通道 AI 智能体运行时。
- **GStack**：在 Claude Code / Codex / Cursor 等环境中的结构化斜杠技能。

若你已在用 OpenClaw 做外联机器人，仍可在本机安装 GStack，统一本地评审与 QA 流程。

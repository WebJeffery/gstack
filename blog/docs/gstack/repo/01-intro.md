# GStack 简介与安装

**GStack** 是面向 AI 辅助软件工程的一组 **技能（Skill）** 集合：每个技能是一份 `SKILL.md`，定义角色、步骤与约束，通过斜杠命令调用（如 `/review`、`/qa`、`/ship`）。目标是让单个开发者也能稳定复现「评审—测试—发版」等专业分工的节奏，而不靠临时拼 prompt。

---

## 适合谁

- **创始人 / 技术负责人**：希望在写代码前先做产品与架构层面的结构化讨论。
- **Claude Code 等新手**：需要预设角色，而不是空白对话框里从零描述流程。
- **Tech Lead**：希望在每个 PR 上有一致的预合并审查与 QA 思路。

---

## 你需要什么环境

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code)（或其它支持 SKILL 标准的客户端）
- [Git](https://git-scm.com/)
- [Bun](https://bun.sh/) v1.0+
- Windows 用户另需 [Node.js](https://nodejs.org/)

---

## 安装到本机（约 30 秒）

在 Claude Code 中让助手执行（或自己在终端执行）：

```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup
```

安装完成后，建议在项目的 **CLAUDE.md** 里增加一小节 **gstack**：说明使用 gstack 自带的 `/browse` 做网页相关操作、列出常用斜杠命令，并注明若技能未生效可在 `gstack` 目录下再次执行 `./setup`。

---

## 安装到当前仓库（可选，便于团队）

将技能目录拷进项目（例如 `.claude/skills/gstack`），去掉其中的 `.git`，再在项目根执行 `./setup`。这样 `git clone` 你的项目时，同事会自动带上同一套技能版本。

---

## Codex / Cursor 等环境

gstack 也支持 [SKILL.md 标准](https://github.com/anthropics/claude-code) 的其它宿主。可将仓库克隆到 `.agents/skills/gstack` 后执行：

```bash
./setup --host codex
```

具体路径与前缀以各工具对 skills 目录的约定为准；详见官方仓库 README。

---

## 下一步

- [技能一览与常用命令](/gstack/repo/02-skills)
- [开发环境与命令](/gstack/repo/03-dev-environment)
- [按模块阅读源码导读](/gstack/)

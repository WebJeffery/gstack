# 开发环境与命令

面向 **克隆 gstack 仓库并改代码** 的贡献者。用户侧「只装技能」只需 `./setup`；开发侧需要 **Bun** 与下列命令。

---

## 日常命令（仓库根）

```bash
bun install              # 安装依赖
bun test                 # 免费测试：技能校验、browse 集成、gen-skill-docs 质量等（提交前必跑）
bun run build            # 生成 SKILL 文档 + 编译 browse/design 二进制
bun run gen:skill-docs   # 仅重新生成各 SKILL.md
bun run skill:check      # 技能健康看板
bun run dev:skill        # 监听模板变更：自动 regen + 校验
bun run dev <cmd>        # 以开发模式跑 browse CLI，如: bun run dev goto https://example.com
```

---

## 测试与 Eval（付费 / 慢路径）

```bash
bun run test:evals       # LLM judge + E2E（diff 选型，约 $4/run 上限），需 ANTHROPIC_API_KEY
bun run test:e2e         # 仅 E2E
bun run test:gate        # CI 默认 gate 层
bun run test:periodic    # 周期层（或非确定性 / 外部服务）
bun run eval:select      # 根据当前 diff 预览将跑哪些测试
```

E2E 依赖 `claude -p`；Codex 相关测试使用 `~/.codex/` 配置。详见仓库根 **CLAUDE.md**。

---

## 与文档站的关系

本专栏的 Markdown 位于 **`blog/docs/gstack/`**，与上述源码目录 **并列**（不在 `browse/src` 内）。改完文档后在本机执行 `npm run docs:dev`（在 `blog/` 目录）预览。

返回 [仓库根目录索引](/gstack/repo/)。

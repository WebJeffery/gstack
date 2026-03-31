# 技能一览与常用命令

**按命令拆页**：本站为每条技能维护独立路径，见 [**技能命令索引**](/gstack/skills/)（与仓库 `docs/skills.md` 一一对应）。

以下表格概括 GStack 中常见的 **斜杠技能**（以 `.agents/skills/` 为入口；实际名称可能因 `skill_prefix` 等配置带 `gstack-` 前缀）。

| 技能 | 作用 |
|------|------|
| `/office-hours` | 从这里开始：产品想法重构与头脑风暴（YC Office Hours 风格）。 |
| `/plan-ceo-review` | CEO/创始人视角：把需求拉到「10 分产品」该有的力度。 |
| `/plan-eng-review` | 工程视角：架构、数据流、边界情况、测试与性能。 |
| `/plan-design-review` | 设计计划评审：各维度 0–10 分与改进方向。 |
| `/design-consultation` | 从零搭建设计系统并产出 DESIGN.md。 |
| `/review` | 合并前 PR 审查：结构、安全边界、隐性副作用等。 |
| `/debug` | 系统化排错（对应 investigate 类工作流时需结合仓库内技能名）。 |
| `/design-review` | 线上/代码视觉审计并迭代修复。 |
| `/qa` | 无头浏览器 QA：发现 bug、修复、再验证。 |
| `/qa-only` | 只出报告、不改代码的 QA。 |
| `/ship` | 测试、审查、版本与 CHANGELOG、推送与开 PR 的一体化流程。 |
| `/document-release` | 发版后同步 README/架构文档等。 |
| `/retro` | 周回顾与提交节奏分析。 |
| `/browse` | 无头 Chromium：导航、点击、截图、断言（~100ms 级命令）。 |
| `/setup-browser-cookies` | 从本机浏览器导入 Cookie，便于测登录态页面。 |
| `/careful` | 对 `rm -rf`、强推等破坏性操作前置提醒。 |
| `/freeze` | 限制编辑范围在指定目录。 |
| `/guard` | 同时启用 careful + freeze。 |
| `/unfreeze` | 解除 freeze 范围。 |
| `/gstack-upgrade` | 将 gstack 更新到最新版本。 |

完整列表与新增技能以仓库内 **AGENTS.md** 与各技能目录为准。

---

## 仓库内常用构建与检查命令

在克隆下来的 `gstack` 仓库根目录：

```bash
bun install              # 安装依赖
bun test                 # 免费测试（技能校验、browse 等）
bun run build            # 生成文档并编译二进制
bun run gen:skill-docs   # 从模板重新生成各 SKILL.md
bun run skill:check      # 所有技能健康看板
```

更多命令见 [开发环境与命令](/gstack/repo/03-dev-environment)。

---

## 重要约定

- **SKILL.md 多为生成物**：应改 `.tmpl` 模板并运行 `bun run gen:skill-docs`，而不是直接长期手写成品 `SKILL.md`（合并冲突时也应以模板为准）。
- **Browse**：技能内通过 `$B <command>` 等形式调用无头浏览器 CLI，与 OpenClaw 侧的「通道机器人」是不同层级的工具。

返回 [仓库根目录索引](/gstack/repo/) · [GStack 专栏首页](/gstack/)。

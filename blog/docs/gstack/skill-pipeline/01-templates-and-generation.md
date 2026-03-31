# 模板与生成流程

> **状态**：导读骨架。

核心规则（仓库 **CLAUDE.md**）：

1. **编辑 `.tmpl`**，不要以生成物 `SKILL.md` 为长期真相来源。
2. 变更后执行 **`bun run gen:skill-docs`**（或 `bun run build`）。
3. 合并冲突时：**不要**只接受某一侧的 `SKILL.md`；应合并模板与生成器后再 regen。

与 `scripts/` 文档的关系：`scripts/` 侧重 **实现文件路径**；本页侧重 **技能作者与贡献者** 的工作流。

返回 [skill-pipeline 模块首页](/gstack/skill-pipeline/)。

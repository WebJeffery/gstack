# gen-skill-docs 与 resolvers

> **状态**：导读骨架。

`bun run gen:skill-docs` 读取各技能目录下的 **`.tmpl`** 与根级 **`SKILL.md.tmpl`**，拼接/解析后写出 **`SKILL.md`**。

贡献流程要点（详见仓库 **CLAUDE.md**）：

- **不要**在 PR 里长期手改生成后的 `SKILL.md` 解决冲突；应改 **模板** 与 **`gen-skill-docs.ts`**，再 regen。
- 新增 resolver 或块类型时，同步补充 **`test/gen-skill-docs.test.ts`** 等免费测试。

实现阅读顺序：`gen-skill-docs.ts` 主流程 → `scripts/resolvers/` 各模块导出 → 模板占位符约定。

返回 [scripts 模块首页](/gstack/scripts/)。

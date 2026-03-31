# scripts · 构建与 DX 工具

对应仓库目录 **`scripts/`**：技能文档生成、模板解析、skill 健康检查、watch 模式等 **Node/Bun 脚本**。

## 关键文件

| 路径 | 说明 |
|------|------|
| `scripts/gen-skill-docs.ts` | `SKILL.md.tmpl` → 各技能 `SKILL.md` |
| `scripts/resolvers/` | 按块解析模板（preamble、design、review 等） |
| `scripts/skill-check.ts` | 技能健康看板 |
| `scripts/dev-skill.ts` | 监听模板变更 |

## 本目录文档

- [gen-skill-docs 与 resolvers](/gstack/scripts/01-gen-skill-docs)

返回 [专栏首页](/gstack/)。

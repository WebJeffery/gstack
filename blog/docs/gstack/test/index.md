# test · 校验、Eval 与 E2E

对应仓库目录 **`test/`**：技能静态校验、生成器质量测试、LLM judge、基于 `claude -p` 的 E2E 等。

## 关键路径

| 路径 | 说明 |
|------|------|
| `test/helpers/touchfiles.ts` | diff 选型与 E2E 分层（gate / periodic） |
| `test/helpers/session-runner.ts` | 会话运行相关 |
| `test/skill-validation.test.ts` | 快速门禁 |
| `test/skill-e2e-*.test.ts` | E2E 分类套件 |

## 本目录文档

- [测试分层与 touchfiles](/gstack/test/01-tiers-and-touchfiles)

返回 [专栏首页](/gstack/)。

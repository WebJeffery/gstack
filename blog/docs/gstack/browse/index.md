# browse · 无头浏览器 CLI

对应仓库目录 **`browse/`**：基于 Playwright 的无头 Chromium CLI，为 `/qa`、`/browse` 等技能提供 **`$B <command>`** 能力。

## 源码入口（导读）

| 路径 | 说明 |
|------|------|
| `browse/src/commands.ts` | 命令注册表（单一事实来源） |
| `browse/src/snapshot.ts` | `SNAPSHOT_FLAGS` 元数据 |
| `browse/src/` | CLI、daemon、各子命令实现 |
| `browse/test/` | 集成测试与 fixture |

## 本目录文档

- [架构与命令总览](/gstack/browse/01-overview)

返回 [专栏首页 · 模块地图](/gstack/)。

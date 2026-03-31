# 测试分层与 touchfiles

> **状态**：导读骨架。

gstack 使用 **基于 diff 的测试选型**：改动某些文件会触发全部 eval，单测则绑定在声明的 touchfiles 上。

- **`E2E_TIERS`**（在 `touchfiles.ts` 中）：区分 **gate**（CI 默认）与 **periodic**（周期或手动）。
- 新增 E2E 时，按 CLAUDE.md 原则分类：安全/确定性 → gate；质量基准、非确定性、强依赖外部服务 → periodic。

具体字段与 API 以 `test/helpers/touchfiles.ts` 源码为准。

返回 [test 模块首页](/gstack/test/)。

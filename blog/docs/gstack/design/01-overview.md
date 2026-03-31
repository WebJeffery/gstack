# design 模块概览

> **状态**：导读骨架；细节以 `design/src/` 与仓库 CLAUDE.md 为准。

`design` 与 `browse` 类似，为独立打包的 CLI，供设计类技能（如 `/design-shotgun`）通过稳定命令接口调用，而不把 API 密钥与参数散落在各 SKILL 正文中。

阅读时建议从 **命令注册/入口文件** 开始（具体文件名以 `design/src` 当前结构为准），再按需下钻到 API 客户端与错误处理层。

返回 [design 模块首页](/gstack/design/)。

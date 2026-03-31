---
title: "OpenCode Go"
sidebarTitle: "OpenCode Go"
description: "OpenClaw 模型接入：OpenCode Go。OpenCode Go 是 OpenCode 的 Go 模型目录，与 OpenCode Zen 共用同一个 API Key，但运行时 provider id 保持为 opencode-go。"
---

# OpenCode Go

OpenCode Go 是 [OpenCode](/tutorials/providers/opencode) 体系中的 **Go 模型目录**。它与 OpenCode Zen 共用同一个 `OPENCODE_API_KEY`，但在 OpenClaw 运行时会保留独立的 provider id `opencode-go`。

---

## 支持的模型

- `opencode-go/kimi-k2.5`
- `opencode-go/glm-5`
- `opencode-go/minimax-m2.5`

---

## CLI 设置

```bash
openclaw onboard --auth-choice opencode-go
# 或非交互式
openclaw onboard --opencode-go-api-key "$OPENCODE_API_KEY"
```

---

## 配置示例

```json5
{
  env: { OPENCODE_API_KEY: "sk-..." },
  agents: { defaults: { model: { primary: "opencode-go/kimi-k2.5" } } },
}
```

---

## 路由行为

只要模型引用写成 `opencode-go/...`，OpenClaw 就会自动按 OpenCode Go 目录进行路由。

- `opencode/claude-opus-4-6` 这类运行时引用属于 OpenCode Zen
- `opencode-go/kimi-k2.5` 这类运行时引用属于 OpenCode Go

也就是说，**共享同一个 Key，不共享同一个运行时 id**。

---

## 注意事项

- 两者都属于 OpenCode 体系，使用同一个 `OPENCODE_API_KEY`
- Zen 更偏向编程智能体推荐模型目录
- Go 是独立的 Go 模型目录
- 配置和引导可以视为一套 OpenCode 接入，但运行时模型引用必须保持显式区分
- 还未完成基础接入时，建议先看 [OpenCode Zen](/tutorials/providers/opencode)

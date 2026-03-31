---
title: "Kilo Gateway"
sidebarTitle: "Kilo Gateway"
description: "OpenClaw 模型接入：Kilo Gateway。Kilo Gateway 提供统一 API 网关，用一个 API Key 访问多家模型，并可在 OpenClaw 中通过 kilocode/ 前缀动态发现和调用模型。"
---

# Kilo Gateway

Kilo Gateway 是一个 **统一 API 网关**。你可以使用一个 API Key，通过同一个兼容 OpenAI 的入口访问多家模型服务。在 OpenClaw 中，模型引用统一使用 `kilocode/` 前缀。

---

## 获取 API Key

1. 打开 [app.kilo.ai](https://app.kilo.ai)
2. 登录或注册账号
3. 进入 API Keys 页面
4. 生成新的 API Key

---

## CLI 设置

```bash
openclaw onboard --kilocode-api-key <key>
```

也可以手动设置环境变量：

```bash
export KILOCODE_API_KEY="<your-kilocode-api-key>"
```

---

## 配置示例

```json5
{
  env: { KILOCODE_API_KEY: "<your-kilocode-api-key>" },
  agents: {
    defaults: {
      model: { primary: "kilocode/kilo/auto" },
    },
  },
}
```

---

## 默认模型

默认模型是 `kilocode/kilo/auto`。这是一个**智能路由模型**，会根据任务类型自动选择底层模型：

- 规划、调试、编排类任务通常会路由到 Claude Opus
- 代码编写、代码探索类任务通常会路由到 Claude Sonnet

---

## 可用模型

OpenClaw 会在启动时从 Kilo Gateway **动态发现**当前账号可用的模型列表。

查看方式：

```text
/models kilocode
```

常见模型引用示例：

```text
kilocode/kilo/auto
kilocode/anthropic/claude-sonnet-4
kilocode/openai/gpt-5.2
kilocode/google/gemini-3-pro-preview
```

---

## 注意事项

- 模型引用格式为 `kilocode/<model-id>`
- 默认模型是 `kilocode/kilo/auto`
- Base URL 默认为 `https://api.kilo.ai/api/gateway/`
- 网关底层使用 Bearer Token 鉴权
- 想查看账号下完整可用模型列表，优先使用 `/models kilocode`

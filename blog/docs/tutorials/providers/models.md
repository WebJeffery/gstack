---
title: "模型提供商快速入门"
sidebarTitle: "模型提供商快速入门"
description: "OpenClaw 模型接入：模型提供商。OpenClaw 支持多种 LLM 提供商。选择一个提供商，完成认证，然后将默认模型设置为 。"
---

# 模型提供商

OpenClaw 支持多种 LLM 提供商。选择一个提供商，完成认证，然后将默认模型设置为 `provider/model`。

---

## 推荐：Venice（Venice AI）

Venice 是我们推荐的 Venice AI 配置方案，提供隐私优先的推理服务，并可选择使用 Opus 处理最困难的任务。

- 默认模型：`venice/llama-3.3-70b`
- 最佳综合模型：`venice/claude-opus-45`（Opus 仍然是最强的）

详见 [Venice AI](/tutorials/providers/venice)。

---

## 快速开始（两步完成）

1. 向提供商进行认证（通常通过 `openclaw onboard`）。
2. 设置默认模型：

```json5
{
  agents: { defaults: { model: { primary: "anthropic/claude-opus-4-6" } } },
}
```

---

## 支持的提供商（入门集合）

- [OpenAI（API + Codex）](/tutorials/providers/openai)
- [Anthropic（API + Claude Code CLI）](/tutorials/providers/anthropic)
- [OpenRouter](/tutorials/providers/openrouter)
- [Vercel AI Gateway](/tutorials/providers/vercel-ai-gateway)
- [Cloudflare AI Gateway](/tutorials/providers/cloudflare-ai-gateway)
- [Moonshot AI（Kimi + Kimi Coding）](/tutorials/providers/moonshot)
- [Synthetic](/tutorials/providers/synthetic)
- [OpenCode Zen](/tutorials/providers/opencode)
- [Z.AI](/tutorials/providers/zai)
- [GLM 模型](/tutorials/providers/glm)
- [MiniMax](/tutorials/providers/minimax)
- [Venice（Venice AI）](/tutorials/providers/venice)
- [Amazon Bedrock](/tutorials/providers/bedrock)
- [千帆](/tutorials/providers/qianfan)

如需完整的提供商目录（xAI、Groq、Mistral 等）及高级配置，
请参阅[模型提供商](/tutorials/concepts/model-providers)。

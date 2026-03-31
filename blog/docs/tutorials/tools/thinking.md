---
title: "思考模式"
sidebarTitle: "思考模式"
description: "OpenClaw 工具系统：思考模式（Thinking Mode）。思考模式（Thinking Mode）通过  指令激活 Claude 的扩展思考（Extended Thinking）功能。开启后…"
---

# 思考模式（Thinking Mode）

思考模式（Thinking Mode）通过 `/think` 指令激活 Claude 的扩展思考（Extended Thinking）功能。开启后，Claude 会在生成最终回复前进行更深入的内部推理，适合处理需要严密逻辑或多步推导的复杂问题。

---

## 快速启用

在对话中输入 `/think` 指令，即可为当前消息启用思考模式：

```text
/think 分析这段代码的时间复杂度，并给出优化建议
```

如果需要显示详细的推理过程，使用 `/verbose` 指令：

```text
/verbose /think 解释为什么这个算法在边界情况下会失败
```

---

## 配置检查优先级（检查顺序）

当请求进入时，OpenClaw 按以下顺序检查思考模式的配置：

1. **消息级指令**：消息中是否包含 `/think` 或 `/no-think`（最高优先级）
2. **会话级默认值**：当前会话是否设置了默认思考模式
3. **Agent 级配置**：Agent 的配置文件中是否指定了思考模式
4. **全局配置**：全局默认设置（最低优先级）

---

## 会话默认值

你可以为会话设置默认开启思考模式，这样每条消息都会自动使用扩展思考：

```json5
{
  session: {
    defaults: {
      thinking: {
        enabled: true,
        level: "extended"
      }
    }
  }
}
```

或者在对话开始时发送配置消息：

```text
/config thinking.enabled=true
```

---

## 思考深度级别（Thinking Level）

`/think` 指令支持以下思考级别，级别越高推理越深入，但响应时间和 Token 消耗也越多：

| 级别 | 说明 | 适用场景 |
|------|------|----------|
| `off` | 关闭思考模式 | 快速问答，无需推理 |
| `minimal` | 极轻度，几乎无额外思考 | 简单指令、信息检索 |
| `low` | 轻度思考 | 一般问答、简单分析 |
| `medium` | 中度思考 | 有一定复杂度的任务 |
| `high` | 深度思考，完整展开推理链 | 复杂逻辑、代码分析、策略规划 |
| `xhigh` | 最高思考深度 | 极复杂推理，需要最大算力 |

::: warning `xhigh` 级别要求
`xhigh` 仅支持 **GPT-5.2 / Codex** 等特定模型，使用 Claude 模型时此级别无效。
:::

使用方式：

```text
/think high 分析这段代码的所有潜在 bug
/think xhigh 设计一个分布式系统架构方案
```

在配置中指定默认级别：

```json5
{
  tools: {
    thinking: {
      level: "high"
    }
  }
}
```

---

## `/reasoning` 可见性控制

思考过程（Reasoning）默认对用户不可见，只有最终回复会展示出来。你可以控制推理过程的可见性：

```bash
# 显示推理过程
/reasoning visible

# 隐藏推理过程（仅显示最终答案）
/reasoning hidden

# 折叠显示（可点击展开）
/reasoning collapsed
```

::: info 什么时候需要查看推理过程？
- 调试 Agent 的决策逻辑
- 验证复杂分析的推理步骤是否正确
- 教学场景中展示 AI 的思考方式
:::

---

## Heartbeats 中的思考模式

在定时任务（Heartbeats）中使用思考模式时，需要注意任务超时设置——扩展思考会增加响应时间：

```json5
{
  heartbeats: {
    "daily-analysis": {
      schedule: "0 9 * * *",
      prompt: "/think 分析昨日的系统指标，生成日报",
      timeout: 120  // 思考模式下建议设置更长的超时时间（秒）
    }
  }
}
```

---

## Web Chat UI

在 OpenClaw 的网页聊天界面中，你可以通过以下方式切换思考模式：

1. 在消息输入框左下角找到"思考模式"开关图标
2. 点击切换开启/关闭当前会话的思考模式
3. 开启后图标会变为高亮状态，发送的每条消息都将使用扩展思考

::: tip 快捷键
在 Web Chat UI 中，可以使用 `Ctrl + Shift + T`（macOS: `Cmd + Shift + T`）快速切换思考模式。
:::

---

## 注意事项

::: warning 使用思考模式的注意事项
- **响应时间**：思考模式下，Claude 需要更多时间生成回复，请耐心等待
- **Token 消耗**：扩展思考会消耗更多 Token（内部思考过程也计入用量）
- **模型支持**：思考模式仅在支持 Extended Thinking 的 Claude 模型版本上可用，旧版本模型会忽略该指令
:::

---

_下一步：[工具系统总览](/tutorials/tools/)_

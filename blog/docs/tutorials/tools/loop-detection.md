---
title: "循环检测"
sidebarTitle: "循环检测"
description: "OpenClaw 工具系统：循环检测（Loop Detection）。防止 Agent 陷入无效的重复工具调用循环，提升稳定性和可靠性。"
---

# 循环检测

## 为什么 Agent 会"卡住"？

有时候，Agent 会陷入一种无效的重复行为——它反复调用同一个工具、传入同样的参数，却没有任何实质性进展。这种情况通常发生在：

- Agent 等待某个条件成立，但条件始终没有满足
- Agent 误判了上一步的执行结果，认为需要重试
- 两个工具之间相互触发，形成"乒乓"式死循环

对于初学者来说，这类问题很难排查——Agent 看起来"在运行"，但实际上什么都没做。任务永远不会结束，资源也在白白消耗。

**循环检测**（`tools.loopDetection`）就是为了解决这个问题而设计的安全机制。它会监控 Agent 最近的工具调用历史，一旦发现无进展的重复模式，就会介入并停止 Agent，避免无意义的循环继续下去。

## 启用循环检测

在配置文件中添加以下内容即可启用：

```json5
{
  tools: {
    loopDetection: {
      enabled: true,
    },
  },
}
```

如果你只是想快速开启保护，保持默认值就足够了。下面的章节会介绍如何根据实际需求调整各项参数。

## 完整配置示例

```json5
{
  tools: {
    loopDetection: {
      enabled: true,
      warningThreshold: 10,
      criticalThreshold: 20,
      globalCircuitBreakerThreshold: 30,
      historySize: 30,
      detectors: {
        genericRepeat: true,
        knownPollNoProgress: true,
        pingPong: true,
      },
    },
  },
}
```

## 检测器说明

循环检测内置了三种检测器，分别针对不同类型的循环模式：

| 检测器 | 说明 |
|---|---|
| `genericRepeat` | 检测同一工具以完全相同的参数被反复调用，且没有产生新的进展 |
| `knownPollNoProgress` | 检测已知的轮询模式（例如持续查询某个状态），但状态始终没有变化 |
| `pingPong` | 检测 Agent 在两个工具或两种状态之间来回切换，陷入无限反复 |

三种检测器默认全部开启。如果某个检测器与你的业务场景冲突，可以将其设为 `false` 单独关闭。

## 阈值说明

循环检测通过三级阈值来逐步介入，而不是直接强制停止：

| 参数 | 默认值 | 说明 |
|---|---|---|
| `warningThreshold` | `10` | 当检测到循环迹象时，向 Agent 发送警告，提示它调整策略 |
| `criticalThreshold` | `20` | 强制 Agent 停止当前行为并上报结果 |
| `globalCircuitBreakerThreshold` | `30` | 无论 Agent 状态如何，直接硬停止——终极保护 |
| `historySize` | `30` | 分析最近多少次工具调用记录来判断是否存在循环 |

这种分级设计给了 Agent 一次"自我纠正"的机会。只有在 Agent 无法响应警告时，才会触发强制停止。

## 触发后会发生什么？

- **警告阶段**：Agent 收到提示，知道自己可能陷入了循环，可以尝试换一种方式继续任务
- **强制停止阶段**：Agent 被要求中止当前路径，将已有的结果上报给用户
- **熔断阶段**：系统直接终止 Agent 运行，防止资源被无限占用

对于用户来说，最终会看到一条说明 Agent 因循环被终止的消息，而不是让任务永远挂起。

::: tip 建议
如果你的 Agent 经常处理需要轮询的任务（例如等待某个异步操作完成），可以适当提高 `warningThreshold` 和 `criticalThreshold` 的值，避免误触发。
:::

---

_下一步：[工具系统总览](/tutorials/tools/) | [Exec 工具](/tutorials/tools/exec)_

---
title: "Synology Chat"
sidebarTitle: "Synology Chat"
description: "OpenClaw 通道接入：Synology Chat（插件）。通过 Synology Chat 的 incoming / outgoing webhook 接入私信通道。"
---

# Synology Chat（插件）

状态：通过插件支持（Webhook 私信通道）。  
OpenClaw 接收 Synology Chat 的 outgoing webhook 入站消息，再通过 incoming webhook 发送回复。

---

## 需要插件

Synology Chat 作为插件提供，不包含在核心安装中。

从 git 仓库运行时，可使用本地安装路径：

```bash
openclaw plugins install ./extensions/synology-chat
```

详情可参考：[插件](/tutorials/tools/plugin)

---

## 快速设置

1. 安装并启用 Synology Chat 插件
2. 在 Synology Chat 集成里创建 **incoming webhook**，复制 URL
3. 再创建 **outgoing webhook**，复制其 secret token
4. 将 outgoing webhook 指向你的 OpenClaw 网关地址
5. 配置 `channels.synology-chat`
6. 重启网关后，给 Synology Chat 机器人发送私信测试

默认 webhook 地址为：

```text
https://gateway-host/webhook/synology
```

如果你自定义了 `channels.synology-chat.webhookPath`，则改为对应路径。

---

## 最小配置示例

```json5
{
  channels: {
    "synology-chat": {
      enabled: true,
      token: "synology-outgoing-token",
      incomingUrl: "https://nas.example.com/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=2&token=...",
      webhookPath: "/webhook/synology",
      dmPolicy: "allowlist",
    },
  },
}
```

如果你要限定可访问用户，补上 `allowedUserIds`：

```json5
{
  channels: {
    "synology-chat": {
      allowedUserIds: ["123456"],
    },
  },
}
```

---

## 环境变量（默认账户）

默认账户可以使用以下环境变量：

- `SYNOLOGY_CHAT_TOKEN`
- `SYNOLOGY_CHAT_INCOMING_URL`
- `SYNOLOGY_NAS_HOST`
- `SYNOLOGY_ALLOWED_USER_IDS`
- `SYNOLOGY_RATE_LIMIT`
- `OPENCLAW_BOT_NAME`

说明：

- `SYNOLOGY_ALLOWED_USER_IDS` 支持逗号分隔
- 配置文件中的值优先级高于环境变量

---

## DM 策略与访问控制

推荐默认使用：

```json5
dmPolicy: "allowlist"
```

可选策略：

- `allowlist`：仅允许白名单用户
- `open`：允许任意发送者
- `disabled`：禁用私信

访问控制说明：

- `allowedUserIds` 可写成数组，也可写成逗号分隔字符串
- 在 `allowlist` 模式下，如果 `allowedUserIds` 为空，会被视为配置错误，webhook 路由不会启动
- 如果你想完全放开，请显式使用 `dmPolicy: "open"`

如需人工配对审批，可使用：

```bash
openclaw pairing list synology-chat
openclaw pairing approve synology-chat <CODE>
```

---

## 出站投递目标

Synology Chat 的目标通常使用数字用户 ID：

```bash
openclaw message send --channel synology-chat --target 123456 --text "Hello from OpenClaw"
openclaw message send --channel synology-chat --target synology-chat:123456 --text "Hello again"
```

媒体发送支持通过 URL 方式投递文件。

---

## 多账号配置

你可以在 `channels.synology-chat.accounts` 下配置多个账号：

```json5
{
  channels: {
    "synology-chat": {
      enabled: true,
      accounts: {
        default: {
          token: "token-a",
          incomingUrl: "https://nas-a.example.com/...token=...",
        },
        alerts: {
          token: "token-b",
          incomingUrl: "https://nas-b.example.com/...token=...",
          webhookPath: "/webhook/synology-alerts",
          dmPolicy: "allowlist",
          allowedUserIds: ["987654"],
        },
      },
    },
  },
}
```

每个账户都可以单独覆盖 `token`、`incomingUrl`、`webhookPath`、`dmPolicy` 和限流参数。

---

## 安全注意事项

- `token` 属于 webhook 密钥，泄露后应立即轮换
- 除非你明确可信任自签名 NAS 证书，否则保持 `allowInsecureSsl: false`
- 生产环境建议优先使用 `dmPolicy: "allowlist"`
- 入站 webhook 会做 token 校验与基于发送者的限流
